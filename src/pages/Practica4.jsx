import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";

// ============================
// Grupo A
// Movimiento: rotación + pequeño rebote
// ============================
const GrupoA = () => {

    const grupoRef = useRef();
    const [color, setColor] = useState("red");

    useFrame((state) => {
        const t = state.clock.getElapsedTime();

        if (grupoRef.current) {
            grupoRef.current.rotation.y += 0.01;
            grupoRef.current.position.y = Math.sin(t) * 0.5;
        }
    });

    const cambiarColor = () => {
        setColor(color === "red" ? "yellow" : "red");
    };

    return (
        <group ref={grupoRef} position={[-4, 0, 0]} onClick={cambiarColor}>

            <mesh position={[0, 0, 0]}>
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
};


// ============================
// Grupo B
// Movimiento: rotación en X + movimiento circular
// ============================
const GrupoB = () => {

    const grupoRef = useRef();
    const [color, setColor] = useState("blue");

    useFrame((state) => {

        const t = state.clock.getElapsedTime();

        if (grupoRef.current) {

            grupoRef.current.rotation.x += 0.01;

            grupoRef.current.position.x = 4 + Math.cos(t) * 1.5;
            grupoRef.current.position.z = Math.sin(t) * 1.5;
        }

    });

    const cambiarColor = () => {
        setColor(color === "blue" ? "green" : "blue");
    };

    return (
        <group ref={grupoRef} position={[4, 0, 0]} onClick={cambiarColor}>

            <mesh position={[0, 0, 0]}>
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
};


// ============================
// Escena principal
// ============================
const Laboratorio4 = () => {

    return (
        <Canvas camera={{ position: [8, 5, 8], fov: 50 }}>

            <ambientLight intensity={0.5} />

            <directionalLight
                position={[5, 5, 5]}
                intensity={1}
            />

            {/* Piso */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
                <planeGeometry args={[20, 20]} />
                <meshStandardMaterial color="gray" />
            </mesh>

            <GrupoA />
            <GrupoB />

            <OrbitControls />

        </Canvas>
    );
};

export default Laboratorio4;