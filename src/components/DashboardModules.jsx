import { useState } from "react";
import { FaHistory, FaBoxOpen, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { clsx } from "clsx";

export default function DashboardModules() {
    const [activeTab, setActiveTab] = useState("history");

    const historyData = [
        { id: 1, route: "Central - Station", date: "Today, 8:30 AM", cost: "LKR 150", status: "Completed" },
        { id: 2, route: "Fort - Kottawa", date: "Yesterday, 5:15 PM", cost: "LKR 200", status: "Completed" },
    ];

    const lostFoundData = [
        { id: 101, item: "Blue Umbrella", bus: "Bus #101", date: "2 hrs ago", status: "Found" },
        { id: 102, item: "Wallet (Black)", bus: "Bus #138", date: "1 day ago", status: "Claimed" },
    ];

    return (
        <div className="absolute top-40 left-6 w-80 z-40 pointer-events-auto">
            {/* Tabs */}
            <div className="flex space-x-2 mb-4">
                <button
                    onClick={() => setActiveTab("history")}
                    className={clsx(
                        "flex-1 py-2 rounded-lg font-bold text-sm transition-all text-white",
                        activeTab === "history" ? "bg-blue-600 shadow-lg shadow-blue-500/30" : "bg-white/10 hover:bg-white/20"
                    )}
                >
                    <FaHistory className="inline mr-2" /> History
                </button>
                <button
                    onClick={() => setActiveTab("lostfound")}
                    className={clsx(
                        "flex-1 py-2 rounded-lg font-bold text-sm transition-all text-white",
                        activeTab === "lostfound" ? "bg-pink-600 shadow-lg shadow-pink-500/30" : "bg-white/10 hover:bg-white/20"
                    )}
                >
                    <FaBoxOpen className="inline mr-2" /> Lost Items
                </button>
            </div>

            {/* Content */}
            <div className="glass-card max-h-[60vh] overflow-y-auto custom-scrollbar">
                {activeTab === "history" && (
                    <div className="space-y-3">
                        <h3 className="text-white font-bold mb-2">Recent Rides</h3>
                        {historyData.map((ride) => (
                            <div key={ride.id} className="bg-gray-600 p-3 rounded-lg border border-white/5 hover:bg-white/10 transition">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-sm font-bold text-blue-300">{ride.route}</p>
                                        <p className="text-xs text-gray-400 mt-1"><FaClock className="inline mr-1" />{ride.date}</p>
                                    </div>
                                    <span className="text-green-400 font-mono text-sm">{ride.cost}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === "lostfound" && (
                    <div className="space-y-3">
                        <h3 className="text-white font-bold mb-2">Lost & Found</h3>
                        {lostFoundData.map((item) => (
                            <div key={item.id} className="bg-gray-600 p-3 rounded-lg border border-white/5 hover:bg-white/10 transition">
                                <div className="flex justify-between">
                                    <span className="font-bold text-pink-300">{item.item}</span>
                                    <span className={clsx("text-xs px-2 py-0.5 rounded-full", item.status === "Found" ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400")}>
                                        {item.status}
                                    </span>
                                </div>
                                <p className=" text-xs text-gray-400 mt-1">Found on {item.bus} • {item.date}</p>
                            </div>
                        ))}
                        <button className="w-full mt-4 py-2 bg-pink-600 rounded-lg text-sm text-center hover:bg-white/20 transition text-gray-300">
                            Report Missing Item
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
