import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
    OrbitControls,
    PerspectiveCamera,
    Float,
    MeshDistortMaterial,
    ContactShadows,
    Environment,
    Text
} from "@react-three/drei";
import * as THREE from "three";
import Bus from "./Bus";

function CinematicBus() {
    const busRef = useRef();

    // Custom animation for the bus
    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (busRef.current) {
            // Gentle floating and tilting
            busRef.current.rotation.y = Math.sin(t * 0.2) * 0.2;
            busRef.current.position.y = Math.sin(t * 0.5) * 0.15;
        }
    });

    return (
        <group ref={busRef}>
            <Bus scale={1.2} position={[0, 0, 0]} />
        </group>
    );
}

function Grid() {
    return (
        <gridHelper
            args={[100, 50, "#3b82f6", "#1e293b"]}
            position={[0, -2, 0]}
            rotation={[0, 0, 0]}
            opacity={0.1}
            transparent
        />
    );
}

export default function Hero3D() {
    return (
        <div className="w-full h-full min-h-[500px] cursor-grab active:cursor-grabbing">
            <Canvas shadows dpr={[1, 2]}>
                <PerspectiveCamera makeDefault position={[8, 3, 10]} fov={40} />

                {/* Lights */}
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                <pointLight position={[-10, -10, -10]} color="#3b82f6" intensity={1} />
                <pointLight position={[10, -10, 10]} color="#10b981" intensity={1} />

                {/* Environment for reflections */}
                <Environment preset="city" />

                <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                    <CinematicBus />
                </Float>

                <ContactShadows
                    position={[0, -2, 0]}
                    opacity={0.4}
                    scale={20}
                    blur={2}
                    far={4.5}
                />

                <Grid />

                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    minPolarAngle={Math.PI / 4}
                    maxPolarAngle={Math.PI / 1.8}
                />
            </Canvas>
        </div>
    );
}
