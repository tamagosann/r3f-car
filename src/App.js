import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import { DoubleSide } from "three";

const Orbit = () => {
  const { camera, gl } = useThree();
  return <OrbitControls arga={[camera, gl.domElement]} />;
};

const Box = (props) => {
  const ref = useRef();
  useFrame((state) => {
    // ref.current.rotation.x += 0.01;
    // ref.current.rotation.y += 0.01;
  });
  return (
    <mesh
      ref={ref}
      {...props}
      castShadow
      // receiveShadow
    >
      <boxBufferGeometry />
      <meshPhysicalMaterial
        color="white"
        opacity={0.2}
        transparent
        // wireframe
        // metalness={1}
        reughness={0}
        clearcoat={1}
        transmission={0.5}
        reflectivity={1}
        side={DoubleSide}
      />
    </mesh>
  );
};

const Floor = (props) => {
  return (
    <mesh {...props} receiveShadow>
      <boxBufferGeometry args={[10, 1, 10]} />
      <meshPhysicalMaterial />
    </mesh>
  );
};

const Bulb = (props) => {
  return (
    <mesh {...props}>
      <pointLight castShadow />
      <sphereBufferGeometry args={[0.2, 20, 20]} />
      <meshPhongMaterial emissive="yellow" />
    </mesh>
  );
};

function App() {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Suspense fallback={null}>
        <Canvas
          shadows
          style={{ background: "black" }}
          camera={{ position: [5, 3, 3] }}
        >
          <fog attach="fog" args={["white", 1, 10]} />
          <Orbit />
          <ambientLight intensity={0.2} />
          <pointLight castShadow />
          <Bulb position={[0, 3, 0]} />
          <axesHelper args={[5]} />
          <Box position={[0, 1, 0]} />
          <Floor position={[0, -0.5, 0]} />
        </Canvas>
      </Suspense>
    </div>
  );
}

export default App;
