"use client"
import { ChevronDown } from "lucide-react"
import useProductStore from "../../store/productStore"

const ProductSortDropdown = ({ className = "" }) => {
  const { sortOption, setSortOption } = useProductStore()

  // Default sort options if API doesn't provide them
  const defaultSortOptions = [
    { value: "popular", label: "Popular" },
    { value: "name_asc", label: "Name: A to Z" },
    { value: "name_desc", label: "Name: Z to A" },
    { value: "price_low", label: "Price: Low to High" },
    { value: "price_high", label: "Price: High to Low" },
    { value: "discount_low", label: "Discount: Low to High" },
    { value: "discount_high", label: "Discount: High to Low" },
  ]

  const handleSortChange = (e) => {
    const newSortValue = e.target.value
    setSortOption(newSortValue)
    // Reset to page 1 when sort changes
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <select
          value={sortOption || "popular"}
          onChange={handleSortChange}
          className="appearance-none bg-white border border-gray-200 rounded-md pl-4 pr-10 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#d3ae6e]/40 focus:border-[#d3ae6e]/40 shadow-sm cursor-pointer w-full md:w-auto"
        >
          {defaultSortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
          <ChevronDown size={16} />
        </div>
      </div>
    </div>
  )
}

export default ProductSortDropdown
