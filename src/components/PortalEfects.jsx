import { useEffect, useState, Suspense } from 'react'
import { useGLTF, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

function CityObject({ name, position }) {
    // Carga cada modelo por nombre (debe estar en /public/models/)
    const { scene } = useGLTF(`/models/Nivel1/${name}.glb`)
    return <primitive object={scene} position={position} />
}

export default function CityScene() {
    const [objects, setObjects] = useState([])

    useEffect(() => {
        // Carga el archivo JSON con las posiciones de los objetos
        fetch('/data/toy_car_blocks.json')
            .then(res => res.json())
            .then(setObjects)
            .catch(err => console.error('Error cargando JSON:', err))
    }, [])

    return (
        <>
            {/* Controles de cámara */}
            <OrbitControls makeDefault />

            {/* Fondo y luces */}
            <color attach="background" args={['#20232a']} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 20, 10]} intensity={1} castShadow />

            {/* Piso de referencia */}
            <mesh rotation-x={-Math.PI / 2} receiveShadow>
                <planeGeometry args={[200, 200]} />
                <meshStandardMaterial color="#333" />
            </mesh>

            {/* Renderiza los objetos del JSON */}
            <Suspense fallback={null}>
                {objects.map((obj) => (
                    <CityObject
                        key={obj.name}
                        name={obj.name}
                        position={[obj.x, obj.y + 0.01, obj.z]} // <-- levanta ligeramente
                    />
                ))}
            </Suspense>

            <mesh rotation-x={-Math.PI / 2} position={[0, -0.01, 0]} receiveShadow>
                <planeGeometry args={[200, 200]} />
                <meshStandardMaterial color="#333" />
            </mesh>
        </>
    )
}
