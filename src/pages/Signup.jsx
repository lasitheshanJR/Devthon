import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiArrowRight, FiUser } from "react-icons/fi";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSkip = () => {
        console.warn("Debug: Skipping signup and entering app.");
        navigate("/app/dashboard");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            console.log("Attempting Firebase registration for:", email);
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            // Update display name
            if (name) {
                await updateProfile(userCredential.user, { displayName: name });
            }

            console.log("Registration successful!");
            navigate("/app/dashboard");
        } catch (err) {
            console.error("Firebase Signup Error Code:", err.code);
            console.error("Firebase Signup Error Message:", err.message);
            setError(err.message.includes("auth/email-already-in-use")
                ? "This email is already registered."
                : `Error: ${err.code}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-12rem)]">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <div className="p-8 rounded-3xl bg-gray-900/50 backdrop-blur-xl border border-white/10 shadow-2xl">
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                            Join MYBUS
                        </h1>
                        <p className="text-gray-400 mt-2">Create your account and start tracking</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium text-center"
                            >
                                {error}
                            </motion.div>
                        )}

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300 ml-1">Full Name</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-blue-400 transition-colors">
                                    <FiUser size={20} />
                                </div>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-white/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all text-white placeholder-gray-500"
                                    placeholder="Your Name"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300 ml-1">Email Address</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-blue-400 transition-colors">
                                    <FiMail size={20} />
                                </div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-white/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all text-white placeholder-gray-500"
                                    placeholder="name@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300 ml-1">Password</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-green-400 transition-colors">
                                    <FiLock size={20} />
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-white/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all text-white placeholder-gray-500"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-500 hover:to-green-500 text-white font-bold rounded-2xl shadow-lg shadow-blue-900/20 transform active:scale-[0.98] transition-all flex items-center justify-center space-x-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span>{loading ? "Creating Account..." : "Create Account"}</span>
                            {!loading && <FiArrowRight className="group-hover:translate-x-1 transition-transform" />}
                        </button>
                    </form>

                    <div className="mt-8 text-center text-sm space-y-4">
                        <div>
                            <span className="text-gray-500">Already have an account? </span>
                            <button
                                onClick={() => navigate("/login")}
                                className="text-green-400 hover:text-green-300 font-medium transition-colors cursor-pointer"
                            >
                                Log in
                            </button>
                        </div>
                        <button
                            onClick={handleSkip}
                            className="text-xs text-gray-600 hover:text-gray-400 font-mono tracking-tighter transition-colors underline decoration-dotted"
                        >
                            DEBUG: SKIP SIGNUP
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
