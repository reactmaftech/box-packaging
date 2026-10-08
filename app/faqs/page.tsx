'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Phone, Mail, MessageCircle } from 'lucide-react'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { FAQ as FAQSection } from '@/components/FAQ'

const PHONE_NUMBER = '+12177276247'
const PHONE_DISPLAY = '+1 (217) 727-6247'
const EMAIL_ADDRESS = 'info@slickcustomboxes.com'
const SITE_NAME = 'Slick Custom Boxes'

export default function FAQsPage() {
  return (
    <>
      <Header />

      <main className="bg-white">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#171512] to-[#2a2520] pt-24 pb-16 px-6">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FDB022]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FDB022]/5 rounded-full blur-3xl" />

          <div className="max-w-4xl mx-auto relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors mb-6"
              >
                <ArrowLeft size={16} />
                Back to home
              </Link>

              <span className="inline-flex items-center border border-[#FDB022]/30 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide text-[#FDB022] mb-4">
                HELP CENTER
              </span>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Frequently Asked
                <br />
                <span className="text-[#FDB022]">Questions</span>
              </h1>

              <p className="text-lg text-white/70 max-w-2xl mx-auto">
                Everything you need to know about ordering custom packaging from {SITE_NAME}.
                Can&apos;t find what you&apos;re looking for? Our team is one call away.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Quick contact strip */}
        <section className="bg-[#F5F1E7] border-b border-black/[0.06] px-6 py-8">
          <div className="max-w-4xl mx-auto grid sm:grid-cols-3 gap-4">
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="flex items-center gap-3 bg-white rounded-2xl p-4 hover:shadow-md transition-shadow group"
            >
              <span className="w-11 h-11 rounded-xl bg-[#FDB022]/15 flex items-center justify-center text-[#FDB022] shrink-0 group-hover:scale-105 transition-transform">
                <Phone size={18} />
              </span>
              <div className="min-w-0">
                <p className="text-xs text-black/45 font-medium">Call us</p>
                <p className="text-sm font-semibold text-[#171512] truncate">{PHONE_DISPLAY}</p>
              </div>
            </a>

            <a
              href={`mailto:${EMAIL_ADDRESS}`}
              className="flex items-center gap-3 bg-white rounded-2xl p-4 hover:shadow-md transition-shadow group"
            >
              <span className="w-11 h-11 rounded-xl bg-[#FDB022]/15 flex items-center justify-center text-[#FDB022] shrink-0 group-hover:scale-105 transition-transform">
                <Mail size={18} />
              </span>
              <div className="min-w-0">
                <p className="text-xs text-black/45 font-medium">Email us</p>
                <p className="text-sm font-semibold text-[#171512] truncate">{EMAIL_ADDRESS}</p>
              </div>
            </a>

            <Link
              href="/get-a-quote"
              className="flex items-center gap-3 bg-white rounded-2xl p-4 hover:shadow-md transition-shadow group"
            >
              <span className="w-11 h-11 rounded-xl bg-[#FDB022]/15 flex items-center justify-center text-[#FDB022] shrink-0 group-hover:scale-105 transition-transform">
                <MessageCircle size={18} />
              </span>
              <div className="min-w-0">
                <p className="text-xs text-black/45 font-medium">Get a quote</p>
                <p className="text-sm font-semibold text-[#171512] truncate">Response within 24h</p>
              </div>
            </Link>
          </div>
        </section>

        {/* FAQ section — reuses the same component from the homepage */}
        <FAQSection />
      </main>

      <Footer />
    </>
  )
}