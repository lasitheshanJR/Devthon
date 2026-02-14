import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Suspense } from "react";
import City from "./City";
import Bus from "./Bus";
import Sun from "./Sun";

export default function Scene() {
  return (
    // Morning Sky Gradient Background
    <div className="absolute inset-0 bg-gradient-to-b from-sky-400 to-sky-200">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[6, 3, 10]} fov={50} />
        <OrbitControls
          enablePan={false}
          maxPolarAngle={Math.PI / 2.1}
          autoRotate
          autoRotateSpeed={1.0} // Dynamic feeling
        />

        <Sun />
        {/* Morning Fog */}
        <fog attach="fog" args={['#bae6fd', 8, 45]} />

        <Suspense fallback={null}>
          <group position={[0, -1, 0]}>
            <City />
            <Bus position={[0, 0.5, 0]} />
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
}
