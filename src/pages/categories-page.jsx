"use client"

import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { getFeaturedCategories } from "../data/categories"
import { HeritageHeaderDecoration, HeritageCorners } from "../components/ui/heritage-decorations"
import { UniversalButton } from "../components/ui/universal-button"
import { useCategories } from "../hooks/useCategories"
import useCategoryStore from "../store/categoryStore"
import { useState } from "react"
import CategoryCard from "../components/category/category-card"

export default function CategoriesPage() {
  const { currentPage, setCurrentPage, setSearchQuery } = useCategoryStore()

  // Fetch categories from API
  const [searchTerm, setSearchTerm] = useState("")
  const { data, isLoading, isError, error, refetch } = useCategories({
    page: currentPage,
    limit: 20,
    search: searchTerm,
  })

  // Get categories from the API response
  const categories = data?.data || []
  const metadata = data?.meta || { current_page: 1, per_page: 20, total: 0, total_pages: 1 }

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault()
    setSearchQuery(searchTerm)
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  // Sweet images from public directory - using the actual filenames from the directory
  const sweetImages = [
    "/sweets_images/Basundi.webp",
    "/sweets_images/bhugal double daker.jpg",
    "/sweets_images/bhugi mawa.jpg",
    "/sweets_images/black current katli.jpg",
    "/sweets_images/bundhi laddo.jpg",
    "/sweets_images/ch. bites.jpg",
    "/sweets_images/coconut barfi.jpg",
    "/sweets_images/desi ghe bondi laddo.jpg",
    "/sweets_images/gulab_jamun.jpg",
    "/sweets_images/JILEBI.webp",
    "/sweets_images/kajukatli.webp",
    "/sweets_images/kesar peda.jpg",
    "/sweets_images/khoya.jpg",
    "/sweets_images/malai peda.jpg",
    "/sweets_images/MangoMilkBarfi.webp",
    "/sweets_images/methi laddo.jpg",
    "/sweets_images/milk mysore.jpg",
    "/sweets_images/MILKCAKE.webp",
    "/sweets_images/MODAK.webp",
    "/sweets_images/mohan thall.jpg",
    "/sweets_images/MoongdalHalwa.webp",
    "/sweets_images/Motichoor_Laddoo.webp",
    "/sweets_images/orange bite.jpg",
    "/sweets_images/petha.jpg",
  ]

  return (
    <div className="min-h-screen bg-pink-50/30">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-pink-50 to-white">
        <div className="absolute inset-0 bg-[url('/images/pattern-light.png')] opacity-10"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="relative inline-block mb-6">
              <HeritageHeaderDecoration className="absolute -top-4 left-1/2 -translate-x-1/2 text-gold" />
              <h1 className="text-4xl md:text-5xl font-cinzel font-bold text-gray-900">Sweet Categories</h1>
            </div>

            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              Explore our extensive collection of authentic Indian sweets, carefully categorized to help you find your
              favorites or discover new delights.
            </p>

            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent mx-auto"></div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-12 relative">
            <h2 className="text-2xl md:text-3xl font-cinzel font-semibold text-center text-gray-900 mb-3">
              Featured Categories
            </h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold/70 to-transparent mx-auto"></div>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {getFeaturedCategories(4).map((category, index) => (
              <motion.div key={category.id} variants={itemVariants} className="group">
                <Link
                  to={`/products?category=${category.id}`}
                  className="block relative overflow-hidden rounded-lg shadow-md transition-all duration-300 group-hover:shadow-xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent z-10"></div>
                  <div className="absolute inset-0 bg-pink-200/0 group-hover:bg-pink-200/10 transition-all duration-300 z-10"></div>

                  <img
                    src={sweetImages[index * 2] || "/placeholder.svg"}
                    alt={category.name}
                    className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    <h3 className="text-xl font-cinzel font-semibold text-white mb-2">{category.name}</h3>
                    <p className="text-white/90 mb-4 line-clamp-2">{category.description}</p>
                    <div className="flex items-center text-white">
                      <span className="text-sm font-medium">Explore {category.count} products</span>
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* All Categories */}
      <section className="py-16 bg-pink-50/50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-24 h-24 text-gold/20 transform -translate-x-1/2 -translate-y-1/2">
          <svg viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 0 L100 50 L50 100 L0 50 Z" />
          </svg>
        </div>

        <div className="absolute bottom-0 right-0 w-32 h-32 text-gold/20 transform translate-x-1/2 translate-y-1/2">
          <svg viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 0 L100 50 L50 100 L0 50 Z" />
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-cinzel font-semibold text-center text-gray-900 mb-3">
              All Categories
            </h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold/70 to-transparent mx-auto mb-6"></div>
            <p className="text-center text-gray-700 max-w-2xl mx-auto">
              Browse through our complete collection of authentic Indian sweets, organized by type and tradition.
            </p>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="w-12 h-12 border-4 border-gold/30 border-t-gold rounded-full animate-spin mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading categories...</p>
            </div>
          ) : isError ? (
            <div className="text-center py-12 bg-red-50 rounded-lg border border-red-200">
              <p className="text-red-600">Error loading categories: {error?.message || "Unknown error"}</p>
              <button
                onClick={() => refetch()}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : categories.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No categories found. Please try a different search term.</p>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {categories.map((category, index) => (
                <motion.div key={category.id} variants={itemVariants}>
                  <CategoryCard category={category} index={index} sweetImages={sweetImages} />
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Pagination */}
          {metadata.total_pages > 1 && (
            <div className="flex justify-center mt-10">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, metadata.current_page - 1))}
                  disabled={metadata.current_page === 1}
                  className={`px-3 py-1 rounded border ${
                    metadata.current_page === 1
                      ? "border-gray-200 text-gray-400 cursor-not-allowed"
                      : "border-gold/30 text-gold hover:bg-gold/10"
                  }`}
                >
                  Previous
                </button>

                {Array.from({ length: metadata.total_pages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded-full ${
                      metadata.current_page === page
                        ? "bg-gold text-white"
                        : "bg-white text-gray-700 border border-gold/30 hover:bg-gold/10"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage(Math.min(metadata.total_pages, metadata.current_page + 1))}
                  disabled={metadata.current_page === metadata.total_pages}
                  className={`px-3 py-1 rounded border ${
                    metadata.current_page === metadata.total_pages
                      ? "border-gray-200 text-gray-400 cursor-not-allowed"
                      : "border-gold/30 text-gold hover:bg-gold/10"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-pink-50 to-pink-100/50 rounded-lg p-8 md:p-12 relative overflow-hidden border border-gold/20">
            <div className="absolute inset-0 bg-[url('/images/pattern-light.png')] opacity-10"></div>
            <HeritageCorners className="absolute inset-0 text-gold/30" />

            <div className="relative z-10 text-center">
              <h2 className="text-2xl md:text-3xl font-cinzel font-semibold text-gray-900 mb-4">
                Can't Decide? Try Our Assorted Gift Box
              </h2>
              <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
                Experience a variety of our finest sweets with our carefully curated assortment boxes. Perfect for
                gifting or treating yourself to a sampling of authentic flavors.
              </p>

              <Link to="/products?category=gifting">
                <UniversalButton
                  variant="primary"
                  size="lg"
                  icon={<ArrowRight className="h-4 w-4" />}
                  iconPosition="right"
                >
                  Explore Gift Boxes
                </UniversalButton>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
