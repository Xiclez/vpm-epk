import { Suspense, lazy } from 'react'
import { useReducedMotion } from 'motion/react'
import { hasWebGL } from '../../lib/webgl'

// Kept out of the critical bundle: the site is fully usable before this loads.
const FlameCanvas = lazy(() => import('./FlameCanvas'))

/**
 * Fixed decorative background layer.
 *
 * The CSS gradient/noise fallback is always painted underneath, so it doubles
 * as the WebGL-unavailable and reduced-motion presentation.
 */
export function FlameBackground() {
  const reducedMotion = useReducedMotion()
  const webgl = hasWebGL()
  const useCanvas = webgl && !reducedMotion

  return (
    <div
      aria-hidden="true"
      className="flame-fallback pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {useCanvas && (
        <Suspense fallback={null}>
          <FlameCanvas />
        </Suspense>
      )}
    </div>
  )
}
