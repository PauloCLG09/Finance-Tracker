"use client";
import { useState, useMemo, useEffect } from "react";
import DashboardCard from "./components/DashboardCard";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import { Transaction } from "@/.next/types/transaction";
import Charts from "./components/Charts";


export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const storedTransactions = localStorage.getItem("transactions");

    if (storedTransactions) {
      setTransactions(JSON.parse(storedTransactions));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction: Transaction) => {
    setTransactions((prev) => [...prev, transaction]);
  };

  const income = useMemo(() => {
    return transactions
      .filter((t) => t.type === "income")
      .reduce((acc, curr) => acc + curr.amount, 0);
  }, [transactions]);

  const expenses = useMemo(() => {
    return transactions
      .filter((t) => t.type === "expense")
      .reduce((acc, curr) => acc + curr.amount, 0);
  }, [transactions]);

  const balance = income - expenses;

  const deleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">
          Finance Tracker PRO
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DashboardCard title="Balance" amount={balance} />
          <DashboardCard title="Income" amount={income} color="text-green-600" />
          <DashboardCard title="Expenses" amount={expenses} color="text-red-600" />
        </div>
        <TransactionForm onAddTransaction={addTransaction} />
      </div>
      <TransactionList
        transactions={transactions}
        onDelete={deleteTransaction}
      />
      <Charts transactions={transactions} />
    </main>
  );
}
