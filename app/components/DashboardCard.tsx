"use client";
import { motion } from "framer-motion";
import CountUp from "react-countup";


interface Props {
  title: string;
  amount: number;
  color?: string;
}


export default function DashboardCard({ title, amount, color }: Props) {
  return (
       <motion.div
      key={title} // esto fuerza a Framer Motion a animar cuando cambia el contenido
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      className="relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-linear-to-br from-white to-gray-50 border border-gray-200"
    >

      {/* Decorative background circle */}
      <div className="absolute -top-8 -right-8 w-24 h-24 bg-gray-200 rounded-full opacity-20"></div>

      <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
        {title}
      </h2>

      <p className={`text-3xl font-bold mt-2 ${color ?? "text-gray-800"}`}>
        <CountUp
          start={0}
          end={amount}
          duration={0.8}
          separator=","
          decimals={2}
          decimal="."
        />
      </p>
   </motion.div>
  )
}