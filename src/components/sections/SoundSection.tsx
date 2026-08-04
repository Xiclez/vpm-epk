import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { artistData } from '../../content/artistData'
import type { GenreItem } from '../../types/content'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'

function GenreRow({
  genre,
  index,
  total,
  progress,
  still,
}: {
  genre: GenreItem
  index: number
  total: number
  progress: MotionValue<number>
  still: boolean
}) {
  // Each row drifts on a slightly different schedule as the section passes.
  const direction = index % 2 === 0 ? 1 : -1
  const x = useTransform(progress, [0, 1], [`${direction * -3}%`, `${direction * 3}%`])
  const opacity = useTransform(
    progress,
    [0, 0.15 + (index / total) * 0.2, 0.9, 1],
    [0.35, 1, 1, 0.55],
  )

  return (
    <motion.li
      style={still ? undefined : { x, opacity }}
      className="group border-t border-line last:border-b"
    >
      <div className="flex items-baseline justify-between gap-4 py-4 sm:py-5">
        <h3
          className={`font-display leading-[0.9] font-bold uppercase transition-colors duration-500 ${
            genre.primary
              ? 'text-[clamp(2.25rem,8vw,5.5rem)] text-bone group-hover:text-flame'
              : 'text-[clamp(1.25rem,3.4vw,2.25rem)] text-muted group-hover:text-bone'
          }`}
        >
          {genre.name}
        </h3>

        <span
          aria-hidden="true"
          className={`eyebrow shrink-0 ${genre.primary ? 'text-flame' : 'text-muted/60'}`}
        >
          {genre.primary ? 'Core' : 'Range'}
        </span>
      </div>
    </motion.li>
  )
}

export function SoundSection() {
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const genres = artistData.genres

  return (
    <Section id="sound" labelledBy="sound-title">
      <SectionHeading number="02" lines={['The', 'Sound']} id="sound-title" />

      <div ref={ref} className="mt-12 grid grid-cols-1 gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-4">
          <p className="text-[clamp(1.125rem,1.8vw,1.5rem)] leading-[1.4] text-bone">
            {artistData.sound.lead}
          </p>

          <ul className="mt-8 flex flex-col gap-4">
            {artistData.sound.notes.map((note) => (
              <li key={note} className="flex gap-3 text-caption text-muted">
                <span aria-hidden="true" className="mt-2 h-px w-6 shrink-0 bg-flame" />
                {note}
              </li>
            ))}
          </ul>
        </Reveal>

        <ul className="lg:col-span-8">
          {genres.map((genre, index) => (
            <GenreRow
              key={genre.name}
              genre={genre}
              index={index}
              total={genres.length}
              progress={scrollYProgress}
              still={Boolean(reducedMotion)}
            />
          ))}
        </ul>
      </div>
    </Section>
  )
}
