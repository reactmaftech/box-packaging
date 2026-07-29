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

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <CategoryShowcase />
      <CustomPackagingCTA />
      <Services />
      <TrendingProducts />
      <Testimonials />
      <InquiryForm />
      <PremiumFinishes />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  )
}