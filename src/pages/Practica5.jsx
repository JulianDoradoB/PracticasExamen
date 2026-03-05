import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";

/* Objeto simple para probar el HDRI */
function Esfera() {
  return (
    <mesh>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        color="white"
        metalness={1}
        roughness={0.1}
      />
    </mesh>
  );
}

export default function Laboratorio5() {

  return (
    <Canvas camera={{ position: [4, 2, 5], fov: 60 }}>

      {/* Fondo HDRI que genera reflejos */}
      <Environment
        files="/assets/crossfit_gym_2k.hdr"
        background
      />

      {/* Iluminación básica */}
      <ambientLight intensity={0.3} />

      <directionalLight
        position={[5, 5, 5]}
        intensity={1}
      />

      {/* Objeto en la escena */}
      <Esfera />

      {/* Control de cámara */}
      <OrbitControls />

    </Canvas>
  );
}