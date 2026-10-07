'use client'

import Link from 'next/link'
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Linkedin, ArrowRight } from 'lucide-react'

const PHONE_NUMBER = '+12177276247'
const PHONE_DISPLAY = '+1 (217) 727-6247'
const EMAIL_ADDRESS = 'info@slickcustomboxes.com'
const SITE_NAME = 'Slick Custom Boxes'

const footerColumns = [
  {
    title: 'Products',
    links: ['Rigid Boxes', 'Kraft Boxes', 'Corrugated Boxes', 'Mylar Bags', 'Custom Boxes'],
  },
  {
    title: 'Industries',
    links: ['Electronics', 'Cosmetics & Beauty', 'Food & Beverage', 'Pharmaceuticals', 'E-commerce'],
  },
  {
    title: 'Company',
    links: ['About Us', 'Case Studies', 'Sustainability', 'Careers', 'Contact'],
  },
]

const socials = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
]

export function Footer() {
  return (
    <footer className="bg-[#171512] text-white">
      <div className="h-1 bg-[#FDB022]" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-[1.3fr_1fr_1fr_1fr] gap-10 mb-14">
          {/* Brand column */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4 w-fit">
              <div className="w-9 h-9 bg-[#FDB022] rounded-lg flex items-center justify-center text-lg">
                📦
              </div>
              <span className="font-bold text-xl text-white tracking-tight">
                Slick<span className="text-[#FDB022]">CustomBoxes</span>
              </span>
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
                <Phone size={15} />
                {PHONE_DISPLAY}
              </a>
              <a
                href={`mailto:${EMAIL_ADDRESS}`}
                className="flex items-center gap-2.5 text-white/70 hover:text-[#FDB022] transition-colors"
              >
                <Mail size={15} />
                {EMAIL_ADDRESS}
              </a>
              <div className="flex items-start gap-2.5 text-white/70">
                <MapPin size={15} className="mt-0.5 shrink-0" />
                <span>123 Packaging Way, Los Angeles, CA 90001</span>
              </div>
            </div>
          </div>

          {/* Link columns */}
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h4 className="font-semibold text-white mb-4">{column.title}</h4>
              <ul className="flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm text-white/55 hover:text-[#FDB022] transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 py-8 border-t border-white/10">
          <div>
            <h4 className="font-semibold text-white mb-1">Stay in the loop</h4>
            <p className="text-sm text-white/55">
              Packaging tips, new finishes, and offers — straight to your inbox.
            </p>
          </div>
          <form className="flex w-full md:w-auto gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 md:w-64 bg-white/10 border border-white/15 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#FDB022] transition-colors"
            />
            <button
              type="submit"
              className="group shrink-0 flex items-center gap-1.5 bg-[#FDB022] text-[#171512] font-semibold px-5 py-2.5 rounded-lg hover:bg-[#f5a80f] transition-colors text-sm"
            >
              Subscribe
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10">
          <p className="text-sm text-white/40">
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            <Link href="#" className="text-sm text-white/40 hover:text-[#FDB022] transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-white/40 hover:text-[#FDB022] transition-colors">
              Terms of Service
            </Link>
            <div className="flex items-center gap-3 ml-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-[#FDB022] hover:text-[#171512] transition-colors"
                >
                  <social.icon size={15} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}