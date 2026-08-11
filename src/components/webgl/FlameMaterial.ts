import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { vertexShader, fragmentShader } from './shaders/flame';

export const FlameMaterial = shaderMaterial(
  {
    uTime: 0,
    uResolution: new THREE.Vector2()
  },
  vertexShader,
  fragmentShader
);