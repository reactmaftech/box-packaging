'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'
import {
  ArrowRight,
  Palette,
  PenTool,
  Layers,
  Sparkles,
  CheckCircle,
  Clock,
  Shield,
  Award,
  MessageCircle,
  Phone,
  Mail,
  Star,
  Users,
  TrendingUp,
  Zap,
  Eye,
  Grid,
  Type,
  Droplet,
  Layout,
  Box,
  FileText,
} from 'lucide-react'

// Import components
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { InquiryForm } from '@/components/InquiryForm'
import { ServiceHero } from '@/components/ServiceHero'

// Import images
import boxImage1 from '../../../assets/images/01.webp'
import boxImage2 from '../../../assets/images/02.webp'
import boxImage3 from '../../../assets/images/03.webp'
import boxImage4 from '../../../assets/images/04.webp'
import boxImage5 from '../../../assets/images/05.webp'
import boxImage6 from '../../../assets/images/06.webp'
import boxImage7 from '../../../assets/images/07.webp'
import boxImage8 from '../../../assets/images/08.webp'
import { Testimonials } from '@/components/Testimonial'
import { FAQ } from '@/components/Faq'

// Service details
const serviceDetails = {
  tag: 'CUSTOM DESIGN',
  title: 'Custom Design Services',
  subtitle: 'Bring Your Packaging Vision to Life',
  description:
    'Our expert design team transforms your brand identity into stunning packaging that captures attention and drives sales. From concept to production-ready artwork, we deliver designs that make your products stand out.',
  ctaText: 'Start Your Design Project',
  ctaLink: '#inquiry',
  secondaryCtaText: 'Contact Us',
  secondaryCtaLink: '/contact-us',
}

// Design process steps
const processSteps = [
  {
    icon: FileText,
    title: 'Brief & Discovery',
    description:
      'We start by understanding your brand, product, target audience, and packaging requirements through a detailed consultation.',
  },
  {
    icon: PenTool,
    title: 'Concept Development',
    description:
      'Our designers create multiple initial concepts exploring different directions, styles, and structural options for your packaging.',
  },
  {
    icon: Palette,
    title: 'Design Refinement',
    description:
      'We refine the chosen concept with detailed attention to typography, color psychology, material selection, and finishing touches.',
  },
  {
    icon: Eye,
    title: '3D Visualization',
    description:
      'See your design come to life with realistic 3D mockups and digital prototypes before moving to production.',
  },
  {
    icon: Layers,
    title: 'Production Artwork',
    description:
      'We deliver production-ready files with precise specifications, die-lines, and printing instructions for seamless manufacturing.',
  },
  {
    icon: Sparkles,
    title: 'Final Review & Approval',
    description:
      'Your design is finalized with your approval, ensuring every detail meets your expectations before production begins.',
  },
]

// Design services offered
const designServices = [
  {
    icon: Layout,
    title: 'Structural Design',
    description:
      'Custom box structures and innovative packaging formats tailored to your product dimensions and requirements.',
  },
  {
    icon: Type,
    title: 'Typography & Branding',
    description:
      'Professional typography and brand identity integration that communicates your brand voice effectively.',
  },
  {
    icon: Droplet,
    title: 'Color Psychology',
    description:
      'Strategic color selection that evokes the right emotions and aligns with your brand positioning.',
  },
  {
    icon: Grid,
    title: 'Print-Ready Artwork',
    description:
      'High-resolution, print-ready files with proper bleed, crop marks, and color specifications for production.',
  },
]

// Benefits
const benefits = [
  {
    icon: Award,
    title: 'Expert Design Team',
    description:
      'Work with experienced packaging designers who understand the nuances of structural and visual design.',
  },
  {
    icon: Clock,
    title: 'Fast Turnaround',
    description:
      'Rapid design iterations and quick response times to keep your project moving forward.',
  },
  {
    icon: Shield,
    title: 'Quality Assurance',
    description:
      'Rigorous quality checks and proofing process to ensure your design is flawless before production.',
  },
  {
    icon: TrendingUp,
    title: 'Market-Ready Results',
    description:
      'Designs that are not just beautiful but strategically crafted to drive sales and brand recognition.',
  },
]

// Testimonials
const testimonials = [
  {
    quote:
      'The design team at BoxPack understood our brand instantly and created packaging that perfectly represents who we are. The attention to detail was exceptional.',
    name: 'Sarah Mitchell',
    role: "Founder, Queen's Pantry",
    rating: 5,
  },
  {
    quote:
      'We received 5 unique design concepts within the first week, and the refinement process was incredibly collaborative. The final result exceeded our expectations.',
    name: 'David Chen',
    role: 'Operations Lead, Bloom & Blossom',
    rating: 5,
  },
]

// FAQ
const faqs = [
  {
    question: 'How long does the design process take?',
    answer:
      'The typical design timeline ranges from 2-4 weeks depending on complexity, number of revisions, and project scope. We work with you to establish a timeline that meets your needs.',
  },
  {
    question: 'Do you provide design revisions?',
    answer:
      'Yes, we offer multiple rounds of revisions to ensure your design is perfected. Our collaborative process allows for feedback and refinements at every stage.',
  },
  {
    question: 'Can you design packaging for any industry?',
    answer:
      'Absolutely. Our team has experience across various industries including cosmetics, food & beverage, electronics, pharmaceuticals, retail, and more. We adapt our approach to your specific industry requirements.',
  },
  {
    question: 'Do I own the design files?',
    answer:
      'Yes, upon project completion, you receive full ownership of the design files. We provide all source files and production-ready artwork for your use.',
  },
]

// Trending Products Data - 16 products
const allProducts = [
  { name: 'Mailer Boxes', image: boxImage1, category: 'Shipping' },
  { name: 'Gable Boxes', image: boxImage2, category: 'Retail' },
  { name: 'Candle Boxes', image: boxImage3, category: 'Luxury' },
  { name: 'Pillow Boxes', image: boxImage4, category: 'Gift' },
  { name: 'Display Boxes', image: boxImage5, category: 'Retail' },
  { name: 'Cosmetic Packaging', image: boxImage6, category: 'Beauty' },
  { name: 'Food & Beverage Boxes', image: boxImage7, category: 'Food' },
  { name: 'Subscription Boxes', image: boxImage8, category: 'E-commerce' },
  { name: 'Rigid Boxes', image: boxImage1, category: 'Luxury' },
  { name: 'Kraft Boxes', image: boxImage2, category: 'Eco-Friendly' },
  { name: 'Corrugated Boxes', image: boxImage3, category: 'Shipping' },
  { name: 'Mylar Bags', image: boxImage4, category: 'Flexible' },
  { name: 'Gift Boxes', image: boxImage5, category: 'Gift' },
  { name: 'Electronics Packaging', image: boxImage6, category: 'Electronics' },
  { name: 'Pharmaceutical Boxes', image: boxImage7, category: 'Medical' },
  { name: 'Retail Display Boxes', image: boxImage8, category: 'Retail' },
]

export default function CustomDesignPage() {
  const [visibleProducts, setVisibleProducts] = useState(8)
  const [isLoading, setIsLoading] = useState(false)

  const handleLoadMore = () => {
    setIsLoading(true)
    setTimeout(() => {
      setVisibleProducts((prev) => Math.min(prev + 8, allProducts.length))
      setIsLoading(false)
    }, 600)
  }

  const displayedProducts = allProducts.slice(0, visibleProducts)
  const hasMore = visibleProducts < allProducts.length

  return (
    <>
      <Header />
        <div className="bg-white">
        {/* Hero Section - Using the new ServiceHero component */}
        <ServiceHero
          tag={serviceDetails.tag}
          title={serviceDetails.title}
          subtitle={serviceDetails.subtitle}
          description={serviceDetails.description}
          ctaText={serviceDetails.ctaText}
          ctaLink={serviceDetails.ctaLink}
          secondaryCtaText={serviceDetails.secondaryCtaText}
          secondaryCtaLink={serviceDetails.secondaryCtaLink}
          icon={<Palette size={40} className="text-[#FDB022]" />}
          backLink="/services"
          backLinkText="Back to Services"
        />

        {/* Trending Products Section */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            {/* Header row */}
            <motion.div
              className="flex flex-wrap items-end justify-between gap-6 mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="max-w-xl">
                <span className="inline-flex items-center border border-[#FDB022]/30 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide text-[#FDB022] mb-4">
                  CUSTOM DESIGN
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-[#171512] leading-tight mb-3">
                  Custom Design Products
                </h2>
                <p className="text-black/55 leading-relaxed">
                  Discover our trending and popular products, featuring top-selling
                  items trusted by customers for their quality, performance, and
                  standout design.
                </p>
              </div>
            </motion.div>

            {/* Product grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
              {displayedProducts.map((product, index) => (
                <motion.div
                  key={`${product.name}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -6 }}
                >
                  <Link href="#" className="group block">
                    <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-[#F5F1E7] border border-black/[0.06] shadow-sm group-hover:shadow-lg transition-shadow duration-300 mb-4">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 45vw, 22vw"
                      />
                      {/* Category badge */}
                      <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
                        {product.category}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FDB022] shrink-0" />
                      <p className="font-semibold text-[#171512] group-hover:text-[#FDB022] transition-colors">
                        {product.name}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mt-12"
              >
                <button
                  onClick={handleLoadMore}
                  disabled={isLoading}
                  className="group inline-flex items-center gap-2 border-2 border-[#FDB022] text-[#171512] font-semibold px-8 py-4 rounded-xl hover:bg-[#FDB022] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <span className="w-5 h-5 border-2 border-[#171512]/30 border-t-[#171512] rounded-full animate-spin" />
                      Loading...
                    </>
                  ) : (
                    <>
                      Load More Products
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </motion.div>
            )}
          </div>
        </section>

        {/* Design Services Section */}
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
                OUR SERVICES
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-[#171512] leading-tight mb-4">
                Our Design <span className="text-[#FDB022]">Services</span>
              </h2>
              <p className="text-lg text-black/55">
                Comprehensive design solutions tailored to your brand and product
                requirements.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {designServices.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-8 text-center hover:shadow-xl transition-shadow duration-300 border border-black/5"
                >
                  <div className="w-16 h-16 rounded-full bg-[#FDB022]/10 flex items-center justify-center text-[#FDB022] mx-auto mb-4">
                    <service.icon size={28} />
                  </div>
                  <h3 className="text-lg font-bold text-[#171512] mb-3">{service.title}</h3>
                  <p className="text-black/55 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Design Process Section */}
        <section id="process" className="py-20 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center max-w-2xl mx-auto mb-14"
            >
              <span className="inline-flex items-center border border-[#FDB022]/30 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide text-[#FDB022] mb-4">
                OUR PROCESS
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-[#171512] leading-tight mb-4">
                How We Create Your
                <br />
                <span className="text-[#FDB022]">Perfect Design</span>
              </h2>
              <p className="text-lg text-black/55">
                A structured approach that ensures your packaging design is both
                beautiful and production-ready.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-[#F5F1E7] rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="w-14 h-14 rounded-xl bg-[#FDB022]/10 flex items-center justify-center text-[#FDB022] mb-4">
                    <step.icon size={24} />
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-sm font-bold text-[#FDB022]">0{index + 1}</span>
                    <h3 className="text-xl font-bold text-[#171512]">{step.title}</h3>
                  </div>
                  <p className="text-black/55 leading-relaxed">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
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
                WHY CHOOSE US
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-[#171512] leading-tight mb-4">
                Design with <span className="text-[#FDB022]">Confidence</span>
              </h2>
              <p className="text-lg text-black/55">
                Our design team brings expertise, creativity, and technical
                knowledge to every project.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-8 text-center hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="w-16 h-16 rounded-full bg-[#FDB022]/10 flex items-center justify-center text-[#FDB022] mx-auto mb-4">
                    <benefit.icon size={28} />
                  </div>
                  <h3 className="text-lg font-bold text-[#171512] mb-3">{benefit.title}</h3>
                  <p className="text-black/55 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <Testimonials />

        {/* FAQ Section */}
       <FAQ />

        {/* CTA Section */}
        <section className="py-20 mt-20 bg-gradient-to-br from-[#171512] to-[#2a2520]">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                Ready to Bring Your
                <br />
                <span className="text-[#FDB022]">Design to Life?</span>
              </h2>
              <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto">
                Let's collaborate on creating packaging that tells your brand story
                and captivates your customers.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="#inquiry"
                  className="inline-flex items-center gap-2 bg-[#FDB022] text-[#171512] font-semibold px-8 py-4 rounded-xl hover:bg-[#f5a80f] transition-colors shadow-lg shadow-[#FDB022]/25"
                >
                  Start Your Project
                  <ArrowRight size={18} />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-colors"
                >
                  Explore All Services
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Inquiry Form */}
        <InquiryForm />
      </div>
      <Footer />
    </>
  )
}