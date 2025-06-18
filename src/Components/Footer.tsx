"use client"

import { motion } from "framer-motion"

const socialLinks = [
  { name: "Facebook", href: "#" },
  { name: "Instagram", href: "#" },
  { name: "YouTube", href: "#" },
]

const legalLinks = [
  { name: "Terms of Service", href: "#" },
  { name: "Privacy Policy", href: "#" },
  { name: "Cookies Policy", href: "#" },
]

export default function Footer() {
  return (
    <footer className="relative bg-dark-green overflow-hidden">
      {/* Animated Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
        <motion.span
          animate={{ x: [-100, 100] }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="text-[30vw] font-black text-cream leading-none select-none whitespace-nowrap"
        >
          SKINCARE SKINCARE SKINCARE
        </motion.span>
      </div>

      {/* Footer Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 mb-16">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal text-cream mb-8 leading-tight">
              Join The Skincare
              <br />
              Community Now.
            </h3>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:text-right"
          >
            <p className="text-xl lg:text-2xl text-cream/80 mb-2">Get in Touch</p>
            <motion.p
              whileHover={{ scale: 1.02 }}
              className="text-3xl md:text-4xl lg:text-5xl font-normal text-cream cursor-pointer"
            >
              contact.skincare.com
            </motion.p>
          </motion.div>
        </div>

        {/* Footer Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-8 pt-8 border-t border-cream/20"
        >
          {/* Social Links */}
          <div className="flex flex-wrap gap-8">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -2, scale: 1.05 }}
                viewport={{ once: true }}
                className="text-cream/70 hover:text-cream transition-colors duration-200 font-medium relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cream transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap gap-8">
            {legalLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -2, scale: 1.05 }}
                viewport={{ once: true }}
                className="text-cream/70 hover:text-cream transition-colors duration-200 font-medium relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cream transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12 pt-8 border-t border-cream/10"
        >
          <p className="text-cream/60 text-sm">© 2024 Natural Glow Skincare. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  )
}
