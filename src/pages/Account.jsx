import { FaArrowLeft, FaSignal, FaWifi, FaBatteryFull, FaUserCircle, FaLandmark, FaPaperPlane, FaWallet, FaBus, FaMobileAlt, FaArrowUp, FaArrowDown, FaCreditCard } from "react-icons/fa";
import userImg from "../assets/8.png";

export default function Account() {
    const transactions = [
        { id: 1, title: "Bus 138", sub: "Colombo Uni - Homagama", date: "2 Jan 08:28", amount: "-Rs.128.26", type: "debit", icon: FaBus },
        { id: 2, title: "Hutch", sub: "Deposit", date: "7 Jan 16:33", amount: "+Rs.500.00", type: "credit", icon: FaLandmark },
        { id: 3, title: "Bus 101", sub: "Katubedda - Dehiwala", date: "12 Jan 19:45", amount: "-Rs.67.33", type: "debit", icon: FaBus },
        { id: 4, title: "Binura", sub: "Binura Account", date: "15 Jan 13:02", amount: "-Rs.250.00", type: "debit", icon: FaWallet },
        { id: 5, title: "Bus 255", sub: "Kottawa - Moratuwa Uni", date: "17 Jan 09:17", amount: "-Rs.87.52", type: "debit", icon: FaBus },
        { id: 6, title: "Food City", sub: "Card Payment", date: "18 Jan 11:20", amount: "-Rs.1,450.00", type: "debit", icon: FaCreditCard },
        { id: 7, title: "Salary", sub: "Monthly Salary", date: "25 Jan 08:00", amount: "+Rs.45,000.00", type: "credit", icon: FaLandmark },
    ];

    return (
        <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto space-y-8 animate-fade-in min-h-screen">
            {/* Header */}
            <div className="text-center space-y-2 mb-12">
                <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-500 neon-text">
                    MY WALLET
                </h1>
                <p className="text-xl text-blue-200 font-medium">Manage your trips, payments, and history</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
                {/* Left Column: Balance & Actions */}
                <div className="space-y-8">
                    {/* Balance Card */}
                    <div className="glass p-10 rounded-[3rem] border border-white/20 shadow-2xl relative overflow-hidden group hover:border-green-400/50 transition duration-700">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl -z-10 group-hover:bg-green-500/20 transition duration-700 -translate-y-1/2 translate-x-1/2"></div>

                        <div className="flex justify-between items-start mb-10">
                            <div>
                                <p className="text-gray-400 text-sm font-bold uppercase tracking-[0.2em] mb-2">Total Balance</p>
                                <h2 className="text-6xl font-black text-white tracking-tight flex items-baseline">
                                    <span className="text-2xl mr-2 text-green-400">Rs.</span>
                                    1,138.23
                                </h2>
                            </div>
                            <div className="w-16 h-18 rounded-full border-2 border-green-400 p-1">
                                <img src={userImg} alt="User" className="rounded-full bg-gray-800 w-14 h-16" />
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-6">
                            {[
                                { icon: FaLandmark, label: "Deposit", color: "text-green-400", bg: "bg-green-400/10" },
                                { icon: FaPaperPlane, label: "Transfer", color: "text-blue-400", bg: "bg-blue-400/10" },
                                { icon: FaWallet, label: "Withdraw", color: "text-orange-400", bg: "bg-orange-400/10" }
                            ].map((action, i) => (
                                <button key={i} className="flex flex-col items-center group/btn">
                                    <div className={`w-20 h-20 rounded-[2rem] ${action.bg} border border-white/10 flex items-center justify-center mb-4 group-hover/btn:scale-110 transition duration-300 shadow-lg`}>
                                        <action.icon className={`text-3xl ${action.color}`} />
                                    </div>
                                    <span className="text-sm font-bold text-gray-300 group-hover/btn:text-white transition uppercase tracking-wider">{action.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Promo / Stats */}
                    <div className="glass p-8 rounded-[3rem] border border-white/10 relative overflow-hidden hover:bg-white/5 transition duration-500 bg-gradient-to-r from-transparent to-white/5">
                        <div className="flex items-center justify-between relative z-10">
                            <div>
                                <h3 className="text-2xl font-black text-white mb-2 italic">Monthly Savings</h3>
                                <p className="text-blue-200">You saved <span className="text-green-400 font-bold bg-green-400/10 px-2 py-1 rounded-lg">Rs. 450.00</span> on trips this month!</p>
                            </div>
                            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-yellow-400 to-orange-500 flex items-center justify-center shadow-xl text-black animate-pulse">
                                <FaSignal className="text-3xl" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Transactions */}
                <div className="glass p-8 rounded-[3rem] border border-white/20 shadow-2xl h-[700px] flex flex-col relative overflow-hidden backdrop-blur-xl">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-teal-500"></div>
                    <div className="flex justify-between items-end mb-8">
                        <h2 className="text-3xl font-black text-white italic">Recent Transactions</h2>
                        <button className="text-sm text-green-400 font-bold hover:text-white transition uppercase tracking-wider border-b border-green-400 pb-1 hover:border-white">View All</button>
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 pr-2">
                        {transactions.map((tx) => (
                            <div key={tx.id} className="bg-white/5 p-5 rounded-3xl border border-white/5 flex items-center justify-between hover:bg-white/10 transition group cursor-pointer hover:-translate-x-[-8px] duration-300">
                                <div className="flex items-center space-x-5">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg ${tx.type === 'credit' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}`}>
                                        <tx.icon />
                                    </div>
                                    <div>
                                        <p className="font-bold text-white text-lg group-hover:text-blue-300 transition">{tx.title}</p>
                                        <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">{tx.sub}</p>
                                        <p className="text-[10px] text-gray-600 mt-1">{tx.date}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className={`font-black text-lg ${tx.type === 'credit' ? 'text-green-400' : 'text-white'}`}>{tx.amount}</p>
                                    <div className="flex items-center justify-end gap-1 mt-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                                        <span className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Success</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
