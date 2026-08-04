/**
 * Central tuning object for the global fire shader.
 * Change values here — never inside the shader — for visual adjustments.
 */
export const FLAME_CONFIG = {
  /** Vertical flow speed of the smoke/flame field. */
  speed: 0.085,
  /** Master brightness of the whole effect (0 = invisible). */
  intensity: 0.72,
  /** Domain-warp amount: heat distortion strength. */
  distortion: 0.42,
  /** Density of the drifting ember specks. */
  embers: 0.55,
  /** How dark the central reading column stays (higher = darker centre). */
  centerFalloff: 1.35,
  /** Extra brightness added while the "Follow the Flame" interlude is in view. */
  interludeBoost: 0.75,
  /** Seconds the boost takes to ease in/out. */
  boostEase: 1.6,
  /** Scroll-progress influence on intensity (subtle). */
  scrollResponse: 0.3,
  /** Pointer influence, desktop only. Not required on touch devices. */
  pointerResponse: 0.18,

  colors: {
    base: '#050505',
    deep: '#620D0D',
    flame: '#E1261C',
    ember: '#FF5428',
    /** Used very sparingly, only at the hottest cores. */
    warmWhite: '#FFE2C4',
  },

  /** Fewer fbm octaves + lower resolution scale on small screens. */
  quality: {
    desktopOctaves: 5,
    mobileOctaves: 3,
    /** Breakpoint (px) under which the mobile tier is used. */
    mobileBreakpoint: 768,
    /** Mobile renders at a lower internal resolution multiplier. */
    mobileScale: 0.75,
  },

  /** Hard cap on device pixel ratio to protect fill-rate. */
  maxPixelRatio: 1.5,
} as const

export type FlameConfig = typeof FLAME_CONFIG
