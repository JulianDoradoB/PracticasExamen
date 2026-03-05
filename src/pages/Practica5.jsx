import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";

const Objeto = () => {
  return (
    <mesh>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial metalness={1} roughness={0.1} color="white" />
    </mesh>
  );
};

const Laboratorio5 = () => {
  return (
    <Canvas camera={{ position: [4, 2, 5], fov: 60 }}>

      {/* HDRI Environment */}
      <Environment
        files="/assets/crossfit_gym_2k.hdr"
        background={true}
      />

      {/* Luz básica */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[5,5,5]} intensity={1} />

      {/* Objeto para reflejar el HDR */}
      <Objeto />

      <OrbitControls />

    </Canvas>
  );
};

export default Laboratorio5;