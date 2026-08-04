/**
 * Shared mutable state read by the shader inside useFrame.
 * Deliberately outside React: scroll and pointer must never trigger re-renders.
 */
export const flameState = {
  /** Document scroll progress, 0 → 1. */
  scroll: 0,
  /** Normalised pointer position; stays centred on touch devices. */
  pointerX: 0.5,
  pointerY: 0.5,
  /** Target for the interlude intensity boost, 0 or 1. */
  boostTarget: 0,
  /** Eased current boost value, written by the shader loop. */
  boost: 0,
}

export function resetFlameBoost(): void {
  flameState.boostTarget = 0
}
