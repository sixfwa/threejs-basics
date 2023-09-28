import { Canvas, useFrame } from "@react-three/fiber";
import "./App.css";
import { useRef, useState } from "react";

const Cube = ({ position, side, color }) => {
  const ref = useRef();

  useFrame((state, delta, frame) => {
    ref.current.rotation.x += delta;
    ref.current.rotation.y += delta;
    ref.current.position.z = Math.sin(state.clock.elapsedTime) * 2;
  });

  return (
    <mesh position={position} ref={ref}>
      <boxGeometry args={[side, side, side]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const Torus = ({ position, args, color }) => {
  const ref = useRef();

  useFrame((state, delta, frame) => {
    ref.current.rotation.y += delta * 0.2;
  });

  return (
    <mesh ref={ref} position={position}>
      <torusGeometry args={args} />
      <meshStandardMaterial color={color} wireframe />
    </mesh>
  );
};

const TorusKnot = ({ position, args, color }) => {
  const ref = useRef();

  useFrame((state, delta, frame) => {
    ref.current.rotation.y += delta * 0.2;
  });

  return (
    <mesh position={position} ref={ref}>
      <torusKnotGeometry args={args} />
      <meshStandardMaterial color={color} wireframe />
    </mesh>
  );
};

const Sphere = ({ position, args, color }) => {
  const ref = useRef();

  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useFrame((state, delta, frame) => {
    const speed = isHovered ? 1 : 0.2;
    ref.current.rotation.y += delta * speed;
    // ref.current.position.z = Math.sin(state.clock.elapsedTime * 4);
  });

  return (
    <mesh
      position={position}
      ref={ref}
      onPointerEnter={(event) => (event.stopPropagation(), setIsHovered(true))}
      onPointerLeave={() => setIsHovered(false)}
      onClick={() => setIsClicked(!isClicked)}
      scale={isClicked ? 1.5 : 1}
    >
      <sphereGeometry args={args} />
      <meshStandardMaterial
        color={isHovered ? "lightblue" : "orange"}
        wireframe
      />
    </mesh>
  );
};

const App = () => {
  return (
    <Canvas>
      <directionalLight position={[0, 0, 1]} intensity={0.9} />
      <ambientLight intensity={0.5} />
      {/* <group position={[0, -1, 0]}>
        <Cube position={[1, 0, 0]} color={"green"} args={1} />
        <Cube position={[-1, 0, 0]} color={"hotpink"} args={1} />
        <Cube position={[-1, 2, 0]} color={"blue"} args={1} />
        <Cube position={[1, 2, 0]} color={"yellow"} args={1} />
      </group> */}
      <Torus args={[1, 0.1, 50, 50]} color={"green"} position={[-3, 0, 0]} />
      <TorusKnot
        args={[1, 0.1, 1000, 50, 5]}
        position={[0, 0, 0]}
        color={"yellow"}
      />
      <Sphere position={[3, 0, 0]} args={[1, 50, 50]} color={"orange"} />
    </Canvas>
  );
};

export default App;
