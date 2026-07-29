'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  ArrowRight, 
  Award, 
  Users, 
  Clock, 
  Shield, 
  Star,
  Truck,
  Package,
  Sparkles,
  Globe,
  Heart,
  Target,
  Lightbulb,
  TrendingUp,
  CheckCircle,
  MessageCircle,
  Phone,
  Mail
} from 'lucide-react'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { InquiryForm } from '@/components/InquiryForm'

// Import images
import boxImage1 from '../../../assets/images/01.webp'
import boxImage2 from '../../../assets/images/02.webp'
import boxImage3 from '../../../assets/images/03.webp'
import boxImage4 from '../../../assets/images/04.webp'
import { Testimonials } from '@/components/Testimonial'

// Company stats
const stats = [
  { icon: Package, value: '10M+', label: 'Boxes Delivered', color: '#FDB022' },
  { icon: Users, value: '500+', label: 'Happy Clients', color: '#FDB022' },
  { icon: Award, value: '98%', label: 'Satisfaction Rate', color: '#FDB022' },
  { icon: Globe, value: '50+', label: 'Countries Served', color: '#FDB022' },
]

// Core values
const values = [
  {
    icon: Heart,
    title: 'Passion for Quality',
    description: 'We pour our hearts into every box we create, ensuring premium quality in every detail.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation First',
    description: 'Constantly pushing boundaries with cutting-edge designs and sustainable materials.',
  },
  {
    icon: Target,
    title: 'Customer Focus',
    description: 'Your success is our success. We tailor every solution to your unique needs.',
  },
  {
    icon: Shield,
    title: 'Integrity Always',
    description: 'Transparent pricing, honest communication, and reliable delivery every time.',
  },
]

// Team members
const teamMembers = [
  {
    name: 'John Anderson',
    role: 'CEO & Founder',
    initial: 'JA',
    image: '/images/team/john.jpg', // Add actual image paths
  },
  {
    name: 'Sarah Mitchell',
    role: 'Head of Design',
    initial: 'SM',
    image: '/images/team/sarah.jpg',
  },
  {
    name: 'Michael Chen',
    role: 'Operations Director',
    initial: 'MC',
    image: '/images/team/michael.jpg',
  },
  {
    name: 'Priya Sharma',
    role: 'Customer Experience',
    initial: 'PS',
    image: '/images/team/priya.jpg',
  },
  {
    name: 'David Williams',
    role: 'Production Manager',
    initial: 'DW',
    image: '/images/team/david.jpg',
  },
  {
    name: 'Lisa Rodriguez',
    role: 'Quality Assurance',
    initial: 'LR',
    image: '/images/team/lisa.jpg',
  },
]

// Milestones
const milestones = [
  {
    year: '2018',
    title: 'Company Founded',
    description: 'BoxPack was born with a mission to revolutionize packaging.',
  },
  {
    year: '2019',
    title: 'First Major Client',
    description: 'Secured partnership with a national retail brand.',
  },
  {
    year: '2020',
    title: 'Expanded Operations',
    description: 'Opened second manufacturing facility to meet demand.',
  },
  {
    year: '2021',
    title: 'Sustainability Initiative',
    description: 'Launched eco-friendly packaging line.',
  },
  {
    year: '2022',
    title: 'International Expansion',
    description: 'Began serving clients in 30+ countries worldwide.',
  },
  {
    year: '2023',
    title: 'Innovation Award',
    description: 'Recognized for excellence in packaging design.',
  },
]

export default function AboutPage() {
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
                ABOUT BOXPACK
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
                Crafting Excellence in
                <br />
                <span className="text-[#FDB022]">Packaging Since 2018</span>
              </h1>
              <p className="text-xl text-white/70 max-w-3xl mx-auto mb-10">
                We're on a mission to transform the packaging industry through innovation, 
                sustainability, and unparalleled quality. Every box tells a story, and we're 
                here to help you tell yours.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="#story"
                  className="inline-flex items-center gap-2 bg-[#FDB022] text-[#171512] font-semibold px-8 py-4 rounded-xl hover:bg-[#f5a80f] transition-colors shadow-lg shadow-[#FDB022]/25"
                >
                  Our Story
                  <ArrowRight size={18} />
                </Link>
                <Link
                  href="#inquiry"
                  className="inline-flex items-center gap-2 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-colors"
                >
                  Get in Touch
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-6 bg-white border-b border-black/5">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
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

        {/* Our Story Section */}
        <section id="story" className="py-20 px-6 bg-[#F5F1E7]">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <span className="inline-flex items-center border border-[#FDB022]/30 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide text-[#FDB022] mb-4">
                  OUR STORY
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-[#171512] leading-tight mb-6">
                  From Vision to
                  <br />
                  <span className="text-[#FDB022]">Global Impact</span>
                </h2>
                <div className="space-y-4 text-black/60 leading-relaxed">
                  <p>
                    BoxPack was founded in 2018 with a simple yet powerful vision: 
                    to make high-quality, sustainable packaging accessible to businesses 
                    of all sizes. What started as a small operation has grown into a 
                    global packaging solution provider trusted by over 500 brands worldwide.
                  </p>
                  <p>
                    Our journey has been driven by a relentless commitment to innovation, 
                    quality, and customer satisfaction. We believe that great packaging 
                    does more than protect products — it tells stories, builds brands, 
                    and creates memorable experiences.
                  </p>
                  <p>
                    Today, we're proud to serve clients across 50+ countries, delivering 
                    millions of boxes annually while maintaining our promise of 
                    exceptional quality and sustainable practices.
                  </p>
                </div>
                <div className="flex items-center gap-4 mt-6">
                  <div className="flex -space-x-3">
                    {['JA', 'SM', 'MC', 'PS'].map((initial, i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-full bg-[#FDB022]/20 border-2 border-white flex items-center justify-center text-[#171512] font-semibold text-xs"
                      >
                        {initial}
                      </div>
                    ))}
                  </div>
                  <span className="text-black/50 text-sm">
                    Meet our team of experts
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-4"
              >
                <div className="space-y-4">
                  <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <Sparkles className="text-[#FDB022] mb-3" size={24} />
                    <h4 className="font-bold text-[#171512] mb-1">Innovation</h4>
                    <p className="text-black/50 text-sm">Cutting-edge designs</p>
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <Shield className="text-[#FDB022] mb-3" size={24} />
                    <h4 className="font-bold text-[#171512] mb-1">Quality</h4>
                    <p className="text-black/50 text-sm">Premium materials</p>
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <Heart className="text-[#FDB022] mb-3" size={24} />
                    <h4 className="font-bold text-[#171512] mb-1">Sustainability</h4>
                    <p className="text-black/50 text-sm">Eco-friendly options</p>
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <Users className="text-[#FDB022] mb-3" size={24} />
                    <h4 className="font-bold text-[#171512] mb-1">Community</h4>
                    <p className="text-black/50 text-sm">500+ happy clients</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Core Values Section */}
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
                OUR VALUES
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-[#171512] leading-tight mb-4">
                What Drives <span className="text-[#FDB022]">Us Forward</span>
              </h2>
              <p className="text-lg text-black/55">
                Our core values shape everything we do, from design to delivery.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-[#F5F1E7] rounded-2xl p-8 text-center hover:shadow-lg transition-shadow duration-300 group"
                >
                  <div className="w-16 h-16 rounded-full bg-[#FDB022]/10 flex items-center justify-center text-[#FDB022] mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <value.icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-[#171512] mb-3">{value.title}</h3>
                  <p className="text-black/55 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
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
                MEET THE TEAM
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-[#171512] leading-tight mb-4">
                The People Behind
                <br />
                <span className="text-[#FDB022]">Our Success</span>
              </h2>
              <p className="text-lg text-black/55">
                A passionate team of experts dedicated to bringing your packaging vision to life.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-6 text-center hover:shadow-xl transition-shadow duration-300 group"
                >
                  <div className="w-24 h-24 rounded-full bg-[#FDB022]/10 flex items-center justify-center text-[#FDB022] font-bold text-2xl mx-auto mb-4 group-hover:scale-105 transition-transform duration-300">
                    {member.initial}
                  </div>
                  <h3 className="text-lg font-bold text-[#171512]">{member.name}</h3>
                  <p className="text-black/50 text-sm">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Milestones Section */}
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
                OUR JOURNEY
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-[#171512] leading-tight mb-4">
                Key <span className="text-[#FDB022]">Milestones</span>
              </h2>
              <p className="text-lg text-black/55">
                A timeline of our growth and achievements over the years.
              </p>
            </motion.div>

            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-[#FDB022]/20 hidden md:block" />
              
              <div className="grid md:grid-cols-2 gap-8">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.year}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`relative ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:pl-12 md:col-start-2'}`}
                  >
                    <div className="bg-[#F5F1E7] rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300">
                      <div className="text-2xl font-bold text-[#FDB022] mb-2">{milestone.year}</div>
                      <h4 className="text-lg font-bold text-[#171512] mb-2">{milestone.title}</h4>
                      <p className="text-black/55 text-sm">{milestone.description}</p>
                    </div>
                    {index % 2 === 0 ? (
                      <div className="hidden md:block absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#FDB022] border-2 border-white" />
                    ) : (
                      <div className="hidden md:block absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#FDB022] border-2 border-white" />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <Testimonials />

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
                Ready to Start Your
                <br />
                <span className="text-[#FDB022]">Packaging Journey?</span>
              </h2>
              <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto">
                Join 500+ brands that trust BoxPack for their packaging needs. 
                Let's create something amazing together.
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
                  href="/services"
                  className="inline-flex items-center gap-2 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-colors"
                >
                  Explore Our Services
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