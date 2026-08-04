/**
 * Deployment-specific configuration.
 *
 * >>> EDIT THIS FILE when the final domain is known. <<<
 * Everything URL-shaped (canonical, Open Graph, JSON-LD) is derived from
 * SITE_URL, and index.html is synced from here at runtime by syncSeoUrls().
 */

/** EDITABLE PLACEHOLDER — current preview deployment. Replace with the final domain. */
export const SITE_URL = 'https://vpm-presskit.vercel.app'

/** Brand logo (transparent PNG) reused as favicon fallback and social share image. */
export const OG_IMAGE =
  'https://res.cloudinary.com/dbdy6vu2o/image/upload/v1769215325/WhatsApp_Image_2025-12-10_at_6.55.28_PM-removebg-preview_supvfd.png'

export const THEME_COLOR = '#050505'

/**
 * Keeps canonical / og:url / twitter:url aligned with SITE_URL so the domain
 * only has to be changed in one place.
 */
export function syncSeoUrls(): void {
  const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (canonical) canonical.href = SITE_URL

  for (const selector of ['meta[property="og:url"]', 'meta[name="twitter:url"]']) {
    const tag = document.querySelector<HTMLMetaElement>(selector)
    if (tag) tag.content = SITE_URL
  }
}
