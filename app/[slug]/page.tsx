// app/[slug]/page.tsx
// Flat-URL catch-all:
//   /custom-apparel-boxes          → category page
//   /custom-t-shirt-boxes          → product page
//
// Resolves the slug client-side with multiple fallbacks so a 404 here means
// the product genuinely doesn't exist in the API, not that our lookup missed it.
'use client'

import { useEffect, useState } from 'react'
import { notFound, useParams } from 'next/navigation'
import { matchCategoryBySlug, slugify } from '@/lib/slug'
import CategoryProductsPage from '@/app/products/[category]/page'
import ProductDetailPage from '@/app/products/[category]/[product]/page'
import { Loader } from 'lucide-react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://packaging-backend.vercel.app/api'

type Mode = 'loading' | 'category' | 'product' | 'not-found'

interface AnyProduct {
  _id: string
  title: string
  slug?: string
  description?: string
  images?: string[]
  category: string
  price?: number
  isActive?: boolean
  createdAt?: string
  updatedAt?: string
}

/**
 * Extract an array of records from any plausible API shape:
 *   [...]
 *   { data: [...] }
 *   { data: { data: [...] } }
 *   { data: { products: [...] } }
 *   { data: { docs: [...] } }
 *   { data: { items: [...] } }
 *   { products: [...] }
 *   { docs: [...] }
 *   { items: [...] }
 *   { results: [...] }
 */
function extractArray<T = any>(json: any): T[] {
  if (json == null) return []
  if (Array.isArray(json)) return json as T[]

  const tryKeys = (obj: any): T[] | null => {
    if (!obj || typeof obj !== 'object') return null
    for (const k of ['data', 'products', 'items', 'docs', 'results', 'records', 'list']) {
      if (Array.isArray(obj[k])) return obj[k] as T[]
    }
    return null
  }

  // First level
  const first = tryKeys(json)
  if (first) return first

  // Second level (e.g. { data: { docs: [...] } })
  if (json.data && typeof json.data === 'object') {
    const second = tryKeys(json.data)
    if (second) return second
  }

  return []
}

/** Ultra-forgiving slug comparison. */
function slugMatches(productSlugOrTitle: string | undefined, target: string): boolean {
  if (!productSlugOrTitle) return false
  const raw = productSlugOrTitle.trim().toLowerCase()
  if (!raw) return false

  const variants = [
    raw,
    raw.replace(/\s+/g, '-'),
    raw.replace(/_+/g, '-'),
    raw.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''),
    slugify(raw),
  ].filter(Boolean)

  // Normalize target too
  const targetNorm = target.replace(/_+/g, '-').toLowerCase()

  for (const v of variants) {
    if (v === target || v === targetNorm) return true
    // Fuzzy: strip hyphens/underscores and compare
    const vStripped = v.replace(/[-_]/g, '')
    const tStripped = targetNorm.replace(/[-_]/g, '')
    if (vStripped && vStripped === tStripped) return true
  }
  return false
}

/** Does this product object match the URL slug? */
function productMatches(p: AnyProduct, target: string): boolean {
  if (!p) return false
  return (
    slugMatches(p.slug, target) ||
    slugMatches(p.title, target)
  )
}

export default function FlatSlugPage() {
  const params = useParams()
  const rawParams = params as Record<string, string | undefined>
  const slug = (rawParams.slug || '') as string

  const [mode, setMode] = useState<Mode>('loading')
  const [resolvedProduct, setResolvedProduct] = useState<AnyProduct | null>(null)
  const [debugInfo, setDebugInfo] = useState<string>('')

  useEffect(() => {
    if (!slug) return
    let cancelled = false

    ;(async () => {
      const triedUrls: string[] = []
      const log = (msg: string) => {
        // Remove or gate this behind NODE_ENV if you don't want console noise
        console.log('[flat-slug]', msg)
      }

      try {
        // ── 1) Category? ────────────────────────────────────────────
        try {
          const catRes = await fetch(`${API_URL}/categories?isActive=true`)
          if (catRes.ok) {
            const catJson = await catRes.json()
            const list = extractArray(catJson)
            if (matchCategoryBySlug(list as any, slug)) {
              if (!cancelled) setMode('category')
              return
            }
          }
        } catch (e) {
          log(`category lookup failed: ${String(e)}`)
        }

        const target = slugify(slug)

        // ── 2a) Try dedicated single-slug endpoints ─────────────────
        const singleEndpoints = [
          `${API_URL}/products/resolve/${encodeURIComponent(slug)}`,
          `${API_URL}/products/by-slug/${encodeURIComponent(slug)}`,
          `${API_URL}/products/slug/${encodeURIComponent(slug)}`,
        ]

        for (const url of singleEndpoints) {
          triedUrls.push(url)
          try {
            const res = await fetch(url, { headers: { 'Content-Type': 'application/json' } })
            if (!res.ok) continue
            const json = await res.json()
            const candidate: AnyProduct | null =
              json?.data && typeof json.data === 'object' && json.data._id
                ? json.data
                : json && typeof json === 'object' && (json as any)._id
                  ? (json as AnyProduct)
                  : null
            if (candidate && productMatches(candidate, target)) {
              log(`resolved via ${url}`)
              if (!cancelled) {
                setResolvedProduct(candidate)
                setMode('product')
              }
              return
            }
          } catch (e) {
            log(`single endpoint failed (${url}): ${String(e)}`)
          }
        }

        // ── 2b) Fetch products list (multiple query variations) ─────
        const listUrls = [
          `${API_URL}/products?isActive=true`,
          `${API_URL}/products?isActive=true&limit=1000`,
          `${API_URL}/products?isActive=true&limit=500`,
          `${API_URL}/products?isActive=true&limit=200`,
          `${API_URL}/products?isActive=true&limit=100`,
          `${API_URL}/products?limit=1000`,
          `${API_URL}/products`,
        ]

        for (const url of listUrls) {
          triedUrls.push(url)
          try {
            const res = await fetch(url)
            if (!res.ok) continue
            const json = await res.json()
            const list: AnyProduct[] = extractArray(json)
            if (!list.length) continue
            const found = list.find(p => productMatches(p, target))
            if (found) {
              log(`resolved via list ${url} (found "${found.title}")`)
              if (!cancelled) {
                setResolvedProduct(found)
                setMode('product')
              }
              return
            }
          } catch (e) {
            log(`list fetch failed (${url}): ${String(e)}`)
          }
        }

        // ── 2c) Paginate (some APIs cap at 100 per page) ────────────
        for (let page = 1; page <= 15; page++) {
          const url = `${API_URL}/products?isActive=true&page=${page}&limit=100`
          triedUrls.push(url)
          try {
            const res = await fetch(url)
            if (!res.ok) break
            const json = await res.json()
            const list: AnyProduct[] = extractArray(json)
            if (!list.length) break
            const found = list.find(p => productMatches(p, target))
            if (found) {
              log(`resolved via paginated ${url}`)
              if (!cancelled) {
                setResolvedProduct(found)
                setMode('product')
              }
              return
            }
          } catch (e) {
            log(`pagination failed (page ${page}): ${String(e)}`)
          }
        }

        log(`NOT FOUND. URLs tried:\n  ${triedUrls.join('\n  ')}`)
        if (!cancelled) {
          setDebugInfo(`Tried ${triedUrls.length} URLs. See console for details.`)
          setMode('not-found')
        }
      } catch (err) {
        console.error('[flat-slug] fatal:', err)
        if (!cancelled) setMode('not-found')
      }
    })()

    return () => { cancelled = true }
  }, [slug])

  if (mode === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-40 pb-32 text-center">
          <Loader size={40} className="mx-auto animate-spin text-gray-400 mb-4" />
          <p className="text-gray-500">Loading…</p>
        </div>
        <Footer />
      </div>
    )
  }

  if (mode === 'not-found') notFound()

  if (mode === 'category') return <CategoryProductsPage />

  // mode === 'product'
  return <ProductDetailPage initialProduct={resolvedProduct} />
}