import { useState } from 'react'
import { artistData } from '../../content/artistData'
import { RATIO_CLASS, thumb, thumbSrcSet } from '../../lib/media'
import { ActionLink } from '../ui/ActionButton'
import { MediaEmbed } from '../ui/MediaEmbed'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'

/** Asymmetric collage placement, largest to smallest. */
const PLACEMENT = [
  'lg:col-span-5 lg:col-start-1',
  'lg:col-span-6 lg:col-start-7 lg:mt-16',
  'lg:col-span-7 lg:col-start-6',
  'lg:col-span-4 lg:col-start-1 lg:-mt-20',
]

export function LiveExperienceSection() {
  const [videoActive, setVideoActive] = useState(false)
  const video = artistData.videos[0]
  const { statements, images } = artistData.liveExperience

  return (
    <Section id="live" labelledBy="live-title">
      <SectionHeading number="04" lines={['Live', 'Experience']} id="live-title" />

      <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 lg:mt-16 lg:grid-cols-12">
        {images.map((image, index) => (
          <Reveal
            as="figure"
            key={image.src}
            delay={index * 0.06}
            className={`${PLACEMENT[index] ?? 'lg:col-span-4'} ${index === 2 ? 'col-span-2' : ''}`}
          >
            <div className={`${RATIO_CLASS[image.ratio]} overflow-hidden border border-line`}>
              <img
                src={thumb(image.src, image.ratio, 900)}
                srcSet={thumbSrcSet(image.src, image.ratio)}
                sizes="(min-width: 1024px) 40vw, 48vw"
                alt={image.alt}
                loading="lazy"
                decoding="async"
                className="photo-mono size-full object-cover hover:scale-[1.03]"
              />
            </div>
          </Reveal>
        ))}

        {/* Statements sit inside the collage grid, not beside it. */}
        <Reveal className="col-span-2 self-center lg:col-span-4 lg:col-start-6 lg:row-start-3">
          <ul className="flex flex-col gap-4">
            {statements.map((statement) => (
              <li
                key={statement}
                className="font-display text-[clamp(1.125rem,2.2vw,1.75rem)] leading-[1.15] uppercase"
              >
                {statement}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      {/* --------------------------------------------- featured live set -- */}
      <Reveal className="mt-16 grid grid-cols-1 gap-8 lg:mt-24 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-8">
          <MediaEmbed
            title={video.title}
            poster={video.poster}
            embedUrl={video.embedUrl}
            frame="video"
            active={videoActive}
            onActivate={() => setVideoActive(true)}
            meta={video.duration}
          />
        </div>

        <div className="flex flex-col justify-center lg:col-span-4">
          <p className="eyebrow text-flame">Featured live set</p>
          <h3 className="mt-3 text-h3">{video.title}</h3>
          <p className="mt-4 text-caption leading-relaxed text-muted">{video.description}</p>

          <ActionLink href={video.url} external variant="quiet" className="mt-6 self-start">
            Ver en YouTube
          </ActionLink>
        </div>
      </Reveal>
    </Section>
  )
}
