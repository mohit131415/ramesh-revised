"use client"

import { useState } from "react"
import { X, Gift } from "lucide-react"
import { motion } from "framer-motion"

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <motion.div
      className="bg-black-rich py-2.5 text-center relative shadow-lg"
      initial={{ y: -40 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Decorative elements */}
      <div className="absolute left-0 top-0 w-full h-0.5 bg-gradient-to-r from-gold via-pink to-gold"></div>

      <div className="container mx-auto flex items-center justify-center">
        <div className="flex items-center">
          <div className="hidden md:flex items-center mr-6">
            <div className="w-8 h-px bg-gold transform -rotate-45 mr-2"></div>
            <Gift className="text-gold h-4 w-4" />
            <div className="w-8 h-px bg-gold transform rotate-45 ml-2"></div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
            <span className="font-cinzel text-gold font-medium tracking-widest text-sm">FREE SHIPPING</span>
            <span className="hidden md:block h-3 w-px bg-pink/40"></span>
            <span className="font-cinzel text-cream-dark text-xs tracking-wide mt-0.5 md:mt-0">
              EXTRA DISCOUNT FOR NEARBY PINCODES
            </span>
          </div>

          <div className="hidden md:flex items-center ml-6">
            <div className="w-8 h-px bg-gold transform rotate-45 mr-2"></div>
            <Gift className="text-gold h-4 w-4" />
            <div className="w-8 h-px bg-gold transform -rotate-45 ml-2"></div>
          </div>
        </div>

        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 text-cream-dark/70 hover:text-cream transition-colors"
          aria-label="Close announcement"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </motion.div>
  )
}
