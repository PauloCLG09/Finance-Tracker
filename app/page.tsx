"use client";
import { useState, useMemo, useEffect } from "react";
import DashboardCard from "./components/DashboardCard";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import { Transaction } from "@/.next/types/transaction";
import Charts from "./components/Charts";


export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filterType, setFilterType] = useState<"all" | "income" | "expense">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const filteredTransactions = transactions.filter((t) => {
    const matchesType = filterType === "all" || t.type === filterType;
    const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  useEffect(() => {
    const storedTransactions = localStorage.getItem("transactions");

    if (storedTransactions) {
      setTransactions(JSON.parse(storedTransactions));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");

    if (storedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

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
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header */}
        <header className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
            Finance Tracker PRO 💰
          </h1>
          <p className="text-gray-500">
            Controla tus ingresos y gastos fácilmente
          </p>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-4 py-2 rounded-xl bg-gray-200 dark:bg-gray-700 dark:text-white transition"
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </header>

        {/* Dashboard Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 dark:text-white
 rounded-2xl shadow-lg p-6">
            <DashboardCard title="Balance" amount={balance} />
          </div>

          <div className="bg-white dark:bg-gray-800 dark:text-white
 rounded-2xl shadow-lg p-6">
            <DashboardCard
              title="Income"
              amount={income}
              color="text-green-600"
            />
          </div>

          <div className="bg-white dark:bg-gray-800 dark:text-white
 rounded-2xl shadow-lg p-6">
            <DashboardCard
              title="Expenses"
              amount={expenses}
              color="text-red-600"
            />
          </div>
        </section>

        {/* Main Content */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Left Side */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 dark:text-white
 rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">
                Agregar Transacción
              </h2>
              <TransactionForm onAddTransaction={addTransaction} />
            </div>

            <div className="bg-white dark:bg-gray-800 dark:text-white
 rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">
                Historial
              </h2>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-6">
                {/* Filtro por tipo */}
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as "all" | "income" | "expense")}
                  className="border rounded-lg p-2 dark:bg-gray-700 dark:text-white"
                >
                  <option value="all">All</option>
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>

                {/* Barra de búsqueda */}
                <input
                  type="text"
                  placeholder="Search description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border rounded-lg p-2 flex-1 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <TransactionList
                transactions={filteredTransactions}
                onDelete={deleteTransaction}
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="bg-white dark:bg-gray-800 dark:text-white
 rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              Resumen Financiero
            </h2>
            <Charts transactions={filteredTransactions} />
          </div>

        </section>

      </div>
    </main>
  );

}
