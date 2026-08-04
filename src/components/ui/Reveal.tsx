import { motion } from 'motion/react'
import type { ReactNode } from 'react'

/**
 * Single reveal primitive used for section-level entrances.
 * Deliberately coarse — individual paragraphs are never animated separately.
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className = '',
  as = 'div',
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  as?: 'div' | 'li' | 'section' | 'figure'
}) {
  const Component = motion[as]

  return (
    <Component
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </Component>
  )
}
