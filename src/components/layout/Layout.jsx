import Sidebar from "./Sidebar"
import Header from "./Header"
import { motion, AnimatePresence } from "framer-motion"
import { useFinance } from "../../hooks/useFinance"
import { useEffect, useState } from "react"

export default function Layout({ children }) {
    const { isSidebarOpen } = useFinance()

    // 🌙 THEME SYSTEM
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || "dark"
    })

    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark")
        localStorage.setItem("theme", theme)
    }, [theme])

    return (
        <div className="flex min-h-screen bg-black text-gray-200 overflow-x-hidden">

            {/* 🌌 BACKGROUND */}
            <div className="fixed inset-0 -z-10">
                <div className="absolute inset-0 bg-black" />
                <div className="absolute top-[-200px] right-[-200px] w-[600px] h-[600px] bg-indigo-500/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-200px] left-[-200px] w-[600px] h-[600px] bg-purple-500/10 blur-[120px] rounded-full" />
            </div>

            {/* SIDEBAR */}
            <Sidebar />

            {/* MAIN */}
            <div
                className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
                    isSidebarOpen ? "lg:ml-64" : "lg:ml-20"
                }`}
            >
                {/* HEADER WITH THEME TOGGLE */}
                <Header theme={theme} setTheme={setTheme} />

                <main className="flex-1 px-4 sm:px-6 lg:px-10 py-6">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={theme}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="w-full max-w-screen-2xl mx-auto"
                        >
                            {children}
                        </motion.div>
                    </AnimatePresence>
                </main>

                {/* FOOTER */}
                <footer className="text-xs text-gray-500 border-t border-white/10 py-6 px-6 flex flex-col sm:flex-row justify-between items-center">
                    <span>Finance Dashboard - Shekhar Jamalpuri © 2026</span>

                    <div className="flex gap-6 mt-2 sm:mt-0">
                        {["Privacy", "Security", "Status"].map((item) => (
                            <span
                                key={item}
                                className="hover:text-white cursor-pointer transition"
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                </footer>
            </div>
        </div>
    )
}