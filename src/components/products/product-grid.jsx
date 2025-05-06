"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { useProducts } from "../../hooks/useProducts"
import useProductStore from "../../store/productStore"
import ProductCard from "./product-card"
import ProductSkeleton from "./product-skeleton"
import ProductPagination from "./product-pagination"
import { AlertTriangle, PackageOpen } from "lucide-react"

const ProductGrid = () => {
  const { searchQuery, currentPage, itemsPerPage, selectedCategory, setTotalItems, setTotalPages } = useProductStore()

  // Call the API hook with current filters
  const { data, isLoading, isError } = useProducts({
    page: currentPage,
    limit: itemsPerPage,
    search: searchQuery,
    category: selectedCategory,
  })

  useEffect(() => {
    // Update store with pagination data when available
    if (data?.totalItems) {
      setTotalItems(data.totalItems)
      setTotalPages(Math.ceil(data.totalItems / itemsPerPage))
    }
  }, [data, itemsPerPage, setTotalItems, setTotalPages])

  // Extract products from the API response
  const extractProducts = () => {
    if (!data) return []

    // Handle various API response structures
    if (Array.isArray(data)) return data
    if (data.data?.products) return data.data.products
    if (data.products) return data.products
    if (data.data && Array.isArray(data.data)) return data.data
    if (data.items) return data.items
    if (data.results) return data.results

    // If we can't determine the structure, log it and return empty array
    console.error("Unknown API response structure:", data)
    return []
  }

  const products = extractProducts()

  // Loading state
  if (isLoading) {
    return (
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>
      </div>
    )
  }

  // Error state
  if (isError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <div className="flex justify-center mb-4">
          <AlertTriangle className="h-12 w-12 text-red-500" />
        </div>
        <h3 className="text-lg font-medium text-red-800 mb-2">Error Loading Products</h3>
        <p className="text-red-600 mb-4">
          {isError.message || "There was a problem loading the products. Please try again later."}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
        >
          Retry
        </button>
      </div>
    )
  }

  // Empty state
  if (products.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
        <div className="flex justify-center mb-4">
          <PackageOpen className="h-16 w-16 text-gray-400" />
        </div>
        <h3 className="text-xl font-medium text-gray-800 mb-2">No Products Found</h3>
        <p className="text-gray-600 mb-6">
          {searchQuery
            ? `We couldn't find any products matching "${searchQuery}".`
            : "We couldn't find any products matching your criteria."}
        </p>
        <button
          onClick={() => useProductStore.getState().resetFilters()}
          className="bg-[#d3ae6e] hover:bg-[#c19c5d] text-white font-medium py-2 px-6 rounded-md transition-colors"
        >
          Clear Filters
        </button>
      </div>
    )
  }

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div>
      {/* Results count and total */}
      <div className="mb-6 text-sm text-gray-500">
        Showing <span className="font-medium text-gray-900">{products.length}</span> of{" "}
        <span className="font-medium text-gray-900">{data?.totalItems || products.length}</span> products
      </div>

      {/* Product grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
      >
        {products.map((product, index) => (
          <motion.div key={product.id || index} variants={item} transition={{ duration: 0.3 }}>
            <ProductCard product={product} />
          </motion.div>
        ))}
      </motion.div>

      {/* Pagination */}
      {data?.totalPages > 1 && <ProductPagination currentPage={currentPage} totalPages={data.totalPages} />}
    </div>
  )
}

export default ProductGrid
