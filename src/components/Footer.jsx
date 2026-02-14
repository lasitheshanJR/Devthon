import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="glass border-t border-white/10 mt-20 relative z-10">
            <div className="max-w-6xl mx-auto px-6 py-12">
                <div className="grid md:grid-cols-3 gap-8">

                    <div className="space-y-4">
                        <h2 className="text-2xl font-black italic tracking-tighter text-white">
                            MY<span className="text-blue-500">BUS</span>
                        </h2>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Revolutionizing public transport with AI-driven analytics, live tracking, and seamless 3D experiences.
                        </p>
                    </div>


                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-white">Contact Us</h3>
                        <div className="space-y-2 text-gray-400">
                            <p className="flex items-center hover:text-blue-400 transition cursor-pointer">
                                <FaPhoneAlt className="mr-3 text-sm" /> +94 70 258 5796
                            </p>
                            <p className="flex items-center hover:text-blue-400 transition cursor-pointer">
                                <FaEnvelope className="mr-3 text-sm" /> lasitheeshan@mybus.lk
                            </p>
                        </div>
                    </div>


                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-white">Follow Us</h3>
                        <div className="flex space-x-4">
                            {[FaFacebookF, FaTwitter, FaInstagram, FaYoutube].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-blue-500 hover:text-white transition-all hover:scale-110 shadow-lg shadow-black/20">
                                    <Icon />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 mt-12 pt-8 text-center text-xs text-gray-500">
                    &copy; 2024 MyBus Platform. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
