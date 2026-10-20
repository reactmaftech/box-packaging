// app/about/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Slick Custom Boxes has been designing and manufacturing custom printed packaging since 2018 — serving brands across all 50 US states with premium materials, free design support, and a 100-unit minimum.',
  alternates: { canonical: '/about' },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}