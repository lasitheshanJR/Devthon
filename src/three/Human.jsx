import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Human({ position, walking = false, ...props }) {
    const group = useRef();

    useFrame((state) => {
        if (walking) {
            // Smooth walking animation
            const t = state.clock.getElapsedTime();
            group.current.position.y = position[1] + Math.abs(Math.sin(t * 8)) * 0.05;
            group.current.rotation.y = Math.sin(t * 2) * 0.1;
            // Simulate forward movement if part of a moving scene
        }
    });

    return (
        <group ref={group} position={position} {...props}>
            {/* Head (Smooth) */}
            <mesh position={[0, 1.6, 0]} castShadow>
                <sphereGeometry args={[0.22, 32, 32]} />
                <meshStandardMaterial color="#fca5a5" roughness={0.5} />
            </mesh>

            {/* Eyes (Realistic) */}
            <mesh position={[0.08, 1.65, 0.18]}>
                <sphereGeometry args={[0.03, 16, 16]} />
                <meshStandardMaterial color="black" roughness={0.1} />
            </mesh>
            <mesh position={[-0.08, 1.65, 0.18]}>
                <sphereGeometry args={[0.03, 16, 16]} />
                <meshStandardMaterial color="black" roughness={0.1} />
            </mesh>

            {/* Body (Smooth Capsule) */}
            <mesh position={[0, 0.9, 0]} castShadow>
                <capsuleGeometry args={[0.25, 0.7, 8, 16]} />
                <meshStandardMaterial color={Math.random() > 0.5 ? "#3b82f6" : "#ec4899"} />
            </mesh>

            {/* Legs (Cylinders) */}
            <mesh position={[-0.12, 0.3, 0]}>
                <cylinderGeometry args={[0.08, 0.08, 0.6, 16]} />
                <meshStandardMaterial color="#1e293b" />
            </mesh>
            <mesh position={[0.12, 0.3, 0]}>
                <cylinderGeometry args={[0.08, 0.08, 0.6, 16]} />
                <meshStandardMaterial color="#1e293b" />
            </mesh>
        </group>
    );
}
