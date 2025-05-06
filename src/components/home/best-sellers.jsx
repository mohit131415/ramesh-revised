"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, ShoppingBag, ChevronLeft, ChevronRight, Eye, Award } from "lucide-react"
import { useNavigate } from "react-router-dom"
import useCartStore from "../../store/cartStore"
import { getBestsellerProducts } from "../../data/products"
import { UniversalButton } from "../ui/universal-button"

// Elegant Section Title Component
const ElegantSectionTitle = ({ title, subtitle }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, ease: "easeOut" }}
    viewport={{ once: true }}
    className="text-center mb-16"
  >
    <div className="inline-block relative">
      {/* Decorative elements */}
      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent"></div>

      {/* Subtitle */}
      <div className="mb-3">
        <span className="text-gold font-cinzel text-sm tracking-[0.2em] uppercase">{subtitle}</span>
      </div>

      {/* Main title */}
      <h2 className="font-cinzel text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-wide mb-3">
        {title}
      </h2>

      {/* Bottom decorative element */}
      <div className="flex items-center justify-center mt-4">
        <div className="h-px w-12 bg-gradient-to-r from-transparent via-gold to-transparent"></div>
        <div className="mx-2 text-gold">✦</div>
        <div className="h-px w-12 bg-gradient-to-r from-gold via-gold to-transparent"></div>
      </div>
    </div>
  </motion.div>
)

// Featured Product Slider Component
const LuxuryFeaturedSlider = ({ products, onAddToCart }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const totalProducts = products.length
  const autoplayRef = useRef(null)
  const sliderRef = useRef(null)
  const navigate = useNavigate()

  // Setup autoplay
  useEffect(() => {
    if (!isPaused) {
      autoplayRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % totalProducts)
      }, 5000) // Change slide every 5 seconds
    }

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current)
      }
    }
  }, [isPaused, totalProducts])

  const nextSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev + 1) % totalProducts)
    setTimeout(() => setIsAnimating(false), 500)

    // Reset autoplay timer when manually changing slides
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current)
      if (!isPaused) {
        autoplayRef.current = setInterval(() => {
          setCurrentIndex((prev) => (prev + 1) % totalProducts)
        }, 5000)
      }
    }
  }

  const prevSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev - 1 + totalProducts) % totalProducts)
    setTimeout(() => setIsAnimating(false), 500)

    // Reset autoplay timer when manually changing slides
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current)
      if (!isPaused) {
        autoplayRef.current = setInterval(() => {
          setCurrentIndex((prev) => (prev + 1) % totalProducts)
        }, 5000)
      }
    }
  }

  const goToSlide = (index) => {
    if (isAnimating || index === currentIndex) return
    setIsAnimating(true)
    setCurrentIndex(index)
    setTimeout(() => setIsAnimating(false), 500)

    // Reset autoplay timer when manually changing slides
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current)
      if (!isPaused) {
        autoplayRef.current = setInterval(() => {
          setCurrentIndex((prev) => (prev + 1) % totalProducts)
        }, 5000)
      }
    }
  }

  const handleMouseEnter = () => {
    setIsPaused(true)
  }

  const handleMouseLeave = () => {
    setIsPaused(false)
  }

  const currentProduct = products[currentIndex]

  const handleAddToCart = () => {
    onAddToCart({
      id: currentProduct.id,
      name: currentProduct.name,
      price: currentProduct.price,
      image: currentProduct.image,
      quantity: 1,
    })

    // Navigate to cart page after adding item
    navigate("/cart")
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="relative mb-20"
      ref={sliderRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main slider container */}
      <div className="relative overflow-hidden rounded-lg shadow-xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 bg-white"
          >
            {/* Product Image */}
            <div className="relative h-[400px] md:h-[600px] overflow-hidden">
              <motion.img
                initial={{ scale: 1.05 }}
                animate={{ scale: 1 }}
                transition={{ duration: 6, ease: "easeOut" }}
                src={currentProduct?.image || "/placeholder.svg"}
                alt={currentProduct?.name}
                className="w-full h-full object-cover"
              />

              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

              {/* Bestseller Badge */}
              <div className="absolute top-6 right-6 z-10">
                <div className="bg-gold text-white px-4 py-1.5 text-sm font-bold tracking-wider shadow-md">
                  BESTSELLER
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center relative">
              {/* Decorative corner elements */}
              <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-gold/30"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-gold/30"></div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="mb-3">
                  <span className="text-sm font-medium uppercase tracking-wider text-gold font-cinzel">
                    {currentProduct?.category}
                  </span>
                </div>

                <h3 className="font-cinzel text-3xl lg:text-4xl font-bold text-gray-900 mb-4 tracking-wide leading-tight">
                  {currentProduct?.name}
                </h3>

                {/* Rating */}
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(currentProduct?.rating || 0)
                          ? "fill-gold text-gold"
                          : "fill-gray-200 text-gray-200"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm font-medium text-gray-600">
                    ({currentProduct?.reviews || 0} reviews)
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-700 mb-6 font-eb-garamond text-lg leading-relaxed">
                  {currentProduct?.description}
                </p>

                {/* Price */}
                <div className="flex items-baseline mb-8">
                  <span className="text-3xl lg:text-4xl font-cinzel font-bold text-gold">₹{currentProduct?.price}</span>
                  <span className="text-sm text-gray-500 ml-2">/{currentProduct?.weight || "500g"}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <UniversalButton
                    onClick={handleAddToCart}
                    icon={<ShoppingBag />}
                    iconPosition="left"
                    className="flex-1"
                  >
                    Add to Cart
                  </UniversalButton>

                  <UniversalButton
                    variant="secondary"
                    icon={<Eye />}
                    iconPosition="left"
                    className="flex-1"
                    onClick={() => navigate(`/products/${currentProduct?.id}`)}
                  >
                    View Details
                  </UniversalButton>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center bg-white/90 border border-gold/30 rounded-full text-gold hover:bg-gold/5 transition-colors shadow-md"
        aria-label="Previous product"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center bg-white/90 border border-gold/30 rounded-full text-gold hover:bg-gold/5 transition-colors shadow-md"
        aria-label="Next product"
      >
        <ChevronRight size={24} />
      </button>

      {/* Slider Indicators */}
      <div className="flex justify-center mt-8 space-x-2">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-gold w-8" : "bg-gold/30"
            }`}
            aria-label={`Go to product ${index + 1}`}
          />
        ))}
      </div>
    </motion.div>
  )
}

// Redesigned Luxury Product Card Component
const LuxuryProductCard = ({ product, onAddToCart }) => {
  const navigate = useNavigate()

  // Check if product is premium
  const isPremium = product.tags?.includes("premium") || product.featured

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    onAddToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
  }

  const handleCardClick = () => {
    navigate(`/products/${product.id}`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="group"
    >
      <div
        className="relative bg-white rounded-lg overflow-hidden shadow-lg border border-gold/20 transition-all duration-300 cursor-pointer"
        onClick={handleCardClick}
      >
        {/* Premium badge */}
        {isPremium && (
          <div className="absolute top-3 right-3 z-10 bg-gold/90 text-white px-2 py-1 rounded-sm text-xs font-medium shadow-md flex items-center gap-1">
            <Award className="h-3 w-3" />
            <span>Premium</span>
          </div>
        )}

        {/* Discount badge if applicable */}
        {product.discount && (
          <div className="absolute top-3 left-3 z-10 bg-pink-500/90 text-white px-2 py-1 rounded-sm text-xs font-medium shadow-md">
            {product.discount}% OFF
          </div>
        )}

        {/* Product Image */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700"
          />

          {/* Decorative gold corner accents */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gold/40 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gold/40 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-gold/40 pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gold/40 pointer-events-none"></div>

          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
        </div>

        {/* Product Info */}
        <div className="p-5 bg-gradient-to-b from-[#FFF9FB]/80 to-white">
          {/* Category */}
          <div className="text-xs text-gold font-medium mb-2 uppercase tracking-wider font-cinzel">
            {product.category}
          </div>

          {/* Product Name */}
          <h3 className="font-cinzel text-lg font-bold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>

          {/* Rating */}
          <div className="flex items-center mb-3">
            <div className="flex mr-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3.5 w-3.5 ${i < Math.floor(product.rating || 4) ? "text-gold fill-gold" : "text-gray-200"}`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">({product.reviews || 0})</span>
          </div>

          {/* Price with decorative elements */}
          <div className="flex items-baseline justify-between mb-4">
            <div className="flex items-baseline">
              {product.discount ? (
                <div className="flex flex-col">
                  <span className="text-lg font-semibold text-gold font-cinzel">
                    ₹{(product.price - (product.price * product.discount) / 100).toFixed(0)}
                  </span>
                  <span className="text-xs text-gray-500 line-through">₹{product.price}</span>
                </div>
              ) : (
                <span className="text-lg font-semibold text-gold font-cinzel">₹{product.price}</span>
              )}
              <span className="text-xs text-gray-500 ml-1 font-serif">/{product.weight || "500g"}</span>
            </div>

            {/* Decorative element */}
            <div className="h-6 w-6 rounded-full border border-gold/30 flex items-center justify-center">
              <div className="h-3 w-3 rounded-full bg-gold/20"></div>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full py-2 bg-gold text-white text-sm font-medium rounded-sm hover:bg-gold-dark transition-colors flex items-center justify-center shadow-sm"
          >
            <ShoppingBag className="mr-2 h-4 w-4" />
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default function BestSellers() {
  const [products, setProducts] = useState([])
  const { addItem } = useCartStore()
  const navigate = useNavigate()

  useEffect(() => {
    // Get 8 bestseller products
    const bestsellerProducts = getBestsellerProducts(8)
    setProducts(bestsellerProducts)
  }, [])

  const handleAddToCart = (product) => {
    addItem(product)
  }

  // Get first 4 products for the grid
  const gridProducts = products.slice(0, 4)

  return (
    <section className="py-24 relative overflow-hidden bg-[#FFF9FB]">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 heritage-pattern opacity-5"></div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-gold/10 rounded-tl-3xl"></div>
      <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-gold/10 rounded-tr-3xl"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-gold/10 rounded-bl-3xl"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-gold/10 rounded-br-3xl"></div>

      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <ElegantSectionTitle title="Royal Heritage Collection" subtitle="Premium Selection" />

        {/* Featured Product Slider */}
        {products.length > 0 && <LuxuryFeaturedSlider products={products} onAddToCart={handleAddToCart} />}

        {/* Curated Selection Title */}
        <div className="text-center mb-12">
          <h3 className="font-cinzel text-2xl font-bold text-gray-900 mb-2">Curated Treasures</h3>
          <div className="flex items-center justify-center">
            <div className="h-px w-12 bg-gold/50"></div>
            <div className="mx-2 text-gold">•</div>
            <div className="h-px w-12 bg-gold/50"></div>
          </div>
        </div>

        {/* Product Grid - 4 Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {gridProducts.map((product) => (
            <LuxuryProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
          ))}
        </div>

        {/* View All Products Button */}
        <div className="text-center">
          <UniversalButton variant="secondary" size="lg" onClick={() => navigate("/products")}>
            EXPLORE FULL COLLECTION
          </UniversalButton>
        </div>
      </div>
    </section>
  )
}
