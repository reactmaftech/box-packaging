import type { Metadata } from 'next'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Services } from '@/components/Services'
import { InquiryForm } from '@/components/InquiryForm'
import { Footer } from '@/components/Footer'
import { CategoryShowcase } from '@/components/CategoryShowcase'
import { CustomPackagingCTA } from '@/components/CustomPackagingCTA'
import { Testimonials } from '@/components/Testimonial'
import { TrendingProducts } from '@/components/Trendingproducts'
import { PremiumFinishes } from '@/components/Premiumfinishes'
import { FAQ } from '@/components/Faq'
import { CTA } from '@/components/CTA'
import { PackagingContentSections } from '@/components/PackagingContentSections'

export const metadata: Metadata = {
  title: 'Custom Printed Boxes & Packaging | Slick Custom Boxes',
  description:
    'Order custom printed boxes online — rigid, kraft, corrugated, mailer, gable and pillow boxes. 100-unit minimum, free design support, and free shipping across the continental US. Written quote within 24 hours.',
  alternates: { canonical: '/' },
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <CategoryShowcase />
      <Services />
      <TrendingProducts />
      <InquiryForm />
      <PackagingContentSections />
      <CustomPackagingCTA />
      <Testimonials />
      <PremiumFinishes />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  )
}