'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Phone, MessageCircle, ArrowRight } from 'lucide-react'

import bgImage from '../assets/banner-images/custom-packaging.jpg'

const contacts = [
  { icon: Phone, label: '800 558 8047', href: 'tel:+18005588047', iconBg: 'bg-black/20' },
  { icon: MessageCircle, label: '800 558 8047', href: 'https://wa.me/18005588047', iconBg: 'bg-[#25D366]' },
]

export function CustomPackagingCTA() {
  return (
    <section className="bg-white">
      <div className="relative min-h-[600px] md:min-h-[700px] flex items-center w-full">
        {/* Background image */}
        <Image
          src={bgImage}
          alt="Custom packaging"
          fill
          className="object-cover"
          sizes="500px"
          priority={false}
        />

        {/* Content */}
        <motion.div
          className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight mb-6">
              Let&apos;s Create Your
              <br />
              Custom Packaging
            </h2>

            <p className="text-black/80 text-lg md:text-xl lg:text-2xl mb-10 max-w-xl">
              Tell us about your packaging requirement, like box style, box size,
              quantity, etc. Get in touch with our product specialist now!
            </p>

            <div className="flex flex-col gap-5 mb-10">
              {contacts.map((contact) => (
                <a
                  key={contact.label}
                  href={contact.href}
                  className="flex items-center gap-4 group w-fit"
                >
                  <span
                    className={`w-14 h-14 rounded-full flex items-center justify-center text-white shrink-0 ${contact.iconBg} transition-transform duration-200 group-hover:scale-105`}
                  >
                    <contact.icon size={24} />
                  </span>
                  <span className="text-xl md:text-2xl font-semibold text-black">
                    {contact.label}
                  </span>
                </a>
              ))}
            </div>

            <Link
              href="#inquiry"
              className="group inline-flex items-center gap-3 bg-black text-white font-semibold text-lg px-8 py-4 rounded-lg hover:bg-black/80 transition-colors"
            >
              Get a Free Quote
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}