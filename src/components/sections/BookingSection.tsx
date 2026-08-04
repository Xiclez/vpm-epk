import { useState } from 'react'
import { Check, Copy, Mail, MessageCircle, Phone, User } from 'lucide-react'
import { artistData } from '../../content/artistData'
import { ActionButton, ActionLink } from '../ui/ActionButton'
import { BrandIcon } from '../ui/BrandIcons'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'

const { booking } = artistData

/** E.164-style number for wa.me: country code + national number, digits only. */
const whatsappNumber = `${booking.countryCode}${booking.phoneNational}`
const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(booking.whatsappMessage)}`
const mailtoHref = `mailto:${booking.email}?subject=${encodeURIComponent(booking.emailSubject)}`
const telHref = `tel:+${whatsappNumber}`

export function BookingSection() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(booking.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard unavailable (insecure context or denied) — the mailto link
      // and the visible address remain fully usable.
    }
  }

  return (
    <Section id="booking" labelledBy="booking-title">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="eyebrow text-muted">11 — Booking</p>
            <h2 id="booking-title" className="mt-4 text-h2">
              <span className="block">Book</span>
              <span className="block text-flame">VPM</span>
            </h2>
          </Reveal>

          <Reveal delay={0.08} className="mt-10 flex flex-col gap-px bg-line">
            <p className="flex min-h-16 items-center gap-4 bg-ink py-4">
              <User aria-hidden="true" className="size-5 shrink-0 text-flame" />
              <span className="font-display text-lg tracking-[0.04em] uppercase">
                {booking.contactName}
              </span>
            </p>

            <p className="flex min-h-16 items-center gap-4 bg-ink py-4">
              <Phone aria-hidden="true" className="size-5 shrink-0 text-flame" />
              <a
                href={telHref}
                className="text-lead transition-colors duration-300 hover:text-flame"
              >
                {booking.phoneDisplay}
              </a>
            </p>

            <p className="flex min-h-16 flex-wrap items-center gap-x-4 gap-y-2 bg-ink py-4">
              <Mail aria-hidden="true" className="size-5 shrink-0 text-flame" />
              <a
                href={mailtoHref}
                className="text-lead break-all transition-colors duration-300 hover:text-flame"
              >
                {booking.email}
              </a>
            </p>
          </Reveal>

          <Reveal delay={0.12} className="mt-8 flex flex-wrap items-center gap-3">
            <ActionLink
              href={mailtoHref}
              variant="primary"
              icon={<Mail aria-hidden="true" className="size-4" />}
            >
              Enviar email
            </ActionLink>

            <ActionLink
              href={whatsappHref}
              external
              variant="outline"
              icon={<MessageCircle aria-hidden="true" className="size-4" />}
            >
              WhatsApp
            </ActionLink>

            <ActionButton
              onClick={copyEmail}
              variant="quiet"
              icon={
                copied ? (
                  <Check aria-hidden="true" className="size-4 text-flame" />
                ) : (
                  <Copy aria-hidden="true" className="size-4" />
                )
              }
            >
              {copied ? 'Email copiado' : 'Copiar email'}
            </ActionButton>

            <span aria-live="polite" className="sr-only">
              {copied ? 'Dirección de email copiada al portapapeles' : ''}
            </span>
          </Reveal>

          <Reveal delay={0.16} className="mt-10">
            <p className="eyebrow mb-4 text-muted">Redes</p>
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
          </Reveal>
        </div>

        {/* Final signature. */}
        <Reveal
          delay={0.1}
          className="flex items-end justify-start border-t border-line pt-10 lg:col-span-5 lg:justify-end lg:border-t-0 lg:pt-0"
        >
          <p className="font-gothic text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.95] text-bone/90 normal-case lg:text-right">
            Follow
            <br />
            The
            <br />
            Flame
          </p>
        </Reveal>
      </div>
    </Section>
  )
}
