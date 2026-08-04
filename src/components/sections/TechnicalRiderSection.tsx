import { Download } from 'lucide-react'
import { artistData } from '../../content/artistData'
import { ActionButton, ActionLink } from '../ui/ActionButton'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'

export function TechnicalRiderSection() {
  const { intro, groups, software } = artistData.rider
  const download = artistData.downloads[0]

  return (
    <Section id="rider" labelledBy="rider-title">
      <SectionHeading number="08" lines={['Technical', 'Rider']} id="rider-title" />

      <div className="mt-12 grid grid-cols-1 gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-4">
          <p className="font-display text-h3 leading-[1.1] uppercase">{intro}</p>

          <div className="mt-8 flex items-center gap-4 border border-line-warm px-5 py-4">
            <span className="eyebrow text-flame">Software</span>
            <span className="font-display text-lg tracking-[0.04em] uppercase">{software}</span>
          </div>

          <div className="mt-8">
            {download.available ? (
              <ActionLink
                href={download.href}
                download
                variant="primary"
                icon={<Download aria-hidden="true" className="size-4" />}
              >
                {download.label}
              </ActionLink>
            ) : (
              // No placeholder PDF is generated. See artistData.downloads for
              // the exact path where the real rider must be placed.
              <ActionButton
                disabled
                variant="outline"
                icon={<Download aria-hidden="true" className="size-4" />}
                title="PDF pendiente"
              >
                {download.label}
              </ActionButton>
            )}

            {download.note && <p className="mt-3 text-caption text-muted">{download.note}</p>}
          </div>
        </Reveal>

        {/* Grouped lists rather than a wide table — nothing overflows on mobile. */}
        <div className="grid grid-cols-1 gap-px bg-line sm:grid-cols-2 lg:col-span-8">
          {groups.map((group, index) => (
            <Reveal key={group.title} delay={index * 0.06} className="bg-ink p-6 lg:p-8">
              <div className="flex items-baseline gap-3">
                <span aria-hidden="true" className="eyebrow text-flame">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display text-lg tracking-[0.06em]">{group.title}</h3>
              </div>

              <ul className="mt-5 flex flex-col gap-3">
                {group.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-caption text-muted">
                    <span
                      aria-hidden="true"
                      className="mt-1.5 size-1.5 shrink-0 rotate-45 border border-flame"
                    />
                    <span className="break-words">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
