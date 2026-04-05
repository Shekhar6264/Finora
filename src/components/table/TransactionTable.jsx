import { useState, useMemo } from "react"
import { useFinance } from "../../hooks/useFinance"
import { Search, ChevronLeft, ChevronRight, ArrowUp, ArrowDown, Plus } from "lucide-react"
import { motion } from "framer-motion"
import TransactionForm from "../transactions/TransactionForm"

export default function TransactionTable() {
    const {
        transactions, role, deleteTransaction,
        searchTerm, setSearchTerm,
        filterType, setFilterType,
        sortBy, setSortBy,
        sortOrder, setSortOrder
    } = useFinance()

    const [editTx, setEditTx] = useState(null)
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)

    const itemsPerPage = 8

    // 🔥 FILTER + SORT
    const filtered = useMemo(() => {
        return transactions
            .filter(t =>
                (filterType === "all" || t.type === filterType) &&
                (t.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                 t.description.toLowerCase().includes(searchTerm.toLowerCase()))
            )
            .sort((a, b) => {
                const factor = sortOrder === "asc" ? 1 : -1
                if (sortBy === "date") return (new Date(a.date) - new Date(b.date)) * factor
                if (sortBy === "amount") return (a.amount - b.amount) * factor
                return 0
            })
    }, [transactions, searchTerm, filterType, sortBy, sortOrder])

    const totalPages = Math.ceil(filtered.length / itemsPerPage)

    const paginated = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage
        return filtered.slice(start, start + itemsPerPage)
    }, [filtered, currentPage])

    const handleSort = (key) => {
        if (sortBy === key) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc")
        } else {
            setSortBy(key)
            setSortOrder("desc")
        }
    }

    return (
        <div className="mt-10 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">

            {/* 🔥 HEADER */}
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">

                <h2 className="text-xl font-semibold text-white">
                    Transactions
                </h2>

                <div className="flex gap-3 flex-wrap">

                    {/* SEARCH */}
                    <div className="relative">
                        <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
                        <input
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search..."
                            className="pl-9 pr-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white outline-none"
                        />
                    </div>

                    {/* FILTER */}
                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white"
                    >
                        <option value="all">All</option>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>

                    {/* ADD */}
                    {role === "admin" && (
                        <button
                            onClick={() => {
                                setEditTx(null)
                                setIsFormOpen(true)
                            }}
                            className="flex items-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-sm"
                        >
                            <Plus size={16} /> Add
                        </button>
                    )}
                </div>
            </div>

            {/* 📊 TABLE */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">

                    <thead className="text-gray-400 border-b border-white/10">
                        <tr>
                            {["date", "category", "type", "amount"].map((col) => (
                                <th
                                    key={col}
                                    onClick={() => handleSort(col)}
                                    className="py-3 cursor-pointer select-none"
                                >
                                    <div className="flex items-center gap-1 capitalize">
                                        {col}
                                        {sortBy === col &&
                                            (sortOrder === "asc"
                                                ? <ArrowUp size={14} />
                                                : <ArrowDown size={14} />)}
                                    </div>
                                </th>
                            ))}
                            {role === "admin" && <th>Actions</th>}
                        </tr>
                    </thead>

                    <tbody>
                        {paginated.map((t) => (
                            <tr key={t.id} className="border-b border-white/5 hover:bg-white/5">

                                <td className="py-3">{t.date}</td>

                                <td>
                                    <div>
                                        <p className="text-white">{t.category}</p>
                                        <p className="text-xs text-gray-400">{t.description}</p>
                                    </div>
                                </td>

                                <td>
                                    <span className={`px-2 py-1 rounded text-xs ${
                                        t.type === "income"
                                            ? "bg-emerald-500/10 text-emerald-400"
                                            : "bg-rose-500/10 text-rose-400"
                                    }`}>
                                        {t.type}
                                    </span>
                                </td>

                                <td className={`font-semibold ${
                                    t.type === "income" ? "text-emerald-400" : "text-rose-400"
                                }`}>
                                    {t.type === "income" ? "+" : "-"}${t.amount}
                                </td>

                                {role === "admin" && (
                                    <td className="flex gap-2">
                                        <button
                                            onClick={() => {
                                                setEditTx(t)
                                                setIsFormOpen(true)
                                            }}
                                            className="text-gray-400 hover:text-white"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => deleteTransaction(t.id)}
                                            className="text-gray-400 hover:text-red-400"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* 🔄 PAGINATION */}
            <div className="flex justify-between items-center mt-6">

                <span className="text-gray-400 text-sm">
                    Page {currentPage} of {totalPages}
                </span>

                <div className="flex gap-2">
                    <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        className="p-2 bg-white/5 rounded"
                    >
                        <ChevronLeft size={16} />
                    </button>

                    <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        className="p-2 bg-white/5 rounded"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>

            {/* 🧾 FORM */}
            {isFormOpen && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
                    <div className="bg-black p-6 rounded-xl w-full max-w-lg">
                        <TransactionForm
                            editData={editTx}
                            onSave={() => setIsFormOpen(false)}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}