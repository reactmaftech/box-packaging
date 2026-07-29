import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Box Packaging Solutions - Premium Custom Boxes',
  description: 'High-quality custom packaging boxes for all industries. Get your quote today!',
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