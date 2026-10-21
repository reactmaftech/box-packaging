// app/privacy-policy/page.tsx
'use client'

import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

const LAST_UPDATED = 'January 2025'

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-[#171512] to-[#2a2520] text-white pt-32 pb-20 md:pt-40 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, #FDB022 1px, transparent 1px), radial-gradient(circle at 75% 75%, #FDB022 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
            }}
          />
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FDB022]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FDB022]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 text-sm text-white/50 mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight size={14} />
              <span className="text-[#FDB022] font-semibold">Privacy Policy</span>
            </div>

            <span className="inline-flex items-center border border-[#FDB022]/30 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide text-[#FDB022] mb-5">
              LEGAL
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 leading-tight">
              Privacy{' '}
              <span className="bg-gradient-to-r from-[#FDB022] to-[#f5a80f] bg-clip-text text-transparent">
                Policy
              </span>
            </h1>

            <p className="text-lg text-white/60 max-w-2xl leading-relaxed">
              Slick Custom Boxes is dedicated to protecting your privacy and securing your data.
              This policy explains what personal information we collect, how we use it,
              and the security protocols we have in place to protect it.
            </p>

            <p className="mt-6 text-sm text-white/40">
              Last updated: <span className="text-white/70 font-medium">{LAST_UPDATED}</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Body ───────────────────────────────────────────────── */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <article className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 md:p-10 space-y-12 text-gray-700 leading-relaxed">

              {/* Intro */}
              <Section id="intro" title="Overview">
                <p>
                  Slick Custom Boxes is dedicated to protecting your privacy and securing your data. Our Privacy
                  Policy delineates the nature of the personal data we gather, our methods for employing it, and the
                  security protocols we have in place to protect your information when you engage with our website
                  or leverage our services.
                </p>
              </Section>

              {/* Types of Personal Information */}
              <Section id="information-collected" title="Types of Personal Information Collected">
                <p className="mb-3">
                  When you engage with our services or browse our website, we collect a variety of information,
                  which may include:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Identifiable information such as your name, email address, and contact details, which you
                    voluntarily furnish during registration or purchase processes.
                  </li>
                  <li>
                    Data capturing your interactions with our website, like your IP address, browser specifics, and
                    particulars about your device gathered via cookies and other tracking technologies.
                  </li>
                  <li>
                    Financial details necessary to process your purchases, including credit card numbers, are
                    processed securely through our third-party payment processors.
                  </li>
                </ul>
                <p className="mt-4">
                  The user information that our website collects is kept in log files, which include the domain
                  name, IP address, name and version of the browser, date and time of visit, referring and exiting
                  websites, number of clicks, and general geographic and demographic data for trend analysis. Make
                  sure that the email addresses of visitors are not included in log files as they will not be saved
                  in our records.
                </p>
              </Section>

              {/* Utilization */}
              <Section id="utilization" title="Utilization of Collected Information">
                <p className="mb-3">The collected information is utilized for multiple purposes:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Tailoring and delivering our services to suit your requirements.</li>
                  <li>Executing transactions and ensuring the delivery of orders made through our website.</li>
                  <li>
                    Communicating with you about your account/orders, and informing you of our products or services&apos;
                    updates.
                  </li>
                  <li>Enhancing our website&apos;s functionality, our service offerings, and the overall customer experience.</li>
                  <li>Fulfilling our legal and regulatory obligations.</li>
                </ul>
              </Section>

              {/* Sharing & Disclosure */}
              <Section id="sharing" title="Sharing and Disclosure of Information">
                <p>
                  We staunchly refrain from selling, trading, or leasing your data to outside parties. Nonetheless,
                  certain instances may necessitate sharing your information with reliable service providers who
                  contribute to the operation of our website, our business management, or the provision of services
                  to you, under the condition that such information remains confidential. Additionally, we may
                  disclose your information to comply with legal mandates or to safeguard our rights, our property,
                  or the safety of others.
                </p>
              </Section>

              {/* Protection & Retention */}
              <Section id="protection" title="Protection and Retention of Data">
                <p className="mb-3">
                  We implement appropriate measures to ensure the integrity and privacy of your data. These measures
                  encompass encryption, access control, and consistent security evaluations. Your information is
                  retained exclusively for the duration necessary to serve the purposes outlined in this Privacy
                  Policy, except when a longer retention term is mandated or sanctioned by law.
                </p>
                <p>
                  When information is transferred or received over the internet, our site employs Secure Socket
                  Layer (SSL) encryption, the highest level of data protection. Data transmitted via the internet is
                  not completely safe, even if SSL encryption confirms the accuracy of the data and the security of
                  the sending and receiving servers. So, we cannot guarantee the security of any data you provide us
                  over the web.
                </p>
              </Section>

              {/* Business Transfers */}
              <Section id="business-transfers" title="Our Transfers in Business Conversions">
                <p>
                  If Slick Custom Boxes goes through a business transition or change such as being sold to, merged
                  with another company, or declaration of bankruptcy; the transfer of assets will comprise some or
                  all of the data composed from our website.
                </p>
              </Section>

              {/* Cookies */}
              <Section id="cookies" title="We Use Cookies for Enhanced User Experience">
                <p>
                  To enhance users&apos; and customers&apos; experiences on our website, Slick Custom Boxes uses cookies.
                  A cookie is a preprogrammed collection of data that our website saves on your computer for an
                  extended length of time. Our website will be able to verify your identity and link it to the data
                  on our servers and records if you have a cookie installed on your computer. Allowing cookies is
                  necessary to utilize the website. By following the directions on your web browser, you can delete
                  cookies.
                </p>
              </Section>

              {/* Third-Party Links */}
              <Section id="third-party" title="Third-Party Website Links & Our Responsibility">
                <p>
                  Our website can show links to third-party websites. Please understand that we have no control over
                  the privacy policies of any other sites. We urge users to be careful when exiting from this web
                  page and to thoroughly review the privacy policies of each website that collects personal data.
                  This privacy statement only addresses the information that our website receives.
                </p>
              </Section>

              {/* Contact */}
              <Section id="contact" title="Inquiries and Contact Information">
                <p className="mb-4">
                  For any inquiries or concerns regarding how we handle your data or our Privacy Policy, please
                  reach us at:
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <a
                    href="mailto:info@slickcustomboxes.com"
                    className="group flex flex-col p-4 rounded-xl border border-gray-200 bg-white hover:border-[#FDB022] hover:shadow-sm transition-all"
                  >
                    <p className="text-xs text-gray-500 mb-1">By email</p>
                    <p className="text-sm font-semibold text-[#171512] group-hover:text-[#c98b0c] transition-colors truncate">
                      info@slickcustomboxes.com
                    </p>
                  </a>
                  <a
                    href="tel:+12177276247"
                    className="group flex flex-col p-4 rounded-xl border border-gray-200 bg-white hover:border-[#FDB022] hover:shadow-sm transition-all"
                  >
                    <p className="text-xs text-gray-500 mb-1">By Phone Call</p>
                    <p className="text-sm font-semibold text-[#171512] group-hover:text-[#c98b0c] transition-colors">
                      +1 (217) 727-6247
                    </p>
                  </a>
                </div>
              </Section>

              {/* Updates */}
              <Section id="updates" title="Updates to the Privacy Policy">
                <p>
                  This Privacy Policy may be revised periodically. We will post any alterations or updates on this
                  webpage, ensuring you are continually informed about what information we collect, how it is used,
                  and under what circumstances, if any, we disclose it.
                </p>
              </Section>

              {/* Acceptance / closing callout */}
              <div className="pt-6 border-t border-gray-100">
                <div className="rounded-xl bg-[#FDB022]/10 border border-[#FDB022]/25 p-5">
                  <h4 className="font-bold text-[#171512] mb-1">
                    Your privacy matters to us
                  </h4>
                  <p className="text-sm text-gray-700">
                    By using our website or services, you acknowledge that you have read and understood this
                    Privacy Policy. If you have any questions, please contact us at{' '}
                    <a
                      href="mailto:info@slickcustomboxes.com"
                      className="text-[#c98b0c] font-semibold hover:underline"
                    >
                      info@slickcustomboxes.com
                    </a>
                    .
                  </p>
                </div>
              </div>

            </div>
          </article>

          {/* CTA */}
          <div className="mt-10 text-center py-12 px-6 bg-gradient-to-br from-[#171512] to-[#2a2520] rounded-3xl text-white">
            <h3 className="text-2xl font-bold mb-3">Have questions about our policy?</h3>
            <p className="text-white/60 mb-7 max-w-md mx-auto text-sm">
              Our team is happy to clarify anything about how we handle your data.
              Reach out any time.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3 bg-[#FDB022] text-[#171512] font-bold rounded-xl hover:bg-[#f5a80f] transition-all shadow-lg shadow-[#FDB022]/25"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

/* ────────────────────────────────────────────────────────────
   Reusable bits (inline in this file for simplicity)
   ──────────────────────────────────────────────────────────── */

function Section({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="text-xl md:text-2xl font-bold text-[#171512] mb-4">{title}</h2>
      <div className="space-y-3 text-sm md:text-base">{children}</div>
    </section>
  )
}