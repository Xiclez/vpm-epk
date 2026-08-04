import { artistData } from '../../content/artistData'
import { thumb } from '../../lib/media'
import { FlameBadge } from '../ui/FlameBadge'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'

/** Monochrome club image reused as the vinyl label. */
const LABEL_IMAGE = artistData.gallery[4].src

export function MusicalIdentitySection() {
  const { lead, body, pullQuote } = artistData.musicalIdentity

  return (
    <Section id="identity" labelledBy="identity-title">
      <SectionHeading number="03" lines={['Musical', 'Identity']} id="identity-title" />

      <div className="mt-12 grid grid-cols-1 items-center gap-14 lg:mt-16 lg:grid-cols-12 lg:gap-12">
        {/* ------------------------------------------------ editorial ---- */}
        <div className="lg:col-span-6">
          <Reveal>
            <p className="text-[clamp(1.375rem,2.6vw,2.125rem)] leading-[1.3] font-medium text-bone">
              {lead}
            </p>
          </Reveal>

          <Reveal delay={0.08} className="mt-7 flex flex-col gap-5 text-lead text-muted">
            {body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-9 border-l-2 border-flame pl-5 font-display text-h3 leading-[1.1] font-semibold uppercase">
              {pullQuote}
            </p>
          </Reveal>
        </div>

        {/* ------------------------------------ layered vinyl composition -- */}
        <Reveal delay={0.1} className="relative lg:col-span-6">
          <div className="relative mx-auto aspect-square w-[min(100%,30rem)]">
            {/*
              The grooves are radially symmetric, so only the label rotates.
              Rotating the full square would inflate its bounding box by √2 and
              create real horizontal page overflow on narrow screens.
            */}
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-full border border-line"
              style={{
                background:
                  'repeating-radial-gradient(circle at 50% 50%, #0b0b0b 0px, #0b0b0b 2px, #121212 3px, #0b0b0b 4px)',
              }}
            >
              {/*
                Label — the only visible rotation cue. The animation lives on
                the image so it cannot overwrite the wrapper's centring
                transform, and the circular clip keeps the square covered.
              */}
              <div className="absolute top-1/2 left-1/2 size-[34%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border border-line-warm">
                <img
                  src={thumb(LABEL_IMAGE, '1:1', 480)}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="ring-slow-spin photo-mono size-full object-cover"
                />
              </div>

              {/* Spindle hole. */}
              <div className="absolute top-1/2 left-1/2 size-[3%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink" />
            </div>

            {/* Restrained ember sheen across the disc. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-full"
              style={{
                background:
                  'radial-gradient(60% 60% at 72% 22%, rgba(255,84,40,0.28) 0%, transparent 62%)',
              }}
            />

            {/* Kept inside the viewport on narrow screens. */}
            <FlameBadge className="absolute -bottom-6 left-0 w-24 text-flame sm:w-32 lg:-left-10" />
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
