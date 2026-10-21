// lib/slug.ts
// Single source of truth for product/category URLs.

export function slugify(input: string): string {
  return (input || '')
    .toString()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')   // strip accents
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/['\u2019"]/g, '')        // drop apostrophes rather than hyphenating them
    .replace(/[^a-z0-9]+/g, '-')       // everything else becomes a hyphen
    .replace(/-{2,}/g, '-')
    .replace(/^-+|-+$/g, '')
}

/** "custom-apparel-boxes" -> "custom apparel boxes" (display fallback only) */
export function unslugify(slug: string): string {
  return (slug || '').replace(/-/g, ' ').trim()
}

/** /custom-apparel-boxes — flat URL at site root */
export function categoryHref(categoryName: string): string {
  return `/${slugify(categoryName) || 'category'}`
}

/**
 * /custom-bandana-boxes — flat URL at site root
 * Uses the slug stored on the product when available; falls back to slugify(title).
 */
export function productHref(product: { slug?: string; title: string; category: string }): string {
  const productSlug = product.slug || slugify(product.title) || 'product'
  return `/${productSlug}`
}

/** Finds the category whose name slugifies to the given slug. */
export function matchCategoryBySlug<T extends { name: string }>(
  categories: T[],
  slug: string
): T | undefined {
  const target = slugify(decodeURIComponent(slug || ''))
  return (
    categories.find(c => slugify(c.name) === target) ||
    categories.find(c => c.name.toLowerCase() === unslugify(target).toLowerCase())
  )
}