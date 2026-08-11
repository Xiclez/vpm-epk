import { useRef } from 'react';
import { Canvas, useFrame, useThree, extend, type ThreeElement } from '@react-three/fiber';
import { FlameMaterial } from './FlameMaterial';

extend({ FlameMaterial });

declare module '@react-three/fiber' {
  interface ThreeElements {
    flameMaterial: ThreeElement<typeof FlameMaterial>;
  }
}

// Inner mesh component that safely uses R3F hooks inside <Canvas>
function FlameMesh() {
  const materialRef = useRef<any>(null);
  const { viewport } = useThree();

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.elapsedTime;
    }
  });

  return (
    <mesh>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <flameMaterial 
        ref={materialRef} 
        transparent={true}
        depthWrite={false}
      />
    </mesh>
  );
}

// Outer component rendered by App.tsx
export function FlameBackground() {
  return (
    <div 
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100vw', 
        height: '100vh', 
        zIndex: -1, 
        pointerEvents: 'none', 
        background: '#050505'
      }}
    >
      <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 2]}>
        <FlameMesh />
      </Canvas>
    </div>
  );
}