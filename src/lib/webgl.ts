/** One-shot WebGL capability probe. Result is cached. */
let cached: boolean | null = null

export function hasWebGL(): boolean {
  if (cached !== null) return cached
  if (typeof window === 'undefined') return false

  try {
    const canvas = document.createElement('canvas')
    cached = Boolean(
      canvas.getContext('webgl2') ??
        canvas.getContext('webgl') ??
        canvas.getContext('experimental-webgl'),
    )
  } catch {
    cached = false
  }

  return cached
}
