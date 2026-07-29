// components/QuickInquiryModal.tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import { X, Send, CheckCircle, AlertTriangle, Loader, Package, Tag, Layers, Globe } from 'lucide-react'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://packaging-backend.vercel.app/api'

interface QuickInquiryModalProps {
  isOpen: boolean
  onClose: () => void
  categoryName: string
  categoryType: string
  pageName?: string // NEW: Page name where inquiry was submitted
}

export function QuickInquiryModal({ isOpen, onClose, categoryName, categoryType, pageName = 'Website' }: QuickInquiryModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    quantity: '',
    message: '',
  })

  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  const validateForm = () => {
    const errors: {[key: string]: string} = {}
    
    if (!formData.fullName || formData.fullName.length < 2) {
      errors.fullName = 'Full name must be at least 2 characters'
    }
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address'
    }
    if (!formData.phone || formData.phone.length < 7) {
      errors.phone = 'Phone number must be at least 7 characters'
    }
    if (!formData.company) {
      errors.company = 'Company name is required'
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
      // Build the message with category info and page name
      const messageWithDetails = [
        `[Page: ${pageName}]`,
        `[Category Type: ${categoryType}]`,
        `[Category: ${categoryName}]`,
        formData.message ? `\n${formData.message}` : ''
      ].filter(Boolean).join('\n')

      const submissionData = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        industry: categoryType,
        boxType: categoryName,
        quantity: formData.quantity ? parseInt(formData.quantity) : undefined,
        message: messageWithDetails,
        budget: '',
        specifications: `Submitted from: ${pageName} page`,
        deadline: undefined,
      }

      console.log('Submitting quick inquiry:', submissionData)

      const response = await axios.post(`${API_URL}/inquiries`, submissionData, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000,
      })

      if (response.data.success) {
        setSubmitted(true)
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          company: '',
          quantity: '',
          message: '',
        })
        setTimeout(() => {
          setSubmitted(false)
          onClose()
        }, 2000)
      }
    } catch (err: any) {
      console.error('Submission error:', err)
      
      if (err.response?.data?.errors) {
        const serverErrors: {[key: string]: string} = {}
        err.response.data.errors.forEach((error: any) => {
          serverErrors[error.path] = error.msg
        })
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

  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      company: '',
      quantity: '',
      message: '',
    })
    setError('')
    setValidationErrors({})
    setSubmitted(false)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => {
              resetForm()
              onClose()
            }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto z-10"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-5 rounded-t-2xl z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-[#171512]">Quick Inquiry</h3>
                  <p className="text-sm text-gray-500 mt-1">Get a quote for this product</p>
                </div>
                <button
                  onClick={() => {
                    resetForm()
                    onClose()
                  }}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <X size={20} className="text-gray-400" />
                </button>
              </div>

              {/* Selected Category Info */}
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

            {/* Form */}
            <div className="px-6 py-5">
              {/* Success Message */}
              <AnimatePresence>
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-4 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl flex items-center gap-3"
                  >
                    <CheckCircle size={20} className="text-green-500 flex-shrink-0" />
                    <span className="text-sm">Thank you! We'll get back to you within 24 hours.</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Error Message */}
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
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={inputClass('fullName')}
                      placeholder="Enter your full name"
                    />
                    {validationErrors.fullName && (
                      <p className="text-red-500 text-xs mt-1">{validationErrors.fullName}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={inputClass('email')}
                      placeholder="Enter your email"
                    />
                    {validationErrors.email && (
                      <p className="text-red-500 text-xs mt-1">{validationErrors.email}</p>
                    )}
                  </div>

                  {/* Phone & Company */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={inputClass('phone')}
                        placeholder="Enter phone number"
                      />
                      {validationErrors.phone && (
                        <p className="text-red-500 text-xs mt-1">{validationErrors.phone}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className={inputClass('company')}
                        placeholder="Enter company name"
                      />
                      {validationErrors.company && (
                        <p className="text-red-500 text-xs mt-1">{validationErrors.company}</p>
                      )}
                    </div>
                  </div>

                  {/* Quantity */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Quantity (Optional)
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      className={inputClass('quantity')}
                      placeholder="Enter quantity needed"
                      min="1"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Additional Message (Optional)
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={3}
                      className={`${inputClass('message')} resize-none`}
                      placeholder="Tell us more about your requirements..."
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      Category and page info will be automatically included in your inquiry.
                    </p>
                  </div>

                  {/* Submit Button */}
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
                    * Required fields. We'll respond within 24 hours.
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