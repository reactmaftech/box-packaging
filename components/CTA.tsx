'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Phone } from 'lucide-react'

export function CTA() {
  return (
    <section className="py-16 md:py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="relative overflow-hidden rounded-3xl bg-[#171512] px-6 py-16 md:py-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Subtle accent glow */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#FDB022]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#FDB022]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
              Ready to Package Your Success?
            </h2>
            <p className="text-white/65 text-lg mb-9">
              Get a free, no-obligation quote today and see how easy premium
              custom packaging can be.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="#inquiry"
                className="group inline-flex items-center gap-2 bg-[#FDB022] text-[#171512] font-bold px-8 py-3.5 rounded-lg hover:bg-[#f5a80f] transition-colors"
              >
                Get a Free Quote
                <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="tel:+12177276247"
                className="inline-flex items-center gap-2 border-2 border-white/20 text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <Phone size={17} />
                +1 (217) 727-6247
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}