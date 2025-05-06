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
      currentPage: 1,
      itemsPerPage: 12,
      totalPages: 1,
      totalItems: 0,

      // Filter state
      // searchQuery: "",
      // selectedCategory: null,
      // selectedSubcategory: null,
      // priceRange: { min: 0, max: 10000 },
      // sortBy: "featured", // featured, price-low-high, price-high-low, newest
      selectedSubcategory: null,

      // Recently viewed products
      recentlyViewed: [],

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
      setSelectedCategory: (categoryId) => set({ selectedCategory: categoryId, currentPage: 1 }),
      setSelectedSubcategory: (subcategoryId) =>
        set({ selectedSubcategory: subcategoryId ? Number(subcategoryId) : null }),
      // setSelectedSubcategory: (subcategoryId) => set({ selectedSubcategory: subcategoryId, currentPage: 1 }),
      // setPriceRange: (range) => set({ priceRange: range, currentPage: 1 }),
      // setSortBy: (sortOption) => set({ sortBy: sortOption }),

      // Reset filters
      resetFilters: () => {
        set({
          searchQuery: "",
          currentPage: 1,
          selectedCategory: null,
          selectedSubcategory: null,
        })
      },

      // Reset filters
      // resetFilters: () =>
      //   set({
      //     searchQuery: "",
      //     selectedCategory: null,
      //     selectedSubcategory: null,
      //     priceRange: { min: 0, max: 10000 },
      //     sortBy: "featured",
      //     currentPage: 1,
      //   }),

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

      // Recently viewed actions
      // addToRecentlyViewed: (product) =>
      //   set((state) => {
      //     // Remove product if it already exists in the list
      //     const filtered = state.recentlyViewed.filter((p) => p.id !== product.id)

      //     // Add product to the beginning of the list
      //     const updated = [product, ...filtered].slice(0, 8) // Keep only the 8 most recent

      //     // Save to localStorage
      //     try {
      //       localStorage.setItem("recentlyViewed", JSON.stringify(updated))
      //     } catch (error) {
      //       console.error("Failed to save recently viewed products to localStorage:", error)
      //     }

      //     return { recentlyViewed: updated }
      //   }),

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
    }),
    {
      name: "product-store",
      partialize: (state) => ({
        recentlyViewed: state.recentlyViewed,
      }),
    },
  ),
)

export default useProductStore
