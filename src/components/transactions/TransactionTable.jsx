import { useState, useContext } from "react"
import { FinanceContext } from "../../context/FinanceContext"
import { 
  Search, 
  Edit2, 
  Trash2, 
  Plus, 
  Filter, 
  ChevronDown, 
  ChevronUp, 
  Download, 
  Table2, 
  SearchSlash, 
  ArrowRightCircle, 
  SlidersHorizontal,
  PlusCircle,
  FileSpreadsheet
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import TransactionForm from "./TransactionForm"

export default function TransactionTable() {
    
    const { 
        transactions, role, deleteTransaction, 
        searchTerm, setSearchTerm, 
        filterType, setFilterType,
        sortBy, setSortBy 
    } = useContext(FinanceContext)
    
    const [editTx, setEditTx] = useState(null)
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [sortOrder, setSortOrder] = useState('desc')

    const filtered = transactions
        .filter(t => (filterType === 'all' || t.type === filterType) && 
                    (t.category.toLowerCase().includes(searchTerm.toLowerCase()) || 
                     t.description.toLowerCase().includes(searchTerm.toLowerCase())))
        .sort((a, b) => {
            const factor = sortOrder === 'asc' ? 1 : -1
            if (sortBy === 'date') return (new Date(a.date) - new Date(b.date)) * factor
            if (sortBy === 'amount') return (a.amount - b.amount) * factor
            return 0
        })

    const handleSort = (key) => {
        if (sortBy === key) setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
        else { setSortBy(key); setSortOrder('desc') }
    }

    const exportToCSV = () => {
        const headers = ["Date,Category,Type,Amount,Description\n"]
        const rows = filtered.map(t => `${t.date},${t.category},${t.type},${t.amount},${t.description}\n`)
        const blob = new Blob([...headers, ...rows], { type: 'text/csv' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `finance_export_${new Date().toISOString().split('T')[0]}.csv`
        a.click()
    }

    return (
        <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-10 glass premium-card p-8 sm:p-12 bg-dark-900/40 relative overflow-hidden h-fit shadow-4xl group/table"
        >
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 relative z-20 transition-all">
                <div className="flex items-start gap-5">
                    <div className="p-4 bg-brand-primary text-white rounded-[22px] shadow-2xl shadow-brand-primary/30 flex items-center justify-center scale-110 group-hover/table:rotate-6 transition-transform">
                        <Table2 size={24} strokeWidth={2.5} />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <h2 className="text-4xl font-extrabold text-white tracking-tighter leading-none">Financial <span className="text-brand-primary italic">Ledger</span></h2>
                        <div className="flex items-center gap-3 mt-1.5">
                            <span className="w-2 h-2 bg-brand-primary rounded-full animate-ping shadow-[0_0_15px_rgba(79,70,229,1)]" />
                            <p className="text-[10px] font-black uppercase text-gray-500 tracking-[0.4em] translate-y-0.5">{filtered.length} Indexed Sequences</p>
                        </div>
                    </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
                    <div className="relative flex-1 lg:w-96 group">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-primary transition-colors" />
                        <input 
                            type="text" placeholder="Locate capital mutations..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-6 py-4 bg-white/[0.03] border border-white/[0.05] focus:border-white/[0.15] rounded-[20px] outline-none focus:ring-4 focus:ring-brand-primary/10 transition-all font-bold text-sm text-white placeholder-gray-600 shadow-inner"
                        />
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <div className="relative group">
                          <SlidersHorizontal size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none group-focus-within:text-brand-primary" />
                          <select 
                              value={filterType} onChange={e => setFilterType(e.target.value)}
                              className="pl-10 pr-6 py-4 bg-white/[0.03] border border-white/[0.05] focus:border-white/[0.15] rounded-[20px] outline-none transition-all text-[11px] font-black uppercase tracking-[0.25em] text-gray-400 appearance-none text-center cursor-pointer shadow-inner min-w-[160px] hover:text-white"
                          >
                              <option value="all">View: All Flux</option>
                              <option value="income">Credits Index</option>
                              <option value="expense">Debits Index</option>
                          </select>
                        </div>

                        <button onClick={exportToCSV} className="p-4 bg-white/[0.03] text-gray-500 rounded-[20px] border border-white/5 hover:text-white hover:bg-white/10 transition-all hover:-translate-y-1.5 shadow-xl active:scale-95 group/csv">
                            <FileSpreadsheet size={22} className="group-hover/csv:scale-110 transition-transform" />
                        </button>
                    </div>

                    {role === 'admin' && (
                        <button 
                            onClick={() => { setEditTx(null); setIsFormOpen(true) }}
                            className="bg-brand-primary text-white pl-8 pr-12 py-4 rounded-[22px] flex items-center justify-center gap-4 hover:scale-[1.05] active:scale-95 transition-all font-black text-xs uppercase tracking-[0.3em] shadow-4xl shadow-brand-primary/40 group/btn relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                            <Plus size={20} className="scale-125 stroke-[3px]" /> 
                            <span className="relative z-10 translate-y-0.5">Execute Ingest</span>
                        </button>
                    )}
                </div>
            </div>

            <div className="w-full relative z-10 overflow-hidden">
                <div className="overflow-x-auto rounded-[32px] border border-white/[0.05] bg-dark-950/60 custom-scrollbar group-hover/table:border-white/[0.15] transition-colors">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="bg-white/[0.02] border-b border-white/[0.05]">
                                {[
                                    {label: 'Sequence Date', key: 'date'},
                                    {label: 'Category Identity', key: 'category'},
                                    {label: 'Flow State', key: 'type', center: true},
                                    {label: 'Capital Value (USD)', key: 'amount', right: true}
                                ].map(col => (
                                    <th 
                                        key={col.key} 
                                        onClick={() => handleSort(col.key)}
                                        className={`px-10 py-7 text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] cursor-pointer hover:text-brand-primary transition-colors select-none ${col.center ? 'text-center' : ''} ${col.right ? 'text-right' : ''}`}
                                    >
                                        <div className={`flex items-center gap-3 ${col.center ? 'justify-center' : ''} ${col.right ? 'justify-end' : ''}`}>
                                            {col.label}
                                            {sortBy === col.key && (sortOrder === 'asc' ? <ChevronUp size={14} className="animate-bounce text-brand-primary" /> : <ChevronDown size={14} className="animate-bounce text-brand-primary" />)}
                                        </div>
                                    </th>
                                ))}
                                {role === 'admin' && <th className="px-10 py-7 text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] text-center w-40">Operations</th>}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.03]">
                            <AnimatePresence mode="popLayout">
                                {filtered.map((t, idx) => (
                                    <motion.tr 
                                        key={t.id}
                                        layout
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ delay: idx * 0.03, type: 'spring', damping: 20 }}
                                        className="hover:bg-white/[0.03] transition-all group/row cursor-default"
                                    >
                                        <td className="px-10 py-6">
                                            <span className="text-sm font-black text-gray-400 tracking-tighter tabular-nums group-hover/row:text-white transition-colors">{t.date}</span>
                                        </td>
                                        <td className="px-10 py-6">
                                            <div className="flex flex-col leading-tight gap-1">
                                                <span className="text-sm font-black text-white group-hover/row:translate-x-1.5 transition-transform inline-block italic uppercase tracking-tight">{t.category}</span>
                                                <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest group-hover/row:text-gray-400 transition-colors truncate max-w-[240px] opacity-60 group-hover/row:opacity-100 italic">{t.description}</span>
                                            </div>
                                        </td>
                                        <td className="px-10 py-6 text-center">
                                            <div className="flex justify-center">
                                                <span className={`px-5 py-2.5 rounded-2xl text-[9px] font-black uppercase tracking-[0.3em] border-2 italic shadow-2xl transition-all duration-500 group-hover/row:scale-110 ${t.type === 'income' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-emerald-500/5' : 'bg-rose-500/10 text-rose-400 border-rose-500/20 shadow-rose-500/5'}`}>
                                                    {t.type}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-10 py-6 text-right">
                                            <span className={`text-lg font-extrabold tabular-nums transition-all duration-700 block group-hover/row:scale-110 group-hover/row:translate-x-[-10px] ${t.type === 'income' ? 'text-emerald-500 drop-shadow-[0_0_20px_rgba(16,185,129,0.3)]' : 'text-rose-500 drop-shadow-[0_0_20px_rgba(244,63,94,0.3)]'}`}>
                                                {t.type === 'income' ? '+' : '-'}${t.amount.toLocaleString()}
                                            </span>
                                        </td>
                                        {role === 'admin' && (
                                            <td className="px-10 py-6">
                                                <div className="flex items-center justify-center gap-3 opacity-0 group-hover/row:opacity-100 transition-all translate-x-4 group-hover/row:translate-x-0">
                                                    <button onClick={() => { setEditTx(t); setIsFormOpen(true) }} className="p-3 bg-white/5 text-gray-400 hover:text-brand-primary hover:bg-brand-primary/10 rounded-[16px] transition-all group/icon active:scale-90 border border-white/5 hover:scale-110">
                                                      <Edit2 size={16} />
                                                    </button>
                                                    <button onClick={() => deleteTransaction(t.id)} className="p-3 bg-white/5 text-gray-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-[16px] transition-all group/icon active:scale-90 border border-white/5 hover:scale-110">
                                                      <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        )}
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                    {filtered.length === 0 && (
                        <div className="p-32 flex flex-col items-center justify-center text-gray-600 gap-6 group/void">
                            <div className="w-32 h-32 bg-white/5 rounded-[50px] flex items-center justify-center text-gray-700 group-hover/void:scale-110 group-hover/void:text-brand-primary transition-all duration-1000 border border-white/5 shadow-4xl relative overflow-hidden">
                              <SearchSlash size={50} strokeWidth={1} className="relative z-10" />
                              <div className="absolute inset-0 bg-brand-primary/5 blur-2xl opacity-0 group-hover/void:opacity-100 transition-opacity" />
                            </div>
                            <div className="flex flex-col items-center gap-2">
                              <p className="text-sm font-black text-white tracking-[0.5em] uppercase italic">Void Pointer Reference</p>
                              <p className="text-[10px] font-black uppercase text-gray-600 tracking-[0.4em]">Zero matched sequences in local data-lake</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* FLOATING ACTION TRIGGER MODAL */}
            <AnimatePresence>
                {isFormOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-[#000]/80 backdrop-blur-[40px] z-[1000] flex items-center justify-center p-6 overflow-y-auto pointer-events-auto"
                    >
                        <motion.div 
                            initial={{ scale: 0.85, y: 50, rotateX: 15 }}
                            animate={{ scale: 1, y: 0, rotateX: 0 }}
                            exit={{ scale: 0.85, y: 50, opacity: 0, rotateX: 15 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 150 }}
                            className="relative w-full max-w-xl perspective-1000 shadow-5xl"
                        >
                            <button 
                                onClick={() => setIsFormOpen(false)} 
                                className="absolute -top-20 right-0 text-white font-black hover:text-brand-primary transition-all uppercase tracking-[0.4em] text-[10px] bg-white/5 px-8 py-4 rounded-full border border-white/10 flex items-center gap-3 backdrop-blur-3xl group/dismiss"
                            >
                                <ArrowRightCircle size={16} className="rotate-180 group-hover/dismiss:-translate-x-1 transition-transform" /> 
                                <span className="translate-y-0.5">Dismiss Operational Command</span>
                            </button>
                            <TransactionForm editData={editTx} onSave={() => setIsFormOpen(false)} />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            
            {/* AMBIENT LIGHTING OVERLAY */}
            <div className="absolute top-[-30%] right-[-10%] w-[600px] h-[600px] bg-brand-primary/5 blur-[120px] rounded-full pointer-events-none group-hover/table:opacity-40 transition-opacity" />
        </motion.div>
    )

}