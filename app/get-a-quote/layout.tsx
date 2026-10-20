// app/get-a-quote/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Get a Quote',
  description:
    'Request a free custom packaging quote from Slick Custom Boxes. Tell us your box style, size and quantity and get a written quote within 24 hours. 100-unit minimum and free shipping across the continental US.',
  alternates: { canonical: '/get-a-quote' },
}

export default function GetAQuoteLayout({ children }: { children: React.ReactNode }) {
  return children
}