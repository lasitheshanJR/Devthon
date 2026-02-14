import { useNavigate, useLocation } from "react-router-dom";
import { clsx } from "clsx";
import { FaBus, FaMapMarkedAlt, FaTicketAlt, FaChartLine, FaUserFriends, FaUserCircle } from "react-icons/fa";
import userImg from "../assets/12.png";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const NavItem = ({ to, icon, label }) => {
    const isActive = location.pathname === to;
    return (
      <button
        onClick={() => navigate(to)}
        className={clsx(
          "flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 cursor-pointer",
          isActive
            ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
            : "text-gray-400 hover:text-white hover:bg-white/10"
        )}
      >
        <span>{icon}</span>
        <span className="hidden md:inline font-medium">{label}</span>
      </button>
    );
  };

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-4xl glass rounded-full px-6 py-3 flex justify-between items-center shadow-2xl backdrop-blur-md">
      <button onClick={() => navigate("/app/dashboard")} className="flex items-center space-x-2 group cursor-pointer">
        <div className="w-12 h-12 rounded-full border-2 border-green-400 overflow-hidden shadow-[0_0_10px_rgba(74,222,128,0.3)]">
          <img src={userImg} alt="User" />
        </div>

        <h1 className="font-bold text-xl tracking-wide bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          MYBUS
        </h1>
      </button>

      <div className="flex space-x-1">
        <NavItem to="/app/dashboard" icon={<FaBus />} label="Dashboard" />
        <NavItem to="/app/map" icon={<FaMapMarkedAlt />} label="Live Map" />
        <NavItem to="/app/account" icon={<FaUserCircle />} label="Wallet" />
        <NavItem to="/app/ticket" icon={<FaTicketAlt />} label="Tickets" />
        <NavItem to="/app/charter" icon={<FaUserFriends />} label="Charter" />
      </div>
    </nav>
  );
}
