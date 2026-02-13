"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import { Transaction } from "@/.next/types/transaction";

interface ChartsProps {
  transactions: Transaction[];
}

const COLORS = ["#4ade80", "#f87171", "#60a5fa", "#facc15", "#f472b6"];

export default function Charts({ transactions }: ChartsProps) {
  // Pie chart: gastos por tipo
  const expenseData = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc: { name: string; value: number }[], curr) => {
      const existing = acc.find((item) => item.name === curr.description);

      if (existing) {
        existing.value += curr.amount;
      } else {
        acc.push({ name: curr.description, value: curr.amount });
      }

      return acc;
    }, []);

  // Bar chart: income vs expense total
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, curr) => acc + curr.amount, 0);
  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const barData = [
    { name: "Income", amount: income },
    { name: "Expenses", amount: expense },
  ];

  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="text-gray-800 dark:text-white
 p-6 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Expenses Breakdown</h2>
        {expenseData.length === 0 ? (
          <p className="text-gray-500">No expenses yet</p>
        ) : (
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={expenseData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {expenseData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="text-gray-800 dark:text-white
 p-6 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Income vs Expenses</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={barData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="amount">
              {barData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={entry.name === "Income" ? "#4ade80" : "#f87171"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
