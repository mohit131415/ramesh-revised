import { create } from "zustand"
import { persist } from "zustand/middleware"

const useProductStore = create(
  persist(
    (set) => ({
      // Products state
      products: [],
      isLoading: false,
      error: null,

      // Search and filter state
      searchQuery: "",
      selectedCategory: null,
      selectedSubcategory: null,
      currentPage: 1,
      itemsPerPage: 12,
      totalPages: 1,
      totalItems: 0,

      // Price range filter
      priceRange: { min: 0, max: 10000 },

      // Discount filter
      minDiscount: 0,

      // Categories and subcategories
      categories: [],
      subcategories: [],

      // Show more toggles
      showAllCategories: false,
      showAllSubcategories: false,

      // Actions
      setProducts: (products) => set({ products }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),

      // Pagination actions
      setCurrentPage: (page) => set({ currentPage: page }),
      setItemsPerPage: (limit) => set({ itemsPerPage: limit, currentPage: 1 }),
      setTotalPages: (pages) => set({ totalPages: pages }),
      setTotalItems: (total) => set({ totalItems: total }),

      // Filter actions
      setSearchQuery: (query) => set({ searchQuery: query, currentPage: 1 }),
      setSelectedCategory: (categoryId) =>
        set({
          selectedCategory: categoryId,
          selectedSubcategory: null,
          currentPage: 1,
        }),
      setSelectedSubcategory: (subcategoryId) => set({ selectedSubcategory: subcategoryId, currentPage: 1 }),
      setPriceRange: (range) => set({ priceRange: range, currentPage: 1 }),
      setMinDiscount: (discount) => set({ minDiscount: discount, currentPage: 1 }),

      // Categories and subcategories actions
      setCategories: (categories) => set({ categories }),
      setSubcategories: (subcategories) => set({ subcategories }),

      // Toggle show more actions
      toggleShowAllCategories: () => set((state) => ({ showAllCategories: !state.showAllCategories })),
      toggleShowAllSubcategories: () => set((state) => ({ showAllSubcategories: !state.showAllSubcategories })),

      // Reset filters
      resetFilters: () =>
        set({
          searchQuery: "",
          selectedCategory: null,
          selectedSubcategory: null,
          priceRange: { min: 0, max: 10000 },
          minDiscount: 0,
          currentPage: 1,
          showAllCategories: false,
          showAllSubcategories: false,
        }),

      // Add product to recently viewed
      addToRecentlyViewed: (product) =>
        set((state) => {
          // Remove product if it already exists in the list
          const filtered = state.recentlyViewed.filter((p) => p.id !== product.id)

          // Add product to the beginning of the list and limit to 10 items
          return {
            recentlyViewed: [product, ...filtered].slice(0, 10),
          }
        }),

      // Initialize recently viewed from localStorage
      initRecentlyViewed: () => {
        try {
          const stored = localStorage.getItem("recentlyViewed")
          if (stored) {
            const parsed = JSON.parse(stored)
            set({ recentlyViewed: parsed })
          }
        } catch (error) {
          console.error("Failed to load recently viewed products from localStorage:", error)
        }
      },

      // Recently viewed products
      recentlyViewed: [],
    }),
    {
      name: "product-store",
      partialize: (state) => ({
        recentlyViewed: state.recentlyViewed,
      }),
    },
  ),
)

// Add a new action to fetch the overall price range
export const fetchOverallPriceRange = async () => {
  try {
    const response = await fetch("/api/api/public/filters/products/price-range")
    if (!response.ok) {
      throw new Error("Failed to fetch overall price range")
    }
    const data = await response.json()
    if (data.status === "success" && data.data.overall_price_range) {
      return data.data.overall_price_range
    }
    return { min_price: 0, max_price: 10000 } // Default fallback
  } catch (error) {
    console.error("Error fetching overall price range:", error)
    return { min_price: 0, max_price: 10000 } // Default fallback on error
  }
}

export default useProductStore
