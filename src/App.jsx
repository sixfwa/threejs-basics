import { Canvas, useFrame } from "@react-three/fiber";
import "./App.css";
import { useRef } from "react";

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

const App = () => {
  return (
    <Canvas>
      <directionalLight position={[0, 0, 1]} intensity={0.4} />
      <ambientLight intensity={0.5} />
      {/* <group position={[0, -1, 0]}>
        <Cube position={[1, 0, 0]} color={"green"} args={1} />
        <Cube position={[-1, 0, 0]} color={"hotpink"} args={1} />
        <Cube position={[-1, 2, 0]} color={"blue"} args={1} />
        <Cube position={[1, 2, 0]} color={"yellow"} args={1} />
      </group> */}
      <mesh>
        <torusGeometry />
        <meshStandardMaterial color={"pink"} />
      </mesh>
    </Canvas>
  );
};

export default App;
