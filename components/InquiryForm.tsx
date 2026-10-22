// app/components/InquiryForm.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import {
  ArrowRight, Phone, Mail, Clock, Shield, CheckCircle, X, Ruler,
} from 'lucide-react'
import { DIMENSION_UNITS, DimensionUnit } from '@/lib/constants'

// ✅ FIX #1: fallback so API_URL is never undefined
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://packaging-backend.vercel.app/api'

interface CategoryOption {
  _id: string
  name: string
  type: string
}

export function InquiryForm() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    industry: '',
    boxType: '',
    quantity: '',
    length: '',
    width: '',
    depth: '',
    unit: 'in' as DimensionUnit,
    specifications: '',
    deadline: '',
    budget: '',
    message: '',
  })

  const [categories, setCategories] = useState<CategoryOption[]>([])
  const [loadingCategories, setLoadingCategories] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({})

  const industries = [
    'Electronics', 'Cosmetics & Beauty', 'Food & Beverage',
    'Pharmaceuticals', 'E-commerce', 'Retail', 'Other',
  ]

  const benefits = [
    { icon: Clock, text: 'Fast Turnaround' },
    { icon: Shield, text: 'Quality Guaranteed' },
    { icon: CheckCircle, text: 'Free Design Consultation' },
  ]

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        setLoadingCategories(true)
        const res = await axios.get(`${API_URL}/categories?isActive=true`)
        if (cancelled) return
        setCategories(res.data?.data ?? [])
      } catch (err) {
        console.error('Failed to load categories:', err)
      } finally {
        if (!cancelled) setLoadingCategories(false)
      }
    })()
    return () => { cancelled = true }
  }, [])

  // ✅ Only fullName, email, phone are required now.
  //    All other fields are optional — dimensions are only validated
  //    if the user typed something into them.
  const validateForm = () => {
    const errors: { [key: string]: string } = {}

    // --- REQUIRED ---
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      errors.fullName = 'Full name must be at least 2 characters'
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address'
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 7) {
      errors.phone = 'Phone number must be at least 7 characters'
    }

    // --- OPTIONAL: only validate dimension numbers if provided ---
    ;(['length', 'width', 'depth'] as const).forEach((k) => {
      const v = formData[k]
      if (v !== '' && (Number.isNaN(Number(v)) || Number(v) < 0)) {
        errors[k] = 'Must be a positive number'
      }
    })

    // --- OPTIONAL: deadline must be in the future if provided ---
    if (formData.deadline) {
      const picked = new Date(formData.deadline)
      if (Number.isNaN(picked.getTime()) || picked <= new Date()) {
        errors.deadline = 'Deadline must be in the future'
      }
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setLoading(true)
    setError('')

    try {
      // ✅ Build a sparse payload — only include optional fields if the
      //    user actually filled them in. This keeps the backend happy and
      //    avoids storing empty strings.
      const payload: any = {
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        unit: formData.unit, // has a default ('in') — always safe to send
      }

      if (formData.company.trim()) payload.company = formData.company.trim()
      if (formData.industry) payload.industry = formData.industry
      if (formData.boxType) payload.boxType = formData.boxType
      if (formData.quantity.trim()) {
        const q = parseInt(formData.quantity, 10)
        if (Number.isFinite(q) && q > 0) payload.quantity = q
      }
      if (formData.specifications.trim()) payload.specifications = formData.specifications.trim()
      if (formData.budget) payload.budget = formData.budget
      if (formData.message.trim()) payload.message = formData.message.trim()
      if (formData.deadline) payload.deadline = formData.deadline

      const lengthNum = formData.length.trim() !== '' ? Number(formData.length) : undefined
      const widthNum = formData.width.trim() !== '' ? Number(formData.width) : undefined
      const depthNum = formData.depth.trim() !== '' ? Number(formData.depth) : undefined
      if (lengthNum !== undefined && Number.isFinite(lengthNum)) payload.length = lengthNum
      if (widthNum !== undefined && Number.isFinite(widthNum)) payload.width = widthNum
      if (depthNum !== undefined && Number.isFinite(depthNum)) payload.depth = depthNum

      console.log('[InquiryForm] POST →', `${API_URL}/inquiries`, payload)

      const response = await axios.post(`${API_URL}/inquiries`, payload, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 10000,
      })

      console.log('[InquiryForm] response →', response.status, response.data)

      // ✅ Treat the submission as successful if the API explicitly says
      //    `success: true`, OR returns 2xx without `success: false`.
      const isSuccess =
        response.data?.success === true ||
        (response.status >= 200 && response.status < 300 && response.data?.success !== false)

      if (isSuccess) {
        setSubmitted(true)
        setFormData({
          fullName: '', email: '', phone: '', company: '', industry: '', boxType: '',
          quantity: '', length: '', width: '', depth: '', unit: 'in',
          specifications: '', deadline: '', budget: '', message: '',
        })
        router.push('/thank-you')
      } else {
        setError('Submission received but not confirmed by the server. Please try again.')
      }
    } catch (err: any) {
      console.error('Submission error:', err)
      if (err.response) {
        console.error('Server said:', err.response.status, err.response.data)
        if (err.response.data?.errors) {
          const serverErrors: { [key: string]: string } = {}
          err.response.data.errors.forEach((e: any) => { serverErrors[e.path] = e.msg })
          setValidationErrors(serverErrors)
          setError('Please fix the validation errors below.')
        } else {
          setError(err.response.data?.message || 'Failed to submit inquiry. Please try again.')
        }
      } else if (err.request) {
        setError('Cannot connect to server. Please check your connection and try again.')
      } else {
        setError('An unexpected error occurred. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const fieldClass = (fieldName: string) =>
    `w-full px-4 py-3.5 bg-white/90 backdrop-blur-sm border rounded-xl text-[#171512] placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-[#FDB022]/40 focus:border-[#FDB022] transition-all text-sm ${
      validationErrors[fieldName] ? 'border-red-500 bg-red-50' : 'border-black/10'
    }`

  const selectArrow =
    "appearance-none bg-white/90 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"12\" height=\"8\" viewBox=\"0 0 12 8\"%3E%3Cpath fill=\"%23333\" d=\"M6 8L0 0h12z\"/%3E%3C/svg%3E')] bg-[length:12px_8px] bg-[right_1rem_center] bg-no-repeat"

  return (
    <section id="inquiry" className="py-10 px-6 bg-gradient-to-b from-white to-[#F5F1E7]">
      <div className="max-w-6xl mx-auto">
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
            Tell us about your packaging needs and we&apos;ll provide customized solutions with competitive pricing.
          </p>
        </motion.div>

        <motion.div
          className="relative overflow-hidden rounded-3xl bg-white shadow-xl border border-black/5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FDB022]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FDB022]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="grid lg:grid-cols-[1.2fr_0.8fr] relative z-10">
            <form onSubmit={handleSubmit} className="p-8 md:p-10 lg:p-12">
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl text-sm flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle size={20} className="text-green-500 flex-shrink-0" />
                    Thank you! Your inquiry has been submitted successfully. Redirecting…
                  </div>
                  <button type="button" onClick={() => setSubmitted(false)} className="text-green-500 hover:text-green-700">
                    <X size={18} />
                  </button>
                </motion.div>
              )}

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
                {/* ---------------- REQUIRED FIELDS ---------------- */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={fieldClass('fullName')}
                      placeholder="Full Name *"
                      required
                    />
                    {validationErrors.fullName && <p className="text-red-500 text-xs mt-1">{validationErrors.fullName}</p>}
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={fieldClass('email')}
                      placeholder="Email Address *"
                      required
                    />
                    {validationErrors.email && <p className="text-red-500 text-xs mt-1">{validationErrors.email}</p>}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={fieldClass('phone')}
                      placeholder="Phone Number *"
                      required
                    />
                    {validationErrors.phone && <p className="text-red-500 text-xs mt-1">{validationErrors.phone}</p>}
                  </div>

                  {/* ---------------- OPTIONAL FIELDS ---------------- */}
                  <div>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className={fieldClass('company')}
                      placeholder="Company Name (optional)"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <select
                      name="industry"
                      value={formData.industry}
                      onChange={handleChange}
                      className={`${fieldClass('industry')} ${selectArrow}`}
                    >
                      <option value="">Industry (optional)</option>
                      {industries.map((ind) => <option key={ind} value={ind}>{ind}</option>)}
                    </select>
                  </div>
                  <div>
                    <select
                      name="boxType"
                      value={formData.boxType}
                      onChange={handleChange}
                      className={`${fieldClass('boxType')} ${selectArrow}`}
                      disabled={loadingCategories}
                    >
                      <option value="">
                        {loadingCategories ? 'Loading box types…' : 'Box Type (optional)'}
                      </option>
                      {categories.map((c) => (
                        <option key={c._id} value={c.name}>
                          {c.name}{c.type ? ` — ${c.type}` : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Dimensions */}
                <div className="rounded-xl border border-black/10 p-4 bg-white/60">
                  <div className="flex items-center gap-2 mb-3">
                    <Ruler size={16} className="text-[#FDB022]" />
                    <span className="text-sm font-semibold text-[#171512]">Box Dimensions (optional)</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wide text-black/50 mb-1">Length</label>
                      <input type="number" inputMode="decimal" name="length" value={formData.length} onChange={handleChange}
                        className={fieldClass('length')} placeholder="L" min="0" step="0.01" />
                      {validationErrors.length && <p className="text-red-500 text-xs mt-1">{validationErrors.length}</p>}
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wide text-black/50 mb-1">Width</label>
                      <input type="number" inputMode="decimal" name="width" value={formData.width} onChange={handleChange}
                        className={fieldClass('width')} placeholder="W" min="0" step="0.01" />
                      {validationErrors.width && <p className="text-red-500 text-xs mt-1">{validationErrors.width}</p>}
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wide text-black/50 mb-1">Depth</label>
                      <input type="number" inputMode="decimal" name="depth" value={formData.depth} onChange={handleChange}
                        className={fieldClass('depth')} placeholder="D" min="0" step="0.01" />
                      {validationErrors.depth && <p className="text-red-500 text-xs mt-1">{validationErrors.depth}</p>}
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wide text-black/50 mb-1">Unit</label>
                      <select name="unit" value={formData.unit} onChange={handleChange}
                        className={`${fieldClass('unit')} ${selectArrow}`}>
                        {DIMENSION_UNITS.map((u) => <option key={u.value} value={u.value}>{u.label}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <input type="number" name="quantity" value={formData.quantity} onChange={handleChange}
                    className={fieldClass('quantity')} placeholder="Quantity (optional)" min="1" />
                  <select name="budget" value={formData.budget} onChange={handleChange}
                    className={`${fieldClass('budget')} ${selectArrow}`}>
                    <option value="">Budget Range (optional)</option>
                    <option value="Under $500">Under $500</option>
                    <option value="$500 - $1000">$500 - $1000</option>
                    <option value="$1000 - $5000">$1000 - $5000</option>
                    <option value="$5000+">$5000+</option>
                  </select>
                  <div>
                    <input type="date" name="deadline" value={formData.deadline} onChange={handleChange}
                      className={fieldClass('deadline')} min={new Date().toISOString().split('T')[0]}
                      placeholder="Deadline (optional)" />
                    {validationErrors.deadline && <p className="text-red-500 text-xs mt-1">{validationErrors.deadline}</p>}
                  </div>
                </div>

                <div>
                  <textarea name="specifications" value={formData.specifications} onChange={handleChange}
                    className={`${fieldClass('specifications')} h-24 resize-none`}
                    placeholder="Box specifications — materials, printing requirements, etc. (optional)" />
                </div>

                <div>
                  <textarea name="message" value={formData.message} onChange={handleChange}
                    className={`${fieldClass('message')} h-20 resize-none`}
                    placeholder="Tell us more about your project... (optional)" />
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="group w-full flex items-center justify-center gap-3 bg-[#FDB022] text-[#171512] font-bold py-4 rounded-xl hover:bg-[#f5a80f] transition-all shadow-lg shadow-[#FDB022]/25 hover:shadow-[#FDB022]/40 disabled:opacity-50 disabled:cursor-not-allowed text-base"
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

                <p className="text-xs text-black/40 text-center">
                  * Full name, email, and phone number are required. All other fields are optional.
                  We&apos;ll get back to you within 24 hours.
                </p>
              </div>
            </form>

            <div className="bg-gradient-to-br from-[#171512] to-[#2a2520] p-8 md:p-10 lg:p-12 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#FDB022]/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#FDB022]/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

              <div className="relative z-10">
                <div className="w-16 h-16 bg-[#FDB022]/10 rounded-2xl flex items-center justify-center mb-6">
                  <Mail className="text-[#FDB022]" size={28} />
                </div>
                <h3 className="text-2xl font-bold text-white leading-tight mb-4">
                  Let&apos;s Create Something<br /><span className="text-[#FDB022]">Amazing Together</span>
                </h3>
                <p className="text-white/60 leading-relaxed mb-8">
                  Our packaging experts are ready to help you bring your vision to life.
                  From concept to delivery, we&apos;ve got you covered.
                </p>
                <div className="space-y-4 mb-8">
                  {benefits.map((b, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#FDB022]/10 flex items-center justify-center flex-shrink-0">
                        <b.icon size={16} className="text-[#FDB022]" />
                      </div>
                      <span className="text-white/80 text-sm">{b.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative z-10 pt-6 border-t border-white/10">
                <p className="text-white/40 text-xs uppercase tracking-wider mb-4">Contact us directly</p>
                <div className="flex flex-col gap-3">
                  <a href="tel:+12177276247" className="flex items-center gap-3 group">
                    <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white shrink-0 transition-all duration-200 group-hover:bg-[#FDB022] group-hover:scale-105">
                      <Phone size={16} />
                    </span>
                    <span className="text-white font-medium group-hover:text-[#FDB022] transition-colors">
                      +1 (217) 727-6247
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}