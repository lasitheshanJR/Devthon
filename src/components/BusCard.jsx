import CrowdBadge from "./CrowdBadge";

export default function BusCard({ bus }) {
  return (
    <div className="glass-card hover:scale-[1.02] transition-transform duration-300 neon-border group relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <span className="text-6xl font-black">BUS</span>
      </div>

      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Bus #{bus.id}
          </h2>
          <p className="text-sm text-gray-400">Route: {bus.route || "City Loop"}</p>
        </div>
        <CrowdBadge level={bus.crowd} />
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="bg-white/5 p-3 rounded-lg">
          <p className="text-xs text-gray-400 uppercase tracking-wider">Speed</p>
          <p className="text-xl font-mono text-blue-300">{bus.speed} <span className="text-xs">km/h</span></p>
        </div>
        <div className="bg-white/5 p-3 rounded-lg">
          <p className="text-xs text-gray-400 uppercase tracking-wider">ETA</p>
          <p className="text-xl font-mono text-purple-300">{bus.eta}</p>
        </div>
      </div>
    </div>
  );
}
