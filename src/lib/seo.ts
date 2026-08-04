import { OG_IMAGE, SITE_URL } from '../config/site'
import { artistData } from '../content/artistData'

/**
 * Injects MusicGroup structured data. Built at runtime so the deployment URL
 * only ever has to be edited in src/config/site.ts.
 */
export function injectStructuredData(): void {
  const existing = document.getElementById('vpm-jsonld')
  if (existing) existing.remove()

  const payload = {
    '@context': 'https://schema.org',
    '@type': 'MusicGroup',
    name: artistData.name,
    alternateName: 'VPM DJ',
    description: artistData.seo.description,
    url: SITE_URL,
    image: OG_IMAGE,
    genre: artistData.genres.map((genre) => genre.name),
    location: {
      '@type': 'Place',
      name: artistData.location,
    },
    member: {
      '@type': 'Person',
      name: artistData.name,
      jobTitle: artistData.roles.join(' & '),
    },
    sameAs: artistData.socials.map((social) => social.url),
  }

  const script = document.createElement('script')
  script.id = 'vpm-jsonld'
  script.type = 'application/ld+json'
  script.textContent = JSON.stringify(payload)
  document.head.appendChild(script)
}
