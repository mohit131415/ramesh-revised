"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { motion } from "framer-motion"
import { ChevronRight, ArrowLeft, Leaf, Clock, Package } from "lucide-react"
import { Helmet } from "react-helmet"

// Services and hooks
import { getProduct, getProductBySlug } from "../services/product-service"
import useCartStore from "../store/cartStore"
import useProductStore from "../store/productStore"

// Components
import ProductGallery from "../components/product-detail/product-gallery"
import ProductInfo from "../components/product-detail/product-info"
import ProductTabs from "../components/product-detail/product-tabs"
import RelatedProducts from "../components/product-detail/related-products"
import LoadingSpinner from "../components/common/loading-spinner"
import { Button } from "../components/ui/button"

// Helper function to format weight
const formatWeight = (weight, unit) => {
  if (unit === "g") {
    return `${Number.parseFloat(weight).toFixed(0)}g`
  } else if (unit === "kg") {
    return `${Number.parseFloat(weight).toFixed(2)}kg`
  }
  return `${weight} ${unit}`
}

export default function ProductDetailPage() {
  const { id, slug } = useParams()
  const navigate = useNavigate()
  const [selectedVariant, setSelectedVariant] = useState(null)
  const addToRecentlyViewed = useProductStore((state) => state.addToRecentlyViewed)
  const { addItem } = useCartStore()

  // Determine if we're using a slug or ID
  const isSlug = !!slug
  const productIdentifier = isSlug ? slug : id

  // Fetch product data
  const {
    data: productData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", isSlug ? "slug" : "id", productIdentifier],
    queryFn: () => (isSlug ? getProductBySlug(productIdentifier) : getProduct(productIdentifier)),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  })

  const product = productData?.data

  // Sort variants by price (lowest first) if available
  if (product && product.variants && product.variants.length > 0) {
    // Create a sorted copy of the variants array
    product.variants = [...product.variants].sort((a, b) => {
      // Use sale_price if available, otherwise use regular price
      const priceA = a.sale_price || a.price
      const priceB = b.sale_price || b.price
      return priceA - priceB
    })
  }

  // Set the selected variant when product data is loaded
  useEffect(() => {
    if (product && product.variants && product.variants.length > 0) {
      // Find the variant with the lowest price
      const lowestPriceVariant = product.variants.reduce((lowest, current) => {
        // Use sale_price if available, otherwise use regular price
        const lowestPrice = lowest.sale_price || lowest.price
        const currentPrice = current.sale_price || current.price

        return currentPrice < lowestPrice ? current : lowest
      }, product.variants[0])

      setSelectedVariant(lowestPriceVariant)
    }
  }, [product])

  // Add to recently viewed when component mounts
  useEffect(() => {
    if (product) {
      addToRecentlyViewed(product)
    }
  }, [product, addToRecentlyViewed])

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  }

  const contentVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto py-16 px-4 min-h-[60vh] flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  // Error state
  if (error || !product) {
    return (
      <div className="container mx-auto py-16 px-4 min-h-[60vh]">
        <div className="text-center max-w-lg mx-auto">
          <h1 className="text-2xl font-cinzel text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">
            We couldn't find the product you're looking for. It may have been removed or the link might be incorrect.
          </p>
          <Button onClick={() => navigate("/products")} className="bg-gold hover:bg-gold-dark text-white">
            Browse Products
          </Button>
        </div>
      </div>
    )
  }

  // Generate structured data for SEO
  const structuredData = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image:
      product.images && product.images.length > 0
        ? product.images.map((img) => `http://localhost/ramesh-be/be/api/public/${img.image_path}`)
        : [],
    description: product.description || product.short_description,
    sku: selectedVariant?.sku || `RAMESH-${product.id}`,
    brand: {
      "@type": "Brand",
      name: "Ramesh Sweets",
    },
    offers: {
      "@type": "Offer",
      url: window.location.href,
      priceCurrency: "INR",
      price: selectedVariant ? selectedVariant.sale_price || selectedVariant.price : product.price,
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Ramesh Sweets",
      },
    },
  }

  // If we have reviews, add aggregateRating to structured data
  if (product.reviews && product.reviews.length > 0) {
    const totalRating = product.reviews.reduce((sum, review) => sum + review.rating, 0)
    const averageRating = totalRating / product.reviews.length

    structuredData.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: averageRating.toFixed(1),
      reviewCount: product.reviews.length,
    }
  }

  return (
    <motion.div
      className="bg-cream-light min-h-screen"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      {/* SEO Metadata */}
      <Helmet>
        <title>{product.name} | Ramesh Sweets</title>
        <meta
          name="description"
          content={
            product.short_description ||
            `Buy ${product.name} from Ramesh Sweets. Premium quality Indian sweets made with authentic recipes.`
          }
        />
        <meta property="og:title" content={`${product.name} | Ramesh Sweets`} />
        <meta
          property="og:description"
          content={
            product.short_description ||
            `Buy ${product.name} from Ramesh Sweets. Premium quality Indian sweets made with authentic recipes.`
          }
        />
        {product.images && product.images.length > 0 && (
          <meta
            property="og:image"
            content={`http://localhost/ramesh-be/be/api/public/${product.images[0].image_path}`}
          />
        )}
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="product" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        <link rel="canonical" href={`https://rameshsweets.com/product/${product.slug || product.id}`} />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb navigation */}
        <motion.nav className="flex items-center text-sm mb-6" variants={itemVariants}>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-600 hover:text-gold-dark flex items-center gap-1 mr-2"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Button>
          <a href="/" className="text-gray-600 hover:text-gold-dark">
            Home
          </a>
          <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
          <a href="/products" className="text-gray-600 hover:text-gold-dark">
            Products
          </a>
          {product.category && (
            <>
              <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
              <a href={`/category/${product.category.id}`} className="text-gray-600 hover:text-gold-dark">
                {product.category.name}
              </a>
            </>
          )}
          <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
          <span className="text-gold-dark font-medium truncate max-w-[200px]">{product.name}</span>
        </motion.nav>

        {/* Main product section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
          variants={contentVariants}
          initial="initial"
          animate="animate"
        >
          {/* Product gallery */}
          <motion.div variants={itemVariants}>
            <ProductGallery product={product} />
          </motion.div>

          {/* Product information */}
          <motion.div className="space-y-6" variants={itemVariants}>
            {/* Product title and tags - ONLY RENDERED HERE */}
            <div>
              <h1 className="font-cinzel text-3xl md:text-4xl text-gray-900 tracking-wide uppercase mb-4">
                {product.name}
              </h1>

              {/* Product Tags */}
              <div className="flex flex-wrap gap-3 items-center mb-6">
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

                {product.is_vegetarian === 1 && (
                  <div className="flex items-center gap-1.5 text-green-600">
                    <Leaf className="h-3.5 w-3.5" />
                    <span className="text-sm font-medium">Pure Vegetarian</span>
                  </div>
                )}

                {product.shelf_life && (
                  <div className="flex items-center gap-1.5 text-amber-600">
                    <Clock className="h-3.5 w-3.5" />
                    <span className="text-sm font-medium">{product.shelf_life}</span>
                  </div>
                )}

                {selectedVariant && selectedVariant.weight && (
                  <div className="flex items-center gap-1.5 text-amber-600">
                    <Package className="h-3.5 w-3.5" />
                    <span className="text-sm font-medium">
                      {formatWeight(selectedVariant.weight, selectedVariant.weight_unit)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Product info - WITHOUT title and tags */}
            <ProductInfo
              product={product}
              selectedVariant={selectedVariant}
              setSelectedVariant={setSelectedVariant}
              hideHeader={true} // Pass this prop to hide the header in the component
            />
          </motion.div>
        </motion.div>

        {/* Product tabs */}
        <motion.section className="mb-12" variants={itemVariants}>
          <ProductTabs product={product} />
        </motion.section>

        {/* Related products */}
        <motion.section variants={itemVariants}>
          <RelatedProducts categoryId={product.category?.id} currentProductId={product.id} />
        </motion.section>

        {/* Back to top button */}
        <motion.div className="flex justify-center mt-12" variants={itemVariants}>
          <Button
            variant="outline"
            className="border-gold/30 text-gold-dark hover:bg-gold/5"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Back to Top
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}
