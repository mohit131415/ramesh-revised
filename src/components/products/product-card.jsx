"use client"

import { useState, useRef } from "react"
import { Link } from "react-router-dom"
import useCartStore from "../../store/cartStore"

const ProductCard = ({ product }) => {
  const [isImageFlipped, setIsImageFlipped] = useState(false)
  const imageContainerRef = useRef(null)
  const { addToCart } = useCartStore()

  // Handle missing product data with defaults
  const {
    id,
    name = "Product Name",
    slug = "product-slug",
    variants = [],
    images = [],
    category,
    subcategory,
    tags = [],
    is_vegetarian = true,
    short_description = "",
  } = product || {}

  // Get the primary image and a secondary image if available
  const primaryImage = images.find((img) => img.is_primary === 1)
  const secondaryImage = images.find((img) => img.is_primary === 0) || primaryImage

  // Format image URLs
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "/placeholder.svg"

    // Check if it's already a full URL
    if (imagePath.startsWith("http")) return imagePath

    // Otherwise, construct the URL with a hardcoded base URL
    return `http://localhost/ramesh-be/be/api/public/${imagePath}`
  }

  // Get the primary variant (usually the smallest size)
  const primaryVariant =
    variants.length > 0
      ? variants.sort((a, b) => a.display_order - b.display_order)[0]
      : { price: 0, sale_price: 0, variant_name: "" }

  const price = primaryVariant.price || 0
  const salePrice = primaryVariant.sale_price || 0
  const variantName = primaryVariant.variant_name || ""
  const discount = salePrice && price > salePrice ? Math.round(((price - salePrice) / price) * 100) : 0

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (addToCart) {
      addToCart({
        ...product,
        quantity: 1,
        selectedVariant: primaryVariant,
      })
    }
  }

  // Generate product URL - use slug if available, otherwise use ID
  const productUrl = slug ? `/product/slug/${slug}` : `/product/${id}`

  return (
    <Link to={productUrl} className="block relative group">
      <div
        className="bg-white rounded-lg overflow-hidden transition-all duration-300 relative
        border border-gray-100 hover:border-gray-200
        shadow-[0_2px_10px_rgba(0,0,0,0.05)]
        hover:shadow-[0_5px_15px_rgba(0,0,0,0.08)]"
      >
        {/* Vegetarian indicator */}
        <div className="absolute top-3 left-3 z-20">
          {is_vegetarian === 1 && (
            <div className="bg-green-50 border border-green-500 rounded-full p-1">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
          )}
          {is_vegetarian === 0 && (
            <div className="bg-red-50 border border-red-500 rounded-full p-1">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
            </div>
          )}
        </div>

        {/* Discount badge with red background */}
        {discount > 0 && (
          <div className="absolute top-3 right-3 z-20">
            <div className="bg-red-600 text-white text-xs font-bold px-3 py-1.5">{discount}% OFF</div>
          </div>
        )}

        {/* Product image */}
        <div className="h-48 overflow-hidden">
          <img
            src={primaryImage ? getImageUrl(primaryImage.image_path) : "/placeholder.svg"}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Product info */}
        <div className="p-4">
          {/* Category tags */}
          <div className="mb-2">
            {category && (
              <span className="inline-block text-xs bg-[#f8f5f0] text-[#8a733f] px-3 py-1 rounded-full mr-1">
                {category.name}
              </span>
            )}
            {tags && tags.length > 0 && (
              <span className="inline-block text-xs bg-[#f8f5f0] text-[#8a733f] px-3 py-1 rounded-full">
                {tags[0].name}
              </span>
            )}
          </div>

          {/* Product name */}
          <h3 className="text-gray-800 mb-1 text-xl font-medium">{name}</h3>

          {/* Variant name */}
          {variantName && <div className="text-sm text-gray-600 mb-2">Starting from {variantName}</div>}

          {/* Short description */}
          {short_description && <p className="text-sm text-gray-500 mb-4">{short_description}</p>}

          {/* Variants display */}
          {variants.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {variants.map((variant) => (
                <div key={variant.id} className="text-xs bg-gray-100 px-3 py-1.5 rounded-full">
                  {variant.variant_name}
                </div>
              ))}
            </div>
          )}

          {/* Add to cart button - matching the style in the image */}
          <div className="mt-auto pt-2">
            <button
              onClick={handleAddToCart}
              className="w-full bg-[#d3ae6e] hover:bg-[#c19c5d] text-white py-2 rounded-md text-sm font-medium transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
