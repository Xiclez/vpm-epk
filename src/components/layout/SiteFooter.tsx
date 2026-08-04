import { ArrowUp } from 'lucide-react'
import { artistData, brandAssets } from '../../content/artistData'
import { BrandIcon } from '../ui/BrandIcons'

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-line px-4 pt-14 pb-10 sm:px-6 lg:px-10">
      {/* Secondary flame character used as a restrained urban sticker. */}
      <img
        src={brandAssets.flameCharacter}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="pointer-events-none absolute right-4 -top-10 w-24 opacity-25 mix-blend-screen sm:w-32 lg:right-10"
      />

      <div className="mx-auto flex w-full max-w-[100rem] flex-col gap-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="font-display text-[clamp(2.5rem,9vw,5rem)] leading-none font-bold">
              {artistData.name}
            </p>
            <p className="eyebrow mt-3 text-muted">Electronic Press Kit</p>
            <p className="eyebrow mt-1 text-flame">{artistData.tagline}</p>
          </div>

          <div className="flex flex-col items-start gap-5 md:items-end">
            <ul className="flex items-center gap-3">
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

            <a
              href="#top"
              className="inline-flex min-h-11 items-center gap-2 font-display text-eyebrow font-medium tracking-[0.22em] text-muted uppercase transition-colors duration-300 hover:text-bone"
            >
              <ArrowUp aria-hidden="true" className="size-4" />
              Volver arriba
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-line pt-6 text-caption text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {artistData.name} Official. Todos los derechos reservados.
          </p>
          <p>
            {artistData.location} · Booking: {artistData.booking.contactName}
          </p>
        </div>
      </div>
    </footer>
  )
}
