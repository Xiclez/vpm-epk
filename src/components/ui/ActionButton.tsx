import type { ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'

type Variant = 'primary' | 'outline' | 'quiet'

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-flame text-bone hover:bg-ember',
  outline: 'border border-line-strong text-bone hover:border-flame hover:text-flame',
  quiet: 'border border-line text-muted hover:border-line-strong hover:text-bone',
}

const BASE =
  'inline-flex min-h-11 items-center justify-center gap-2.5 px-5 py-3 font-display text-eyebrow font-medium tracking-[0.22em] uppercase transition-colors duration-300'

interface CommonProps {
  children: ReactNode
  variant?: Variant
  className?: string
  icon?: ReactNode
}

/** Navigation → renders an anchor. External links are labelled as such. */
export function ActionLink({
  href,
  external,
  children,
  variant = 'primary',
  className = '',
  icon,
  download,
}: CommonProps & { href: string; external?: boolean; download?: boolean }) {
  return (
    <a
      href={href}
      className={`${BASE} ${VARIANTS[variant]} ${className}`}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...(download ? { download: '' } : {})}
    >
      {icon}
      <span>{children}</span>
      {external && (
        <>
          <ArrowUpRight aria-hidden="true" className="size-4" />
          <span className="sr-only">(abre en una nueva pestaña)</span>
        </>
      )}
    </a>
  )
}

/** Actions → renders a real button. */
export function ActionButton({
  onClick,
  children,
  variant = 'outline',
  className = '',
  icon,
  disabled,
  title,
}: CommonProps & {
  onClick?: () => void
  disabled?: boolean
  title?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`${BASE} ${VARIANTS[variant]} ${className} disabled:cursor-not-allowed disabled:border-line disabled:bg-transparent disabled:text-muted/60 disabled:hover:border-line disabled:hover:text-muted/60`}
    >
      {icon}
      <span>{children}</span>
    </button>
  )
}
