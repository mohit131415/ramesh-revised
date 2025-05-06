"use client"

import { useState } from "react"
import { ShoppingBag, Heart, Check, Package } from "lucide-react"
import useCartStore from "../../store/cartStore"
import useFavoritesStore from "../../store/favoritesStore"
import { toast } from "sonner"

// Helper function to format price
const formatPrice = (price) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price)
}

// Helper function to format weight
const formatWeight = (weight, unit) => {
  if (unit === "g") {
    return `${Number.parseFloat(weight).toFixed(0)}g`
  } else if (unit === "kg") {
    return `${Number.parseFloat(weight).toFixed(2)}kg`
  }
  return `${weight} ${unit}`
}

const ProductInfo = ({ product, selectedVariant, setSelectedVariant, hideHeader = false }) => {
  const [quantity, setQuantity] = useState(1)
  const [addingToCart, setAddingToCart] = useState(false)
  const [addingToFavorites, setAddingToFavorites] = useState(false)
  const { addItem } = useCartStore()
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore()
  const [isFavorited, setIsFavorited] = useState(isFavorite(product?.id))
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  if (!product) return null

  // Parse ingredients if it's a string
  const ingredients =
    typeof product.ingredients === "string" ? JSON.parse(product.ingredients) : product.ingredients || []

  // Handle add to cart
  const handleAddToCart = () => {
    if (!selectedVariant) return

    setAddingToCart(true)

    // Simulate network request
    setTimeout(() => {
      addItem({
        id: `${product.id}-${selectedVariant.id}`,
        productId: product.id,
        variantId: selectedVariant.id,
        name: product.name,
        variant: selectedVariant.variant_name,
        price: selectedVariant.sale_price || selectedVariant.price,
        image: product.images && product.images.length > 0 ? product.images[0].image_path : null,
        quantity,
      })

      // Show success message
      setShowSuccessMessage(true)
      setTimeout(() => setShowSuccessMessage(false), 3000)

      // Show toast notification
      toast.success(`${quantity} × ${product.name} added to your cart.`, {
        description: "Go to cart to complete your purchase.",
        action: {
          label: "View Cart",
          onClick: () => (window.location.href = "/cart"),
        },
      })

      setAddingToCart(false)
    }, 600)
  }

  const toggleFavorite = () => {
    setAddingToFavorites(true)

    // Simulate network request
    setTimeout(() => {
      if (isFavorited) {
        removeFavorite(product.id)
        setIsFavorited(false)
        toast.info(`${product.name} removed from favorites`)
      } else {
        addFavorite({
          id: product.id,
          name: product.name,
          price: selectedVariant?.price || product.price,
          image: product.images && product.images.length > 0 ? product.images[0].image_path : null,
          category: product.category?.name,
        })
        setIsFavorited(true)
        toast.success(`${product.name} added to favorites`)
      }

      setAddingToFavorites(false)
    }, 400)
  }

  return (
    <div className="space-y-8">
      {/* Only show these if hideHeader is false */}
      {!hideHeader && (
        <>
          {/* Product Name */}
          <h1 className="font-cinzel text-3xl md:text-4xl text-gray-900 tracking-wide uppercase">{product.name}</h1>

          {/* Product Tags */}
          <div className="flex flex-wrap gap-3 items-center">
            {product.category && (
              <div className="flex items-center gap-1.5 text-gold-dark">
                <span className="text-sm font-medium">{product.category.name}</span>
              </div>
            )}

            {product.subcategory && (
              <div className="flex items-center gap-1.5 text-gold-dark">
                <span className="text-sm font-medium">{product.subcategory.name}</span>
              </div>
            )}
          </div>
        </>
      )}

      {/* Short description */}
      <p className="text-gray-700 font-eb-garamond text-lg leading-relaxed italic">{product.short_description}</p>

      {/* Variants Cards */}
      <div className="space-y-5">
        <h3 className="text-sm font-cinzel text-gray-800 uppercase tracking-wider">SELECT SIZE</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {product.variants &&
            product.variants.map((variant) => (
              <div
                key={variant.id}
                onClick={() => setSelectedVariant(variant)}
                className={`relative overflow-hidden rounded-md cursor-pointer transition-all duration-300 ${
                  selectedVariant && selectedVariant.id === variant.id
                    ? "ring-2 ring-gold shadow-lg"
                    : "ring-1 ring-gray-200 hover:ring-gold/50"
                }`}
              >
                {/* Discount tag */}
                {variant.sale_price && variant.price && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-green-600 text-white px-3 py-1 text-xs font-semibold shadow-md">
                      {variant.discount_percentage}% OFF
                    </div>
                  </div>
                )}

                <div
                  className={`p-5 ${
                    selectedVariant && selectedVariant.id === variant.id
                      ? "bg-gradient-to-r from-gold/10 to-transparent"
                      : "bg-white hover:bg-cream-light"
                  }`}
                >
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-cinzel text-lg text-gray-900">{variant.variant_name}</h4>
                    {selectedVariant && selectedVariant.id === variant.id && (
                      <div className="h-5 w-5 bg-gold rounded-full flex items-center justify-center">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </div>

                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-2xl font-semibold text-gold-dark">
                      ₹{variant.sale_price || variant.price}
                    </span>
                    {variant.sale_price && variant.price && (
                      <span className="text-sm text-gray-500 line-through">₹{variant.price}</span>
                    )}
                  </div>

                  <div className="text-sm text-gray-600 flex items-center gap-1.5">
                    <Package className="h-3.5 w-3.5" />
                    {formatWeight(variant.weight, variant.weight_unit)}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Quantity selector */}
      <div className="space-y-4">
        <h3 className="text-sm font-cinzel text-gray-800 uppercase tracking-wider">QUANTITY</h3>
        <div className="flex items-center">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-12 h-12 flex items-center justify-center border border-gold/50 rounded-l-md bg-white text-gold-dark hover:bg-gold/5 transition-colors"
            disabled={quantity <= 1}
          >
            <span className="text-xl font-medium">−</span>
          </button>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
            className="w-20 h-12 border-y border-gold/50 text-center text-gray-700 focus:outline-none bg-white text-lg"
          />
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-12 h-12 flex items-center justify-center border border-gold/50 rounded-r-md bg-white text-gold-dark hover:bg-gold/5 transition-colors"
          >
            <span className="text-xl font-medium">+</span>
          </button>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <button
          onClick={handleAddToCart}
          disabled={addingToCart}
          className={`flex-1 py-4 px-6 rounded-md transition-all duration-300 flex items-center justify-center gap-3 shadow-lg relative overflow-hidden group ${
            addingToCart
              ? "bg-gold/80 text-white cursor-wait"
              : "bg-gradient-to-r from-gold to-gold-dark text-white hover:shadow-xl hover:translate-y-[-2px]"
          }`}
        >
          {showSuccessMessage ? (
            <>
              <Check className="h-5 w-5" />
              Added to Cart
            </>
          ) : (
            <>
              <ShoppingBag className="h-5 w-5 group-hover:animate-bounce" />
              {addingToCart ? "Adding..." : "Add to Cart"}
            </>
          )}

          {/* Elegant hover effect */}
          <span className="absolute inset-0 w-full h-full bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
        </button>

        <button
          onClick={toggleFavorite}
          disabled={addingToFavorites}
          className={`py-4 px-6 rounded-md border flex items-center justify-center gap-3 transition-all duration-300 ${
            isFavorited
              ? "bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
              : "bg-white text-gray-700 border-gray-200 hover:border-gold/50 hover:text-gold-dark"
          }`}
        >
          <Heart
            className={`h-5 w-5 ${isFavorited ? "fill-red-500" : ""} ${addingToFavorites ? "animate-pulse" : ""}`}
          />
          {addingToFavorites ? "Processing..." : isFavorited ? "Favorited" : "Add to Favorites"}
        </button>
      </div>

      {/* Decorative element */}
      <div className="heritage-divider my-2"></div>
    </div>
  )
}

export default ProductInfo
