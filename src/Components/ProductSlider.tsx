"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react"
import { Button } from "@/Components/ui/button"

const products = [
  {
    id: 1,
    image: "/images/img_filipknezevickelrinxwakunsplash_1.png",
    title: "ALYA SKIN CLEANSER.",
    price: "FROM $29.99",
  },
  {
    id: 2,
    image: "/images/img_cierrahendersonlwiqp0b98unsplash_1_1.png",
    title: "RITUAL OF SAKURA.",
    price: "FROM $27.99",
  },
  {
    id: 3,
    image: "/images/img_mathildelangevinp3o5f4u95lounsplash_1_1.png",
    title: "THE BODY LOTION.",
    price: "FROM $19.99",
  },
]

const filters = ["NEW ARRIVAL", "CLEANSING", "ACNE FIGHTER", "ANTI AGING"]

export default function ProductSlider() {
  const [activeFilter, setActiveFilter] = useState("NEW ARRIVAL")
  const [currentSlide, setCurrentSlide] = useState(0)
  const sliderRef = useRef<HTMLDivElement>(null)

  const slideProducts = (direction: "prev" | "next") => {
    const newSlide =
      direction === "next" ? Math.min(currentSlide + 1, products.length - 1) : Math.max(currentSlide - 1, 0)

    setCurrentSlide(newSlide)
  }

  return (
    <section className="bg-cream py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-16 gap-8">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center bg-cream border border-dark-green/20 rounded-full px-6 py-3 w-fit"
          >
            <div className="w-4 h-4 bg-dark-green rounded-full mr-4 animate-pulse" />
            <span className="text-dark-green font-medium">Best Selling Products</span>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal text-dark-green text-center leading-tight"
          >
            Skincare That Brings Out
            <br />
            Your Natural Radiance
          </motion.h2>

          {/* Desktop Navigation */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="hidden lg:flex items-center space-x-6"
          >
            <Button
              variant="outline"
              size="icon"
              onClick={() => slideProducts("prev")}
              disabled={currentSlide === 0}
              className="w-16 h-16 border-2 border-dark-green rounded-full hover:bg-dark-green hover:text-cream transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:hover:scale-100"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              size="icon"
              onClick={() => slideProducts("next")}
              disabled={currentSlide === products.length - 1}
              className="w-16 h-16 bg-dark-green text-cream rounded-full hover:bg-dark-green/90 transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:hover:scale-100"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </motion.div>
        </div>

        {/* Product Slider */}
        <div className="relative overflow-hidden mb-16">
          <motion.div
            ref={sliderRef}
            className="flex gap-6"
            animate={{ x: `-${currentSlide * (100 / 3)}%` }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3"
              >
                <div className="relative group">
                  {/* Product Image */}
                  <div className="relative aspect-square mb-6 overflow-hidden rounded-3xl">
                    <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.title}
                        fill
                        className="object-cover"
                      />
                    </motion.div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-dark-green/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />
                  </div>

                  {/* Product Info */}
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                    className="bg-cream rounded-2xl p-6 shadow-lg border border-light-green/20 flex items-center justify-between group-hover:shadow-xl transition-shadow duration-300"
                  >
                    <div>
                      <h3 className="text-xl font-medium text-dark-green mb-2">{product.title}</h3>
                      <p className="text-dark-green/70">{product.price}</p>
                    </div>
                    <Button
                      size="icon"
                      className="w-16 h-16 bg-dark-green text-cream rounded-2xl hover:bg-dark-green/90 transition-all duration-300 hover:scale-110 group-hover:animate-pulse"
                    >
                      <ShoppingCart className="w-6 h-6" />
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile Navigation */}
          <div className="flex lg:hidden items-center justify-center space-x-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={() => slideProducts("prev")}
              disabled={currentSlide === 0}
              className="w-12 h-12 border-2 border-dark-green rounded-full hover:bg-dark-green hover:text-cream transition-all duration-300 active:scale-95 disabled:opacity-50"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              size="icon"
              onClick={() => slideProducts("next")}
              disabled={currentSlide === products.length - 1}
              className="w-12 h-12 bg-dark-green text-cream rounded-full hover:bg-dark-green/90 transition-all duration-300 active:scale-95 disabled:opacity-50"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative mb-24"
        >
          <div className="relative aspect-[16/9] lg:aspect-[21/9] rounded-3xl overflow-hidden">
            <Image src="/images/img_model.png" alt="Feel Beautiful" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-green/80 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 text-center">
              <motion.h3
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl lg:text-6xl font-normal text-cream mb-8 leading-tight"
              >
                Feel Beautiful Inside and Out
                <br />
                with Every Product.
              </motion.h3>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Button
                  size="lg"
                  className="bg-cream hover:bg-cream/90 text-dark-green px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  Shop Now
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Second Section */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal text-dark-green mb-12 leading-tight"
          >
            Feel Beautiful Inside and Out
            <br />
            with Every Product.
          </motion.h2>

          {/* Filter Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4"
          >
            {filters.map((filter, index) => (
              <motion.div
                key={filter}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Button
                  onClick={() => setActiveFilter(filter)}
                  variant={activeFilter === filter ? "default" : "outline"}
                  className={`px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 ${
                    activeFilter === filter
                      ? "bg-dark-green text-cream hover:bg-dark-green/90 shadow-lg"
                      : "border-dark-green text-dark-green hover:bg-dark-green hover:text-cream"
                  }`}
                >
                  {filter}
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Second Product Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="wait">
            {products.map((product, index) => (
              <motion.div
                key={`${activeFilter}-${product.id}`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative group"
              >
                {/* Product Image */}
                <div className="relative aspect-square mb-6 overflow-hidden rounded-3xl">
                  <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                  </motion.div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-dark-green/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />
                </div>

                {/* Product Info */}
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="bg-cream rounded-2xl p-6 shadow-lg border border-light-green/20 flex items-center justify-between group-hover:shadow-xl transition-shadow duration-300"
                >
                  <div>
                    <h3 className="text-xl font-medium text-dark-green mb-2">{product.title}</h3>
                    <p className="text-dark-green/70">{product.price}</p>
                  </div>
                  <Button
                    size="icon"
                    className={`w-16 h-16 rounded-2xl transition-all duration-300 hover:scale-105 group-hover:animate-pulse ${
                      index === 1
                        ? "bg-dark-green text-cream hover:bg-dark-green/90"
                        : "bg-light-green text-dark-green hover:bg-light-green/80"
                    }`}
                  >
                    <ShoppingCart className="w-6 h-6" />
                  </Button>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
