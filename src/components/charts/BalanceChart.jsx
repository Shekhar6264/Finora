import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts"
import { useMemo } from "react"

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-black border border-gray-200 dark:border-white/10 px-4 py-2 rounded-lg text-sm shadow-md">
        <p className="text-gray-500 text-xs">{label}</p>
        <p className="text-black dark:text-white font-semibold">
          ${payload[0].value.toLocaleString()}
        </p>
      </div>
    )
  }
  return null
}

export default function BalanceChart({ transactions }) {

  const data = useMemo(() => {
    if (!transactions?.length) return []

    const sorted = [...transactions].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    )

    let balance = 0

    return sorted.map(t => {
      balance += t.type === "income" ? Number(t.amount) : -Number(t.amount)
      return {
        date: t.date,
        balance
      }
    })
  }, [transactions])

  if (!data.length) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        No data available
      </div>
    )
  }

  return (
    <div className="w-full h-full">

      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>

          {/* GRID */}
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(150,150,150,0.1)"
          />

          {/* X AXIS */}
          <XAxis
            dataKey="date"
            tick={{ fill: "#9ca3af", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />

          {/* Y AXIS */}
          <YAxis
            tick={{ fill: "#9ca3af", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `$${v}`}
          />

          {/* TOOLTIP */}
          <Tooltip content={<CustomTooltip />} />

          {/* GRADIENT */}
          <defs>
            <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
          </defs>

          {/* AREA */}
          <Area
            type="monotone"
            dataKey="balance"
            stroke="#6366f1"
            strokeWidth={2}
            fill="url(#balanceGradient)"
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>

    </div>
  )
}