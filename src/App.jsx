import { HashRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Notifications from "./components/Notifications";
import Dashboard from "./pages/Dashboard";
import LiveMap from "./pages/LiveMap";
import Ticket from "./pages/Ticket";
import Footer from "./components/Footer";
import Charter from "./pages/Charter";
import Account from "./pages/Account";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Landing from "./pages/Landing";

const AppLayout = () => {
  return (
    <div className="relative min-h-screen font-sans text-gray-100 flex flex-col">
      {/* Global background for app routes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-600/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-600/20 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Notifications />
        <Navbar />
        <main className="pt-24 px-4 pb-20 max-w-7xl mx-auto flex-grow w-full">
          <Routes>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="map" element={<LiveMap />} />
            <Route path="account" element={<Account />} />
            <Route path="ticket" element={<Ticket />} />
            <Route path="charter" element={<Charter />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/app/*" element={<AppLayout />} />
        {/* Fallback redirect or handle other routes */}
        <Route path="*" element={<Landing />} />
      </Routes>
    </HashRouter>
  );
}
