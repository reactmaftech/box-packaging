// app/products/[category]/[product]/page.tsx
// Next.js "page" file — MUST only accept `params` and `searchParams`.
// All UI + data logic lives in components/ProductDetailClient.tsx, which
// also accepts an optional `initialProduct` prop used by app/[slug]/page.tsx.

import ProductDetailClient from '@/components/ProductDetailClient'

interface PageProps {
  params: { category: string; product: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default function Page({ params, searchParams }: PageProps) {
  return <ProductDetailClient />
} 