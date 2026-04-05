import { useContext } from "react"
import { FinanceContext } from "../context/FinanceContext"
import { FiUserCheck, FiShield, FiEye, FiSettings } from "react-icons/fi"

export default function RoleSwitcher() {
    
    const { role, setRole } = useContext(FinanceContext)

    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 bg-white border border-gray-100 rounded-3xl shadow-sm gap-4 transition-all">
            <div className="flex flex-col gap-1 px-1">
                <span className="text-[10px] font-black uppercase text-blue-500 tracking-widest leading-3 flex items-center gap-1">
                    <FiSettings /> System Access
                </span>
                <h1 className="text-2xl font-black text-gray-800 tracking-tighter">Finance OS</h1>
            </div>

            <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-2xl w-full md:w-auto overflow-hidden">
                <button 
                    onClick={() => setRole('viewer')}
                    className={`flex-1 md:flex-none flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${role === 'viewer' ? 'bg-white shadow-sm text-blue-600 scale-100' : 'text-gray-400 hover:text-gray-600'}`}
                >
                    <FiEye /> Viewer
                </button>
                <button 
                    onClick={() => setRole('admin')}
                    className={`flex-1 md:flex-none flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${role === 'admin' ? 'bg-white shadow-sm text-green-600 scale-100 font-black' : 'text-gray-400 hover:text-gray-600'}`}
                >
                    <FiShield /> Admin
                </button>
            </div>
            
            <div className="hidden lg:flex items-center gap-3 px-6 py-2 border-l-2 border-gray-50 self-stretch">
                <div className="w-10 h-10 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-black shadow-lg shadow-blue-200">
                    {role === 'admin' ? 'A' : 'V'}
                </div>
                <div className="flex flex-col -gap-1">
                    <p className="text-sm font-black text-gray-800 tracking-tight leading-4">Demo User</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{role} session</p>
                </div>
            </div>
        </div>
    )

}