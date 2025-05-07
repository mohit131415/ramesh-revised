const API_BASE_URL = "/api/api/public" // Correctly use the proxy with the proper path structure

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

// Get products by subcategory - Fixed to use proxy correctly
export const getProductsBySubcategory = async (subcategoryId, page = 1, limit = 10) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/filters/products/subcategory/${subcategoryId}?page=${page}&limit=${limit}`,
    )
    if (!response.ok) {
      throw new Error("Failed to fetch products by subcategory")
    }
    return await response.json()
  } catch (error) {
    console.error(`Error fetching products for subcategory ${subcategoryId}:`, error)
    throw error
  }
}

// Get all categories
export const getCategories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/filters/categories`)
    if (!response.ok) {
      throw new Error("Failed to fetch categories")
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching categories:", error)
    throw error
  }
}

// Get all subcategories
export const getSubcategories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/filters/subcategories`)
    if (!response.ok) {
      throw new Error("Failed to fetch subcategories")
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching subcategories:", error)
    throw error
  }
}

// Get subcategories by category
export const getSubcategoriesByCategory = async (categoryId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/filters/subcategories/category/${categoryId}`)
    if (!response.ok) {
      throw new Error("Failed to fetch subcategories by category")
    }
    return await response.json()
  } catch (error) {
    console.error(`Error fetching subcategories for category ${categoryId}:`, error)
    throw error
  }
}
