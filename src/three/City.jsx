import { Grid } from "@react-three/drei";
import * as THREE from 'three';
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import Tree from "./Tree";
import Cloud from "./Cloud";
import Human from "./Human";
import Car from "./Car";

export default function City() {
  const cityRef = useRef();

  useFrame((state) => {
    // Simulate Bus Speed by moving the world Z+ (towards camera)
    if (cityRef.current) {
      const speed = 15;
      cityRef.current.position.z = (state.clock.getElapsedTime() * speed) % 20;
    }
  });

  return (
    <group>
      <group ref={cityRef}>
        {/* Road Surface */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.48, -40]} receiveShadow>
          <planeGeometry args={[14, 200]} />
          <meshStandardMaterial color="#334155" roughness={0.8} />
        </mesh>
        {/* Lane markings (Center) */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.47, -40]}>
          <planeGeometry args={[0.2, 200]} />
          <meshStandardMaterial color="white" />
        </mesh>
        {/* Lane markings (Sides) */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[3.5, -0.47, -40]}>
          <planeGeometry args={[0.15, 200]} />
          <meshStandardMaterial color="#cbd5e1" /> // faded white
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-3.5, -0.47, -40]}>
          <planeGeometry args={[0.15, 200]} />
          <meshStandardMaterial color="#cbd5e1" />
        </mesh>

        {/* Traffic - Animated Cars */}
        {/* Oncoming (Left) */}
        <Car position={[-2.5, 0.5, -10]} speed={0.5} color="#ef4444" /> {/* Red Car */}
        <Car position={[-2.5, 0.5, -50]} speed={0.7} color="#f59e0b" /> {/* Orange Car */}
        <Car position={[-5.5, 0.5, -30]} speed={0.6} color="#8b5cf6" /> {/* Purple Car */}
        <Car position={[-5.5, 0.5, -80]} speed={0.8} color="#06b6d4" /> {/* Cyan Car */}

        {/* Same Direction (Right) - appearing slower relative to bus */}
        <Car position={[2.5, 0.5, -25]} speed={-0.2} color="#3b82f6" /> {/* Blue Taxi */}
        <Car position={[5.5, 0.5, -60]} speed={-0.3} color="#10b981" /> {/* Green Car */}

        {/* Cyber Grid Floor (Scenery) */}
        <Grid
          renderOrder={-1}
          position={[0, -0.5, -10]}
          args={[60, 200]}
          infiniteGrid
          cellSize={0.6}
          sectionSize={3}
          fadeDistance={70}
          sectionColor="#60a5fa"
          cellColor="#93c5fd"
        />

        {/* Scenery: Trees & Buildings */}
        {Array.from({ length: 50 }).map((_, i) => {
          const x = (Math.random() - 0.5) * 80;
          const z = -Math.random() * 120;
          const scale = Math.random() * 3 + 1;

          // Keep road area clear (x: -8 to 8)
          if (Math.abs(x) < 9) return null;

          return (
            <group key={i} position={[x, 0, z]}>
              {Math.random() > 0.5 ? (
                // Building
                <mesh position={[0, scale / 2, 0]}>
                  <boxGeometry args={[1.5, scale, 1.5]} />
                  <meshStandardMaterial
                    color="#475569"
                    emissive="#60a5fa"
                    emissiveIntensity={0.05}
                    transparent
                    opacity={0.9}
                  />
                  <lineSegments>
                    <edgesGeometry args={[new THREE.BoxGeometry(1.5, scale, 1.5)]} />
                    <lineBasicMaterial color="#60a5fa" opacity={0.2} transparent />
                  </lineSegments>
                </mesh>
              ) : (
                // Tree
                <Tree scale={scale * 0.7} />
              )}
            </group>
          );
        })}

        {/* Bystanders */}
        <Human position={[10, 0, -15]} rotation={[0, -Math.PI / 2, 0]} />
        <Human position={[12, 0, -50]} walking />
      </group>

      {/* Clouds (Parallax) */}
      <Cloud position={[-15, 12, -20]} />
      <Cloud position={[15, 15, -40]} />
      <Cloud position={[0, 18, -10]} />
    </group>
  );
}
