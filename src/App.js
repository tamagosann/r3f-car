import { OrbitControls } from "@react-three/drei"
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber"
import { Suspense, useMemo, useRef } from "react"
import * as THREE from "three"

const Orbit = () => {
  const { camera, gl } = useThree()
  return <OrbitControls arga={[camera, gl.domElement]} />
}

const Box = (props) => {
  const ref = useRef()
  const texture = useLoader(THREE.TextureLoader, "/wood.jpg")
  useFrame((state) => {
    ref.current.rotation.x += 0.01
    ref.current.rotation.y += 0.01
  })

  const scaleDown = (object) => {
    object.scale.x = 1
    object.scale.y = 1
    object.scale.z = 1
  }

  const handlePointerDown = (e) => {
    e.object.active = true
    if (window.aciveMesh) {
      SyncDisabledTwoTone(window.aciveMesh)
      window.aciveMesh.active = false
    }
    window.aciveMesh = e.object
  }
  const handlePointerEnter = (e) => {
    e.object.scale.x = 1.5
    e.object.scale.y = 1.5
    e.object.scale.z = 1.5
  }
  const handlePointerLeave = (e) => {
    if (!e.object.active) {
      scaleDown(e.object)
    }
    e.object.active = false
    window.aciveMesh = e.object
  }
  return (
    <mesh
      ref={ref}
      {...props}
      castShadow
      // receiveShadow
      onPointerDown={handlePointerDown}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <boxGeometry />
      <meshPhysicalMaterial
        // color="white"
        // opacity={0.2}
        // transparent
        // wireframe
        // metalness={1}
        // reughness={0}
        // clearcoat={1}
        // transmission={0.5}
        // reflectivity={1}
        // side={DoubleSide}
        map={texture}
      />
    </mesh>
  )
}

const Floor = (props) => {
  return (
    <mesh {...props} receiveShadow>
      <boxBufferGeometry args={[10, 1, 10]} />
      <meshPhysicalMaterial />
    </mesh>
  )
}

const Bulb = (props) => {
  return (
    <mesh {...props}>
      <pointLight castShadow />
      <sphereBufferGeometry args={[0.2, 20, 20]} />
      <meshPhongMaterial emissive="yellow" />
    </mesh>
  )
}

const Background = (props) => {
  const texture = useLoader(THREE.TextureLoader, "/autoshop.jpg")
  // renderer
  const { gl } = useThree()

  const formatted = new THREE.WebGLCubeRenderTarget(
    texture.image.height
  ).fromEquirectangularTexture(gl, texture)

  return <primitive attach="background" object={formatted.texture} />
}

function App() {
  const handleClick = (e) => {
    if (!window.aciveMesh) return
    window.aciveMesh.material.color = new THREE.Color(e.target.style.background)
  }
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <div style={{ position: "absolute", zIndex: 1 }}>
        <div
          onClick={handleClick}
          style={{ background: "blue", height: 50, width: 50 }}
        ></div>
        <div
          onClick={handleClick}
          style={{ background: "yellow", height: 50, width: 50 }}
        ></div>
        <div
          onClick={handleClick}
          style={{ background: "white", height: 50, width: 50 }}
        ></div>
      </div>
      <Suspense fallback={null}>
        <Canvas
          shadows
          style={{ background: "black" }}
          camera={{ position: [5, 3, 3] }}
        >
          {/* <fog attach="fog" args={["white", 1, 10]} /> */}
          <Orbit />
          <ambientLight intensity={0.2} />
          <pointLight castShadow />
          <Bulb position={[0, 3, 0]} />
          <axesHelper args={[5]} />
          <Suspense fallback={null}>
            <Box position={[-4, 1, 0]} />
          </Suspense>
          <Suspense fallback={null}>
            <Box position={[4, 1, 0]} />
          </Suspense>
          <Floor position={[0, -0.5, 0]} />
          <Suspense fallback={null}>
            <Background />
          </Suspense>
        </Canvas>
      </Suspense>
    </div>
  )
}

export default App
