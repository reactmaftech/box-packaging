// components/QuickInquiryModal.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import {
  X, Send, CheckCircle, AlertTriangle, Loader, Package, Layers, Globe, Ruler,
} from 'lucide-react'
import { DIMENSION_UNITS, DimensionUnit } from '@/lib/constants'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://packaging-backend.vercel.app/api'

interface QuickInquiryModalProps {
  isOpen: boolean
  onClose: () => void
  categoryName: string
  categoryType: string
  pageName?: string
}

interface CategoryOption {
  _id: string
  name: string
  type: string
}

export function QuickInquiryModal({
  isOpen,
  onClose,
  categoryName,
  categoryType,
  pageName = 'Website',
}: QuickInquiryModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    boxType: '',
    quantity: '',
    length: '',
    width: '',
    depth: '',
    unit: 'in' as DimensionUnit,
    message: '',
  })

  const [categories, setCategories] = useState<CategoryOption[]>([])
  const [loadingCategories, setLoadingCategories] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    if (!isOpen) return
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
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    setFormData((prev) => ({
      ...prev,
      boxType: prev.boxType || categoryName || '',
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, categoryName])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

  // ✅ Only fullName, email, phone are required.
  //    Dimensions validated only if filled; deadline not present in this modal.
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

    // --- OPTIONAL: dimension numbers only validated if provided ---
    ;(['length', 'width', 'depth'] as const).forEach((k) => {
      const v = formData[k]
      if (v !== '' && (Number.isNaN(Number(v)) || Number(v) < 0)) {
        errors[k] = 'Must be a positive number'
      }
    })

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setLoading(true)
    setError('')

    try {
      // Preserve the contextual metadata (page/category/type) in message.
      const messageWithDetails = [
        `[Page: ${pageName}]`,
        `[Category Type: ${categoryType}]`,
        `[Category: ${categoryName}]`,
        formData.message.trim() ? `\n${formData.message.trim()}` : '',
      ].filter(Boolean).join('\n')

      // ✅ Sparse payload — only required + any optional fields the user actually filled in.
      const payload: any = {
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        unit: formData.unit,
        // Context is always attached so the admin can see where it came from.
        message: messageWithDetails,
      }

      if (formData.company.trim()) payload.company = formData.company.trim()
      // categoryType is a good default for `industry` — only set if we have one.
      if (categoryType && categoryType !== 'Other') payload.industry = categoryType
      // boxType: use user's choice, otherwise fall back to the category name.
      const chosenBox = formData.boxType || categoryName
      if (chosenBox) payload.boxType = chosenBox
      if (formData.quantity.trim()) {
        const q = parseInt(formData.quantity, 10)
        if (Number.isFinite(q) && q > 0) payload.quantity = q
      }

      const lengthNum = formData.length.trim() !== '' ? Number(formData.length) : undefined
      const widthNum = formData.width.trim() !== '' ? Number(formData.width) : undefined
      const depthNum = formData.depth.trim() !== '' ? Number(formData.depth) : undefined
      if (lengthNum !== undefined && Number.isFinite(lengthNum)) payload.length = lengthNum
      if (widthNum !== undefined && Number.isFinite(widthNum)) payload.width = widthNum
      if (depthNum !== undefined && Number.isFinite(depthNum)) payload.depth = depthNum

      console.log('[QuickInquiryModal] payload →', payload)

      const response = await axios.post(`${API_URL}/inquiries`, payload, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 10000,
      })

      const isSuccess =
        response.data?.success === true ||
        (response.status >= 200 && response.status < 300 && response.data?.success !== false)

      if (isSuccess) {
        setSubmitted(true)
        setFormData({
          fullName: '', email: '', phone: '', company: '', boxType: '',
          quantity: '', length: '', width: '', depth: '', unit: 'in', message: '',
        })
        setTimeout(() => {
          setSubmitted(false)
          onClose()
        }, 2000)
      } else {
        setError('Submission received but not confirmed by the server. Please try again.')
      }
    } catch (err: any) {
      console.error('Submission error:', err)
      if (err.response?.data?.errors) {
        const serverErrors: { [key: string]: string } = {}
        err.response.data.errors.forEach((error: any) => { serverErrors[error.path] = error.msg })
        setValidationErrors(serverErrors)
        setError('Please fix the validation errors below.')
      } else if (err.response?.data?.message) {
        setError(err.response.data.message)
      } else if (err.request) {
        setError('Cannot connect to server. Please check your connection.')
      } else {
        setError('An unexpected error occurred. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const inputClass = (fieldName: string) =>
    `w-full px-4 py-3 bg-white border rounded-xl text-[#171512] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FDB022]/40 focus:border-[#FDB022] transition-all text-sm ${
      validationErrors[fieldName] ? 'border-red-500 bg-red-50' : 'border-gray-200'
    }`

  const selectArrow =
    "appearance-none bg-white bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"12\" height=\"8\" viewBox=\"0 0 12 8\"%3E%3Cpath fill=\"%23333\" d=\"M6 8L0 0h12z\"/%3E%3C/svg%3E')] bg-[length:12px_8px] bg-[right_1rem_center] bg-no-repeat"

  const resetForm = () => {
    setFormData({
      fullName: '', email: '', phone: '', company: '', boxType: '',
      quantity: '', length: '', width: '', depth: '', unit: 'in', message: '',
    })
    setError('')
    setValidationErrors({})
    setSubmitted(false)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => { resetForm(); onClose() }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto z-10"
          >
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-5 rounded-t-2xl z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-[#171512]">Quick Inquiry</h3>
                  <p className="text-sm text-gray-500 mt-1">Get a quote for this product</p>
                </div>
                <button
                  onClick={() => { resetForm(); onClose() }}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <X size={20} className="text-gray-400" />
                </button>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-lg text-sm">
                  <Globe size={14} className="text-blue-600" />
                  <span className="font-medium text-blue-700">{pageName}</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-[#FDB022]/10 rounded-lg text-sm">
                  <Layers size={14} className="text-[#FDB022]" />
                  <span className="font-medium text-[#171512]">{categoryType}</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-[#F5F1E7] rounded-lg text-sm">
                  <Package size={14} className="text-[#171512]" />
                  <span className="font-medium text-[#171512]">{categoryName}</span>
                </div>
              </div>
            </div>

            <div className="px-6 py-5">
              <AnimatePresence>
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-4 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl flex items-center gap-3"
                  >
                    <CheckCircle size={20} className="text-green-500 flex-shrink-0" />
                    <span className="text-sm">Thank you! We&apos;ll get back to you within 24 hours.</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-3"
                  >
                    <AlertTriangle size={20} className="text-red-500 flex-shrink-0" />
                    <span className="text-sm">{error}</span>
                    <button onClick={() => setError('')} className="ml-auto text-red-500">
                      <X size={16} />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {!submitted && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* ---------------- REQUIRED ---------------- */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={inputClass('fullName')}
                      placeholder="Enter your full name"
                      required
                    />
                    {validationErrors.fullName && <p className="text-red-500 text-xs mt-1">{validationErrors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={inputClass('email')}
                      placeholder="Enter your email"
                      required
                    />
                    {validationErrors.email && <p className="text-red-500 text-xs mt-1">{validationErrors.email}</p>}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={inputClass('phone')}
                        placeholder="Enter phone number"
                        required
                      />
                      {validationErrors.phone && <p className="text-red-500 text-xs mt-1">{validationErrors.phone}</p>}
                    </div>

                    {/* ---------------- OPTIONAL ---------------- */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Company Name</label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className={inputClass('company')}
                        placeholder="Enter company name (optional)"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Box Type</label>
                    <select
                      name="boxType"
                      value={formData.boxType}
                      onChange={handleChange}
                      className={`${inputClass('boxType')} ${selectArrow}`}
                      disabled={loadingCategories}
                    >
                      <option value="">{loadingCategories ? 'Loading…' : 'Select a box type'}</option>
                      {categories.map((c) => (
                        <option key={c._id} value={c.name}>{c.name}{c.type ? ` — ${c.type}` : ''}</option>
                      ))}
                    </select>
                  </div>

                  {/* Dimensions */}
                  <div className="rounded-xl border border-gray-200 p-4 bg-gray-50/70">
                    <div className="flex items-center gap-2 mb-3">
                      <Ruler size={16} className="text-[#FDB022]" />
                      <span className="text-sm font-semibold text-gray-800">Box Dimensions (optional)</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div>
                        <label className="block text-[11px] uppercase tracking-wide text-gray-500 mb-1">Length</label>
                        <input type="number" inputMode="decimal" name="length" value={formData.length} onChange={handleChange}
                          className={inputClass('length')} placeholder="L" min="0" step="0.01" />
                        {validationErrors.length && <p className="text-red-500 text-xs mt-1">{validationErrors.length}</p>}
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase tracking-wide text-gray-500 mb-1">Width</label>
                        <input type="number" inputMode="decimal" name="width" value={formData.width} onChange={handleChange}
                          className={inputClass('width')} placeholder="W" min="0" step="0.01" />
                        {validationErrors.width && <p className="text-red-500 text-xs mt-1">{validationErrors.width}</p>}
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase tracking-wide text-gray-500 mb-1">Depth</label>
                        <input type="number" inputMode="decimal" name="depth" value={formData.depth} onChange={handleChange}
                          className={inputClass('depth')} placeholder="D" min="0" step="0.01" />
                        {validationErrors.depth && <p className="text-red-500 text-xs mt-1">{validationErrors.depth}</p>}
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase tracking-wide text-gray-500 mb-1">Unit</label>
                        <select name="unit" value={formData.unit} onChange={handleChange}
                          className={`${inputClass('unit')} ${selectArrow}`}>
                          {DIMENSION_UNITS.map((u) => <option key={u.value} value={u.value}>{u.label}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Quantity (Optional)</label>
                    <input type="number" name="quantity" value={formData.quantity} onChange={handleChange}
                      className={inputClass('quantity')} placeholder="Enter quantity needed" min="1" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Additional Message (Optional)</label>
                    <textarea name="message" value={formData.message} onChange={handleChange}
                      rows={3} className={`${inputClass('message')} resize-none`}
                      placeholder="Tell us more about your requirements..." />
                    <p className="text-xs text-gray-400 mt-1">
                      Category and page info will be automatically included in your inquiry.
                    </p>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-3 bg-[#FDB022] text-[#171512] font-bold py-3.5 rounded-xl hover:bg-[#f5a80f] transition-all shadow-lg shadow-[#FDB022]/25 hover:shadow-[#FDB022]/40 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <Loader size={18} className="animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Submit Inquiry
                      </>
                    )}
                  </motion.button>

                  <p className="text-xs text-gray-400 text-center">
                    * Full name, email, and phone number are required. All other fields are optional.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}