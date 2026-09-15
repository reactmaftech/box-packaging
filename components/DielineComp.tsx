'use client'

import { motion } from 'framer-motion'
import Image from 'next/image' // 1. Import Next.js Image component
import imageSrc from "../assets/images/dieline.jpg"

export function DielineComp() {
  return (
    <section className="py-16 px-6 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Section Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-black leading-tight mb-4">
            Complimentary Packaging Support
          </h2>
          <p className="text-black/60 leading-relaxed text-[15px] md:text-base">
            To ensure a seamless experience, we offer professional structural and graphic design assistance with every order. You get everything you need to bring your packaging vision to life, all in one place.
          </p>
        </motion.div>

        {/* Single Row Image Container */}
        <motion.div
          className="w-full max-w-4xl rounded-3xl overflow-hidden shadow-sm border border-black/[0.05] mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          {/* 2. Use Next.js Image component instead of <img> */}
          <Image 
            src={imageSrc} 
            alt="Dieline template and finished packaging design example" 
            className="w-full h-auto object-cover"
            // If the image is very large, you might want to add sizes, e.g.:
            // sizes="(max-width: 1024px) 100vw, 1024px"
            priority // Optional: add this if the image is above the fold
          />
        </motion.div>

        {/* Text Content Below Image */}
        <motion.div 
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl md:text-2xl font-bold text-[#171512] mb-3">
            Structural Dielines &amp; Professional Graphic Design
          </h3>
          <p className="text-black/55 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            Receive a precise, production-ready dieline template immediately after placing your order. Furthermore, our expert designers will create a custom, print-ready packaging design from scratch completely free of charge.
          </p>
        </motion.div>

      </div>
    </section>
  )
}