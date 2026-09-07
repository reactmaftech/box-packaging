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