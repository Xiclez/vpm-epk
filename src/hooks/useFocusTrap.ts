import { useEffect, useRef, type RefObject } from 'react'

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'iframe',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

/**
 * Traps Tab focus inside `containerRef` while `active`, handles Escape, and
 * restores focus to the previously focused element on close.
 */
export function useFocusTrap(
  containerRef: RefObject<HTMLElement | null>,
  active: boolean,
  onClose: () => void,
): void {
  // Held in a ref so an inline onClose cannot re-run the effect: re-running it
  // would restore focus mid-interaction (e.g. while paging the lightbox).
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  useEffect(() => {
    if (!active) return

    const container = containerRef.current
    const restoreTo = document.activeElement as HTMLElement | null

    const focusables = () =>
      Array.from(container?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []).filter(
        (el) => el.offsetParent !== null || el.tagName === 'IFRAME',
      )

    // Move focus into the overlay without scrolling the locked page.
    const first = focusables()[0]
    ;(first ?? container)?.focus({ preventScroll: true })

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onCloseRef.current()
        return
      }

      if (event.key !== 'Tab') return

      const items = focusables()
      if (items.length === 0) return

      const firstItem = items[0]
      const lastItem = items[items.length - 1]
      const current = document.activeElement

      if (event.shiftKey && (current === firstItem || current === container)) {
        event.preventDefault()
        lastItem.focus()
      } else if (!event.shiftKey && current === lastItem) {
        event.preventDefault()
        firstItem.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      // preventScroll keeps the restored scroll offset exactly where it was.
      restoreTo?.focus?.({ preventScroll: true })
    }
  }, [active, containerRef])
}
