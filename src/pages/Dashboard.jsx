import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import Scene from "../three/Scene";
import HUD from "../components/HUD";
import DashboardModules from "../components/DashboardModules";
import userImg from "../assets/8.png";
import { busService } from "../services/busService";

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    // Start real-time bus simulation automatically
    const interval = busService.startSimulation();
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen w-full relative overflow-hidden">
      {/* Header Overlay */}
      <div className="absolute top-0 left-0 right-0 z-50 pt-8 px-8 flex justify-between items-center bg-gradient-to-b from-black/80 via-black/40 to-transparent pb-12 pointer-events-none">
        {/* Forward Button (Left) */}
        <button
          onClick={() => navigate("/app/map")}
          className="pointer-events-auto p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition border border-white/10 hover:border-blue-400 group backdrop-blur-md"
        >
          <FaArrowRight className="group-hover:translate-x-1 transition text-xl" />
        </button>

        {/* Title (Center) */}
        <div className="text-center">

          <h1 className="text-5xl md:text-6xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-500 neon-text">
            MYBUS
          </h1>

          <p className="hidden md:block text-xl text-blue-200 font-bold tracking-widest uppercase mt-1 drop-shadow-md text-black">
            Next Gen Transport
          </p>
        </div>

        {/* User Profile (Right) */}
        <div className="hidden md:block pointer-events-auto">
          <div className="flex items-center space-x-4">
            <button
              onClick={async () => {
                const { busService } = await import("../services/busService");
                await busService.seedBuses();
                alert("Database Seeded!");
              }}
              className="px-4 py-2 bg-blue-600/20 border border-blue-500/30 rounded-full text-xs font-bold text-blue-300 hover:bg-blue-600/40 transition"
            >
              Seed DB
            </button>
            <div className="flex items-center space-x-4 bg-white/10 px-5 py-2 rounded-full border border-white/10 backdrop-blur-md hover:bg-white/20 transition cursor-pointer">
              <div className="text-right">
                <p className="text-white font-bold text-sm shadow-black drop-shadow-sm">Lasith Eeshan</p>
                <p className="text-green-400 text-xs text-[10px] font-black tracking-widest uppercase">Online</p>
              </div>
              <div className="w-12 h-12 rounded-full border-2 border-green-400 overflow-hidden shadow-[0_0_15px_rgba(74,222,128,0.4)]">
                <img src={userImg} alt="User" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Scene />
      <HUD />
      <DashboardModules />

      <div className="absolute bottom-6 right-6 bg-glass backdrop-blur-glass p-4 rounded-xl border border-white/20 z-40">
        🚍 MyBus | Live Telemetry Active
      </div>
    </div>
  );
}
