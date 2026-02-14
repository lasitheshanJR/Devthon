import { realtimeDB } from "../firebase";
import { ref, onValue, set, update, get } from "firebase/database";

// Define paths for each route (simplified as arrays of [lat, lng])
const ROUTE_PATHS = {
    "138": [
        [6.933, 79.850], [6.925, 79.855], [6.920, 79.860], [6.910, 79.870], [6.890, 79.890],
        [6.880, 79.910], [6.870, 79.930], [6.860, 79.950], [6.850, 79.960], [6.843, 79.965]
    ],
    "101": [
        [6.935, 79.860], [6.932, 79.865], [6.930, 79.862], [6.928, 79.860], [6.925, 79.858],
        [6.922, 79.855], [6.920, 79.852], [6.925, 79.860]
    ],
    "001": [
        [7.290, 80.630], [7.280, 80.620], [7.250, 80.580], [7.200, 80.500], [7.100, 80.400],
        [7.000, 80.200], [6.950, 80.000], [6.933, 79.850]
    ],
    "350": [
        [6.030, 80.210], [6.020, 80.220], [6.010, 80.250], [5.980, 80.350], [5.950, 80.450], [5.940, 80.540]
    ],
    "EX1": [
        [6.050, 80.150], [6.100, 80.120], [6.300, 80.100], [6.500, 80.050], [6.700, 80.000], [6.900, 79.950]
    ],
    "DEFAULT": [
        [6.927, 79.861], [6.930, 79.865], [6.935, 79.870], [6.930, 79.880], [6.920, 79.885], [6.910, 79.880], [6.927, 79.861]
    ]
};

const getPositionOnRoute = (routeId, index) => {
    const path = ROUTE_PATHS[routeId] || ROUTE_PATHS["DEFAULT"];
    const safeIndex = index % path.length;
    return { lat: path[safeIndex][0], lng: path[safeIndex][1] };
};

export const busService = {
    // Initial Seed Data (Call this once if needed)
    seedBuses: async () => {
        const initialBuses = [
            { id: "101", routeId: "101", route: "Central - Station", speed: 45, crowd: "Low", status: "On Time", pathIndex: 0 },
            { id: "138", routeId: "138", route: "Fort - Kottawa", speed: 32, crowd: "High", status: "Delayed", pathIndex: 2 },
            { id: "120", routeId: "DEFAULT", route: "Pettah - Horana", speed: 28, crowd: "Medium", status: "On Time", pathIndex: 1 },
            { id: "001", routeId: "001", route: "Kandy - Colombo", speed: 60, crowd: "Medium", status: "On Time", pathIndex: 5 },
            { id: "350", routeId: "350", route: "Galle - Matara", speed: 55, crowd: "Low", status: "On Time", pathIndex: 0 },
            { id: "EX1", routeId: "EX1", route: "Kadawatha - Matara", speed: 90, crowd: "Low", status: "On Time", pathIndex: 3 },
            { id: "102", routeId: "101", route: "Central - Station", speed: 40, crowd: "Medium", status: "On Time", pathIndex: 4 },
            { id: "139", routeId: "138", route: "Fort - Kottawa", speed: 35, crowd: "Low", status: "On Time", pathIndex: 5 },
            { id: "154", routeId: "DEFAULT", route: "Kiribathgoda - Angulana", speed: 38, crowd: "High", status: "Delayed", pathIndex: 2 },
            { id: "177", routeId: "DEFAULT", route: "Kollupitiya - Kaduwela", speed: 25, crowd: "Medium", status: "Traffic", pathIndex: 0 },
            { id: "100", routeId: "DEFAULT", route: "Panadura - Pettah", speed: 50, crowd: "Low", status: "On Time", pathIndex: 3 },
            { id: "122", routeId: "138", route: "Maharagama - Pettah", speed: 42, crowd: "High", status: "On Time", pathIndex: 7 },
        ].reduce((acc, bus) => {
            const pos = getPositionOnRoute(bus.routeId, bus.pathIndex);
            acc[bus.id] = { ...bus, lat: pos.lat, lng: pos.lng };
            return acc;
        }, {});

        await set(ref(realtimeDB, 'buses'), initialBuses);
        console.log("Database seeded successfully!");
    },

    getBuses: async () => {
        const snapshot = await get(ref(realtimeDB, 'buses'));
        if (snapshot.exists()) {
            return Object.values(snapshot.val());
        }
        return [];
    },

    getRoutes: () => {
        return ROUTE_PATHS;
    },

    subscribeToBusUpdates: (callback) => {
        const busesRef = ref(realtimeDB, 'buses');
        return onValue(busesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                callback(Object.values(data));
            } else {
                callback([]);
            }
        });
    },

    // Optional: Simulate movements by updating Firebase from the client (for demo)
    startSimulation: () => {
        return setInterval(async () => {
            const snapshot = await get(ref(realtimeDB, 'buses'));
            const buses = snapshot.val();
            if (!buses) return;

            const updates = {};
            Object.keys(buses).forEach(id => {
                const bus = buses[id];
                const newIndex = (bus.pathIndex || 0) + 1;
                const pos = getPositionOnRoute(bus.routeId, newIndex);
                updates[`/buses/${id}/pathIndex`] = newIndex;
                updates[`/buses/${id}/lat`] = pos.lat;
                updates[`/buses/${id}/lng`] = pos.lng;
                updates[`/buses/${id}/speed`] = Math.max(0, parseFloat(bus.speed) + (Math.random() * 10 - 5)).toFixed(1);
            });
            update(ref(realtimeDB), updates);
        }, 3000);
    },

    processPayment: (amount) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ success: true, transactionId: "TXN_" + Date.now() });
            }, 1500);
        });
    }
};
