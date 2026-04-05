import { useState } from "react"
import { useFinance } from "../../hooks/useFinance"
import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutDashboard,
  ArrowLeftRight,
  LineChart,
  Settings,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Radio,
  Menu,
  X
} from "lucide-react"

export default function Sidebar() {
  const {
    isSidebarOpen,
    setIsSidebarOpen,
    currentView,
    setCurrentView
  } = useFinance()

  const [mobileOpen, setMobileOpen] = useState(false)

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { name: "Transactions", icon: <ArrowLeftRight size={18} /> },
    { name: "Insights", icon: <LineChart size={18} /> },
    { name: "Cards", icon: <CreditCard size={18} /> },
    { name: "Live", icon: <Radio size={18} /> },
  ]

  const bottomItem = { name: "Settings", icon: <Settings size={18} /> }

  const handleNav = (item) => {
    setCurrentView(item.name)
    setMobileOpen(false)
  }

  return (
    <>
      {/* 🔥 MOBILE BUTTON */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white/10 rounded-lg text-white"
      >
        <Menu size={20} />
      </button>

      {/* 📱 MOBILE DRAWER */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            className="fixed inset-0 bg-black z-50 p-6 flex flex-col"
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="self-end text-white mb-6"
            >
              <X size={22} />
            </button>

            <nav className="flex flex-col gap-3">
              {[...menuItems, bottomItem].map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNav(item)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left ${
                    currentView === item.name
                      ? "bg-indigo-500 text-white"
                      : "text-gray-400 hover:bg-white/10"
                  }`}
                >
                  {item.icon}
                  {item.name}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 💻 DESKTOP SIDEBAR */}
      <motion.aside
        layout
        className={`hidden lg:flex flex-col fixed top-0 left-0 h-full bg-black/80 backdrop-blur-xl border-r border-white/10 transition-all duration-300 ${
          isSidebarOpen ? "w-64" : "w-20"
        }`}
      >
        {/* LOGO */}
        <div className="flex items-center gap-3 p-4 border-b border-white/10">
          <div className="w-9 h-9 bg-indigo-500 rounded-lg flex items-center justify-center text-white font-bold">
            F
          </div>
          {isSidebarOpen && (
            <span className="text-white font-semibold">
              Finora
            </span>
          )}
        </div>

        {/* MENU */}
        <div className="flex-1 flex flex-col gap-1 p-3">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNav(item)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                currentView === item.name
                  ? "bg-indigo-500/20 text-white"
                  : "text-gray-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              {item.icon}
              {isSidebarOpen && <span>{item.name}</span>}
            </button>
          ))}
        </div>

        {/* BOTTOM */}
        <div className="p-3 border-t border-white/10 flex flex-col gap-2">
          <button
            onClick={() => handleNav(bottomItem)}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
              currentView === bottomItem.name
                ? "bg-indigo-500/20 text-white"
                : "text-gray-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            {bottomItem.icon}
            {isSidebarOpen && <span>{bottomItem.name}</span>}
          </button>

          {/* TOGGLE */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="flex items-center justify-center mt-2 p-2 bg-white/10 rounded-lg text-gray-400 hover:text-white"
          >
            {isSidebarOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
          </button>
        </div>
      </motion.aside>
    </>
  )
}