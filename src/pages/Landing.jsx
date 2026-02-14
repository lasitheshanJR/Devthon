import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
import Hero3D from "../three/Hero3D";
import userImg from "../assets/8.png";

export default function Landing() {
    const navigate = useNavigate();

    return (
        <div className="relative min-h-screen overflow-hidden bg-[#020617] text-white selection:bg-blue-500/30">
            {/* Premium Background Elements */}
            <div className="fixed inset-0 z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-green-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
                <div className="absolute top-[20%] right-[10%] w-72 h-72 bg-purple-600/10 rounded-full blur-[100px]" />

                {/* Animated Lines/Grid */}
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            </div>

            {/* Nav */}
            <nav className="relative z-10 flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
                <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/")}>
                    <div className="w-14 h-14 rounded-full border-2 border-green-400 p-0.5 overflow-hidden">
                        <img src={userImg} alt="User" className="rounded-full bg-gray-800 w-full h-full object-cover" />
                    </div>
                    <span className="text-2xl font-bold tracking-tighter">MYBUS</span>
                </div>


                <div className="flex items-center space-x-6">
                    <button
                        onClick={() => navigate("/login")}
                        className="px-6 py-2.5 bg-white text-black rounded-full text-sm font-bold flex items-center space-x-2 hover:bg-gray-200 transition-all active:scale-95 group"
                    >
                        <span>Get started</span>
                        <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </nav>

            {/* Hero Content */}
            <main className="relative z-10 max-w-7xl mx-auto px-8 pt-20 pb-32 flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center space-y-8"
                >
                    <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        <span>Next-Gen Bus Management</span>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[0.9] max-w-4xl mx-auto">
                        <span className="block">20% More Efficiency.</span>
                        <span className="block bg-gradient-to-r from-blue-400 via-green-400 to-emerald-400 bg-clip-text text-transparent italic pb-2">Guaranteed.</span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        Revolutionizing public transport with real-time tracking,
                        smart-analytics and AI-driven route optimization. Join the future of mobility today.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
                        <div className="relative group w-full max-w-md">
                            <input
                                type="text"
                                placeholder="Enter your email to join"
                                className="w-full px-6 py-4 bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-white"
                            />
                            <button
                                onClick={() => navigate("/login")}
                                className="absolute right-2 top-2 px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all active:scale-95 flex items-center space-x-2"
                            >
                                <span>Join Now</span>
                                <FiArrowRight />
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-center space-x-8 pt-8 text-gray-500 text-sm font-medium">
                        <div className="flex items-center space-x-2">
                            <FiCheckCircle className="text-green-500" />
                            <span>Real-time Tracking</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FiCheckCircle className="text-green-500" />
                            <span>Smart Wallets</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FiCheckCircle className="text-green-500" />
                            <span>AI Optimization</span>
                        </div>
                    </div>
                </motion.div>

                {/* Floating 3D-like Mockup/Graphic */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, delay: 0.4 }}
                    className="mt-20 w-full max-w-6xl aspect-video rounded-3xl bg-gray-900/40 border border-white/5 backdrop-blur-3xl shadow-[0_0_80px_rgba(59,130,246,0.1)] overflow-hidden relative"
                >
                    <Hero3D />

                    {/* Minimal UI Overlay for the 3D Scene */}
                    <div className="absolute top-6 left-6 pointer-events-none">
                        <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_#3b82f6]" />
                            <span className="text-[10px] uppercase tracking-[0.3em] text-blue-400/60 font-bold font-mono">
                                Interactive Real-time Engine
                            </span>
                        </div>
                    </div>

                    <div className="absolute bottom-6 right-6 pointer-events-none text-right">
                        <div className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold font-mono">
                            Orbital Perspective Active
                        </div>
                    </div>
                </motion.div>
            </main>

            {/* Footer (Simplified) */}
            <footer className="relative z-10 py-12 px-8 border-t border-white/5 bg-gray-950/50 backdrop-blur-md">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
                    <div>© 2026 MYBUS. All rights reserved.</div>
                    <div className="flex space-x-8 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white transition-colors">Terms</a>
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors">Security</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
