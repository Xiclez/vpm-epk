import { useState } from 'react'
import { artistData } from '../../content/artistData'
import { ActionLink } from '../ui/ActionButton'
import { BrandIcon } from '../ui/BrandIcons'
import { MediaEmbed } from '../ui/MediaEmbed'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'

const PLATFORMS = ['soundcloud', 'youtube'] as const

const PLATFORM_COPY: Record<(typeof PLATFORMS)[number], string> = {
  soundcloud: 'Escucha los mixes seleccionados y más contenido en el perfil.',
  youtube: 'Sets en vivo y sesiones grabadas.',
}

export function FeaturedMixesSection() {
  // Only one embedded player is ever mounted.
  const [activeId, setActiveId] = useState<string | null>(null)

  return (
    <Section id="mixes" labelledBy="mixes-title">
      <SectionHeading number="05" lines={['Featured', 'Mixes']} id="mixes-title" />

      <ul className="mt-12 grid grid-cols-1 gap-6 lg:mt-16 lg:grid-cols-3 lg:gap-5">
        {artistData.mixes.map((mix, index) => (
          <Reveal as="li" key={mix.id} delay={index * 0.07} className="flex flex-col">
            <div className="relative">
              {mix.isNew && !(activeId === mix.id) && (
                <p className="absolute top-3 left-3 z-10 bg-flame px-3 py-1.5 font-display text-eyebrow font-medium tracking-[0.2em] uppercase">
                  New release
                </p>
              )}

              <MediaEmbed
                title={mix.title}
                poster={mix.poster}
                embedUrl={mix.embedUrl}
                frame="audio"
                active={activeId === mix.id}
                onActivate={() => setActiveId(mix.id)}
                meta={mix.duration}
              />
            </div>

            <div className="flex flex-1 flex-col border-x border-b border-line p-5">
              <p className="eyebrow text-muted">
                Mix {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-2 font-display text-h3 leading-tight">{mix.title}</h3>
              <p className="mt-3 flex-1 text-caption leading-relaxed text-muted">
                {mix.description}
              </p>

              <ActionLink href={mix.url} external variant="quiet" className="mt-5 self-start">
                Escuchar
              </ActionLink>
            </div>
          </Reveal>
        ))}
      </ul>

      {/* ------------------------------------------- platform shortcuts -- */}
      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-5">
        {PLATFORMS.map((platform) => {
          const social = artistData.socials.find((item) => item.platform === platform)
          if (!social) return null

          return (
            <Reveal key={platform} className="flex flex-col justify-between gap-5 border border-line p-6 sm:flex-row sm:items-center">
              <div className="flex items-start gap-4">
                <BrandIcon platform={platform} className="mt-0.5 size-6 shrink-0 text-flame" />
                <div>
                  <p className="font-display text-eyebrow font-medium tracking-[0.24em] uppercase">
                    {social.label}
                  </p>
                  <p className="mt-2 max-w-xs text-caption text-muted">
                    {PLATFORM_COPY[platform]}
                  </p>
                </div>
              </div>

              <ActionLink href={social.url} external variant="outline" className="shrink-0">
                Abrir
              </ActionLink>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
