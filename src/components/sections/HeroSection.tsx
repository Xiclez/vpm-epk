import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ArrowDown } from 'lucide-react'
import { artistData, brandAssets } from '../../content/artistData'
import { thumb, thumbSrcSet } from '../../lib/media'
import { ActionLink } from '../ui/ActionButton'
import { BrandIcon } from '../ui/BrandIcons'

const EASE = [0.22, 1, 0.36, 1] as const

export function HeroSection() {
  const ref = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  // Small, layered parallax — never more than a few dozen pixels.
  const portraitY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  const wordmarkY = useTransform(scrollYProgress, [0, 1], ['0%', '-18%'])
  const taglineY = useTransform(scrollYProgress, [0, 1], ['0%', '-40%'])
  const ringY = useTransform(scrollYProgress, [0, 1], ['0%', '24%'])
  const cueOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0])

  const still = Boolean(reducedMotion)
  const heroGenres = artistData.genres.filter((genre) => genre.primary || genre.name === 'Tech House')

  return (
    <section
      ref={ref}
      id="top"
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden px-4 pt-28 pb-12 sm:px-6 lg:px-10"
    >
      {/*
        Rotating brand ring behind the portrait. Parallax and rotation are on
        separate elements — a CSS transform animation would otherwise override
        the inline transform Motion writes for the y offset.
      */}
      <motion.div
        aria-hidden="true"
        style={still ? undefined : { y: ringY }}
        className="pointer-events-none absolute -top-16 right-[-18%] w-[min(90vw,38rem)] lg:right-[-6%]"
      >
        <img
          src={brandAssets.ring}
          alt=""
          className={`w-full max-w-none opacity-[0.14] mix-blend-screen ${
            still ? '' : 'ring-slow-spin'
          }`}
        />
      </motion.div>

      <div className="relative mx-auto grid w-full max-w-[100rem] grid-cols-1 items-end gap-10 lg:grid-cols-12 lg:gap-8">
        {/* ------------------------------------------------- portrait ---- */}
        <motion.figure
          initial={{ opacity: 0, clipPath: 'inset(14% 0% 0% 0%)' }}
          animate={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.1 }}
          style={still ? undefined : { y: portraitY }}
          className="relative order-1 lg:order-2 lg:col-span-5 lg:col-start-8"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden border border-line">
            <img
              src={thumb(artistData.images.heroPortrait, '4:5', 900)}
              srcSet={thumbSrcSet(artistData.images.heroPortrait, '4:5', [600, 900, 1200])}
              sizes="(min-width: 1024px) 40vw, 92vw"
              alt={`${artistData.name}, DJ y productor, retrato`}
              // The single hero image is the one asset worth loading eagerly.
              fetchPriority="high"
              decoding="async"
              className="photo-mono size-full object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent"
            />
          </div>

          <figcaption className="eyebrow mt-3 text-muted">{artistData.location}</figcaption>
        </motion.figure>

        {/* ----------------------------------------------------- copy ---- */}
        <div className="order-2 lg:order-1 lg:col-span-7 lg:pb-6">
          <motion.h1
            id="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE }}
            style={still ? undefined : { y: wordmarkY }}
            className="text-hero -ml-1 leading-[0.82] font-bold tracking-[-0.03em] lg:-ml-3"
          >
            {artistData.name}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
            style={still ? undefined : { y: taglineY }}
            className="mt-5 flex flex-col gap-4"
          >
            <p className="font-display text-h3 font-semibold tracking-[0.06em] text-flame uppercase">
              {artistData.tagline}
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <p className="eyebrow">DJ &amp; Producer</p>
              <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
              <ul className="flex flex-wrap items-center gap-x-3 gap-y-2">
                {heroGenres.map((genre) => (
                  <li
                    key={genre.name}
                    className={`eyebrow ${genre.primary ? 'text-bone' : 'text-muted'}`}
                  >
                    {genre.name}
                  </li>
                ))}
              </ul>
            </div>

            <p className="max-w-xl text-lead text-muted">
              Bass House y Deep Tech desde Chihuahua. Cada set es un viaje construido para la pista
              de baile.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: EASE }}
            className="mt-8 flex flex-col gap-6"
          >
            <div className="flex flex-wrap items-center gap-3">
              <ActionLink href="#mixes" variant="primary">
                Listen to the mixes
              </ActionLink>
              <ActionLink href="#booking" variant="outline">
                Book VPM
              </ActionLink>
            </div>

            <ul className="flex items-center gap-3">
              {artistData.socials.map((social) => (
                <li key={social.platform}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex size-11 items-center justify-center border border-line text-muted transition-colors duration-300 hover:border-flame hover:text-flame"
                  >
                    <BrandIcon platform={social.platform} className="size-5" />
                    <span className="sr-only">{social.label} (abre en una nueva pestaña)</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* ------------------------------------------------- scroll cue ---- */}
      <motion.a
        href="#about"
        style={still ? undefined : { opacity: cueOpacity }}
        className="relative mx-auto mt-12 inline-flex min-h-11 items-center gap-3 self-center font-display text-eyebrow font-medium tracking-[0.3em] text-muted uppercase transition-colors duration-300 hover:text-bone lg:mt-16"
      >
        <span aria-hidden="true" className="h-10 w-px bg-gradient-to-b from-flame to-transparent" />
        Scroll
        <ArrowDown aria-hidden="true" className="size-4" />
      </motion.a>
    </section>
  )
}
