// app/products/[category]/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Search, Loader, X, Eye, MessageSquare, Package,
  Grid3X3, List, ArrowLeft, RefreshCw, Layers,
  ArrowRight,
  MessageCircle
} from 'lucide-react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { QuickInquiryModal } from '@/components/QuickInquiryModal'
import { productHref, matchCategoryBySlug, unslugify } from '@/lib/slug'
import { InstantQuote } from '@/components/InstantQuote'
import { FAQ } from '@/components/Faq'

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

export default function CategoryProductsPage() {
  const params = useParams()
  const router = useRouter()

  const categorySlug = (params?.category as string) || ''

  const [category, setCategory] = useState<Category | null>(null)
  // The real category name from the database. The products endpoint filters on
  // an exact string match, so this must be the stored name, not the slug.
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

  useEffect(() => {
    if (categorySlug) resolveCategory(categorySlug)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categorySlug])

  useEffect(() => {
    if (categoryName) fetchProducts(categoryName)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryName, sortBy])

  // "custom-cardboard-boxes" -> the stored name "Custom Cardboard Boxes"
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

     {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#171512] to-[#2a2520] text-white pt-32 pb-16 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #FDB022 1px, transparent 1px), radial-gradient(circle at 75% 75%, #FDB022 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FDB022]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-2 text-sm text-white/60 mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/products" className="hover:text-white transition-colors">Products</Link>
              <span>/</span>
              <span className="text-[#FDB022] font-medium capitalize">{displayName}</span>
            </div>

            <span className="inline-flex items-center border border-[#FDB022]/30 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide text-[#FDB022] mb-4">
              <Layers size={14} className="mr-2" />
              {category?.type || 'CATEGORY'}
            </span>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 capitalize">{displayName}</h1>

            <p className="text-lg text-white/60 max-w-2xl mb-8">
              {category?.description
                || `Explore our ${displayName.toLowerCase()} collection. High-quality custom packaging solutions designed to meet your specific needs.`}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <Link 
                href="/quote" 
                className="inline-flex items-center gap-2 bg-[#FDB022] text-[#171512] font-semibold px-6 py-3 rounded-lg hover:bg-[#f5a80f] transition-colors shadow-lg shadow-[#FDB022]/20"
              >
                Request a Quote
                <ArrowRight size={18} />
              </Link>
              
              <a 
                href="https://wa.me/1234567890" // Replace with your actual WhatsApp number
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10 hover:border-white/20 transition-colors backdrop-blur-sm"
              >
                <MessageCircle size={18} className="text-[#25D366]" />
                WhatsApp Us
              </a>
            </div>

            {/* <div className="flex gap-6 mt-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-[#FDB022]">{products.length}</p>
                <p className="text-xs text-white/50">Products</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-[#FDB022]">{products.filter(p => p.isActive).length}</p>
                <p className="text-xs text-white/50">Available</p>
              </div>
            </div> */}
          </motion.div>
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

      <InstantQuote/ >
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