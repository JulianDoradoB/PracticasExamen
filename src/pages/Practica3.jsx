import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Sprite, SpriteMaterial, TextureLoader } from "three";

const Objeto3D = ({ onPlay }) => {
    const meshRef = useRef();

    // Texturas disponibles
    const texturasBase = [
        useLoader(TextureLoader, "/assets/texture1.jpg"),
        useLoader(TextureLoader, "/assets/texture2.jpg"),
    ];

    const texturasAlpha = [
        useLoader(TextureLoader, "/assets/alpha.png"),
    ];

    const texturasEmissive = [
        useLoader(TextureLoader, "/assets/texture2.jpg"),
        useLoader(TextureLoader, "/assets/texture1.jpg"),
    ];

    // Selección aleatoria
    const textura = texturasBase[Math.floor(Math.random() * texturasBase.length)];
    const alpha = texturasAlpha[Math.floor(Math.random() * texturasAlpha.length)];
    const emissive = texturasEmissive[Math.floor(Math.random() * texturasEmissive.length)];

    // Rotación del objeto
    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.5;
        }
    });

    return (
        <mesh ref={meshRef} onClick={onPlay}>
            {/* Trapecio 3D */}
            <cylinderGeometry args={[0.8, 1.5, 3, 32]} />

            <meshStandardMaterial
                map={textura}
                alphaMap={alpha}
                transparent={true}
                emissiveMap={emissive}
                emissive={0xffffff}
                emissiveIntensity={0.6}
            />
        </mesh>
    );
};

const NotasMusicales = ({ activo, posicion }) => {
    const notasRef = useRef([]);
    const grupoRef = useRef();
    const intervaloRef = useRef(null);

    const texturasNotas = [
        useLoader(TextureLoader, "/assets/note1.png"),
        useLoader(TextureLoader, "/assets/note2.png"),
        useLoader(TextureLoader, "/assets/note3.png"),
    ];

    useFrame(() => {

        if (activo && !intervaloRef.current) {
            intervaloRef.current = setInterval(() => {

                const textura = texturasNotas[Math.floor(Math.random() * 3)];

                const material = new SpriteMaterial({
                    map: textura,
                    transparent: true,
                    opacity: 1
                });

                const nota = new Sprite(material);

                nota.position.set(
                    posicion[0] + (Math.random() - 0.5),
                    posicion[1] + 1,
                    posicion[2]
                );

                nota.scale.set(0.4, 0.4, 0.4);

                if (grupoRef.current) {
                    grupoRef.current.add(nota);
                    notasRef.current.push(nota);
                }

            }, 400);
        }

        if (!activo && intervaloRef.current) {
            clearInterval(intervaloRef.current);
            intervaloRef.current = null;
        }

        notasRef.current.forEach((nota, i) => {

            nota.position.y += 0.03;
            nota.material.opacity -= 0.008;

            if (nota.material.opacity <= 0 && grupoRef.current) {
                grupoRef.current.remove(nota);
                notasRef.current.splice(i, 1);
            }

        });
    });

    return <group ref={grupoRef} />;
};

const Laboratorio3 = () => {

    const [tocando, setTocando] = useState(false);
    const audioRef = useRef(new Audio("/assets/ambiente.mp3"));

    const toggleMusica = () => {

        if (tocando) {
            audioRef.current.pause();
        } else {
            audioRef.current.loop = true;
            audioRef.current.play();
        }

        setTocando(!tocando);
    };

    return (
        <Canvas camera={{ position: [5, 3, 5], fov: 50 }}>

            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} />

            <Objeto3D onPlay={toggleMusica} />

            <NotasMusicales
                activo={tocando}
                posicion={[0, 0, 0]}
            />

            <OrbitControls />

        </Canvas>
    );
};

export default Laboratorio3;