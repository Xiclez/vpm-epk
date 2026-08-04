import { Play } from 'lucide-react'
import { thumb, thumbSrcSet } from '../../lib/media'
import type { Ratio } from '../../lib/media'

interface MediaEmbedProps {
  title: string
  poster: string
  posterAlt?: string
  embedUrl: string
  /** Video keeps 16:9; audio uses the SoundCloud widget height. */
  frame: 'video' | 'audio'
  active: boolean
  onActivate: () => void
  /** Small caption shown over the poster, e.g. a duration. */
  meta?: string
}

/**
 * Poster-first media surface. The iframe is only created after a real user
 * interaction — nothing is preloaded and nothing autoplays.
 */
export function MediaEmbed({
  title,
  poster,
  posterAlt = '',
  embedUrl,
  frame,
  active,
  onActivate,
  meta,
}: MediaEmbedProps) {
  const ratio: Ratio = '16:9'
  const shell =
    frame === 'video'
      ? 'relative w-full aspect-video overflow-hidden bg-ink'
      : 'relative w-full h-[320px] overflow-hidden bg-ink'

  if (active) {
    return (
      <div className={`${shell} border border-line-warm`}>
        <iframe
          src={embedUrl}
          title={title}
          loading="lazy"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 size-full border-0"
        />
      </div>
    )
  }

  return (
    <div className={`${shell} border border-line`}>
      <img
        src={thumb(poster, ratio, 800)}
        srcSet={thumbSrcSet(poster, ratio)}
        sizes="(min-width: 1024px) 60vw, 100vw"
        alt=""
        loading="lazy"
        decoding="async"
        className="photo-mono absolute inset-0 size-full object-cover opacity-70"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent"
      />

      <button
        type="button"
        onClick={onActivate}
        className="group absolute inset-0 flex flex-col items-center justify-center gap-4 text-bone"
      >
        <span className="flex size-16 items-center justify-center rounded-full border border-flame bg-flame/15 backdrop-blur-[2px] transition-colors duration-300 group-hover:bg-flame">
          <Play aria-hidden="true" className="ml-0.5 size-6" />
        </span>
        <span className="eyebrow px-6 text-center">
          Reproducir<span className="sr-only"> {title}</span>
        </span>
        {meta && <span className="text-caption text-muted">{meta}</span>}
      </button>

      {posterAlt && <span className="sr-only">{posterAlt}</span>}
    </div>
  )
}
