import type { ReactNode } from 'react'

/** Shared section shell: consistent rhythm, safe horizontal padding, no overflow. */
export function Section({
  id,
  children,
  className = '',
  labelledBy,
  bleed = false,
}: {
  id: string
  children: ReactNode
  className?: string
  labelledBy?: string
  /** Full-width sections (marquee, rails) manage their own inner padding. */
  bleed?: boolean
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`relative ${bleed ? '' : 'px-4 sm:px-6 lg:px-10'} py-20 sm:py-24 lg:py-32 ${className}`}
    >
      <div className={bleed ? '' : 'mx-auto w-full max-w-[100rem]'}>{children}</div>
    </section>
  )
}
