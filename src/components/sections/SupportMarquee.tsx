import { useReducedMotion } from 'motion/react'
import { artistData } from '../../content/artistData'
import { Section } from '../ui/Section'
import { SectionHeading } from '../ui/SectionHeading'

function NameList({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul
      // The duplicated half exists only to make the loop seamless.
      {...(hidden ? { 'aria-hidden': true } : {})}
      className="flex shrink-0 items-center"
    >
      {artistData.supportedBy.map((name) => (
        <li key={name} className="flex items-center">
          <span className="px-5 font-display text-[clamp(1.125rem,3.5vw,2rem)] tracking-[0.04em] whitespace-nowrap uppercase sm:px-8">
            {name}
          </span>
          <span aria-hidden="true" className="size-1.5 shrink-0 rotate-45 bg-flame" />
        </li>
      ))}
    </ul>
  )
}

export function SupportMarquee() {
  const reducedMotion = useReducedMotion()

  return (
    <Section id="support" labelledBy="support-title" bleed>
      <div className="mx-auto w-full max-w-[100rem] px-4 sm:px-6 lg:px-10">
        <SectionHeading number="06" lines={['Supported', 'By']} id="support-title" />
      </div>

      <div className="mt-10 lg:mt-14">
        {reducedMotion ? (
          // Static, wrapped fallback — no motion, nothing clipped.
          <ul className="mx-auto flex w-full max-w-[100rem] flex-wrap items-center gap-x-6 gap-y-3 px-4 sm:px-6 lg:px-10">
            {artistData.supportedBy.map((name) => (
              <li
                key={name}
                className="font-display text-[clamp(1.125rem,3vw,1.75rem)] tracking-[0.04em] uppercase"
              >
                {name}
              </li>
            ))}
          </ul>
        ) : (
          <div
            role="group"
            aria-label="Artistas que han apoyado a VPM"
            tabIndex={0}
            className="marquee-viewport edge-fade w-full overflow-hidden border-y border-line py-6"
          >
            <div className="marquee-track">
              <NameList />
              <NameList hidden />
            </div>
          </div>
        )}
      </div>
    </Section>
  )
}
