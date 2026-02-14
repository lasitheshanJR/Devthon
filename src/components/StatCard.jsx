import { motion } from "framer-motion";

export default function StatCard({ title, value, neon }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-glass backdrop-blur-glass p-4 rounded-xl w-48 border border-white/20"
    >
      <p className="text-sm opacity-70">{title}</p>
      <p className={`text-xl font-bold ${neon && "text-neon"}`}>
        {value}
      </p>
    </motion.div>
  );
}
