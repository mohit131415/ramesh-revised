import { useQuery } from "@tanstack/react-query"
import api from "../services/api-client"
import useCategoryStore from "../store/categoryStore"

export const useSubcategories = (categoryId) => {
  const { setSubcategories, setSubcategoriesLoading, setSubcategoriesError } = useCategoryStore()

  return useQuery({
    queryKey: ["subcategories", categoryId],
    queryFn: async () => {
      setSubcategoriesLoading(true)
      try {
        const response = await api.fetchSubcategories(categoryId)

        // Update the Zustand store with the fetched data
        if (response.status === "success") {
          setSubcategories(response.data || [])
        }

        setSubcategoriesLoading(false)
        return response
      } catch (error) {
        setSubcategoriesError(error.message)
        setSubcategoriesLoading(false)
        throw error
      }
    },
    enabled: !!categoryId, // Only run the query if categoryId is provided
    onError: (error) => {
      console.error("Error fetching subcategories:", error)
      setSubcategoriesError(error.message)
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  })
}

export const useSubcategoryById = (subcategoryId) => {
  return useQuery({
    queryKey: ["subcategory", subcategoryId],
    queryFn: async () => {
      const response = await api.fetchSubcategoryById(subcategoryId)
      return response
    },
    enabled: !!subcategoryId, // Only run the query if subcategoryId is provided
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  })
}
