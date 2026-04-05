import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip
} from "recharts"
import { useMemo } from "react"

const COLORS = [
  "#6366f1",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#a855f7",
  "#06b6d4"
]

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0]

    return (
      <div className="bg-white dark:bg-black border border-gray-200 dark:border-white/10 px-3 py-2 rounded-lg text-sm shadow-md">
        <p className="text-gray-500 text-xs">{data.name}</p>
        <p className="text-black dark:text-white font-semibold">
          ${data.value.toLocaleString()}
        </p>
      </div>
    )
  }
  return null
}

export default function CategoryChart({ transactions }) {

  const data = useMemo(() => {
    if (!transactions?.length) return []

    const expenses = transactions.filter(t => t.type === "expense")

    const grouped = {}

    expenses.forEach(t => {
      grouped[t.category] =
        (grouped[t.category] || 0) + Number(t.amount)
    })

    return Object.entries(grouped).map(([name, value]) => ({
      name,
      value
    }))
  }, [transactions])

  if (!data.length) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        No data available
      </div>
    )
  }

  return (
    <div className="w-full h-full flex flex-col items-center">

      {/* CHART */}
      <div className="w-full h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={3}
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip content={<CustomTooltip />} />

          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* LEGEND */}
      <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-sm w-full px-4">
        {data.map((entry, index) => (
          <div key={entry.name} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <span className="text-gray-500 dark:text-gray-400">
              {entry.name}
            </span>
          </div>
        ))}
      </div>

    </div>
  )
}