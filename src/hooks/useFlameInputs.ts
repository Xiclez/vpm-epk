import { useEffect } from 'react'
import { flameState } from '../lib/flameState'

/**
 * Feeds scroll progress and (desktop) pointer position into flameState.
 * Pointer listening is skipped on touch-primary devices — the shader must not
 * depend on pointer input to look alive.
 */
export function useFlameInputs(): void {
  useEffect(() => {
    let frame = 0

    const readScroll = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      flameState.scroll = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
    }

    const onScroll = () => {
      if (frame === 0) frame = requestAnimationFrame(readScroll)
    }

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      flameState.pointerX = event.clientX / window.innerWidth
      flameState.pointerY = 1 - event.clientY / window.innerHeight
    }

    readScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (fine) window.addEventListener('pointermove', onPointerMove, { passive: true })

    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      window.removeEventListener('pointermove', onPointerMove)
    }
  }, [])
}
