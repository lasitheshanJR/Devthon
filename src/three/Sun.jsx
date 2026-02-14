import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";

export default function Sun() {
    const sunRef = useRef();
    const lightRef = useRef();

    useFrame((state) => {
        // Day/night cycle - Start at Morning (offset)
        const t = state.clock.getElapsedTime() * 0.05 + 1;
        const radius = 50;
        const x = Math.sin(t) * radius;
        const y = Math.cos(t) * radius;

        // Update position
        if (sunRef.current) {
            sunRef.current.position.set(x, y, -20);
        }

        // Adjust light intensity based on height
        if (lightRef.current) {
            lightRef.current.position.set(x, y, -20);

            // Keep it bright for "Morning/Day" look
            lightRef.current.intensity = Math.max(0.8, y / 8);

            // Warm Morning/Noon Sunlight
            const isSunset = y < 15 && y > -5;
            lightRef.current.color.set(isSunset ? "#fb923c" : "#fff7ed");
        }
    });

    return (
        <group>
            <Sphere ref={sunRef} args={[3, 32, 32]}>
                <meshBasicMaterial color="#fdb813" toneMapped={false} />
            </Sphere>
            <directionalLight
                ref={lightRef}
                castShadow
                shadow-mapSize={[2048, 2048]}
                shadow-bias={-0.0001}
            />
            <ambientLight intensity={0.6} color="#e0f2fe" />
        </group>
    );
}
