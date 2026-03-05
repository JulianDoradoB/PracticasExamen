import React, { useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { TextureLoader } from "three";

const MovingCube = () => {
  const cubeRef = useRef();

  // Cargar texturas para albedo (color) y alfa (transparencia)
  const albedoTexture = useLoader(TextureLoader, "/assets/texture2.jpg");
  const alphaTexture = useLoader(TextureLoader, "/assets/alpha.png");

  // Animación: rotación y movimiento circular
  useFrame((state, delta) => {
    if (cubeRef.current) {
      cubeRef.current.rotation.x += delta;
      cubeRef.current.rotation.y += delta;
      const t = state.clock.getElapsedTime();
      cubeRef.current.position.x = Math.sin(t) * 2;
      cubeRef.current.position.y = Math.cos(t) * 2;
    }
  });

  return (
    <mesh ref={cubeRef}>
      <boxGeometry args={[4, 4, 4]} />
      {Array.from({ length: 6 }).map((_, index) => (
        <meshStandardMaterial
          key={index} // 
          map={albedoTexture}
          alphaMap={alphaTexture}
          transparent={false}
          opacity={0.9}
          roughness={1.0}
          metalness={0.5}
        />
      ))}
      
    </mesh>
    
  );
};

const Texturas = () => {
  return (
    <Canvas camera={{ position: [0, 0, 10] }}>
      <ambientLight intensity={3.0} />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      <MovingCube />
      <OrbitControls />
    </Canvas>
  );
};

export default Texturas;
