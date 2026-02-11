interface DashboardCardProps {
  title: string;
  amount: number;
  color?: string;
}

export default function DashboardCard({
  title,
  amount,
  color = "text-black",
}: DashboardCardProps) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-gray-500">{title}</h2>
      <p className={`text-2xl font-semibold mt-2 ${color}`}>
        ${amount.toLocaleString()}
      </p>
    </div>
  );
}