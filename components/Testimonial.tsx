'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah Mitchell',
    role: 'Founder, Queen&apos;s Pantry',
    initials: 'SM',
    rating: 5,
    quote:
      'Honestly I was nervous switching printers, we&apos;d been burned before. The team sent us a physical sample before we committed and it matched the proof exactly. Third reorder this year.',
  },
  {
    name: 'David Chen',
    role: 'Operations, Bloom & Blossom',
    initials: 'DC',
    rating: 4,
    quote:
      'Pricing came in about 20% lower than our old supplier for the same rigid boxes. Lead time took a few days longer than quoted on the first run, but they were upfront about it and made it right.',
  },
  {
    name: 'Amelia Rodriguez',
    role: 'Owner, Ruminate Candle Co.',
    initials: 'AR',
    rating: 5,
    quote:
      'The unboxing is the whole reason our subscription grew the way it did. Customers literally post videos of opening our boxes now. Worth every penny.',
  },
  {
    name: 'James Whitfield',
    role: 'Founder, Whitfield Cosmetics',
    initials: 'JW',
    rating: 5,
    quote:
      'Their designer caught a bleed issue on our artwork before we went to print and fixed it in about an hour. That alone saved us a full reprint. Really solid team.',
  },
  {
    name: 'Priya Nair',
    role: 'Supply Chain, Nature&apos;s Touch',
    initials: 'PN',
    rating: 5,
    quote:
      'We needed recyclable kraft boxes for a Q3 launch with a tight window. They hit the deadline, the material held up fine in transit, and our sustainability report stayed on track.',
  },
  {
    name: 'Marcus Lee',
    role: 'Founder, Skin & Beauty Co.',
    initials: 'ML',
    rating: 4,
    quote:
      'First bulk order here. There was a small mix-up on the insert size, but support answered on a Saturday and had replacements shipping Monday. Would order again.',
  },
  {
    name: 'Hannah Brooks',
    role: 'Creative Director, Wild Root Tea',
    initials: 'HB',
    rating: 5,
    quote:
      'We&apos;ve worked with three packaging vendors in five years. This is the first one where I don&apos;t have to chase anyone for updates. They just handle it.',
  },
  {
    name: 'Tom Okafor',
    role: 'Co-founder, Ember Coffee Roasters',
    initials: 'TO',
    rating: 5,
    quote:
      'The spot UV finish on our bags looks way more expensive than what we paid. Customers keep asking who makes our packaging, which is honestly the best compliment.',
  },
]

// Remove stats section entirely — kept as empty array to avoid breaking anything
const stats: { value: string; label: string }[] = []

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
            Feedback from real brands we&apos;ve worked with — the good and the
            small hiccups we&apos;ve helped fix along the way.
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
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={15}
                        className={
                          i < testimonial.rating
                            ? 'fill-[#171512] text-[#171512]'
                            : 'fill-transparent text-[#171512]/25'
                        }
                      />
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
                      <div
                        className="font-semibold text-[#171512]"
                        dangerouslySetInnerHTML={{ __html: testimonial.name }}
                      />
                      <div
                        className="text-sm text-black/50"
                        dangerouslySetInnerHTML={{ __html: testimonial.role }}
                      />
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

        {/* Stats strip — only renders if stats array has items */}
        {stats.length > 0 && (
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
        )}
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