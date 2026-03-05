import React, { useRef, useEffect, useState } from "react";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { TextureLoader, VideoTexture, Sprite, SpriteMaterial, Vector3 } from "three";

function ModeloInicio() {

  const gltf = useLoader(GLTFLoader, "/assets/Living Room.glb");

  const texture = useLoader(TextureLoader, "/assets/baked.jpg");

  const noteTextures = [
    useLoader(TextureLoader, "/assets/note1.png"),
    useLoader(TextureLoader, "/assets/note2.png"),
    useLoader(TextureLoader, "/assets/note3.png"),
  ];

  const modelRef = useRef();
  const chairRef = useRef();
  const speakerRef = useRef();

  const videoRef = useRef();
  const notesRef = useRef([]);

  const audioRef = useRef(new Audio("/assets/ambiente.mp3"));
  const chairAudioRef = useRef(new Audio("/assets/chair-move.mp3"));

  const noteIntervalRef = useRef(null);

  const [chairInitialPos, setChairInitialPos] = useState(null);
  const [targetChairPosition, setTargetChairPosition] = useState(null);

  useEffect(() => {

    if (!gltf) return;

    texture.flipY = false;

    // VIDEO TV
    const video = document.createElement("video");
    video.src = "/assets/video.mp4";
    video.loop = true;
    video.muted = true;
    video.playsInline = true;

    video.play().catch(() => {
      console.log("Video se activará con interacción");
    });

    videoRef.current = video;

    const videoTexture = new VideoTexture(video);

    gltf.scene.traverse((child) => {

      if (child.isMesh) {

        if (child.name.toLowerCase().includes("tv") || child.name.toLowerCase().includes("screen")) {

          child.material = child.material.clone();
          child.material.map = videoTexture;

        }

      }

    });

    chairRef.current = gltf.scene.getObjectByName("chair");
    speakerRef.current = gltf.scene.getObjectByName("speaker");

    if (chairRef.current) {
      setChairInitialPos(chairRef.current.position.clone());
    }

    audioRef.current.loop = true;

  }, [gltf]);

  useFrame(() => {

    if (chairRef.current && targetChairPosition) {

      chairRef.current.position.lerp(targetChairPosition, 0.1);

      if (chairRef.current.position.distanceTo(targetChairPosition) < 0.01) {
        setTargetChairPosition(null);
      }

    }

    notesRef.current.forEach((note, index) => {

      note.position.y += 0.02;
      note.material.opacity -= 0.01;

      if (note.material.opacity <= 0) {
        gltf.scene.remove(note);
        notesRef.current.splice(index, 1);
      }

    });

  });

  const moverSilla = () => {

    if (!chairRef.current) return;

    setTargetChairPosition(
      new Vector3(
        chairRef.current.position.x + 1.5,
        chairRef.current.position.y,
        chairRef.current.position.z
      )
    );

    chairAudioRef.current.play();

  };

  const restaurarSilla = () => {

    if (!chairInitialPos || !chairRef.current) return;

    setTargetChairPosition(chairInitialPos.clone());

    chairAudioRef.current.play();

  };

  const startNotes = () => {

    stopNotes();

    noteIntervalRef.current = setInterval(() => {

      if (!speakerRef.current) return;

      const texture =
        noteTextures[Math.floor(Math.random() * noteTextures.length)];

      const material = new SpriteMaterial({
        map: texture,
        transparent: true,
        opacity: 1,
      });

      const note = new Sprite(material);

      const pos = speakerRef.current.position.clone();

      note.position.set(pos.x, pos.y + 0.2, pos.z);
      note.scale.set(0.3, 0.3, 0.3);

      gltf.scene.add(note);
      notesRef.current.push(note);

    }, 500);

  };

  const stopNotes = () => {
    clearInterval(noteIntervalRef.current);
  };

  const toggleAudio = () => {

    if (audioRef.current.paused) {
      audioRef.current.play();
      startNotes();
    } else {
      audioRef.current.pause();
      stopNotes();
    }

  };

  const handleClick = (event) => {

    event.stopPropagation();

    const name = event.object.name;

    if (name === "chair") {
      moverSilla();
    }

    if (name === "speaker") {
      toggleAudio();
    }

    if (name === "plant") {
      restaurarSilla();
    }

  };

  return (
    <primitive
      ref={modelRef}
      object={gltf.scene}
      scale={1.2}
      position={[0, -1, 0]}
      onPointerDown={handleClick}
    />
  );
}

export default function Practica6() {

  return (
    <Canvas camera={{ position: [5, 3, 6], fov: 50 }}>

      <ambientLight intensity={0.6} />

      <directionalLight position={[5, 5, 5]} intensity={1} />

      <ModeloInicio />

      <OrbitControls />

    </Canvas>
  );
}