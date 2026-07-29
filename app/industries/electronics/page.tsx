'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'
import {
  ArrowRight,
  CheckCircle,
  Shield,
  Award,
  Truck,
  Package,
  Sparkles,
  Smartphone,
  Laptop,
  Headphones,
  Watch,
  Camera,
  Zap,
} from 'lucide-react'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { InquiryForm } from '@/components/InquiryForm'

// Import images for electronics
import e1 from '../../../assets/electronics/e-1.webp'
import e2 from '../../../assets/electronics/e-2.webp'
import e3 from '../../../assets/electronics/e-3.webp'
import e4 from '../../../assets/electronics/e-4.webp'
import e5 from '../../../assets/electronics/e-5.webp'
import e6 from '../../../assets/electronics/e-6.webp'
import e7 from '../../../assets/electronics/e-7.webp'
import e8 from '../../../assets/electronics/e-8.webp'
import e9 from '../../../assets/electronics/e-9.webp'
import e10 from '../../../assets/electronics/e-10.webp'

// Expanded product images array with names and categories - 16 items
const allGalleryItems = [
  { src: e1, name: 'Smartphone Box', category: 'Mobile' },
  { src: e2, name: 'Laptop Packaging', category: 'Computer' },
  { src: e3, name: 'Headphone Box', category: 'Audio' },
  { src: e4, name: 'Smartwatch Case', category: 'Wearable' },
  { src: e5, name: 'Camera Box', category: 'Optics' },
  { src: e6, name: 'Gaming Accessories', category: 'Gaming' },
  { src: e7, name: 'Tablet Packaging', category: 'Mobile' },
  { src: e8, name: 'Speaker Box', category: 'Audio' },
  { src: e9, name: 'Drone Packaging', category: 'Tech' },
  { src: e10, name: 'Router Box', category: 'Networking' },
  { src: e1, name: 'Phone Accessories', category: 'Mobile' },
  { src: e2, name: 'Monitor Packaging', category: 'Computer' },
  { src: e3, name: 'Earbuds Box', category: 'Audio' },
  { src: e4, name: 'Fitness Tracker', category: 'Wearable' },
  { src: e5, name: 'Lens Box', category: 'Optics' },
  { src: e6, name: 'Gaming Console', category: 'Gaming' },
]

// Product images array for hero slider
const productImages = [e1, e2, e3, e4, e5, e6, e7, e8, e9, e10]

// Industry details
const industryDetails = {
  title: 'Electronics Packaging',
  subtitle: 'Protective & Premium Packaging Solutions',
  description:
    'Specialized packaging solutions designed to protect sensitive electronic components while creating a premium unboxing experience. Our electronics packaging combines durability, anti-static properties, and brand-elevating design.',
  features: [
    'Anti-static protection for sensitive components',
    'Custom foam inserts for secure fit',
    'Premium materials that elevate brand perception',
    'Shelf-ready retail packaging options',
    'Sustainable and eco-friendly materials available',
    'Complete customization with your branding',
  ],
  specifications: [
    'Material: Anti-static, ESD safe materials',
    'Protection: Shock-absorbing foam inserts',
    'Finishing: Matte, Gloss, Soft-touch',
    'Printing: High-resolution digital printing',
    'Customization: Full color, Pantone matching',
    'Compliance: RoHS, REACH certified',
  ],
}

// Benefits
const benefits = [
  {
    icon: Shield,
    title: 'ESD Protection',
    description: 'Anti-static materials that protect sensitive electronic components from electrostatic discharge.',
  },
  {
    icon: Award,
    title: 'Premium Presentation',
    description: 'High-quality packaging that reflects the premium nature of your electronic products.',
  },
  {
    icon: Package,
    title: 'Custom Fit',
    description: 'Tailored foam inserts and custom structures for a perfect fit and maximum protection.',
  },
  {
    icon: Zap,
    title: 'Brand Experience',
    description: 'Create memorable unboxing experiences that strengthen customer loyalty and brand perception.',
  },
]

// Applications
const applications = [
  {
    icon: Smartphone,
    title: 'Smartphones & Tablets',
    description: 'Premium packaging for mobile devices with custom inserts and anti-static protection.',
  },
  {
    icon: Laptop,
    title: 'Laptops & Computers',
    description: 'Robust packaging solutions for computers and accessories with superior protection.',
  },
  {
    icon: Headphones,
    title: 'Audio Equipment',
    description: 'Elegant packaging for headphones, speakers, and audio accessories.',
  },
  {
    icon: Watch,
    title: 'Smartwatches & Wearables',
    description: 'Compact, premium packaging for wearables with a focus on brand experience.',
  },
  {
    icon: Camera,
    title: 'Cameras & Optics',
    description: 'Protective packaging for delicate camera equipment with custom foam inserts.',
  },
  {
    icon: Camera,
    title: 'Gaming Accessories',
    description: 'Eye-catching packaging for gaming peripherals and accessories.',
  },
]

// FAQ
const faqs = [
  {
    question: 'What is ESD protection and why is it important?',
    answer: 'ESD (Electrostatic Discharge) protection prevents damage to sensitive electronic components from static electricity. Our packaging uses anti-static materials and ESD-safe foam to ensure your products arrive in perfect condition.',
  },
  {
    question: 'Can you create custom foam inserts?',
    answer: 'Yes! We specialize in creating custom foam inserts that perfectly cradle your products for maximum protection during shipping and handling. We can design inserts for any shape or size.',
  },
  {
    question: 'What materials do you use for electronics packaging?',
    answer: 'We use a range of materials including anti-static cardboard, ESD-safe foam, corrugated board, and premium paperboard. We can recommend the best materials based on your specific product requirements.',
  },
  {
    question: 'Do you offer retail-ready packaging?',
    answer: 'Absolutely! We design packaging that looks great on retail shelves while providing the protection your products need. Options include shelf-ready displays, premium boxes, and hanging packaging.',
  },
]

// Related industries
const relatedIndustries = [
  { name: 'Cosmetics & Beauty', icon: Sparkles, href: '/industries/cosmetics' },
  { name: 'Food & Beverage', icon: Package, href: '/industries/food-beverage' },
  { name: 'Pharmaceuticals', icon: Shield, href: '/industries/pharmaceuticals' },
  { name: 'E-commerce', icon: Truck, href: '/industries/ecommerce' },
]

export default function ElectronicsPage() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [visibleGallery, setVisibleGallery] = useState(8)
  const [isLoading, setIsLoading] = useState(false)

  const handleLoadMore = () => {
    setIsLoading(true)
    setTimeout(() => {
      setVisibleGallery((prev) => Math.min(prev + 8, allGalleryItems.length))
      setIsLoading(false)
    }, 600)
  }

  const displayedGallery = allGalleryItems.slice(0, visibleGallery)
  const hasMore = visibleGallery < allGalleryItems.length

  return (
    <>
      <Header />
      <div className="bg-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#171512] to-[#2a2520] pt-32 pb-16 px-6">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FDB022]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FDB022]/5 rounded-full blur-3xl" />
          
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                href="/industries"
                className="inline-flex items-center gap-2 text-[#FDB022] hover:text-[#f5a80f] transition-colors mb-6"
              >
                <ArrowRight size={16} className="rotate-180" />
                Back to Industries
              </Link>

              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <span className="inline-flex items-center border border-[#FDB022]/30 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide text-[#FDB022] mb-4">
                    ELECTRONICS INDUSTRY
                  </span>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                    {industryDetails.title}
                  </h1>
                  <p className="text-xl text-white/70 mb-4">
                    {industryDetails.subtitle}
                  </p>
                  <p className="text-white/60 leading-relaxed max-w-lg mb-8">
                    {industryDetails.description}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      href="#inquiry"
                      className="inline-flex items-center gap-2 bg-[#FDB022] text-[#171512] font-semibold px-8 py-4 rounded-xl hover:bg-[#f5a80f] transition-colors shadow-lg shadow-[#FDB022]/25"
                    >
                      Get a Quote
                      <ArrowRight size={18} />
                    </Link>
                    <Link
                      href="#features"
                      className="inline-flex items-center gap-2 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-colors"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>

                <div className="relative">
                  <div className="aspect-square rounded-3xl overflow-hidden bg-[#F5F1E7] border border-white/10">
                    <Image
                      src={productImages[selectedImage]}
                      alt="Electronics Packaging"
                      className="w-full h-full object-cover"
                      priority
                    />
                  </div>
                  {/* Thumbnail navigation */}
                  <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                    {productImages.slice(0, 8).map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                          selectedImage === index
                            ? 'border-[#FDB022]'
                            : 'border-white/20 hover:border-white/40'
                        }`}
                      >
                        <Image
                          src={img}
                          alt={`Electronics Packaging ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features & Specifications Section */}
        <section id="features" className="py-20 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center max-w-2xl mx-auto mb-14"
            >
              <span className="inline-flex items-center border border-[#FDB022]/30 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide text-[#FDB022] mb-4">
                FEATURES
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-[#171512] leading-tight mb-4">
                Why Choose Our
                <br />
                <span className="text-[#FDB022]">Electronics Packaging</span>
              </h2>
              <p className="text-lg text-black/55">
                Discover the features and specifications that make our electronics 
                packaging the preferred choice for tech brands.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Features List */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold text-[#171512] mb-6">Key Features</h3>
                <div className="space-y-3">
                  {industryDetails.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle size={20} className="text-[#FDB022] mt-1 flex-shrink-0" />
                      <span className="text-black/70">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Specifications List */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold text-[#171512] mb-6">Specifications</h3>
                <div className="space-y-3">
                  {industryDetails.specifications.map((spec, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#FDB022] mt-2 flex-shrink-0" />
                      <span className="text-black/70">{spec}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Gallery Section with Load More */}
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
                GALLERY
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-[#171512] leading-tight mb-4">
                Our <span className="text-[#FDB022]">Electronics</span> Packaging
              </h2>
              <p className="text-lg text-black/55">
                Explore our electronics packaging solutions showcasing various products and styles.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {displayedGallery.map((item, index) => (
                <motion.div
                  key={`${item.name}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="aspect-square rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-shadow duration-300">
                    <div className="relative w-full h-full">
                      <Image
                        src={item.src}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Overlay with product name and category */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <div className="text-white">
                          <h4 className="font-semibold text-sm">{item.name}</h4>
                          <p className="text-white/70 text-xs">{item.category}</p>
                        </div>
                      </div>
                    </div>
                  </div>
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
                <p className="text-black/40 text-sm mt-3">
                  Showing {displayedGallery.length} of {allGalleryItems.length} products
                </p>
              </motion.div>
            )}
          </div>
        </section>

        

        {/* Applications Section */}
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
                APPLICATIONS
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-[#171512] leading-tight mb-4">
                Perfect for <span className="text-[#FDB022]">Electronics</span> Products
              </h2>
              <p className="text-lg text-black/55">
                Our packaging solutions are tailored for a wide range of electronic products.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {applications.map((app, index) => (
                <motion.div
                  key={app.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-[#F5F1E7] rounded-2xl p-8 text-center hover:shadow-lg transition-shadow duration-300 group"
                >
                  <div className="w-16 h-16 rounded-full bg-[#FDB022]/10 flex items-center justify-center text-[#FDB022] mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <app.icon size={28} />
                  </div>
                  <h3 className="text-lg font-bold text-[#171512] mb-2">{app.title}</h3>
                  <p className="text-black/55 text-sm leading-relaxed">
                    {app.description}
                  </p>
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
                BENEFITS
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-[#171512] leading-tight mb-4">
                The <span className="text-[#FDB022]">Electronics</span> Advantage
              </h2>
              <p className="text-lg text-black/55">
                Experience the difference with our specialized electronics packaging.
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
                  className="bg-white rounded-2xl p-8 text-center hover:shadow-xl transition-shadow duration-300 group"
                >
                  <div className="w-16 h-16 rounded-full bg-[#FDB022]/10 flex items-center justify-center text-[#FDB022] mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <benefit.icon size={28} />
                  </div>
                  <h3 className="text-lg font-bold text-[#171512] mb-2">{benefit.title}</h3>
                  <p className="text-black/55 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Industry Stats */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: Package, value: '10M+', label: 'Electronics Units Packaged' },
                { icon: Shield, value: '100%', label: 'ESD Safe Protection' },
                { icon: Award, value: '500+', label: 'Tech Brands Served' },
                { icon: Truck, value: '50+', label: 'Countries Supplied' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="w-14 h-14 rounded-full bg-[#FDB022]/10 flex items-center justify-center mx-auto mb-4">
                    <stat.icon size={28} className="text-[#FDB022]" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-[#171512] mb-1">
                    {stat.value}
                  </div>
                  <div className="text-black/50 text-sm font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-6 bg-[#F5F1E7]">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center max-w-2xl mx-auto mb-14"
            >
              <span className="inline-flex items-center border border-[#FDB022]/30 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide text-[#FDB022] mb-4">
                FAQ
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-[#171512] leading-tight mb-4">
                Frequently Asked <span className="text-[#FDB022]">Questions</span>
              </h2>
            </motion.div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <h3 className="text-lg font-bold text-[#171512] mb-2">{faq.question}</h3>
                  <p className="text-black/55 leading-relaxed">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Industries Section */}
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
                RELATED INDUSTRIES
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-[#171512] leading-tight mb-4">
                Explore Other <span className="text-[#FDB022]">Industries</span>
              </h2>
              <p className="text-lg text-black/55">
                Discover our packaging solutions for other industries.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-6">
              {relatedIndustries.map((industry, index) => (
                <motion.div
                  key={industry.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -6 }}
                >
                  <Link href={industry.href} className="group block">
                    <div className="bg-[#F5F1E7] rounded-2xl p-8 text-center hover:shadow-xl transition-shadow duration-300">
                      <div className="w-16 h-16 rounded-full bg-[#FDB022]/10 flex items-center justify-center text-[#FDB022] mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                        <industry.icon size={28} />
                      </div>
                      <h3 className="font-semibold text-[#171512] group-hover:text-[#FDB022] transition-colors">
                        {industry.name}
                      </h3>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
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
                Ready to Protect Your
                <br />
                <span className="text-[#FDB022]">Electronics with Style?</span>
              </h2>
              <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto">
                Get a custom quote for electronics packaging that combines superior 
                protection with premium brand presentation.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="#inquiry"
                  className="inline-flex items-center gap-2 bg-[#FDB022] text-[#171512] font-semibold px-8 py-4 rounded-xl hover:bg-[#f5a80f] transition-colors shadow-lg shadow-[#FDB022]/25"
                >
                  Get a Free Quote
                  <ArrowRight size={18} />
                </Link>
                <Link
                  href="/industries"
                  className="inline-flex items-center gap-2 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-colors"
                >
                  Explore More Industries
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