// app/contact/page.tsx (Frontend/Public)
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Phone, Mail, Clock, Send, CheckCircle,
  MessageSquare, ArrowRight,
  Globe, Star, Shield, Truck, HeartHandshake
} from 'lucide-react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

// Contact details
const PHONE_NUMBER = '+12177276247'
const PHONE_DISPLAY = '+1 (217) 727-6247'
const EMAIL_ADDRESS = 'info@slickcustomboxes.com'
const SITE_NAME = 'Slick Custom Boxes'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
  })

  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const errors: { [key: string]: string } = {}

    if (!formData.fullName || formData.fullName.length < 2) {
      errors.fullName = 'Full name must be at least 2 characters'
    }
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address'
    }
    if (!formData.phone || formData.phone.length < 7) {
      errors.phone = 'Phone number must be at least 7 characters'
    }
    if (!formData.subject) {
      errors.subject = 'Please select a subject'
    }
    if (!formData.message || formData.message.length < 10) {
      errors.message = 'Message must be at least 10 characters'
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)
    setError('')

    try {
      const submissionData = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        company: formData.company || 'N/A',
        industry: 'Contact Form',
        boxType: formData.subject,
        message: formData.message,
        specifications: `Submitted from Contact Page - Subject: ${formData.subject}`,
        budget: '',
        quantity: undefined,
        deadline: undefined,
      }

      const response = await fetch(`${API_URL}/inquiries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      })

      if (response.ok) {
        setSubmitted(true)
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          company: '',
          subject: '',
          message: '',
        })
        setTimeout(() => setSubmitted(false), 5000)
      } else {
        const data = await response.json()
        setError(data.message || 'Failed to send message. Please try again.')
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputClass = (fieldName: string) =>
    `w-full px-4 py-3.5 bg-white border rounded-xl text-[#171512] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FDB022]/40 focus:border-[#FDB022] transition-all text-sm ${
      validationErrors[fieldName] ? 'border-red-500 bg-red-50' : 'border-gray-200'
    }`

  const contactInfo = [
    {
      icon: Phone,
      title: 'Call Us',
      details: [PHONE_DISPLAY],
      // description: 'Mon-Fri from 8am to 6pm',
      bgColor: 'bg-[#F5F1E7]',
      iconBg: 'bg-[#FDB022]/15',
      iconColor: 'text-[#FDB022]',
      href: `tel:${PHONE_NUMBER}`,
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: [EMAIL_ADDRESS],
      // description: 'We reply within 24 hours',
      bgColor: 'bg-[#F5F1E7]',
      iconBg: 'bg-[#FDB022]/15',
      iconColor: 'text-[#FDB022]',
      href: `mailto:${EMAIL_ADDRESS}`,
    },
    {
      icon: Clock,
      title: 'Working Hours',
      details: ['Monday - Friday'],
      bgColor: 'bg-[#F5F1E7]',
      iconBg: 'bg-[#FDB022]/15',
      iconColor: 'text-[#FDB022]',
    },
    {
      icon: Globe,
      title: 'Online',
      details: ['Quote requests'],
      // description: 'Submit anytime',
      bgColor: 'bg-[#F5F1E7]',
      iconBg: 'bg-[#FDB022]/15',
      iconColor: 'text-[#FDB022]',
    },
  ]

  const subjects = [
    'General Inquiry',
    'Custom Packaging Quote',
    'Order Status',
    'Design Services',
    'Partnership Opportunity',
    'Technical Support',
    'Sustainability Questions',
    'Other',
  ]

  const whyChooseUs = [
    {
      icon: Shield,
      title: 'Quality Guaranteed',
      description: '100% satisfaction guaranteed on all our packaging products'
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Quick turnaround times with reliable shipping options'
    },
    {
      icon: Star,
      title: 'Expert Support',
      description: 'Dedicated team ready to help with your packaging needs'
    },
    {
      icon: HeartHandshake,
      title: 'Trusted Partner',
      description: 'Serving thousands of happy customers worldwide'
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#171512] to-[#2a2520] text-white pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #FDB022 1px, transparent 1px), radial-gradient(circle at 75% 75%, #FDB022 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FDB022]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FDB022]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="inline-flex items-center border border-[#FDB022]/30 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide text-[#FDB022] mb-4">
              <MessageSquare size={14} className="mr-2" />
              GET IN TOUCH
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Contact Us
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Have a question or ready to start your packaging project?
              We&apos;re here to help. Reach out to our team and we&apos;ll respond within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 px-6 bg-white -mt-10 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => {
              const CardWrapper: any = info.href ? 'a' : 'div'
              const wrapperProps = info.href
                ? { href: info.href, className: 'block' }
                : {}

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <CardWrapper
                    {...wrapperProps}
                    className={`${info.bgColor} rounded-2xl p-6 border border-black/[0.04] hover:shadow-xl transition-all block`}
                  >
                    <div className={`w-12 h-12 ${info.iconBg} rounded-xl flex items-center justify-center mb-4`}>
                      <info.icon size={24} className={info.iconColor} />
                    </div>
                    <h3 className="font-bold text-[#171512] mb-2">{info.title}</h3>
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-[#171512]/75 text-sm break-words">{detail}</p>
                    ))}
                    <p className="text-xs text-black/45 mt-2">{info.description}</p>
                  </CardWrapper>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Main Content: Form + Info */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_400px] gap-10">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-md border border-gray-100 p-8"
            >
              <h2 className="text-2xl font-bold text-[#171512] mb-2">Send Us a Message</h2>
              <p className="text-gray-600 mb-8">Fill out the form below and we&apos;ll get back to you within 24 hours.</p>

              {/* Success Message */}
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl flex items-center gap-3"
                >
                  <CheckCircle size={20} className="text-green-500 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Message Sent Successfully!</p>
                    <p className="text-sm">Thank you for contacting us. We&apos;ll get back to you within 24 hours.</p>
                  </div>
                </motion.div>
              )}

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl"
                >
                  {error}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={inputClass('fullName')}
                      placeholder="John Doe"
                    />
                    {validationErrors.fullName && (
                      <p className="text-red-500 text-xs mt-1">{validationErrors.fullName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={inputClass('email')}
                      placeholder="john@company.com"
                    />
                    {validationErrors.email && (
                      <p className="text-red-500 text-xs mt-1">{validationErrors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={inputClass('phone')}
                      placeholder="(555) 123-4567"
                    />
                    {validationErrors.phone && (
                      <p className="text-red-500 text-xs mt-1">{validationErrors.phone}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Company Name</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className={inputClass('company')}
                      placeholder="Your Company Ltd."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Subject *</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`${inputClass('subject')} appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"12\" height=\"8\" viewBox=\"0 0 12 8\"%3E%3Cpath fill=\"%23333\" d=\"M6 8L0 0h12z\"/%3E%3C/svg%3E')] bg-[length:12px_8px] bg-[right_1rem_center] bg-no-repeat`}
                  >
                    <option value="">Select a subject</option>
                    {subjects.map(subject => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                  {validationErrors.subject && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors.subject}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className={`${inputClass('message')} resize-none`}
                    placeholder="Tell us about your project or question..."
                  />
                  {validationErrors.message && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors.message}</p>
                  )}
                  <p className="text-xs text-gray-400 mt-1">Minimum 10 characters</p>
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-3 bg-[#FDB022] text-[#171512] font-bold py-4 rounded-xl hover:bg-[#f5a80f] transition-all shadow-lg shadow-[#FDB022]/25 hover:shadow-[#FDB022]/40 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <span className="w-5 h-5 border-2 border-[#171512]/30 border-t-[#171512] rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Contact */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-br from-[#171512] to-[#2a2520] rounded-2xl p-8 text-white"
              >
                <h3 className="text-xl font-bold mb-4">Need a Quick Quote?</h3>
                <p className="text-white/60 text-sm mb-6">
                  Get instant pricing for your custom packaging project. Our team is ready to help!
                </p>
                <Link
                  href="/get-a-quote"
                  className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-[#FDB022] text-[#171512] font-bold rounded-xl hover:bg-[#f5a80f] transition-all"
                >
                  Get Instant Quote
                  <ArrowRight size={18} />
                </Link>
              </motion.div>

              {/* Why Choose Us */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl shadow-md border border-gray-100 p-6"
              >
                <h3 className="text-lg font-bold text-[#171512] mb-4">Why Choose {SITE_NAME}?</h3>
                <div className="space-y-4">
                  {whyChooseUs.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-[#FDB022]/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                        <item.icon size={16} className="text-[#FDB022]" />
                      </div>
                      <div>
                        <p className="font-medium text-[#171512] text-sm">{item.title}</p>
                        <p className="text-xs text-gray-500">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Direct Contact */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-[#F5F1E7] rounded-2xl p-6"
              >
                <h3 className="text-lg font-bold text-[#171512] mb-4">Reach us directly</h3>
                <div className="space-y-3">
                  <a
                    href={`tel:${PHONE_NUMBER}`}
                    className="flex items-center gap-3 group"
                  >
                    <span className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#171512] shrink-0 group-hover:bg-[#FDB022] transition-colors">
                      <Phone size={16} />
                    </span>
                    <span className="text-sm font-medium text-[#171512] group-hover:text-[#FDB022] transition-colors">
                      {PHONE_DISPLAY}
                    </span>
                  </a>
                  <a
                    href={`mailto:${EMAIL_ADDRESS}`}
                    className="flex items-center gap-3 group"
                  >
                    <span className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#171512] shrink-0 group-hover:bg-[#FDB022] transition-colors">
                      <Mail size={16} />
                    </span>
                    <span className="text-sm font-medium text-[#171512] group-hover:text-[#FDB022] transition-colors break-all">
                      {EMAIL_ADDRESS}
                    </span>
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Quick Links */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center border border-[#FDB022]/30 rounded-full px-4 py-1.5 text-xs font-semibold text-[#FDB022] mb-4">
              HELP CENTER
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#171512] mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 mb-8 max-w-xl mx-auto">
              Find quick answers to common questions about our services, turnaround times, and pricing.
            </p>
            <Link
              href="/faqs"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#FDB022] text-[#171512] font-bold rounded-xl hover:bg-[#f5a80f] transition-all shadow-lg shadow-[#FDB022]/25"
            >
              Visit FAQ Page
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}