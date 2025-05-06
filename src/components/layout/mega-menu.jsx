"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function MegaMenu({ title, items, columns = 1 }) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeItem, setActiveItem] = useState(null)

  // Calculate grid columns class
  const gridClass =
    {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
    }[columns] || "grid-cols-1"

  return (
    <div className="relative" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <button
        className="flex items-center space-x-1 py-2 text-sm font-cinzel font-medium transition-colors hover:text-gold text-black"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>{title}</span>
        <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 mt-1 w-[650px] max-w-[95vw] bg-white border border-gold/30 shadow-xl z-50 rounded-sm overflow-hidden"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {/* Heritage decorative elements with gold-pink blend */}
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-gold/30 via-pink/20 to-gold/30"></div>
            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-gold/30 via-pink/20 to-gold/30"></div>
            <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-gold/30 via-pink/20 to-gold/30"></div>
            <div className="absolute inset-y-0 right-0 w-1 bg-gradient-to-b from-gold/30 via-pink/20 to-gold/30"></div>

            {/* Inner border */}
            <div className="absolute inset-[3px] border border-gold/10 pointer-events-none rounded-sm"></div>

            {/* Background pattern */}
            <div className="absolute inset-0 heritage-pattern opacity-[0.03] pointer-events-none"></div>
            <div className="absolute inset-0 pink-pattern opacity-[0.01] pointer-events-none"></div>

            {/* Decorative corner elements */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-gold/40"></div>
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-gold/40"></div>
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-gold/40"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-gold/40"></div>

            <div className="p-6 relative z-10">
              <div className={`grid ${gridClass} gap-8`}>
                {items.map((item, index) => (
                  <div key={index} className="space-y-4">
                    {item.heading && (
                      <h3 className="font-cinzel text-gold text-base border-b border-gold/20 pb-2 mb-3">
                        {item.heading}
                      </h3>
                    )}
                    <ul className="space-y-4">
                      {item.links.map((link, linkIndex) => (
                        <motion.li
                          key={linkIndex}
                          className="group"
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2, delay: linkIndex * 0.05 }}
                          onMouseEnter={() => setActiveItem(`${index}-${linkIndex}`)}
                          onMouseLeave={() => setActiveItem(null)}
                        >
                          <Link
                            to={link.href}
                            className="flex items-center gap-4 py-2 hover:bg-gradient-to-r hover:from-cream/30 hover:to-pink/5 transition-all duration-300 rounded-md px-3 -mx-2"
                            onClick={() => setIsOpen(false)}
                          >
                            {/* Image thumbnail with hover effect */}
                            <div className="w-16 h-16 rounded-md overflow-hidden border border-gold/20 flex-shrink-0 shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:border-gold/50">
                              <motion.div
                                className="w-full h-full"
                                animate={{
                                  scale: activeItem === `${index}-${linkIndex}` ? 1.1 : 1,
                                }}
                                transition={{ duration: 0.3 }}
                              >
                                <img
                                  src={link.image || "/sweets_images/petha.jpg"}
                                  alt={link.label}
                                  className="w-full h-full object-cover"
                                />
                              </motion.div>
                            </div>
                            <div>
                              <span className="block text-sm font-cinzel font-medium text-black group-hover:text-gold transition-colors">
                                {link.label}
                              </span>
                              <span className="text-xs text-gray-500 group-hover:text-gray-700 transition-colors">
                                {getItemDescription(link.label)}
                              </span>
                            </div>
                          </Link>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Helper function to get descriptions for menu items
function getItemDescription(label) {
  const descriptions = {
    "Milk Sweets": "Delicate sweets made with fresh milk and traditional recipes",
    "Dry Fruit Sweets": "Luxurious sweets crafted with premium nuts and dry fruits",
    "Ghee Sweets": "Rich and aromatic sweets made with pure clarified butter",
    "Bengali Sweets": "Authentic Bengali delicacies with unique flavors and textures",
    "Festive Specials": "Seasonal treats perfect for celebrating special occasions",
    "Gift Packs": "Beautifully packaged assortments for gifting to loved ones",
    "Sugar-Free Options": "Healthier alternatives without compromising on taste",
    "Premium Selection": "Our finest creations made with the highest quality ingredients",
    "Corporate Gift Boxes": "Elegant gift boxes perfect for corporate gifting",
    "Branded Sweets": "Customized sweets with your company logo and branding",
    "Bulk Corporate Orders": "Large orders for events and corporate celebrations",
    "Wedding Favor Boxes": "Beautiful favor boxes for wedding guests",
    "Trousseau Packing": "Elegant packaging for wedding gifts and trousseau",
    "Gift Hampers": "Luxurious hampers for special occasions and celebrations",
  }

  return descriptions[label] || "Traditional Indian sweet made with authentic recipes"
}
