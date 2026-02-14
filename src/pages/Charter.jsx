import { useState } from "react";
import { FaStar, FaBus, FaCalendarAlt, FaUserFriends, FaQuoteLeft } from "react-icons/fa";

export default function Charter() {
    const [reviews, setReviews] = useState([
        { id: 1, name: "Kasun P.", rating: 5, text: "Best service for our company trip! The bus was modern and the driver was very professional." },
        { id: 2, name: "Sarah M.", rating: 4, text: "Great experience, very comfortable seats. Booking process was super easy." },
        { id: 3, name: "Dilshan A.", rating: 5, text: "Highly recommend for family trips. Safe and reliable." }
    ]);

    const [booking, setBooking] = useState({ date: "", days: 2, passengers: 40 });

    return (
        <div className="pt-24 pb-12 px-4 max-w-6xl mx-auto space-y-12 animate-fade-in">

            {/* Hero Section */}

            <div className="text-center space-y-2 mb-12">
                <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-500 neon-text">
                    CHARTER A BUS
                </h1>
                <p className="text-xl text-blue-200 font-medium">Premium Transport for Events, Trips & Corporate Travel</p>
            </div>



            {/* Booking Form */}
            <div className="glass p-8 rounded-3xl border border-white/20 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl -z-10"></div>

                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-white">Book Your Journey</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-blue-300 text-sm font-bold mb-2">Trip Start Date</label>
                                <div className="flex items-center bg-white/5 border border-white/10 rounded-xl p-3">
                                    <FaCalendarAlt className="text-gray-400 mr-3" />
                                    <input type="date" className="bg-transparent text-white w-full focus:outline-none" />
                                </div>
                            </div>
                            <div className="flex space-x-4">
                                <div className="flex-1">
                                    <label className="block text-blue-300 text-sm font-bold mb-2">Duration (Days)</label>
                                    <select className="bg-[#1e293b] text-white w-full p-3 rounded-xl border border-white/10 focus:outline-none">
                                        <option>1 Day</option>
                                        <option>2 Days</option>
                                        <option>3 Days</option>
                                        <option>1 Week</option>
                                    </select>
                                </div>
                                <div className="flex-1">
                                    <label className="block text-blue-300 text-sm font-bold mb-2">Passengers</label>
                                    <div className="flex items-center bg-white/5 border border-white/10 rounded-xl p-3">
                                        <FaUserFriends className="text-gray-400 mr-3" />
                                        <input type="number" defaultValue={40} className="bg-transparent text-white w-full focus:outline-none" />
                                    </div>
                                </div>
                            </div>
                            <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 py-4 rounded-xl font-bold text-lg text-white hover:scale-105 transition shadow-lg shadow-blue-500/30">
                                Request Quote
                            </button>
                        </div>
                    </div>

                    <div className="hidden md:block relative h-full min-h-[300px]">
                        {/* Abstract 3D Bus Graphic Placeholder */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <FaBus className="text-[200px] text-white/5 drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent"></div>
                        </div>
                        <div className="relative z-10 text-center">
                            <div className="inline-block p-6 glass rounded-2xl border border-white/10 backdrop-blur-md">
                                <p className="text-4xl font-black text-white">LKR 45k</p>
                                <p className="text-sm text-gray-400 uppercase tracking-widest">Starting Price / Day</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-8">
                <div className="flex justify-between items-end">
                    <h2 className="text-3xl font-bold text-white text-center">Traveller Stories</h2>
                    <button className="text-blue-400 hover:text-blue-300 text-sm font-bold border-b border-blue-400 hover:border-blue-300 transition">
                        Write a Review
                    </button>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {reviews.map((review) => (
                        <div key={review.id} className="glass-card p-6 relative group hover:-translate-y-2 transition-transform duration-300 border border-white/5 hover:border-blue-400/30">
                            <FaQuoteLeft className="text-4xl text-blue-500/20 absolute top-4 left-4" />

                            {/* Avatar placeholder */}
                            <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-black border border-white/20 overflow-hidden">
                                <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${review.name}`} alt={review.name} />
                            </div>

                            <div className="relative z-10 space-y-4 mt-4">
                                <div className="flex text-yellow-400 space-x-1 text-sm">
                                    {[...Array(review.rating)].map((_, i) => <FaStar key={i} />)}
                                </div>
                                <p className="text-gray-300 italic leading-relaxed text-sm">"{review.text}"</p>
                                <div className="pt-4 border-t border-white/10">
                                    <p className="font-bold text-blue-300">{review.name}</p>
                                    <p className="text-[10px] text-gray-500 uppercase tracking-wider">Verified Booking</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}
