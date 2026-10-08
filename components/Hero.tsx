'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Package,
  Loader,
} from 'lucide-react'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://packaging-backend.vercel.app/api'

// Fallback images
import boxImage1 from '../assets/images/01.webp'
import boxImage2 from '../assets/images/02.webp'
import boxImage3 from '../assets/images/03.webp'
import boxImage4 from '../assets/images/04.webp'
import boxImage5 from '../assets/images/05.webp'
import boxImage6 from '../assets/images/06.webp'
import boxImage7 from '../assets/images/07.webp'
import boxImage8 from '../assets/images/08.webp'
import boxImage9 from '../assets/images/09.webp'
import boxImage10 from '../assets/images/10.webp'

const fallbackImages = [
  boxImage1, boxImage2, boxImage3, boxImage4, boxImage5,
  boxImage6, boxImage7, boxImage8, boxImage9, boxImage10
]

interface SliderItem {
  id: string
  image: string
  alt: string
}

function SliderCard({ image, alt }: { image: string; alt: string }) {
  const [imgError, setImgError] = useState(false)

  return (
    <div className="relative shrink-0 w-[150px] h-[200px] md:w-[170px] md:h-[220px] rounded-xl bg-white border border-black/[0.06] overflow-hidden transition-transform duration-300 hover:scale-105 hover:z-10">
      {image && !imgError ? (
        <img
          src={image}
          alt={alt}
          className="w-full h-full object-cover"
          onError={(e) => {
            console.log('❌ Image failed to load:', image?.substring(0, 80))
            setImgError(true)
          }}
          onLoad={() => console.log('✅ Image loaded:', image?.substring(0, 80))}
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#F5F1E7] to-[#EDE5D8]">
          <Package size={40} strokeWidth={1.5} className="text-[#D4C5A9]" />
          <span className="text-xs font-medium text-gray-500 px-2 text-center">{alt}</span>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100" />
    </div>
  )
}

export function Hero() {
  const [sliderImages, setSliderImages] = useState<SliderItem[]>([])
  const [loading, setLoading] = useState(true)
  const [debugInfo, setDebugInfo] = useState<string>('')
  const [useFallback, setUseFallback] = useState(false)

  useEffect(() => {
    fetchCategoriesForSlider()
  }, [])

  const fetchCategoriesForSlider = async () => {
    try {
      setLoading(true)
      setDebugInfo('Fetching...')
      
      // Try multiple endpoints
      let categories: any[] = []
      let success = false

      // Try endpoint 1: /categories/active
      console.log('🔍 Trying /categories/active...')
      try {
        const response = await fetch(`${API_URL}/categories/active`)
        console.log('📡 /categories/active status:', response.status)
        
        if (response.ok) {
          const data = await response.json()
          console.log('📦 /categories/active response:', JSON.stringify(data).substring(0, 500))
          
          if (data.success && Array.isArray(data.data)) {
            categories = data.data
            success = true
          } else if (Array.isArray(data.data)) {
            categories = data.data
            success = true
          } else if (Array.isArray(data)) {
            categories = data
            success = true
          }
        }
      } catch (e) {
        console.log('❌ /categories/active failed:', e)
      }

      // Try endpoint 2: /categories (all)
      if (!success) {
        console.log('🔍 Trying /categories...')
        try {
          const response = await fetch(`${API_URL}/categories`)
          console.log('📡 /categories status:', response.status)
          
          if (response.ok) {
            const data = await response.json()
            console.log('📦 /categories response:', JSON.stringify(data).substring(0, 500))
            
            if (data.success && Array.isArray(data.data)) {
              categories = data.data
              success = true
            } else if (Array.isArray(data.data)) {
              categories = data.data
              success = true
            } else if (Array.isArray(data)) {
              categories = data
              success = true
            }
          }
        } catch (e) {
          console.log('❌ /categories failed:', e)
        }
      }

      // Try endpoint 3: /categories/debug/all
      if (!success) {
        console.log('🔍 Trying /categories/debug/all...')
        try {
          const response = await fetch(`${API_URL}/categories/debug/all`)
          console.log('📡 /categories/debug/all status:', response.status)
          
          if (response.ok) {
            const data = await response.json()
            console.log('📦 Debug response:', JSON.stringify(data).substring(0, 500))
            if (data.success && Array.isArray(data.data)) {
              categories = data.data
              success = true
            }
          }
        } catch (e) {
          console.log('❌ /categories/debug/all failed:', e)
        }
      }

      console.log('📋 Total categories found:', categories.length)
      console.log('📋 Categories data:', categories.map(c => ({ 
        name: c.name, 
        hasImage: !!c.image, 
        imageUrl: c.image?.substring(0, 60) || 'none',
        isActive: c.isActive 
      })))

      // Filter active categories with valid images
      const validCategories = categories.filter(cat => {
        const isActive = cat.isActive === true || cat.isActive === undefined
        const hasImage = cat.image && typeof cat.image === 'string' && cat.image.trim().length > 0 && cat.image.startsWith('http')
        
        if (!hasImage) {
          console.log(`⚠️ Category "${cat.name}" - image: ${cat.image?.substring(0, 50) || 'none'} - active: ${isActive}`)
        }
        
        return isActive && hasImage
      })

      console.log('🖼️ Valid categories with images:', validCategories.length)

      if (validCategories.length > 0) {
        const images = validCategories.map(cat => ({
          id: cat._id,
          image: cat.image,
          alt: cat.name
        }))
        
        console.log('✅ Using dynamic images:', images.length)
        setSliderImages(images)
        setUseFallback(false)
        setDebugInfo(`Showing ${images.length} dynamic images`)
      } else {
        console.log('⚠️ No valid categories with images')
        
        // If categories exist but no images, still show category names
        const activeCategories = categories.filter(cat => 
          cat.isActive === true || cat.isActive === undefined
        )
        
        if (activeCategories.length > 0) {
          console.log('📋 Active categories (without images):', activeCategories.length)
          setDebugInfo(`Found ${activeCategories.length} categories but none have images. Upload images in admin panel.`)
        } else {
          setDebugInfo('No categories found. Create categories in admin panel first.')
        }
        
        useFallbackWithLocalImages()
      }
    } catch (error) {
      console.error('❌ Error:', error)
      setDebugInfo('Error fetching categories')
      useFallbackWithLocalImages()
    } finally {
      setLoading(false)
    }
  }

  const useFallbackWithLocalImages = () => {
    console.log('🔄 Using local fallback images')
    setSliderImages(
      fallbackImages.map((img, index) => ({
        id: `fallback-${index}`,
        image: typeof img === 'object' && 'src' in img ? (img as any).src : String(img),
        alt: `Packaging Box ${index + 1}`
      }))
    )
    setUseFallback(true)
  }

  const loopItems = [...sliderImages, ...sliderImages]

  return (
    <section className="relative overflow-hidden pt-15 pb-16 md:pt-14 md:pb-20 -mt-10">
      <div className="relative z-10 w-[95%] mx-auto bg-[#F5F1E7] rounded-[30px] py-[50px]">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-[0.4] pointer-events-none rounded-[30px] overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.025'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="absolute top-0 right-0 w-64 h-64 bg-[#fdb022]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#fdb022]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none" />

        <div className="relative z-20 max-w-4xl mx-auto px-6">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-block mb-4 px-4 py-1.5 bg-[#fdb022]/10 border border-[#fdb022]/20 rounded-full"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <span className="text-sm font-medium text-[#fdb022]">✨ Premium Packaging Solutions</span>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-[3.4rem] font-bold text-[#171512] leading-[1.08] mb-5 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              Custom packaging
              <br />
              solutions for your brand
            </motion.h1>

            <motion.p
              className="text-lg text-black/55 max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              We design and manufacture premium custom packaging from
              cardboard and micro-corrugated board — built around your brand.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-3 justify-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <Link
                href="#inquiry"
                className="group px-7 py-3.5 bg-[#fdb022] text-[#171512] font-semibold rounded-lg hover:bg-[#f5a80a] transition-all duration-300 flex items-center gap-2"
              >
                Get a Quote
                <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              {/* <Link
                href="#portfolio"
                className="px-7 py-3.5 bg-transparent text-[#171512] font-semibold rounded-lg border-2 border-black/10 hover:border-[#fdb022] hover:bg-[#fdb022]/5 transition-all duration-300"
              >
                View Portfolio
              </Link> */}
            </motion.div>
          </motion.div>
        </div>

        {/* Slider */}
        <motion.div
          className="relative z-20 mt-14 md:mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader size={24} className="animate-spin text-gray-400" />
              <span className="ml-3 text-gray-500 text-sm">Loading...</span>
            </div>
          ) : (
            <div className="overflow-hidden py-2">
              <div className="flex gap-4 md:gap-5 w-max animate-slider">
                {loopItems.map((item, index) => (
                  <SliderCard key={`${item.id}-${index}`} image={item.image} alt={item.alt} />
                ))}
              </div>
            </div>
          )}
        </motion.div>

      
      </div>

      <style jsx global>{`
        @keyframes slider-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-slider {
          animation: slider-scroll 45s linear infinite;
        }
        .animate-slider:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}