'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Phone,
  Mail,
  Clock,
  Shield,
  Award,
  Truck,
} from 'lucide-react'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { InquiryForm } from '@/components/InquiryForm'

// Contact details
const PHONE_NUMBER = '+12177276247'
const PHONE_DISPLAY = '+1 (217) 727-6247'
const EMAIL_ADDRESS = 'info@slickcustomboxes.com'
const SITE_NAME = 'Slick Custom Boxes'

// Features section data
const features = [
  {
    icon: Clock,
    title: 'Fast Response',
    description: 'Get a quote within 24 hours of submission',
  },
  {
    icon: Shield,
    title: 'Quality Guaranteed',
    description: 'Premium materials and expert craftsmanship',
  },
  {
    icon: Award,
    title: 'Competitive Pricing',
    description: 'Best rates with bulk discounts available',
  },
  {
    icon: Truck,
    title: 'Worldwide Delivery',
    description: 'Reliable shipping to over 50 countries',
  },
]

export default function GetQuotePage() {
  return (
    <>
      <Header />
      <div className="bg-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#171512] to-[#2a2520] pt-32 pb-20 px-6">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FDB022]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FDB022]/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FDB022]/3 rounded-full blur-3xl" />

          <div className="max-w-5xl mx-auto relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center border border-[#FDB022]/30 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide text-[#FDB022] mb-4">
                GET A QUOTE
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
                Get Your Custom
                <br />
                <span className="text-[#FDB022]">Packaging Quote</span>
              </h1>
              <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
                Tell us about your packaging requirements and we&apos;ll provide you
                with a tailored quote within 24 hours. From design to delivery,
                we&apos;ve got you covered.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="#inquiry-form"
                  className="inline-flex items-center gap-2 bg-[#FDB022] text-[#171512] font-semibold px-8 py-4 rounded-xl hover:bg-[#f5a80f] transition-colors shadow-lg shadow-[#FDB022]/25"
                >
                  Start Your Quote
                  <ArrowRight size={18} />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center max-w-2xl mx-auto mb-14"
            >
              <span className="inline-flex items-center border border-[#FDB022]/30 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide text-[#FDB022] mb-4">
                WHY CHOOSE US
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-[#171512] leading-tight mb-4">
                Why Request a Quote
                <br />
                <span className="text-[#FDB022]">With {SITE_NAME}?</span>
              </h2>
              <p className="text-lg text-black/55">
                We make getting a quote simple, fast, and transparent. Here&apos;s why
                brands trust us for their packaging needs.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-[#F5F1E7] rounded-2xl p-8 text-center hover:shadow-lg transition-shadow duration-300 group"
                >
                  <div className="w-16 h-16 rounded-full bg-[#FDB022]/10 flex items-center justify-center text-[#FDB022] mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon size={28} />
                  </div>
                  <h3 className="text-lg font-bold text-[#171512] mb-2">{feature.title}</h3>
                  <p className="text-black/55 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 px-6 bg-[#F5F1E7]">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center max-w-2xl mx-auto mb-14"
            >
              <span className="inline-flex items-center border border-[#FDB022]/30 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide text-[#FDB022] mb-4">
                HOW IT WORKS
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-[#171512] leading-tight mb-4">
                Simple <span className="text-[#FDB022]">4-Step Process</span>
              </h2>
              <p className="text-lg text-black/55">
                Getting a quote is quick and easy. Follow these simple steps and
                we&apos;ll take care of the rest.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-6 relative">
              {[
                {
                  step: '01',
                  title: 'Fill Out Form',
                  description: 'Complete our quick inquiry form with your requirements.',
                },
                {
                  step: '02',
                  title: 'Review & Confirm',
                  description: 'We\'ll review your request and reach out for clarification if needed.',
                },
                {
                  step: '03',
                  title: 'Get Your Quote',
                  description: 'Receive a detailed, no-obligation quote within 24 hours.',
                },
                {
                  step: '04',
                  title: 'Start Production',
                  description: 'Approve the quote and we\'ll begin bringing your packaging to life.',
                },
              ].map((process, index) => (
                <motion.div
                  key={process.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="bg-white rounded-2xl p-8 text-center hover:shadow-xl transition-shadow duration-300">
                    <div className="text-4xl font-bold text-[#FDB022]/20 mb-4">{process.step}</div>
                    <div className="w-12 h-12 rounded-full bg-[#FDB022]/10 flex items-center justify-center text-[#FDB022] font-bold text-sm mx-auto mb-4">
                      {index + 1}
                    </div>
                    <h3 className="text-lg font-bold text-[#171512] mb-2">{process.title}</h3>
                    <p className="text-black/55 text-sm">{process.description}</p>
                  </div>
                  {index < 3 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-[#FDB022]/30">
                      <ArrowRight size={24} />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Inquiry Form Section */}
        <section id="inquiry-form" className="py-20 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <InquiryForm />
          </div>
        </section>

        {/* Contact Options Section */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#171512] leading-tight mb-4">
                Prefer to Talk to Someone?
                <br />
                <span className="text-[#FDB022]">We&apos;re Here to Help</span>
              </h2>
              <p className="text-lg text-black/55 mb-8 max-w-2xl mx-auto">
                Our packaging experts are available to discuss your requirements
                and provide personalized assistance.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <a
                  href={`tel:${PHONE_NUMBER}`}
                  className="flex items-center gap-3 group bg-[#F5F1E7] rounded-2xl px-6 py-4 hover:bg-[#FDB022]/10 transition-colors"
                >
                  <span className="w-12 h-12 rounded-full bg-[#FDB022]/10 flex items-center justify-center text-[#FDB022] group-hover:scale-110 transition-transform">
                    <Phone size={20} />
                  </span>
                  <div className="text-left">
                    <div className="text-sm text-black/50">Call us</div>
                    <div className="font-semibold text-[#171512]">{PHONE_DISPLAY}</div>
                  </div>
                </a>
                <a
                  href={`mailto:${EMAIL_ADDRESS}`}
                  className="flex items-center gap-3 group bg-[#F5F1E7] rounded-2xl px-6 py-4 hover:bg-[#FDB022]/10 transition-colors"
                >
                  <span className="w-12 h-12 rounded-full bg-[#FDB022]/10 flex items-center justify-center text-[#FDB022] group-hover:scale-110 transition-transform">
                    <Mail size={20} />
                  </span>
                  <div className="text-left">
                    <div className="text-sm text-black/50">Email us</div>
                    <div className="font-semibold text-[#171512]">{EMAIL_ADDRESS}</div>
                  </div>
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 bg-gradient-to-br from-[#171512] to-[#2a2520]">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                Ready to Get Started?
                <br />
                <span className="text-[#FDB022]">Request Your Quote Today</span>
              </h2>
              <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto">
                Experience the {SITE_NAME} difference. We&apos;re here to bring your
                packaging vision to life.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="#inquiry-form"
                  className="inline-flex items-center gap-2 bg-[#FDB022] text-[#171512] font-semibold px-8 py-4 rounded-xl hover:bg-[#f5a80f] transition-colors shadow-lg shadow-[#FDB022]/25"
                >
                  Get Your Free Quote
                  <ArrowRight size={18} />
                </Link>
                {/* <Link
                  href="/about"
                  className="inline-flex items-center gap-2 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-colors"
                >
                  Learn More About Us
                </Link> */}
              </div>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}