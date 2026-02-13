"use client";
import { Transaction } from "@/.next/types/transaction";
import { motion, AnimatePresence } from "framer-motion";

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
      <p className="mt-6 text-gray-800 dark:text-white
">No transactions yet.</p>
    );
  }

  return (
    <div className="mt-6 bg-white dark:bg-gray-700 dark:text-white
 p-6 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Transactions</h2>
      <ul className="space-y-2">
        <AnimatePresence>
          {transactions.map((t) => (
            <motion.li
              key={t.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
              className="flex justify-between items-center border-b py-2"
            >
              <div>
                <p className="font-medium">{t.description}</p>
                <p
                  className={`text-sm ${t.type === "income" ? "text-green-600" : "text-red-600"
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
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
