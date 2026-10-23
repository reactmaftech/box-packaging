'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Phone, Mail, Menu, X, Search, ChevronDown,
  Box, Package, ShoppingBag, Gift, Layers, Sparkles,
  Truck, Award, Star, Clock, Shield, ArrowRight,
  ShoppingCart, Loader, Link as LinkIcon, Tag, Image as ImageIcon,
} from 'lucide-react'

import { categoryHref } from '@/lib/slug'

// Logo import
import logoImage from '../assets/logo/logo.png'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://packaging-backend.vercel.app/api'

// Contact details — update these
const PHONE_NUMBER = '+12177276247'
const PHONE_DISPLAY = '+1 (217) 727-6247'
const EMAIL_ADDRESS = 'info@slickcustomboxes.com'
const SITE_NAME = 'Slick Custom Boxes'

// Map icon names to actual Lucide components
const iconMap: { [key: string]: any } = {
  Box, Package, ShoppingBag, Gift, Layers, Sparkles,
  Truck, Award, Star, Clock, Shield, ShoppingCart,
  LinkIcon, Tag, Image: ImageIcon,
  Link: LinkIcon,
}

interface MenuCategory {
  name: string
  description: string
  image: string
  type: string
  icon?: string | null
}

interface MenuItem {
  _id: string
  label: string
  icon: string
  categoryType: string
  displayOrder: number
  type: 'category' | 'custom'
  customLink?: string
  showCategoryIcon?: boolean
  categories: MenuCategory[]
}

interface DynamicMenu {
  _id: string
  name: string
  slug: string
  items: MenuItem[]
}

function splitIntoColumns(categories: MenuCategory[], maxPerColumn: number = 6): MenuCategory[][] {
  const columns: MenuCategory[][] = []
  for (let i = 0; i < categories.length; i += maxPerColumn) {
    columns.push(categories.slice(i, i + maxPerColumn))
  }
  return columns
}

function chunkColumns<T>(columns: T[], perRow: number = 4): T[][] {
  const rows: T[][] = []
  for (let i = 0; i < columns.length; i += perRow) {
    rows.push(columns.slice(i, i + perRow))
  }
  return rows
}

function resolveIconComponent(name?: string | null): any | null {
  if (!name || !name.trim()) return null
  const key = name.trim()
  if (iconMap[key]) return iconMap[key]
  const ci = Object.keys(iconMap).find(k => k.toLowerCase() === key.toLowerCase())
  if (ci) return iconMap[ci]
  return null
}

// Support dropdown links
const SUPPORT_LINKS = [
  { label: 'Contact Us', href: '/contact' },
  { label: 'About Us', href: '/about' },
  { label: 'FAQs', href: '/faqs' },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [dynamicMenus, setDynamicMenus] = useState<DynamicMenu[]>([])
  const [loadingMenus, setLoadingMenus] = useState(true)
  const [supportOpen, setSupportOpen] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const supportTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => { fetchDynamicMenus() }, [])

  const fetchDynamicMenus = async () => {
    try {
      setLoadingMenus(true)
      const response = await fetch(`${API_URL}/menus/active`)
      if (response.ok) {
        const data = await response.json()
        setDynamicMenus(data.data || [])
      }
    } catch (error) {
      console.error('Error fetching menus:', error)
    } finally {
      setLoadingMenus(false)
    }
  }

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setActiveMenu(label)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveMenu(null), 200)
  }

  const handleMenuClick = (label: string) => {
    setActiveMenu(activeMenu === label ? null : label)
  }

  const handleSupportEnter = () => {
    if (supportTimeoutRef.current) clearTimeout(supportTimeoutRef.current)
    setSupportOpen(true)
  }

  const handleSupportLeave = () => {
    supportTimeoutRef.current = setTimeout(() => setSupportOpen(false), 200)
  }

  const hasMegaMenu = (menu: DynamicMenu) => {
    return menu.items.some(item => item.type === 'category' && item.categories && item.categories.length > 0)
  }

  return (
    <header className="sticky top-0 z-50 w-full flex flex-col">
      {/* ═══════════════════════════════════════════════════════════
          TOP UTILITY BAR — Full Width, Light Color
      ═══════════════════════════════════════════════════════════ */}
      <div className="hidden md:block w-full bg-[#F5F1E7] border-b border-black/[0.06]">
        <div className="w-[97%] mx-auto px-2 py-2 flex items-center justify-between gap-4">
          <p className="text-xs font-medium text-[#171512]/70 flex items-center gap-1.5">
            <span className="text-base">📦</span> Premium Custom Packaging — Free Design &amp; Shipping
          </p>
          <div className="flex items-center gap-3 ml-auto">
            {/* Phone */}
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="flex items-center gap-2 text-sm font-bold text-[#171512] hover:text-[#d99a1f] transition-colors"
            >
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#fdb022]/20 text-[#d99a1f]">
                <Phone size={13} />
              </span>
              {PHONE_DISPLAY}
            </a>
            <span className="w-px h-4 bg-black/10" />
            {/* Email */}
            <a
              href={`mailto:${EMAIL_ADDRESS}`}
              className="flex items-center gap-2 text-sm font-semibold text-[#171512]/80 hover:text-[#171512] transition-colors"
            >
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-black/5 text-[#171512]/70">
                <Mail size={13} />
              </span>
              {EMAIL_ADDRESS}
            </a>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          MAIN HEADER CONTAINER (Rounded on scroll)
      ═══════════════════════════════════════════════════════════ */}
      <div className={`transition-all duration-300 ${isScrolled ? 'pt-2 px-2' : 'pt-0 px-0'}`}>
        <div className={`w-[97%] mx-auto bg-white transition-all duration-300 ${isScrolled ? 'rounded-2xl shadow-xl' : 'rounded-none shadow-none'}`}>
          
          {/* MAIN ROW — logo / search / colorful CTAs */}
          <div className="border-b border-black/[0.08] px-4 md:px-6">
            <div className="py-3 flex items-center gap-4 md:gap-6">
              {/* Logo */}
              <Link href="/" className="flex items-center shrink-0 group">
                <Image
                  src={logoImage}
                  alt={SITE_NAME}
                  priority
                  className="h-12 md:h-16 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
                />
              </Link>

              {/* Search — desktop */}
              <div className="hidden md:flex flex-1 max-w-lg">
                <div className="relative w-full">
                  <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black/35" />
                  <input
                    type="text"
                    placeholder="Search boxes, materials, industries..."
                    className="w-full bg-[#F5F1E7] border border-black/10 rounded-full pl-10 pr-4 py-2.5 text-sm text-[#171512] placeholder:text-black/35 focus:outline-none focus:ring-2 focus:ring-[#fdb022]/40 focus:border-[#fdb022] transition-all"
                  />
                </div>
              </div>

              {/* Colorful action buttons */}
              <div className="hidden md:flex items-center gap-3 ml-auto shrink-0">
                <Link
                  href="/get-a-quote"
                  className="flex items-center gap-2 bg-gradient-to-r from-[#fdb022] to-[#f5a80a] text-[#171512] text-[15px] font-medium px-6 py-3 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                >
                  Get a Quote <ArrowRight size={16} />
                </Link>
                <a
                  href={`tel:${PHONE_NUMBER}`}
                  className="flex items-center gap-2 bg-[#171512] text-white text-[15px] font-medium px-6 py-3 rounded-xl hover:bg-black hover:-translate-y-0.5 transition-all duration-200"
                >
                  <Phone size={16} /> Call Now
                </a>
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden ml-auto text-[#171512] p-2 hover:bg-black/5 rounded-lg transition-colors"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════
              DESKTOP NAVIGATION
          ═══════════════════════════════════════════════════════════ */}
          <div className="hidden lg:block">
            <div className="px-6">
              <nav className="flex items-center gap-6 xl:gap-8 text-sm">
                {loadingMenus ? (
                  <div className="flex items-center gap-2 py-3.5 text-sm text-gray-400">
                    <Loader size={14} className="animate-spin" />
                    <span>Loading...</span>
                  </div>
                ) : dynamicMenus.length > 0 ? (
                  dynamicMenus.map((menu) => {
                    const menuHasMegaMenu = hasMegaMenu(menu)

                    // Single custom link
                    if (!menuHasMegaMenu && menu.items.length === 1 && menu.items[0].type === 'custom') {
                      return (
                        <Link
                          key={menu._id}
                          href={menu.items[0].customLink || `/${menu.slug}`}
                          className="py-3.5 font-medium text-[#171512]/75 hover:text-[#fdb022] transition-colors"
                        >
                          {menu.name}
                        </Link>
                      )
                    }

                    // Simple dropdown (all custom links)
                    if (!menuHasMegaMenu && menu.items.every(item => item.type === 'custom')) {
                      return (
                        <div key={menu._id} className="relative" onMouseEnter={() => handleMouseEnter(menu.name)} onMouseLeave={handleMouseLeave}>
                          <button
                            onClick={() => handleMenuClick(menu.name)}
                            className={`py-3.5 flex items-center gap-1.5 font-medium transition-colors ${activeMenu === menu.name ? 'text-[#fdb022]' : 'text-[#171512]/75 hover:text-[#171512]'}`}
                          >
                            {menu.name}
                            <ChevronDown size={14} className={`transition-transform duration-200 ${activeMenu === menu.name ? 'rotate-180' : ''}`} />
                          </button>
                          <AnimatePresence>
                            {activeMenu === menu.name && (
                              <motion.div
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 8 }}
                                transition={{ duration: 0.15 }}
                                className="absolute left-0 top-full pt-2 z-50 w-56"
                              >
                                <div className="bg-white rounded-xl shadow-xl border border-black/[0.06] overflow-hidden py-2">
                                  {menu.items.filter(item => item.type === 'custom').map((item, idx) => (
                                    <Link
                                      key={item._id || idx}
                                      href={item.customLink || '#'}
                                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-[#fdb022]/10 hover:text-[#171512] transition-colors"
                                    >
                                      {item.label}
                                    </Link>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )
                    }

                    // Mega menu
                    return (
                      <div key={menu._id} className="relative" onMouseEnter={() => handleMouseEnter(menu.name)} onMouseLeave={handleMouseLeave}>
                        <button
                          onClick={() => handleMenuClick(menu.name)}
                          className={`py-3.5 flex items-center gap-1.5 font-medium transition-colors ${activeMenu === menu.name ? 'text-[#fdb022]' : 'text-[#171512]/75 hover:text-[#171512]'}`}
                        >
                          {menu.name}
                          <ChevronDown size={14} className={`transition-transform duration-200 ${activeMenu === menu.name ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                          {activeMenu === menu.name && (
                            <motion.div
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 8 }}
                              transition={{ duration: 0.15 }}
                              className="absolute left-0 top-full pt-2 z-50 w-max max-w-[calc(100vw-2rem)]"
                            >
                              <div className="bg-white rounded-2xl shadow-xl border border-black/[0.06] overflow-hidden w-max max-w-[calc(100vw-2rem)]">
                                <div className="p-4">
                                  {menu.items
                                    .filter(item => item.type === 'category')
                                    .sort((a, b) => a.displayOrder - b.displayOrder)
                                    .map((item, itemIdx) => {
                                      const columns = splitIntoColumns(item.categories || [], 6)
                                      const columnRows = chunkColumns(columns, 4)
                                      return (
                                        <div key={item._id || itemIdx} className={itemIdx > 0 ? 'mt-4 pt-4 border-t border-gray-100' : ''}>
                                          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-4">
                                            {item.label}
                                          </h4>
                                          <div className="space-y-2">
                                            {columnRows.map((row, rowIdx) => (
                                              <div
                                                key={rowIdx}
                                                className="grid gap-x-4 gap-y-0 w-max"
                                                style={{
                                                  gridTemplateColumns: `repeat(${row.length}, minmax(max-content, 1fr))`,
                                                }}
                                              >
                                                {row.map((column, colIdx) => (
                                                  <div key={colIdx} className="space-y-0.5">
                                                    {column.map((cat, catIdx) => (
                                                      <Link
                                                        key={catIdx}
                                                        href={categoryHref(cat.name)}
                                                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-[#fdb022]/10 hover:text-[#171512] transition-colors rounded-lg"
                                                      >
                                                        <div className="break-words whitespace-normal leading-snug">{cat.name}</div>
                                                        {cat.description && (
                                                          <div className="text-xs text-gray-400 mt-0.5 break-words whitespace-normal leading-snug">
                                                            {cat.description}
                                                          </div>
                                                        )}
                                                      </Link>
                                                    ))}
                                                  </div>
                                                ))}
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      )
                                    })}
                                  {menu.items.filter(item => item.type === 'custom').length > 0 && (
                                    <div className="mt-4 pt-4 border-t border-gray-100">
                                      <div className="flex flex-wrap gap-2">
                                        {menu.items.filter(item => item.type === 'custom').map((item, idx) => (
                                          <Link
                                            key={item._id || idx}
                                            href={item.customLink || '#'}
                                            className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-[#fdb022]/10 hover:text-[#171512] transition-colors rounded-lg"
                                          >
                                            {item.label}
                                          </Link>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                                <div className="bg-gradient-to-r from-[#fdb022] to-[#f5a80a] px-4 py-3 flex items-center justify-between gap-4">
                                  <span className="text-sm text-[#171512] font-medium px-2">
                                    Need custom packaging? Get a free quote today.
                                  </span>
                                  <Link
                                    href="/get-a-quote"
                                    className="flex items-center gap-2 bg-[#171512] text-white text-sm font-medium px-5 py-2 rounded-lg hover:bg-black transition-colors shrink-0"
                                  >
                                    Get Quote <ArrowRight size={14} />
                                  </Link>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )
                  })
                ) : (
                  <Link href="/products" className="py-3.5 font-medium text-[#171512]/75 hover:text-[#171512] transition-colors">
                    Products
                  </Link>
                )}

                {/* Support dropdown */}
                <div className="relative" onMouseEnter={handleSupportEnter} onMouseLeave={handleSupportLeave}>
                  <button
                    onClick={() => setSupportOpen(!supportOpen)}
                    className={`py-3.5 flex items-center gap-1.5 font-medium transition-colors ${supportOpen ? 'text-[#fdb022]' : 'text-[#171512]/75 hover:text-[#171512]'}`}
                  >
                    Support
                    <ChevronDown size={14} className={`transition-transform duration-200 ${supportOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {supportOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-0 top-full pt-2 z-50 w-56"
                      >
                        <div className="bg-white rounded-xl shadow-xl border border-black/[0.06] overflow-hidden py-2">
                          {SUPPORT_LINKS.map((link) => (
                            <Link
                              key={link.href}
                              href={link.href}
                              className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-[#fdb022]/10 hover:text-[#171512] transition-colors"
                            >
                              {link.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Right-side call CTA */}
                <div className="ml-auto flex items-center gap-3 py-2.5">
                  <a
                    href={`tel:${PHONE_NUMBER}`}
                    className="flex items-center gap-2 bg-[#171512] text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-black transition-colors"
                  >
                    <Phone size={16} />
                    {PHONE_DISPLAY}
                  </a>
                </div>
              </nav>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════
              MOBILE MENU
          ═══════════════════════════════════════════════════════════ */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="lg:hidden border-t border-black/[0.08] overflow-y-auto max-h-[85vh] bg-white"
              >
                {/* Mobile contact strip */}
                <div className="bg-[#F5F1E7] px-4 py-3 flex flex-col gap-2 border-b border-black/[0.06]">
                  <a href={`tel:${PHONE_NUMBER}`} className="flex items-center gap-2 text-sm font-bold text-[#171512]">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#fdb022]/20 text-[#d99a1f]">
                      <Phone size={13} />
                    </span>
                    {PHONE_DISPLAY}
                  </a>
                  <a href={`mailto:${EMAIL_ADDRESS}`} className="flex items-center gap-2 text-sm font-semibold text-[#171512]/80">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-black/5 text-[#171512]/70">
                      <Mail size={13} />
                    </span>
                    {EMAIL_ADDRESS}
                  </a>
                </div>

                {/* Mobile search */}
                <div className="px-4 pt-3">
                  <div className="relative mb-2">
                    <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black/35" />
                    <input
                      type="text"
                      placeholder="Search boxes, materials..."
                      className="w-full bg-[#F5F1E7] border border-black/10 rounded-full pl-10 pr-4 py-2.5 text-sm placeholder:text-black/35 focus:outline-none"
                    />
                  </div>
                </div>

                {dynamicMenus.length > 0 ? dynamicMenus.map((menu) => {
                  const menuHasMegaMenu = hasMegaMenu(menu)

                  if (!menuHasMegaMenu && menu.items.length === 1 && menu.items[0].type === 'custom') {
                    return (
                      <div key={menu._id} className="border-b border-black/[0.06]">
                        <Link
                          href={menu.items[0].customLink || `/${menu.slug}`}
                          onClick={() => setIsMenuOpen(false)}
                          className="w-full block px-4 py-3 text-[#171512] font-medium"
                        >
                          {menu.name}
                        </Link>
                      </div>
                    )
                  }

                  return (
                    <div key={menu._id} className="border-b border-black/[0.06]">
                      <button
                        onClick={() => handleMenuClick(menu.name)}
                        className="w-full flex items-center justify-between px-4 py-3 text-[#171512] font-medium"
                      >
                        <span>{menu.name}</span>
                        <ChevronDown size={18} className={`transition-transform duration-200 ${activeMenu === menu.name ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {activeMenu === menu.name && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-[#F5F1E7] px-4 py-2"
                          >
                            {menu.items.filter(item => item.type === 'category').map((item, idx) => (
                              <div key={item._id || idx} className="mb-4 last:mb-0">
                                <h4 className="text-[11px] font-bold text-black/40 uppercase tracking-wider mb-2">{item.label}</h4>
                                <div className="space-y-1">
                                  {item.categories && item.categories.length > 0 ? item.categories.map((cat, catIdx) => (
                                    <Link
                                      key={catIdx}
                                      href={categoryHref(cat.name)}
                                      onClick={() => setIsMenuOpen(false)}
                                      className="block px-3 py-2 rounded-lg hover:bg-[#fdb022]/10 transition-colors"
                                    >
                                      <div className="text-sm font-medium text-[#171512] break-words whitespace-normal leading-snug">{cat.name}</div>
                                      {cat.description && (
                                        <div className="text-xs text-black/40 break-words whitespace-normal leading-snug">{cat.description}</div>
                                      )}
                                    </Link>
                                  )) : <p className="text-xs text-gray-400 px-3 py-2">No categories</p>}
                                </div>
                              </div>
                            ))}
                            {menu.items.filter(item => item.type === 'custom').map((item, idx) => (
                              <Link
                                key={item._id || idx}
                                href={item.customLink || '#'}
                                onClick={() => setIsMenuOpen(false)}
                                className="block px-3 py-2 rounded-lg hover:bg-[#fdb022]/10 transition-colors mb-2"
                              >
                                <span className="text-sm font-medium text-[#171512]">{item.label}</span>
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                }) : (
                  <div className="border-b border-black/[0.06] px-4 py-3">
                    <Link href="/products" className="font-medium text-[#171512]" onClick={() => setIsMenuOpen(false)}>
                      Products
                    </Link>
                  </div>
                )}

                {/* Support (mobile) */}
                <div className="border-b border-black/[0.06]">
                  <button
                    onClick={() => setSupportOpen(!supportOpen)}
                    className="w-full flex items-center justify-between px-4 py-3 text-[#171512] font-medium"
                  >
                    <span>Support</span>
                    <ChevronDown size={18} className={`transition-transform duration-200 ${supportOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {supportOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-[#F5F1E7] px-4 py-2"
                      >
                        {SUPPORT_LINKS.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="block px-3 py-2 rounded-lg hover:bg-[#fdb022]/10 transition-colors mb-2"
                          >
                            <span className="text-sm font-medium text-[#171512]">{link.label}</span>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Mobile CTAs */}
                <div className="px-4 py-4 space-y-3">
                  <Link
                    href="/get-a-quote"
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full text-center px-6 py-3.5 bg-gradient-to-r from-[#fdb022] to-[#f5a80a] text-[#171512] text-[15px] font-medium rounded-xl shadow-sm"
                  >
                    Get a Quote
                  </Link>
                  <a
                    href={`tel:${PHONE_NUMBER}`}
                    className="flex items-center justify-center gap-2 w-full text-center px-6 py-3.5 bg-[#171512] text-white text-[15px] font-medium rounded-xl"
                  >
                    <Phone size={16} /> {PHONE_DISPLAY}
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  )
}