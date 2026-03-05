import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import { TextureLoader, Sprite, SpriteMaterial } from "three";

function Objeto3D({ onPlay }) {

  const meshRef = useRef();

  const baseTextures = useLoader(TextureLoader, [
    "/assets/texture1.jpg",
    "/assets/texture2.jpg"
  ]);

  const alphaTexture = useLoader(TextureLoader, "/assets/alpha.png");

  const emissiveTextures = useLoader(TextureLoader, [
    "/assets/texture2.jpg",
    "/assets/texture1.jpg"
  ]);

  const [textura] = useState(
    baseTextures[Math.floor(Math.random() * baseTextures.length)]
  );

  const [emissive] = useState(
    emissiveTextures[Math.floor(Math.random() * emissiveTextures.length)]
  );

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} onClick={onPlay}>
      <cylinderGeometry args={[0.8, 1.5, 3, 32]} />
      <meshStandardMaterial
        map={textura}
        alphaMap={alphaTexture}
        transparent
        emissiveMap={emissive}
        emissive={"white"}
        emissiveIntensity={0.6}
      />
    </mesh>
  );
}

function NotasMusicales({ activo, posicion }) {

  const grupoRef = useRef();
  const notasRef = useRef([]);
  const intervaloRef = useRef(null);

  const texturas = useLoader(TextureLoader, [
    "/assets/note1.png",
    "/assets/note2.png",
    "/assets/note3.png"
  ]);

  useEffect(() => {

    if (!activo) {
      clearInterval(intervaloRef.current);
      intervaloRef.current = null;
      return;
    }

    intervaloRef.current = setInterval(() => {

      const textura = texturas[Math.floor(Math.random() * texturas.length)];

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

    return () => clearInterval(intervaloRef.current);

  }, [activo, posicion, texturas]);

  useFrame(() => {

    notasRef.current.forEach((nota, index) => {

      nota.position.y += 0.03;
      nota.material.opacity -= 0.008;

      if (nota.material.opacity <= 0) {
        grupoRef.current.remove(nota);
        notasRef.current.splice(index, 1);
      }

    });

  });

  return <group ref={grupoRef} />;
}

export default function Laboratorio3() {

  const [tocando, setTocando] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio("/assets/ambiente.mp3");
    audioRef.current.loop = true;
  }, []);

  const toggleMusica = () => {

    if (!audioRef.current) return;

    if (tocando) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setTocando(!tocando);
  };

  return (
    <Canvas camera={{ position: [5, 3, 5], fov: 50 }}>

      <ambientLight intensity={0.5} />

      <directionalLight
        position={[5, 5, 5]}
        intensity={1}
      />

      <Objeto3D onPlay={toggleMusica} />

      <NotasMusicales
        activo={tocando}
        posicion={[0, 0, 0]}
      />

      <OrbitControls />

    </Canvas>
  );
}