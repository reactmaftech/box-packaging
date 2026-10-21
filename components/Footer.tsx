'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail } from 'lucide-react'

// Logo import
import logoImage from '../assets/logo/footer-logo.png'
// Payment gateway image
import paymentGatewaysImage from '../assets/images/payments-gateway.webp'

const PHONE_NUMBER = '+12177276247'
const PHONE_DISPLAY = '+1 (217) 727-6247'
const EMAIL_ADDRESS = 'info@slickcustomboxes.com'
const SITE_NAME = 'Slick Custom Boxes'

const SUPPORT_LINKS = [
  { label: 'Contact Us', href: '/contact' },
  { label: 'About', href: '/about' },
  { label: 'FAQs', href: '/faqs' },
]

const LEGAL_LINKS = [
  { label: 'Terms & Conditions', href: '/terms-and-conditions' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
]

export function Footer() {
  return (
    <footer className="bg-[#171512] text-white">
      {/* Amber accent bar */}
      <div className="h-1 bg-[#FDB022]" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Top: Brand (left) + Support (center) + Legal & Payments (right) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10">
          {/* ── Column 1: Brand + contact ─────────────────────────── */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link href="/" className="flex items-center mb-5 group">
              <Image
                src={logoImage}
                alt={SITE_NAME}
                className="h-14 md:h-16 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
              />
            </Link>

            <p className="text-white/55 text-sm leading-relaxed mb-6 max-w-xs">
              We design and manufacture premium custom packaging from cardboard
              and micro-corrugated board — built around your brand.
            </p>

            <div className="flex flex-col gap-3 text-sm">
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="flex items-center gap-2.5 text-white/70 hover:text-[#FDB022] transition-colors"
              >
                <Phone size={15} className="shrink-0" />
                {PHONE_DISPLAY}
              </a>
              <a
                href={`mailto:${EMAIL_ADDRESS}`}
                className="flex items-center gap-2.5 text-white/70 hover:text-[#FDB022] transition-colors break-all"
              >
                <Mail size={15} className="shrink-0" />
                {EMAIL_ADDRESS}
              </a>
            </div>
          </div>

          {/* ── Column 2: Support menu ────────────────────────────── */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-sm font-bold text-[#FDB022] uppercase tracking-wider mb-5">
              Support
            </h3>
            <ul className="space-y-3 text-sm">
              {SUPPORT_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/65 hover:text-[#FDB022] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Column 3: Legal + payment gateways ────────────────── */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-sm font-bold text-[#FDB022] uppercase tracking-wider mb-5">
              Legal
            </h3>
            <ul className="space-y-3 text-sm mb-8">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/65 hover:text-[#FDB022] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="text-sm font-bold text-[#FDB022] uppercase tracking-wider mb-4">
              We Accept
            </h3>
            <div className="bg-white rounded-xl px-4 py-3 inline-flex items-center justify-center">
              <Image
                src={paymentGatewaysImage}
                alt="Accepted payment methods"
                className="h-8 md:h-10 w-auto object-contain"
              />
            </div>
          </div>
        </div>

        {/* Bottom bar — copyright + legal links */}
        <div className="pt-8 mt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40 text-center md:text-left">
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-sm">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/40 hover:text-[#FDB022] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}