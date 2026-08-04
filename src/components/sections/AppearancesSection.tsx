import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { artistData } from '../../content/artistData'
import { thumb, thumbSrcSet } from '../../lib/media'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'

const RAIL_BUTTON =
  'inline-flex size-11 items-center justify-center border border-line-strong text-bone transition-colors duration-300 hover:border-flame hover:text-flame disabled:cursor-not-allowed disabled:border-line disabled:text-muted/50 disabled:hover:border-line disabled:hover:text-muted/50'

export function AppearancesSection() {
  const railRef = useRef<HTMLUListElement>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const syncEdges = useCallback(() => {
    const rail = railRef.current
    if (!rail) return

    const max = rail.scrollWidth - rail.clientWidth
    setAtStart(rail.scrollLeft <= 4)
    setAtEnd(rail.scrollLeft >= max - 4)
  }, [])

  useEffect(() => {
    syncEdges()
    window.addEventListener('resize', syncEdges)
    return () => window.removeEventListener('resize', syncEdges)
  }, [syncEdges])

  // Buttons only. The vertical wheel is never captured, so page scroll is normal.
  const scrollByPage = (direction: 1 | -1) => {
    const rail = railRef.current
    if (!rail) return
    rail.scrollBy({ left: direction * rail.clientWidth * 0.85, behavior: 'smooth' })
  }

  return (
    <Section id="appearances" labelledBy="appearances-title" bleed>
      <div className="mx-auto w-full max-w-[100rem] px-4 sm:px-6 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            number="07"
            lines={['Selected', 'Appearances']}
            id="appearances-title"
            eyebrow="Gigs & Venues"
          />

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollByPage(-1)}
              disabled={atStart}
              className={RAIL_BUTTON}
            >
              <ChevronLeft aria-hidden="true" className="size-5" />
              <span className="sr-only">Anterior</span>
            </button>
            <button
              type="button"
              onClick={() => scrollByPage(1)}
              disabled={atEnd}
              className={RAIL_BUTTON}
            >
              <ChevronRight aria-hidden="true" className="size-5" />
              <span className="sr-only">Siguiente</span>
            </button>
          </div>
        </div>
      </div>

      <Reveal className="mt-10 lg:mt-14">
        <ul
          ref={railRef}
          onScroll={syncEdges}
          // scroll-pl must match px, otherwise mandatory snapping aligns the
          // first card to the border edge and clips it behind the padding.
          className="rail flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain scroll-pl-4 px-4 pb-2 sm:gap-5 sm:scroll-pl-6 sm:px-6 lg:scroll-pl-10 lg:px-10"
        >
          {artistData.venues.map((venue, index) => (
            <li
              key={venue.name}
              className="w-[74vw] shrink-0 snap-start sm:w-[38vw] lg:w-[20rem]"
            >
              <figure>
                <div className="aspect-[4/5] overflow-hidden border border-line">
                  <img
                    src={thumb(venue.image, '4:5', 700)}
                    srcSet={thumbSrcSet(venue.image, '4:5', [400, 700])}
                    sizes="(min-width: 1024px) 20rem, 74vw"
                    alt={`Presentación de ${artistData.name} en ${venue.name}`}
                    loading="lazy"
                    decoding="async"
                    className="photo-mono size-full object-cover"
                  />
                </div>

                <figcaption className="mt-4 flex items-baseline gap-3">
                  <span aria-hidden="true" className="eyebrow text-flame">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="font-display text-lg leading-tight tracking-[0.03em] uppercase">
                    {venue.name}
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  )
}
