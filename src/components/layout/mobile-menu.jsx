"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { X, ChevronRight } from "lucide-react"
import { cn } from "../../lib/utils"

export default function MobileMenu({ isOpen, onClose }) {
  const location = useLocation()
  const [expandedSections, setExpandedSections] = useState({})

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const navSections = [
    {
      id: "main",
      items: [
        { label: "Home", path: "/" },
        { label: "Sweets Library", path: "/sweets-library" },
      ],
    },
    {
      id: "categories",
      label: "Categories",
      items: [
        { label: "Milk Sweets", path: "/categories/milk" },
        { label: "Dry Fruit Sweets", path: "/categories/dry-fruits" },
        { label: "Ghee Sweets", path: "/categories/ghee" },
        { label: "Bengali Sweets", path: "/categories/bengali" },
      ],
    },
    {
      id: "corporate",
      label: "Corporate Gifts",
      items: [
        { label: "Corporate Gift Boxes", path: "/corporate-gifts/boxes" },
        { label: "Branded Sweets", path: "/corporate-gifts/branded" },
        { label: "Bulk Corporate Orders", path: "/corporate-gifts/bulk" },
      ],
    },
    {
      id: "wedding",
      label: "Wedding Gifts",
      items: [
        { label: "Wedding Favor Boxes", path: "/wedding-gifts/favors" },
        { label: "Trousseau Packing", path: "/wedding-gifts/trousseau" },
        { label: "Gift Hampers", path: "/wedding-gifts/hampers" },
      ],
    },
    {
      id: "other",
      items: [
        { label: "Bulk Order", path: "/bulk-order" },
        { label: "Contact", path: "/contact" },
      ],
    },
  ]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>

      {/* Menu Panel */}
      <div className="absolute top-0 right-0 h-full w-[300px] bg-white shadow-xl overflow-y-auto">
        {/* Decorative top border with gold-pink gradient */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold/30 via-pink/30 to-gold/30"></div>

        <div className="p-4 border-b border-gold/20 flex justify-between items-center">
          <Link to="/" onClick={onClose}>
            <img src="/images/ramesh-logo.svg" alt="Ramesh Sweets Logo" className="h-40 w-auto -my-10" />
          </Link>
          <button onClick={onClose} className="p-2 text-gray-700 hover:text-gold">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4">
          <nav className="space-y-6">
            {navSections.map((section) => (
              <div key={section.id}>
                {section.label ? (
                  <>
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="w-full text-left font-cinzel text-lg text-gold border-b border-gold/20 pb-2 mb-3 flex justify-between items-center"
                    >
                      {section.label}
                      <ChevronRight
                        className={`h-4 w-4 transition-transform ${expandedSections[section.id] ? "rotate-90" : ""}`}
                      />
                    </button>

                    {expandedSections[section.id] && (
                      <ul className="space-y-3 mb-6 pl-2">
                        {section.items.map((item) => (
                          <li key={item.path}>
                            <Link
                              to={item.path}
                              onClick={onClose}
                              className={cn(
                                "flex items-center text-base hover:text-gold transition-colors",
                                location.pathname === item.path ? "text-gold font-medium" : "text-gray-700",
                              )}
                            >
                              <ChevronRight className="h-4 w-4 mr-1 text-gold/70" />
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <ul className="space-y-3">
                    {section.items.map((item) => (
                      <li key={item.path}>
                        <Link
                          to={item.path}
                          onClick={onClose}
                          className={cn(
                            "block text-base font-medium hover:text-gold transition-colors",
                            location.pathname === item.path ? "text-gold" : "text-gray-700",
                          )}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </nav>

          <div className="mt-8 pt-6 border-t border-gold/20">
            <div className="flex justify-between">
              <Link
                to="/login"
                className="px-4 py-2 border border-gold text-gold font-medium rounded-md hover:bg-gradient-to-r hover:from-gold/5 hover:to-pink/5 transition-colors"
                onClick={onClose}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-gradient-to-r from-gold to-pink/80 hover:from-gold/90 hover:to-pink/70 text-white font-medium rounded-md transition-colors"
                onClick={onClose}
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
