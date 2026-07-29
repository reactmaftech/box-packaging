'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

import boxImage1 from '../assets/images/01.webp'
import boxImage2 from '../assets/images/02.webp'
import boxImage3 from '../assets/images/03.webp'
import boxImage4 from '../assets/images/04.webp'
import boxImage5 from '../assets/images/05.webp'
import boxImage6 from '../assets/images/06.webp'

const finishes = [
  { name: 'Holographic Foiling', image: boxImage1 },
  { name: 'Gold Foiling', image: boxImage2 },
  { name: 'Embossing', image: boxImage3 },
  { name: 'Silver Foiling', image: boxImage4 },
  { name: 'Spot UV', image: boxImage5 },
  { name: 'Debossing', image: boxImage6 },
]

export function PremiumFinishes() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="inline-flex items-center border border-black/15 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide text-[#171512] mb-5">
            PREMIUM FINISHES
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#171512] leading-tight mb-4">
            Finishing Options That Make Boxes Unforgettable
          </h2>
          <p className="text-lg text-black/55">
            A variety of finishing options to ensure spectacular looks and a
            premium feel for your custom boxes.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-5 md:gap-6">
          {finishes.map((finish, index) => (
            <motion.div
              key={finish.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              className="relative overflow-hidden rounded-2xl group aspect-[4/3]"
            >
              <Image
                src={finish.image}
                alt={finish.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 p-5">
                <span className="inline-flex items-center bg-[#FDB022] text-[#171512] text-xs font-bold uppercase tracking-wide px-3 py-1.5 rounded-full">
                  {finish.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}