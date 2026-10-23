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
  Clock,
  Instagram,
  Facebook,
} from 'lucide-react'

// Logo import
import logoImage from '../assets/logo/logo.png'

// Payment gateways imports
import visaImage from '../assets/images/visa.png'
import amexImage from '../assets/images/american-express.png'
import paypalImage from '../assets/images/paypal.png'
import cardImage from '../assets/images/card.png'

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

// Payment Methods Array
const PAYMENT_METHODS = [
  { src: visaImage, alt: 'Visa' },
  { src: amexImage, alt: 'American Express' },
  { src: paypalImage, alt: 'PayPal' },
  { src: cardImage, alt: 'Credit Card' },
]

// Social Media Links
const SOCIAL_LINKS = [
  { icon: Instagram, href: 'https://www.instagram.com/slickcustomboxes/', label: 'Instagram' },
  { icon: Facebook, href: 'https://www.facebook.com/slickcustomboxes', label: 'Facebook' },
]

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[15px] font-bold text-[#171512] uppercase tracking-widest mb-5">
      {children}
    </h3>
  )
}

function LinkList({ links }: { links: { label: string; href: string }[] }) {
  return (
    <ul className="space-y-3.5 text-[14px]">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className="text-slate-600 hover:text-[#C27803] hover:font-medium transition-all"
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
      <div className="h-1.5 bg-gradient-to-r from-[#FDB022] to-[#f5a80a]" />

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
        {/* ── Feature strip ─────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {FEATURES.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-5 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#FDB022]/15 text-[#C27803]">
                <Icon size={26} />
              </span>
              <div>
                <p className="text-[14px] font-bold text-[#171512]">{title}</p>
                <p className="text-[13px] text-slate-500 mt-0.5">{text}</p>
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
                className="h-16 md:h-20 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
              />
            </Link>
            <p className="text-slate-600 text-[14px] leading-relaxed max-w-sm mb-6">
              We design and manufacture premium custom packaging from cardboard
              and micro-corrugated board — built around your brand.
            </p>

            {/* Social Media Links */}
            <div className="w-full flex flex-col items-center sm:items-start">
              <p className="text-[13px] font-bold text-[#171512] uppercase tracking-widest mb-3">
                Follow Us
              </p>
              <div className="flex gap-3">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 hover:border-[#FDB022] hover:bg-[#FDB022] hover:text-[#171512] transition-all shadow-sm"
                  >
                    <social.icon size={18} />
                  </a>
                ))}
              </div>
            </div>
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
            <ul className="space-y-3.5 text-[14px] w-full">
              {/* Phone */}
              <li className="flex items-start gap-3 text-left bg-white/60 border border-slate-200 rounded-xl p-3 hover:border-[#FDB022]/50 transition-colors">
                <Phone size={17} className="mt-0.5 shrink-0 text-[#C27803]" />
                <div>
                  <p className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider mb-0.5">Phone</p>
                  <a
                    href={`tel:${PHONE_NUMBER}`}
                    className="text-[#171512] font-semibold hover:text-[#C27803] transition-colors"
                  >
                    {PHONE_DISPLAY}
                  </a>
                </div>
              </li>

              {/* Email */}
              <li className="flex items-start gap-3 text-left bg-white/60 border border-slate-200 rounded-xl p-3 hover:border-[#FDB022]/50 transition-colors">
                <Mail size={17} className="mt-0.5 shrink-0 text-[#C27803]" />
                <div>
                  <p className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider mb-0.5">Email</p>
                  <a
                    href={`mailto:${EMAIL_ADDRESS}`}
                    className="text-[#171512] font-semibold hover:text-[#C27803] transition-colors break-all"
                  >
                    {EMAIL_ADDRESS}
                  </a>
                </div>
              </li>

              {/* Address */}
              <li className="flex items-start gap-3 text-left bg-white/60 border border-slate-200 rounded-xl p-3 hover:border-[#FDB022]/50 transition-colors">
                <MapPin size={17} className="mt-0.5 shrink-0 text-[#C27803]" />
                <div>
                  <p className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider mb-0.5">Address</p>
                  <address className="not-italic text-[#171512] font-semibold leading-tight">
                    {ADDRESS_LINES.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </div>
              </li>

              {/* Working Hours */}
              <li className="flex items-start gap-3 text-left bg-white/60 border border-slate-200 rounded-xl p-3 hover:border-[#FDB022]/50 transition-colors">
                <Clock size={17} className="mt-0.5 shrink-0 text-[#C27803]" />
                <div>
                  <p className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider mb-0.5">Working Hours</p>
                  <div className="text-[#171512] font-semibold text-[13px]">
                    <span className="block">Mon – Fri: 9:00 AM – 6:00 PM</span>
                    <span className="block text-slate-500 font-medium mt-0.5">Sat – Sun: Closed</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ────────────────────────────────────────── */}
        <div className="mt-16 pt-8 border-t border-slate-200 flex flex-col lg:flex-row items-center justify-between gap-6">
          <p className="text-[14px] text-slate-600 text-center lg:text-left">
            © {new Date().getFullYear()} All Rights Reserved by{' '}
            <Link href="/" className="text-[#C27803] font-bold hover:underline">
              {SITE_NAME}
            </Link>
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-[14px]">
            {LEGAL_LINKS.map((link, i) => (
              <span key={link.href} className="flex items-center gap-5">
                <Link
                  href={link.href}
                  className="text-slate-600 hover:text-[#C27803] hover:font-medium transition-all"
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
            {/* Payment Methods Icons */}
            <div className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 flex items-center justify-center gap-3 shadow-sm">
              {PAYMENT_METHODS.map((payment) => (
                <div key={payment.alt} className="relative h-7 w-10 flex items-center justify-center">
                  <Image
                    src={payment.src}
                    alt={payment.alt}
                    className="object-contain max-h-full max-w-full"
                  />
                </div>
              ))}
            </div>
            
            {/* Back to Top Button */}
            <button
              type="button"
              aria-label="Back to top"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-600 hover:border-[#FDB022] hover:bg-[#FDB022] hover:text-[#171512] transition-colors shadow-sm"
            >
              <ArrowUp size={19} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}