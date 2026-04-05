import { useFinance } from "../hooks/useFinance"
import { TrendingUp, TrendingDown, PieChart, BarChart3 } from "lucide-react"
import { useMemo } from "react"
import { motion } from "framer-motion"

export default function Insights({ transactions: externalTransactions }) {

    const { transactions: contextTransactions } = useFinance()
    const transactions = externalTransactions || contextTransactions

    const stats = useMemo(() => {
        const expenses = transactions.filter(t => t.type === "expense")
        const income = transactions.filter(t => t.type === "income")

        const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0)
        const totalIncome = income.reduce((sum, t) => sum + t.amount, 0)

        const categoryTotals = {}
        expenses.forEach(e => {
            categoryTotals[e.category] =
                (categoryTotals[e.category] || 0) + e.amount
        })

        const highestCategory = Object.entries(categoryTotals)
            .sort((a, b) => b[1] - a[1])[0]

        const avgTransaction =
            transactions.length > 0
                ? Math.round(
                      transactions.reduce((sum, t) => sum + t.amount, 0) /
                          transactions.length
                  )
                : 0

        const savingsRate =
            totalIncome > 0
                ? Math.round(
                      ((totalIncome - totalExpenses) / totalIncome) * 100
                  )
                : 0

        return {
            highestCategory,
            avgTransaction,
            savingsRate,
            isDeficit: totalExpenses > totalIncome
        }
    }, [transactions])

    const cardStyle = "relative p-6 rounded-2xl border transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* TOP CATEGORY */}
            <motion.div className={`${cardStyle} bg-gradient-to-br from-rose-500/10 to-transparent border-rose-500/20`}>
                <div className="flex items-center gap-3 mb-3 text-rose-400">
                    <PieChart size={18} />
                    <span className="text-sm font-medium">Top Spending</span>
                </div>
                <p className="text-xl font-semibold text-white">
                    {stats.highestCategory ? stats.highestCategory[0] : "N/A"}
                </p>
            </motion.div>

            {/* AVG */}
            <motion.div className={`${cardStyle} bg-gradient-to-br from-indigo-500/10 to-transparent border-indigo-500/20`}>
                <div className="flex items-center gap-3 mb-3 text-indigo-400">
                    <BarChart3 size={18} />
                    <span className="text-sm font-medium">Avg Transaction</span>
                </div>
                <p className="text-xl font-semibold text-white">
                    ${stats.avgTransaction.toLocaleString()}
                </p>
            </motion.div>

            {/* SAVINGS */}
            <motion.div className={`${cardStyle} bg-gradient-to-br from-emerald-500/10 to-transparent border-emerald-500/20`}>
                <div className="flex items-center gap-3 mb-3 text-emerald-400">
                    <TrendingUp size={18} />
                    <span className="text-sm font-medium">Savings Rate</span>
                </div>
                <p className="text-xl font-semibold text-white">
                    {stats.savingsRate}%
                </p>
            </motion.div>

            {/* STATUS */}
            <motion.div className={`${cardStyle} ${
                stats.isDeficit
                    ? "bg-gradient-to-br from-rose-500/10 border-rose-500/20"
                    : "bg-gradient-to-br from-emerald-500/10 border-emerald-500/20"
            }`}>
                <div className="flex items-center gap-3 mb-3">
                    {stats.isDeficit
                        ? <TrendingDown size={18} className="text-rose-400" />
                        : <TrendingUp size={18} className="text-emerald-400" />}
                    <span className="text-sm font-medium text-gray-400">
                        Status
                    </span>
                </div>

                <p className={`text-sm font-medium ${
                    stats.isDeficit ? "text-rose-400" : "text-emerald-400"
                }`}>
                    {stats.isDeficit
                        ? "Spending exceeds income"
                        : "Healthy balance"}
                </p>
            </motion.div>

        </div>
    )
}