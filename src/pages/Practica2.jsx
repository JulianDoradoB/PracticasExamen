import { Canvas } from "@react-three/fiber"
import { OrbitControls, useGLTF } from "@react-three/drei"
import { Suspense, useState } from "react"

function ModeloInteractivo({ activarLuz }) {
  const { scene } = useGLTF("/models/Katana.glb")

  // Activar sombras en todas las mallas
  scene.traverse(child => {
    if (child.isMesh) {
      child.castShadow = true
      child.receiveShadow = true
    }
  })

  return (
    <primitive
      object={scene}
      scale={2}
      position={[0, 0, 0]}
      onClick={() => activarLuz(true)}
    />
  )
}

function Piso() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial color="#444" roughness={0.8} />
    </mesh>
  )
}

// Luces que aparecen al hacer click
function IluminacionAvanzada({ activa }) {
  if (!activa) return null
  return (
    <>
      {/* Luz puntual muy fuerte */}
      <pointLight position={[2, 3, 2]} intensity={12} distance={40} decay={2} color="#ffffff" castShadow />
      {/* Luz tipo foco para dar contraste y sombras */}
      <spotLight position={[0, 6, 5]} angle={0.5} intensity={10} penumbra={0.5} castShadow />
      {/* Luz rectangular para iluminar desde un lado */}
      <rectAreaLight position={[-3, 4, 1]} width={6} height={5} intensity={8} color="#ffffff" />
    </>
  )
}

export default function Practica2() {
  const [luzActiva, setLuzActiva] = useState(false)

  return (
    <Canvas
      shadows
      camera={{ position: [3, 2, 5], fov: 60 }}
      style={{ height: "100vh", width: "100%" }}
    >
      {/* Luz ambiental general */}
      <ambientLight intensity={0.5} />

      {/* Luz hemisférica: cielo y suelo */}
      <hemisphereLight skyColor={"#87ceeb"} groundColor={"#555555"} intensity={0.6} position={[0, 50, 0]} />

      {/* Luz direccional principal */}
      <directionalLight
        position={[5, 10, 7]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      {/* Luz direccional secundaria para llenar sombras */}
      <directionalLight position={[-5, 10, -7]} intensity={0.8} castShadow={false} />

      {/* Piso */}
      <Piso />

      {/* Modelo y luces interactivas */}
      <Suspense fallback={null}>
        <IluminacionAvanzada activa={luzActiva} />
        <ModeloInteractivo activarLuz={setLuzActiva} />
      </Suspense>

      {/* Controles de cámara */}
      <OrbitControls />
    </Canvas>
  )
}