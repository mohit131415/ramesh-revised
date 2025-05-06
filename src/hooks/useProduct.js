import { useQuery } from "@tanstack/react-query"
import apiClient from "../services/api-client"

// Hook for fetching a single product by ID or slug
export const useProduct = (identifier, isSlug = false) => {
  return useQuery({
    queryKey: isSlug ? ["product", "slug", identifier] : ["product", identifier],
    queryFn: async () => {
      const endpoint = isSlug ? `products/slug/${identifier}` : `products/${identifier}`

      const response = await apiClient.get(endpoint)

      if (!response.data || response.status !== "success") {
        throw new Error(response.message || "Failed to fetch product")
      }

      return response.data
    },
    enabled: !!identifier, // Only run if identifier exists
    staleTime: 10 * 60 * 1000, // Consider data fresh for 10 minutes
  })
}

export default useProduct
