// app/products/[category]/page.tsx (Frontend/Public)
'use client'

import { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, Loader, X, Eye, MessageSquare, Package,
  Grid3X3, List, ArrowLeft, RefreshCw,
  Layers, ChevronLeft, ChevronRight
} from 'lucide-react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { QuickInquiryModal } from '@/components/QuickInquiryModal'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

interface Product {
  _id: string
  title: string
  description: string
  images: string[]
  category: string
  price?: number
  isActive: boolean
  createdBy?: { _id: string; name: string }
  createdAt: string
  updatedAt: string
}

export default function CategoryProductsPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  
  // Get category from URL params or query string
  const categoryFromUrl = params?.category as string || searchParams?.get('category') || ''
  const decodedCategory = decodeURIComponent(categoryFromUrl)
  
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('-createdAt')
  
  // Inquiry Modal
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<{ name: string; type: string }>({ 
    name: '', 
    type: '' 
  })
  
  // Product Detail Modal
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    if (decodedCategory) {
      fetchProductsByCategory(decodedCategory)
    }
  }, [decodedCategory, sortBy])

  const fetchProductsByCategory = async (category: string) => {
    try {
      setLoading(true)
      setError('')
      
      console.log('🔍 Fetching products for category:', category)
      
      const response = await fetch(`${API_URL}/products?category=${encodeURIComponent(category)}&isActive=true&sortBy=${sortBy}`)
      
      if (response.ok) {
        const data = await response.json()
        console.log(`📦 Found ${data.data?.length || 0} products for "${category}"`)
        setProducts(data.data || [])
      } else {
        setError('Failed to load products')
      }
    } catch (error) {
      console.error('Error fetching products:', error)
      setError('Error loading products')
    } finally {
      setLoading(false)
    }
  }

  // Open inquiry modal from product card
  const handleInquiryClick = (product: Product, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setSelectedProduct({
      name: product.title,
      type: product.category
    })
    setInquiryModalOpen(true)
  }

  // View product details
  const handleViewProduct = (product: Product, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setViewingProduct(product)
    setCurrentImageIndex(0)
  }

  // Open inquiry from product detail modal
  const handleInquiryFromDetail = (product: Product) => {
    setViewingProduct(null) // Close detail modal first
    // Small delay to let the modal close animation finish
    setTimeout(() => {
      setSelectedProduct({
        name: product.title,
        type: product.category
      })
      setInquiryModalOpen(true)
    }, 150)
  }

  // Filter products by search term
  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Banner */}
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
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-white/60 mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/products" className="hover:text-white transition-colors">Products</Link>
              <span>/</span>
              <span className="text-[#FDB022] font-medium">{decodedCategory}</span>
            </div>
            
            <span className="inline-flex items-center border border-[#FDB022]/30 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide text-[#FDB022] mb-4">
              <Layers size={14} className="mr-2" />
              CATEGORY
            </span>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {decodedCategory}
            </h1>
            
            <p className="text-lg text-white/60 max-w-2xl">
              Explore our {decodedCategory.toLowerCase()} collection. High-quality custom packaging 
              solutions designed to meet your specific needs.
            </p>
            
            {/* Stats */}
            <div className="flex gap-6 mt-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-[#FDB022]">{products.length}</p>
                <p className="text-xs text-white/50">Products</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-[#FDB022]">
                  {products.filter(p => p.isActive).length}
                </p>
                <p className="text-xs text-white/50">Available</p>
              </div>
            </div>
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
                  placeholder={`Search in ${decodedCategory}...`}
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
              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FDB022]/50"
              >
                <option value="-createdAt">Newest First</option>
                <option value="createdAt">Oldest First</option>
                <option value="title">Name A-Z</option>
                <option value="-title">Name Z-A</option>
                <option value="price">Price Low-High</option>
                <option value="-price">Price High-Low</option>
              </select>

              {/* View Toggle */}
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

              <button onClick={() => fetchProductsByCategory(decodedCategory)}
                className="p-2.5 hover:bg-gray-100 rounded-lg transition-colors" title="Refresh">
                <RefreshCw size={18} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid/List */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center py-20">
              <Loader size={40} className="mx-auto animate-spin text-gray-400 mb-4" />
              <p className="text-gray-500">Loading products...</p>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <Package size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">{error}</p>
              <button onClick={() => fetchProductsByCategory(decodedCategory)}
                className="mt-4 px-6 py-2 bg-[#171512] text-white rounded-full text-sm font-medium">
                Try Again
              </button>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <Package size={64} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg font-medium">
                {searchTerm ? 'No products match your search' : `No products found in ${decodedCategory}`}
              </p>
              <p className="text-gray-400 text-sm mt-1">
                {searchTerm ? 'Try adjusting your search terms' : 'Check back soon for new products'}
              </p>
              {searchTerm && (
                <button onClick={() => setSearchTerm('')}
                  className="mt-4 px-6 py-2 bg-[#FDB022] text-[#171512] rounded-full text-sm font-semibold">
                  Clear Search
                </button>
              )}
            </div>
          ) : viewMode === 'grid' ? (
            /* Grid View */
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-100 overflow-hidden group"
                >
                  {/* Product Image */}
                  <div className="relative h-56 bg-gray-100 overflow-hidden">
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" fill="%23F5F1E7"><rect width="400" height="300"/><text x="200" y="150" text-anchor="middle" dy=".3em" fill="%23999">No Image</text></svg>'
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#F5F1E7] to-[#EDE5D8]">
                        <Package size={48} className="text-[#D4C5A9]" />
                      </div>
                    )}
                    
                    {/* Price Badge */}
                    {product.price !== undefined && (
                      <div className="absolute top-3 right-3 bg-[#FDB022] text-[#171512] px-3 py-1.5 rounded-full text-sm font-bold shadow-sm">
                        ${product.price.toFixed(2)}
                      </div>
                    )}

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center gap-3">
                      <button
                        onClick={(e) => handleViewProduct(product, e)}
                        className="opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 bg-white text-[#171512] px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg hover:bg-[#FDB022]"
                      >
                        <Eye size={16} /> View
                      </button>
                      <button
                        onClick={(e) => handleInquiryClick(product, e)}
                        className="opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 bg-[#FDB022] text-[#171512] px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg"
                      >
                        <MessageSquare size={16} /> Quote
                      </button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-5">
                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-1">{product.title}</h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {product.description?.replace(/<[^>]*>/g, '').substring(0, 120)}
                    </p>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => handleViewProduct(product, e)}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-blue-50 text-blue-700 rounded-xl text-sm font-medium hover:bg-blue-100 transition-colors"
                      >
                        <Eye size={14} /> Details
                      </button>
                      <button
                        onClick={(e) => handleInquiryClick(product, e)}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-[#FDB022] text-[#171512] rounded-xl text-sm font-semibold hover:bg-[#f5a80f] transition-colors"
                      >
                        <MessageSquare size={14} /> Get Quote
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            /* List View */
            <div className="space-y-4">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className="bg-white rounded-2xl shadow-md border border-gray-100 p-4 flex flex-col sm:flex-row gap-4 hover:shadow-lg transition-all group"
                >
                  {/* Image */}
                  <div className="relative w-full sm:w-48 h-40 sm:h-36 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                    {product.images && product.images.length > 0 ? (
                      <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center"><Package size={32} className="text-gray-300" /></div>
                    )}
                    {product.price !== undefined && (
                      <div className="absolute top-2 right-2 bg-[#FDB022] text-[#171512] px-2 py-1 rounded-full text-xs font-bold">
                        ${product.price.toFixed(2)}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{product.title}</h3>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {product.description?.replace(/<[^>]*>/g, '').substring(0, 200)}
                      </p>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button onClick={(e) => handleViewProduct(product, e)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100">
                        <Eye size={14} /> View Details
                      </button>
                      <button onClick={(e) => handleInquiryClick(product, e)}
                        className="flex items-center gap-2 px-4 py-2 bg-[#FDB022] text-[#171512] rounded-lg text-sm font-semibold hover:bg-[#f5a80f]">
                        <MessageSquare size={14} /> Get Quote
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Product Count */}
          {!loading && filteredProducts.length > 0 && (
            <p className="text-center text-xs text-gray-400 mt-8">
              Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} in {decodedCategory}
            </p>
          )}
        </div>
      </section>

      {/* ============ PRODUCT DETAIL MODAL ============ */}
      <AnimatePresence>
        {viewingProduct && (
          <div className="fixed inset-0 bg-black/50 flex items-start justify-center p-4 md:p-6 z-50 overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl my-8"
            >
              {/* Image Gallery */}
              <div className="relative h-56 md:h-80 bg-gray-100 rounded-t-2xl">
                {viewingProduct.images && viewingProduct.images.length > 0 ? (
                  <>
                    <img 
                      src={viewingProduct.images[currentImageIndex] || viewingProduct.images[0]} 
                      alt={viewingProduct.title} 
                      className="w-full h-full object-contain rounded-t-2xl"
                    />
                    {viewingProduct.images.length > 1 && (
                      <>
                        <button 
                          onClick={() => setCurrentImageIndex(prev => Math.max(0, prev - 1))} 
                          disabled={currentImageIndex === 0}
                          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white transition-colors"
                        >
                          <ChevronLeft size={20} className="text-gray-700" />
                        </button>
                        <button 
                          onClick={() => setCurrentImageIndex(prev => Math.min(viewingProduct.images.length - 1, prev + 1))} 
                          disabled={currentImageIndex === viewingProduct.images.length - 1}
                          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white transition-colors"
                        >
                          <ChevronRight size={20} className="text-gray-700" />
                        </button>
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs">
                          {currentImageIndex + 1} / {viewingProduct.images.length}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#F5F1E7] to-[#EDE5D8]">
                    <Package size={64} className="text-[#D4C5A9]" />
                  </div>
                )}
                <button 
                  onClick={() => setViewingProduct(null)} 
                  className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors z-10"
                >
                  <X size={20} className="text-gray-700" />
                </button>
              </div>

              {/* Product Details */}
              <div className="p-6 md:p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{viewingProduct.title}</h2>
                    <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                      {viewingProduct.category}
                    </span>
                  </div>
                  {viewingProduct.price !== undefined && (
                    <div className="text-3xl font-bold text-[#FDB022]">${viewingProduct.price.toFixed(2)}</div>
                  )}
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="w-1 h-6 bg-[#FDB022] rounded-full"></span>
                    Description
                  </h4>
                  <div className="bg-gray-50 rounded-xl p-6">
                    <div 
                      className="text-gray-700 leading-relaxed whitespace-pre-wrap text-sm md:text-base"
                      dangerouslySetInnerHTML={{ __html: viewingProduct.description }} 
                    />
                  </div>
                </div>

                {/* All Images Gallery */}
                {viewingProduct.images && viewingProduct.images.length > 1 && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="w-1 h-6 bg-[#FDB022] rounded-full"></span>
                      Gallery ({viewingProduct.images.length} images)
                    </h4>
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                      {viewingProduct.images.map((img, idx) => (
                        <img 
                          key={idx} 
                          src={img} 
                          alt={`${viewingProduct.title} - ${idx + 1}`}
                          className={`w-full h-24 object-cover rounded-xl cursor-pointer hover:opacity-80 transition-opacity border-2 ${
                            idx === currentImageIndex ? 'border-[#FDB022]' : 'border-gray-200'
                          }`}
                          onClick={() => setCurrentImageIndex(idx)}
                          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Product Info */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-gray-500 mb-1">Category</p>
                    <p className="font-semibold text-gray-900 text-sm">{viewingProduct.category}</p>
                  </div>
                  {viewingProduct.price !== undefined && (
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-xs text-gray-500 mb-1">Price</p>
                      <p className="font-semibold text-gray-900 text-sm">${viewingProduct.price.toFixed(2)}</p>
                    </div>
                  )}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-gray-500 mb-1">Status</p>
                    <p className="font-semibold text-green-600 text-sm">Available</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-gray-500 mb-1">Images</p>
                    <p className="font-semibold text-gray-900 text-sm">{viewingProduct.images?.length || 0}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
                  <button 
                    onClick={() => setViewingProduct(null)} 
                    className="flex-1 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 font-medium transition-colors"
                  >
                    Close
                  </button>
                  <button 
                    onClick={() => handleInquiryFromDetail(viewingProduct)}
                    className="flex-1 py-3 bg-[#FDB022] text-[#171512] rounded-xl font-bold hover:bg-[#f5a80f] transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#FDB022]/25"
                  >
                    <MessageSquare size={18} /> Get Quote for This Product
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ============ QUICK INQUIRY MODAL ============ */}
      <QuickInquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        categoryName={selectedProduct.name}
        categoryType={selectedProduct.type}
        pageName={`Category - ${decodedCategory}`}
      />

      <Footer />
    </div>
  )
}