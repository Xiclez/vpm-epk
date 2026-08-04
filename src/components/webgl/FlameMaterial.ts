import { Color, LinearSRGBColorSpace, ShaderMaterial, Vector2 } from 'three'
import { FLAME_CONFIG } from '../../config/flame'
import { buildFlameFragmentShader, flameVertexShader } from './shaders/flame'

/**
 * The shader writes gl_FragColor directly, and the canvas renders in linear
 * output mode, so uniform colours must keep their literal sRGB values instead
 * of being converted into three's linear working space.
 */
function rawColor(hex: string): Color {
  return new Color().setStyle(hex, LinearSRGBColorSpace)
}

/**
 * Builds the shader material from FLAME_CONFIG. All tuning stays in
 * src/config/flame.ts so the shader itself never needs editing.
 */
export function createFlameMaterial(isMobile: boolean): ShaderMaterial {
  const c = FLAME_CONFIG
  const octaves = isMobile ? c.quality.mobileOctaves : c.quality.desktopOctaves

  return new ShaderMaterial({
    vertexShader: flameVertexShader,
    fragmentShader: buildFlameFragmentShader(octaves),
    depthTest: false,
    depthWrite: false,
    uniforms: {
      uTime: { value: 0 },
      uResolution: { value: new Vector2(1, 1) },
      uScroll: { value: 0 },
      uPointer: { value: new Vector2(0.5, 0.5) },
      uBoost: { value: 0 },

      uSpeed: { value: c.speed },
      // Mobile runs a slightly calmer, cheaper field.
      uIntensity: { value: isMobile ? c.intensity * 0.85 : c.intensity },
      uDistortion: { value: isMobile ? c.distortion * 0.7 : c.distortion },
      uEmbers: { value: isMobile ? c.embers * 0.6 : c.embers },
      uCenterFalloff: { value: c.centerFalloff },
      uScrollResponse: { value: c.scrollResponse },
      uPointerResponse: { value: isMobile ? 0 : c.pointerResponse },
      uBoostAmount: { value: c.interludeBoost },

      uColorBase: { value: rawColor(c.colors.base) },
      uColorDeep: { value: rawColor(c.colors.deep) },
      uColorFlame: { value: rawColor(c.colors.flame) },
      uColorEmber: { value: rawColor(c.colors.ember) },
      uColorWarm: { value: rawColor(c.colors.warmWhite) },
    },
  })
}
