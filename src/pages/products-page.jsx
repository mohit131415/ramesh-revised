"use client"

import { useState, useEffect, useRef } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Helmet } from "react-helmet"
import { Filter, Search, AlertTriangle, PackageOpen } from "lucide-react"
import useProductStore from "../store/productStore"
import { useProducts, useProductsByPriceRange } from "../hooks/useProducts"
import ProductFilter from "../components/products/product-filter"
import ProductCard from "../components/products/product-card"
import { motion } from "framer-motion"

const ProductsPage = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [isPriceFilterActive, setIsPriceFilterActive] = useState(false)
  const [prevPriceRange, setPrevPriceRange] = useState({ min: 0, max: 10000 })
  const [initialPriceRange, setInitialPriceRange] = useState(null)
  const [prevProductCount, setPrevProductCount] = useState(0)
  const location = useLocation()
  const navigate = useNavigate()
  const productsRef = useRef(null)
  const firstProductRef = useRef(null)

  const searchTimeout = useRef(null)

  const {
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    selectedCategory,
    setSelectedCategory,
    selectedSubcategory,
    priceRange,
    setPriceRange,
    resetFilters,
    totalPages,
    setTotalPages,
    totalItems,
    setTotalItems,
  } = useProductStore()

  // Sync URL with store state on initial load
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const queryFromUrl = params.get("q") || ""
    const pageFromUrl = Number.parseInt(params.get("page") || "1", 10)
    const categoryFromUrl = params.get("category") || null

    if (queryFromUrl) setSearchQuery(queryFromUrl)
    if (pageFromUrl) setCurrentPage(pageFromUrl)
    if (categoryFromUrl) setSelectedCategory(Number.parseInt(categoryFromUrl, 10))

    setSearchTerm(queryFromUrl)
  }, [])

  // Update URL when store state changes
  useEffect(() => {
    const params = new URLSearchParams()

    // Only add search query if it's not empty and not "0"
    if (searchQuery && searchQuery.trim() && searchQuery.trim() !== "0") {
      params.set("q", searchQuery)
    }

    if (currentPage > 1) params.set("page", currentPage.toString())
    if (selectedCategory) params.set("category", selectedCategory.toString())

    navigate(
      {
        pathname: location.pathname,
        search: params.toString() ? `?${params.toString()}` : "",
      },
      { replace: true },
    )
  }, [searchQuery, currentPage, selectedCategory, navigate, location.pathname])

  // Store the initial price range when it's first loaded
  useEffect(() => {
    if (initialPriceRange === null && priceRange.min !== 0 && priceRange.max !== 10000) {
      setInitialPriceRange({ ...priceRange })
      setPrevPriceRange({ ...priceRange })
    }
  }, [priceRange, initialPriceRange])

  // Only activate price filter when user explicitly changes it from the initial values
  useEffect(() => {
    // Skip if we don't have initial values yet
    if (!initialPriceRange) return

    // Check if price range has actually changed from previous value
    if (priceRange.min !== prevPriceRange.min || priceRange.max !== prevPriceRange.max) {
      // Only consider it active if user has explicitly changed it from the initial range
      const isExplicitlyChanged = priceRange.min !== initialPriceRange.min || priceRange.max !== initialPriceRange.max

      setIsPriceFilterActive(isExplicitlyChanged)
      setPrevPriceRange({ ...priceRange })
    }
  }, [priceRange, initialPriceRange])

  // Only fetch data from the price range API when price filtering is active
  const {
    data: priceRangeData,
    isLoading: isPriceRangeLoading,
    isError: isPriceRangeError,
  } = useProductsByPriceRange(
    priceRange.min,
    priceRange.max,
    currentPage,
    12,
    isPriceFilterActive, // Only run this query when price filtering is active
  )

  // Only fetch data from the regular products API when price filtering is NOT active
  const {
    data: regularProductsData,
    isLoading: isRegularProductsLoading,
    isError: isRegularProductsError,
  } = useProducts(
    !isPriceFilterActive, // Only run this query when price filtering is NOT active
  )

  // Use the appropriate data source based on which API was called
  const productsData = isPriceFilterActive ? priceRangeData : regularProductsData
  const isLoading = isPriceFilterActive ? isPriceRangeLoading : isRegularProductsLoading
  const isError = isPriceFilterActive ? isPriceRangeError : isRegularProductsError

  // Extract products from the API response
  const extractProducts = () => {
    if (!productsData) return []

    // Handle price range API response structure
    if (isPriceFilterActive && productsData.status === "success" && productsData.data?.products) {
      return productsData.data.products
    }

    // Handle various API response structures for other endpoints
    if (Array.isArray(productsData)) return productsData
    if (productsData.data?.products) return productsData.data.products
    if (productsData.products) return productsData.products
    if (productsData.data && Array.isArray(productsData.data)) return productsData.data
    if (productsData.items) return productsData.items
    if (productsData.results) return productsData.results

    // If we can't determine the structure, log it and return empty array
    console.error("Unknown API response structure:", productsData)
    return []
  }

  // Update pagination data when productsData changes
  useEffect(() => {
    if (isPriceFilterActive && productsData?.status === "success") {
      const { total_pages, total } = productsData.data
      // Update store with pagination data if available
      if (total_pages !== undefined) {
        setTotalPages(total_pages)
        setTotalItems(total || 0)
      }
    }
  }, [productsData, isPriceFilterActive, setTotalPages, setTotalItems])

  const products = extractProducts()

  // Scroll to first product when filters are applied and products are less than 9
  useEffect(() => {
    // Only scroll on page changes
    if (currentPage > 1) {
      window.scrollTo({ top: 0, behavior: "auto" })
      return
    }

    // Skip if loading or error
    if (isLoading || isError) return

    // Check if product count has changed (filter applied)
    const hasProductCountChanged = prevProductCount !== products.length
    setPrevProductCount(products.length)

    // If filters applied (product count changed) and less than 9 products
    if (hasProductCountChanged && products.length > 0 && products.length < 9) {
      // Small delay to ensure DOM is updated
      setTimeout(() => {
        if (productsRef.current) {
          productsRef.current.scrollIntoView({ behavior: "auto", block: "start" })
        }
      }, 100)
    }
  }, [products.length, isLoading, isError, currentPage, prevProductCount])

  const handleClearSearch = () => {
    setSearchTerm("")
    setSearchQuery("")
    setCurrentPage(1)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    // Scrolling handled by the useEffect
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff8f3] to-white">
      <Helmet>
        <title>Our Collection | Ramesh Sweets</title>
        <meta
          name="description"
          content="Discover our exquisite collection of traditional Indian sweets and delicacies."
        />
      </Helmet>

      {/* Hero Search Section */}
      <div className="bg-[#d3ae6e]/10 relative overflow-hidden py-10">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-[#d3ae6e]/30 blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-[#d3ae6e]/30 blur-xl"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full bg-[#d3ae6e]/20 blur-lg"></div>
          <div className="absolute bottom-1/3 left-2/3 w-20 h-20 rounded-full bg-[#d3ae6e]/20 blur-lg"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-center mb-6"
          >
            <h2 className="text-2xl md:text-3xl font-serif text-gray-800 mb-2 tracking-wide">
              Discover Our <span className="text-[#c19c5d] italic">Exquisite</span> Collection
            </h2>
            <p className="text-gray-600 font-light md:text-sm">Handcrafted sweets made with tradition and love</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#d3ae6e]/20 to-[#d3ae6e]/10 rounded-full blur-md transform -translate-y-1 scale-[0.99]"></div>
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    const value = e.target.value
                    setSearchTerm(value)

                    // Clear search if input is empty
                    if (value === "") {
                      handleClearSearch()
                      return
                    }

                    // Debounce search as user types
                    clearTimeout(searchTimeout.current)
                    searchTimeout.current = setTimeout(() => {
                      // Validate search term before setting
                      const trimmedValue = value.trim()

                      // Special case for "0" - silently do nothing
                      if (trimmedValue === "0") {
                        return
                      }

                      if (trimmedValue) {
                        setSearchQuery(trimmedValue)
                        setCurrentPage(1)
                      }
                    }, 500)
                  }}
                  placeholder="Search for sweets, gift boxes, and more..."
                  className="w-full py-3 pl-12 pr-12 rounded-full border border-[#d3ae6e]/40 focus:outline-none focus:ring-2 focus:ring-[#d3ae6e]/60 focus:border-transparent shadow-[0_2px_10px_rgba(211,174,110,0.15)] bg-white/95 backdrop-blur-sm text-gray-800 font-serif transition-all duration-300 hover:shadow-[0_4px_12px_rgba(211,174,110,0.2)]"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#d3ae6e]" size={18} />

                {searchTerm && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 transition-colors duration-200"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Mobile Filters Toggle */}
        <div className="flex justify-between items-center mb-6 md:hidden">
          <h1 className="text-2xl font-medium text-gray-900">Our Collection</h1>
          <button
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="flex items-center gap-2 bg-white px-4 py-2 rounded-md border border-gray-200 shadow-sm"
          >
            <Filter size={18} className="text-[#d3ae6e]" />
            <span>{mobileFiltersOpen ? "Hide Filters" : "Show Filters"}</span>
          </button>
        </div>

        {/* Desktop Title (Hidden on Mobile) */}
        <div className="hidden md:flex justify-between items-center mb-6">
          <h1 className="text-3xl font-medium text-gray-900">Our Collection</h1>
          <div className="flex items-center gap-4">
            {searchQuery && (
              <div className="flex items-center gap-2 bg-[#d3ae6e]/10 px-4 py-2 rounded-full">
                <span className="text-gray-700 font-serif">
                  Search results for: <span className="font-medium">{searchQuery}</span>
                </span>
                <button onClick={resetFilters} className="text-[#d3ae6e] hover:text-[#b08c4d]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters - Left Side */}
          <div
            className={`${mobileFiltersOpen ? "block" : "hidden"} md:block md:w-1/4 lg:w-1/5 sticky top-4 self-start`}
          >
            <ProductFilter />
          </div>

          {/* Products - Right Side */}
          <div ref={productsRef} className="w-full md:w-3/4 lg:w-4/5">
            {/* Loading state */}
            {isLoading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md p-4 h-80">
                    <div className="animate-pulse flex flex-col h-full">
                      <div className="rounded-md bg-gray-200 h-40 w-full mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                      <div className="h-8 bg-gray-200 rounded w-full mt-auto"></div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Error state */}
            {isError && (
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
            )}

            {/* Empty state */}
            {!isLoading && !isError && products.length === 0 && (
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
                  onClick={resetFilters}
                  className="bg-[#d3ae6e] hover:bg-[#c19c5d] text-white font-medium py-2 px-6 rounded-md transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {/* Product Grid - Exactly 3 per row */}
            {!isLoading && !isError && products.length > 0 && (
              <>
                {/* Results count */}
                <div className="mb-6 text-sm text-gray-500">
                  Showing <span className="font-medium text-gray-900">{products.length}</span> of{" "}
                  <span className="font-medium text-gray-900">{totalItems || products.length}</span> products
                </div>

                {/* Products grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {products.map((product, index) => (
                    <div key={product.id} ref={index === 0 ? firstProductRef : null}>
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Pagination */}
            {!isLoading && !isError && products.length > 0 && totalPages > 1 && (
              <div className="mt-12 flex justify-center">
                <nav className="flex items-center gap-1">
                  <button
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={`w-10 h-10 flex items-center justify-center rounded-md border ${
                      currentPage === 1
                        ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "border-gray-300 bg-white text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>

                  {/* Generate page buttons */}
                  {Array.from({ length: Math.min(5, totalPages) }).map((_, index) => {
                    // Logic to show pages around current page
                    let pageNum
                    if (totalPages <= 5) {
                      pageNum = index + 1
                    } else if (currentPage <= 3) {
                      pageNum = index + 1
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + index
                    } else {
                      pageNum = currentPage - 2 + index
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`w-10 h-10 flex items-center justify-center rounded-md border ${
                          currentPage === pageNum
                            ? "border-[#d3ae6e] bg-[#d3ae6e]/10 text-[#d3ae6e] font-medium"
                            : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {pageNum}
                      </button>
                    )
                  })}

                  {/* Show ellipsis if there are more pages */}
                  {totalPages > 5 && currentPage < totalPages - 2 && (
                    <span className="w-10 h-10 flex items-center justify-center text-gray-500">...</span>
                  )}

                  {/* Show last page if not visible in the current set */}
                  {totalPages > 5 && currentPage < totalPages - 2 && (
                    <button
                      onClick={() => handlePageChange(totalPages)}
                      className="w-10 h-10 flex items-center justify-center rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                    >
                      {totalPages}
                    </button>
                  )}

                  <button
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className={`w-10 h-10 flex items-center justify-center rounded-md border ${
                      currentPage === totalPages
                        ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "border-gray-300 bg-white text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductsPage
