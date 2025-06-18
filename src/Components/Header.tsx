"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Menu, X, ShoppingBag, Heart, User } from "lucide-react"
import { Button } from "@/Components/ui/button"

const navItems = [
  { name: "All Products", href: "#products" },
  { name: "Serum", href: "#serum" },
  { name: "Sunscreen", href: "#sunscreen" },
  { name: "Bundle", href: "#bundle" },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? "bg-cream/95 backdrop-blur-md shadow-lg border-b border-dark-green/10" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-shrink-0">
            <Image
              src="/images/img_headerlogo.png"
              alt="Natural Glow"
              width={140}
              height={36}
              className="w-auto h-8 lg:h-10"
              priority
            />
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -2 }}
                className="text-dark-green hover:text-dark-green/70 transition-colors duration-200 font-medium relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-dark-green transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center space-x-2"
            >
              <Button
                variant="ghost"
                size="icon"
                className="w-10 h-10 bg-light-green hover:bg-light-green/80 rounded-full transition-all duration-300 hover:scale-110"
              >
                <ShoppingBag className="w-5 h-5 text-dark-green" />
              </Button>
              <span className="text-dark-green font-medium">Cart (1)</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Button
                variant="ghost"
                size="icon"
                className="w-10 h-10 bg-light-green hover:bg-light-green/80 rounded-full transition-all duration-300 hover:scale-110"
              >
                <Heart className="w-5 h-5 text-dark-green" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Button
                variant="ghost"
                size="icon"
                className="w-10 h-10 bg-light-green hover:bg-light-green/80 rounded-full transition-all duration-300 hover:scale-110"
              >
                <User className="w-5 h-5 text-dark-green" />
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-light-green/50 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6 text-dark-green" /> : <Menu className="w-6 h-6 text-dark-green" />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden bg-cream/95 backdrop-blur-md border-t border-light-green/20 overflow-hidden"
            >
              <nav className="py-4 space-y-2">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-3 text-dark-green hover:bg-light-green/30 transition-colors rounded-lg mx-2"
                  >
                    {item.name}
                  </motion.a>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="flex items-center justify-center space-x-4 py-4 border-t border-light-green/20"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-10 h-10 bg-light-green hover:bg-light-green/80 rounded-full"
                >
                  <ShoppingBag className="w-5 h-5 text-dark-green" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-10 h-10 bg-light-green hover:bg-light-green/80 rounded-full"
                >
                  <Heart className="w-5 h-5 text-dark-green" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-10 h-10 bg-light-green hover:bg-light-green/80 rounded-full"
                >
                  <User className="w-5 h-5 text-dark-green" />
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
