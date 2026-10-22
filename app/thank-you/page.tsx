// app/thank-you/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { CheckCircle, Home, Phone, Mail, ArrowRight } from 'lucide-react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

const REDIRECT_SECONDS = 4

export default function ThankYouPage() {
  const router = useRouter()
  const [secondsLeft, setSecondsLeft] = useState(REDIRECT_SECONDS)

  // Countdown + auto-redirect after 4 seconds
  useEffect(() => {
    // If the user hits back to this page from home, `pageshow` fires with
    // persisted=true — reset the countdown so they get a full 4s again.
    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) setSecondsLeft(REDIRECT_SECONDS)
    }
    window.addEventListener('pageshow', onPageShow)

    const interval = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0))
    }, 1000)

    const redirect = setTimeout(() => {
      router.replace('/')
    }, REDIRECT_SECONDS * 1000)

    return () => {
      clearInterval(interval)
      clearTimeout(redirect)
      window.removeEventListener('pageshow', onPageShow)
    }
  }, [router])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-[#171512] to-[#2a2520] text-white pt-32 pb-20 md:pt-40 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, #FDB022 1px, transparent 1px), radial-gradient(circle at 75% 75%, #FDB022 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
            }}
          />
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FDB022]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FDB022]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-[#FDB022]/15 border border-[#FDB022]/30 mb-7"
          >
            <CheckCircle size={52} className="text-[#FDB022]" strokeWidth={1.5} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 leading-tight"
          >
            Thank You for Reaching Out!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed"
          >
            We&apos;ve received your inquiry and our team will get back to you within
            <span className="text-[#FDB022] font-semibold"> 24 hours</span>. Keep an eye on your inbox
            and phone — we can&apos;t wait to work with you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm px-5 py-2.5 text-sm text-white/70"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FDB022] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FDB022]" />
            </span>
            Redirecting to home in <span className="font-bold text-[#FDB022]">{secondsLeft}</span>
            {secondsLeft === 1 ? ' second' : ' seconds'}…
          </motion.div>
        </div>
      </section>

      {/* ── Body ───────────────────────────────────────────────── */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto space-y-6">

          {/* What happens next */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8"
          >
            <h2 className="text-xl md:text-2xl font-bold text-[#171512] mb-5">
              What happens next?
            </h2>
            <ol className="space-y-4">
              {[
                {
                  title: 'We review your request',
                  desc: 'Our packaging specialists read every detail you shared with us.',
                },
                {
                  title: 'We prepare your quote',
                  desc: 'You\u2019ll receive a detailed quote with options tailored to your needs.',
                },
                {
                  title: 'We reach out within 24 hours',
                  desc: 'Expect a call or email from our team to confirm everything and answer questions.',
                },
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#FDB022]/15 text-[#c98b0c] font-bold text-sm shrink-0">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-[#171512]">{step.title}</p>
                    <p className="text-sm text-gray-600 mt-0.5">{step.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </motion.div>

          {/* Contact shortcuts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8"
          >
            <h2 className="text-xl md:text-2xl font-bold text-[#171512] mb-2">
              Need to talk right away?
            </h2>
            <p className="text-sm text-gray-600 mb-5">
              Reach us directly — we&apos;re happy to help.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              <a
                href="tel:+12177276247"
                className="group flex items-center gap-3 p-4 rounded-xl border border-gray-200 bg-white hover:border-[#FDB022] hover:shadow-sm transition-all"
              >
                <span className="w-10 h-10 rounded-lg bg-[#FDB022]/12 flex items-center justify-center shrink-0">
                  <Phone size={16} className="text-[#c98b0c]" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs text-gray-500">Call us</p>
                  <p className="text-sm font-semibold text-[#171512] group-hover:text-[#c98b0c] transition-colors">
                    +1 (217) 727-6247
                  </p>
                </div>
              </a>
              <a
                href="mailto:info@slickcustomboxes.com"
                className="group flex items-center gap-3 p-4 rounded-xl border border-gray-200 bg-white hover:border-[#FDB022] hover:shadow-sm transition-all"
              >
                <span className="w-10 h-10 rounded-lg bg-[#FDB022]/12 flex items-center justify-center shrink-0">
                  <Mail size={16} className="text-[#c98b0c]" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs text-gray-500">Email us</p>
                  <p className="text-sm font-semibold text-[#171512] group-hover:text-[#c98b0c] transition-colors truncate">
                    info@slickcustomboxes.com
                  </p>
                </div>
              </a>
            </div>
          </motion.div>

          {/* CTA back home */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-center py-12 px-6 bg-gradient-to-br from-[#171512] to-[#2a2520] rounded-3xl text-white"
          >
            <h3 className="text-2xl font-bold mb-3">Continue exploring</h3>
            <p className="text-white/60 mb-7 max-w-md mx-auto text-sm">
              Browse our packaging categories while you wait for our team to reach out.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-[#FDB022] text-[#171512] font-bold rounded-xl hover:bg-[#f5a80f] transition-all shadow-lg shadow-[#FDB022]/25"
              >
                <Home size={18} />
                Go to Home
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 px-7 py-3 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/5 transition-all"
              >
                Browse Products
                <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>

        </div>
      </section>

      <Footer />
    </div>
  )
}