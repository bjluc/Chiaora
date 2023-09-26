import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Appartments = ({ isMobile }) => {
  const appartment = useGLTF("./petit_appart/scene.gltf");

  return (
    <mesh>
      <hemisphereLight intensity={1.5} groundColor='black' />
      <spotLight
        position={[120, 70, 70]}
        angle={0.9}
        penumbra={2}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={1} />
      <primitive
        object={appartment.scene}
        scale={isMobile ? 0.2 : 0.3}
        position={isMobile ? [-1, -1.7, 2.3] : [-1, -1.45, 3]}
        rotation={[0, 1.25, 0]}
      />
    </mesh>
  );
};

const AppartmentsCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 600px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop='demand'
      shadows
      dpr={[1, 2]}
      camera={{ position: [15, 2, 5], fov: 20 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Appartments isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default AppartmentsCanvas;