import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { busService } from "../services/busService";
import { FaArrowLeft, FaTrafficLight, FaCrosshairs, FaShareAlt, FaLayerGroup } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import userImg from "../assets/8.png";

// Fix for default Leaflet icons in Vite
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const createBusIcon = (crowd, heading = 0) => {
  // "Dark blue need to be now"
  const color = "#00008B"; // DarkBlue

  return L.divIcon({
    className: "custom-icon",
    html: `
      <div style="transform: rotate(${heading}deg); transition: all 0.5s ease;" class="w-8 h-8 flex items-center justify-center">
        <div style="background-color: ${color};" class="w-5 h-9 border-2 border-white rounded-md shadow-xl relative flex flex-col items-center justify-between py-1">
            <div class="w-[90%] h-[20%] bg-blue-300 rounded-sm"></div> {/* Windshield */}
            <div class="w-[90%] h-[15%] bg-blue-900 rounded-sm opacity-50"></div> {/* Rear */}
            <div class="absolute -right-1 top-2 w-0.5 h-1 bg-yellow-400"></div> {/* Side Light */}
            <div class="absolute -left-1 top-2 w-0.5 h-1 bg-yellow-400"></div>
        </div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
};

export default function LiveMap() {
  const [buses, setBuses] = useState([]);
  const [routes, setRoutes] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch initial data
    busService.getBuses().then(setBuses);
    setRoutes(busService.getRoutes()); // Get Route Paths

    const unsubscribe = busService.subscribeToBusUpdates(setBuses);
    return () => unsubscribe();
  }, []);

  return (
    <div className="flex flex-col h-full animate-fade-in space-y-6">
      {/* Header */}
      <div className="relative flex items-center justify-center mb-8 mt-4">
        <button
          onClick={() => navigate("/")}
          className="absolute left-0 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/5 hover:bg-white/10 text-white transition border border-white/10 hover:border-blue-400 group z-10"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition text-xl" />
        </button>

        <div className="text-center px-4">
          <h1 className="text-5xl md:text-6xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-500 neon-text uppercase mb-2">
            LIVE MAP
          </h1>
          <p className="hidden md:block text-xl text-blue-200 font-bold tracking-widest uppercase">
            Real-time Bus Tracking
          </p>
        </div>

        {/* User Profile (Desktop Only) */}
        <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2">
          <div className="flex items-center space-x-3 bg-white/5 px-4 py-2 rounded-full border border-white/10 backdrop-blur-sm">
            <div className="text-right">
              <p className="text-white font-bold text-sm">Lasith Eeshan</p>
              <p className="text-gray-400 text-xs text-[10px] tracking-wider font-bold">GOLD MEMBER</p>
            </div>
            <div className="w-12 h-12 rounded-full border-2 border-green-400 overflow-hidden shadow-[0_0_10px_rgba(74,222,128,0.3)]">
              <img src={userImg} alt="User" />
            </div>
          </div>
        </div>
      </div>

      <div className="h-[75vh] glass rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative">
        <div className="absolute top-4 right-4 z-[400] bg-white/90 backdrop-blur px-4 py-2 rounded-full text-xs font-bold text-gray-800 border border-gray-200 shadow-md flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          Live Feed • tracking {buses.length} units
        </div>

        <MapContainer center={[6.9271, 79.8612]} zoom={13} className="h-full w-full bg-[#f8fafc]"> {/* Light BG for loading */}
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          />

          {/* Dynamic Traffic Routes from Service */}
          {Object.entries(routes).map(([routeId, path]) => (
            <Polyline
              key={routeId}
              positions={path}
              color={routeId === "138" || routeId === "DEFAULT" ? "#000000" : "#f97316"} // Black for main route to match generic map style
              weight={6}
              opacity={0.8}
            />
          ))}

          {buses.map(bus => (
            <Marker
              key={bus.id}
              position={[bus.lat, bus.lng]}
              icon={createBusIcon(bus.crowd)}
            >
              <Popup className="glass-popup">
                <div className="p-2 min-w-[150px]">
                  <strong className="text-lg block mb-1">Bus #{bus.id}</strong>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Speed:</span>
                    <span className="font-mono">{bus.speed} km/h</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Crowd:</span>
                    <span className={bus.crowd === 'High' ? 'text-red-500 font-bold' : 'text-green-500'}>
                      {bus.crowd}
                    </span>
                  </div>
                  <div className="mt-2 text-xs text-gray-400">
                    Route: {bus.route}
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Floating Action Buttons (Right Side) */}
        <div className="absolute right-4 bottom-24 flex flex-col gap-3 z-[400]">
          <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-700 shadow-lg hover:scale-110 transition border border-gray-100 group">
            <FaTrafficLight className="text-xl group-hover:text-red-500 transition" />
          </button>
          <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-700 shadow-lg hover:scale-110 transition border border-gray-100 group">
            <FaCrosshairs className="text-xl group-hover:text-blue-500 transition" />
          </button>
          <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-700 shadow-lg hover:scale-110 transition border border-gray-100 group">
            <FaLayerGroup className="text-xl group-hover:text-purple-500 transition" />
          </button>
          <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-700 shadow-lg hover:scale-110 transition border border-gray-100 group">
            <FaShareAlt className="text-xl group-hover:text-green-500 transition" />
          </button>
        </div>

        {/* Route Info Card */}
        <div className="absolute bottom-4 left-4 z-[400] glass px-6 py-4 rounded-2xl border border-white/20 shadow-2xl animate-slide-up bg-black/80 backdrop-blur-md">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse shadow-[0_0_10px_#3b82f6]"></div>
            <h3 className="text-white font-bold text-lg">Route 138: Fort - Kottawa</h3>
          </div>
          <div className="flex space-x-6 text-sm">
            <div>
              <p className="text-gray-400 text-xs uppercase">Active Buses</p>
              <p className="text-blue-300 font-mono font-bold text-xl">{buses.length}</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs uppercase">Next Bus</p>
              <p className="text-green-400 font-mono font-bold text-xl">5 min</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs uppercase">Traffic</p>
              <p className="text-yellow-400 font-mono font-bold text-xl">Mod</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
