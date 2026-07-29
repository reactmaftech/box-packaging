// components/ServiceHero.tsx
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

interface ServiceHeroProps {
  tag: string
  title: string
  subtitle: string
  description: string
  ctaText?: string
  ctaLink?: string
  secondaryCtaText?: string
  secondaryCtaLink?: string
  icon?: React.ReactNode
  backLink?: string
  backLinkText?: string
}

export function ServiceHero({
  tag,
  title,
  subtitle,
  description,
  ctaText = 'Get Started',
  ctaLink = '#inquiry',
  secondaryCtaText = 'Learn More',
  secondaryCtaLink = '#process',
  icon,
  backLink = '/services',
  backLinkText = 'Back to Services',
}: ServiceHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#171512] to-[#2a2520] pt-32 pb-20 px-6">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FDB022]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FDB022]/5 rounded-full blur-3xl" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Back link */}
          <Link
            href={backLink}
            className="inline-flex items-center gap-2 text-[#FDB022] hover:text-[#f5a80f] transition-colors mb-6"
          >
            <ArrowRight size={16} className="rotate-180" />
            {backLinkText}
          </Link>
          <br/>

          {/* Tag */}
          <span className="inline-flex items-center border border-[#FDB022]/30 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide text-[#FDB022] mb-4">
            {tag}
          </span>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            {title}
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-white/70 mb-6 max-w-2xl mx-auto">
            {subtitle}
          </p>

          {/* Description */}
          <p className="text-white/60 leading-relaxed max-w-2xl mx-auto mb-10">
            {description}
          </p>

    

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={ctaLink}
              className="inline-flex items-center gap-2 bg-[#FDB022] text-[#171512] font-semibold px-8 py-4 rounded-xl hover:bg-[#f5a80f] transition-colors shadow-lg shadow-[#FDB022]/25"
            >
              {ctaText}
              <ArrowRight size={18} />
            </Link>
            <Link
              href={secondaryCtaLink}
              className="inline-flex items-center gap-2 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-colors"
            >
              {secondaryCtaText}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}