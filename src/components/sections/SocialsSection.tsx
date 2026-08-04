import { ArrowUpRight } from 'lucide-react'
import { artistData, brandAssets } from '../../content/artistData'
import { BrandIcon } from '../ui/BrandIcons'
import { FlameBadge } from '../ui/FlameBadge'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'

export function SocialsSection() {
  return (
    <Section id="socials" labelledBy="socials-title">
      <SectionHeading number="10" lines={['Socials']} id="socials-title" />

      <div className="mt-12 grid grid-cols-1 gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-12">
        {/* Only platforms with a real URL are rendered — no dead links. */}
        <ul className="flex flex-col lg:col-span-7">
          {artistData.socials.map((social, index) => (
            <Reveal as="li" key={social.platform} delay={index * 0.05}>
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-16 items-center gap-5 border-t border-line py-5 transition-colors duration-300 last:border-b hover:border-line-warm"
              >
                <BrandIcon
                  platform={social.platform}
                  className="size-6 shrink-0 text-muted transition-colors duration-300 group-hover:text-flame"
                />

                <span className="min-w-0 flex-1">
                  <span className="block font-display text-[clamp(1.25rem,3vw,1.875rem)] tracking-[0.04em] uppercase">
                    {social.label}
                  </span>
                  <span className="mt-1 block truncate text-caption text-muted">
                    {social.handle}
                  </span>
                </span>

                <ArrowUpRight
                  aria-hidden="true"
                  className="size-5 shrink-0 text-muted transition-colors duration-300 group-hover:text-flame"
                />
                <span className="sr-only">— {social.label} (abre en una nueva pestaña)</span>
              </a>
            </Reveal>
          ))}
        </ul>

        {/* Urban identity block: graffiti mark + circular logo. */}
        <Reveal delay={0.1} className="relative flex flex-col items-center justify-center gap-8 lg:col-span-5">
          <img
            src={brandAssets.graffiti}
            alt={`Identidad gráfica de ${artistData.name}: lettering graffiti con corona y la frase Music Connects People`}
            loading="lazy"
            decoding="async"
            className="w-[min(80%,22rem)] opacity-90 mix-blend-screen"
          />

          <FlameBadge className="w-28 text-flame sm:w-32" />
        </Reveal>
      </div>
    </Section>
  )
}
