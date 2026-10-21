// app/terms-and-conditions/page.tsx
'use client'

import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

const LAST_UPDATED = 'January 2025'

export default function TermsAndConditionsPage() {
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
              <span className="text-[#FDB022] font-semibold">Terms &amp; Conditions</span>
            </div>

            <span className="inline-flex items-center border border-[#FDB022]/30 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide text-[#FDB022] mb-5">
              LEGAL
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 leading-tight">
              Terms &amp;{' '}
              <span className="bg-gradient-to-r from-[#FDB022] to-[#f5a80f] bg-clip-text text-transparent">
                Conditions
              </span>
            </h1>

            <p className="text-lg text-white/60 max-w-2xl leading-relaxed">
              Please read these Terms &amp; Conditions carefully before using our website,
              products, or services. By accessing Slick Custom Boxes, you agree to be
              bound by the terms below.
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

              {/* Legal Notice */}
              <Section id="legal-notice" title="Legal Notice">
                <p>
                  Welcome to <strong className="text-[#171512]">Slick Custom Boxes</strong>! The guidelines for using
                  our website, goods, and services are described in these Terms and Conditions. Before accessing our
                  website or services, please carefully read these Terms &amp; Conditions. You consent to be bound by
                  these Terms and Conditions by using any section of this website. You cannot visit the website or
                  make use of any services if you disagree with all of the terms and conditions included in this
                  agreement.
                </p>
              </Section>

              {/* Interpretation & Definitions */}
              <Section id="interpretation" title="Interpretation & Definitions">
                <div>
                  <h4 className="font-bold text-[#171512] mb-2">Interpretation</h4>
                  <p>
                    Words with capitalized first letters are classified according to the following criteria.
                    Whether they are written in the singular or plural, the following definitions will always imply
                    the same meaning.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-[#171512] mb-3">Definitions</h4>
                  <p className="mb-3">Under these Terms and Conditions:</p>
                  <dl className="space-y-3">
                    <DefRow
                      term="Company"
                      desc='Referred to as either "the Company," "We," "Us" or "Our" in this Agreement — refers to Slick Custom Boxes.'
                    />
                    <DefRow
                      term="Content"
                      desc="Refers to text, images, or other data that can be posted, uploaded, linked to, or otherwise made public by you, regardless of the format."
                    />
                    <DefRow term="Website" desc="Refers to Slick Custom Boxes." />
                    <DefRow
                      term='"user", "you", "your"'
                      desc="Indicate any individual accessing or using the website, as well as any corporation or other legal entity that such individual is accessing or using the website on behalf of, if applicable."
                    />
                  </dl>
                </div>
              </Section>

              {/* Intellectual Property */}
              <Section id="intellectual-property" title="Intellectual Property Rights">
                <div>
                  <h4 className="font-bold text-[#171512] mb-2">Ownership</h4>
                  <p className="mb-3">
                    All content on Slick Custom Boxes is protected by intellectual property rights owned by the
                    Company and/or its licensors unless otherwise indicated. Every right to intellectual property is
                    reserved. Subject to the limitations outlined in these terms and conditions, you may access
                    material from Slick Custom Boxes for your personal use.
                  </p>
                  <p>
                    Slick Custom Boxes or its licensors own all content and materials available on the website,
                    including text, graphics, logos, pictures, and software. Under trademark, copyright, and other
                    intellectual property laws, all materials and information are protected.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-[#171512] mb-2">You</h4>
                  <ul className="list-disc pl-5 space-y-1.5">
                    <li>A limited license is provided to you just to view the content on Slick Custom Boxes.</li>
                    <li>
                      You may not modify, reproduce, distribute, display, or create derivative works of any content
                      from the Site without our prior written consent.
                    </li>
                  </ul>
                </div>
              </Section>

              {/* Restrictions */}
              <Section id="restrictions" title="Restrictions">
                <p className="mb-3">You are specifically restricted from:</p>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>Publishing any Website material in any other media.</li>
                  <li>
                    Making any content from the website available for purchase, sublicensing, or other commercial
                    endeavors.
                  </li>
                  <li>Performing or displaying any content from a website in public.</li>
                  <li>Any use of this website that might endanger it in any manner.</li>
                  <li>Using this website in any way that might hinder users&apos; ability to access it.</li>
                  <li>
                    Using this website in a way that might endanger it, any person or business entity, or violate any
                    relevant laws and regulations.
                  </li>
                  <li>
                    Using our website for any kind of data mining, data harvesting, data extraction, or other such
                    activity.
                  </li>
                </ul>
              </Section>

              {/* Services */}
              <Section id="services" title="Services">
                <p className="mb-3">The following are just a few of the services we might offer:</p>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>Custom box design</li>
                  <li>Printing of packaging materials</li>
                  <li>Delivery and shipping of printed boxes</li>
                </ul>
                <p className="mt-4">
                  At any time and without previous warning, we have the right to alter, suspend, or terminate any
                  part of the services.
                </p>
              </Section>

              {/* Limitation of Liability */}
              <Section id="liability" title="Limitation of Liability">
                <p className="mb-3">In no event shall the Company:</p>
                <p className="mb-3">
                  Be liable for any consequential, incidental, indirect, special, or punitive damages, or any loss of
                  profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill,
                  or other intangible losses, resulting from:
                </p>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>The Website&apos;s accessibility, usability, or lack thereof.</li>
                  <li>Any conduct or content of any third party on the Website.</li>
                </ul>
              </Section>

              {/* Indemnification */}
              <Section id="indemnification" title="Indemnification">
                <p className="mb-3">You consent to provide indemnification for:</p>
                <p>
                  Defend and hold harmless the Company and its employees from and against any claims, damages,
                  liabilities, judgments, awards, losses, costs, expenses, or fees arising out of or relating to your
                  violation of these Terms and Conditions or your use of the Website or our services.
                </p>
              </Section>

              {/* Severability */}
              <Section id="severability" title="Severability">
                <p className="mb-3">Any provision:</p>
                <p>
                  Any provision of these Terms that is determined to be unenforceable or illegal by any relevant
                  legislation will be removed without affecting the remaining sections hereof. However, this
                  won&apos;t make the terms as a whole void or useless.
                </p>
              </Section>

              {/* Variation */}
              <Section id="variation" title="Variation of Terms">
                <p className="mb-3">The following Terms are subject to being updated by the Company:</p>
                <p className="mb-3">
                  At any time and as it deems fit, you agree to routinely check these Terms by using this website.
                </p>
                <p>
                  These Terms and Conditions are subject to change at any moment, without prior notice, in our sole
                  discretion. Any modifications will take effect as soon as they are published on the website. Once
                  changes are made to the Terms and Conditions, your continuing use of the website means that you
                  agree with the changes.
                </p>
              </Section>

              {/* Entire Agreement */}
              <Section id="entire-agreement" title="Entire Agreement">
                <p className="mb-3">This Agreement is made up entirely of these Terms:</p>
                <p>
                  Between the Company and you regarding your use of this Website and supersede all prior agreements
                  and understandings, whether written or oral.
                </p>
              </Section>

              {/* Governing Law */}
              <Section id="governing-law" title="Governing Law & Jurisdiction">
                <p className="mb-3">This Agreement shall be regulated by:</p>
                <p className="mb-3">
                  And interpreted under the laws of the jurisdiction of the Company, without regard to its conflict
                  of law provisions.
                </p>
                <p>
                  By using this website, you consent to the personal and exclusive jurisdiction of the courts within
                  the Company&apos;s territorial jurisdiction to resolve disputes.
                </p>
              </Section>

              {/* Account Registration */}
              <Section id="account" title="Account Registration">
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    To access certain features of the Site or to use our services, you may be required to create an
                    account.
                  </li>
                  <li>
                    You promise to fill out the registration form with true, up-to-date, and comprehensive
                    information.
                  </li>
                  <li>
                    You bear the responsibility of limiting access to your account and protecting the privacy of your
                    password and account. By using your account, you consent to take full responsibility for any
                    actions.
                  </li>
                </ul>
              </Section>

              {/* Orders & Payments */}
              <Section id="orders" title="Orders & Payments">
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    By using our website to place an order, you consent to paying the listed price for the goods or
                    services.
                  </li>
                  <li>
                    All orders are subject to availability. We reserve the right to limit or terminate an order&apos;s
                    purchase limit for a person, a household, or both.
                  </li>
                  <li>
                    We reserve the right to refuse or cancel any orders placed at incorrect prices due to
                    typographical or other errors.
                  </li>
                  <li>Prices for our products and services are subject to change without notice.</li>
                  <li>Our third-party payment processor verifies payments securely.</li>
                </ul>
              </Section>

              {/* Shipping */}
              <Section id="shipping" title="Shipping & Delivery">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Slick Custom Boxes offers shipping and delivery services for our products.</li>
                  <li>
                    We will make every effort to deliver orders within the estimated timeframe, but we do not
                    guarantee delivery dates.
                  </li>
                  <li>
                    Depending on your location and the shipping option you choose at checkout, shipping prices and
                    delivery schedules may change.
                  </li>
                  <li>
                    We are not responsible for delays in delivery due to events beyond our control, including but
                    not limited to weather conditions, natural disasters, or carrier delays.
                  </li>
                </ul>
              </Section>

              {/* Contact */}
              <Section id="contact" title="Contact Us">
                <p className="mb-4">
                  To ask any queries concerning these terms and conditions, please get in touch with us at:
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <a
                    href="tel:+12177276247"
                    className="group flex flex-col p-4 rounded-xl border border-gray-200 bg-white hover:border-[#FDB022] hover:shadow-sm transition-all"
                  >
                    <p className="text-xs text-gray-500 mb-1">By Phone Call</p>
                    <p className="text-sm font-semibold text-[#171512] group-hover:text-[#c98b0c] transition-colors">
                      +1 (217) 727-6247
                    </p>
                  </a>
                  <a
                    href="mailto:info@slickcustomboxes.com"
                    className="group flex flex-col p-4 rounded-xl border border-gray-200 bg-white hover:border-[#FDB022] hover:shadow-sm transition-all"
                  >
                    <p className="text-xs text-gray-500 mb-1">By email</p>
                    <p className="text-sm font-semibold text-[#171512] group-hover:text-[#c98b0c] transition-colors truncate">
                      info@slickcustomboxes.com
                    </p>
                  </a>
                </div>
              </Section>

              {/* Acceptance */}
              <div className="pt-6 border-t border-gray-100">
                <div className="rounded-xl bg-[#FDB022]/10 border border-[#FDB022]/25 p-5">
                  <h4 className="font-bold text-[#171512] mb-1">
                    Acceptance of the Terms and Conditions
                  </h4>
                  <p className="text-sm text-gray-700">
                    You acknowledge that you have read, understood, and will abide by our terms and conditions
                    by using our website or services. You are not permitted to use our website if you disagree
                    with our Terms and Conditions.
                  </p>
                </div>
              </div>

            </div>
          </article>

          {/* CTA */}
          <div className="mt-10 text-center py-12 px-6 bg-gradient-to-br from-[#171512] to-[#2a2520] rounded-3xl text-white">
            <h3 className="text-2xl font-bold mb-3">Have questions about our terms?</h3>
            <p className="text-white/60 mb-7 max-w-md mx-auto text-sm">
              Our team is happy to clarify anything in our Terms &amp; Conditions.
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

function DefRow({ term, desc }: { term: string; desc: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:gap-3">
      <dt className="font-semibold text-[#171512] shrink-0 sm:w-40">{term}</dt>
      <dd className="text-gray-600">{desc}</dd>
    </div>
  )
}