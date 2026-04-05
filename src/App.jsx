import { useFinance } from "./hooks/useFinance"
import Layout from "./components/layout/Layout"
import Dashboard from "./pages/Dashboard"
import TransactionTable from "./components/table/TransactionTable"
import Insights from "./components/Insights"
import { motion, AnimatePresence } from "framer-motion"
import { Radio, CreditCard, ShieldCheck, Settings as SettingsIcon, User, Moon, Sun, Bell, Lock, Globe, Zap } from "lucide-react"
import { useState, useEffect } from "react"

const SettingsView = ({ theme, setTheme }) => {

  const userData = [
    { label: "Name", value: "Shekhar Jamalpuri", icon: <User size={16} /> },
    { label: "Email", value: "shekharjamalpuri18@gmail.com", icon: <Globe size={16} /> },
    { label: "Role", value: "Admin", icon: <Lock size={16} /> },
    { label: "Notifications", value: "Enabled", icon: <Bell size={16} /> }
  ]

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-10 max-w-5xl mx-auto w-full pt-10"
    >

      {/* HEADER */}
      <div className="flex flex-col gap-4 border-b border-white/[0.05] pb-8">
        <h2 className="text-4xl font-black text-white tracking-tight">
          Settings
        </h2>
        <p className="text-sm text-gray-500">
          Manage your account and preferences
        </p>
      </div>

      {/* SETTINGS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* DARK MODE */}
        <div className="glass p-6 flex justify-between items-center border border-white/[0.05] shadow-premium rounded-2xl">
          <div>
            <p className="text-sm font-medium text-white">Theme</p>
            <p className="text-xs text-gray-500">Switch appearance</p>
          </div>

          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={`w-14 h-7 rounded-full flex items-center px-1 transition ${
              theme === "dark"
                ? "bg-brand-primary justify-end shadow-glow"
                : "bg-gray-700 justify-start"
            }`}
          >
            <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center text-black">
              {theme === "dark" ? <Moon size={12} /> : <Sun size={12} />}
            </div>
          </button>
        </div>

        {/* SECURITY */}
        <div className="glass p-6 flex justify-between items-center border border-white/[0.05] shadow-premium rounded-2xl">
          <div>
            <p className="text-sm font-medium text-white">Security</p>
            <p className="text-xs text-gray-500">Account protected</p>
          </div>

          <ShieldCheck size={20} className="text-brand-primary" />
        </div>
      </div>

      {/* PROFILE */}
      <div className="glass p-8 flex flex-col gap-6 border border-white/[0.05] shadow-premium rounded-2xl">

        <span className="text-sm text-gray-500">Profile</span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {userData.map((item) => (
            <div
              key={item.label}
              className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.05] flex items-center gap-3 hover:border-brand-primary/30 transition"
            >
              <div className="text-gray-500">
                {item.icon}
              </div>

              <div>
                <p className="text-xs text-gray-500">
                  {item.label}
                </p>
                <p className="text-sm font-semibold text-white">
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

    </motion.div>
  )
}

const EquityView = () => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-12 max-w-6xl mx-auto w-full pt-10">
    <div className="flex flex-col gap-4 border-b border-white/5 pb-8">
      <h2 className="text-5xl font-black italic uppercase text-white tracking-widest">Asset Equity</h2>
      <p className="text-[11px] font-black uppercase text-gray-500">Portfolio Overview</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="glass p-12 flex flex-col items-center">
        <CreditCard size={60} className="text-brand-primary" />
        <span className="text-xl text-white">Distribution</span>
      </div>
      <div className="glass p-12 flex flex-col items-center">
        <Zap size={60} className="text-yellow-400" />
        <span className="text-xl text-white">Growth</span>
      </div>
    </div>
  </motion.div>
)

const StreamView = () => {
  const { transactions } = useFinance()

  return (
    <motion.div className="flex flex-col gap-6 max-w-4xl mx-auto w-full pt-10">
      {transactions.slice(0, 6).map((tx) => (
        <div key={tx.id} className="glass p-4 flex justify-between">
          <span className="text-white">{tx.category}</span>
          <span className={tx.type === "income" ? "text-emerald-400" : "text-rose-400"}>
            {tx.type === "income" ? "+" : "-"}${tx.amount}
          </span>
        </div>
      ))}
    </motion.div>
  )
}

export default function App() {
  const { currentView } = useFinance()

  // 🌙 GLOBAL THEME
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  )

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
    localStorage.setItem("theme", theme)
  }, [theme])

  const renderView = () => {
    switch (currentView) {
      case "Dashboard": return <Dashboard />
      case "Registry": return <TransactionTable />
      case "Insights": return <Insights />
      case "Settings": return <SettingsView theme={theme} setTheme={setTheme} />
      case "Equity": return <EquityView />
      case "Stream": return <StreamView />
      default: return <Dashboard />
    }
  }

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <motion.div key={currentView}>
          {renderView()}
        </motion.div>
      </AnimatePresence>
    </Layout>
  )
}