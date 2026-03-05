import React, { useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { TextureLoader } from "three";

const MovingRhombus = () => {
  const meshRef = useRef();

  // Estado para cambiar textura
  const [activeTexture, setActiveTexture] = useState(0);

  // Cargar dos texturas
  const texture1 = useLoader(TextureLoader, "/assets/texture1.jpg");
  const texture2 = useLoader(TextureLoader, "/assets/texture2.jpg");

  const textures = [texture1, texture2];

  // Animación
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta;
      meshRef.current.rotation.y += delta;

      const t = state.clock.getElapsedTime();

      meshRef.current.position.x = Math.sin(t) * 2;
      meshRef.current.position.y = Math.cos(t) * 2;
    }
  });

  // Cambiar textura al hacer click
  const changeTexture = () => {
    setActiveTexture((prev) => (prev === 0 ? 1 : 0));
  };

  return (
    <mesh ref={meshRef} onClick={changeTexture}>
      {/* Geometría de rombo */}
      <octahedronGeometry args={[3, 0]} />

      <meshStandardMaterial
        map={textures[activeTexture]}
        roughness={0.8}
        metalness={0.3}
      />
    </mesh>
  );
};

const Texturas = () => {
  return (
    <Canvas camera={{ position: [0, 0, 10] }}>
      
      {/* Luz ambiente */}
      <ambientLight intensity={1.5} />

      {/* Luz direccional */}
      <directionalLight position={[5, 5, 5]} intensity={2} />

      <MovingRhombus />

      {/* Control de cámara */}
      <OrbitControls />

    </Canvas>
  );
};

export default Texturas;