import { useState } from 'react'
import { motion } from 'motion/react'
import { MapPin, Plus, Minus } from 'lucide-react'
import { artistData, brandAssets } from '../../content/artistData'
import { thumb, thumbSrcSet } from '../../lib/media'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'

export function AboutSection() {
  const [expanded, setExpanded] = useState(false)
  const [lead, second, third, detail] = artistData.extendedBio

  return (
    <Section id="about" labelledBy="about-title">
      <SectionHeading number="01" lines={['About', 'VPM']} id="about-title" eyebrow="The Source" />

      <div className="mt-12 grid grid-cols-1 gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-12">
        {/* --------------------------------------------------- portrait ---- */}
        <Reveal as="figure" className="relative lg:col-span-5 lg:col-start-1 lg:row-start-1">
          <div className="aspect-[4/5] overflow-hidden border border-line lg:sticky lg:top-28">
            <img
              src={thumb(artistData.images.aboutPortrait, '4:5', 900)}
              srcSet={thumbSrcSet(artistData.images.aboutPortrait, '4:5', [500, 900])}
              sizes="(min-width: 1024px) 38vw, 92vw"
              alt={`Retrato de estudio de ${artistData.name}`}
              loading="lazy"
              decoding="async"
              className="photo-mono size-full object-cover"
            />
          </div>

          {/* "Music Connects People" graffiti detail. */}
          <img
            src={brandAssets.graffiti}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="pointer-events-none absolute -bottom-8 -left-2 w-32 opacity-40 mix-blend-screen sm:w-44 lg:-left-6"
          />
        </Reveal>

        {/* ------------------------------------------------------ copy ---- */}
        <div className="lg:col-span-6 lg:col-start-7 lg:row-start-1">
          <Reveal>
            <p className="text-[clamp(1.25rem,2.2vw,1.75rem)] leading-[1.35] font-medium text-bone">
              {lead}
            </p>
          </Reveal>

          <Reveal delay={0.08} className="mt-7 flex flex-col gap-5 text-lead text-muted">
            <p>{second}</p>
            <p>{third}</p>
          </Reveal>

          <motion.div
            initial={false}
            animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pt-5 text-lead text-muted">{detail}</p>
          </motion.div>

          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            aria-expanded={expanded}
            className="mt-6 inline-flex min-h-11 items-center gap-2 font-display text-eyebrow font-medium tracking-[0.22em] uppercase transition-colors duration-300 hover:text-flame"
          >
            {expanded ? (
              <Minus aria-hidden="true" className="size-4" />
            ) : (
              <Plus aria-hidden="true" className="size-4" />
            )}
            {expanded ? 'Leer menos' : 'Leer más'}
          </button>

          <Reveal delay={0.12} className="mt-10 flex flex-wrap items-center gap-6 border-t border-line pt-6">
            <p className="flex items-center gap-2 text-caption text-muted">
              <MapPin aria-hidden="true" className="size-4 text-flame" />
              {artistData.location}
            </p>
            <p className="eyebrow text-muted">Music Connects People</p>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
