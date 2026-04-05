import { useState } from "react"
import { useFinance } from "../../hooks/useFinance"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Bell, ChevronDown, User } from "lucide-react"
import NotificationDropdown from "./NotificationDropdown"
import UserDropdown from "./UserDropdown"

export default function Header({ theme, setTheme }) {
    const {
        role,
        setRole,
        searchTerm,
        setSearchTerm,
        notifications,
        clearNotifications,
    } = useFinance()

    const [isUserOpen, setIsUserOpen] = useState(false)
    const [isNotifyOpen, setIsNotifyOpen] = useState(false)

    const unread = notifications.filter(n => n.unread).length

    return (
        <header className="sticky top-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/10 px-6 py-3 flex items-center justify-between">

            {/* 🔍 SEARCH */}
            <div className="relative w-full max-w-md">
                <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
                <input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search transactions..."
                    className="w-full pl-9 pr-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white outline-none focus:border-indigo-500"
                />
            </div>

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-4 ml-6">

                

                {/* 🔔 NOTIFICATIONS */}
                <div className="relative">
                    <button
                        onClick={() => {
                            setIsNotifyOpen(!isNotifyOpen)
                            setIsUserOpen(false)
                        }}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 relative"
                    >
                        <Bell size={18} />
                        {unread > 0 && (
                            <span className="absolute top-1 right-1 w-2 h-2 bg-indigo-500 rounded-full" />
                        )}
                    </button>

                    <AnimatePresence>
                        {isNotifyOpen && (
                            <NotificationDropdown
                                notifications={notifications}
                                clearNotifications={() => {
                                    clearNotifications()
                                    setIsNotifyOpen(false)
                                }}
                            />
                        )}
                    </AnimatePresence>
                </div>

                {/* 👤 USER */}
                <div className="relative">
                    <button
                        onClick={() => {
                            setIsUserOpen(!isUserOpen)
                            setIsNotifyOpen(false)
                        }}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10"
                    >
                        <User size={18} />
                        <span className="hidden sm:block text-sm">
                            {role === "admin" ? "Admin" : "User"}
                        </span>
                        <ChevronDown size={14} />
                    </button>

                    <AnimatePresence>
                        {isUserOpen && (
                            <UserDropdown
                                role={role}
                                setRole={setRole}
                                setIsOpen={setIsUserOpen}
                            />
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
    )
}