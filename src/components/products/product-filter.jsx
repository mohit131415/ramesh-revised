"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronDown, ChevronUp, X, Percent } from "lucide-react"
import useProductStore from "../../store/productStore"
import { useCategories, useSubcategories, useSubcategoriesByCategory } from "../../hooks/useCategories"
import { Slider } from "@/components/ui/slider"

const ProductFilter = () => {
  // Remove the dietary and ratings sections from the expandedSections state
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    subcategories: true,
    price: true,
    discount: true,
  })

  const {
    selectedCategory,
    setSelectedCategory,
    selectedSubcategory,
    setSelectedSubcategory,
    priceRange,
    setPriceRange,
    minDiscount,
    setMinDiscount,
    showAllCategories,
    showAllSubcategories,
    toggleShowAllCategories,
    toggleShowAllSubcategories,
    resetFilters,
  } = useProductStore()

  // Fetch categories and subcategories
  const { data: categoriesData, isLoading: isLoadingCategories } = useCategories()
  const { data: allSubcategoriesData, isLoading: isLoadingAllSubcategories } = useSubcategories()
  const { data: categorySubcategoriesData, isLoading: isLoadingCategorySubcategories } =
    useSubcategoriesByCategory(selectedCategory)

  // Local state for price range slider
  const [localPriceRange, setLocalPriceRange] = useState([priceRange.min, priceRange.max])
  // Remove this line
  // const [subcategorySearch, setSubcategorySearch] = useState("")

  // Update local price range when store changes
  useEffect(() => {
    setLocalPriceRange([priceRange.min, priceRange.max])
  }, [priceRange])

  // Handle price range change
  const handlePriceRangeChange = (values) => {
    setLocalPriceRange(values)
  }

  // Apply price range to store when slider is released
  const handlePriceRangeCommit = (values) => {
    setPriceRange({ min: values[0], max: values[1] })
  }

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  // Extract categories from API response
  const categories = categoriesData?.data || []

  // Determine which subcategories to show based on category selection
  const allSubcategories = allSubcategoriesData?.data || []
  const categorySubcategories = categorySubcategoriesData?.data?.subcategories || []

  // If a category is selected, show only subcategories for that category
  // Otherwise show all subcategories
  const subcategories = selectedCategory ? categorySubcategories : allSubcategories
  const displayedSubcategories = showAllSubcategories ? subcategories : subcategories.slice(0, 5)

  // Limit displayed items unless "show all" is toggled
  const displayedCategories = showAllCategories ? categories : categories.slice(0, 5)

  // Format price for display
  const formatPrice = (price) => {
    return `₹${price.toLocaleString()}`
  }

  // Replace the entire component return statement with this improved version
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg font-medium text-gray-900">Filters</h2>
        <button
          onClick={resetFilters}
          className="text-sm text-[#d3ae6e] hover:text-[#b08c4d] flex items-center transition-colors"
        >
          <X size={14} className="mr-1" />
          Clear All
        </button>
      </div>

      {/* Categories */}
      <div className="mb-5 border-b border-gray-200 pb-5">
        <button
          onClick={() => toggleSection("categories")}
          className="flex justify-between items-center w-full text-left font-medium text-gray-900 mb-3"
        >
          <span className="text-base">Categories</span>
          {expandedSections.categories ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        {expandedSections.categories && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-2.5 mt-2"
          >
            {isLoadingCategories ? (
              // Loading skeleton
              Array(3)
                .fill(0)
                .map((_, index) => (
                  <div key={index} className="flex items-center animate-pulse">
                    <div className="h-4 w-4 bg-gray-200 rounded mr-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                ))
            ) : categories.length === 0 ? (
              <p className="text-sm text-gray-500 italic">No categories available</p>
            ) : (
              <>
                {displayedCategories.map((category) => (
                  <div key={category.id} className="flex items-center group">
                    <input
                      type="checkbox"
                      id={`category-${category.id}`}
                      checked={selectedCategory === category.id}
                      onChange={() => {
                        if (selectedCategory === category.id) {
                          setSelectedCategory(null)
                        } else {
                          setSelectedCategory(category.id)
                          setSelectedSubcategory(null) // Reset subcategory when category changes
                        }
                      }}
                      className="h-4 w-4 rounded border-gray-300 text-[#d3ae6e] focus:ring-[#d3ae6e]"
                    />
                    <label
                      htmlFor={`category-${category.id}`}
                      className="ml-2 text-sm text-gray-700 flex-1 cursor-pointer group-hover:text-[#d3ae6e] transition-colors"
                    >
                      {category.name}
                    </label>
                    <span className="text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded-full">
                      {category.product_count || ""}
                    </span>
                  </div>
                ))}

                {/* Show more/less button */}
                {categories.length > 5 && (
                  <button
                    onClick={toggleShowAllCategories}
                    className="text-sm text-[#d3ae6e] hover:text-[#b08c4d] mt-3 flex items-center transition-colors"
                  >
                    {showAllCategories ? (
                      <>
                        Show Less <ChevronUp size={14} className="ml-1" />
                      </>
                    ) : (
                      <>
                        Show More <ChevronDown size={14} className="ml-1" />
                      </>
                    )}
                  </button>
                )}
              </>
            )}
          </motion.div>
        )}
      </div>

      {/* Subcategories */}
      <div className="mb-5 border-b border-gray-200 pb-5">
        <button
          onClick={() => toggleSection("subcategories")}
          className="flex justify-between items-center w-full text-left font-medium text-gray-900 mb-3"
        >
          <span className="text-base">Subcategories</span>
          {expandedSections.subcategories ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        {expandedSections.subcategories && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-2.5 mt-2"
          >
            {isLoadingAllSubcategories || isLoadingCategorySubcategories ? (
              // Loading skeleton
              Array(3)
                .fill(0)
                .map((_, index) => (
                  <div key={index} className="flex items-center animate-pulse">
                    <div className="h-4 w-4 bg-gray-200 rounded mr-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                ))
            ) : subcategories.length === 0 ? (
              <p className="text-sm text-gray-500 italic">
                {selectedCategory ? "No subcategories found for this category" : "No subcategories available"}
              </p>
            ) : (
              <>
                {displayedSubcategories.map((subcategory) => (
                  <div key={subcategory.id} className="flex items-center group">
                    <input
                      type="checkbox"
                      id={`subcategory-${subcategory.id}`}
                      checked={selectedSubcategory === subcategory.id}
                      onChange={() => {
                        if (selectedSubcategory === subcategory.id) {
                          setSelectedSubcategory(null)
                        } else {
                          setSelectedSubcategory(subcategory.id)
                          // Don't update the category when selecting a subcategory
                        }
                      }}
                      className="h-4 w-4 rounded border-gray-300 text-[#d3ae6e] focus:ring-[#d3ae6e]"
                    />
                    <label
                      htmlFor={`subcategory-${subcategory.id}`}
                      className="ml-2 text-sm text-gray-700 flex-1 cursor-pointer group-hover:text-[#d3ae6e] transition-colors"
                    >
                      {subcategory.name}
                      {!selectedCategory && subcategory.category_name && (
                        <span className="ml-1 text-xs text-gray-500">({subcategory.category_name})</span>
                      )}
                    </label>
                    <span className="text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded-full">
                      {subcategory.product_count || ""}
                    </span>
                  </div>
                ))}

                {/* Show more/less button */}
                {subcategories.length > 5 && (
                  <button
                    onClick={toggleShowAllSubcategories}
                    className="text-sm text-[#d3ae6e] hover:text-[#b08c4d] mt-3 flex items-center transition-colors"
                  >
                    {showAllSubcategories ? (
                      <>
                        Show Less <ChevronUp size={14} className="ml-1" />
                      </>
                    ) : (
                      <>
                        Show More <ChevronDown size={14} className="ml-1" />
                      </>
                    )}
                  </button>
                )}
              </>
            )}
          </motion.div>
        )}
      </div>

      {/* Price Range */}
      <div className="mb-5 border-b border-gray-200 pb-5">
        <button
          onClick={() => toggleSection("price")}
          className="flex justify-between items-center w-full text-left font-medium text-gray-900 mb-3"
        >
          <span className="text-base">Price Range</span>
          {expandedSections.price ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        {expandedSections.price && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4 mt-4 px-2"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">{formatPrice(localPriceRange[0])}</span>
              <span className="text-sm font-medium text-gray-700">{formatPrice(localPriceRange[1])}</span>
            </div>

            <Slider
              defaultValue={[priceRange.min, priceRange.max]}
              value={localPriceRange}
              min={0}
              max={10000}
              step={100}
              onValueChange={handlePriceRangeChange}
              onValueCommit={handlePriceRangeCommit}
              className="[&_[role=slider]]:h-5 [&_[role=slider]]:w-5 [&_[role=slider]]:bg-[#d3ae6e] [&_[role=slider]]:border-2 [&_[role=slider]]:border-white [&_[role=slider]]:shadow-md"
            />

            {/* Predefined price ranges */}
            <div className="grid grid-cols-2 gap-2 mt-4">
              {[
                { label: "Under ₹500", min: 0, max: 500 },
                { label: "₹500 - ₹1000", min: 500, max: 1000 },
                { label: "₹1000 - ₹2000", min: 1000, max: 2000 },
                { label: "Above ₹2000", min: 2000, max: 10000 },
              ].map((range, index) => (
                <button
                  key={index}
                  onClick={() => setPriceRange({ min: range.min, max: range.max })}
                  className={`text-xs py-1.5 px-3 rounded-full border transition-all ${
                    priceRange.min === range.min && priceRange.max === range.max
                      ? "bg-[#d3ae6e]/10 border-[#d3ae6e] text-[#d3ae6e] font-medium"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Discount */}
      <div className="mb-4">
        <button
          onClick={() => toggleSection("discount")}
          className="flex justify-between items-center w-full text-left font-medium text-gray-900 mb-3"
        >
          <span className="text-base">Discount</span>
          {expandedSections.discount ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        {expandedSections.discount && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-3 mt-2"
          >
            {[0, 5, 10, 15, 20, 25].map((discount) => (
              <div key={discount} className="flex items-center group">
                <input
                  type="radio"
                  id={`discount-${discount}`}
                  name="discount"
                  checked={minDiscount === discount}
                  onChange={() => setMinDiscount(discount)}
                  className="h-4 w-4 border-gray-300 text-[#d3ae6e] focus:ring-[#d3ae6e]"
                />
                <label
                  htmlFor={`discount-${discount}`}
                  className="ml-2 text-sm text-gray-700 flex items-center cursor-pointer group-hover:text-[#d3ae6e] transition-colors"
                >
                  {discount === 0 ? (
                    "All Products"
                  ) : (
                    <>
                      <span className="flex items-center justify-center bg-[#d3ae6e] text-white rounded-full h-5 w-5 mr-1.5 text-xs">
                        <Percent size={10} />
                      </span>
                      {discount}% or more
                    </>
                  )}
                </label>
              </div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Active Filters Summary */}
      {(selectedCategory || selectedSubcategory || priceRange.min > 0 || priceRange.max < 10000 || minDiscount > 0) && (
        <div className="mt-6 pt-5 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Active Filters:</h3>
          <div className="flex flex-wrap gap-2">
            {selectedCategory && categories.find((c) => c.id === selectedCategory) && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#d3ae6e]/10 text-[#d3ae6e]">
                {categories.find((c) => c.id === selectedCategory).name}
                <button onClick={() => setSelectedCategory(null)} className="ml-1.5 hover:text-[#b08c4d]">
                  <X size={12} />
                </button>
              </span>
            )}

            {selectedSubcategory && subcategories.find((s) => s.id === selectedSubcategory) && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#d3ae6e]/10 text-[#d3ae6e]">
                {subcategories.find((s) => s.id === selectedSubcategory).name}
                <button onClick={() => setSelectedSubcategory(null)} className="ml-1.5 hover:text-[#b08c4d]">
                  <X size={12} />
                </button>
              </span>
            )}

            {(priceRange.min > 0 || priceRange.max < 10000) && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#d3ae6e]/10 text-[#d3ae6e]">
                {formatPrice(priceRange.min)} - {formatPrice(priceRange.max)}
                <button onClick={() => setPriceRange({ min: 0, max: 10000 })} className="ml-1.5 hover:text-[#b08c4d]">
                  <X size={12} />
                </button>
              </span>
            )}

            {minDiscount > 0 && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#d3ae6e]/10 text-[#d3ae6e]">
                {minDiscount}% or more off
                <button onClick={() => setMinDiscount(0)} className="ml-1.5 hover:text-[#b08c4d]">
                  <X size={12} />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductFilter
