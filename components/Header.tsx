'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Phone, Mail, Menu, X, Search, ChevronDown,
  Box, Package, ShoppingBag, Gift, Layers, Sparkles,
  Truck, Award, Star, Clock, Shield, ArrowRight,
  ShoppingCart, Loader, Link as LinkIcon, Tag, Image,
  MessageCircle,
} from 'lucide-react'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://packaging-backend.vercel.app/api'

// Contact details — update these
const PHONE_NUMBER = '+18005555555'
const PHONE_DISPLAY = '(800) 555-5555'
const WHATSAPP_NUMBER = '18005555555' // no + or spaces
const WHATSAPP_MESSAGE = 'Hi! I would like to get a quote for custom packaging.'

// Map icon names to actual Lucide components
const iconMap: { [key: string]: any } = {
  Box, Package, ShoppingBag, Gift, Layers, Sparkles,
  Truck, Award, Star, Clock, Shield, ShoppingCart,
  LinkIcon, Tag, Image,
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
        console.log('📦 Menus loaded:', data.data?.length || 0)
        if (data.data) {
          data.data.forEach((menu: DynamicMenu) => {
            menu.items?.forEach((item: MenuItem) => {
              console.log(`   Item "${item.label}" - showCategoryIcon: ${item.showCategoryIcon}, icon: ${item.icon}`)
              if (item.categories) {
                item.categories.forEach((cat: MenuCategory) => {
                  console.log(`     Category "${cat.name}" - icon: "${cat.icon}", image: "${cat.image?.substring(0, 30)}"`)
                })
              }
            })
          })
        }
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

  // Render icon for a category in the dropdown
  const renderCategoryIcon = (cat: MenuCategory, fallbackIconName: string) => {
    if (cat.icon && cat.icon.trim()) {
      const iconVal = cat.icon.trim()
      if (iconVal.startsWith('http')) {
        return (
          <img 
            src={iconVal} 
            alt="" 
            className="w-4 h-4 object-cover rounded-sm" 
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} 
          />
        )
      }
      const IconComponent = resolveIconComponent(iconVal)
      if (IconComponent) return <IconComponent size={15} />
    }

    if (cat.image && cat.image.trim() && cat.image.startsWith('http')) {
      return (
        <img 
          src={cat.image} 
          alt="" 
          className="w-4 h-4 object-cover rounded-sm" 
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} 
        />
      )
    }

    const FallbackIcon = resolveIconComponent(fallbackIconName)
    if (FallbackIcon) return <FallbackIcon size={15} />

    return <Layers size={15} />
  }

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'pt-2 px-2' : 'pt-0 px-0'}`}>
      <div className={`w-[95%] mx-auto bg-white transition-all duration-300 ${isScrolled ? 'rounded-2xl shadow-lg' : 'rounded-none shadow-none'}`}>
        {/* Row 1 — logo / search / utility */}
        <div className="border-b border-black/[0.08] px-6">
          <div className="py-4 flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 shrink-0 group">
              <div className="w-9 h-9 bg-[#fdb022] rounded-lg flex items-center justify-center text-lg transform group-hover:scale-105 transition-transform duration-200">📦</div>
              <span className="font-bold text-xl text-[#171512] tracking-tight">BoxPack</span>
            </Link>

            <div className="hidden md:flex flex-1 max-w-xl">
              <div className="relative w-full">
                <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black/35" />
                <input type="text" placeholder="Search boxes, materials, industries..." className="w-full bg-[#F5F1E7] border border-black/10 rounded-full pl-10 pr-4 py-2.5 text-sm text-[#171512] placeholder:text-black/35 focus:outline-none focus:ring-2 focus:ring-[#fdb022]/30 focus:border-[#fdb022] transition-all" />
              </div>
            </div>

            <div className="hidden md:flex items-center gap-5 ml-auto shrink-0">
              <a href="tel:+18005555555" className="hidden lg:flex items-center gap-2 text-sm text-[#171512]/70 hover:text-[#171512] transition-colors"><Phone size={16} /><span>(800) 555-5555</span></a>
              <a href="mailto:sales@example.com" className="hidden lg:flex items-center gap-2 text-sm text-[#171512]/70 hover:text-[#171512] transition-colors"><Mail size={16} /></a>
              <Link href="/get-a-quote" className="flex items-center gap-2 bg-[#fdb022] text-[#171512] text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-[#f5a80a] transition-colors">Get Quote<ArrowRight size={15} /></Link>
            </div>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden ml-auto text-[#171512] p-2 hover:bg-black/5 rounded-lg transition-colors">
              {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Row 2 — Dynamic Navigation, desktop only */}
        <div className="hidden lg:block">
          <div className="px-6">
            <nav className="flex items-center gap-8 text-sm">
              {loadingMenus ? (
                <div className="flex items-center gap-2 py-3.5 text-sm text-gray-400"><Loader size={14} className="animate-spin" /><span>Loading...</span></div>
              ) : dynamicMenus.length > 0 ? (
                dynamicMenus.map((menu) => {
                  const menuHasMegaMenu = hasMegaMenu(menu)

                  // Single link menu (no dropdown)
                  if (!menuHasMegaMenu && menu.items.length === 1 && menu.items[0].type === 'custom') {
                    return (
                      <Link key={menu._id} href={menu.items[0].customLink || `/${menu.slug}`} className="py-3.5 font-medium text-[#171512]/70 hover:text-[#171512] transition-colors">
                        {menu.name}
                      </Link>
                    )
                  }

                  // Multiple single links (simple dropdown)
                  if (!menuHasMegaMenu && menu.items.every(item => item.type === 'custom')) {
                    return (
                      <div key={menu._id} className="relative" onMouseEnter={() => handleMouseEnter(menu.name)} onMouseLeave={handleMouseLeave}>
                        <button onClick={() => handleMenuClick(menu.name)} className={`py-3.5 flex items-center gap-1.5 font-medium transition-colors ${activeMenu === menu.name ? 'text-[#fdb022]' : 'text-[#171512]/70 hover:text-[#171512]'}`}>
                          {menu.name}<ChevronDown size={14} className={`transition-transform duration-200 ${activeMenu === menu.name ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                          {activeMenu === menu.name && (
                            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.15 }} className="absolute left-0 top-full pt-2 z-50 w-56">
                              <div className="bg-white rounded-xl shadow-xl border border-black/[0.06] overflow-hidden py-2">
                                {menu.items.filter(item => item.type === 'custom').map((item, idx) => (
                                  <Link key={item._id || idx} href={item.customLink || '#'} className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-[#fdb022]/10 hover:text-[#171512] transition-colors">
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

                  // Mega Menu
                  return (
                    <div key={menu._id} className="relative" onMouseEnter={() => handleMouseEnter(menu.name)} onMouseLeave={handleMouseLeave}>
                      <button onClick={() => handleMenuClick(menu.name)} className={`py-3.5 flex items-center gap-1.5 font-medium transition-colors ${activeMenu === menu.name ? 'text-[#fdb022]' : 'text-[#171512]/70 hover:text-[#171512]'}`}>
                        {menu.name}<ChevronDown size={14} className={`transition-transform duration-200 ${activeMenu === menu.name ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {activeMenu === menu.name && (
                          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.15 }} className="absolute left-0 top-full pt-2 z-50" style={{ minWidth: '600px', maxWidth: '900px' }}>
                            <div className="bg-white rounded-2xl shadow-xl border border-black/[0.06] overflow-hidden">
                              <div className="p-6">
                                {menu.items.filter(item => item.type === 'category').sort((a, b) => a.displayOrder - b.displayOrder).map((item, itemIdx) => {
                                  const columns = splitIntoColumns(item.categories || [], 6)
                                  const showIcons = item.showCategoryIcon !== false
                                  return (
                                    <div key={item._id || itemIdx} className={itemIdx > 0 ? 'mt-6 pt-6 border-t border-gray-100' : ''}>
                                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">{item.label}</h4>
                                      <div className={`grid gap-6 ${columns.length === 1 ? 'grid-cols-1' : columns.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                                        {columns.map((column, colIdx) => (
                                          <div key={colIdx} className="space-y-0.5">
                                            {column.map((cat, catIdx) => (
                                              <Link
                                                key={catIdx}
                                                href={`/products/${encodeURIComponent(cat.name)}`}
                                                className="block px-2.5 py-2 rounded-lg hover:bg-[#fdb022]/10 transition-colors group/item"
                                              >
                                                <div className="text-sm font-medium text-[#171512] group-hover/item:text-[#fdb022] transition-colors truncate">
                                                  {cat.name}
                                                </div>
                                                {cat.description && (
                                                  <div className="text-xs text-black/40 truncate mt-0.5">{cat.description}</div>
                                                )}
                                              </Link>
                                            ))}
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )
                                })}
                                {/* Single links mixed with mega menu */}
                                {menu.items.filter(item => item.type === 'custom').length > 0 && (
                                  <div className="mt-6 pt-6 border-t border-gray-100">
                                    <div className="flex flex-wrap gap-3">
                                      {menu.items.filter(item => item.type === 'custom').map((item, idx) => (
                                        <Link key={item._id || idx} href={item.customLink || '#'} className="px-4 py-2 bg-gray-50 rounded-lg text-sm font-medium text-gray-700 hover:bg-[#fdb022]/10 hover:text-[#171512] transition-colors">
                                          {item.label}
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                              <div className="bg-[#fdb022] px-6 py-4 flex items-center justify-between">
                                <span className="text-sm text-[#171512] font-medium">Need custom packaging? Get a free quote today.</span>
                                <Link href="/get-a-quote" className="flex items-center gap-2 bg-[#171512] text-white text-sm font-semibold px-5 py-2 rounded-lg hover:bg-black transition-colors shrink-0 ml-4">Get Quote<ArrowRight size={14} /></Link>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })
              ) : (
                <>
                  <Link href="/products" className="py-3.5 font-medium text-[#171512]/70 hover:text-[#171512] transition-colors">Products</Link>
                </>
              )}

              {/* Support dropdown */}
              <div
                className="relative"
                onMouseEnter={handleSupportEnter}
                onMouseLeave={handleSupportLeave}
              >
                <button
                  onClick={() => setSupportOpen(!supportOpen)}
                  className={`py-3.5 flex items-center gap-1.5 font-medium transition-colors ${supportOpen ? 'text-[#fdb022]' : 'text-[#171512]/70 hover:text-[#171512]'}`}
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

              {/* WhatsApp + Call buttons on the right */}
              <div className="ml-auto flex items-center gap-3 py-2.5">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#25D366] text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-[#1ebe5b] transition-colors"
                >
                  <MessageCircle size={16} />
                  WhatsApp
                </a>
                <a
                  href={`tel:${PHONE_NUMBER}`}
                  className="flex items-center gap-2 border-2 border-[#171512] text-[#171512] text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-[#171512] hover:text-white transition-colors"
                >
                  <Phone size={16} />
                  Call Us
                </a>
              </div>
            </nav>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="lg:hidden border-t border-black/[0.08] overflow-y-auto max-h-[80vh] bg-white">
              <div className="px-4 pt-3"><div className="relative mb-2"><Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black/35" /><input type="text" placeholder="Search boxes, materials..." className="w-full bg-[#F5F1E7] border border-black/10 rounded-full pl-10 pr-4 py-2.5 text-sm placeholder:text-black/35 focus:outline-none" /></div></div>
              
              {dynamicMenus.length > 0 ? dynamicMenus.map((menu) => {
                const menuHasMegaMenu = hasMegaMenu(menu)
                
                if (!menuHasMegaMenu && menu.items.length === 1 && menu.items[0].type === 'custom') {
                  return <div key={menu._id} className="border-b border-black/[0.06]"><Link href={menu.items[0].customLink || `/${menu.slug}`} onClick={() => setIsMenuOpen(false)} className="w-full block px-4 py-3 text-[#171512] font-medium">{menu.name}</Link></div>
                }
                
                return (
                  <div key={menu._id} className="border-b border-black/[0.06]">
                    <button onClick={() => handleMenuClick(menu.name)} className="w-full flex items-center justify-between px-4 py-3 text-[#171512] font-medium">
                      <span>{menu.name}</span>
                      <ChevronDown size={18} className={`transition-transform duration-200 ${activeMenu === menu.name ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {activeMenu === menu.name && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="bg-[#F5F1E7] px-4 py-2">
                          {menu.items.filter(item => item.type === 'category').map((item, idx) => (
                            <div key={item._id || idx} className="mb-4 last:mb-0">
                              <h4 className="text-[11px] font-bold text-black/40 uppercase tracking-wider mb-2">{item.label}</h4>
                              <div className="space-y-1">
                                {item.categories && item.categories.length > 0 ? item.categories.map((cat, catIdx) => (
                                  <Link key={catIdx} href={`/products/${encodeURIComponent(cat.name)}`} onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-[#fdb022]/10 transition-colors">
                                    <div className="text-sm font-medium text-[#171512] truncate">{cat.name}</div>
                                    {cat.description && <div className="text-xs text-black/40 truncate">{cat.description}</div>}
                                  </Link>
                                )) : <p className="text-xs text-gray-400 px-3 py-2">No categories</p>}
                              </div>
                            </div>
                          ))}
                          {menu.items.filter(item => item.type === 'custom').map((item, idx) => (
                            <Link key={item._id || idx} href={item.customLink || '#'} onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-[#fdb022]/10 transition-colors mb-2">
                              <span className="text-sm font-medium text-[#171512]">{item.label}</span>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              }) : (
                <>
                  <div className="border-b border-black/[0.06] px-4 py-3"><Link href="/products" className="font-medium text-[#171512]" onClick={() => setIsMenuOpen(false)}>Products</Link></div>
                </>
              )}

              {/* Support dropdown (mobile) */}
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
              
              <div className="px-4 py-4 space-y-3">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full text-center px-6 py-3 bg-[#25D366] text-white font-semibold rounded-lg hover:bg-[#1ebe5b] transition-colors"
                >
                  <MessageCircle size={16} /> WhatsApp
                </a>
                <Link href="/get-a-quote" onClick={() => setIsMenuOpen(false)} className="block w-full text-center px-6 py-3 bg-[#fdb022] text-[#171512] font-semibold rounded-lg hover:bg-[#f5a80a] transition-colors">Get Quote</Link>
                <a href={`tel:${PHONE_NUMBER}`} className="flex items-center justify-center gap-2 w-full text-center px-6 py-3 border-2 border-black/10 text-[#171512] font-medium rounded-lg"><Phone size={16} /> {PHONE_DISPLAY}</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}