import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { artistData, brandAssets } from '../../content/artistData'
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock'
import { cld } from '../../lib/media'

/** Essential above-the-fold assets — nothing else is preloaded here. */
const ESSENTIAL_ASSETS = [
  brandAssets.ring,
  cld(artistData.images.heroPortrait, 'c_fill,g_auto,ar_4:5,w_900,q_auto,f_auto'),
]

/** Hard ceiling: the entry button always becomes available. */
const READY_TIMEOUT_MS = 2600

const EASE = [0.22, 1, 0.36, 1] as const

export function SplashScreen({
  mode,
  onEnter,
}: {
  /** 'quick' is used for repeat visits in the same session. */
  mode: 'full' | 'quick'
  onEnter: () => void
}) {
  const reducedMotion = useReducedMotion()
  const [progress, setProgress] = useState(0)
  const [ready, setReady] = useState(mode === 'quick')
  const enterRef = useRef<HTMLButtonElement>(null)

  useBodyScrollLock(true)

  // Preload essential assets and drive the progress indicator. No fake delays.
  useEffect(() => {
    if (mode === 'quick') return

    let done = 0
    let cancelled = false

    const step = () => {
      if (cancelled) return
      done += 1
      setProgress(Math.round((done / ESSENTIAL_ASSETS.length) * 100))
      if (done >= ESSENTIAL_ASSETS.length) setReady(true)
    }

    ESSENTIAL_ASSETS.forEach((src) => {
      const img = new Image()
      img.onload = step
      img.onerror = step
      img.src = src
    })

    const timeout = window.setTimeout(() => {
      if (cancelled) return
      setProgress((current) => Math.max(current, 100))
      setReady(true)
    }, READY_TIMEOUT_MS)

    return () => {
      cancelled = true
      window.clearTimeout(timeout)
    }
  }, [mode])

  // Repeat visits: dissolve straight through to the hero.
  useEffect(() => {
    if (mode !== 'quick') return
    const timeout = window.setTimeout(onEnter, 480)
    return () => window.clearTimeout(timeout)
  }, [mode, onEnter])

  useEffect(() => {
    if (ready && mode === 'full') enterRef.current?.focus()
  }, [ready, mode])

  const staged = mode === 'full' && !reducedMotion

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Intro"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reducedMotion ? 0.2 : 0.7, ease: EASE }}
      className="fixed inset-0 z-100 flex flex-col items-center justify-center overflow-hidden bg-ink px-6"
      style={{ height: '100dvh' }}
    >
      {/* --- ADDED VIDEO BACKGROUND --- */}
      <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
        >
          <source src="/assets/media/character.mp4" type="video/mp4" />
        </video>
        {/* Gradient mask to anchor the text */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/50" />
      </div>

      {/* Ignition glow from the centre. */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: staged ? [0, 0.55, 0.32] : 0.32, scale: 1 }}
        transition={{
          duration: staged ? 2.6 : 0.6,
          ease: 'easeOut',
          // Keyframe timing belongs to the value that has keyframes.
          ...(staged ? { opacity: { duration: 2.6, times: [0, 0.6, 1] } } : {}),
        }}
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(42% 42% at 50% 50%, rgba(255,84,40,0.55) 0%, rgba(225,38,28,0.18) 38%, transparent 72%)',
        }}
      />

      <div className="relative flex flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: staged ? 0.9 : 0, ease: EASE }}
          className="font-display text-[clamp(3.5rem,17vw,9rem)] leading-none font-bold tracking-[-0.02em]"
        >
          {artistData.name}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: staged ? 1.25 : 0.05, ease: EASE }}
          className="eyebrow mt-4 text-flame"
        >
          {artistData.tagline}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: staged ? 1.5 : 0.1, ease: EASE }}
          className="eyebrow mt-2 text-muted"
        >
          Electronic Press Kit
        </motion.p>

        {mode === 'full' && (
          <div className="mt-12 flex w-[min(20rem,72vw)] flex-col items-center">
            {/* Restrained progress indicator. */}
            <div
              role="progressbar"
              aria-label="Cargando"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
              className="h-px w-full overflow-hidden bg-line"
            >
              <motion.div
                className="h-full bg-gradient-to-r from-flame to-ember"
                initial={{ width: '0%' }}
                animate={{ width: `${ready ? 100 : progress}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>

            <motion.button
              ref={enterRef}
              type="button"
              onClick={onEnter}
              disabled={!ready}
              initial={{ opacity: 0 }}
              animate={{ opacity: ready ? 1 : 0.35 }}
              transition={{ duration: 0.5 }}
              className="mt-8 inline-flex min-h-12 items-center gap-3 border border-flame px-8 py-3 font-display text-eyebrow font-medium tracking-[0.3em] uppercase transition-colors duration-300 hover:bg-flame disabled:cursor-wait"
            >
              {ready ? 'Follow the flame' : 'Cargando'}
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  )
}