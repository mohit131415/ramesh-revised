import { useQuery } from "@tanstack/react-query"
import api from "../services/api-client"
import useCategoryStore from "../store/categoryStore"

export const useCategories = (params = {}) => {
  const { setCategories, setMetadata } = useCategoryStore()

  return useQuery({
    queryKey: ["categories", params],
    queryFn: async () => {
      const response = await api.fetchCategories(params)

      // Update the Zustand store with the fetched data
      if (response.status === "success") {
        setCategories(response.data || [])
        setMetadata(response.meta || {})
      }

      return response
    },
    onError: (error) => {
      console.error("Error fetching categories:", error)
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  })
}

export const useCategoryById = (categoryId) => {
  return useQuery({
    queryKey: ["category", categoryId],
    queryFn: async () => {
      const response = await fetch(`${api.API_BASE_URL}/api/public/categories/${categoryId}`)
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }
      return await response.json()
    },
    enabled: !!categoryId, // Only run the query if categoryId is provided
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  })
}

export const useCategoryTree = () => {
  return useQuery({
    queryKey: ["categoryTree"],
    queryFn: async () => {
      const response = await fetch(`${api.API_BASE_URL}/api/public/categories/tree`)
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }
      return await response.json()
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  })
}
