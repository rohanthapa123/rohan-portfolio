"use client";
import * as THREE from "three";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { TextureLoader } from "three";

const PixelShader = {
  uniforms: {
    uTime: { value: 0 },
    uTexture: { value: null },
    uPixelSize: { value: 40.0 }, // smaller = finer pixels
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform sampler2D uTexture;
    uniform float uPixelSize;
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;
      uv.y += sin(uv.x * 10.0 + uTime * 0.8) * 0.005;
      uv.x += cos(uv.y * 10.0 + uTime * 0.6) * 0.005;

      vec2 pixelUV = floor(uv * uPixelSize) / uPixelSize;
      vec4 texColor = texture2D(uTexture, pixelUV);
      texColor.rgb = pow(texColor.rgb, vec3(1.1));

      gl_FragColor = texColor;
    }
  `,
};

const PixelatedImage = ({ src = "/rohan.png" }) => {
  const shaderRef = useRef<THREE.ShaderMaterial>(null);
  const texture = useLoader(TextureLoader, src);

  // Make texture pixelated
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;
  texture.generateMipmaps = false;

  const { viewport } = useThree();

  useFrame(({ clock }) => {
    if (shaderRef.current) shaderRef.current.uniforms.uTime.value = clock.elapsedTime;
  });

  return (
    <mesh>
      {/* Plane size matches viewport for full coverage */}
      <planeGeometry args={[viewport.width, viewport.height]} />
      <shaderMaterial
        ref={shaderRef}
        uniforms={{
          uTime: { value: 0 },
          uTexture: { value: texture },
          uPixelSize: { value: 200.0 },
        }}
        vertexShader={PixelShader.vertexShader}
        fragmentShader={PixelShader.fragmentShader}
      />
    </mesh>
  );
};

export const PixelatedFace = () => {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 6] }} className="w-full h-full">
        <ambientLight intensity={1.5} />
        <PixelatedImage src="/rohan.png" />
      </Canvas>
    </div>
  );
};
