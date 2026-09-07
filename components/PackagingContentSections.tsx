// components/PackagingContentSections.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check, Package, ArrowRight } from 'lucide-react'

/* ------------------------------------------------------------------ */
/* Content                                                             */
/*                                                                     */
/* Everything the page says lives in this array. Edit the copy and the */
/* image paths here — the layout below never needs to change.          */
/*                                                                     */
/* Images: drop your files in /public/images/ and reference them as    */
/* "/images/your-file.jpg". Any tile left blank renders a branded      */
/* placeholder, so the section works before the photos are ready.      */
/* ------------------------------------------------------------------ */

interface Section {
  id: string
  eyebrow: string
  heading: string
  intro: string
  bullets: string[]
  closing: string
  cta?: { label: string; href: string }
  panel: { title: string; blurb: string }
  caption: string
  hero: string
  thumbs: string[]
}

const SECTIONS: Section[] = [
  {
    id: 'custom-boxes',
    eyebrow: 'Trusted by US brands',
    heading: 'Our custom boxes and packaging solutions',
    intro:
      'Join hundreds of US-based brands that trust us for their packaging. From startups shipping their first hundred orders to national retailers, we build custom printed boxes that carry your branding and survive the trip to your customer.',
    bullets: [
      'Fully customizable sizes, styles and structures',
      'High-quality full-colour offset and digital printing',
      'Eco-friendly and recyclable kraft and corrugated stock',
      'Low minimum order quantities, starting at 100 units',
    ],
    closing:
      'We believe great packaging is more than a box — it is the first thing your customer touches. Whether you are launching a new product or refreshing an existing line, our team turns your artwork into a finished custom box with free dielines, fast turnaround and no die charges.',
    cta: { label: 'Browse all packaging categories', href: '/products' },
    panel: {
      title: 'Custom crafted',
      blurb: 'Innovative, high-quality custom boxes designed to keep your brand fresh.',
    },
    caption:
      'From bold designs to durable materials, our custom boxes are made to protect your products, impress your customers and support your business at every step.',
    hero: '',
    thumbs: ['', '', ''],
  },
  {
    id: 'box-styles',
    eyebrow: 'Every style, every industry',
    heading: 'Custom printed boxes built for your product',
    intro:
      'Rigid boxes for cosmetics, corrugated shippers for e-commerce, mylar bags for food, gable boxes for retail gifting — the right structure depends on what goes inside it. Tell us your product and our specialists will recommend the box style, board weight and finish that fits.',
    bullets: [
      'Rigid, kraft, corrugated, mailer, gable and pillow boxes',
      'Matte, gloss, soft-touch lamination and spot UV finishes',
      'Foil stamping, embossing and window cut-outs',
      'Custom inserts and dividers to hold fragile products in place',
    ],
    closing:
      'Every order includes a free dieline and a 3D mockup for approval, so you see exactly how your custom packaging will look and fold before anything goes to press. Nothing is printed until you have signed off.',
    cta: { label: 'See box styles and materials', href: '/products' },
    panel: {
      title: 'Built to fit',
      blurb: 'Structures engineered around your product, not the other way round.',
    },
    caption:
      'Choose from dozens of box styles, or send us your dimensions and we will engineer a custom structure from scratch at no extra cost.',
    hero: '',
    thumbs: ['', '', ''],
  },
  {
    id: 'wholesale-packaging',
    eyebrow: 'Wholesale pricing',
    heading: 'Wholesale packaging with low minimums and fast turnaround',
    intro:
      'Custom packaging should not require a warehouse-sized order to make sense. Our wholesale pricing starts at 100 units and scales down per unit as your volume grows, so you can test a design without committing to stock you cannot store.',
    bullets: [
      'Free shipping across the continental United States',
      'Standard production in 8 to 10 business days',
      'Rush production available on most stocks',
      'Free design support and unlimited artwork revisions',
    ],
    closing:
      'Send us your box style, size and quantity and you will have a written quote within 24 hours. No setup fees, no plate charges and no surprises on the final invoice.',
    cta: { label: 'Request your free quote', href: '#inquiry' },
    panel: {
      title: 'Order with ease',
      blurb: 'Quote in 24 hours, print in days, delivered free to your door.',
    },
    caption:
      'From concept to doorstep, we handle artwork, production and delivery so you can get back to running your business.',
    hero: '',
    thumbs: ['', '', ''],
  },
]

/* ------------------------------------------------------------------ */
/* Image tile with a branded fallback                                  */
/* ------------------------------------------------------------------ */

function MediaTile({
  src,
  alt,
  className = '',
}: {
  src: string
  alt: string
  className?: string
}) {
  const [failed, setFailed] = useState(false)
  const showImage = Boolean(src) && !failed

  return (
    <div className={`relative overflow-hidden bg-[#F5F1E7] ${className}`}>
      {showImage ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="w-full h-full object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#F5F1E7] to-[#EDE5D8]">
          <Package size={28} className="text-[#D4C5A9]" />
        </div>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* One section                                                         */
/* ------------------------------------------------------------------ */

function ContentSection({ section, flip }: { section: Section; flip: boolean }) {
  return (
    <motion.div
      id={section.id}
      className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
    >
      {/* ---- Image mosaic ---- */}
      <div className={flip ? 'lg:order-2' : ''}>
        <div className="grid grid-cols-2 gap-3">
          {/* Caption panel */}
          <div className="bg-[#F5F1E7] rounded-2xl p-5 md:p-6 flex flex-col justify-center min-h-[180px] md:min-h-[220px]">
            <h3 className="text-xl md:text-2xl font-bold text-[#171512] leading-tight">
              {section.panel.title}
            </h3>
            <p className="text-sm text-black/55 mt-2.5 leading-relaxed">{section.panel.blurb}</p>
          </div>

          {/* Hero image */}
          <MediaTile
            src={section.hero}
            alt={section.heading}
            className="rounded-2xl min-h-[180px] md:min-h-[220px]"
          />

          {/* Thumbnails */}
          {section.thumbs.slice(0, 3).map((thumb, i) => (
            <MediaTile
              key={i}
              src={thumb}
              alt={`${section.panel.title} example ${i + 1}`}
              className={`rounded-2xl h-28 md:h-36 ${i === 0 ? 'col-span-2 sm:col-span-1' : ''}`}
            />
          ))}

          {/* Footer caption */}
          <p className="col-span-2 text-xs md:text-sm text-black/50 leading-relaxed bg-white border border-black/[0.06] rounded-2xl px-5 py-4">
            {section.caption}
          </p>
        </div>
      </div>

      {/* ---- Copy ---- */}
      <div className={flip ? 'lg:order-1' : ''}>
        <span className="inline-flex items-center border border-[#FDB022]/40 rounded-full px-4 py-1.5 text-xs font-semibold text-[#c98b0c] mb-5">
          {section.eyebrow}
        </span>

        <h2 className="text-3xl md:text-4xl font-bold text-[#171512] leading-tight mb-5">
          {section.heading}
        </h2>

        <p className="text-black/60 leading-relaxed max-w-[62ch]">{section.intro}</p>

        <ul className="space-y-3 my-7">
          {section.bullets.map(bullet => (
            <li key={bullet} className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-[#FDB022] flex items-center justify-center shrink-0 mt-0.5">
                <Check size={12} className="text-[#171512]" strokeWidth={3} />
              </span>
              <span className="text-[#171512] text-[0.95rem] leading-relaxed">{bullet}</span>
            </li>
          ))}
        </ul>

        <p className="text-black/60 leading-relaxed max-w-[62ch]">{section.closing}</p>

        {section.cta && (
          <Link
            href={section.cta.href}
            className="group inline-flex items-center gap-2 mt-7 text-sm font-semibold text-[#171512] border-b-2 border-[#FDB022] pb-1 hover:gap-3 transition-all"
          >
            {section.cta.label}
            <ArrowRight size={16} className="text-[#c98b0c]" />
          </Link>
        )}
      </div>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/* Export                                                              */
/* ------------------------------------------------------------------ */

export function PackagingContentSections() {
  return (
    <section className="bg-white px-6 py-16 md:py-20">
      <div className="max-w-7xl mx-auto space-y-20 md:space-y-28">
        {SECTIONS.map((section, index) => (
          <ContentSection key={section.id} section={section} flip={index % 2 === 1} />
        ))}
      </div>
    </section>
  )
}