'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { X, Phone, Mail, ShieldCheck, ArrowRight } from 'lucide-react'

// Popup image
import popupImage from '../assets/images/custom-pr-1.jpg'

const PHONE_NUMBER = '+12177276247'
const PHONE_DISPLAY = '+1 (217) 727-6247'
const EMAIL_ADDRESS = 'info@slickcustomboxes.com'
const QUOTE_URL = '/get-a-quote'
const DELAY_MS = 15000 // 15 seconds

export function QuotePopup() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [entered, setEntered] = useState(false)

  // Every time the page (pathname) changes: hide the popup, restart the
  // 15-second timer, and show it again. Closing it only hides it for the
  // current page, because the timer has already fired and won't run again
  // until the user moves to another page.
  useEffect(() => {
    setOpen(false)
    setEntered(false)

    // Don't show the popup on the quote page itself
    if (pathname === QUOTE_URL) return

    const timer = setTimeout(() => setOpen(true), DELAY_MS)
    return () => clearTimeout(timer)
  }, [pathname])

  // Fade-in animation after mounting
  useEffect(() => {
    if (!open) return
    const frame = requestAnimationFrame(() => setEntered(true))
    return () => cancelAnimationFrame(frame)
  }, [open])

  // Close with Escape key + lock page scroll while open
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  if (!open) return null

  const close = () => setOpen(false)

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-[#171512]/60 backdrop-blur-sm transition-opacity duration-300 ${
        entered ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-popup-title"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-md max-h-[95vh] overflow-y-auto rounded-3xl bg-[#FFF8EB] shadow-2xl transition-all duration-300 ${
          entered ? 'translate-y-0 scale-100' : 'translate-y-4 scale-95'
        }`}
      >
        {/* Top image */}
        <div className="relative h-44 sm:h-52 w-full overflow-hidden rounded-t-3xl bg-[#171512]">
          <Image
            src={popupImage}
            alt="Custom packaging boxes by Slick Custom Boxes"
            fill
            sizes="(max-width: 448px) 100vw, 448px"
            className="object-cover"
            priority
          />
          {/* Soft dark gradient so the close button stays readable */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20" />

          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Badge sits on the edge of the image */}
        <div className="relative z-10 -mt-4 flex justify-center">
          <span className="rounded-full bg-[#FDB022] px-5 py-1.5 text-xs font-extrabold uppercase tracking-wider text-[#171512] shadow-md whitespace-nowrap">
            Free Quote
          </span>
        </div>

        {/* Content */}
        <div className="px-6 pb-6 pt-5 text-center sm:px-8">
          <h2
            id="quote-popup-title"
            className="text-2xl font-bold leading-snug text-[#171512] sm:text-[28px]"
          >
            It&apos;s no harm to get a quote
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            Tell us what box you need and we will send you a price. It is free,
            there is no pressure, and there are no hidden fees.
          </p>

          <div className="mt-6 space-y-3">
            {/* Get a Quote */}
            <Link
              href={QUOTE_URL}
              onClick={close}
              className="flex items-center justify-between gap-3 rounded-2xl bg-gradient-to-r from-[#FDB022] to-[#E8940C] px-4 py-3.5 text-left text-[#171512] shadow-md transition-transform hover:scale-[1.02]"
            >
              <span className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/40">
                  <ArrowRight size={18} />
                </span>
                <span>
                  <span className="block text-sm font-bold">Get a Quote</span>
                  <span className="block text-xs text-[#171512]/75">
                    Quick and free
                  </span>
                </span>
              </span>
              <ArrowRight size={18} className="shrink-0" />
            </Link>

            {/* Call */}
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="flex items-center justify-between gap-3 rounded-2xl bg-[#171512] px-4 py-3.5 text-left text-white shadow-md transition-transform hover:scale-[1.02]"
            >
              <span className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15">
                  <Phone size={18} />
                </span>
                <span>
                  <span className="block text-sm font-bold">Call us now</span>
                  <span className="block text-xs text-white/60">
                    Talk to our team
                  </span>
                </span>
              </span>
              <span className="text-sm font-bold">{PHONE_DISPLAY}</span>
            </a>

            {/* Email */}
            <a
              href={`mailto:${EMAIL_ADDRESS}`}
              className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-left text-[#171512] shadow-sm transition-transform hover:scale-[1.02]"
            >
              <span className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FDB022]/20 text-[#C27803]">
                  <Mail size={18} />
                </span>
                <span>
                  <span className="block text-sm font-bold">Email us</span>
                  <span className="block text-xs text-slate-500">
                    We reply fast
                  </span>
                </span>
              </span>
              <span className="min-w-0 break-all text-right text-xs font-semibold sm:text-sm">
                {EMAIL_ADDRESS}
              </span>
            </a>
          </div>

          <p className="mt-5 flex items-center justify-center gap-1.5 text-xs text-slate-500">
            <ShieldCheck size={14} />
            Your details stay private
          </p>
        </div>
      </div>
    </div>
  )
}