import { useEffect, useState } from "react";
import { busService } from "../services/busService";
import "./HUD.css";

export default function HUD() {
    const [stats, setStats] = useState({ speed: 0, passengers: 0, status: "CALIBRATING", nextStop: "Terminal" });

    useEffect(() => {
        const unsubscribe = busService.subscribeToBusUpdates((buses) => {

            const avgSpeed = buses.reduce((acc, b) => acc + parseFloat(b.speed), 0) / buses.length;
            const totalPassengers = buses.length * 42;


            const stops = ["Central Station", "Town Hall", "University Dr", "Tech Park"];
            const nextStop = stops[Math.floor((Date.now() / 10000) % stops.length)];

            setStats({
                speed: avgSpeed.toFixed(1),
                passengers: totalPassengers,
                status: "OPTIMAL",
                nextStop
            });
        });
        return () => unsubscribe();
    }, []);

    return (
        <div className="absolute inset-0 pointer-events-none p-6 flex flex-col justify-between">

            <div className="flex justify-between items-start">
                <div className="glass p-4 px-18 rounded-br-2xl border-t border-l border-white/20">
                    <h1 className="text-2xl font-bold italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-500">
                        මටම කියලා <span className="text-white">බස් එකක්</span>
                    </h1>
                    <div className="flex items-center space-x-2 mt-1 pointer-events-auto">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <p className="text-xs text-white font-mono tracking-widest uppercase">
                            Next: {stats.nextStop}
                        </p>
                    </div>
                </div>

                <div className="glass p-4 rounded-bl-2xl border-t border-r border-white/20 text-right">
                    <div className="text-2xl font-mono font-bold text-green-500 drop-shadow-sm">{stats.status}</div>
                    <div className="text-xs text-gray-600 font-bold uppercase">System Integrity</div>
                </div>
            </div>


            <div className="grid grid-cols-3 gap-4 mb-20 pointer-events-auto">
                <div className="glass-card flex flex-col items-center justify-center bg-white/10 backdrop-blur-md">
                    <span className="text-gray-200 font-bold text-xs uppercase shadow-black drop-shadow-md">Avg Network Speed</span>
                    <span className="text-4xl font-mono font-black text-blue-500 drop-shadow-lg">{stats.speed} <span className="text-sm">km/h</span></span>
                </div>

                <div className="glass-card flex flex-col items-center justify-center border-pink-500/30 border bg-white/10 backdrop-blur-md">
                    <span className="text-gray-200 font-bold text-xs uppercase shadow-black drop-shadow-md">Total Passengers</span>
                    <span className="text-4xl font-mono font-black text-pink-500 drop-shadow-lg">{stats.passengers}</span>
                </div>

                <div className="glass-card flex flex-col items-center justify-center bg-white/10 backdrop-blur-md">
                    <span className="text-gray-200 font-bold text-xs uppercase shadow-black drop-shadow-md">Active Units</span>
                    <span className="text-4xl font-mono font-black text-purple-600 drop-shadow-lg">3</span>
                </div>
            </div>
        </div>
    );
}
