// components/CustomPackagingCTA.tsx
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Phone, MessageCircle, ArrowRight } from 'lucide-react'

const PHONE = '+1 (217) 727-6247'
const PHONE_HREF = 'tel:+12177276247'
// If WhatsApp is ever enabled, use the SAME number as the main line.
const WHATSAPP_HREF = 'https://wa.me/12177276247'

export function CustomPackagingCTA() {
  return (
    <section className="bg-white px-6 py-10 md:py-12">
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="rounded-2xl bg-[#F5F1E7] border border-black/[0.06] px-6 py-6 md:px-10 md:py-7 flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
          <div className="flex-1 min-w-0">
            <h2 className="text-xl md:text-2xl font-bold text-[#171512] leading-snug">
              Looking for other custom boxes and packaging?
            </h2>
            <p className="text-sm text-black/55 mt-1.5 max-w-xl">
              Talk to a packaging specialist for a free consultation and a written quote within 24 hours.
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <a
              href={PHONE_HREF}
              className="hidden sm:flex items-center gap-2 text-sm font-semibold text-[#171512] hover:text-black transition-colors"
            >
              <Phone size={16} className="text-[#c98b0c]" />
              {PHONE}
            </a>

            {/* WhatsApp icon is disabled. If you re-enable it, WHATSAPP_HREF uses the correct 217 number above. */}

            <Link
              href="#inquiry"
              className="group inline-flex items-center gap-2 bg-[#FDB022] text-[#171512] font-semibold text-sm px-6 py-3 rounded-xl hover:bg-[#f5a80f] transition-colors whitespace-nowrap"
            >
              Get a free quote
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  )
}