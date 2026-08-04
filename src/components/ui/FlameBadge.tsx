import { useId } from 'react'
import { Flame } from 'lucide-react'

/**
 * Circular "Follow the Flame" mark — the recurring brand motif.
 * Rotation is intentionally very slow (see .ring-slow-spin).
 */
export function FlameBadge({
  className = '',
  spin = true,
}: {
  className?: string
  spin?: boolean
}) {
  const id = useId()
  const pathId = `ftf-${id.replace(/[^a-zA-Z0-9]/g, '')}`

  return (
    <div className={`relative ${className}`} aria-hidden="true">
      <svg viewBox="0 0 200 200" className={`size-full ${spin ? 'ring-slow-spin' : ''}`}>
        <defs>
          <path
            id={pathId}
            d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0"
            fill="none"
          />
        </defs>

        <circle cx="100" cy="100" r="94" fill="none" stroke="currentColor" strokeOpacity="0.35" />
        <circle cx="100" cy="100" r="58" fill="none" stroke="currentColor" strokeOpacity="0.2" />

        <text
          fill="currentColor"
          fontFamily="var(--font-display)"
          fontSize="16"
          fontWeight="500"
          letterSpacing="5.6"
        >
          <textPath href={`#${pathId}`}>
            FOLLOW THE FLAME · FOLLOW THE FLAME ·
          </textPath>
        </text>
      </svg>

      <Flame
        className="absolute top-1/2 left-1/2 size-[22%] -translate-x-1/2 -translate-y-1/2"
        strokeWidth={1.5}
      />
    </div>
  )
}
