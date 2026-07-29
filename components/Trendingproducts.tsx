'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Package, Loader, RefreshCw, MessageSquare } from 'lucide-react'
import { QuickInquiryModal } from './QuickInquiryModal'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

// Fallback images
import boxImage1 from '../assets/images/01.webp'
import boxImage2 from '../assets/images/02.webp'
import boxImage3 from '../assets/images/03.webp'
import boxImage4 from '../assets/images/04.webp'
import boxImage5 from '../assets/images/05.webp'
import boxImage6 from '../assets/images/06.webp'
import boxImage7 from '../assets/images/07.webp'
import boxImage8 from '../assets/images/08.webp'

const fallbackImages = [
  boxImage1, boxImage2, boxImage3, boxImage4,
  boxImage5, boxImage6, boxImage7, boxImage8
]

interface Category {
  _id: string
  name: string
  type: string
  description?: string
  image?: string
  isActive: boolean
}

interface DisplayProduct {
  id: string
  name: string
  image: string
  type?: string
  description?: string
}

export function TrendingProducts() {
  const [products, setProducts] = useState<DisplayProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)
  
  // Modal state
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState({ name: '', type: '' })

  useEffect(() => {
    fetchTrendingProducts()
  }, [retryCount])

  const fetchTrendingProducts = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch(`${API_URL}/categories?isActive=true`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      
      if (response.ok) {
        const responseData = await response.json()
        let categories: Category[] = []
        
        if (responseData.success && Array.isArray(responseData.data)) {
          categories = responseData.data
        } else if (Array.isArray(responseData.data)) {
          categories = responseData.data
        } else if (Array.isArray(responseData)) {
          categories = responseData
        }
        
        const activeCategories = categories.filter(cat => 
          cat.isActive === true || cat.isActive === undefined
        )
        
        if (activeCategories.length > 0) {
          const displayProducts: DisplayProduct[] = activeCategories.map((cat, index) => ({
            id: cat._id || `cat-${index}`,
            name: cat.name,
            image: cat.image || '',
            type: cat.type,
            description: cat.description
          }))
          setProducts(displayProducts)
        } else {
          useFallbackProducts()
        }
      } else {
        useFallbackProducts()
      }
    } catch (err) {
      console.error('Error:', err)
      useFallbackProducts()
    } finally {
      setLoading(false)
    }
  }

  const useFallbackProducts = () => {
    const staticProducts = [
      { name: 'Mailer Boxes', image: fallbackImages[0] },
      { name: 'Gable Boxes', image: fallbackImages[1] },
      { name: 'Candle Boxes', image: fallbackImages[2] },
      { name: 'Pillow Boxes', image: fallbackImages[3] },
      { name: 'Display Boxes', image: fallbackImages[4] },
      { name: 'Cosmetic Packaging', image: fallbackImages[5] },
      { name: 'Food & Beverage Boxes', image: fallbackImages[6] },
      { name: 'Subscription Boxes', image: fallbackImages[7] },
    ]
    
    setProducts(
      staticProducts.map((p, i) => ({
        id: `fallback-${i}`,
        name: p.name,
        image: typeof p.image === 'object' && 'src' in p.image ? (p.image as any).src : String(p.image),
        type: undefined,
        description: undefined
      }))
    )
  }

  const handleInquiryClick = (product: DisplayProduct, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setSelectedCategory({
      name: product.name,
      type: product.type || 'General'
    })
    setModalOpen(true)
  }

  const handleRetry = () => {
    setRetryCount(prev => prev + 1)
  }

  const displayProducts = products.slice(0, 8)

  return (
    <>
      <section className="py-8 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Header row */}
          <motion.div
            className="flex flex-wrap items-end justify-between gap-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-4xl font-bold text-[#171512] leading-tight mb-3">
                Trending &amp; Popular Products
              </h2>
              <p className="text-black/55 leading-relaxed">
                Discover our trending and popular products, featuring top-selling
                items trusted by customers for their quality, performance, and
                standout design.
              </p>
            </div>

            <div className="flex items-center gap-3">
              {error && (
                <button onClick={handleRetry}
                  className="shrink-0 inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <RefreshCw size={16} /> Retry
                </button>
              )}
              <Link href="/products"
                className="group shrink-0 inline-flex items-center gap-2 bg-[#FDB022] text-[#171512] font-semibold px-6 py-3 rounded-lg hover:bg-[#f5a80f] transition-colors">
                View All Products
                <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {error && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-3 bg-yellow-50 border border-yellow-200 rounded-xl text-sm text-yellow-700">
              {error}
            </motion.div>
          )}

          {/* Loading State */}
          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="w-full aspect-square rounded-2xl bg-gray-200 mb-4" />
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : displayProducts.length === 0 ? (
            <div className="text-center py-16">
              <Package size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">No products available yet.</p>
              <button onClick={handleRetry}
                className="mt-4 px-6 py-2 bg-[#171512] text-white rounded-full text-sm font-medium hover:bg-black transition-colors">
                Refresh
              </button>
            </div>
          ) : (
            /* Product Grid */
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
              {displayProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -6 }}
                >
                  <div className="group block cursor-pointer">
                    <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-[#F5F1E7] border border-black/[0.06] shadow-sm group-hover:shadow-lg transition-shadow duration-300 mb-4"
                      onClick={(e) => handleInquiryClick(product, e)}>
                      {product.image && product.image.startsWith('http') ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.style.display = 'none'
                            const parent = target.parentElement
                            if (parent) {
                              const fallback = parent.querySelector('.image-fallback') as HTMLElement
                              if (fallback) fallback.style.display = 'flex'
                            }
                          }}
                        />
                      ) : product.image ? (
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 45vw, 22vw"
                        />
                      ) : null}
                      
                      <div className={`image-fallback w-full h-full flex-col items-center justify-center bg-gradient-to-br from-[#F5F1E7] to-[#EDE5D8] ${
                        product.image ? 'hidden' : 'flex'
                      }`}>
                        <Package size={40} className="text-[#D4C5A9] mb-2" />
                        <span className="text-xs text-gray-500 text-center px-2">{product.name}</span>
                      </div>
                      
                      {product.type && (
                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-medium text-gray-600 shadow-sm">
                          {product.type}
                        </div>
                      )}

                      {/* Quick Inquiry Button Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                        <span className="opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 bg-white text-[#171512] px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg">
                          <MessageSquare size={16} />
                          Quick Inquiry
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FDB022] shrink-0" />
                      <p className="font-semibold text-[#171512] group-hover:text-[#FDB022] transition-colors">
                        {product.name}
                      </p>
                    </div>
                    
                    {product.description && (
                      <p className="text-xs text-gray-500 mt-1 ml-4 line-clamp-1">
                        {product.description}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {!loading && displayProducts.length > 0 && (
            <p className="text-center text-xs text-gray-400 mt-6">
              Click on any product to submit a quick inquiry
            </p>
          )}
        </div>
      </section>

      {/* Quick Inquiry Modal */}
      <QuickInquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        categoryName={selectedCategory.name}
        categoryType={selectedCategory.type}
      />
    </>
  )
}