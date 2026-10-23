'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Phone, Menu, X, Search, ChevronDown,
  Box, Package, ShoppingBag, Gift, Layers, Sparkles,
  Truck, Award, Star, Clock, Shield, ArrowRight,
  ShoppingCart, Loader, Link as LinkIcon, Tag, Image as ImageIcon,
} from 'lucide-react'

import { categoryHref } from '@/lib/slug'

// Logo import
import logoImage from '../assets/logo/logo.png'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://packaging-backend.vercel.app/api'

// Contact details
const PHONE_NUMBER = '+12177276247'
const PHONE_DISPLAY = '+1 (217) 727-6247'
const SITE_NAME = 'Slick Custom Boxes'

// Trust points shown in the slim top bar (edit freely)
const TOP_BAR_POINTS = [
  { icon: Truck, text: 'Free shipping' },
  { icon: Award, text: 'Free design support' },
  { icon: Shield, text: 'Quality guaranteed' },
]

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

// Shared style tokens
const navButtonBase =
  'relative py-2 flex items-center gap-1.5 text-[15px] font-semibold tracking-[0.01em] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fdb022] focus-visible:ring-offset-2 rounded-md'
const dropdownLink =
  'block px-4 py-2.5 text-sm font-medium text-[#4a463e] rounded-lg hover:bg-[#fdb022]/15 hover:text-[#171512] focus-visible:bg-[#fdb022]/15 focus:outline-none transition-colors'

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
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => { fetchDynamicMenus() }, [])

  // Close any open dropdown with the Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveMenu(null)
        setSupportOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

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

  // Animated underline used by every desktop nav item
  const Underline = ({ active }: { active: boolean }) => (
    <span
      className={`pointer-events-none absolute -bottom-1 left-0 h-[3px] rounded-full bg-[#fdb022] transition-all duration-300 ${
        active ? 'w-full' : 'w-0 group-hover:w-full'
      }`}
    />
  )

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* TOP BAR: trust points + phone. Collapses on scroll to keep the header compact */}
      <div
        className={`hidden xl:block bg-[#171512] text-white overflow-hidden transition-all duration-300 ${
          isScrolled ? 'max-h-0 opacity-0' : 'max-h-12 opacity-100'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8 h-10 flex items-center justify-between">
          <ul className="flex items-center gap-7">
            {TOP_BAR_POINTS.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-2 text-[13px] font-medium text-white/80">
                <Icon size={15} className="text-[#fdb022]" />
                {text}
              </li>
            ))}
          </ul>
          <a
            href={`tel:${PHONE_NUMBER}`}
            className="flex items-center gap-2 text-[13px] font-medium text-white/80 hover:text-white transition-colors"
          >
            Questions? Call toll free
            <span className="font-bold text-[#fdb022]">{PHONE_DISPLAY}</span>
          </a>
        </div>
      </div>

      {/* MAIN HEADER */}
      <div
        className={`bg-white transition-shadow duration-300 ${
          isScrolled ? 'shadow-[0_8px_30px_rgba(23,21,18,0.12)]' : 'shadow-sm'
        }`}
      >
        <div className="w-full px-4 md:px-6 lg:px-8 max-w-[1600px] mx-auto">
          <div className={`flex items-center justify-between gap-4 transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`}>

            {/* 1. Logo */}
            <Link href="/" className="flex items-center shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fdb022] rounded-md" aria-label={`${SITE_NAME} home`}>
              <Image
                src={logoImage}
                alt={SITE_NAME}
                priority
                className={`w-auto object-contain transition-all duration-300 ${isScrolled ? 'h-10 md:h-12' : 'h-12 md:h-[3.75rem]'}`}
              />
            </Link>

            {/* 2. Desktop navigation */}
            <nav className="hidden xl:flex items-center gap-8 2xl:gap-10 flex-1 justify-center" aria-label="Main">
              {loadingMenus ? (
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Loader size={14} className="animate-spin" />
                  <span>Loading...</span>
                </div>
              ) : dynamicMenus.length > 0 ? (
                dynamicMenus.map((menu) => {
                  const menuHasMegaMenu = hasMegaMenu(menu)
                  const isActive = activeMenu === menu.name

                  // Single custom link
                  if (!menuHasMegaMenu && menu.items.length === 1 && menu.items[0].type === 'custom') {
                    return (
                      <Link
                        key={menu._id}
                        href={menu.items[0].customLink || `/${menu.slug}`}
                        className={`${navButtonBase} group text-[#171512] hover:text-[#171512]`}
                      >
                        {menu.name}
                        <Underline active={false} />
                      </Link>
                    )
                  }

                  // Simple dropdown
                  if (!menuHasMegaMenu && menu.items.every(item => item.type === 'custom')) {
                    return (
                      <div key={menu._id} className="relative" onMouseEnter={() => handleMouseEnter(menu.name)} onMouseLeave={handleMouseLeave}>
                        <button
                          onClick={() => handleMenuClick(menu.name)}
                          aria-expanded={isActive}
                          aria-haspopup="true"
                          className={`${navButtonBase} group text-[#171512]`}
                        >
                          {menu.name}
                          <ChevronDown size={15} className={`text-[#fdb022] transition-transform duration-200 ${isActive ? 'rotate-180' : ''}`} />
                          <Underline active={isActive} />
                        </button>
                        <AnimatePresence>
                          {isActive && (
                            <motion.div
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 8 }}
                              transition={{ duration: 0.18 }}
                              className="absolute left-0 top-full pt-5 z-50 w-60"
                            >
                              <div className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(23,21,18,0.18)] border border-[#171512]/10 overflow-hidden p-2">
                                {menu.items.filter(item => item.type === 'custom').map((item, idx) => (
                                  <Link key={item._id || idx} href={item.customLink || '#'} className={dropdownLink}>
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
                        aria-expanded={isActive}
                        aria-haspopup="true"
                        className={`${navButtonBase} group text-[#171512]`}
                      >
                        {menu.name}
                        <ChevronDown size={15} className={`text-[#fdb022] transition-transform duration-200 ${isActive ? 'rotate-180' : ''}`} />
                        <Underline active={isActive} />
                      </button>
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.18 }}
                            className="absolute left-1/2 -translate-x-1/2 top-full pt-5 z-50 w-max max-w-[calc(100vw-2rem)]"
                          >
                            <div className="bg-white rounded-2xl shadow-[0_24px_60px_rgba(23,21,18,0.22)] border border-[#171512]/10 overflow-hidden w-max max-w-[calc(100vw-2rem)]">
                              <div className="p-7">
                                {menu.items
                                  .filter(item => item.type === 'category')
                                  .sort((a, b) => a.displayOrder - b.displayOrder)
                                  .map((item, itemIdx) => {
                                    const columns = splitIntoColumns(item.categories || [], 6)
                                    const columnRows = chunkColumns(columns, 4)
                                    const SectionIcon = resolveIconComponent(item.icon)
                                    return (
                                      <div key={item._id || itemIdx} className={itemIdx > 0 ? 'mt-7 pt-7 border-t border-[#171512]/10' : ''}>
                                        <h4 className="flex items-center gap-2.5 text-[15px] font-bold text-[#171512] mb-3 px-3">
                                          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#fdb022] text-[#171512]">
                                            {SectionIcon ? <SectionIcon size={17} strokeWidth={2.2} /> : <Package size={17} strokeWidth={2.2} />}
                                          </span>
                                          {item.label}
                                        </h4>
                                        <div className="space-y-2">
                                          {columnRows.map((row, rowIdx) => (
                                            <div
                                              key={rowIdx}
                                              className="grid gap-x-6 gap-y-0 w-max"
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
                                                      className="group/cat block px-3 py-2.5 text-sm text-[#171512] font-semibold rounded-lg border-l-[3px] border-transparent hover:border-[#fdb022] hover:bg-[#F5F1E7] focus-visible:bg-[#F5F1E7] focus:outline-none transition-colors"
                                                    >
                                                      <div className="break-words whitespace-normal leading-snug">{cat.name}</div>
                                                      {cat.description && (
                                                        <div className="text-xs font-normal text-[#6b665b] mt-0.5 break-words whitespace-normal leading-snug">
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
                                  <div className="mt-7 pt-7 border-t border-[#171512]/10">
                                    <div className="flex flex-wrap gap-2">
                                      {menu.items.filter(item => item.type === 'custom').map((item, idx) => (
                                        <Link
                                          key={item._id || idx}
                                          href={item.customLink || '#'}
                                          className="px-4 py-2 text-sm font-semibold text-[#171512] rounded-full border border-[#171512]/15 hover:bg-[#fdb022] hover:border-[#fdb022] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fdb022] transition-colors"
                                        >
                                          {item.label}
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                              <div className="bg-[#171512] px-7 py-5 flex items-center justify-between gap-6">
                                <div>
                                  <p className="text-[15px] text-white font-bold">Need custom packaging?</p>
                                  <p className="text-sm text-white/65">Tell us what you need and get a free quote today.</p>
                                </div>
                                <Link
                                  href="/get-a-quote"
                                  className="flex items-center gap-2 bg-[#fdb022] text-[#171512] text-sm font-bold px-6 py-3 rounded-xl hover:bg-[#ffc24d] transition-colors shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                                >
                                  Get a Quote <ArrowRight size={16} />
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
                <Link href="/products" className={`${navButtonBase} group text-[#171512]`}>
                  Products
                  <Underline active={false} />
                </Link>
              )}

              {/* Support dropdown */}
              <div className="relative" onMouseEnter={handleSupportEnter} onMouseLeave={handleSupportLeave}>
                <button
                  onClick={() => setSupportOpen(!supportOpen)}
                  aria-expanded={supportOpen}
                  aria-haspopup="true"
                  className={`${navButtonBase} group text-[#171512]`}
                >
                  Support
                  <ChevronDown size={15} className={`text-[#fdb022] transition-transform duration-200 ${supportOpen ? 'rotate-180' : ''}`} />
                  <Underline active={supportOpen} />
                </button>
                <AnimatePresence>
                  {supportOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18 }}
                      className="absolute left-0 top-full pt-5 z-50 w-56"
                    >
                      <div className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(23,21,18,0.18)] border border-[#171512]/10 overflow-hidden p-2">
                        {SUPPORT_LINKS.map((link) => (
                          <Link key={link.href} href={link.href} className={dropdownLink}>
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>

            {/* 3. Right side: phone + CTA */}
            <div className="hidden xl:flex items-center gap-4 shrink-0">
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="group flex items-center gap-3 rounded-full bg-[#171512] pl-1.5 pr-5 py-1.5 hover:bg-black transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fdb022] focus-visible:ring-offset-2"
              >
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[#fdb022] text-[#171512]">
                  <Phone size={20} strokeWidth={2.4} className="group-hover:-rotate-12 transition-transform duration-300" />
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="text-[11px] text-white/60 font-medium">Call us toll free</span>
                  <span className="text-[16px] font-extrabold text-white">{PHONE_DISPLAY}</span>
                </span>
              </a>

              <Link
                href="/get-a-quote"
                className="flex items-center gap-2 bg-[#fdb022] hover:bg-[#f5a80a] text-[#171512] text-[15px] font-bold px-7 py-3.5 rounded-full shadow-[0_6px_18px_rgba(253,176,34,0.45)] hover:shadow-[0_10px_24px_rgba(253,176,34,0.45)] hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#171512] focus-visible:ring-offset-2"
              >
                Get a Quote
                <ArrowRight size={17} strokeWidth={2.4} />
              </Link>
            </div>

            {/* Mobile: quick call + menu button */}
            <div className="xl:hidden ml-auto flex items-center gap-2">
              <a
                href={`tel:${PHONE_NUMBER}`}
                aria-label="Call us"
                className="flex items-center justify-center w-11 h-11 rounded-full bg-[#fdb022] text-[#171512] hover:bg-[#f5a80a] transition-colors"
              >
                <Phone size={20} strokeWidth={2.4} />
              </a>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center justify-center w-11 h-11 rounded-full bg-[#171512] text-white hover:bg-black transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fdb022] focus-visible:ring-offset-2"
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          {/* MOBILE MENU */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="xl:hidden border-t border-[#171512]/10 overflow-y-auto max-h-[80vh] bg-white -mx-4 md:-mx-6 lg:-mx-8"
              >
                {/* Mobile contact strip */}
                <a
                  href={`tel:${PHONE_NUMBER}`}
                  className="flex items-center gap-3 bg-[#171512] px-4 md:px-6 py-4"
                >
                  <span className="flex items-center justify-center w-11 h-11 rounded-full bg-[#fdb022] text-[#171512]">
                    <Phone size={22} strokeWidth={2.4} />
                  </span>
                  <span className="flex flex-col leading-tight">
                    <span className="text-xs text-white/60 font-medium">Call us toll free</span>
                    <span className="text-[18px] font-extrabold text-white">{PHONE_DISPLAY}</span>
                  </span>
                </a>

                {/* Mobile search */}
                <div className="px-4 md:px-6 pt-4">
                  <div className="relative mb-2">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#171512]/40" />
                    <input
                      type="text"
                      placeholder="Search boxes, materials..."
                      className="w-full bg-[#F5F1E7] border border-[#171512]/10 rounded-full pl-11 pr-4 py-3 text-sm placeholder:text-[#171512]/40 focus:outline-none focus:ring-2 focus:ring-[#fdb022]"
                    />
                  </div>
                </div>

                {dynamicMenus.length > 0 ? dynamicMenus.map((menu) => {
                  const menuHasMegaMenu = hasMegaMenu(menu)

                  if (!menuHasMegaMenu && menu.items.length === 1 && menu.items[0].type === 'custom') {
                    return (
                      <div key={menu._id} className="border-b border-[#171512]/10">
                        <Link
                          href={menu.items[0].customLink || `/${menu.slug}`}
                          onClick={() => setIsMenuOpen(false)}
                          className="w-full block px-4 md:px-6 py-4 text-[#171512] font-bold"
                        >
                          {menu.name}
                        </Link>
                      </div>
                    )
                  }

                  return (
                    <div key={menu._id} className="border-b border-[#171512]/10">
                      <button
                        onClick={() => handleMenuClick(menu.name)}
                        aria-expanded={activeMenu === menu.name}
                        className="w-full flex items-center justify-between px-4 md:px-6 py-4 text-[#171512] font-bold"
                      >
                        <span>{menu.name}</span>
                        <ChevronDown size={18} className={`text-[#fdb022] transition-transform duration-200 ${activeMenu === menu.name ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {activeMenu === menu.name && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-[#F5F1E7] px-4 md:px-6 py-3 overflow-hidden"
                          >
                            {menu.items.filter(item => item.type === 'category').map((item, idx) => {
                              const SectionIcon = resolveIconComponent(item.icon)
                              return (
                                <div key={item._id || idx} className="mb-4 last:mb-0">
                                  <h4 className="flex items-center gap-2 text-sm font-bold text-[#171512] mb-2">
                                    <span className="flex items-center justify-center w-7 h-7 rounded-md bg-[#fdb022] text-[#171512]">
                                      {SectionIcon ? <SectionIcon size={15} strokeWidth={2.2} /> : <Package size={15} strokeWidth={2.2} />}
                                    </span>
                                    {item.label}
                                  </h4>
                                  <div className="space-y-1">
                                    {item.categories && item.categories.length > 0 ? item.categories.map((cat, catIdx) => (
                                      <Link
                                        key={catIdx}
                                        href={categoryHref(cat.name)}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="block px-3 py-2 rounded-lg border-l-[3px] border-transparent hover:border-[#fdb022] hover:bg-white transition-colors"
                                      >
                                        <div className="text-sm font-semibold text-[#171512] break-words whitespace-normal leading-snug">{cat.name}</div>
                                        {cat.description && (
                                          <div className="text-xs text-[#6b665b] break-words whitespace-normal leading-snug">{cat.description}</div>
                                        )}
                                      </Link>
                                    )) : <p className="text-xs text-gray-500 px-3 py-2">No categories</p>}
                                  </div>
                                </div>
                              )
                            })}
                            {menu.items.filter(item => item.type === 'custom').map((item, idx) => (
                              <Link
                                key={item._id || idx}
                                href={item.customLink || '#'}
                                onClick={() => setIsMenuOpen(false)}
                                className="block px-3 py-2 rounded-lg hover:bg-white transition-colors mb-1"
                              >
                                <span className="text-sm font-semibold text-[#171512]">{item.label}</span>
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                }) : (
                  <div className="border-b border-[#171512]/10 px-4 md:px-6 py-4">
                    <Link href="/products" className="font-bold text-[#171512]" onClick={() => setIsMenuOpen(false)}>
                      Products
                    </Link>
                  </div>
                )}

                {/* Support (mobile) */}
                <div className="border-b border-[#171512]/10">
                  <button
                    onClick={() => setSupportOpen(!supportOpen)}
                    aria-expanded={supportOpen}
                    className="w-full flex items-center justify-between px-4 md:px-6 py-4 text-[#171512] font-bold"
                  >
                    <span>Support</span>
                    <ChevronDown size={18} className={`text-[#fdb022] transition-transform duration-200 ${supportOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {supportOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-[#F5F1E7] px-4 md:px-6 py-3 overflow-hidden"
                      >
                        {SUPPORT_LINKS.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="block px-3 py-2 rounded-lg hover:bg-white transition-colors mb-1"
                          >
                            <span className="text-sm font-semibold text-[#171512]">{link.label}</span>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Mobile CTAs */}
                <div className="px-4 md:px-6 py-5 space-y-3">
                  <Link
                    href="/get-a-quote"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-[#fdb022] text-[#171512] text-[15px] font-bold rounded-full shadow-[0_6px_18px_rgba(253,176,34,0.45)]"
                  >
                    Get a Quote <ArrowRight size={17} strokeWidth={2.4} />
                  </Link>
                  <a
                    href={`tel:${PHONE_NUMBER}`}
                    className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-[#171512] text-white text-[15px] font-bold rounded-full"
                  >
                    <Phone size={16} /> Call Now
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
