"use client";

import { useState } from "react";
import { Transaction } from "@/.next/types/transaction";

interface TransactionFormProps {
  onAddTransaction: (transaction: {
    id: string;
    description: string;
    amount: number;
    type: "income" | "expense";
  }) => void;
}

interface TransactionFormProps {
  onAddTransaction: (transaction: Transaction) => void;
}

export default function TransactionForm({
  onAddTransaction,
}: TransactionFormProps) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"income" | "expense">("income");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!description || !amount) return;

    onAddTransaction({
      id: crypto.randomUUID(),
      description,
      amount: Number(amount),
      type,
    });

    setDescription("");
    setAmount("");
    setType("income");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-md mt-8 space-y-4"
    >
      <h2 className="text-xl font-semibold">Add Transaction</h2>

      <input
        type="text"
        placeholder="Description"
        className="w-full border rounded-lg p-2"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="number"
        placeholder="Amount"
        className="w-full border rounded-lg p-2"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <select
        className="w-full border rounded-lg p-2"
        value={type}
        onChange={(e) =>
          setType(e.target.value as "income" | "expense")
        }
      >
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <button
        type="submit"
        className="w-full bg-black text-white py-2 rounded-lg hover:opacity-90 transition"
      >
        Add
      </button>
    </form>
  );
}
