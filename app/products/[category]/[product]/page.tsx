// app/products/[category]/[product]/page.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import {
  Loader, Package, ChevronLeft, ChevronRight, ArrowLeft, ArrowRight,
  CheckCircle, X, Truck, Palette, Clock, ShieldCheck, Layers,
  Maximize2, Phone, MessageCircle
} from 'lucide-react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { categoryHref, productHref } from '@/lib/slug'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://packaging-backend.vercel.app/api'

interface Product {
  _id: string
  title: string
  slug?: string
  description: string
  images: string[]
  category: string
  price?: number
  isActive: boolean
  createdBy?: { _id: string; name: string }
  createdAt: string
  updatedAt: string
}

// Same shape the site-wide InquiryForm posts, so /api/inquiries needs no change.
interface FormData {
  fullName: string
  email: string
  phone: string
  company: string
  industry: string
  boxType: string
  quantity: string
  specifications: string
  deadline: string
  budget: string
  message: string
}

const EMPTY_FORM: FormData = {
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
}

const INDUSTRIES = [
  'Electronics',
  'Cosmetics & Beauty',
  'Food & Beverage',
  'Pharmaceuticals',
  'E-commerce',
  'Retail',
  'Other',
]

const BOX_TYPES = [
  'Rigid Boxes',
  'Kraft Boxes',
  'Corrugated Boxes',
  'Mylar Bags',
  'Gable Boxes',
  'Pillow Boxes',
  'Mailer Boxes',
  'Custom',
  'Other',
]

const BUDGETS = ['Under $500', '$500 - $1000', '$1000 - $5000', '$5000+']

const TRUST_ITEMS = [
  { icon: Truck, title: 'Free shipping', copy: 'Included on every order' },
  { icon: Clock, title: '8–10 business days', copy: 'Standard turnaround' },
  { icon: Palette, title: 'Free design support', copy: 'Dieline and 3D mockup' },
  { icon: ShieldCheck, title: 'No die charges', copy: 'Custom sizes at no extra cost' },
]

/** Best guess at a box type from the product's category, so the select starts sensibly. */
function guessBoxType(category: string): string {
  const c = (category || '').toLowerCase()
  const exact = BOX_TYPES.find(t => t.toLowerCase() === c)
  if (exact) return exact
  const partial = BOX_TYPES.find(t => {
    const keyword = t.toLowerCase().replace(/ (boxes|bags)$/, '')
    return keyword !== 'custom' && keyword !== 'other' && c.includes(keyword)
  })
  return partial || 'Custom'
}

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()

  const productSlug = (params?.product as string) || ''
  const categorySlug = (params?.category as string) || ''

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [related, setRelated] = useState<Product[]>([])

  const [activeImage, setActiveImage] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [zoom, setZoom] = useState({ on: false, x: 50, y: 50 })

  const [tab, setTab] = useState<'description' | 'specs' | 'shipping'>('description')

  // Form
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formError, setFormError] = useState('')
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({})
  const formRef = useRef<HTMLDivElement>(null)

  const today = new Date().toISOString().split('T')[0]

  /* ---------------------------- data ---------------------------- */

  useEffect(() => {
    if (!productSlug || !categorySlug) {
      setError('That product link is not valid.')
      setLoading(false)
      return
    }
    fetchProduct()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productSlug, categorySlug])

  const fetchProduct = async () => {
    try {
      setLoading(true)
      setError('')

      const res = await fetch(
        `${API_URL}/products/by-slug/${encodeURIComponent(categorySlug)}/${encodeURIComponent(productSlug)}`,
        { headers: { 'Content-Type': 'application/json' } }
      )

      if (!res.ok) {
        setError(res.status === 404
          ? 'This product is no longer available.'
          : 'We could not load this product.')
        return
      }

      const json = await res.json()
      const item: Product = json?.data ?? json

      if (!item?._id) {
        setError('We could not load this product.')
        return
      }

      setProduct(item)
      setActiveImage(0)
      prefillForm(item)

      // Keep the URL canonical if the title changed since the link was made
      const canonical = productHref(item)
      if (typeof window !== 'undefined' && window.location.pathname !== canonical) {
        router.replace(canonical)
      }

      fetchRelated(item._id)
    } catch (err) {
      console.error('Error fetching product:', err)
      setError('We could not load this product. Check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  const fetchRelated = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/products/${id}/related?limit=4`)
      if (!res.ok) return
      const json = await res.json()
      setRelated(json?.data ?? [])
    } catch {
      // Related products are a nice-to-have
    }
  }

  // Start the form off knowing which product it's about. Both fields stay editable.
  const prefillForm = (item: Product) => {
    setFormData({
      ...EMPTY_FORM,
      boxType: guessBoxType(item.category),
      specifications: `Product: ${item.title} (${item.category})\n`,
    })
  }

  /* --------------------------- gallery --------------------------- */

  const images = product?.images?.length ? product.images : []
  const hasImages = images.length > 0

  const nextImage = () => setActiveImage(i => (i + 1) % images.length)
  const prevImage = () => setActiveImage(i => (i - 1 + images.length) % images.length)

  const handleZoomMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setZoom({
      on: true,
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }

  useEffect(() => {
    if (!lightboxOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false)
      if (e.key === 'ArrowRight' && images.length > 1) nextImage()
      if (e.key === 'ArrowLeft' && images.length > 1) prevImage()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxOpen, images.length])

  /* ----------------------------- form ---------------------------- */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
  }

  const validateForm = () => {
    const errors: { [key: string]: string } = {}

    if (!formData.fullName || formData.fullName.trim().length < 2) {
      errors.fullName = 'Full name must be at least 2 characters'
    }
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address'
    }
    if (!formData.phone || formData.phone.trim().length < 7) {
      errors.phone = 'Phone number must be at least 7 characters'
    }
    if (!formData.company) {
      errors.company = 'Company name is required'
    }
    if (!formData.industry) {
      errors.industry = 'Please select an industry'
    }
    if (!formData.boxType) {
      errors.boxType = 'Please select a box type'
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setSubmitting(true)
    setFormError('')

    try {
      const submissionData = {
        ...formData,
        quantity: formData.quantity ? parseInt(formData.quantity, 10) : undefined,
        deadline: formData.deadline || undefined,
      }

      const response = await axios.post(`${API_URL}/inquiries`, submissionData, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 10000,
      })

      if (response.data.success) {
        setSubmitted(true)
        if (product) prefillForm(product)
      } else {
        setFormError('Failed to submit inquiry. Please try again.')
      }
    } catch (err: any) {
      console.error('Submission error:', err)

      if (err.response) {
        if (err.response.data?.errors) {
          const serverErrors: { [key: string]: string } = {}
          err.response.data.errors.forEach((e: any) => {
            serverErrors[e.path] = e.msg
          })
          setValidationErrors(serverErrors)
          setFormError('Please fix the highlighted fields below.')
        } else {
          setFormError(err.response.data?.message || 'Failed to submit inquiry. Please try again.')
        }
      } else if (err.request) {
        setFormError('Cannot connect to the server. Check your connection and try again.')
      } else {
        setFormError('An unexpected error occurred. Please try again.')
      }
    } finally {
      setSubmitting(false)
    }
  }

  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })

  const fieldClass = (name: string) =>
    `w-full px-4 py-3 bg-white border rounded-xl text-[#171512] placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-[#FDB022]/40 focus:border-[#FDB022] transition-all text-sm ${
      validationErrors[name] ? 'border-red-500 bg-red-50' : 'border-black/10'
    }`

  const selectArrow =
    'appearance-none bg-[url(\'data:image/svg+xml;charset=utf-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8"%3E%3Cpath fill="%23333" d="M6 8L0 0h12z"/%3E%3C/svg%3E\')] bg-[length:12px_8px] bg-[right_1rem_center] bg-no-repeat'

  /* --------------------------- states ---------------------------- */

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-40 pb-32 text-center">
          <Loader size={40} className="mx-auto animate-spin text-gray-400 mb-4" />
          <p className="text-gray-500">Loading product…</p>
        </div>
        <Footer />
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-40 pb-32 text-center px-6">
          <Package size={56} className="mx-auto text-gray-300 mb-4" />
          <h1 className="text-2xl font-bold text-[#171512] mb-2">Product unavailable</h1>
          <p className="text-gray-500 mb-8">{error || 'We could not find this product.'}</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={fetchProduct}
              className="px-6 py-2.5 bg-[#171512] text-white rounded-full text-sm font-medium hover:bg-black transition-colors"
            >
              Try again
            </button>
            <Link
              href={`/products/${categorySlug}`}
              className="px-6 py-2.5 bg-[#FDB022] text-[#171512] rounded-full text-sm font-semibold hover:bg-[#f5a80f] transition-colors"
            >
              Back to category
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const plainDescription = product.description?.replace(/<[^>]*>/g, '').trim() || ''

  /* ----------------------------- page ---------------------------- */

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-[#171512] pt-28 pb-5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 text-sm text-white/50 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-white transition-colors">Products</Link>
            <span>/</span>
            <Link href={categoryHref(product.category)} className="hover:text-white transition-colors">
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-[#FDB022] font-medium truncate max-w-[220px]">{product.title}</span>
          </div>
        </div>
      </div>

      {/* Hero: gallery left, quote form right */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-10 md:py-14">
          <Link
            href={categoryHref(product.category)}
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#171512] transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Back to {product.category}
          </Link>

          <div className="grid lg:grid-cols-2 gap-10 xl:gap-14">
            {/* -------- Gallery -------- */}
            <div className="lg:sticky lg:top-28 lg:self-start">
              <div
                className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#F5F1E7] border border-black/[0.06] group"
                onMouseMove={hasImages ? handleZoomMove : undefined}
                onMouseLeave={() => setZoom(z => ({ ...z, on: false }))}
              >
                {hasImages ? (
                  <>
                    <img
                      src={images[activeImage]}
                      alt={`${product.title} — image ${activeImage + 1}`}
                      className="w-full h-full object-cover transition-transform duration-200 ease-out"
                      style={{
                        transform: zoom.on ? 'scale(1.9)' : 'scale(1)',
                        transformOrigin: `${zoom.x}% ${zoom.y}%`,
                      }}
                      onError={(e) => { (e.target as HTMLImageElement).style.visibility = 'hidden' }}
                    />

                    <button
                      onClick={() => setLightboxOpen(true)}
                      aria-label="Open full size image"
                      className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center text-gray-700 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity"
                    >
                      <Maximize2 size={16} />
                    </button>

                    {images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          aria-label="Previous image"
                          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center text-gray-700 hover:bg-white transition-colors"
                        >
                          <ChevronLeft size={20} />
                        </button>
                        <button
                          onClick={nextImage}
                          aria-label="Next image"
                          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center text-gray-700 hover:bg-white transition-colors"
                        >
                          <ChevronRight size={20} />
                        </button>
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/55 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs">
                          {activeImage + 1} / {images.length}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#F5F1E7] to-[#EDE5D8]">
                    <Package size={64} className="text-[#D4C5A9] mb-3" />
                    <p className="text-sm text-[#8a7f6b]">No image for this product yet</p>
                  </div>
                )}
              </div>

              {images.length > 1 && (
                <div className="grid grid-cols-5 gap-3 mt-4">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      aria-label={`Show image ${idx + 1}`}
                      className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                        idx === activeImage
                          ? 'border-[#FDB022] ring-2 ring-[#FDB022]/25'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={img}
                        alt=""
                        className="w-full h-full object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                      />
                    </button>
                  ))}
                </div>
              )}

              {hasImages && (
                <p className="hidden lg:block text-xs text-gray-400 mt-3">
                  Hover the image to zoom, or click the corner icon for full size.
                </p>
              )}

              {/* Contact shortcuts under the gallery */}
              <div className="mt-6 rounded-2xl bg-gradient-to-br from-[#171512] to-[#2a2520] p-5">
                <p className="text-white/40 text-xs uppercase tracking-wider mb-4">Contact us directly</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a href="tel:+18000000" className="flex items-center gap-3 group">
                    <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white shrink-0 transition-all duration-200 group-hover:bg-[#FDB022] group-hover:scale-105">
                      <Phone size={16} />
                    </span>
                    <span className="text-white text-sm font-medium group-hover:text-[#FDB022] transition-colors">
                      (800) 000-1234
                    </span>
                  </a>
                  <a href="https://wa.me/100000000" className="flex items-center gap-3 group">
                    <span className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center text-white shrink-0 transition-all duration-200 group-hover:scale-105">
                      <MessageCircle size={16} />
                    </span>
                    <span className="text-white text-sm font-medium group-hover:text-[#25D366] transition-colors">
                      Chat on WhatsApp
                    </span>
                  </a>
                </div>
              </div>
            </div>

            {/* -------- Details + full inquiry form -------- */}
            <div>
              <Link
                href={categoryHref(product.category)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5F1E7] text-[#8a7554] text-xs font-semibold hover:bg-[#EDE5D8] transition-colors"
              >
                <Layers size={12} />
                {product.category}
              </Link>

              <h1 className="text-3xl md:text-4xl font-bold text-[#171512] mt-4 leading-tight">
                {product.title}
              </h1>

              {product.price !== undefined && (
                <div className="flex items-baseline gap-2 mt-4">
                  <span className="text-3xl font-bold text-[#171512]">${product.price.toFixed(2)}</span>
                  <span className="text-sm text-gray-500">starting price per unit</span>
                </div>
              )}

              {plainDescription && (
                <p className="text-gray-600 leading-relaxed mt-5 max-w-[62ch]">
                  {plainDescription.substring(0, 260)}
                  {plainDescription.length > 260 ? '…' : ''}
                </p>
              )}

              <div className="grid grid-cols-2 gap-3 mt-7">
                {TRUST_ITEMS.map(item => (
                  <div key={item.title} className="flex items-start gap-2.5">
                    <span className="w-8 h-8 rounded-lg bg-[#FDB022]/12 flex items-center justify-center shrink-0 mt-0.5">
                      <item.icon size={15} className="text-[#c98b0c]" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[#171512] leading-tight">{item.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{item.copy}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* ---------- Form ---------- */}
              <div
                ref={formRef}
                id="quote"
                className="mt-8 bg-white rounded-2xl border border-gray-200 shadow-lg shadow-black/[0.04] overflow-hidden scroll-mt-28"
              >
                <div className="bg-gradient-to-br from-[#171512] to-[#2a2520] px-6 py-5">
                  <h2 className="text-lg font-bold text-white">Request your free quote</h2>
                  <p className="text-sm text-white/55 mt-1">
                    Tell us about your requirements and we&apos;ll get back to you within 24 hours.
                  </p>
                </div>

                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-8 text-center"
                    >
                      <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle size={28} className="text-green-600" />
                      </div>
                      <h3 className="text-lg font-bold text-[#171512] mb-2">Inquiry submitted</h3>
                      <p className="text-sm text-gray-600 max-w-sm mx-auto">
                        We have your details for <span className="font-medium text-[#171512]">{product.title}</span> and
                        will email you pricing within 24 hours.
                      </p>
                      <button
                        onClick={() => setSubmitted(false)}
                        className="mt-6 px-6 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Send another inquiry
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      onSubmit={handleSubmit}
                      className="p-6 space-y-4"
                    >
                      {formError && (
                        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm flex items-start justify-between gap-3">
                          <span>{formError}</span>
                          <button
                            type="button"
                            onClick={() => setFormError('')}
                            className="text-red-500 hover:text-red-700 shrink-0"
                          >
                            <X size={18} />
                          </button>
                        </div>
                      )}

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            className={fieldClass('fullName')}
                            placeholder="Full Name *"
                          />
                          {validationErrors.fullName && (
                            <p className="text-red-500 text-xs mt-1">{validationErrors.fullName}</p>
                          )}
                        </div>
                        <div>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={fieldClass('email')}
                            placeholder="Email Address *"
                          />
                          {validationErrors.email && (
                            <p className="text-red-500 text-xs mt-1">{validationErrors.email}</p>
                          )}
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
                          />
                          {validationErrors.phone && (
                            <p className="text-red-500 text-xs mt-1">{validationErrors.phone}</p>
                          )}
                        </div>
                        <div>
                          <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            className={fieldClass('company')}
                            placeholder="Company Name *"
                          />
                          {validationErrors.company && (
                            <p className="text-red-500 text-xs mt-1">{validationErrors.company}</p>
                          )}
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
                            <option value="">Industry *</option>
                            {INDUSTRIES.map(ind => (
                              <option key={ind} value={ind}>{ind}</option>
                            ))}
                          </select>
                          {validationErrors.industry && (
                            <p className="text-red-500 text-xs mt-1">{validationErrors.industry}</p>
                          )}
                        </div>
                        <div>
                          <select
                            name="boxType"
                            value={formData.boxType}
                            onChange={handleChange}
                            className={`${fieldClass('boxType')} ${selectArrow}`}
                          >
                            <option value="">Box Type *</option>
                            {BOX_TYPES.map(type => (
                              <option key={type} value={type}>{type}</option>
                            ))}
                          </select>
                          {validationErrors.boxType && (
                            <p className="text-red-500 text-xs mt-1">{validationErrors.boxType}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-3 gap-4">
                        <input
                          type="number"
                          name="quantity"
                          value={formData.quantity}
                          onChange={handleChange}
                          className={fieldClass('quantity')}
                          placeholder="Quantity"
                          min="1"
                        />
                        <select
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className={`${fieldClass('budget')} ${selectArrow}`}
                        >
                          <option value="">Budget Range</option>
                          {BUDGETS.map(b => (
                            <option key={b} value={b}>{b}</option>
                          ))}
                        </select>
                        <input
                          type="date"
                          name="deadline"
                          value={formData.deadline}
                          onChange={handleChange}
                          className={fieldClass('deadline')}
                          min={today}
                        />
                      </div>

                      <div>
                        <textarea
                          name="specifications"
                          value={formData.specifications}
                          onChange={handleChange}
                          className={`${fieldClass('specifications')} h-24 resize-none`}
                          placeholder="Box specifications — dimensions, materials, printing requirements, etc."
                        />
                        {validationErrors.specifications && (
                          <p className="text-red-500 text-xs mt-1">{validationErrors.specifications}</p>
                        )}
                      </div>

                      <div>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          className={`${fieldClass('message')} h-20 resize-none`}
                          placeholder="Tell us more about your project..."
                        />
                        {validationErrors.message && (
                          <p className="text-red-500 text-xs mt-1">{validationErrors.message}</p>
                        )}
                      </div>

                      <motion.button
                        type="submit"
                        disabled={submitting}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        className="group w-full flex items-center justify-center gap-3 bg-[#FDB022] text-[#171512] font-bold py-4 rounded-xl hover:bg-[#f5a80f] transition-all shadow-lg shadow-[#FDB022]/25 hover:shadow-[#FDB022]/40 disabled:opacity-50 disabled:cursor-not-allowed text-base"
                      >
                        {submitting ? (
                          <span className="flex items-center gap-2">
                            <span className="w-5 h-5 border-2 border-[#171512]/30 border-t-[#171512] rounded-full animate-spin" />
                            Submitting…
                          </span>
                        ) : (
                          <>
                            Get Your Free Quote
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </motion.button>

                      <p className="text-xs text-black/40 text-center">
                        * Required fields. We&apos;ll get back to you within 24 hours.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-14 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-1 border-b border-gray-200 mb-8 overflow-x-auto no-scrollbar">
            {([
              ['description', 'Description'],
              ['specs', 'Specifications'],
              ['shipping', 'Shipping and turnaround'],
            ] as const).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`px-5 py-3 text-sm font-semibold whitespace-nowrap border-b-2 -mb-px transition-colors ${
                  tab === key
                    ? 'border-[#FDB022] text-[#171512]'
                    : 'border-transparent text-gray-500 hover:text-[#171512]'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
            {tab === 'description' && (
              product.description ? (
                <div
                  className="prose prose-sm md:prose-base max-w-[70ch] text-gray-700 leading-relaxed [&_h1]:text-[#171512] [&_h2]:text-[#171512] [&_h3]:text-[#171512] [&_a]:text-[#c98b0c] [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              ) : (
                <p className="text-gray-500">No description has been added for this product yet.</p>
              )
            )}

            {tab === 'specs' && (
              <dl className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl">
                <SpecRow label="Category" value={product.category} />
                <SpecRow label="Availability" value={product.isActive ? 'In production' : 'Currently paused'} />
                <SpecRow label="Minimum order" value="100 units" />
                <SpecRow label="Printing" value="Offset, digital, screen" />
                <SpecRow label="Finishing" value="Matte, gloss, soft touch, spot UV" />
                <SpecRow label="Stock options" value="Cardboard, corrugated, rigid, kraft" />
                {product.price !== undefined && (
                  <SpecRow label="Starting price" value={`$${product.price.toFixed(2)} per unit`} />
                )}
                <SpecRow label="Product images" value={`${images.length}`} />
              </dl>
            )}

            {tab === 'shipping' && (
              <div className="max-w-[70ch] space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Standard production runs 8–10 business days from artwork approval. Rush production is
                  available on most stocks — add your deadline to the form and we&apos;ll confirm what&apos;s
                  possible.
                </p>
                <p>
                  Shipping is free to the continental US on every order, with tracking sent by email once
                  your run leaves the plant. International delivery is quoted per destination.
                </p>
                <p>
                  You&apos;ll receive a free dieline and 3D mockup for approval before anything goes to
                  press, so nothing is printed until you&apos;ve signed off.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="pb-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#171512]">More in {product.category}</h2>
              <Link
                href={categoryHref(product.category)}
                className="text-sm font-medium text-[#c98b0c] hover:text-[#171512] transition-colors"
              >
                View all
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map(item => (
                <Link
                  key={item._id}
                  href={productHref(item)}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow overflow-hidden group"
                >
                  <div className="relative h-44 bg-[#F5F1E7] overflow-hidden">
                    {item.images?.[0] ? (
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package size={36} className="text-[#D4C5A9]" />
                      </div>
                    )}
                    {item.price !== undefined && (
                      <span className="absolute top-3 right-3 bg-[#FDB022] text-[#171512] px-2.5 py-1 rounded-full text-xs font-bold">
                        ${item.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-[#171512] line-clamp-1">{item.title}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                      {item.description?.replace(/<[^>]*>/g, '').substring(0, 90)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Mobile bar */}
      {!submitted && (
        <div className="lg:hidden sticky bottom-0 z-40 bg-white/95 backdrop-blur-sm border-t border-gray-200 px-4 py-3 flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-[#171512] truncate">{product.title}</p>
            <p className="text-xs text-gray-500">
              {product.price !== undefined ? `From $${product.price.toFixed(2)}` : 'Custom pricing'}
            </p>
          </div>
          <button
            onClick={scrollToForm}
            className="px-5 py-2.5 bg-[#FDB022] text-[#171512] rounded-xl font-bold text-sm shrink-0"
          >
            Get a quote
          </button>
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && hasImages && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              aria-label="Close"
              className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
              <X size={22} />
            </button>

            <img
              src={images[activeImage]}
              alt={product.title}
              className="max-h-[85vh] max-w-full object-contain rounded-xl"
              onClick={(e) => e.stopPropagation()}
            />

            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prevImage() }}
                  aria-label="Previous image"
                  className="absolute left-5 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); nextImage() }}
                  aria-label="Next image"
                  className="absolute right-5 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                >
                  <ChevronRight size={24} />
                </button>
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm">
                  {activeImage + 1} / {images.length}
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  )
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gray-50 rounded-xl p-4">
      <dt className="text-xs text-gray-500 mb-1">{label}</dt>
      <dd className="font-semibold text-[#171512] text-sm">{value}</dd>
    </div>
  )
}