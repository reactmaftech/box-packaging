import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Slick Custom Boxes - Premium Custom Packaging Solutions',
  description: 'High-quality custom packaging boxes for all industries. Get your free quote today at Slick Custom Boxes!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}