import { createContext, useState, useEffect, useCallback, useMemo } from "react"
import { mockTransactions } from "../data/mockTransactions"

export const FinanceContext = createContext()

export const FinanceProvider = ({ children }) => {

    const [transactions, setTransactions] = useState(() => {
        try {
            const saved = localStorage.getItem("financeos_ledger")
            return saved ? JSON.parse(saved) : mockTransactions
        } catch (e) {
            console.error("Ledger Restoration Failed:", e)
            return mockTransactions
        }
    })
    
    const [role, setRole] = useState(() => {
        try {
            const savedRole = localStorage.getItem("financeos_role")
            return savedRole || "admin"
        } catch (e) {
            return "admin"
        }
    })

    const [currentView, setCurrentView] = useState("Dashboard")
    const [timeRange, setTimeRange] = useState("1M")

    const [notifications, setNotifications] = useState([
        { id: 1, title: 'Liquidity Alert', message: 'Operational burn exceeded mean by 12%', type: 'warning', time: '2m ago', unread: true },
        { id: 2, title: 'Session Ingested', message: 'Manual mutation log committed successfully', type: 'success', time: '1h ago', unread: false },
    ])

    const [searchTerm, setSearchTerm] = useState("")
    const [filterType, setFilterType] = useState("all")
    const [sortBy, setSortBy] = useState("date")
    const [sortOrder, setSortOrder] = useState("desc")
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)

    // Persist session state
    useEffect(() => {
        localStorage.setItem("financeos_ledger", JSON.stringify(transactions))
    }, [transactions])

    useEffect(() => {
        localStorage.setItem("financeos_role", role)
    }, [role])

    const addTransaction = useCallback((newTx) => {
        const tx = { ...newTx, id: `tx-${Date.now()}` }
        setTransactions(prev => [tx, ...prev])
        setNotifications(prev => [{
            id: Date.now(),
            title: 'Registry Mutated',
            message: `New ${tx.type} session logged for $${tx.amount}`,
            type: 'success',
            time: 'Just now',
            unread: true
        }, ...prev])
    }, [])

    const updateTransaction = useCallback((updatedTx) => {
        setTransactions(prev => prev.map(tx => tx.id === updatedTx.id ? updatedTx : tx))
    }, [])

    const deleteTransaction = useCallback((id) => {
        setTransactions(prev => prev.filter(tx => tx.id !== id))
    }, [])

    const clearNotifications = useCallback(() => {
        setNotifications(prev => prev.map(n => ({ ...n, unread: false })))
    }, [])

    const value = useMemo(() => ({
        transactions,
        role,
        setRole,
        currentView,
        setCurrentView,
        timeRange,
        setTimeRange,
        searchTerm,
        setSearchTerm,
        filterType,
        setFilterType,
        sortBy,
        setSortBy,
        sortOrder,
        setSortOrder,
        notifications,
        setNotifications,
        clearNotifications,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        isSidebarOpen,
        setIsSidebarOpen
    }), [
        transactions, role, currentView, timeRange, searchTerm, filterType, sortBy, sortOrder, 
        notifications, isSidebarOpen
    ])

    return (
        <FinanceContext.Provider value={value}>
            {children}
        </FinanceContext.Provider>
    )

}