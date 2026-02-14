import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";

export default function Bus(props) {
  const group = useRef();

  // Animate the bus hovering
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    group.current.position.y = props.position[1] + Math.sin(t * 2) * 0.1;
    group.current.rotation.z = Math.sin(t * 0.5) * 0.02; // Reduced tilt
  });

  return (
    <group ref={group} {...props} rotation={[0, -Math.PI / 2, 0]}> {/* Rotate to face Z axis */}
      {/* Chassis */}
      <RoundedBox args={[4, 1.2, 1.8]} radius={0.1} castShadow receiveShadow>
        <meshStandardMaterial color="#1e293b" roughnes={0.2} metalness={0.8} />
      </RoundedBox>

      {/* Glass Windows */}
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[4.05, 0.5, 1.85]} />
        <meshPhysicalMaterial
          color="#3b82f6"
          transparent
          opacity={0.4}
          roughness={0}
          clearcoat={1}
          emissive="#3b82f6"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Glowing Wheels (Anti-gravity pads) */}
      {[[-1.2, -0.6, 0.8], [1.2, -0.6, 0.8], [-1.2, -0.6, -0.8], [1.2, -0.6, -0.8]].map((pos, i) => (
        <mesh key={i} position={pos} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 0.2, 32]} />
          <meshStandardMaterial color="#000" />
          <mesh position={[0, -0.11, 0]}>
            <ringGeometry args={[0.2, 0.3, 32]} />
            <meshBasicMaterial color="#ec4899" toneMapped={false} />
          </mesh>
        </mesh>
      ))}

      {/* Headlights */}
      <mesh position={[2, -0.2, 0.5]}>
        <boxGeometry args={[0.1, 0.2, 0.4]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} toneMapped={false} />
      </mesh>
      <mesh position={[2, -0.2, -0.5]}>
        <boxGeometry args={[0.1, 0.2, 0.4]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} toneMapped={false} />
      </mesh>

      {/* Taillights */}
      <mesh position={[-2, -0.2, 0]}>
        <boxGeometry args={[0.1, 0.1, 1.5]} />
        <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={2} toneMapped={false} />
      </mesh>
    </group>
  );
}
