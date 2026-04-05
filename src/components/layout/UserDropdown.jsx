import { motion } from "framer-motion"
import { Shield, Eye, Settings, LogOut } from "lucide-react"

export default function UserDropdown({ role, setRole, setIsOpen }) {
    
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute right-0 mt-3 w-64 
            bg-white dark:bg-[#0b0b0f] 
            border border-gray-200 dark:border-white/10 
            rounded-xl shadow-xl z-50 overflow-hidden"
        >

            {/* USER INFO */}
            <div className="px-4 py-3 border-b border-gray-200 dark:border-white/10">
                <p className="text-sm font-medium text-black dark:text-white">
                    Account
                </p>
                <p className="text-xs text-gray-500">
                    Manage your role & settings
                </p>
            </div>

            {/* ROLES */}
            <div className="flex flex-col">

                <button
                    onClick={() => {
                        setRole("admin")
                        setIsOpen(false)
                    }}
                    className={`flex items-center gap-3 px-4 py-3 text-sm transition ${
                        role === "admin"
                            ? "bg-indigo-500/10 text-indigo-500"
                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5"
                    }`}
                >
                    <Shield size={16} />
                    Admin
                </button>

                <button
                    onClick={() => {
                        setRole("viewer")
                        setIsOpen(false)
                    }}
                    className={`flex items-center gap-3 px-4 py-3 text-sm transition ${
                        role === "viewer"
                            ? "bg-indigo-500/10 text-indigo-500"
                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5"
                    }`}
                >
                    <Eye size={16} />
                    Viewer
                </button>
            </div>

            {/* DIVIDER */}
            <div className="border-t border-gray-200 dark:border-white/10" />

            {/* SETTINGS */}
            <button className="flex items-center gap-3 px-4 py-3 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 transition">
                <Settings size={16} />
                Settings
            </button>

            {/* LOGOUT */}
            <button className="flex items-center gap-3 px-4 py-3 text-sm text-rose-500 hover:bg-rose-500/10 transition">
                <LogOut size={16} />
                Logout
            </button>

        </motion.div>
    )
}