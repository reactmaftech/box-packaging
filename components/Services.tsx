'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Palette, Tag, ShieldCheck, Rocket } from 'lucide-react'

// Same six services from the old section, consolidated into four highlight cards
// so the layout can match the bento-style reference without losing any content.
const highlights = [
  {
    icon: Palette,
    title: 'Custom Design',
    description:
      'Our expert designers create stunning custom designs that match your brand identity perfectly.',
    size: 'small',
  },
  {
    icon: Tag,
    title: 'Competitive Pricing',
    description:
      'Best wholesale rates with bulk discounts and flexible payment options.',
    size: 'small',
  },
  {
    icon: ShieldCheck,
    title: 'Premium Materials & Quality Assurance',
    description:
      'High-quality, eco-friendly materials on every order, with each box inspected before shipment to ensure perfection.',
    size: 'wide',
  },
  {
    icon: Rocket,
    title: 'Fast, Worldwide Delivery',
    description:
      'Quick turnaround times with rush orders available, backed by reliable global logistics and tracking — wherever your business ships.',
    size: 'dark',
  },
]

export function Services() {
  const [card1, card2, wideCard, darkCard] = highlights

  return (
    <section id="services" className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="inline-flex items-center border border-[#fdb022]/30 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide text-[#fdb022] mb-5">
            WHY CHOOSE US
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#171512] leading-tight mb-4 max-w-2xl">
            Why BoxPack is The Right Choice for You
          </h2>
          <p className="text-lg text-black/55 max-w-2xl mb-14">
            We deliver premium packaging solutions backed by years of industry expertise.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-3 md:grid-rows-2 gap-5">
          {/* Small card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
            className="md:col-start-1 md:row-start-1 bg-[#F5F1E7] rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="w-12 h-12 rounded-full border border-[#fdb022]/30 flex items-center justify-center text-[#fdb022] mb-6">
              <card1.icon size={20} strokeWidth={1.75} />
            </div>
            <h3 className="text-xl font-bold text-[#171512] mb-3">{card1.title}</h3>
            <p className="text-black/55 leading-relaxed">{card1.description}</p>
          </motion.div>

          {/* Small card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
            className="md:col-start-2 md:row-start-1 bg-[#F5F1E7] rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="w-12 h-12 rounded-full border border-[#fdb022]/30 flex items-center justify-center text-[#fdb022] mb-6">
              <card2.icon size={20} strokeWidth={1.75} />
            </div>
            <h3 className="text-xl font-bold text-[#171512] mb-3">{card2.title}</h3>
            <p className="text-black/55 leading-relaxed">{card2.description}</p>
          </motion.div>

          {/* Wide card, bottom-left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
            className="md:col-start-1 md:col-span-2 md:row-start-2 bg-[#F5F1E7] rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="w-12 h-12 rounded-full border border-[#fdb022]/30 flex items-center justify-center text-[#fdb022] mb-6">
              <wideCard.icon size={20} strokeWidth={1.75} />
            </div>
            <h3 className="text-xl font-bold text-[#171512] mb-3">{wideCard.title}</h3>
            <p className="text-black/55 leading-relaxed max-w-2xl">{wideCard.description}</p>
          </motion.div>

          {/* Dark accent card with #fdb022 accent, right, full height */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
            className="md:col-start-3 md:row-start-1 md:row-span-2 relative overflow-hidden bg-[#171512] rounded-2xl p-8 flex flex-col hover:shadow-xl transition-shadow duration-300"
          >
            {/* Accent gradient */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#fdb022]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            
            <div className="w-12 h-12 rounded-full border border-[#fdb022]/30 flex items-center justify-center text-[#fdb022] mb-6 relative z-10">
              <darkCard.icon size={20} strokeWidth={1.75} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4 relative z-10">{darkCard.title}</h3>
            <p className="text-white/65 leading-relaxed mb-8 relative z-10">{darkCard.description}</p>

            <a
              href="#inquiry"
              className="group mt-auto inline-flex items-center gap-2 w-fit bg-[#fdb022] text-[#171512] font-semibold px-6 py-3 rounded-lg hover:bg-[#f5a80a] transition-colors relative z-10"
            >
              Get a Free Quote
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}