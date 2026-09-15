'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import axios from 'axios'
import { ArrowRight, CheckCircle, X } from 'lucide-react'

// 1. IMPORT YOUR IMAGE HERE
// Replace with your actual image path
import quoteImage from "../assets/images/pr-bulk.jpg" 

const API_URL = process.env.NEXT_PUBLIC_API_URL

export function InstantQuote() {
  // --- Form State & Logic (Extracted from InquiryForm) ---
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    industry: '',
    boxType: '',
    quantity: '',
    specifications: '',
    deadline: '',
    budget: '',
    message: '',
  })

  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({})

  const industries = [
    'Electronics', 'Cosmetics & Beauty', 'Food & Beverage', 
    'Pharmaceuticals', 'E-commerce', 'Retail', 'Other'
  ]

  const boxTypes = [
    'Rigid Boxes', 'Kraft Boxes', 'Corrugated Boxes', 'Mylar Bags', 
    'Gable Boxes', 'Pillow Boxes', 'Mailer Boxes', 'Custom', 'Other'
  ]

  const validateForm = () => {
    const errors: {[key: string]: string} = {}
    if (!formData.fullName || formData.fullName.length < 2) errors.fullName = 'Full name must be at least 2 characters'
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = 'Please enter a valid email address'
    if (!formData.phone || formData.phone.length < 7) errors.phone = 'Phone number must be at least 7 characters'
    if (!formData.company) errors.company = 'Company name is required'
    if (!formData.industry) errors.industry = 'Please select an industry'
    if (!formData.boxType) errors.boxType = 'Please select a box type'
    
    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    
    setLoading(true)
    setError('')

    try {
      const submissionData = {
        ...formData,
        quantity: formData.quantity ? parseInt(formData.quantity) : undefined,
        deadline: formData.deadline || undefined,
      }

      const response = await axios.post(`${API_URL}/inquiries`, submissionData, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 10000,
      })

      if (response.data.success) {
        setSubmitted(true)
        setFormData({
          fullName: '', email: '', phone: '', company: '', industry: '', 
          boxType: '', quantity: '', specifications: '', deadline: '', budget: '', message: ''
        })
        setTimeout(() => setSubmitted(false), 5000)
      }
    } catch (err: any) {
      if (err.response?.data?.errors) {
        const serverErrors: {[key: string]: string} = {}
        err.response.data.errors.forEach((error: any) => {
          serverErrors[error.path] = error.msg
        })
        setValidationErrors(serverErrors)
        setError('Please fix the validation errors below.')
      } else if (err.response?.data?.message) {
        setError(err.response.data.message)
      } else {
        setError('Failed to submit inquiry. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const fieldClass = (fieldName: string) => 
    `w-full px-4 py-3.5 bg-white/90 backdrop-blur-sm border rounded-xl text-[#171512] placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-[#FDB022]/40 focus:border-[#FDB022] transition-all text-sm ${
      validationErrors[fieldName] ? 'border-red-500 bg-red-50' : 'border-black/10'
    }`
  // --- End Form Logic ---

  return (
    <section className="py-16 px-6 bg-gradient-to-b from-white to-[#F5F1E7] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center border border-[#FDB022]/30 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide text-[#FDB022] mb-4">
            GET STARTED
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#171512] leading-tight mb-4">
            Request Your Free Quote
          </h2>
          <p className="text-lg text-black/55 max-w-2xl mx-auto">
            Tell us about your packaging needs and we'll provide customized solutions with competitive pricing.
          </p>
        </motion.div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          
          {/* LEFT SIDE: IMAGE */}
          <motion.div
            className="relative w-full h-[400px] lg:h-[800px] rounded-3xl overflow-hidden shadow-xl border border-black/5"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Image 
              src={quoteImage} 
              alt="Custom packaging solutions" 
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>

          {/* RIGHT SIDE: INQUIRY FORM */}
          <motion.div
            className="relative overflow-hidden rounded-3xl bg-white shadow-xl border border-black/5 p-6 md:p-8 lg:p-10"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            {/* Decorative elements inside form card */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#FDB022]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            
            <form onSubmit={handleSubmit} className="relative z-10">
              {/* Success message */}
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl text-sm flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle size={20} className="text-green-500 flex-shrink-0" />
                    Thank you! Your inquiry has been submitted successfully.
                  </div>
                  <button type="button" onClick={() => setSubmitted(false)} className="text-green-500 hover:text-green-700">
                    <X size={18} />
                  </button>
                </motion.div>
              )}

              {/* Error message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm flex items-center justify-between"
                >
                  <span>{error}</span>
                  <button type="button" onClick={() => setError('')} className="text-red-500 hover:text-red-700">
                    <X size={18} />
                  </button>
                </motion.div>
              )}

              <div className="space-y-4">
                {/* Row 1 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className={fieldClass('fullName')} placeholder="Full Name *" />
                    {validationErrors.fullName && <p className="text-red-500 text-xs mt-1">{validationErrors.fullName}</p>}
                  </div>
                  <div>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className={fieldClass('email')} placeholder="Email Address *" />
                    {validationErrors.email && <p className="text-red-500 text-xs mt-1">{validationErrors.email}</p>}
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={fieldClass('phone')} placeholder="Phone Number *" />
                    {validationErrors.phone && <p className="text-red-500 text-xs mt-1">{validationErrors.phone}</p>}
                  </div>
                  <div>
                    <input type="text" name="company" value={formData.company} onChange={handleChange} className={fieldClass('company')} placeholder="Company Name *" />
                    {validationErrors.company && <p className="text-red-500 text-xs mt-1">{validationErrors.company}</p>}
                  </div>
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <select name="industry" value={formData.industry} onChange={handleChange} className={`${fieldClass('industry')} appearance-none bg-white/90`}>
                      <option value="">Industry *</option>
                      {industries.map((ind) => <option key={ind} value={ind}>{ind}</option>)}
                    </select>
                    {validationErrors.industry && <p className="text-red-500 text-xs mt-1">{validationErrors.industry}</p>}
                  </div>
                  <div>
                    <select name="boxType" value={formData.boxType} onChange={handleChange} className={`${fieldClass('boxType')} appearance-none bg-white/90`}>
                      <option value="">Box Type *</option>
                      {boxTypes.map((type) => <option key={type} value={type}>{type}</option>)}
                    </select>
                    {validationErrors.boxType && <p className="text-red-500 text-xs mt-1">{validationErrors.boxType}</p>}
                  </div>
                </div>

                {/* Row 4 - Stacked for narrower column */}
                <div className="grid grid-cols-1 gap-4">
                  <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} className={fieldClass('quantity')} placeholder="Quantity" min="1" />
                  <select name="budget" value={formData.budget} onChange={handleChange} className={`${fieldClass('budget')} appearance-none bg-white/90`}>
                    <option value="">Budget Range</option>
                    <option value="Under $500">Under $500</option>
                    <option value="$500 - $1000">$500 - $1000</option>
                    <option value="$1000 - $5000">$1000 - $5000</option>
                    <option value="$5000+">$5000+</option>
                  </select>
                  <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} className={fieldClass('deadline')} min={new Date().toISOString().split('T')[0]} />
                </div>

                {/* Text Areas */}
                <div>
                  <textarea name="specifications" value={formData.specifications} onChange={handleChange} className={`${fieldClass('specifications')} h-24 resize-none`} placeholder="Box specifications — dimensions, materials, printing requirements, etc." />
                </div>
                <div>
                  <textarea name="message" value={formData.message} onChange={handleChange} className={`${fieldClass('message')} h-20 resize-none`} placeholder="Tell us more about your project..." />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="group w-full flex items-center justify-center gap-3 bg-[#FDB022] text-[#171512] font-bold py-4 rounded-xl hover:bg-[#f5a80f] transition-all shadow-lg shadow-[#FDB022]/25 hover:shadow-[#FDB022]/40 disabled:opacity-50 disabled:cursor-not-allowed text-base mt-6"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-5 h-5 border-2 border-[#171512]/30 border-t-[#171512] rounded-full animate-spin" />
                      Submitting...
                    </span>
                  ) : (
                    <>
                      Get Your Free Quote
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </motion.button>

                <p className="text-xs text-black/40 text-center pt-2">
                  * Required fields. We'll get back to you within 24 hours.
                </p>
              </div>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  )
}