import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef, useState } from "react";

/* =========================
   GRUPO A
   Rotación + movimiento vertical
========================= */

function GrupoA() {

  const refGrupo = useRef();
  const [color, setColor] = useState("red");

  useFrame((state) => {

    const tiempo = state.clock.getElapsedTime();

    if (refGrupo.current) {
      refGrupo.current.rotation.y += 0.01;
      refGrupo.current.position.y = Math.sin(tiempo) * 0.5;
    }

  });

  const cambiarColor = () => {
    setColor((prev) => (prev === "red" ? "yellow" : "red"));
  };

  return (
    <group ref={refGrupo} position={[-4, 0, 0]} onClick={cambiarColor}>

      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={color} />
      </mesh>

      <mesh position={[2, 0, 0]}>
        <torusGeometry args={[0.6, 0.2, 16, 32]} />
        <meshStandardMaterial color={color} />
      </mesh>

      <mesh position={[1, 1.5, 0]}>
        <coneGeometry args={[0.7, 1.2, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>

    </group>
  );
}

/* =========================
   GRUPO B
   Movimiento circular + rotación
========================= */

function GrupoB() {

  const refGrupo = useRef();
  const [color, setColor] = useState("blue");

  useFrame((state) => {

    const tiempo = state.clock.getElapsedTime();

    if (refGrupo.current) {

      refGrupo.current.rotation.x += 0.01;

      refGrupo.current.position.x = 4 + Math.cos(tiempo) * 1.5;
      refGrupo.current.position.z = Math.sin(tiempo) * 1.5;

    }

  });

  const cambiarColor = () => {
    setColor((prev) => (prev === "blue" ? "green" : "blue"));
  };

  return (
    <group ref={refGrupo} position={[4, 0, 0]} onClick={cambiarColor}>

      <mesh>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial color={color} />
      </mesh>

      <mesh position={[2, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 1.2, 32]} />
        <meshStandardMaterial color={color} />
      </mesh>

      <mesh position={[1, 1.5, 0]}>
        <dodecahedronGeometry args={[0.7]} />
        <meshStandardMaterial color={color} />
      </mesh>

    </group>
  );
}

/* =========================
   ESCENA PRINCIPAL
========================= */

export default function Laboratorio4() {

  return (
    <Canvas camera={{ position: [8, 5, 8], fov: 50 }}>

      {/* luces */}
      <ambientLight intensity={0.5} />

      <directionalLight
        position={[5, 5, 5]}
        intensity={1}
      />

      {/* piso */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="gray" />
      </mesh>

      {/* grupos */}
      <GrupoA />
      <GrupoB />

      <OrbitControls />

    </Canvas>
  );
}