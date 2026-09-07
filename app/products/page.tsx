// app/products/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Search, Package, Loader, X, Grid3X3, List,
  MessageSquare, Layers, ArrowRight, RefreshCw, Eye
} from 'lucide-react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { QuickInquiryModal } from '@/components/QuickInquiryModal'
import { categoryHref, slugify } from '@/lib/slug'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://packaging-backend.vercel.app/api'

interface Category {
  _id: string
  name: string
  type: string
  description?: string
  image?: string
  isActive: boolean
}

export default function ProductsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [categoryTypes, setCategoryTypes] = useState<string[]>([])
  const [retryCount, setRetryCount] = useState(0)

  const [modalOpen, setModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<{ name: string; type: string }>({
    name: '',
    type: '',
  })

  // Old links looked like /products?category=Custom%20Corrugated%20Boxes
  // Redirect them to the clean slug URL so nothing bookmarked breaks.
  useEffect(() => {
    const legacy = searchParams?.get('category')
    if (legacy) router.replace(categoryHref(legacy))
  }, [searchParams, router])

  useEffect(() => {
    fetchCategories()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [retryCount])

  const fetchCategories = async () => {
    try {
      setLoading(true)
      setError('')

      const response = await fetch(`${API_URL}/categories?isActive=true`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })

      if (response.ok) {
        const responseData = await response.json()

        let cats: Category[] = []
        if (responseData.success && Array.isArray(responseData.data)) {
          cats = responseData.data
        } else if (Array.isArray(responseData.data)) {
          cats = responseData.data
        } else if (Array.isArray(responseData)) {
          cats = responseData
        }

        const activeCategories = cats.filter(
          cat => cat.isActive === true || cat.isActive === undefined
        )

        setCategories(activeCategories)
        setCategoryTypes([...new Set(activeCategories.map(cat => cat.type))].sort())
        return
      }

      if (response.status === 503) {
        setError('The service is temporarily unavailable. Try again in a moment.')
        return
      }

      // Fall back to the active-only endpoint
      const activeRes = await fetch(`${API_URL}/categories/active`)
      if (activeRes.ok) {
        const activeData = await activeRes.json()
        const cats: Category[] = activeData?.data ?? (Array.isArray(activeData) ? activeData : [])
        setCategories(cats)
        setCategoryTypes([...new Set(cats.map(cat => cat.type))].sort())
        return
      }

      setError('We could not load the categories.')
    } catch (err) {
      console.error('Error fetching categories:', err)
      setError('We could not load the categories. Check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  const openInquiry = (category: Category, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setSelectedCategory({ name: category.name, type: category.type })
    setModalOpen(true)
  }

  const filteredCategories = categories.filter(cat => {
    const q = searchTerm.toLowerCase()
    const matchesSearch =
      cat.name.toLowerCase().includes(q) ||
      cat.type.toLowerCase().includes(q) ||
      (cat.description ? cat.description.toLowerCase().includes(q) : false)
    const matchesType = selectedType === 'all' || cat.type === selectedType
    return matchesSearch && matchesType
  })

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedType('all')
  }

  const hasActiveFilters = searchTerm || selectedType !== 'all'

  const groupedCategories =
    selectedType === 'all'
      ? categoryTypes
          .map(type => ({ type, categories: filteredCategories.filter(cat => cat.type === type) }))
          .filter(group => group.categories.length > 0)
      : [{ type: selectedType, categories: filteredCategories }]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#171512] to-[#2a2520] text-white pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
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
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <span className="inline-flex items-center border border-[#FDB022]/30 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide text-[#FDB022] mb-6">
              <Layers size={14} className="mr-2" />
              EXPLORE OUR CATEGORIES
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Find Your Perfect
              <br />
              <span className="bg-gradient-to-r from-[#FDB022] to-[#f5a80f] bg-clip-text text-transparent">
                Packaging Solution
              </span>
            </h1>

            <p className="text-lg text-white/60 max-w-2xl mx-auto mb-10">
              Browse through our extensive collection of packaging categories.
              From industry-specific solutions to material types, we have everything
              you need to make your brand stand out.
            </p>

            <div className="max-w-xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={22} />
                <input
                  type="text"
                  placeholder="Search categories by name or type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#FDB022]/50 focus:border-[#FDB022] transition-all text-lg"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            </div>

            <div className="flex justify-center gap-8 mt-10">
              {[
                { label: 'Categories', value: categories.length },
                { label: 'Types', value: categoryTypes.length },
                { label: 'Products', value: '500+' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="text-2xl md:text-3xl font-bold text-[#FDB022]">{stat.value}</p>
                  <p className="text-xs text-white/50 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-10 bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 flex-wrap">
              <button
                onClick={() => setSelectedType('all')}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  selectedType === 'all'
                    ? 'bg-[#171512] text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All Types
              </button>
              {categoryTypes.map(type => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    selectedType === type
                      ? 'bg-[#171512] text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {type}
                  <span className="ml-1 text-xs opacity-60">
                    ({categories.filter(c => c.type === type).length})
                  </span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-red-500 hover:text-red-600 font-medium flex items-center gap-1"
                >
                  <X size={16} />
                  Clear
                </button>
              )}
              <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow-md' : 'hover:bg-white/50'}`}
                >
                  <Grid3X3 size={18} className="text-gray-600" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2.5 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow-md' : 'hover:bg-white/50'}`}
                >
                  <List size={18} className="text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          {loading ? (
            <div className="text-center py-20">
              <Loader size={40} className="mx-auto animate-spin text-gray-400 mb-4" />
              <p className="text-gray-500 text-lg">Loading categories…</p>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <Package size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">{error}</p>
              <button
                onClick={() => setRetryCount(prev => prev + 1)}
                className="mt-4 inline-flex items-center gap-2 px-6 py-2.5 bg-[#171512] text-white rounded-full text-sm font-medium hover:bg-black transition-colors"
              >
                <RefreshCw size={16} />
                Try again
              </button>
            </div>
          ) : filteredCategories.length === 0 ? (
            <div className="text-center py-20">
              <Package size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">No categories found</p>
              <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filters</p>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="mt-4 px-6 py-2.5 bg-[#FDB022] text-[#171512] rounded-full text-sm font-semibold hover:bg-[#f5a80f] transition-colors"
                >
                  Clear filters
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-12">
              {groupedCategories.map(group => (
                <div key={group.type}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-[#FDB022]/10 rounded-xl flex items-center justify-center">
                      <Layers size={16} className="text-[#FDB022]" />
                    </div>
                    <h2 className="text-2xl font-bold text-[#171512]">{group.type}</h2>
                    <span className="text-sm text-gray-400">({group.categories.length} categories)</span>
                  </div>

                  {viewMode === 'grid' ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                      {group.categories.map(category => (
                        <Link
                          key={category._id}
                          href={categoryHref(category.name)}
                          className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow border border-gray-100 overflow-hidden group block"
                        >
                          <div className="relative h-48 bg-gradient-to-br from-[#F5F1E7] to-[#EDE5D8] overflow-hidden">
                            {category.image ? (
                              <img
                                src={category.image}
                                alt={category.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Package size={48} className="text-[#D4C5A9]" />
                              </div>
                            )}

                            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-semibold text-gray-700 shadow-sm">
                              {category.type}
                            </div>

                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                              <span className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 bg-white text-[#171512] px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg">
                                <Eye size={16} />
                                View products
                              </span>
                            </div>
                          </div>

                          <div className="p-5">
                            <h3 className="font-bold text-gray-900 text-lg mb-1">{category.name}</h3>
                            {category.description && (
                              <p className="text-sm text-gray-500 line-clamp-2 mb-3">{category.description}</p>
                            )}

                            <div className="flex gap-2">
                              {/* View details -> category's product listing */}
                              <span className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-[#171512] text-white rounded-xl font-semibold text-sm group-hover:bg-black transition-colors">
                                <Eye size={14} />
                                View details
                              </span>
                              <button
                                onClick={(e) => openInquiry(category, e)}
                                className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-[#FDB022] text-[#171512] rounded-xl font-semibold hover:bg-[#f5a80f] transition-colors text-sm"
                              >
                                <MessageSquare size={14} />
                                Inquire
                              </button>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {group.categories.map(category => (
                        <Link
                          key={category._id}
                          href={categoryHref(category.name)}
                          className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center gap-4 hover:shadow-md transition-shadow group"
                        >
                          <div className="w-16 h-16 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                            {category.image ? (
                              <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Package size={24} className="text-gray-300" />
                              </div>
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900">{category.name}</h3>
                            {category.description && (
                              <p className="text-sm text-gray-500 truncate">{category.description}</p>
                            )}
                          </div>

                          <span className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#171512] text-white rounded-xl font-semibold text-sm flex-shrink-0">
                            <Eye size={14} />
                            View details
                          </span>
                          <button
                            onClick={(e) => openInquiry(category, e)}
                            className="flex items-center gap-2 px-4 py-2 bg-[#FDB022] text-[#171512] rounded-xl font-semibold hover:bg-[#f5a80f] transition-colors text-sm flex-shrink-0"
                          >
                            <MessageSquare size={14} />
                            Inquire
                          </button>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Bottom CTA */}
          {filteredCategories.length > 0 && (
            <div className="mt-20 text-center py-16 px-6 bg-gradient-to-br from-[#171512] to-[#2a2520] rounded-3xl text-white">
              <Package size={48} className="mx-auto text-[#FDB022] mb-6" />
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Need a custom solution?</h3>
              <p className="text-white/60 mb-8 max-w-lg mx-auto">
                We specialize in creating custom packaging tailored to your specific
                requirements. Let us help you bring your vision to life.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory({ name: 'Custom Order', type: 'Custom Request' })
                  setModalOpen(true)
                }}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#FDB022] text-[#171512] font-bold rounded-xl hover:bg-[#f5a80f] transition-all shadow-lg shadow-[#FDB022]/25 text-lg"
              >
                Request custom quote
                <ArrowRight size={20} />
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />

      <QuickInquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        categoryName={selectedCategory.name}
        categoryType={selectedCategory.type}
      />
    </div>
  )
}