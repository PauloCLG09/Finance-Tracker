"use client";

import { Transaction } from "@/.next/types/transaction";

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}


export default function TransactionList({
  transactions,
  onDelete,
}: TransactionListProps) {
  if (transactions.length === 0) {
    return (
      <p className="mt-6 text-gray-500">No transactions yet.</p>
    );
  }

  return (
    <div className="mt-6 bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Transactions</h2>
      <ul className="space-y-2">
        {transactions.map((t) => (
          <li
            key={t.id}
            className="flex justify-between items-center border-b py-2"
          >
            <div>
              <p className="font-medium">{t.description}</p>
              <p
                className={`text-sm ${
                  t.type === "income" ? "text-green-600" : "text-red-600"
                }`}
              >
                ${t.amount.toLocaleString()}
              </p>
            </div>
            <button
              onClick={() => onDelete(t.id)}
              className="text-red-500 hover:underline"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
