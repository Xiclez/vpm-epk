import { useCallback, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { SiteFooter } from '../components/layout/SiteFooter'
import { SiteHeader } from '../components/layout/SiteHeader'
import { AboutSection } from '../components/sections/AboutSection'
import { AppearancesSection } from '../components/sections/AppearancesSection'
import { BookingSection } from '../components/sections/BookingSection'
import { FeaturedMixesSection } from '../components/sections/FeaturedMixesSection'
import { FlameInterlude } from '../components/sections/FlameInterlude'
import { GallerySection } from '../components/sections/GallerySection'
import { HeroSection } from '../components/sections/HeroSection'
import { LiveExperienceSection } from '../components/sections/LiveExperienceSection'
import { MusicalIdentitySection } from '../components/sections/MusicalIdentitySection'
import { SocialsSection } from '../components/sections/SocialsSection'
import { SoundSection } from '../components/sections/SoundSection'
import { SupportMarquee } from '../components/sections/SupportMarquee'
import { TechnicalRiderSection } from '../components/sections/TechnicalRiderSection'
import { SplashScreen } from '../components/ui/SplashScreen'
import { FlameBackground } from '../components/webgl/FlameBackground'
import { useFlameInputs } from '../hooks/useFlameInputs'

const SESSION_KEY = 'vpm:entered'

function readSessionEntry(): boolean {
  try {
    return sessionStorage.getItem(SESSION_KEY) === '1'
  } catch {
    // Private mode / storage disabled — fall back to the full splash.
    return false
  }
}

export function App() {
  const [splashVisible, setSplashVisible] = useState(true)
  // Repeat visits in the same session get the short transition.
  const [splashMode] = useState<'full' | 'quick'>(() => (readSessionEntry() ? 'quick' : 'full'))

  useFlameInputs()

  const handleEnter = useCallback(() => {
    try {
      sessionStorage.setItem(SESSION_KEY, '1')
    } catch {
      // Non-fatal: the splash simply shows again next time.
    }
    setSplashVisible(false)
  }, [])

  return (
    <>
      <FlameBackground />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:bg-flame focus:px-4 focus:py-3 focus:font-display focus:text-eyebrow focus:tracking-[0.22em] focus:uppercase"
      >
        Saltar al contenido
      </a>

      <SiteHeader />

      {/* Smooth splash-to-hero settle. Content stays mounted for a11y and SEO. */}
      <motion.div
        animate={{ opacity: splashVisible ? 0.35 : 1, scale: splashVisible ? 1.02 : 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <main id="main">
          <HeroSection />
          <AboutSection />
          <SoundSection />
          <MusicalIdentitySection />
          <LiveExperienceSection />
          <FeaturedMixesSection />
          <SupportMarquee />
          <AppearancesSection />
          <FlameInterlude />
          <TechnicalRiderSection />
          <GallerySection />
          <SocialsSection />
          <BookingSection />
        </main>

        <SiteFooter />
      </motion.div>

      <AnimatePresence>
        {splashVisible && <SplashScreen mode={splashMode} onEnter={handleEnter} />}
      </AnimatePresence>
    </>
  )
}
