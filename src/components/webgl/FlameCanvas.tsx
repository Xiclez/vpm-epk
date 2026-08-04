import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import type { Mesh, ShaderMaterial } from 'three'
import { FLAME_CONFIG } from '../../config/flame'
import { flameState } from '../../lib/flameState'
import { createFlameMaterial } from './FlameMaterial'

function FlamePlane({ isMobile }: { isMobile: boolean }) {
  const meshRef = useRef<Mesh>(null)
  const material = useMemo(() => createFlameMaterial(isMobile), [isMobile])
  const size = useThree((state) => state.size)

  useEffect(() => {
    const uniforms = material.uniforms
    uniforms.uResolution.value.set(size.width, size.height)
  }, [material, size])

  useEffect(() => () => material.dispose(), [material])

  useFrame((_, delta) => {
    // Clamp so a backgrounded tab cannot produce a huge time jump on resume.
    const dt = Math.min(delta, 0.05)
    const u = (meshRef.current?.material as ShaderMaterial | undefined)?.uniforms
    if (!u) return

    u.uTime.value += dt
    u.uScroll.value = flameState.scroll

    // Ease the reactive inputs so nothing snaps.
    const pointerEase = Math.min(1, dt * 2.2)
    u.uPointer.value.x += (flameState.pointerX - u.uPointer.value.x) * pointerEase
    u.uPointer.value.y += (flameState.pointerY - u.uPointer.value.y) * pointerEase

    const boostEase = Math.min(1, dt / FLAME_CONFIG.boostEase)
    flameState.boost += (flameState.boostTarget - flameState.boost) * boostEase
    u.uBoost.value = flameState.boost
  })

  return (
    <mesh ref={meshRef} frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <primitive object={material} attach="material" />
    </mesh>
  )
}

/**
 * The single shared WebGL canvas for the whole site. Fixed, decorative and
 * inert: it never receives pointer events and carries no essential content.
 */
export default function FlameCanvas() {
  const [isMobile, setIsMobile] = useState(
    () => window.innerWidth < FLAME_CONFIG.quality.mobileBreakpoint,
  )
  const [visible, setVisible] = useState(() => document.visibilityState === 'visible')

  useEffect(() => {
    const query = window.matchMedia(
      `(max-width: ${FLAME_CONFIG.quality.mobileBreakpoint - 1}px)`,
    )
    const onChange = () => setIsMobile(query.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  // Stop rendering entirely while the tab is hidden.
  useEffect(() => {
    const onVisibility = () => setVisible(document.visibilityState === 'visible')
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  const maxDpr = isMobile
    ? FLAME_CONFIG.maxPixelRatio * FLAME_CONFIG.quality.mobileScale
    : FLAME_CONFIG.maxPixelRatio

  return (
    <Canvas
      // `flat linear` keeps tone mapping and colour conversion out of the way:
      // the shader already outputs final sRGB values.
      flat
      linear
      frameloop={visible ? 'always' : 'never'}
      dpr={[1, maxDpr]}
      gl={{
        antialias: false,
        alpha: false,
        powerPreference: 'low-power',
        stencil: false,
        depth: false,
      }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <FlamePlane isMobile={isMobile} />
    </Canvas>
  )
}
