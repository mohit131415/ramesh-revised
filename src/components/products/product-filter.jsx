"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, ChevronUp, X } from "lucide-react"
import useProductStore from "../../store/productStore"

// Add this function after the existing imports
const getSubcategoryName = (subcategoryId, categories) => {
  if (!subcategoryId || !categories || categories.length === 0) return null

  for (const category of categories) {
    if (category.subcategories) {
      const subcategory = category.subcategories.find(
        (sub) => sub.id === subcategoryId || sub.id === Number(subcategoryId),
      )
      if (subcategory) return subcategory.name
    }
  }
  return "Selected Subcategory"
}

const ProductFilter = () => {
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    dietary: true,
    ratings: true,
  })

  const { selectedCategory, setSelectedCategory, resetFilters, selectedSubcategory, setSelectedSubcategory } =
    useProductStore()

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  // Sample categories for UI demonstration
  const categories = [
    { id: 1, name: "Milk Sweets", count: 24 },
    { id: 2, name: "Dry Fruit Sweets", count: 18 },
    { id: 3, name: "Bengali Sweets", count: 12 },
    { id: 4, name: "Festive Specials", count: 15 },
    { id: 5, name: "Gift Boxes", count: 9 },
  ]

  // Sample price ranges for UI demonstration
  const priceRanges = [
    { id: 1, min: 0, max: 200, label: "Under ₹200" },
    { id: 2, min: 200, max: 500, label: "₹200 - ₹500" },
    { id: 3, min: 500, max: 1000, label: "₹500 - ₹1000" },
    { id: 4, min: 1000, max: 2000, label: "₹1000 - ₹2000" },
    { id: 5, min: 2000, max: null, label: "Above ₹2000" },
  ]

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-900">Filters</h2>
        <button onClick={resetFilters} className="text-sm text-[#d3ae6e] hover:text-[#b08c4d] flex items-center">
          <X size={14} className="mr-1" />
          Clear All
        </button>
      </div>

      {selectedSubcategory && (
        <div className="mb-6 bg-[#d3ae6e]/10 p-3 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-900">Selected Subcategory</h3>
            <button
              onClick={() => setSelectedSubcategory(null)}
              className="text-xs text-[#d3ae6e] hover:text-[#b08c4d] flex items-center"
            >
              <X size={14} className="mr-1" />
              Clear
            </button>
          </div>
          <div className="text-sm text-gray-700">Showing products from subcategory #{selectedSubcategory}</div>
        </div>
      )}

      {/* Categories */}
      <div className="mb-4 border-b border-gray-200 pb-4">
        <button
          onClick={() => toggleSection("categories")}
          className="flex justify-between items-center w-full text-left font-medium text-gray-900 mb-2"
        >
          <span>Categories</span>
          {expandedSections.categories ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        {expandedSections.categories && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-2 mt-2"
          >
            {categories.map((category) => (
              <div key={category.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`category-${category.id}`}
                  checked={selectedCategory === category.id}
                  onChange={() => {
                    if (selectedCategory === category.id) {
                      setSelectedCategory(null)
                    } else {
                      setSelectedCategory(category.id)
                    }
                  }}
                  className="h-4 w-4 rounded border-gray-300 text-[#d3ae6e] focus:ring-[#d3ae6e]"
                />
                <label htmlFor={`category-${category.id}`} className="ml-2 text-sm text-gray-700 flex-1">
                  {category.name}
                </label>
                <span className="text-xs text-gray-500">({category.count})</span>
              </div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Price Range */}
      <div className="mb-4 border-b border-gray-200 pb-4">
        <button
          onClick={() => toggleSection("price")}
          className="flex justify-between items-center w-full text-left font-medium text-gray-900 mb-2"
        >
          <span>Price Range</span>
          {expandedSections.price ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        {expandedSections.price && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-2 mt-2"
          >
            {priceRanges.map((range) => (
              <div key={range.id} className="flex items-center">
                <input
                  type="radio"
                  id={`price-${range.id}`}
                  name="price-range"
                  className="h-4 w-4 border-gray-300 text-[#d3ae6e] focus:ring-[#d3ae6e]"
                />
                <label htmlFor={`price-${range.id}`} className="ml-2 text-sm text-gray-700">
                  {range.label}
                </label>
              </div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Dietary Preferences */}
      <div className="mb-4 border-b border-gray-200 pb-4">
        <button
          onClick={() => toggleSection("dietary")}
          className="flex justify-between items-center w-full text-left font-medium text-gray-900 mb-2"
        >
          <span>Dietary Preferences</span>
          {expandedSections.dietary ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        {expandedSections.dietary && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-2 mt-2"
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                id="veg-only"
                className="h-4 w-4 rounded border-gray-300 text-[#d3ae6e] focus:ring-[#d3ae6e]"
              />
              <label htmlFor="veg-only" className="ml-2 text-sm text-gray-700">
                Vegetarian Only
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="eggless"
                className="h-4 w-4 rounded border-gray-300 text-[#d3ae6e] focus:ring-[#d3ae6e]"
              />
              <label htmlFor="eggless" className="ml-2 text-sm text-gray-700">
                Eggless
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="sugarfree"
                className="h-4 w-4 rounded border-gray-300 text-[#d3ae6e] focus:ring-[#d3ae6e]"
              />
              <label htmlFor="sugarfree" className="ml-2 text-sm text-gray-700">
                Sugar Free
              </label>
            </div>
          </motion.div>
        )}
      </div>

      {/* Ratings */}
      <div className="mb-4">
        <button
          onClick={() => toggleSection("ratings")}
          className="flex justify-between items-center w-full text-left font-medium text-gray-900 mb-2"
        >
          <span>Ratings</span>
          {expandedSections.ratings ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        {expandedSections.ratings && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-2 mt-2"
          >
            {[4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center">
                <input
                  type="radio"
                  id={`rating-${rating}`}
                  name="rating"
                  className="h-4 w-4 border-gray-300 text-[#d3ae6e] focus:ring-[#d3ae6e]"
                />
                <label htmlFor={`rating-${rating}`} className="ml-2 text-sm text-gray-700 flex items-center">
                  <div className="flex mr-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < rating ? "text-amber-400" : "text-gray-300"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  & Up
                </label>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default ProductFilter
