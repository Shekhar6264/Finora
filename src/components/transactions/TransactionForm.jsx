import { useState, useContext, useEffect } from "react"
import { FinanceContext } from "../../context/FinanceContext"
import { X } from "lucide-react"

export default function TransactionForm({ editData, onSave }) {

    const { addTransaction, updateTransaction } = useContext(FinanceContext)

    const [form, setForm] = useState({
        date: new Date().toISOString().split("T")[0],
        category: "",
        type: "expense",
        amount: "",
        description: ""
    })

    useEffect(() => {
        if (editData) setForm(editData)
    }, [editData])

    const handleSubmit = (e) => {
        e.preventDefault()

        const tx = {
            ...form,
            amount: Number(form.amount)
        }

        if (editData) updateTransaction(tx)
        else addTransaction(tx)

        onSave()
    }

    const categories = [
        "Salary", "Food", "Transport", "Shopping",
        "Rent", "Entertainment", "Utilities",
        "Freelance", "Investment", "Health", "Gift"
    ]

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">

            <div className="relative w-full max-w-md 
                bg-white dark:bg-[#0b0b0f] 
                rounded-2xl p-6 shadow-2xl 
                border border-gray-200 dark:border-white/10">

                {/* CLOSE */}
                <button
                    onClick={onSave}
                    className="absolute top-4 right-4 text-gray-400 hover:text-black dark:hover:text-white"
                >
                    <X size={20} />
                </button>

                {/* HEADER */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-black dark:text-white">
                        {editData ? "Edit Transaction" : "Add Transaction"}
                    </h2>
                    <p className="text-sm text-gray-500">
                        Track your income and expenses easily
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                    {/* DATE */}
                    <input
                        type="date"
                        value={form.date}
                        onChange={(e) =>
                            setForm({ ...form, date: e.target.value })
                        }
                        className="w-full px-3 py-2.5 rounded-lg 
                        bg-white dark:bg-[#111118]
                        border border-gray-300 dark:border-white/10
                        text-sm text-black dark:text-white
                        outline-none
                        focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    />

                    {/* TYPE */}
                    <div className="flex rounded-lg bg-gray-100 dark:bg-white/5 p-1">
                        <button
                            type="button"
                            onClick={() => setForm({ ...form, type: "income" })}
                            className={`flex-1 py-2 rounded-md text-sm font-medium ${
                                form.type === "income"
                                    ? "bg-emerald-500 text-white"
                                    : "text-gray-500 dark:text-gray-400"
                            }`}
                        >
                            Income
                        </button>

                        <button
                            type="button"
                            onClick={() => setForm({ ...form, type: "expense" })}
                            className={`flex-1 py-2 rounded-md text-sm font-medium ${
                                form.type === "expense"
                                    ? "bg-rose-500 text-white"
                                    : "text-gray-500 dark:text-gray-400"
                            }`}
                        >
                            Expense
                        </button>
                    </div>

                    {/* CATEGORY */}
                    <select
                        value={form.category}
                        onChange={(e) =>
                            setForm({ ...form, category: e.target.value })
                        }
                        className="w-full px-3 py-2.5 rounded-lg 
                        bg-white dark:bg-[#111118]
                        border border-gray-300 dark:border-white/10
                        text-sm text-black dark:text-white
                        outline-none
                        focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    >
                        <option value="">Select category</option>
                        {categories.map((c) => (
                            <option key={c}>{c}</option>
                        ))}
                    </select>

                    {/* AMOUNT */}
                    <input
                        type="number"
                        placeholder="Amount"
                        value={form.amount}
                        onChange={(e) =>
                            setForm({ ...form, amount: e.target.value })
                        }
                        className="w-full px-3 py-2.5 rounded-lg 
                        bg-white dark:bg-[#111118]
                        border border-gray-300 dark:border-white/10
                        text-black dark:text-white
                        outline-none text-lg font-semibold
                        focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    />

                    {/* DESCRIPTION */}
                    <textarea
                        placeholder="Description"
                        value={form.description}
                        onChange={(e) =>
                            setForm({ ...form, description: e.target.value })
                        }
                        className="w-full px-3 py-2.5 rounded-lg 
                        bg-white dark:bg-[#111118]
                        border border-gray-300 dark:border-white/10
                        text-sm text-black dark:text-white
                        outline-none resize-none h-24
                        focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    />

                    {/* BUTTON */}
                    <button
                        type="submit"
                        className="mt-2 py-3 rounded-lg 
                        bg-gradient-to-r from-indigo-500 to-purple-500 
                        text-white font-medium 
                        hover:opacity-90 transition shadow-md"
                    >
                        {editData ? "Update Transaction" : "Add Transaction"}
                    </button>

                </form>
            </div>
        </div>
    )
}