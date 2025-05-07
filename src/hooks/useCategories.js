"use client"

import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { toast } from "../components/ui/use-toast"
import useProductStore from "../store/productStore"
import { getCategories, getSubcategories, getSubcategoriesByCategory } from "../services/product-service"

// Hook for fetching all categories
export const useCategories = () => {
  const { setCategories } = useProductStore()

  const query = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await getCategories()
      return response
    },
    staleTime: 10 * 60 * 1000, // Consider data fresh for 10 minutes
    retry: 2,
  })

  // Update store with categories data
  useEffect(() => {
    if (query.data && query.data.data) {
      setCategories(query.data.data)
    }
  }, [query.data, setCategories])

  // Show error toast if query fails
  useEffect(() => {
    if (query.error) {
      toast({
        title: "Error loading categories",
        description: "There was a problem loading the categories. Please try again.",
        variant: "destructive",
      })
      console.error("Categories fetch error:", query.error)
    }
  }, [query.error])

  return query
}

// Hook for fetching all subcategories
export const useSubcategories = () => {
  const { setSubcategories } = useProductStore()

  const query = useQuery({
    queryKey: ["subcategories"],
    queryFn: async () => {
      const response = await getSubcategories()
      return response
    },
    staleTime: 10 * 60 * 1000, // Consider data fresh for 10 minutes
    retry: 2,
  })

  // Update store with subcategories data
  useEffect(() => {
    if (query.data && query.data.data) {
      setSubcategories(query.data.data)
    }
  }, [query.data, setSubcategories])

  // Show error toast if query fails
  useEffect(() => {
    if (query.error) {
      toast({
        title: "Error loading subcategories",
        description: "There was a problem loading the subcategories. Please try again.",
        variant: "destructive",
      })
      console.error("Subcategories fetch error:", query.error)
    }
  }, [query.error])

  return query
}

// Hook for fetching subcategories by category
export const useSubcategoriesByCategory = (categoryId) => {
  const { setSubcategories } = useProductStore()

  const query = useQuery({
    queryKey: ["subcategories", categoryId],
    queryFn: async () => {
      if (!categoryId) return { data: { subcategories: [] } }
      const response = await getSubcategoriesByCategory(categoryId)
      return response
    },
    enabled: !!categoryId, // Only run if categoryId exists
    staleTime: 10 * 60 * 1000, // Consider data fresh for 10 minutes
    retry: 2,
  })

  // Update store with subcategories data
  useEffect(() => {
    if (query.data && query.data.data && query.data.data.subcategories) {
      setSubcategories(query.data.data.subcategories)
    }
  }, [query.data, setSubcategories])

  // Show error toast if query fails
  useEffect(() => {
    if (query.error) {
      toast({
        title: "Error loading subcategories",
        description: "There was a problem loading the subcategories. Please try again.",
        variant: "destructive",
      })
      console.error("Subcategories fetch error:", query.error)
    }
  }, [query.error])

  return query
}
