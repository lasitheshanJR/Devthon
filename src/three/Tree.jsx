import { useRef } from "react";

export default function Tree({ position, scale = 1 }) {
    return (
        <group position={position} scale={scale}>
            {/* Trunk */}
            <mesh position={[0, 0.5, 0]}>
                <cylinderGeometry args={[0.2, 0.3, 1, 8]} />
                <meshStandardMaterial color="#3e2723" />
            </mesh>
            {/* Leaves */}
            <mesh position={[0, 1.5, 0]}>
                <coneGeometry args={[1, 2, 8]} />
                <meshStandardMaterial color="#2e7d32" />
            </mesh>
            <mesh position={[0, 2.5, 0]}>
                <coneGeometry args={[0.8, 1.5, 8]} />
                <meshStandardMaterial color="#4caf50" />
            </mesh>
        </group>
    );
}
