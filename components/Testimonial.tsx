'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah Mitchell',
    role: "Founder, Queen's Pantry",
    initials: 'SM',
    rating: 5,
    quote:
      'The team nailed our brand look on the very first proof. Print quality is sharp, the boxes arrive on time every time, and reordering takes minutes.',
  },
  {
    name: 'David Chen',
    role: 'Operations Lead, Bloom & Blossom',
    initials: 'DC',
    rating: 5,
    quote:
      'We switched from a local printer to BoxPack for our rigid gift boxes and never looked back. Pricing is fair, communication is fast, and the finish looks genuinely premium.',
  },
  {
    name: 'Amelia Rodriguez',
    role: 'Founder, Ruminate Candle Co.',
    initials: 'AR',
    rating: 5,
    quote:
      'From sampling to bulk production, the process was smooth from start to finish. Our unboxing experience has become one of our biggest selling points.',
  },
  {
    name: 'James Whitfield',
    role: 'Founder, Whitfield Cosmetics',
    initials: 'JW',
    rating: 5,
    quote:
      'Their design consultation saved us from a costly packaging mistake before we ever went to print. Genuinely felt like an extension of our own team.',
  },
  {
    name: 'Priya Nair',
    role: "Supply Chain Manager, Nature's Touch",
    initials: 'PN',
    rating: 5,
    quote:
      'Bulk order turnaround has been consistently faster than promised, and the eco-friendly kraft options let us hit our sustainability targets without a quality trade-off.',
  },
  {
    name: 'Marcus Lee',
    role: 'Founder, Skin & Beauty Co.',
    initials: 'ML',
    rating: 5,
    quote:
      'Customer support actually picks up the phone. Every question during our first order was answered same-day, which made a huge difference as a first-time bulk buyer.',
  },
]

const stats = [
  { value: '4.9/5', label: 'Average Rating' },
  { value: '500+', label: 'Brands Served' },
  { value: '98%', label: 'Reorder Rate' },
]

export function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const amount = scrollRef.current.clientWidth * 0.85
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    })
  }

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="inline-flex items-center border border-black/15 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide text-[#171512] mb-5">
            TESTIMONIALS
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#171512] leading-tight mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-black/55">
            Real feedback from brands who trust us with their packaging, from
            first sample to full-scale production.
          </p>
        </motion.div>

        {/* Slider */}
        <div className="relative mb-14">
          <button
            onClick={() => scroll('left')}
            aria-label="Previous testimonials"
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-10 w-11 h-11 items-center justify-center rounded-full bg-white border border-black/10 shadow-md hover:bg-[#171512] hover:text-white hover:border-[#171512] transition-colors"
          >
            <ChevronLeft size={20} />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 no-scrollbar"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="shrink-0 w-[320px] md:w-[380px] snap-start"
              >
                <div className="bg-[#F5F1E7] rounded-2xl p-8 h-full flex flex-col">
                  <Quote size={28} className="text-[#171512]/20 mb-4" strokeWidth={1.5} />

                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} size={15} className="fill-[#171512] text-[#171512]" />
                    ))}
                  </div>

                  <p className="text-[#171512]/80 leading-relaxed mb-8">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>

                  <div className="flex items-center gap-3 mt-auto">
                    <div className="w-11 h-11 rounded-full bg-[#171512] text-white flex items-center justify-center font-semibold text-sm shrink-0">
                      {testimonial.initials}
                    </div>
                    <div>
                      <div className="font-semibold text-[#171512]">{testimonial.name}</div>
                      <div className="text-sm text-black/50">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <button
            onClick={() => scroll('right')}
            aria-label="Next testimonials"
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-10 w-11 h-11 items-center justify-center rounded-full bg-white border border-black/10 shadow-md hover:bg-[#171512] hover:text-white hover:border-[#171512] transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Stats strip */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-x-16 gap-y-6 border-t border-black/10 pt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-[#171512] mb-1">{stat.value}</div>
              <div className="text-sm text-black/50">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  )
}