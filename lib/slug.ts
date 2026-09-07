// lib/slug.ts
// Single source of truth for product/category URLs.
// Kept in sync with src/utils/slug.ts on the backend — if you change slugify
// here, change it there too, or links will stop resolving.

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

/** "custom-corrugated-boxes" -> "custom corrugated boxes" (display fallback only) */
export function unslugify(slug: string): string {
  return (slug || '').replace(/-/g, ' ').trim()
}

/** /products/custom-corrugated-boxes */
export function categoryHref(categoryName: string): string {
  return `/products/${slugify(categoryName) || 'category'}`
}

/**
 * /products/custom-corrugated-boxes/custom-corrugated-pizza-boxes
 * Uses the slug stored on the product when it is there. The slugified title is
 * only a fallback for documents created before the slug field existed — those
 * resolve through the server's legacy lookup and get a stored slug on first view.
 */
export function productHref(product: { slug?: string; title: string; category: string }): string {
  const productSlug = product.slug || slugify(product.title) || 'product'
  return `${categoryHref(product.category)}/${productSlug}`
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