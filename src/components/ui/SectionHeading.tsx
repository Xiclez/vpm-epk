import { motion } from 'motion/react'

interface SectionHeadingProps {
  /** Large editorial section number, e.g. "01". */
  number: string
  /** First line stays bone-white, second line takes the flame accent. */
  lines: [string, string?]
  id?: string
  eyebrow?: string
  className?: string
}

/** Numbered editorial heading used across the site. */
export function SectionHeading({
  number,
  lines,
  id,
  eyebrow,
  className = '',
}: SectionHeadingProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`flex items-start gap-5 sm:gap-8 ${className}`}
    >
      <span aria-hidden="true" className="section-number shrink-0 pt-1">
        {number}
      </span>

      <div className="min-w-0">
        {eyebrow && <p className="eyebrow mb-3 text-muted">{eyebrow}</p>}
        <h2 id={id} className="text-h2">
          <span className="block">{lines[0]}</span>
          {lines[1] && <span className="block text-flame">{lines[1]}</span>}
        </h2>
      </div>
    </motion.header>
  )
}
