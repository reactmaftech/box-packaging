'use client'

import Link from 'next/link'
import Image from 'next/image'
import {
  Phone,
  Mail,
  MapPin,
  Palette,
  Truck,
  Tags,
  BadgeDollarSign,
  ArrowUp,
} from 'lucide-react'

// Logo import
import logoImage from '../assets/logo/footer-logo.png'
// Payment gateway image
import paymentGatewaysImage from '../assets/images/payments-gateway.webp'

const PHONE_NUMBER = '+12177276247'
const PHONE_DISPLAY = '+1 (217) 727-6247'
const EMAIL_ADDRESS = 'info@slickcustomboxes.com'
const SITE_NAME = 'Slick Custom Boxes'
const ADDRESS_LINES = ['1519 Hopewell Ave, Essex', 'MD 21221, USA']

const FEATURES = [
  { icon: Palette, title: 'Everything Customised', text: 'Your size, material & print' },
  { icon: Truck, title: 'Free Delivery For All Orders', text: 'Fast worldwide shipping' },
  { icon: Tags, title: 'Bulk Order Discounts', text: 'Save more as you scale' },
  { icon: BadgeDollarSign, title: 'Best Price On The Market', text: 'Premium quality, fair price' },
]

const ABOUT_LINKS = [
  { label: 'About Us', href: '/about' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'FAQs', href: '/faqs' },
]

const STYLE_LINKS = [
  { label: 'Custom Apparel Boxes', href: '/custom-apparel-boxes' },
  { label: 'Custom Bakery Boxes', href: '/custom-bakery-boxes' },
  { label: 'Custom Bottle Boxes', href: '/custom-bottle-boxes' },
  { label: 'Custom CBD Boxes', href: '/custom-cbd-boxes' },
  { label: 'Custom Candle Boxes', href: '/custom-candle-boxes' },
  { label: 'Custom Cigarette Boxes', href: '/custom-cigarette-boxes' },
]

const MATERIAL_LINKS = [
  { label: 'Custom Cardboard Boxes', href: '/custom-cardboard-boxes' },
  { label: 'Custom Corrugated Boxes', href: '/custom-corrugated-boxes' },
  { label: 'Custom Kraft Boxes', href: '/custom-kraft-boxes' },
  { label: 'Custom Rigid Boxes', href: '/custom-rigid-boxes' },
]

const LEGAL_LINKS = [
  { label: 'FAQs', href: '/faqs' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms & Conditions', href: '/terms-and-conditions' },
]

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-sm font-bold text-[#171512] uppercase tracking-widest mb-6">
      {children}
    </h3>
  )
}

function LinkList({ links }: { links: { label: string; href: string }[] }) {
  return (
    <ul className="space-y-3.5 text-sm">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className="text-slate-600 hover:text-[#C27803] transition-colors"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-white to-[#FFF8EB] text-slate-800 border-t border-slate-200">
      {/* Amber accent bar */}
      <div className="h-1 bg-[#FDB022]" />

      <div className="max-w-7xl mx-auto px-6 pt-14 pb-8">
        {/* ── Feature strip ─────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {FEATURES.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#FDB022]/15 text-[#C27803]">
                <Icon size={22} />
              </span>
              <div>
                <p className="text-sm font-bold text-[#171512]">{title}</p>
                <p className="text-sm text-slate-500">{text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Main columns ──────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-3 flex flex-col items-center sm:items-start text-center sm:text-left">
            <Link href="/" className="flex items-center mb-5 group">
              <Image
                src={logoImage}
                alt={SITE_NAME}
                className="h-14 md:h-16 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
              />
            </Link>
            <p className="text-slate-600 text-sm leading-relaxed max-w-xs">
              We design and manufacture premium custom packaging from cardboard
              and micro-corrugated board — built around your brand.
            </p>
          </div>

          {/* About Us */}
          <div className="lg:col-span-2 flex flex-col items-center sm:items-start text-center sm:text-left">
            <FooterHeading>About Us</FooterHeading>
            <LinkList links={ABOUT_LINKS} />
          </div>

          {/* Popular Styles */}
          <div className="lg:col-span-2 flex flex-col items-center sm:items-start text-center sm:text-left">
            <FooterHeading>Popular Styles</FooterHeading>
            <LinkList links={STYLE_LINKS} />
          </div>

          {/* Popular Materials */}
          <div className="lg:col-span-2 flex flex-col items-center sm:items-start text-center sm:text-left">
            <FooterHeading>Popular Materials</FooterHeading>
            <LinkList links={MATERIAL_LINKS} />
          </div>

          {/* Contact Us */}
          <div className="lg:col-span-3 flex flex-col items-center sm:items-start text-center sm:text-left">
            <FooterHeading>Contact Us</FooterHeading>
            <ul className="space-y-5 text-sm">
              <li className="flex items-start gap-3 text-left">
                <Phone size={16} className="mt-0.5 shrink-0 text-[#C27803]" />
                <a
                  href={`tel:${PHONE_NUMBER}`}
                  className="text-slate-600 hover:text-[#C27803] transition-colors"
                >
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li className="flex items-start gap-3 text-left">
                <Mail size={16} className="mt-0.5 shrink-0 text-[#C27803]" />
                <div>
                  <p className="text-[#171512] font-medium">Contact Email</p>
                  <a
                    href={`mailto:${EMAIL_ADDRESS}`}
                    className="text-slate-600 hover:text-[#C27803] transition-colors break-all"
                  >
                    {EMAIL_ADDRESS}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 text-left">
                <MapPin size={16} className="mt-0.5 shrink-0 text-[#C27803]" />
                <div>
                  <p className="text-[#171512] font-medium">Address</p>
                  <address className="not-italic text-slate-600">
                    {ADDRESS_LINES.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ────────────────────────────────────────── */}
        <div className="mt-14 pt-6 border-t border-slate-200 flex flex-col lg:flex-row items-center justify-between gap-6">
          <p className="text-sm text-slate-500 text-center lg:text-left">
            © {new Date().getFullYear()} All Rights Reserved by{' '}
            <Link href="/" className="text-[#C27803] font-medium hover:underline">
              {SITE_NAME}
            </Link>
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm">
            {LEGAL_LINKS.map((link, i) => (
              <span key={link.href} className="flex items-center gap-5">
                <Link
                  href={link.href}
                  className="text-slate-600 hover:text-[#C27803] transition-colors"
                >
                  {link.label}
                </Link>
                {i < LEGAL_LINKS.length - 1 && (
                  <span className="hidden sm:block h-4 w-px bg-slate-300" />
                )}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 inline-flex items-center justify-center">
              <Image
                src={paymentGatewaysImage}
                alt="Accepted payment methods"
                className="h-8 md:h-9 w-auto object-contain"
              />
            </div>
            <button
              type="button"
              aria-label="Back to top"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-600 hover:border-[#FDB022] hover:bg-[#FDB022] hover:text-[#171512] transition-colors"
            >
              <ArrowUp size={18} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}