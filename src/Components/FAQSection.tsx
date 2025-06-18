"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Plus, Headphones } from "lucide-react"

const faqData = [
  {
    id: 1,
    question: "Are your products safe for sensitive skin?",
    answer:
      "Yes, all our products are dermatologically tested and formulated to be gentle on sensitive skin. We use natural ingredients and avoid harsh chemicals that can cause irritation.",
  },
  {
    id: 2,
    question: "Are your products cruelty-free?",
    answer: "All our products are cruelty-free, and most are vegan. Check individual product details for specifics.",
    isExpanded: true,
  },
  {
    id: 3,
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy for all unopened products. If you're not satisfied with your purchase, you can return it for a full refund within 30 days of purchase.",
  },
  {
    id: 4,
    question: "Do you ship internationally?",
    answer:
      "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location. Please check our shipping page for more details.",
  },
  {
    id: 5,
    question: "How do I choose the right product?",
    answer:
      "We recommend taking our skin quiz to get personalized product recommendations. You can also consult with our skincare experts through our live chat feature.",
  },
]

export default function FAQSection() {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(
    new Set(faqData.filter((item) => item.isExpanded).map((item) => item.id)),
  )

  const toggleExpanded = (itemId: number) => {
    const newExpandedItems = new Set(expandedItems)
    if (newExpandedItems.has(itemId)) {
      newExpandedItems.delete(itemId)
    } else {
      newExpandedItems.add(itemId)
    }
    setExpandedItems(newExpandedItems)
  }

  return (
    <section className="bg-cream py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden">
              <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
                <Image
                  src="/images/img_mathildelangevinp3o5f4u95lounsplash_1_2.png"
                  alt="Skincare FAQ"
                  fill
                  className="object-cover"
                />
              </motion.div>

              {/* Support Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="absolute bottom-8 left-8 right-8 bg-cream rounded-3xl p-4 shadow-xl border border-light-green/20"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-dark-green rounded-full flex items-center justify-center flex-shrink-0 animate-pulse-glow">
                    <Headphones className="w-8 h-8 text-cream" />
                  </div>
                  <p className="text-dark-green font-medium">
                    24/7 We're Here
                    <br />
                    to Help You
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - FAQ Content */}
          <div className="order-1 lg:order-2">
            {/* FAQ Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="inline-flex items-center bg-cream border border-dark-green/20 rounded-full px-6 py-3 mb-12"
            >
              <div className="w-4 h-4 bg-dark-green rounded-full mr-4 animate-pulse" />
              <span className="text-dark-green font-medium">Frequently Asked Questions</span>
            </motion.div>

            {/* FAQ Title */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal text-dark-green mb-12 leading-tight"
            >
              Answers to Your
              <br />
              Skincare Questions, All
              <br />
              in One Place.
            </motion.h2>

            {/* FAQ List */}
            <div className="space-y-4">
              {faqData.map((item, index) => {
                const isExpanded = expandedItems.has(item.id)

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="border border-dark-green/20 rounded-2xl overflow-hidden bg-cream/50 backdrop-blur-sm"
                  >
                    {/* Question Header */}
                    <motion.button
                      whileHover={{ backgroundColor: "rgba(248, 254, 229, 0.5)" }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-between p-6 text-left transition-colors duration-200"
                      onClick={() => toggleExpanded(item.id)}
                    >
                      <span className="text-lg lg:text-xl font-medium text-dark-green pr-4">{item.question}</span>
                      <motion.div
                        animate={{ rotate: isExpanded ? 45 : 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="flex-shrink-0 w-8 h-8 flex items-center justify-center"
                      >
                        <Plus className="w-6 h-6 text-dark-green" />
                      </motion.div>
                    </motion.button>

                    {/* Answer Content */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6">
                            <div className="pt-4 border-t border-dark-green/10">
                              <motion.p
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.3, delay: 0.1 }}
                                className="text-dark-green/70 leading-relaxed"
                              >
                                {item.answer}
                              </motion.p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
