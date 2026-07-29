'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'

const faqs = [
  {
    question: 'What is the minimum order quantity?',
    answer:
      'Our minimum order quantity varies by box type and material, typically starting around 100 units. For smaller runs or one-off samples, reach out and we\'ll work out an option that fits your needs.',
  },
  {
    question: 'How long does production and delivery take?',
    answer:
      'Standard turnaround is 7–10 business days after your design is approved, plus shipping time. Rush production is available for time-sensitive orders — let us know your deadline when you request a quote.',
  },
  {
    question: 'Can I get a physical sample before placing a bulk order?',
    answer:
      'Yes. We offer pre-production samples so you can check material, print quality, and structural fit before committing to a full run.',
  },
  {
    question: 'Do you offer design support?',
    answer:
      'Our in-house design team can build your artwork from scratch, refine a design you already have, or convert existing print files to our production templates at no extra cost on qualifying orders.',
  },
  {
    question: 'What materials do you work with?',
    answer:
      'We work with cardboard, kraft paper, corrugated board, and rigid board, including recyclable and biodegradable options for brands prioritizing sustainability.',
  },
  {
    question: 'Do you ship internationally?',
    answer:
      'Yes, we ship worldwide with tracked, reliable logistics. Shipping costs and timelines are calculated based on destination and order volume during the quote process.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept major credit cards, bank transfers, and offer flexible payment terms on larger bulk orders. Details are confirmed with your dedicated account specialist.',
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-6 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="inline-flex items-center border border-black/15 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide text-[#171512] mb-5">
            FAQs
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#171512] leading-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-black/55">
            Can&apos;t find the answer you&apos;re looking for? Reach out to our
            packaging specialists directly.
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="flex flex-col gap-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-[#F5F1E7] rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-semibold text-[#171512]">{faq.question}</span>
                  <span
                    className={`shrink-0 w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#171512] transition-transform duration-300 ${
                      isOpen ? 'rotate-45' : ''
                    }`}
                  >
                    <Plus size={16} />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <p className="px-6 pb-5 text-black/55 leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}