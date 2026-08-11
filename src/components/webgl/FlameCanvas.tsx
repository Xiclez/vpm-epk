import { Canvas } from '@react-three/fiber';
// Changed to a named import (added the curly braces)
import { FlameBackground } from './FlameBackground';

export default function FlameCanvas() {
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
        background: '#050505' // Deep dark background to let the fire pop
      }}
    >
      <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 2]}>
        <FlameBackground />
      </Canvas>
    </div>
  );
}