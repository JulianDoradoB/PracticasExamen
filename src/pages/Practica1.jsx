import React, { useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { TextureLoader } from "three";

const MovingRhombus = () => {
  const meshRef = useRef();
  const [activeTexture, setActiveTexture] = useState(0);

  // Cargar texturas
  const texture1 = useLoader(TextureLoader, "/assets/texture1.jpg");
  const texture2 = useLoader(TextureLoader, "/assets/texture2.jpg");

  const textures = [texture1, texture2];

  // Animación más suave
  useFrame((state, delta) => {
    if (meshRef.current) {

      const t = state.clock.getElapsedTime();

      // Rotación suave
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.3;

      // Movimiento más natural
      meshRef.current.position.x = Math.sin(t * 0.7) * 1.5;
      meshRef.current.position.y = Math.cos(t * 0.7) * 1.2;
      meshRef.current.position.z = Math.sin(t * 0.5) * 0.5;
    }
  });

  // Cambiar textura al hacer click
  const changeTexture = () => {
    setActiveTexture((prev) => (prev === 0 ? 1 : 0));
  };

  return (
    <mesh ref={meshRef} onClick={changeTexture}>
      
      {/* Geometría rombo */}
      <octahedronGeometry args={[2.5, 0]} />

      <meshStandardMaterial
        map={textures[activeTexture]}
        roughness={0.6}
        metalness={0.2}
      />
    </mesh>
  );
};

const Texturas = () => {
  return (
    <Canvas camera={{ position: [0, 0, 8] }}>

      {/* Iluminación */}
      <ambientLight intensity={1} />

      <directionalLight
        position={[5, 5, 5]}
        intensity={1.5}
      />

      <pointLight position={[-5, 5, 5]} intensity={1} />

      {/* Objeto */}
      <MovingRhombus />

      {/* Controles de cámara */}
      <OrbitControls enableZoom={true} />

    </Canvas>
  );
};

export default Texturas;