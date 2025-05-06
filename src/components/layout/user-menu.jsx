"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { User, LogIn, UserPlus, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        className="flex items-center space-x-1 p-2 text-gray-700 hover:text-gold transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <User className="h-5 w-5" />
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute right-0 mt-2 w-48 bg-white border border-gold/20 shadow-lg rounded-sm z-50"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            {/* Decorative top border with gold-pink gradient */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold/30 via-pink/30 to-gold/30"></div>

            <div className="py-2 px-3 border-b border-gold/10 mt-1">
              <p className="text-sm text-muted-foreground">Welcome, Guest</p>
            </div>
            <div className="py-1">
              <Link
                to="/login"
                className="flex items-center px-4 py-2 text-sm hover:bg-gradient-to-r hover:from-cream/50 hover:to-pink/5 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <LogIn className="h-4 w-4 mr-2 text-gold" />
                <span>Login</span>
              </Link>
              <Link
                to="/register"
                className="flex items-center px-4 py-2 text-sm hover:bg-gradient-to-r hover:from-cream/50 hover:to-pink/5 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <UserPlus className="h-4 w-4 mr-2 text-gold" />
                <span>Register</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
