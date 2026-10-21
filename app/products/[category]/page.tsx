// app/products/[category]/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Search, Loader, X, Eye, MessageSquare, Package,
  Grid3X3, List, ArrowLeft, RefreshCw, Layers,
  ArrowRight,
  CheckCircle,
  Ruler
} from 'lucide-react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { QuickInquiryModal } from '@/components/QuickInquiryModal'
import { productHref, matchCategoryBySlug, unslugify } from '@/lib/slug'
import { FAQ } from '@/components/Faq'
import { PackagingContentSections } from '@/components/PackagingContentSections'
import { DIMENSION_UNITS, DimensionUnit } from '@/lib/constants'
import axios from 'axios'

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
  createdAt: string
  updatedAt: string
}

interface Category {
  _id: string
  name: string
  type: string
  description?: string
  image?: string
  isActive: boolean
}

interface CategoryOption {
  _id: string
  name: string
  type: string
}

export default function CategoryProductsPage() {
  const params = useParams()
  const router = useRouter()

  // Support both old URL shape (/products/<category>) and new flat URL (/<slug>).
  // When this page is rendered via app/[slug]/page.tsx, params will be { slug: ... }
  // instead of { category: ... }.
  const rawParams = params as Record<string, string | undefined>
  const categorySlug = (rawParams.category || rawParams.slug || '') as string

  const [category, setCategory] = useState<Category | null>(null)
  const [categoryName, setCategoryName] = useState('')

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('-createdAt')

  const [inquiryModalOpen, setInquiryModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<{ name: string; type: string }>({
    name: '',
    type: '',
  })

  // ===== Hero Inquiry Form State =====
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
    deadline: '',
    budget: '',
    message: '',
  })
  const [categories, setCategories] = useState<CategoryOption[]>([])
  const [loadingCategories, setLoadingCategories] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formLoading, setFormLoading] = useState(false)
  const [formError, setFormError] = useState('')
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({})

  const industries = [
    'Electronics', 'Cosmetics & Beauty', 'Food & Beverage',
    'Pharmaceuticals', 'E-commerce', 'Retail', 'Other',
  ]

  useEffect(() => {
    if (categorySlug) resolveCategory(categorySlug)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categorySlug])

  useEffect(() => {
    if (categoryName) fetchProducts(categoryName)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryName, sortBy])

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

  const resolveCategory = async (slug: string) => {
    try {
      setLoading(true)
      setError('')

      const res = await fetch(`${API_URL}/categories?isActive=true`)
      if (!res.ok) {
        setError('We could not load this category.')
        setLoading(false)
        return
      }

      const json = await res.json()
      const list: Category[] = json?.data ?? (Array.isArray(json) ? json : [])
      const match = matchCategoryBySlug(list, slug)

      if (!match) {
        setError(`We could not find a category called "${unslugify(slug)}".`)
        setLoading(false)
        return
      }

      setCategory(match)
      setCategoryName(match.name)
    } catch (err) {
      console.error('Error resolving category:', err)
      setError('We could not load this category. Check your connection and try again.')
      setLoading(false)
    }
  }

  const fetchProducts = async (name: string) => {
    try {
      setLoading(true)
      setError('')

      const res = await fetch(
        `${API_URL}/products?category=${encodeURIComponent(name)}&isActive=true&sortBy=${sortBy}&limit=100`
      )

      if (res.ok) {
        const json = await res.json()
        setProducts(json?.data ?? [])
      } else {
        setError('We could not load products for this category.')
      }
    } catch (err) {
      console.error('Error fetching products:', err)
      setError('We could not load products. Check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  const goToProduct = (product: Product, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    router.push(productHref(product))
  }

  const openInquiry = (product: Product, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setSelectedProduct({ name: product.title, type: product.category })
    setInquiryModalOpen(true)
  }

  const filteredProducts = products.filter(product => {
    const q = searchTerm.toLowerCase()
    return (
      product.title.toLowerCase().includes(q) ||
      product.description.toLowerCase().includes(q)
    )
  })

  const displayName = categoryName || unslugify(categorySlug)

  // ===== Inquiry form helpers =====
  const validateForm = () => {
    const errors: { [key: string]: string } = {}
    if (!formData.fullName || formData.fullName.length < 2) errors.fullName = 'Full name must be at least 2 characters'
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = 'Please enter a valid email address'
    if (!formData.phone || formData.phone.length < 7) errors.phone = 'Phone number must be at least 7 characters'
    if (!formData.company) errors.company = 'Company name is required'
    if (!formData.industry) errors.industry = 'Please select an industry'
    if (!formData.boxType) errors.boxType = 'Please select a box type'
    ;(['length', 'width', 'depth'] as const).forEach((k) => {
      const v = formData[k]
      if (v !== '' && (Number.isNaN(Number(v)) || Number(v) < 0)) errors[k] = 'Must be a positive number'
    })
    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setFormLoading(true)
    setFormError('')

    try {
      const lengthNum = formData.length.trim() !== '' ? Number(formData.length) : undefined
      const widthNum = formData.width.trim() !== '' ? Number(formData.width) : undefined
      const depthNum = formData.depth.trim() !== '' ? Number(formData.depth) : undefined

      const payload: any = {
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        company: formData.company.trim(),
        industry: formData.industry,
        boxType: formData.boxType,
        quantity: formData.quantity ? parseInt(formData.quantity) : undefined,
        deadline: formData.deadline || undefined,
        budget: formData.budget,
        message: formData.message,
        unit: formData.unit,
      }
      if (lengthNum !== undefined && Number.isFinite(lengthNum)) payload.length = lengthNum
      if (widthNum !== undefined && Number.isFinite(widthNum)) payload.width = widthNum
      if (depthNum !== undefined && Number.isFinite(depthNum)) payload.depth = depthNum

      const response = await axios.post(`${API_URL}/inquiries`, payload, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 10000,
      })

      if (response.data.success) {
        setSubmitted(true)
        setFormData({
          fullName: '', email: '', phone: '', company: '', industry: '', boxType: '',
          quantity: '', length: '', width: '', depth: '', unit: 'in',
          deadline: '', budget: '', message: '',
        })
        setTimeout(() => setSubmitted(false), 5000)
      }
    } catch (err: any) {
      if (err.response?.data?.errors) {
        const serverErrors: { [key: string]: string } = {}
        err.response.data.errors.forEach((error: any) => { serverErrors[error.path] = error.msg })
        setValidationErrors(serverErrors)
        setFormError('Please fix the validation errors below.')
      } else if (err.response?.data?.message) {
        setFormError(err.response.data.message)
      } else {
        setFormError('Failed to submit inquiry. Please try again.')
      }
    } finally {
      setFormLoading(false)
    }
  }

  const fieldClass = (fieldName: string) =>
    `w-full px-3 py-2 bg-white border rounded-lg text-[#171512] placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-[#FDB022]/40 focus:border-[#FDB022] transition-all text-sm ${
      validationErrors[fieldName] ? 'border-red-500 bg-red-50' : 'border-gray-200'
    }`

  const selectArrow =
    "appearance-none bg-white bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"12\" height=\"8\" viewBox=\"0 0 12 8\"%3E%3Cpath fill=\"%23333\" d=\"M6 8L0 0h12z\"/%3E%3C/svg%3E')] bg-[length:10px_7px] bg-[right_0.6rem_center] bg-no-repeat pr-7"

  const labelClass = "block text-[10px] font-semibold uppercase tracking-wide text-black/50 mb-1"

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero - Light Theme with Compact Inquiry Form */}
      <section className="relative bg-gradient-to-br from-[#FAF8F5] via-[#F5F1E7] to-[#EDE5D8] pt-28 pb-14 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #171512 1px, transparent 1px), radial-gradient(circle at 75% 75%, #171512 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FDB022]/15 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#FDB022]/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            {/* Left: Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-5">
                <Link href="/" className="hover:text-[#171512] transition-colors">Home</Link>
                <span>/</span>
                <Link href="/products" className="hover:text-[#171512] transition-colors">Products</Link>
                <span>/</span>
                <span className="text-[#FDB022] font-semibold capitalize">{displayName}</span>
              </div>

              <span className="inline-flex items-center border border-[#FDB022]/40 bg-[#FDB022]/10 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide text-[#B8860B] mb-4">
                <Layers size={14} className="mr-2" />
                {category?.type || 'CATEGORY'}
              </span>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 capitalize text-[#171512]">
                {displayName}
              </h1>

              <p className="text-lg text-gray-600 max-w-xl mb-6 leading-relaxed">
                {category?.description
                  || `Explore our ${displayName.toLowerCase()} collection. High-quality custom packaging solutions designed to meet your specific needs.`}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/quote"
                  className="inline-flex items-center gap-2 bg-[#FDB022] text-[#171512] font-semibold px-6 py-3 rounded-lg hover:bg-[#f5a80f] transition-colors shadow-lg shadow-[#FDB022]/25"
                >
                  Request a Quote
                  <ArrowRight size={18} />
                </Link>
              </div>

              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500">
                <span className="flex items-center gap-1.5"><CheckCircle size={14} className="text-[#FDB022]" /> Free quotes</span>
                <span className="flex items-center gap-1.5"><CheckCircle size={14} className="text-[#FDB022]" /> 24h response</span>
                <span className="flex items-center gap-1.5"><CheckCircle size={14} className="text-[#FDB022]" /> Custom sizes</span>
              </div>
            </motion.div>

            {/* Right: Compact Inquiry Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative"
            >
              <div className="relative bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <form onSubmit={handleSubmit} className="p-4 md:p-5">
                  {submitted && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-3 p-2.5 bg-green-50 border border-green-200 text-green-700 rounded-lg text-xs flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                        Thank you! Your inquiry has been submitted.
                      </div>
                      <button type="button" onClick={() => setSubmitted(false)} className="text-green-500 hover:text-green-700">
                        <X size={14} />
                      </button>
                    </motion.div>
                  )}

                  {formError && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-3 p-2.5 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs flex items-center justify-between"
                    >
                      <span>{formError}</span>
                      <button type="button" onClick={() => setFormError('')} className="text-red-500 hover:text-red-700">
                        <X size={14} />
                      </button>
                    </motion.div>
                  )}

                  <div className="space-y-2.5">
                    {/* Row 1: Name, Email, Phone */}
                    <div className="grid grid-cols-3 gap-2.5">
                      <div>
                        <label className={labelClass}>Full Name *</label>
                        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange}
                          className={fieldClass('fullName')} placeholder="John Doe" />
                        {validationErrors.fullName && <p className="text-red-500 text-[10px] mt-0.5">{validationErrors.fullName}</p>}
                      </div>
                      <div>
                        <label className={labelClass}>Email *</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange}
                          className={fieldClass('email')} placeholder="you@company.com" />
                        {validationErrors.email && <p className="text-red-500 text-[10px] mt-0.5">{validationErrors.email}</p>}
                      </div>
                      <div>
                        <label className={labelClass}>Phone *</label>
                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                          className={fieldClass('phone')} placeholder="+1 555 000 0000" />
                        {validationErrors.phone && <p className="text-red-500 text-[10px] mt-0.5">{validationErrors.phone}</p>}
                      </div>
                    </div>

                    {/* Row 2: Company, Industry, Box Type */}
                    <div className="grid grid-cols-3 gap-2.5">
                      <div>
                        <label className={labelClass}>Company *</label>
                        <input type="text" name="company" value={formData.company} onChange={handleChange}
                          className={fieldClass('company')} placeholder="Company Inc." />
                        {validationErrors.company && <p className="text-red-500 text-[10px] mt-0.5">{validationErrors.company}</p>}
                      </div>
                      <div>
                        <label className={labelClass}>Industry *</label>
                        <select name="industry" value={formData.industry} onChange={handleChange}
                          className={`${fieldClass('industry')} ${selectArrow}`}>
                          <option value="">Select</option>
                          {industries.map((ind) => <option key={ind} value={ind}>{ind}</option>)}
                        </select>
                        {validationErrors.industry && <p className="text-red-500 text-[10px] mt-0.5">{validationErrors.industry}</p>}
                      </div>
                      <div>
                        <label className={labelClass}>Box Type *</label>
                        <select name="boxType" value={formData.boxType} onChange={handleChange}
                          className={`${fieldClass('boxType')} ${selectArrow}`} disabled={loadingCategories}>
                          <option value="">{loadingCategories ? 'Loading…' : 'Select'}</option>
                          {categories.map((c) => (
                            <option key={c._id} value={c.name}>{c.name}</option>
                          ))}
                        </select>
                        {validationErrors.boxType && <p className="text-red-500 text-[10px] mt-0.5">{validationErrors.boxType}</p>}
                      </div>
                    </div>

                    {/* Row 3: Dimensions L / W / D / Unit */}
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <Ruler size={12} className="text-[#FDB022]" />
                        <span className="text-[10px] font-semibold uppercase tracking-wide text-black/50">Box Dimensions (optional)</span>
                      </div>
                      <div className="grid grid-cols-4 gap-2.5">
                        <div>
                          <input type="number" inputMode="decimal" name="length" value={formData.length} onChange={handleChange}
                            className={fieldClass('length')} placeholder="Length" min="0" step="0.01" />
                          {validationErrors.length && <p className="text-red-500 text-[10px] mt-0.5">{validationErrors.length}</p>}
                        </div>
                        <div>
                          <input type="number" inputMode="decimal" name="width" value={formData.width} onChange={handleChange}
                            className={fieldClass('width')} placeholder="Width" min="0" step="0.01" />
                          {validationErrors.width && <p className="text-red-500 text-[10px] mt-0.5">{validationErrors.width}</p>}
                        </div>
                        <div>
                          <input type="number" inputMode="decimal" name="depth" value={formData.depth} onChange={handleChange}
                            className={fieldClass('depth')} placeholder="Depth" min="0" step="0.01" />
                          {validationErrors.depth && <p className="text-red-500 text-[10px] mt-0.5">{validationErrors.depth}</p>}
                        </div>
                        <div>
                          <select name="unit" value={formData.unit} onChange={handleChange}
                            className={`${fieldClass('unit')} ${selectArrow}`}>
                            {DIMENSION_UNITS.map((u) => <option key={u.value} value={u.value}>{u.label}</option>)}
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Row 4: Quantity, Budget, Deadline */}
                    <div className="grid grid-cols-3 gap-2.5">
                      <div>
                        <label className={labelClass}>Quantity</label>
                        <input type="number" name="quantity" value={formData.quantity} onChange={handleChange}
                          className={fieldClass('quantity')} placeholder="e.g. 1000" min="1" />
                      </div>
                      <div>
                        <label className={labelClass}>Budget</label>
                        <select name="budget" value={formData.budget} onChange={handleChange}
                          className={`${fieldClass('budget')} ${selectArrow}`}>
                          <option value="">Select</option>
                          <option value="Under $500">Under $500</option>
                          <option value="$500 - $1000">$500 - $1000</option>
                          <option value="$1000 - $5000">$1000 - $5000</option>
                          <option value="$5000+">$5000+</option>
                        </select>
                      </div>
                      <div>
                        <label className={labelClass}>Deadline</label>
                        <input type="date" name="deadline" value={formData.deadline} onChange={handleChange}
                          className={fieldClass('deadline')} min={new Date().toISOString().split('T')[0]} />
                      </div>
                    </div>

                    {/* Row 5: Message (full width) */}
                    <div>
                      <label className={labelClass}>Message</label>
                      <textarea name="message" value={formData.message} onChange={handleChange}
                        className={`${fieldClass('message')} h-14 resize-none`}
                        placeholder="Tell us about your project…" />
                    </div>

                    {/* Row 6: Submit button — full width, single line */}
                    <motion.button
                      type="submit"
                      disabled={formLoading}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="group w-full flex items-center justify-center gap-2 bg-[#FDB022] text-[#171512] font-bold py-2.5 rounded-lg hover:bg-[#f5a80f] transition-all shadow-md shadow-[#FDB022]/25 disabled:opacity-50 disabled:cursor-not-allowed text-sm whitespace-nowrap"
                    >
                      {formLoading ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-[#171512]/30 border-t-[#171512] rounded-full animate-spin" />
                          Sending…
                        </span>
                      ) : (
                        <>
                          Get Quote
                          <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Toolbar */}
      <section className="py-6 px-6 bg-white border-b sticky top-[72px] z-30 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/products" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowLeft size={20} className="text-gray-600" />
              </Link>

              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder={`Search in ${displayName}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FDB022]/50 text-sm"
                />
                {searchTerm && (
                  <button onClick={() => setSearchTerm('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FDB022]/50"
              >
                <option value="-createdAt">Newest first</option>
                <option value="createdAt">Oldest first</option>
                <option value="title">Name A–Z</option>
                <option value="-title">Name Z–A</option>
                <option value="price">Price low to high</option>
                <option value="-price">Price high to low</option>
              </select>

              <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
                <button onClick={() => setViewMode('grid')}
                  className={`p-2.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow-md' : 'hover:bg-white/50'}`}>
                  <Grid3X3 size={18} className="text-gray-600" />
                </button>
                <button onClick={() => setViewMode('list')}
                  className={`p-2.5 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow-md' : 'hover:bg-white/50'}`}>
                  <List size={18} className="text-gray-600" />
                </button>
              </div>

              <button onClick={() => categoryName && fetchProducts(categoryName)}
                className="p-2.5 hover:bg-gray-100 rounded-lg transition-colors" title="Refresh">
                <RefreshCw size={18} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center py-20">
              <Loader size={40} className="mx-auto animate-spin text-gray-400 mb-4" />
              <p className="text-gray-500">Loading products…</p>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <Package size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">{error}</p>
              <div className="flex flex-wrap gap-3 justify-center mt-4">
                <button onClick={() => resolveCategory(categorySlug)}
                  className="px-6 py-2 bg-[#171512] text-white rounded-full text-sm font-medium">
                  Try again
                </button>
                <Link href="/products"
                  className="px-6 py-2 bg-[#FDB022] text-[#171512] rounded-full text-sm font-semibold">
                  Browse all categories
                </Link>
              </div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <Package size={64} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg font-medium">
                {searchTerm ? 'No products match your search' : `No products found in ${displayName}`}
              </p>
              <p className="text-gray-400 text-sm mt-1">
                {searchTerm ? 'Try different search terms' : 'Check back soon for new products'}
              </p>
              {searchTerm && (
                <button onClick={() => setSearchTerm('')}
                  className="mt-4 px-6 py-2 bg-[#FDB022] text-[#171512] rounded-full text-sm font-semibold">
                  Clear search
                </button>
              )}
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(index, 8) * 0.04 }}
                >
                  <Link
                    href={productHref(product)}
                    className="block bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow border border-gray-100 overflow-hidden group"
                  >
                    <div className="relative h-56 bg-gray-100 overflow-hidden">
                      {product.images?.length ? (
                        <img
                          src={product.images[0]}
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" fill="%23F5F1E7"><rect width="400" height="300"/></svg>'
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#F5F1E7] to-[#EDE5D8]">
                          <Package size={48} className="text-[#D4C5A9]" />
                        </div>
                      )}

                      {product.price !== undefined && (
                        <div className="absolute top-3 right-3 bg-[#FDB022] text-[#171512] px-3 py-1.5 rounded-full text-sm font-bold shadow-sm">
                          ${product.price.toFixed(2)}
                        </div>
                      )}

                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                        <span className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 bg-white text-[#171512] px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg">
                          <Eye size={16} /> View details
                        </span>
                      </div>
                    </div>

                    <div className="p-5">
                      <h3 className="font-bold text-gray-900 mb-2 line-clamp-1">{product.title}</h3>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {product.description?.replace(/<[^>]*>/g, '').substring(0, 120)}
                      </p>

                      <div className="flex gap-2">
                        <button
                          onClick={(e) => goToProduct(product, e)}
                          className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-[#171512] text-white rounded-xl text-sm font-semibold hover:bg-black transition-colors"
                        >
                          <Eye size={14} /> View details
                        </button>
                        <button
                          onClick={(e) => openInquiry(product, e)}
                          className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-[#FDB022] text-[#171512] rounded-xl text-sm font-semibold hover:bg-[#f5a80f] transition-colors"
                        >
                          <MessageSquare size={14} /> Get quote
                        </button>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: Math.min(index, 8) * 0.03 }}
                >
                  <Link
                    href={productHref(product)}
                    className="bg-white rounded-2xl shadow-md border border-gray-100 p-4 flex flex-col sm:flex-row gap-4 hover:shadow-lg transition-shadow group"
                  >
                    <div className="relative w-full sm:w-48 h-40 sm:h-36 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                      {product.images?.length ? (
                        <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package size={32} className="text-gray-300" />
                        </div>
                      )}
                      {product.price !== undefined && (
                        <div className="absolute top-2 right-2 bg-[#FDB022] text-[#171512] px-2 py-1 rounded-full text-xs font-bold">
                          ${product.price.toFixed(2)}
                        </div>
                      )}
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">{product.title}</h3>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                          {product.description?.replace(/<[^>]*>/g, '').substring(0, 200)}
                        </p>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <button onClick={(e) => goToProduct(product, e)}
                          className="flex items-center gap-2 px-4 py-2 bg-[#171512] text-white rounded-lg text-sm font-semibold hover:bg-black">
                          <Eye size={14} /> View details
                        </button>
                        <button onClick={(e) => openInquiry(product, e)}
                          className="flex items-center gap-2 px-4 py-2 bg-[#FDB022] text-[#171512] rounded-lg text-sm font-semibold hover:bg-[#f5a80f]">
                          <MessageSquare size={14} /> Get quote
                        </button>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          {!loading && filteredProducts.length > 0 && (
            <p className="text-center text-xs text-gray-400 mt-8">
              Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} in {displayName}
            </p>
          )}
        </div>
      </section>

      <PackagingContentSections />

      <FAQ />

      <QuickInquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        categoryName={selectedProduct.name}
        categoryType={selectedProduct.type}
        pageName={`Category - ${displayName}`}
      />

      <Footer />
    </div>
  )
}