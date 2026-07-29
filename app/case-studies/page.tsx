// app/case-studies/page.tsx (Frontend/Public) - COMPLETE FIXED VERSION
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, Loader, X, Eye, MessageSquare,
  Tag, Building2, User, FolderOpen,
  ChevronRight, ChevronLeft, Calendar, ArrowRight, Clock
} from 'lucide-react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { QuickInquiryModal } from '@/components/QuickInquiryModal'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://packaging-backend.vercel.app/api'

interface CaseStudy {
  _id: string
  title: string
  description: string
  content: string
  images: string[]
  thumbnail: string
  category: string
  client?: string
  industry?: string
  tags: string[]
  isActive: boolean
  isFeatured: boolean
  createdBy: { _id: string; name: string }
  createdAt: string
  updatedAt: string
}

export default function CaseStudiesPage() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [categories, setCategories] = useState<string[]>([])
  
  // View Modal
  const [viewingItem, setViewingItem] = useState<CaseStudy | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  // Inquiry Modal
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false)
  const [inquiryCategory, setInquiryCategory] = useState({ name: '', type: '' })

  useEffect(() => {
    fetchCaseStudies()
    fetchCategories()
  }, [])

  const fetchCaseStudies = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${API_URL}/case-studies`)
      if (res.ok) {
        const data = await res.json()
        console.log('Case studies loaded:', data.data?.length)
        // Log first item to see content
        if (data.data && data.data.length > 0) {
          console.log('First case study:', {
            title: data.data[0].title,
            contentLength: data.data[0].content?.length,
            imagesCount: data.data[0].images?.length,
            thumbnail: data.data[0].thumbnail,
          })
        }
        setCaseStudies(data.data || [])
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_URL}/case-studies/categories/list`)
      if (res.ok) {
        const data = await res.json()
        setCategories(data.data || [])
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const handleViewDetails = (item: CaseStudy) => {
    setViewingItem(item)
    setCurrentImageIndex(0)
  }

  const handleInquire = (item: CaseStudy) => {
    setInquiryCategory({ name: item.title, type: 'Case Study' })
    setInquiryModalOpen(true)
  }

  // Get all images including thumbnail for the gallery
  const getAllImages = (item: CaseStudy): string[] => {
    const images: string[] = []
    if (item.thumbnail) images.push(item.thumbnail)
    if (item.images && Array.isArray(item.images)) {
      images.push(...item.images)
    }
    return images
  }

  const nextImage = () => {
    if (!viewingItem) return
    const allImages = getAllImages(viewingItem)
    if (currentImageIndex < allImages.length - 1) {
      setCurrentImageIndex(prev => prev + 1)
    }
  }

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(prev => prev - 1)
    }
  }

  const filtered = caseStudies.filter(cs => {
    const matchesSearch = cs.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cs.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cs.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || cs.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#171512] to-[#2a2520] text-white pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center border border-[#FDB022]/30 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide text-[#FDB022] mb-4">
              📂 PORTFOLIO
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Case Studies</h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Explore our successful packaging projects and see how we've helped brands stand out.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 px-6 bg-white border-b sticky top-[72px] z-30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input type="text" placeholder="Search case studies..." value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400/50" />
              {searchTerm && (
                <button onClick={() => setSearchTerm('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"><X size={18} /></button>
              )}
            </div>
            <div className="flex gap-2 flex-wrap">
              <button onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${selectedCategory === 'all' ? 'bg-[#171512] text-white shadow-lg' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>All</button>
              {categories.map(cat => (
                <button key={cat} onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${selectedCategory === cat ? 'bg-[#171512] text-white shadow-lg' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{cat}</button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cards Grid */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center py-20"><Loader size={40} className="mx-auto animate-spin text-gray-400 mb-4" /><p className="text-gray-500">Loading case studies...</p></div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <FolderOpen size={64} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg font-medium">No case studies found</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((item, i) => (
                <motion.div key={item._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden">
                  <div className="relative h-56 bg-gray-100 overflow-hidden">
                    {item.thumbnail ? (
                      <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => { (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" fill="%23F5F1E7"><rect width="400" height="300"/><text x="200" y="150" text-anchor="middle" dy=".3em" fill="%23999">No Image</text></svg>' }} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#F5F1E7] to-[#EDE5D8]"><FolderOpen size={48} className="text-[#D4C5A9]" /></div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center">
                      <h3 className="text-white font-bold text-xl mb-2">{item.title}</h3>
                      <p className="text-white/70 text-sm mb-4 line-clamp-2">{item.description}</p>
                      <div className="flex gap-3">
                        <button onClick={(e) => { e.stopPropagation(); handleViewDetails(item) }}
                          className="flex items-center gap-2 px-4 py-2 bg-white text-[#171512] rounded-full text-sm font-semibold hover:bg-[#FDB022] transition-colors"><Eye size={16} /> View Details</button>
                        <button onClick={(e) => { e.stopPropagation(); handleInquire(item) }}
                          className="flex items-center gap-2 px-4 py-2 bg-[#FDB022] text-[#171512] rounded-full text-sm font-semibold hover:bg-[#f5a80f] transition-colors"><MessageSquare size={16} /> Inquire Now</button>
                      </div>
                    </div>
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-xs font-medium text-gray-700 shadow-sm">{item.category}</span>
                      {item.isFeatured && <span className="px-2.5 py-1 bg-yellow-400 rounded-lg text-xs font-medium shadow-sm">⭐ Featured</span>}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-gray-900 mb-1 line-clamp-1">{item.title}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2 mb-3">{item.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      {item.client && <span className="flex items-center gap-1"><User size={12} />{item.client}</span>}
                      {item.industry && <span className="flex items-center gap-1"><Building2 size={12} />{item.industry}</span>}
                      {item.tags && item.tags.length > 0 && (
                        <span className="flex items-center gap-1"><Tag size={12} />{item.tags[0]}</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ============ VIEW DETAILS MODAL - FIXED ============ */}
      <AnimatePresence>
        {viewingItem && (
          <div className="fixed inset-0 bg-black/50 flex items-start justify-center p-4 md:p-6 z-50 overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl my-8"
            >
              {/* Image Gallery */}
              {(() => {
                const allImages = getAllImages(viewingItem)
                const hasMultipleImages = allImages.length > 1
                
                return (
                  <div className="relative h-56 md:h-80 bg-gray-100 rounded-t-2xl">
                    <img 
                      src={allImages[currentImageIndex] || viewingItem.thumbnail} 
                      alt={viewingItem.title} 
                      className="w-full h-full object-cover rounded-t-2xl"
                      onError={(e) => { 
                        (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" fill="%23F5F1E7"><rect width="400" height="300"/><text x="200" y="150" text-anchor="middle" dy=".3em" fill="%23999">No Image</text></svg>'
                      }}
                    />
                    
                    {hasMultipleImages && (
                      <>
                        <button onClick={prevImage} disabled={currentImageIndex === 0}
                          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white transition-colors">
                          <ChevronLeft size={20} />
                        </button>
                        <button onClick={nextImage} disabled={currentImageIndex === allImages.length - 1}
                          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white transition-colors">
                          <ChevronRight size={20} />
                        </button>
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs">
                          {currentImageIndex + 1} / {allImages.length}
                        </div>
                      </>
                    )}
                    
                    <button onClick={() => setViewingItem(null)} 
                      className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors z-10">
                      <X size={20} />
                    </button>
                  </div>
                )
              })()}
              
              {/* Content - FIXED to show ALL details properly */}
              <div className="p-6 md:p-8">
                {/* Title */}
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">{viewingItem.title}</h2>
                
                {/* Short Description */}
                <p className="text-gray-600 mb-6 leading-relaxed text-base">{viewingItem.description}</p>
                
                {/* Meta Information Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-gray-500 mb-1 flex items-center gap-1"><FolderOpen size={12} /> Category</p>
                    <p className="font-semibold text-gray-900 text-sm">{viewingItem.category}</p>
                  </div>
                  {viewingItem.client && (
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-xs text-gray-500 mb-1 flex items-center gap-1"><User size={12} /> Client</p>
                      <p className="font-semibold text-gray-900 text-sm">{viewingItem.client}</p>
                    </div>
                  )}
                  {viewingItem.industry && (
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-xs text-gray-500 mb-1 flex items-center gap-1"><Building2 size={12} /> Industry</p>
                      <p className="font-semibold text-gray-900 text-sm">{viewingItem.industry}</p>
                    </div>
                  )}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-gray-500 mb-1 flex items-center gap-1"><Calendar size={12} /> Date</p>
                    <p className="font-semibold text-gray-900 text-sm">
                      {new Date(viewingItem.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </div>
                </div>

                {/* Tags */}
                {viewingItem.tags && viewingItem.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {viewingItem.tags.map((tag: string) => (
                      <span key={tag} className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">{tag}</span>
                    ))}
                  </div>
                )}

                {/* FULL Content - NOT truncated */}
                {viewingItem.content && (
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <span className="w-1 h-6 bg-[#FDB022] rounded-full"></span>
                      Project Details
                    </h4>
                    <div className="bg-gray-50 rounded-xl p-6">
                      <div 
                        className="text-gray-700 leading-relaxed whitespace-pre-wrap break-words text-sm md:text-base"
                        dangerouslySetInnerHTML={{ __html: viewingItem.content }} 
                      />
                    </div>
                  </div>
                )}

                {/* ALL Images Gallery - shown below content */}
                {viewingItem.images && viewingItem.images.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <span className="w-1 h-6 bg-[#FDB022] rounded-full"></span>
                      Project Gallery ({viewingItem.images.length} images)
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {viewingItem.images.map((img: string, idx: number) => (
                        <img 
                          key={idx} 
                          src={img} 
                          alt={`${viewingItem.title} - ${idx + 1}`}
                          className="w-full h-32 object-cover rounded-xl cursor-pointer hover:opacity-80 transition-opacity border border-gray-200"
                          onClick={() => setCurrentImageIndex(idx + 1)}
                          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
                  <button onClick={() => setViewingItem(null)} 
                    className="flex-1 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 font-medium transition-colors">
                    Close
                  </button>
                  <button 
                    onClick={() => { 
                      const item = viewingItem; 
                      setViewingItem(null); 
                      setTimeout(() => handleInquire(item), 100);
                    }}
                    className="flex-1 py-3 bg-[#FDB022] text-[#171512] rounded-xl font-bold hover:bg-[#f5a80f] transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#FDB022]/25">
                    <MessageSquare size={18} /> Inquire About This Project
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Quick Inquiry Modal */}
      <QuickInquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        categoryName={inquiryCategory.name}
        categoryType={inquiryCategory.type}
        pageName="Case Studies"
      />

      <Footer />
    </div>
  )
}