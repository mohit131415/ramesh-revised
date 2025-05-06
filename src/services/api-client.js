import axios from "axios"

// Base URLs - Using relative URLs to work with the Vite proxy
const API_BASE_URL = "/api"

// Create an axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 10000, // 10 seconds timeout
})

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
  (config) => {
    // Get token from localStorage if it exists
    const token = localStorage.getItem("auth_token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor for handling common errors
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Handle specific error cases
    if (error.response) {
      // Server responded with an error status
      const { status } = error.response

      if (status === 401) {
        // Unauthorized - clear token and redirect to login
        localStorage.removeItem("auth_token")
        // You might want to redirect to login page here
        console.error("Authentication error. Please log in again.")
      } else if (status === 403) {
        // Forbidden
        console.error("You don't have permission to access this resource.")
      } else if (status === 404) {
        // Not found
        console.error("The requested resource was not found.")
      } else if (status === 500) {
        // Server error
        console.error("An internal server error occurred. Please try again later.")
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error("No response received from server. Please check your internet connection.")
    } else {
      // Something else happened while setting up the request
      console.error("Error setting up the request:", error.message)
    }

    return Promise.reject(error)
  },
)

// Add getImageUrl method
const getImageUrl = (imagePath) => {
  if (!imagePath) return "/placeholder.svg"

  // Check if it's already a full URL
  if (imagePath.startsWith("http")) return imagePath

  // Otherwise, construct the URL with the base URL
  return `${API_BASE_URL}/public/${imagePath.replace(/^\/+/, "")}`
}

// Update the fetchCategories method to use the correct endpoint with Vite proxy
const fetchCategories = async (params = {}) => {
  try {
    const queryParams = new URLSearchParams()

    // Add pagination and search params if provided
    if (params.page) queryParams.append("page", params.page)
    if (params.limit) queryParams.append("limit", params.limit)
    if (params.search) queryParams.append("search", params.search)

    const queryString = queryParams.toString()
    // Using the correct endpoint structure that will work with the proxy
    const response = await apiClient.get(`/api/public/categories${queryString ? `?${queryString}` : ""}`)
    return response.data
  } catch (error) {
    console.error("Error fetching categories:", error)
    throw error
  }
}

// Update the subcategories fetching method to work with the Vite proxy
const fetchSubcategories = async (categoryId) => {
  try {
    if (!categoryId) {
      throw new Error("Category ID is required")
    }

    console.log("Fetching subcategories for category ID:", categoryId)

    // Using the exact path structure from the HTML tester but with relative URL
    const response = await apiClient.get(`/api/subcategories`, {
      params: { category_id: categoryId },
    })

    console.log("Subcategories response:", response.data)
    return response.data
  } catch (error) {
    console.error(`Error fetching subcategories for category ${categoryId}:`, error)
    throw error
  }
}

// Add a method to fetch a subcategory by ID
const fetchSubcategoryById = async (subcategoryId) => {
  try {
    if (!subcategoryId) {
      throw new Error("Subcategory ID is required")
    }

    const response = await apiClient.get(`/api/subcategories/${subcategoryId}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching subcategory ${subcategoryId}:`, error)
    throw error
  }
}

// Fix the get method to use the correct endpoint structure
const get = async (endpoint) => {
  try {
    const response = await apiClient.get(`/api/public/${endpoint}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching from ${endpoint}:`, error)
    throw error
  }
}

// Add a new method to fetch products by subcategory
const fetchProductsBySubcategory = async (subcategoryId, params = {}) => {
  try {
    const queryParams = new URLSearchParams()

    // Add all params to query string
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, value)
      }
    })

    const queryString = queryParams.toString() ? `?${queryParams.toString()}` : ""
    const response = await apiClient.get(`/api/public/products/subcategory/${subcategoryId}${queryString}`)

    return response.data
  } catch (error) {
    console.error("Error fetching products by subcategory:", error)
    throw error
  }
}

// Update the exported api object to include the new method
const api = {
  get,
  getImageUrl,
  fetchCategories,
  fetchSubcategories,
  fetchSubcategoryById,
  fetchProductsBySubcategory,
  // ... other methods
}

export default api
