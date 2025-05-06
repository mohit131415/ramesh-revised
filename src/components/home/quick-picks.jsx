"use client"

import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import useCartStore from "../../store/cartStore"
import { Eye, ShoppingBag } from "lucide-react"
import { motion } from "framer-motion"
import HeritageSectionHeader from "../ui/heritage-section-header"
import { UniversalButton } from "../ui/universal-button"

// Updated quick picks data with Shrikhand removed
const quickPickItems = [
  {
    id: 103,
    name: "Kesar Peda",
    imageSrc: "/sweets_images/kesar peda.jpg",
    price: "₹600",
    weight: "500g",
  },
  {
    id: 104,
    name: "Khoya",
    imageSrc: "/sweets_images/khoya.jpg",
    price: "₹700",
    weight: "500g",
  },
  {
    id: 105,
    name: "Malai Peda",
    imageSrc: "/sweets_images/malai peda.jpg",
    price: "₹650",
    weight: "500g",
  },
  {
    id: 109,
    name: "Methi Laddoo",
    imageSrc: "/sweets_images/methi laddo.jpg",
    price: "₹650",
    weight: "500g",
  },
  {
    id: 110,
    name: "Piss",
    imageSrc: "/sweets_images/piss.jpg",
    price: "₹650",
    weight: "500g",
  },
]

export default function QuickPicks() {
  const { addItem } = useCartStore()
  const navigate = useNavigate()

  const handleAddToCart = (product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: Number.parseFloat(product.price.replace("₹", "")),
      image: product.imageSrc,
      quantity: 1,
    })
    navigate("/cart")
  }

  return (
    <section className="py-20" style={{ backgroundColor: "#FFF9FB" }}>
      {/* Simple gold accent line at top */}
      <div className="w-24 h-px bg-gold/60 mx-auto mb-16"></div>

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <HeritageSectionHeader
          title="Premium Selection"
          subtitle="Handcrafted delicacies made with traditional recipes"
          preTitle="FEATURED PRODUCTS"
        />

        {/* Products grid */}
        <div className="mt-16 mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {quickPickItems.map((item) => (
              <motion.div
                key={item.id}
                className="group"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                {/* Clean, simple product card with original styling */}
                <div className="bg-white border border-gold/20 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                  {/* Product image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.imageSrc || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Simple weight badge with original gold styling */}
                    <div className="absolute top-3 right-3 bg-gold/90 text-brown text-xs px-2 py-0.5 font-medium">
                      {item.weight}
                    </div>
                  </div>

                  {/* Product info */}
                  <div className="p-4">
                    <h3 className="font-cinzel text-base font-semibold mb-1 text-center">{item.name}</h3>
                    <p className="text-gold-dark font-bold text-lg mb-4 text-center">{item.price}</p>

                    {/* Button container */}
                    <div className="grid grid-cols-2 gap-2">
                      {/* VIEW button */}
                      <Link to={`/products/${item.id}`} className="block">
                        <UniversalButton
                          variant="secondary"
                          size="sm"
                          icon={<Eye className="w-3 h-3" />}
                          className="w-full text-xs"
                        >
                          VIEW
                        </UniversalButton>
                      </Link>

                      {/* ADD TO CART button */}
                      <UniversalButton
                        variant="primary"
                        size="sm"
                        icon={<ShoppingBag className="w-3 h-3" />}
                        className="w-full text-xs"
                        onClick={() => handleAddToCart(item)}
                      >
                        ADD
                      </UniversalButton>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Simple gold accent line before button */}
        <div className="w-24 h-px bg-gold/60 mx-auto mb-8"></div>

        {/* View all products button */}
        <div className="text-center">
          <UniversalButton variant="secondary" size="default" icon={<Eye />} onClick={() => navigate("/products")}>
            VIEW ALL PRODUCTS
          </UniversalButton>
        </div>
      </div>
    </section>
  )
}
