import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Cloud({ position }) {
    const group = useRef();

    useFrame((state) => {
        // Slow drift
        group.current.position.x += 0.002;
        if (group.current.position.x > 20) group.current.position.x = -20;
    });

    return (
        <group ref={group} position={position}>
            <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[0.8, 16, 16]} />
                <meshStandardMaterial color="white" opacity={0.8} transparent />
            </mesh>
            <mesh position={[1, 0.2, 0]}>
                <sphereGeometry args={[1, 16, 16]} />
                <meshStandardMaterial color="white" opacity={0.8} transparent />
            </mesh>
            <mesh position={[-0.8, 0.1, 0]}>
                <sphereGeometry args={[0.7, 16, 16]} />
                <meshStandardMaterial color="white" opacity={0.8} transparent />
            </mesh>
        </group>
    );
}
