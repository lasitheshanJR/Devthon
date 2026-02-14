import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Car({ position, speed = 0, color = "red" }) {
    const mesh = useRef();

    useFrame((state) => {
        if (speed !== 0) {
            mesh.current.position.z += speed * 0.1;
            // Loop traffic
            if (mesh.current.position.z > 20) mesh.current.position.z = -80;
            if (mesh.current.position.z < -80) mesh.current.position.z = 20;
        }
    });

    return (
        <group ref={mesh} position={position}>
            {/* Body */}
            <mesh>
                <boxGeometry args={[1.5, 0.8, 3]} />
                <meshStandardMaterial color={color} />
            </mesh>
            {/* Windows */}
            <mesh position={[0, 0.4, 0.2]}>
                <boxGeometry args={[1.4, 0.5, 1.5]} />
                <meshStandardMaterial color="#94a3b8" />
            </mesh>
            {/* Wheels */}
            <mesh position={[-0.8, -0.4, 1]}>
                <boxGeometry args={[0.2, 0.4, 0.4]} />
                <meshStandardMaterial color="black" />
            </mesh>
            <mesh position={[0.8, -0.4, 1]}>
                <boxGeometry args={[0.2, 0.4, 0.4]} />
                <meshStandardMaterial color="black" />
            </mesh>
            <mesh position={[-0.8, -0.4, -1]}>
                <boxGeometry args={[0.2, 0.4, 0.4]} />
                <meshStandardMaterial color="black" />
            </mesh>
            <mesh position={[0.8, -0.4, -1]}>
                <boxGeometry args={[0.2, 0.4, 0.4]} />
                <meshStandardMaterial color="black" />
            </mesh>
        </group>
    );
}
