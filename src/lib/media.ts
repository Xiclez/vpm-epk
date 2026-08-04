/** Cloudinary helpers. All gallery/venue images are served from Cloudinary. */

const UPLOAD = '/upload/'

function isCloudinary(url: string): boolean {
  return url.includes('cloudinary.com') && url.includes(UPLOAD)
}

/** Inserts a transformation string right after `/upload/`. */
export function cld(url: string, transform: string): string {
  if (!isCloudinary(url)) return url
  return url.replace(UPLOAD, `${UPLOAD}${transform}/`)
}

export const RATIO_CLASS = {
  '1:1': 'aspect-square',
  '4:5': 'aspect-[4/5]',
  '3:4': 'aspect-[3/4]',
  '16:9': 'aspect-video',
} as const

const RATIO_AR = {
  '1:1': 'ar_1:1',
  '4:5': 'ar_4:5',
  '3:4': 'ar_3:4',
  '16:9': 'ar_16:9',
} as const

export type Ratio = keyof typeof RATIO_CLASS

/** Cropped, weight-optimised thumbnail at a guaranteed aspect ratio. */
export function thumb(url: string, ratio: Ratio, width = 800): string {
  return cld(url, `c_fill,g_auto,${RATIO_AR[ratio]},w_${width},q_auto,f_auto`)
}

export function thumbSrcSet(url: string, ratio: Ratio, widths = [480, 800, 1200]): string {
  return widths.map((w) => `${thumb(url, ratio, w)} ${w}w`).join(', ')
}

/** Full-bleed image, still capped so the lightbox never pulls a raw original. */
export function full(url: string, width = 1600): string {
  return cld(url, `c_limit,w_${width},q_auto,f_auto`)
}

/**
 * Forces a browser download. Cloudinary honours `fl_attachment` placed
 * directly after `/upload/` — the technique used by the original press kit.
 */
export function downloadUrl(url: string): string {
  return isCloudinary(url) ? cld(url, 'fl_attachment') : url
}
