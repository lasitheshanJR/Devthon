import { useState, useEffect } from "react";
import { clsx } from "clsx";
import { FaBell, FaExclamationTriangle, FaBus } from "react-icons/fa";
import { busService } from "../services/busService";

export default function Notifications() {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        // Subscribe to bus updates to generate alerts
        const unsubscribe = busService.subscribeToBusUpdates((buses) => {
            // Logic to trigger random alerts for demo purposes
            if (Math.random() > 0.8) {
                const randomBus = buses[Math.floor(Math.random() * buses.length)];
                addNotification({
                    id: Date.now(),
                    type: randomBus.crowd === "High" ? "warning" : "info",
                    message: randomBus.crowd === "High"
                        ? `Bus #${randomBus.id} is getting crowded!`
                        : `Bus #${randomBus.id} approaching Station.`,
                    subtext: randomBus.route
                });
            }
        });

        return () => unsubscribe();
    }, []);

    const addNotification = (note) => {
        setNotifications((prev) => [note, ...prev].slice(0, 3)); // Keep last 3

        // Auto dismiss
        setTimeout(() => {
            setNotifications((prev) => prev.filter(n => n.id !== note.id));
        }, 5000);
    };

    return (
        <div className="fixed bottom-20 right-4 z-50 flex flex-col gap-2 w-80 pointer-events-none">
            {notifications.map((note) => (
                <div
                    key={note.id}
                    className={clsx(
                        "glass-card p-4 rounded-xl shadow-2xl backdrop-blur-md border border-white/10 animate-slide-in pointer-events-auto flex items-start space-x-3",
                        note.type === "warning" ? "bg-red-500/20 border-red-500/30" : "bg-blue-500/20 border-blue-500/30"
                    )}
                >
                    <div className={clsx("p-2 rounded-full", note.type === "warning" ? "bg-red-500 text-white" : "bg-blue-500 text-white")}>
                        {note.type === "warning" ? <FaExclamationTriangle /> : <FaBus />}
                    </div>
                    <div>
                        <h4 className="font-bold text-white text-sm">{note.message}</h4>
                        <p className="text-gray-400 text-xs">{note.subtext}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
