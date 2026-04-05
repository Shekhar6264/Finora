import { motion } from "framer-motion"
import { Bell, CheckCircle2, AlertTriangle } from "lucide-react"

export default function NotificationDropdown({ notifications, clearNotifications }) {

    const unreadCount = notifications.filter(n => n.unread).length

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute right-0 mt-3 w-80 
            bg-white dark:bg-[#0b0b0f] 
            border border-gray-200 dark:border-white/10 
            rounded-xl shadow-xl z-50 overflow-hidden"
        >

            {/* HEADER */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-white/10">
                <div className="flex items-center gap-2">
                    <Bell size={16} className="text-gray-500" />
                    <span className="text-sm font-semibold text-black dark:text-white">
                        Notifications
                    </span>
                </div>

                {unreadCount > 0 && (
                    <button
                        onClick={clearNotifications}
                        className="text-xs text-indigo-500 hover:underline"
                    >
                        Mark all
                    </button>
                )}
            </div>

            {/* LIST */}
            <div className="max-h-80 overflow-y-auto">

                {notifications.length > 0 ? (
                    notifications.map((n) => (
                        <div
                            key={n.id}
                            className="flex items-start gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-white/5 transition"
                        >

                            {/* ICON */}
                            <div className={`mt-1 ${
                                n.type === "warning"
                                    ? "text-rose-500"
                                    : "text-emerald-500"
                            }`}>
                                {n.type === "warning"
                                    ? <AlertTriangle size={18} />
                                    : <CheckCircle2 size={18} />}
                            </div>

                            {/* CONTENT */}
                            <div className="flex-1">
                                <div className="flex justify-between items-center">
                                    <span className={`text-sm ${
                                        n.unread
                                            ? "text-black dark:text-white font-medium"
                                            : "text-gray-500"
                                    }`}>
                                        {n.title}
                                    </span>

                                    <span className="text-xs text-gray-400">
                                        {n.time}
                                    </span>
                                </div>

                                <p className="text-xs text-gray-500 mt-1">
                                    {n.message}
                                </p>
                            </div>

                            {/* UNREAD DOT */}
                            {n.unread && (
                                <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2" />
                            )}
                        </div>
                    ))
                ) : (
                    <div className="p-6 text-center text-sm text-gray-500">
                        No notifications
                    </div>
                )}
            </div>

        </motion.div>
    )
}