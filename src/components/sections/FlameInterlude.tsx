import { useEffect, useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { brandAssets } from '../../content/artistData'
import { flameState } from '../../lib/flameState'

const WORDS = ['Follow', 'The', 'Flame'] as const

/** Fixed ember positions — decorative only. */
const EMBERS = [
  { left: '12%', bottom: '18%', delay: '0s', duration: '7s' },
  { left: '27%', bottom: '8%', delay: '1.4s', duration: '8.5s' },
  { left: '54%', bottom: '22%', delay: '2.6s', duration: '7.5s' },
  { left: '71%', bottom: '10%', delay: '0.8s', duration: '9s' },
  { left: '88%', bottom: '26%', delay: '3.4s', duration: '8s' },
]

export function FlameInterlude() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { amount: 0.55 })
  const reducedMotion = useReducedMotion()

  // Temporary, controlled increase in shader intensity — released on exit.
  useEffect(() => {
    flameState.boostTarget = inView ? 1 : 0
    return () => {
      flameState.boostTarget = 0
    }
  }, [inView])

  return (
    <section
      ref={ref}
      aria-labelledby="interlude-title"
      className="relative flex min-h-[85svh] items-center justify-center overflow-hidden px-4 py-24 sm:px-6"
    >
      {/* Graffiti mark used here as an urban transition asset. */}
      <img
        src={brandAssets.graffiti}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="pointer-events-none absolute top-8 left-1/2 w-[min(70vw,26rem)] -translate-x-1/2 opacity-[0.07] mix-blend-screen"
      />

      {!reducedMotion &&
        EMBERS.map((ember) => (
          <span
            key={ember.left}
            aria-hidden="true"
            className="pointer-events-none absolute size-1 rounded-full bg-ember"
            style={{
              left: ember.left,
              bottom: ember.bottom,
              animation: `vpm-ember-drift ${ember.duration} linear ${ember.delay} infinite`,
              boxShadow: '0 0 8px rgba(255,84,40,0.8)',
            }}
          />
        ))}

      <h2 id="interlude-title" className="relative text-center">
        <span className="sr-only">Follow the flame</span>

        {WORDS.map((word, index) => (
          <motion.span
            key={word}
            aria-hidden="true"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.6 }}
            transition={{ duration: 0.9, delay: index * 0.14, ease: [0.22, 1, 0.36, 1] }}
            className="block font-gothic text-mega leading-[0.86] font-normal tracking-[0.02em] text-bone/95 normal-case"
            style={{ textShadow: '0 0 42px rgba(225,38,28,0.35)' }}
          >
            {word}
          </motion.span>
        ))}
      </h2>
    </section>
  )
}
