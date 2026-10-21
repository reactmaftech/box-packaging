// components/LuxuryFinishingSlider.tsx
'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import Image, { StaticImageData } from 'next/image'
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'

// Import your images here — replace with your actual 12 images
import p1 from '../assets/luxury-finishing/p1.webp'
import p2 from '../assets/luxury-finishing/p2.webp'
import p3 from '../assets/luxury-finishing/p3.webp'
import p4 from '../assets/luxury-finishing/p4.webp'
import p5 from '../assets/luxury-finishing/p5.webp'
import p6 from '../assets/luxury-finishing/p6.webp'
import p7 from '../assets/luxury-finishing/p7.webp'
import p8 from '../assets/luxury-finishing/gl.webp'
import p9 from '../assets/luxury-finishing/p9.webp'
import p10 from '../assets/luxury-finishing/pf10.webp'
import p11 from '../assets/luxury-finishing/p11.webp'
import p12 from '../assets/luxury-finishing/p12.webp'
import p13 from '../assets/luxury-finishing/p13.webp'


interface FinishItem {
  image: StaticImageData
  title: string
}

const finishes: FinishItem[] = [
  { image: p1, title: 'Gold Foil' },
  { image: p2, title: 'Silver Foil' },
  { image: p3, title: 'Holographic Foil' },
  { image: p4, title: 'Rose Gold Foil' },
  { image: p5, title: 'Copper Foil' },
  { image: p6, title: 'Soft Touch' },
  { image: p7, title: 'Matt Lamination' },
  { image: p8, title: 'Gloss Lamination' },
  { image: p9, title: 'Aqueous Coating' },
  { image: p10, title: 'Spot UV' },
  { image: p11, title: 'Embosing' },
  { image: p12, title: 'Debosing' },
  { image: p13, title: 'Varnish' },
]

export function LuxuryFinishingSlider() {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [visibleCount, setVisibleCount] = useState(3)
  const trackRef = useRef<HTMLDivElement>(null)

  // Responsive: 1 card on mobile, 2 on tablet, 3 on desktop
  useEffect(() => {
    const updateVisible = () => {
      if (window.innerWidth < 640) setVisibleCount(1)
      else if (window.innerWidth < 1024) setVisibleCount(2)
      else setVisibleCount(3)
    }
    updateVisible()
    window.addEventListener('resize', updateVisible)
    return () => window.removeEventListener('resize', updateVisible)
  }, [])

  const maxIndex = Math.max(0, finishes.length - visibleCount)

  const next = useCallback(() => {
    setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }, [maxIndex])

  const prev = useCallback(() => {
    setCurrent((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }, [maxIndex])

  // Clamp current when visibleCount changes
  useEffect(() => {
    if (current > maxIndex) setCurrent(maxIndex)
  }, [visibleCount, maxIndex, current])

  // Auto-advance
  useEffect(() => {
    if (isPaused) return
    const id = setInterval(next, 3500)
    return () => clearInterval(id)
  }, [isPaused, next])

  const cardWidthPercent = 100 / visibleCount
  const gap = 24 // px, matches gap-6
  const translate = `calc(-${current * cardWidthPercent}% - ${(current * gap) / visibleCount}px)`

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-white to-[#F5F1E7] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 max-w-3xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 border border-[#FDB022]/40 bg-[#FDB022]/10 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide text-[#B8860B] mb-4">
            <Sparkles size={14} />
            PREMIUM FINISHES
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#171512] leading-tight mb-4">
            Luxury Finishing Options
          </h2>
          <p className="text-lg text-black/55 leading-relaxed">
            Elevate your packaging with stunning premium finishes that enhance appeal and
            sophistication. From gold and silver foils to holographic effects, our high-quality
            finishing options ensure a luxurious, eye-catching presentation that leaves a lasting
            impression.
          </p>
        </motion.div>

        {/* Slider */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Track */}
          <div className="overflow-hidden">
            <div
              ref={trackRef}
              className="flex gap-6 transition-transform duration-500 ease-out"
              style={{ transform: `translateX(${translate})` }}
            >
              {finishes.map((item, index) => (
                <div
                  key={index}
                  className="flex-shrink-0"
                  style={{ width: `calc(${cardWidthPercent}% - ${(gap * (visibleCount - 1)) / visibleCount}px)` }}
                >
                  <div className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100">
                    {/* Image */}
                    <div className="relative aspect-square overflow-hidden bg-[#F5F1E7]">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      {/* Shine sweep */}
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                    </div>

                    {/* Title */}
                    <div className="p-5 text-center">
                      <h3 className="font-bold text-[#171512] text-lg group-hover:text-[#B8860B] transition-colors">
                        {item.title}
                      </h3>
                    </div>

                    {/* Gold accent line */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FDB022] via-[#B8860B] to-[#FDB022] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Arrows */}
          <button
            onClick={prev}
            aria-label="Previous"
            className="absolute top-1/2 -translate-y-1/2 -left-3 md:-left-6 z-10 w-11 h-11 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-[#171512] hover:bg-[#FDB022] hover:border-[#FDB022] transition-all duration-300"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            aria-label="Next"
            className="absolute top-1/2 -translate-y-1/2 -right-3 md:-right-6 z-10 w-11 h-11 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center text-[#171512] hover:bg-[#FDB022] hover:border-[#FDB022] transition-all duration-300"
          >
            <ChevronRight size={20} />
          </button>
        </motion.div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                current === i ? 'w-8 bg-[#FDB022]' : 'w-2 bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}