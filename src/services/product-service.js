const API_BASE_URL = "/api/api/public"

// Get all products with pagination
export const getProducts = async (page = 1, limit = 10) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products?page=${page}&limit=${limit}`)
    if (!response.ok) {
      throw new Error("Failed to fetch products")
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching products:", error)
    throw error
  }
}

// Get a single product by ID
export const getProduct = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`)
    if (!response.ok) {
      throw new Error("Failed to fetch product")
    }
    return await response.json()
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error)
    throw error
  }
}

// Get a single product by slug
export const getProductBySlug = async (slug) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/slug/${slug}`)
    if (!response.ok) {
      throw new Error("Failed to fetch product by slug")
    }
    return await response.json()
  } catch (error) {
    console.error(`Error fetching product with slug ${slug}:`, error)
    throw error
  }
}

// Search products
export const searchProducts = async (query, page = 1, limit = 10) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/products/search?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`,
    )
    if (!response.ok) {
      throw new Error("Failed to search products")
    }
    return await response.json()
  } catch (error) {
    console.error("Error searching products:", error)
    throw error
  }
}

// Get products by category
export const getProductsByCategory = async (categoryId, page = 1, limit = 10) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/category/${categoryId}?page=${page}&limit=${limit}`)
    if (!response.ok) {
      throw new Error("Failed to fetch products by category")
    }
    return await response.json()
  } catch (error) {
    console.error(`Error fetching products for category ${categoryId}:`, error)
    throw error
  }
}

// Add this function to fetch products by subcategory
export const getProductsBySubcategory = async (
  subcategoryId,
  page = 1,
  limit = 12,
  sortBy = "created_at",
  sortOrder = "desc",
) => {
  try {
    if (!subcategoryId) {
      throw new Error("Subcategory ID is required")
    }

    const params = new URLSearchParams()
    params.append("page", page)
    params.append("limit", limit)
    params.append("sort_by", sortBy)
    params.append("sort_order", sortOrder)

    const url = `${API_BASE_URL}/products/subcategory/${subcategoryId}?${params.toString()}`
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Failed to fetch products for subcategory ${subcategoryId}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching products by subcategory:", error)
    throw error
  }
}
