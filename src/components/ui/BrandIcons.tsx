import type { SVGProps } from 'react'
import type { SocialPlatform } from '../../types/content'

/**
 * Platform glyphs. lucide-react v1 no longer ships brand icons, so these are
 * drawn in the same 24px stroke style to stay visually consistent with it.
 */
type IconProps = SVGProps<SVGSVGElement>

const base: IconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
}

function InstagramGlyph(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="0.85" fill="currentColor" stroke="none" />
    </svg>
  )
}

function FacebookGlyph(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M15.5 3H13a4.5 4.5 0 0 0-4.5 4.5V11H6v4h2.5v6h4v-6h3l.75-4H12.5V7.75A.75.75 0 0 1 13.25 7h2.25z" />
    </svg>
  )
}

function SoundcloudGlyph(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M2 14.5v-3M5.5 16V10M9 17V8" />
      <path d="M12 17V7.5a5 5 0 0 1 9.1 2.9" />
      <path d="M12 17h8.2a2.6 2.6 0 0 0 0-5.2h-.6" />
    </svg>
  )
}

function YoutubeGlyph(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="2.5" y="5" width="19" height="14" rx="4.5" />
      <path d="m10.5 9.3 5.2 2.7-5.2 2.7z" fill="currentColor" stroke="none" />
    </svg>
  )
}

const GLYPHS: Record<SocialPlatform, (props: IconProps) => React.ReactElement> = {
  instagram: InstagramGlyph,
  facebook: FacebookGlyph,
  soundcloud: SoundcloudGlyph,
  youtube: YoutubeGlyph,
}

export function BrandIcon({
  platform,
  className,
}: {
  platform: SocialPlatform
  className?: string
}) {
  const Glyph = GLYPHS[platform]
  return <Glyph className={className} />
}
