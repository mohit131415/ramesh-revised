"use client"

import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { toast } from "../components/ui/use-toast"
import useProductStore from "../store/productStore"
import {
  getProducts,
  searchProducts,
  getProductsByCategory,
  getProductsBySubcategory,
} from "../services/product-service"

// Hook for fetching products with search and pagination
export const useProducts = () => {
  const {
    searchQuery,
    currentPage,
    itemsPerPage,
    selectedCategory,
    selectedSubcategory,
    priceRange,
    minDiscount,
    setTotalPages,
    setTotalItems,
  } = useProductStore()

  // Determine which API call to make based on filters
  const fetchProducts = async () => {
    try {
      let response

      if (searchQuery) {
        response = await searchProducts(searchQuery, currentPage, itemsPerPage)
      } else if (selectedSubcategory) {
        response = await getProductsBySubcategory(selectedSubcategory, currentPage, itemsPerPage)
      } else if (selectedCategory) {
        response = await getProductsByCategory(selectedCategory, currentPage, itemsPerPage)
      } else {
        response = await getProducts(currentPage, itemsPerPage)
      }

      // Update store with pagination data
      if (response && response.data) {
        setTotalPages(response.data.total_pages || 1)
        setTotalItems(response.data.total || 0)
      }

      // Apply client-side filtering for price and discount
      const filteredProducts = response

      if (response && response.data && response.data.products) {
        // Extract products from response
        let products = response.data.products
        if (Array.isArray(products.items)) {
          products = products.items
        } else if (Array.isArray(products)) {
          // Already in the right format
        } else {
          console.warn("Unknown product structure:", products)
          products = []
        }

        // Apply price filter
        if (priceRange.min > 0 || priceRange.max < 10000) {
          products = products.filter((product) => {
            // Get the lowest price from variants
            const lowestPrice = Math.min(...product.variants.map((v) => Number.parseFloat(v.sale_price || v.price)))
            return lowestPrice >= priceRange.min && lowestPrice <= priceRange.max
          })
        }

        // Apply discount filter
        if (minDiscount > 0) {
          products = products.filter((product) => {
            // Check if any variant has the minimum discount
            return product.variants.some((v) => Number.parseFloat(v.discount_percentage || 0) >= minDiscount)
          })
        }

        // Update the response with filtered products
        if (response.data.products.items) {
          response.data.products.items = products
        } else {
          response.data.products = products
        }
      }

      return filteredProducts
    } catch (error) {
      console.error("Error fetching products:", error)
      throw error
    }
  }

  // Create a query key that changes when filters change
  const queryKey = [
    "products",
    searchQuery,
    currentPage,
    itemsPerPage,
    selectedCategory,
    selectedSubcategory,
    priceRange.min,
    priceRange.max,
    minDiscount,
  ]

  // Use TanStack Query to fetch and cache data
  const query = useQuery({
    queryKey,
    queryFn: fetchProducts,
    keepPreviousData: true, // Keep old data while fetching new data
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    retry: 2, // Retry failed requests twice
  })

  // Show error toast if query fails
  useEffect(() => {
    if (query.error) {
      toast({
        title: "Error loading products",
        description: "There was a problem loading the products. Please try again.",
        variant: "destructive",
      })
      console.error("Product fetch error:", query.error)
    }
  }, [query.error])

  return query
}

// Hook for fetching a single product by ID
export const useProduct = (productId) => {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      const response = await fetch(`http://localhost/ramesh-be/be/api/api/public/products/${productId}`)
      if (!response.ok) {
        throw new Error("Failed to fetch product")
      }
      return response.json()
    },
    enabled: !!productId, // Only run if productId exists
    staleTime: 10 * 60 * 1000, // Consider data fresh for 10 minutes
  })
}

// Hook for fetching a single product by slug
export const useProductBySlug = (slug) => {
  return useQuery({
    queryKey: ["product", "slug", slug],
    queryFn: async () => {
      const response = await fetch(`http://localhost/ramesh-be/be/api/api/public/products/slug/${slug}`)
      if (!response.ok) {
        throw new Error("Failed to fetch product by slug")
      }
      return response.json()
    },
    enabled: !!slug, // Only run if slug exists
    staleTime: 10 * 60 * 1000, // Consider data fresh for 10 minutes
  })
}
