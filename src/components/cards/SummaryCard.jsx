import { motion, animate } from "framer-motion"
import { useEffect, useRef } from "react"
import { TrendingUp, TrendingDown, Wallet, ArrowUpRight, ArrowDownRight } from "lucide-react"

const AnimatedNumber = ({ value }) => {
    const ref = useRef(null)

    useEffect(() => {
        const controls = animate(0, value, {
            duration: 1.2,
            ease: "easeOut",
            onUpdate: (latest) => {
                if (ref.current) {
                    ref.current.textContent = `$${Math.floor(latest).toLocaleString()}`
                }
            }
        })
        return () => controls.stop()
    }, [value])

    return <span ref={ref}>$0</span>
}

export default function SummaryCard({ title, value, type, trend = 0 }) {

    const config = {
        balance: {
            icon: <Wallet size={18} />,
            gradient: "from-indigo-500 to-purple-500"
        },
        income: {
            icon: <TrendingUp size={18} />,
            gradient: "from-emerald-500 to-teal-500"
        },
        expense: {
            icon: <TrendingDown size={18} />,
            gradient: "from-rose-500 to-pink-500"
        }
    }

    const current = config[type] || config.balance

    // 🔥 Trend color logic
    const trendColor =
        trend === 0
            ? "text-gray-400"
            : trend > 0
            ? "text-emerald-400"
            : "text-rose-400"

    return (
        <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
            className="relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl overflow-hidden group transition-all duration-500"
        >
            {/* 🔥 Glow background */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition duration-700 bg-gradient-to-br ${current.gradient}`} />

            {/* HEADER */}
            <div className="flex items-center justify-between mb-5 relative z-10">
                <p className="text-sm text-gray-400">{title}</p>

                <div className="p-2 rounded-lg bg-white/10 text-white">
                    {current.icon}
                </div>
            </div>

            {/* VALUE */}
            <div className="text-3xl font-bold text-white mb-4 relative z-10">
                <AnimatedNumber value={value} />
            </div>

            {/* TREND */}
            <div className="flex items-center justify-between relative z-10">
                <div className={`flex items-center gap-2 text-sm font-medium ${trendColor}`}>
                    {trend === 0 ? null : trend > 0 ? (
                        <ArrowUpRight size={16} />
                    ) : (
                        <ArrowDownRight size={16} />
                    )}
                    {Math.abs(trend).toFixed(1)}%
                </div>

                <span className="text-xs text-gray-500">
                    vs last period
                </span>
            </div>

            {/* BORDER GLOW */}
            <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-white/20 transition" />
        </motion.div>
    )
}