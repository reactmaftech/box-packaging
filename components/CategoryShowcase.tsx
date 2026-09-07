// components/CategoryShowcase.tsx
'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Tag, Truck, Clock, Palette, Loader } from 'lucide-react'
import { categoryHref } from '@/lib/slug'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://packaging-backend.vercel.app/api'

const featuresfeatures = [
  { icon: Tag, label: 'Competitive Pricing', bg: '#E5E1F5' },
  { icon: Truck, label: 'Free Shipping', bg: '#FBE1E6' },
  { icon: Clock, label: 'Quick Turnaround Time', bg: '#F6E3C4' },
  { icon: Palette, label: 'Free Design Support', bg: '#DCEEDC' },
]

interface Category {
  _id: string
  name: string
  type: string
  description?: string
  image?: string
  isActive: boolean
}

export function CategoryShowcase() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchAllCategories()
  }, [])

  const fetchAllCategories = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(`${API_URL}/categories?isActive=true`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })

      if (response.ok) {
        const data = await response.json()

        if (data.success && Array.isArray(data.data)) {
          setCategories(data.data.filter((cat: Category) => cat.isActive === true))
        } else if (Array.isArray(data)) {
          setCategories(data.filter((cat: Category) => cat.isActive === true))
        } else {
          console.error('Unexpected data format:', data)
          setCategories([])
        }
        return
      }

      if (response.status === 404) {
        const activeResponse = await fetch(`${API_URL}/categories/active`)
        if (activeResponse.ok) {
          const activeData = await activeResponse.json()
          setCategories(activeData?.data ?? (Array.isArray(activeData) ? activeData : []))
          return
        }
      }

      setError('We could not load the categories.')
    } catch (err) {
      console.error('Error fetching categories:', err)
      setError('We could not load the categories. Check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const amount = scrollRef.current.clientWidth * 0.8
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    })
  }

  return (
    <section className="bg-white py-14 md:py-14">
      <div className="max-w-7xl mx-auto px-6">
        {/* Feature pills */}

        {/* Heading */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#171512] tracking-tight mb-4">
            Shop Custom Boxes By Industry &amp; Packaging Style
          </h2>
          <p className="text-black/55 leading-relaxed">
            We provide you the best packaging solutions with customized printed box
            service, which matches your industry and product specific needs. Get
            high-quality custom boxes with logo with a flexible and simple packaging
            process.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader size={32} className="animate-spin text-gray-400" />
            <span className="ml-3 text-gray-500">Loading categories…</span>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Tag size={32} className="text-red-400" />
            </div>
            <p className="text-gray-500 text-lg">{error}</p>
            <button
              onClick={fetchAllCategories}
              className="mt-4 px-6 py-2 bg-[#171512] text-white rounded-full text-sm font-medium hover:bg-black transition-colors"
            >
              Try again
            </button>
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Tag size={32} className="text-gray-400" />
            </div>
            <p className="text-gray-500 text-lg">No categories available yet.</p>
            <p className="text-gray-400 text-sm mt-2">
              Categories will appear here once they are added from the admin panel.
            </p>
            <button
              onClick={fetchAllCategories}
              className="mt-4 px-6 py-2 bg-[#171512] text-white rounded-full text-sm font-medium hover:bg-black transition-colors"
            >
              Refresh
            </button>
          </div>
        ) : (
          <div className="relative">
            <button
              onClick={() => scroll('left')}
              aria-label="Scroll left"
              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-10 w-11 h-11 items-center justify-center rounded-full bg-white border border-black/10 shadow-md hover:bg-[#171512] hover:text-white hover:border-[#171512] transition-colors"
            >
              <ChevronLeft size={20} />
            </button>

            <div
              ref={scrollRef}
              className="flex gap-5 md:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 no-scrollbar"
            >
              {categories.map((category, index) => (
                <motion.div
                  key={category._id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="shrink-0 w-[220px] md:w-[250px] snap-start"
                >
                  {/* Slug URL — /products/custom-corrugated-boxes */}
                  <Link href={categoryHref(category.name)} className="group block">
                    <div className="relative w-full h-[200px] md:h-[230px] rounded-2xl overflow-hidden bg-[#F5F1E7] border border-black/[0.06] shadow-sm group-hover:shadow-xl transition-shadow duration-300">
                      {category.image ? (
                        <Image
                          src={category.image}
                          alt={category.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 220px, 250px"
                          unoptimized={category.image.includes('cloudinary.com') || category.image.startsWith('http')}
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#F5F1E7] to-[#EDE5D8] p-4">
                          <Tag size={40} className="text-[#D4C5A9] mb-3" />
                          <p className="text-sm text-gray-500 text-center font-medium">{category.name}</p>
                          {category.type && (
                            <span className="mt-2 px-3 py-1 bg-white/80 rounded-full text-xs text-gray-600">
                              {category.type}
                            </span>
                          )}
                        </div>
                      )}

                      {category.image && category.type && (
                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-medium text-gray-700 shadow-sm">
                          {category.type}
                        </div>
                      )}
                    </div>

                    <p className="text-center mt-4 font-semibold text-[#171512] group-hover:text-black transition-colors text-sm md:text-base">
                      {category.name}
                    </p>

                    {category.description && (
                      <p className="text-center text-xs text-gray-500 mt-1 line-clamp-1 px-2">
                        {category.description}
                      </p>
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>

            <button
              onClick={() => scroll('right')}
              aria-label="Scroll right"
              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-10 w-11 h-11 items-center justify-center rounded-full bg-white border border-black/10 shadow-md hover:bg-[#171512] hover:text-white hover:border-[#171512] transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}

        {categories.length > 0 && (
          <motion.div
            className="text-center mt-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#171512] text-white rounded-full font-medium hover:bg-black transition-colors"
            >
              View All Products
              <ChevronRight size={18} />
            </Link>
          </motion.div>
        )}
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  )
}