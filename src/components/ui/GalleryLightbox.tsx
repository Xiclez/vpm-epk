import { useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { ChevronLeft, ChevronRight, Download, X } from 'lucide-react'
import type { GalleryItem } from '../../types/content'
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock'
import { useFocusTrap } from '../../hooks/useFocusTrap'
import { downloadUrl, full } from '../../lib/media'

interface GalleryLightboxProps {
  items: GalleryItem[]
  index: number
  onClose: () => void
  onNavigate: (nextIndex: number) => void
}

const ICON_BUTTON =
  'inline-flex size-11 items-center justify-center border border-line-strong text-bone transition-colors duration-300 hover:border-flame hover:text-flame'

export function GalleryLightbox({ items, index, onClose, onNavigate }: GalleryLightboxProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const item = items[index]

  useBodyScrollLock(true)
  useFocusTrap(containerRef, true, onClose)

  const previous = (index - 1 + items.length) % items.length
  const next = (index + 1) % items.length

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        onNavigate(previous)
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        onNavigate(next)
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [next, previous, onNavigate])

  if (!item) return null

  return (
    <motion.div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Galería, imagen ${index + 1} de ${items.length}`}
      tabIndex={-1}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-100 flex flex-col bg-ink/97 backdrop-blur-sm"
      style={{
        paddingTop: 'max(1rem, env(safe-area-inset-top))',
        paddingBottom: 'max(1rem, env(safe-area-inset-bottom))',
      }}
    >
      <div className="flex items-center justify-between gap-4 px-4 sm:px-6">
        <p className="eyebrow text-muted" aria-live="polite">
          {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
        </p>

        <div className="flex items-center gap-2">
          <a
            href={downloadUrl(item.src)}
            download
            className={ICON_BUTTON}
            title="Descargar imagen"
          >
            <Download aria-hidden="true" className="size-5" />
            <span className="sr-only">Descargar imagen</span>
          </a>

          <button type="button" onClick={onClose} className={ICON_BUTTON} title="Cerrar">
            <X aria-hidden="true" className="size-5" />
            <span className="sr-only">Cerrar galería</span>
          </button>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 items-center justify-center gap-2 px-2 py-4 sm:gap-4 sm:px-6">
        <button
          type="button"
          onClick={() => onNavigate(previous)}
          className={`${ICON_BUTTON} shrink-0`}
          title="Anterior"
        >
          <ChevronLeft aria-hidden="true" className="size-5" />
          <span className="sr-only">Imagen anterior</span>
        </button>

        <img
          key={item.id}
          src={full(item.src)}
          alt={item.alt}
          className="max-h-full min-h-0 w-auto max-w-full object-contain"
        />

        <button
          type="button"
          onClick={() => onNavigate(next)}
          className={`${ICON_BUTTON} shrink-0`}
          title="Siguiente"
        >
          <ChevronRight aria-hidden="true" className="size-5" />
          <span className="sr-only">Imagen siguiente</span>
        </button>
      </div>

      <p className="px-4 text-center text-caption text-muted sm:px-6">{item.alt}</p>
    </motion.div>
  )
}
