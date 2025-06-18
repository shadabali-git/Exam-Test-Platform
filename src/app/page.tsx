"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import LoadingScreen from "@/Components/LoadingScreen"
import Header from "@/Components/Header"
import HeroSection from "@/Components/HeroSection"
import ProductSlider from "@/Components/ProductSlider"
import FAQSection from "@/Components/FAQSection"
import Footer from "@/Components/Footer"

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <LoadingScreen key="loading" onComplete={() => setIsLoading(false)} />
      ) : (
        <motion.main
          key="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="min-h-screen bg-cream"
        >
          <Header />
          <HeroSection />
          <ProductSlider />
          <FAQSection />
          <Footer />
        </motion.main>
      )}
    </AnimatePresence>
  )
}
