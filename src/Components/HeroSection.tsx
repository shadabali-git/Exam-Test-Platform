"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
// import { Button } from "@/Components/ui/button"
import { Award } from "lucide-react"

const features = [
  {
    number: "01",
    title: "Bio Ingredients",
    description: "Get naturally beautiful and transform with our bio ingredients creams for healthy, radiant skin.",
  },
  {
    number: "02",
    title: "Everything Natural",
    description: "Pure ingredients for pure skin. The perfect solution for your skin care needs.",
  },
  {
    number: "03",
    title: "All Handmade",
    description: "Made with love and care. Just for you. Give your skin the tender loving care it deserves.",
  },
]

export default function HeroSection() {
  const [revealedWords, setRevealedWords] = useState<Set<number>>(new Set())
  const textRef = useRef<HTMLParagraphElement>(null)
  const isInView = useInView(textRef, { once: false, margin: "-20%" })
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  const text =
    "Experience the ultimate in skincare with our expertly formulated products, crafted to nourish, protect, and rejuvenate your skin. Combining the finest natural ingredients with advanced science, our collection ensures every skin type can achieve a radiant, healthy glow."
  const words = text.split(" ")

  useEffect(() => {
    if (isInView) {
      const timer = setInterval(() => {
        setRevealedWords((prev) => {
          const newSet = new Set(prev)
          const nextIndex = newSet.size
          if (nextIndex < words.length) {
            newSet.add(nextIndex)
            return newSet
          }
          clearInterval(timer)
          return prev
        })
      }, 80)

      return () => clearInterval(timer)
    } else {
      setRevealedWords(new Set())
    }
  }, [isInView, words.length])

  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-center">
          {/* Left Column - Subtitle */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:order-1 order-2"
          >
            <p className="text-lg lg:text-xl text-dark-green/80 leading-relaxed">
              Transform your skincare routine with premium products that restore, protect, and enhance your natural glow
              every day.
            </p>
          </motion.div>

          {/* Center Column - Title */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1 }}
            className="lg:order-2 order-1 text-center"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-dark-green leading-tight sm:leading-snug md:leading-none text-center px-4">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="block"
              >
                {/* Show on mobile and tablet */}
                <span className="block lg:hidden">GLOWWWWWW</span>

                {/* Show on desktop and above */}
                <span className="hidden lg:block">GLOW</span>
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="block"
              >
                NATUR-
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="block"
              >
                ALLY
              </motion.span>
            </h1>

          </motion.div>

          {/* Right Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:order-3 order-3 flex justify-center lg:justify-end"
          >
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ duration: 0.3 }}
              className="relative w-48 h-48 lg:w-56 lg:h-56"
            >
              <Image
                src="/images/img_skincarebeautycosmeticpackagingdesignagencymumbaidelhibangaloreindia_1.png"
                alt="Skincare Product"
                fill
                className="object-cover rounded-3xl shadow-2xl"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Large Background Text Section */}
     <section className="relative overflow-hidden py-12 lg:py-20 bg-cream">
      {/* Background SKINCARE Text */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 flex justify-center items-center pointer-events-none z-0"
      >
        <h2 className="text-[22vw] sm:text-[20vw] lg:text-[18vw] font-black text-dark-green/10 leading-none select-none tracking-tight">
          SKINCARE
        </h2>
      </motion.div>

      {/* Foreground Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Button */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex justify-center lg:justify-start"
          >
            <button className="bg-green-900/50 hover:bg-green-900/90 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg group">
              <span className="group-hover:animate-pulse">Shop Now</span>
            </button>
          </motion.div>

          {/* Right - Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="relative w-full max-w-sm sm:max-w-md mx-auto aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl"
          >
            <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }} className="w-full h-full relative">
              <Image
                src="/images/img_chatgpt_image_jun_15_2025_102447_pm_2.png"
                alt="Skincare Model"
                fill
                className="object-cover rounded-3xl"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>


      {/* Description Section with Text Animation */}
      <section className="bg-cream py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <p
            ref={textRef}
            className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-normal leading-relaxed text-dark-green max-w-6xl mx-auto text-center mb-24"
          >
            {words.map((word, index) => (
              <span key={index} className={`word-reveal ${revealedWords.has(index) ? "revealed" : ""}`}>
                {word}{" "}
              </span>
            ))}
          </p>

          {/* Features Section */}
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left Column - Features */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="inline-flex items-center bg-cream border border-dark-green/20 rounded-full px-6 py-3 mb-12"
              >
                <div className="w-4 h-4 bg-dark-green rounded-full mr-4 animate-pulse" />
                <span className="text-dark-green font-medium">Why Our Products</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-4xl lg:text-5xl xl:text-6xl font-normal text-dark-green mb-8 leading-tight"
              >
                YOUR SKIN DESERVES THE BEST CARE.
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="text-lg text-dark-green/70 mb-12 leading-relaxed"
              >
                Discover a curated collection of skincare products designed to rejuvenate, protect, and pamper your
                skin. Explore our range crafted with love, backed by science, and inspired by nature.
              </motion.p>

              {/* Feature Items */}
              <div className="space-y-12">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.number}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-8 group"
                  >
                    <span className="text-4xl lg:text-5xl font-normal text-dark-green/30 flex-shrink-0 group-hover:text-dark-green/50 transition-colors duration-300">
                      {feature.number}
                    </span>
                    <div>
                      <h3 className="text-3xl lg:text-4xl font-normal text-dark-green mb-4 group-hover:text-dark-green/80 transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-lg text-dark-green/70 leading-relaxed">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Column - Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative w-full aspect-[3/4]">
                <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
                  <Image
                    src="/images/img_chatgpt_image_jun_15_2025_115220_pm_1.png"
                    alt="Skincare Products"
                    fill
                    className="object-cover rounded-3xl shadow-2xl"
                  />
                </motion.div>

                {/* Award Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1 }}
                  viewport={{ once: true }}
                  className="absolute bottom-8 left-8 right-8 bg-cream rounded-3xl p-4 shadow-xl border border-light-green/20"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-dark-green rounded-full flex items-center justify-center flex-shrink-0 animate-pulse-glow">
                      <Award className="w-8 h-8 text-cream" />
                    </div>
                    <p className="text-dark-green font-medium">Best Skin Care Product Award Winning</p>
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                viewport={{ once: true }}
                className="flex justify-between items-center mt-8"
              >
                <span className="text-dark-green font-medium uppercase tracking-wide">Since 2001</span>
                <button className="text-dark-green font-medium uppercase tracking-wide hover:text-dark-green/70 transition-colors duration-300 relative group">
                  Learn More<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-dark-green transition-all duration-300 group-hover:w-full" />
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
