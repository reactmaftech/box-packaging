// app/sustainability/page.tsx (Frontend/Public)
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Leaf, Recycle, TreeDeciduous, Droplets, Sun, Shield,
  ArrowRight, CheckCircle, Award, Truck, Factory, Globe,
  TrendingUp, Heart, Star, Zap, Sprout, Package, BadgeCheck,
  BarChart3, Users, Target, Lightbulb
} from 'lucide-react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { QuickInquiryModal } from '@/components/QuickInquiryModal'

const stats = [
  { icon: Recycle, value: '100%', label: 'Recyclable Materials' },
  { icon: TreeDeciduous, value: '50,000+', label: 'Trees Saved Annually' },
  { icon: Droplets, value: '60%', label: 'Less Water Usage' },
  { icon: Leaf, value: '0', label: 'Landfill Waste Goal' },
]

const initiatives = [
  {
    icon: Recycle,
    title: 'Recyclable Packaging',
    description: 'All our packaging solutions are designed with recyclability in mind. We use materials that can be easily recycled through standard municipal recycling programs.',
    color: 'from-green-400 to-emerald-500',
    bgColor: 'bg-green-50',
    textColor: 'text-green-700',
    borderColor: 'border-green-200'
  },
  {
    icon: Leaf,
    title: 'Eco-Friendly Materials',
    description: 'We source sustainable materials including FSC-certified paper, biodegradable inks, and water-based adhesives to minimize environmental impact.',
    color: 'from-emerald-400 to-teal-500',
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-700',
    borderColor: 'border-emerald-200'
  },
  {
    icon: Factory,
    title: 'Green Manufacturing',
    description: 'Our state-of-the-art manufacturing facilities use renewable energy sources and implement waste reduction strategies throughout the production process.',
    color: 'from-teal-400 to-cyan-500',
    bgColor: 'bg-teal-50',
    textColor: 'text-teal-700',
    borderColor: 'border-teal-200'
  },
  {
    icon: Truck,
    title: 'Carbon-Neutral Shipping',
    description: 'We offset carbon emissions from all our shipments through verified carbon credit programs and optimize delivery routes for maximum efficiency.',
    color: 'from-cyan-400 to-blue-500',
    bgColor: 'bg-cyan-50',
    textColor: 'text-cyan-700',
    borderColor: 'border-cyan-200'
  },
  {
    icon: Sprout,
    title: 'Biodegradable Options',
    description: 'Our biodegradable packaging solutions break down naturally within months, leaving no harmful residues in the environment.',
    color: 'from-lime-400 to-green-500',
    bgColor: 'bg-lime-50',
    textColor: 'text-lime-700',
    borderColor: 'border-lime-200'
  },
  {
    icon: Shield,
    title: 'Minimal Waste Design',
    description: 'We optimize packaging designs to use minimal material while maintaining maximum protection, reducing overall waste generation.',
    color: 'from-green-500 to-emerald-600',
    bgColor: 'bg-green-50',
    textColor: 'text-green-700',
    borderColor: 'border-green-200'
  },
]

const certifications = [
  { name: 'FSC Certified', icon: TreeDeciduous, description: 'Forest Stewardship Council certified materials' },
  { name: 'ISO 14001', icon: BadgeCheck, description: 'Environmental management standards' },
  { name: 'EcoVadis Gold', icon: Award, description: 'Sustainability rating excellence' },
  { name: 'Carbon Neutral', icon: Globe, description: 'Certified carbon neutral operations' },
  { name: 'Green Seal', icon: Star, description: 'Environmental leadership standard' },
]

const goals = [
  { year: '2025', title: 'Zero Waste to Landfill', description: 'Eliminate all manufacturing waste sent to landfills', progress: 75 },
  { year: '2026', title: '100% Renewable Energy', description: 'Power all facilities with renewable energy sources', progress: 60 },
  { year: '2027', title: 'Carbon Negative', description: 'Remove more carbon than we emit across operations', progress: 40 },
  { year: '2030', title: 'Circular Economy', description: 'Full circular lifecycle for all packaging products', progress: 30 },
]

export default function SustainabilityPage() {
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false)
  const [inquiryCategory, setInquiryCategory] = useState({ name: '', type: '' })

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900 text-white pt-32 pb-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #4ade80 1px, transparent 1px), radial-gradient(circle at 75% 75%, #34d399 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }} />
        </div>
        
        {/* Floating Leaves */}
        <div className="absolute top-20 right-10 opacity-20"><Leaf size={80} /></div>
        <div className="absolute bottom-20 left-10 opacity-20"><Leaf size={60} className="rotate-45" /></div>
        <div className="absolute top-40 left-1/4 opacity-10"><Recycle size={100} /></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center border border-green-400/30 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide text-green-300 mb-6"
            >
              <Leaf size={14} className="mr-2" />
              OUR COMMITMENT
            </motion.span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Sustainability &
              <br />
              <span className="bg-gradient-to-r from-green-300 to-emerald-200 bg-clip-text text-transparent">
                Environmental Responsibility
              </span>
            </h1>
            
            <p className="text-lg text-green-100/80 max-w-3xl mx-auto mb-10 leading-relaxed">
              At BoxPack, we believe that exceptional packaging shouldn't come at the expense of our planet. 
              We're committed to sustainable practices that reduce environmental impact while delivering 
              the premium quality your brand deserves.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="#initiatives"
                className="px-8 py-3.5 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-400 transition-all shadow-lg shadow-green-500/25 flex items-center gap-2"
              >
                Our Initiatives
                <ArrowRight size={18} />
              </Link>
              <button
                onClick={() => {
                  setInquiryCategory({ name: 'Sustainable Packaging', type: 'Sustainability' })
                  setInquiryModalOpen(true)
                }}
                className="px-8 py-3.5 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-all border border-white/20 flex items-center gap-2"
              >
                Get Eco-Friendly Quote
                <Leaf size={18} />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-8 bg-gradient-to-b from-green-50 to-white rounded-2xl border border-green-100 hover:shadow-lg transition-all"
              >
                <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon size={28} className="text-green-700" />
                </div>
                <p className="text-3xl md:text-4xl font-bold text-green-700 mb-2">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Initiatives */}
      <section id="initiatives" className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center border border-green-300/50 rounded-full px-4 py-1.5 text-xs font-semibold text-green-600 mb-4">
              <Sprout size={14} className="mr-2" />
              OUR INITIATIVES
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How We're Making a Difference
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From material sourcing to manufacturing and delivery, sustainability is embedded 
              in every step of our process.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {initiatives.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className={`${item.bgColor} rounded-2xl p-8 border ${item.borderColor} hover:shadow-xl transition-all`}
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center mb-5 shadow-lg`}>
                  <item.icon size={24} className="text-white" />
                </div>
                <h3 className={`text-xl font-bold ${item.textColor} mb-3`}>{item.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center border border-green-300/50 rounded-full px-4 py-1.5 text-xs font-semibold text-green-600 mb-4">
              <BadgeCheck size={14} className="mr-2" />
              CERTIFICATIONS
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Recognized for Our Commitment
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our sustainability efforts are backed by leading environmental certifications 
              and industry recognition.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 rounded-2xl border border-gray-200 hover:border-green-300 hover:shadow-lg transition-all bg-white"
              >
                <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <cert.icon size={28} className="text-green-600" />
                </div>
                <h4 className="font-bold text-gray-900 text-sm mb-2">{cert.name}</h4>
                <p className="text-xs text-gray-500">{cert.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability Goals */}
      <section className="py-20 px-6 bg-gradient-to-br from-green-900 to-emerald-800 text-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center border border-green-400/30 rounded-full px-4 py-1.5 text-xs font-semibold text-green-300 mb-4">
              <Target size={14} className="mr-2" />
              OUR GOALS
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Sustainability Roadmap
            </h2>
            <p className="text-green-100/70 max-w-2xl mx-auto">
              We've set ambitious targets to continuously improve our environmental performance.
            </p>
          </motion.div>

          <div className="space-y-8">
            {goals.map((goal, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="bg-green-500 text-white px-4 py-2 rounded-xl font-bold text-sm flex-shrink-0 text-center">
                    {goal.year}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg mb-1">{goal.title}</h4>
                    <p className="text-green-100/60 text-sm mb-3">{goal.description}</p>
                    <div className="w-full bg-white/20 rounded-full h-2.5">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${goal.progress}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-r from-green-400 to-emerald-300 h-2.5 rounded-full"
                      />
                    </div>
                    <p className="text-right text-xs text-green-300 mt-1">{goal.progress}% Complete</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-12 border border-green-100"
          >
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Heart size={32} className="text-green-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ready to Go Green?
            </h2>
            <p className="text-gray-600 max-w-lg mx-auto mb-8 text-lg">
              Join hundreds of brands that have switched to sustainable packaging. 
              Get your free eco-friendly packaging consultation today.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => {
                  setInquiryCategory({ name: 'Sustainable Packaging', type: 'Sustainability' })
                  setInquiryModalOpen(true)
                }}
                className="px-8 py-3.5 bg-green-600 text-white font-bold rounded-xl hover:bg-green-500 transition-all shadow-lg shadow-green-500/25 flex items-center gap-2"
              >
                <Leaf size={18} />
                Get Sustainable Quote
              </button>
              <Link
                href="/products"
                className="px-8 py-3.5 border-2 border-green-200 text-green-700 font-bold rounded-xl hover:bg-green-50 transition-all flex items-center gap-2"
              >
                Browse Products
                <ArrowRight size={18} />
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-6 mt-8 pt-8 border-t border-green-100">
              {[
                { icon: CheckCircle, label: 'Free Consultation' },
                { icon: CheckCircle, label: 'Eco-Friendly Materials' },
                { icon: CheckCircle, label: 'Competitive Pricing' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-green-700">
                  <item.icon size={16} className="text-green-500" />
                  {item.label}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Inquiry Modal */}
      <QuickInquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        categoryName={inquiryCategory.name}
        categoryType={inquiryCategory.type}
        pageName="Sustainability"
      />

      <Footer />
    </div>
  )
}