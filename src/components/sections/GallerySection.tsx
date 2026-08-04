import { useState } from 'react'
import { AnimatePresence } from 'motion/react'
import { artistData } from '../../content/artistData'
import { RATIO_CLASS, thumb, thumbSrcSet } from '../../lib/media'
import { GalleryLightbox } from '../ui/GalleryLightbox'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'

export function GallerySection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const items = artistData.gallery

  return (
    <Section id="gallery" labelledBy="gallery-title">
      <SectionHeading number="09" lines={['Gallery']} id="gallery-title" />

      {/* Mixed-ratio editorial grid. Ratios come from the data, so no layout shift. */}
      <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-16 lg:grid-cols-4">
        {items.map((item, index) => (
          <Reveal
            as="li"
            key={item.id}
            delay={(index % 4) * 0.05}
            className={item.wide ? 'col-span-2' : ''}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              className="group block w-full cursor-zoom-in overflow-hidden border border-line"
            >
              <div className={RATIO_CLASS[item.ratio]}>
                <img
                  src={thumb(item.src, item.ratio, 700)}
                  srcSet={thumbSrcSet(item.src, item.ratio, [360, 700, 1000])}
                  sizes="(min-width: 1024px) 24vw, 48vw"
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                  className="photo-mono size-full object-cover group-hover:scale-[1.04] group-hover:brightness-100"
                />
              </div>
              <span className="sr-only">Ampliar imagen</span>
            </button>
          </Reveal>
        ))}
      </ul>

      <AnimatePresence>
        {openIndex !== null && (
          <GalleryLightbox
            items={items}
            index={openIndex}
            onClose={() => setOpenIndex(null)}
            onNavigate={setOpenIndex}
          />
        )}
      </AnimatePresence>
    </Section>
  )
}
