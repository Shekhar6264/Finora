import { useMemo } from "react"
import { useFinance } from "../hooks/useFinance"
import SummaryCard from "../components/cards/SummaryCard"
import TransactionTable from "../components/table/TransactionTable"
import Insights from "../components/Insights"
import BalanceChart from "../components/charts/BalanceChart"
import CategoryChart from "../components/charts/CategoryChart"
import { motion } from "framer-motion"
import { Calendar } from "lucide-react"

export default function Dashboard() {
    const { transactions, timeRange, setTimeRange } = useFinance()

    // 🔥 CURRENT PERIOD FILTER
    const filteredTransactions = useMemo(() => {
        const now = new Date("2024-04-01")

        return transactions.filter(t => {
            const tDate = new Date(t.date)
            const diffDays = (now - tDate) / (1000 * 60 * 60 * 24)

            if (timeRange === '24H') return diffDays <= 1
            if (timeRange === '7D') return diffDays <= 7
            if (timeRange === '1M') return diffDays <= 30
            if (timeRange === '1Y') return diffDays <= 365

            return true
        })
    }, [transactions, timeRange])

    // 🔥 PREVIOUS PERIOD FILTER
    const previousTransactions = useMemo(() => {
        const now = new Date("2024-04-01")

        return transactions.filter(t => {
            const tDate = new Date(t.date)
            const diffDays = (now - tDate) / (1000 * 60 * 60 * 24)

            if (timeRange === '24H') return diffDays > 1 && diffDays <= 2
            if (timeRange === '7D') return diffDays > 7 && diffDays <= 14
            if (timeRange === '1M') return diffDays > 30 && diffDays <= 60
            if (timeRange === '1Y') return diffDays > 365 && diffDays <= 730

            return false
        })
    }, [transactions, timeRange])

    // 🔥 CURRENT TOTALS
    const totals = useMemo(() => {
        const income = filteredTransactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + Number(t.amount), 0)

        const expense = filteredTransactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + Number(t.amount), 0)

        return {
            income,
            expense,
            balance: income - expense
        }
    }, [filteredTransactions])

    // 🔥 PREVIOUS TOTALS
    const prevTotals = useMemo(() => {
        const income = previousTransactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + Number(t.amount), 0)

        const expense = previousTransactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + Number(t.amount), 0)

        return {
            income,
            expense,
            balance: income - expense
        }
    }, [previousTransactions])

    // 🔥 TREND CALCULATION
    const calculateTrend = (current, previous) => {
        if (previous === 0) return 0
        return ((current - previous) / previous) * 100
    }

    const trends = {
        balance: calculateTrend(totals.balance, prevTotals.balance),
        income: calculateTrend(totals.income, prevTotals.income),
        expense: calculateTrend(totals.expense, prevTotals.expense),
    }

    const timeOptions = ['24H', '7D', '1M', '1Y']

    return (
        <div className="relative w-full max-w-screen-2xl mx-auto px-4 sm:px-6 pb-24">

            {/* 🌌 BACKGROUND */}
            <div className="fixed inset-0 -z-10">
                <div className="absolute inset-0 bg-black" />
                <div className="absolute top-[-150px] left-[-150px] w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-150px] right-[-150px] w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full" />
            </div>

            {/* 🔥 HEADER */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-8 pb-10 border-b border-white/10">

                <div>
                    <h1 className="text-4xl sm:text-6xl font-bold text-white tracking-tight">
                        Finance Dashboard
                    </h1>
                    <p className="text-gray-400 mt-2 text-sm">
                        Track your income, expenses and insights
                    </p>
                </div>

                <div className="flex items-center gap-4 px-5 py-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
                    <Calendar size={18} className="text-indigo-400" />
                    <span className="text-sm text-white">
                        {new Date().toLocaleDateString('en-US', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric'
                        })}
                    </span>
                </div>
            </div>

            {/* 💎 SUMMARY CARDS */}
            <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <SummaryCard 
                    title="Balance" 
                    value={totals.balance} 
                    type="balance" 
                    trend={trends.balance} 
                />
                <SummaryCard 
                    title="Income" 
                    value={totals.income} 
                    type="income" 
                    trend={trends.income} 
                />
                <SummaryCard 
                    title="Expenses" 
                    value={totals.expense} 
                    type="expense" 
                    trend={trends.expense} 
                />
            </motion.div>

            {/* 📊 CHARTS */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-10">

                <motion.div 
                    className="lg:col-span-8 p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-semibold text-white">Overview</h2>

                        <div className="flex gap-2 bg-white/5 p-1 rounded-lg">
                            {timeOptions.map(opt => (
                                <button
                                    key={opt}
                                    onClick={() => setTimeRange(opt)}
                                    className={`px-3 py-1.5 text-xs rounded-md transition ${
                                        timeRange === opt
                                            ? "bg-indigo-500 text-white"
                                            : "text-gray-400 hover:text-white"
                                    }`}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="h-[350px]">
                        <BalanceChart transactions={filteredTransactions} />
                    </div>
                </motion.div>

                <motion.div 
                    className="lg:col-span-4 p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <h2 className="text-lg font-semibold text-white mb-6">
                        Categories
                    </h2>

                    <div className="h-[350px]">
                        <CategoryChart transactions={filteredTransactions} />
                    </div>
                </motion.div>
            </div>

            {/* 📋 TABLE */}
            <div className="mt-10">
                <TransactionTable />
            </div>

            {/* 🧠 INSIGHTS */}
            <div className="mt-10">
                <Insights transactions={filteredTransactions} />
            </div>
        </div>
    )
}