import { useEffect } from 'react'

/**
 * Locks document scrolling for overlays only (splash, drawer, lightbox) and
 * restores the exact previous scroll position afterwards. Normal browsing is
 * never locked.
 */
export function useBodyScrollLock(active: boolean): void {
  useEffect(() => {
    if (!active) return

    const { body } = document
    const scrollY = window.scrollY
    const previous = {
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      overflow: body.style.overflow,
    }

    body.style.position = 'fixed'
    body.style.top = `-${scrollY}px`
    body.style.width = '100%'
    body.style.overflow = 'hidden'

    return () => {
      body.style.position = previous.position
      body.style.top = previous.top
      body.style.width = previous.width
      body.style.overflow = previous.overflow
      // `instant` is required: html has scroll-behavior: smooth, which would
      // otherwise animate the restore and land short of the original offset.
      window.scrollTo({ top: scrollY, left: 0, behavior: 'instant' })
    }
  }, [active])
}
