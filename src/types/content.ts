/** Shared content types. All values live in src/content/artistData.ts. */

export type SocialPlatform = 'instagram' | 'facebook' | 'soundcloud' | 'youtube'

export interface SocialLink {
  platform: SocialPlatform
  /** Human label, e.g. "Instagram". */
  label: string
  /** Displayed handle, e.g. "@vpm_holyjunkie". */
  handle: string
  url: string
}

export interface GenreItem {
  name: string
  /** Primary genres get the strongest visual weight. */
  primary: boolean
}

export interface Mix {
  id: string
  title: string
  /** Renders the "NEW RELEASE" label. */
  isNew?: boolean
  /** EDITABLE — short editorial line shown on the card. */
  description: string
  /** Poster shown before the iframe is loaded (real photo, not a fake cover art). */
  poster: string
  /** Public SoundCloud page. */
  url: string
  /** Widget URL, loaded only after the user presses Play. */
  embedUrl: string
  /** Only set when the real length is known. */
  duration?: string
}

export interface VideoItem {
  id: string
  title: string
  description: string
  /** Privacy-enhanced embed (youtube-nocookie). */
  embedUrl: string
  /** Public watch URL. */
  url: string
  poster: string
  duration?: string
}

export interface Venue {
  name: string
  image: string
}

export interface GalleryItem {
  id: string
  /** Original Cloudinary URL — transformations are derived from it. */
  src: string
  alt: string
  /** Aspect ratio used for the grid tile, prevents layout shift. */
  ratio: '1:1' | '4:5' | '3:4' | '16:9'
  /** Tiles marked wide span two columns on larger screens. */
  wide?: boolean
}

export interface RiderGroup {
  title: string
  items: string[]
}

export interface DownloadItem {
  label: string
  /**
   * Path inside /public. `available: false` renders a visually disabled button
   * and never links to a generated/empty file.
   */
  href: string
  available: boolean
  note?: string
}

export interface NavItem {
  /** Section id used for anchor navigation. */
  id: string
  label: string
  /** Shown in the condensed desktop bar; all items appear in the mobile drawer. */
  primary: boolean
}

export interface Booking {
  contactName: string
  phoneDisplay: string
  /** Digits only, no country code. */
  phoneNational: string
  /** Mexico. Change if the booking number moves country. */
  countryCode: string
  email: string
  /** Prefilled WhatsApp message. */
  whatsappMessage: string
  emailSubject: string
}

export interface Seo {
  title: string
  description: string
  ogTitle: string
  ogDescription: string
  keywords: string
  /** Document language. */
  lang: string
}

export interface ArtistData {
  name: string
  tagline: string
  roles: string[]
  location: string
  shortBio: string
  extendedBio: string[]
  musicalIdentity: {
    heading: string
    lead: string
    body: string[]
    pullQuote: string
  }
  sound: {
    lead: string
    notes: string[]
  }
  liveExperience: {
    statements: string[]
    images: { src: string; alt: string; ratio: GalleryItem['ratio'] }[]
  }
  genres: GenreItem[]
  socials: SocialLink[]
  booking: Booking
  mixes: Mix[]
  videos: VideoItem[]
  supportedBy: string[]
  venues: Venue[]
  gallery: GalleryItem[]
  rider: {
    intro: string
    groups: RiderGroup[]
    software: string
  }
  downloads: DownloadItem[]
  nav: NavItem[]
  seo: Seo
  images: {
    heroPortrait: string
    aboutPortrait: string
  }
}
