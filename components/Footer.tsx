'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail } from 'lucide-react'

// Logo import
import logoImage from '../assets/logo/footer-logo.png'

const PHONE_NUMBER = '+12177276247'
const PHONE_DISPLAY = '+1 (217) 727-6247'
const EMAIL_ADDRESS = 'info@slickcustomboxes.com'
const SITE_NAME = 'Slick Custom Boxes'

export function Footer() {
  return (
    <footer className="bg-[#171512] text-white">
      <div className="h-1 bg-[#FDB022]" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Brand + contact */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
          <Link href="/" className="flex items-center mb-6 group">
            <Image
              src={logoImage}
              alt={SITE_NAME}
              className="h-14 md:h-20 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
            />
          </Link>

          <p className="text-white/55 text-sm leading-relaxed mb-6 max-w-md">
            We design and manufacture premium custom packaging from cardboard
            and micro-corrugated board — built around your brand.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm">
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
          </div>
        </div>

        {/* Bottom bar — copyright only */}
        <div className="pt-8 mt-12 border-t border-white/10 text-center">
          <p className="text-sm text-white/40">
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}