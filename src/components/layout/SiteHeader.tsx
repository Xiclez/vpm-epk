import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { artistData } from '../../content/artistData'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock'
import { useFocusTrap } from '../../hooks/useFocusTrap'
import { BrandIcon } from '../ui/BrandIcons'

const NAV_IDS = artistData.nav.map((item) => item.id)

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const drawerRef = useRef<HTMLDivElement>(null)
  const active = useActiveSection(NAV_IDS)

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })

  useBodyScrollLock(open)
  useFocusTrap(drawerRef, open, () => setOpen(false))

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const desktopItems = artistData.nav.filter((item) => item.primary)

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled ? 'bg-ink/85 backdrop-blur-md' : 'bg-transparent'
        }`}
        style={{ paddingTop: 'env(safe-area-inset-top)' }}
      >
        <div className="mx-auto flex h-16 w-full max-w-[100rem] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
          <a
            href="#top"
            className="font-display text-xl leading-none font-bold tracking-[0.08em] uppercase"
          >
            {artistData.name}
            <span className="sr-only"> — inicio</span>
          </a>

          <nav aria-label="Secciones" className="hidden lg:block">
            <ul className="flex items-center gap-7">
              {desktopItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={active === item.id ? 'true' : undefined}
                    className={`eyebrow transition-colors duration-300 hover:text-bone ${
                      active === item.id ? 'text-flame' : 'text-muted'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#booking"
              className="hidden min-h-11 items-center border border-flame px-4 font-display text-eyebrow font-medium tracking-[0.22em] uppercase transition-colors duration-300 hover:bg-flame sm:inline-flex"
            >
              Book VPM
            </a>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="inline-flex size-11 items-center justify-center border border-line-strong transition-colors duration-300 hover:border-flame lg:hidden"
            >
              <Menu aria-hidden="true" className="size-5" />
              <span className="sr-only">Abrir menú</span>
            </button>
          </div>
        </div>

        {/* Scroll-progress ember line. */}
        <motion.div
          aria-hidden="true"
          style={{ scaleX: progress }}
          className="h-px origin-left bg-gradient-to-r from-deepred via-flame to-ember"
        />
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menú"
            tabIndex={-1}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-60 flex flex-col bg-ink/98 backdrop-blur-md lg:hidden"
            style={{
              paddingTop: 'max(0.75rem, env(safe-area-inset-top))',
              paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))',
            }}
          >
            <div className="flex h-16 items-center justify-between px-4 sm:px-6">
              <span className="eyebrow text-muted">Menú</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex size-11 items-center justify-center border border-line-strong transition-colors duration-300 hover:border-flame"
              >
                <X aria-hidden="true" className="size-5" />
                <span className="sr-only">Cerrar menú</span>
              </button>
            </div>

            <nav aria-label="Secciones" className="flex-1 overflow-y-auto px-4 sm:px-6">
              <ul className="flex flex-col">
                {artistData.nav.map((item) => (
                  <li key={item.id} className="border-b border-line">
                    <a
                      href={`#${item.id}`}
                      onClick={() => setOpen(false)}
                      aria-current={active === item.id ? 'true' : undefined}
                      className="flex min-h-14 items-center font-display text-2xl uppercase transition-colors duration-200 hover:text-flame"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>

              <a
                href="#booking"
                onClick={() => setOpen(false)}
                className="mt-8 flex min-h-14 items-center justify-center bg-flame font-display text-eyebrow font-medium tracking-[0.28em] uppercase"
              >
                Book VPM
              </a>

              <ul className="mt-8 flex items-center gap-3">
                {artistData.socials.map((social) => (
                  <li key={social.platform}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex size-11 items-center justify-center border border-line text-muted transition-colors duration-300 hover:border-flame hover:text-flame"
                    >
                      <BrandIcon platform={social.platform} className="size-5" />
                      <span className="sr-only">{social.label} (abre en una nueva pestaña)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
