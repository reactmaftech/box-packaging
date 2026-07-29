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
  Star,
  Truck,
  Package,
  Layers,
  Sparkles,
  Gift,
  Palette,
  PenTool,
  Clock,
  Phone,
  Mail,
  MessageCircle,
  ShoppingBag,
} from 'lucide-react'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { InquiryForm } from '@/components/InquiryForm'

// Import images for rigid boxes
import r1 from '../../../assets/rigid-boxes/r-1.webp'
import r2 from '../../../assets/rigid-boxes/r-2.webp'
import r3 from '../../../assets/rigid-boxes/r-3.webp'
import r4 from '../../../assets/rigid-boxes/r-4.webp'
import r5 from '../../../assets/rigid-boxes/r-5.webp'
import r6 from '../../../assets/rigid-boxes/r-6.webp'
import r7 from '../../../assets/rigid-boxes/r-7.webp'
import r8 from '../../../assets/rigid-boxes/r-8.webp'

// Product images array - expanded to 16 with repeating patterns and varied names
const allProductImages = [
  { src: r1, name: 'Premium Rigid Box', style: 'Luxury Gold' },
  { src: r2, name: 'Elegant Rigid Box', style: 'Matte Black' },
  { src: r3, name: 'Deluxe Rigid Box', style: 'Soft Touch' },
  { src: r4, name: 'Premier Rigid Box', style: 'Gloss Finish' },
  { src: r5, name: 'Signature Rigid Box', style: 'Embossed' },
  { src: r6, name: 'Heritage Rigid Box', style: 'Classic White' },
  { src: r7, name: 'Modern Rigid Box', style: 'Minimalist' },
  { src: r8, name: 'Luxury Rigid Box', style: 'Premium' },
  { src: r1, name: 'Gold Edition Rigid Box', style: 'Gold Foil' },
  { src: r2, name: 'Silver Edition Rigid Box', style: 'Silver Foil' },
  { src: r3, name: 'Velvet Touch Rigid Box', style: 'Velvet Finish' },
  { src: r4, name: 'Crystal Clear Rigid Box', style: 'Clear Finish' },
  { src: r5, name: 'Heritage Collection Box', style: 'Vintage' },
  { src: r6, name: 'Contemporary Rigid Box', style: 'Modern' },
  { src: r7, name: 'Executive Rigid Box', style: 'Executive' },
  { src: r8, name: 'Ultimate Luxury Box', style: 'Ultimate' },
]

// Product details
const productDetails = {
  title: 'Rigid Boxes',
  subtitle: 'Premium Luxury Packaging Solutions',
  description:
    'Rigid boxes, also known as set-up boxes, are the gold standard in luxury packaging. Constructed from high-quality, thick paperboard, these boxes offer exceptional durability and a premium feel that elevates any product.',
  features: [
    'Premium thick paperboard construction',
    'Luxurious premium feel and finish',
    'Available in various sizes and styles',
    'Custom printing and finishing options',
    'Perfect for luxury and high-end products',
    'Eco-friendly and sustainable materials',
  ],
  specifications: [
    'Material: High-quality paperboard',
    'Thickness: 2mm - 3mm',
    'Finishing: Matte, Gloss, Soft-touch, Embossing',
    'Printing: Digital, Offset, Flexo',
    'Colors: Full color CMYK, Pantone matching',
    'Customization: Complete custom design available',
  ],
}

// Benefits
const benefits = [
  {
    icon: Award,
    title: 'Premium Quality',
    description: 'Thick, rigid construction that provides superior protection and a luxurious feel.',
  },
  {
    icon: Palette,
    title: 'Custom Design',
    description: 'Fully customizable with your branding, colors, and unique finishing options.',
  },
  {
    icon: Shield,
    title: 'Durable Protection',
    description: 'Strong construction that protects your products during shipping and handling.',
  },
  {
    icon: Sparkles,
    title: 'Premium Finish',
    description: 'Multiple finishing options including matte, gloss, soft-touch, and embossing.',
  },
]

// Applications
const applications = [
  {
    icon: Gift,
    title: 'Luxury Gifts',
    description: 'Perfect for high-end gift packaging and premium presentations.',
  },
  {
    icon: Package,
    title: 'Cosmetics & Beauty',
    description: 'Ideal for premium skincare, makeup, and fragrance packaging.',
  },
  {
    icon: ShoppingBag,
    title: 'Retail & E-commerce',
    description: 'Excellent for luxury retail and memorable unboxing experiences.',
  },
  {
    icon: Star,
    title: 'Electronics',
    description: 'Perfect for premium electronics and tech accessories packaging.',
  },
]

// Related products
const relatedProducts = [
  { name: 'Kraft Boxes', image: r5, href: '/products/kraft-boxes' },
  { name: 'Corrugated Boxes', image: r6, href: '/products/corrugated-boxes' },
  { name: 'Mailer Boxes', image: r7, href: '/products/mailer-boxes' },
  { name: 'Custom Boxes', image: r8, href: '/products/custom-boxes' },
]

export default function RigidBoxesPage() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [visibleGallery, setVisibleGallery] = useState(8)
  const [isLoading, setIsLoading] = useState(false)

  const handleLoadMore = () => {
    setIsLoading(true)
    setTimeout(() => {
      setVisibleGallery((prev) => Math.min(prev + 8, allProductImages.length))
      setIsLoading(false)
    }, 600)
  }

  const displayedGallery = allProductImages.slice(0, visibleGallery)
  const hasMore = visibleGallery < allProductImages.length

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
                href="/products"
                className="inline-flex items-center gap-2 text-[#FDB022] hover:text-[#f5a80f] transition-colors mb-6"
              >
                <ArrowRight size={16} className="rotate-180" />
                Back to Products
              </Link>

              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <span className="inline-flex items-center border border-[#FDB022]/30 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide text-[#FDB022] mb-4">
                    PREMIUM PACKAGING
                  </span>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                    {productDetails.title}
                  </h1>
                  <p className="text-xl text-white/70 mb-4">
                    {productDetails.subtitle}
                  </p>
                  <p className="text-white/60 leading-relaxed max-w-lg mb-8">
                    {productDetails.description}
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
                      src={allProductImages[selectedImage].src}
                      alt="Rigid Box"
                      className="w-full h-full object-cover"
                      priority
                    />
                  </div>
                  {/* Thumbnail navigation */}
                  <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                    {allProductImages.slice(0, 8).map((img, index) => (
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
                          src={img.src}
                          alt={`Rigid Box ${index + 1}`}
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
                <span className="text-[#FDB022]">Rigid Boxes</span>
              </h2>
              <p className="text-lg text-black/55">
                Discover the premium features and specifications that make our 
                rigid boxes the perfect choice for luxury packaging.
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
                  {productDetails.features.map((feature, index) => (
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
                  {productDetails.specifications.map((spec, index) => (
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
{/* Gallery Section - Enhanced with Load More */}
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
                Our <span className="text-[#FDB022]">Rigid Box</span> Collection
              </h2>
              <p className="text-lg text-black/55">
                Explore our premium rigid box collection showcasing various styles and finishes.
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
                      {/* Overlay with product name */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <div className="text-white">
                          <h4 className="font-semibold text-sm">{item.name}</h4>
                          <p className="text-white/70 text-xs">{item.style}</p>
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
                  Showing {displayedGallery.length} of {allProductImages.length} products
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
                Perfect for <span className="text-[#FDB022]">Various Industries</span>
              </h2>
              <p className="text-lg text-black/55">
                Our rigid boxes are versatile and suitable for a wide range of applications.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                The <span className="text-[#FDB022]">Rigid Box</span> Advantage
              </h2>
              <p className="text-lg text-black/55">
                Experience the premium difference with our high-quality rigid boxes.
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

        {/* Related Products */}
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
                RELATED PRODUCTS
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-[#171512] leading-tight mb-4">
                You Might Also <span className="text-[#FDB022]">Like</span>
              </h2>
              <p className="text-lg text-black/55">
                Explore other premium packaging solutions we offer.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-6">
              {relatedProducts.map((product, index) => (
                <motion.div
                  key={product.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -6 }}
                >
                  <Link href={product.href} className="group block">
                    <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-[#F5F1E7] mb-4 shadow-sm group-hover:shadow-xl transition-shadow duration-300">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
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
              {[
                {
                  question: 'What are rigid boxes used for?',
                  answer: 'Rigid boxes are premium packaging solutions used for luxury products such as cosmetics, jewelry, electronics, gourmet foods, and high-end gifts. They provide superior protection and a premium unboxing experience.'
                },
                {
                  question: 'Can I customize the size and design?',
                  answer: 'Absolutely! We offer complete customization for rigid boxes including size, shape, color, finish, printing, and special features like inserts, ribbons, and magnetic closures.'
                },
                {
                  question: 'What finishing options are available?',
                  answer: 'We offer a wide range of finishes including matte, gloss, soft-touch, embossing, debossing, foil stamping, and spot UV coating to create the perfect look for your brand.'
                },
                {
                  question: 'What is the minimum order quantity?',
                  answer: 'Minimum order quantities for rigid boxes vary depending on specifications. We work with businesses of all sizes and can accommodate both small and large volume orders.'
                },
              ].map((faq, index) => (
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
                Ready to Elevate Your
                <br />
                <span className="text-[#FDB022]">Brand with Rigid Boxes?</span>
              </h2>
              <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto">
                Get a custom quote for premium rigid boxes that will elevate your 
                brand and delight your customers.
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
                  href="/products"
                  className="inline-flex items-center gap-2 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-colors"
                >
                  Explore More Products
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