import { Canvas } from "@react-three/fiber"
import { OrbitControls, useGLTF } from "@react-three/drei"
import { Suspense, useState } from "react"

function ModeloInteractivo({ activarLuz }) {

  const { scene } = useGLTF("/models/Katana.glb")

  // Activar sombras en las mallas del modelo
  scene.traverse((obj) => {
    if (obj.isMesh) {
      obj.castShadow = true
      obj.receiveShadow = true
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
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -0.01, 0]}
      receiveShadow
    >
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial color="#444444" roughness={0.8} />
    </mesh>
  )
}

function IluminacionExtra({ activa }) {

  if (!activa) return null

  return (
    <>
      {/* Luz puntual fuerte */}
      <pointLight
        position={[2, 3, 2]}
        intensity={10}
        distance={40}
        color="white"
        castShadow
      />

      {/* Luz tipo foco */}
      <spotLight
        position={[0, 6, 5]}
        angle={0.5}
        intensity={8}
        penumbra={0.5}
        castShadow
      />

      {/* Luz lateral */}
      <rectAreaLight
        position={[-3, 4, 1]}
        width={6}
        height={5}
        intensity={6}
      />
    </>
  )
}

export default function Practica2() {

  const [luzActiva, setLuzActiva] = useState(false)

  return (
    <Canvas
      shadows
      camera={{ position: [3, 2, 5], fov: 60 }}
      style={{ width: "100%", height: "100vh" }}
    >

      {/* Luz ambiental */}
      <ambientLight intensity={0.5} />

      {/* Luz hemisférica */}
      <hemisphereLight
        skyColor="#87ceeb"
        groundColor="#555"
        intensity={0.6}
        position={[0, 50, 0]}
      />

      {/* Luz principal */}
      <directionalLight
        position={[5, 10, 7]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      {/* Luz secundaria */}
      <directionalLight
        position={[-5, 10, -7]}
        intensity={0.7}
      />

      {/* Piso */}
      <Piso />

      {/* Modelo */}
      <Suspense fallback={null}>
        <IluminacionExtra activa={luzActiva} />
        <ModeloInteractivo activarLuz={setLuzActiva} />
      </Suspense>

      {/* Controles */}
      <OrbitControls />

    </Canvas>
  )
}