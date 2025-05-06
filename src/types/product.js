/**
 * Product type definitions
 * @typedef {Object} Product
 * @property {number} id - Unique product ID
 * @property {string} name - Product name
 * @property {string} slug - URL-friendly product name
 * @property {string} description - Short product description
 * @property {string} [longDescription] - Detailed product description
 * @property {string} category - Product category
 * @property {string} image - Main product image URL
 * @property {Array<string>} [gallery] - Additional product images
 * @property {number|string} price - Product price
 * @property {string} [weight] - Product weight (e.g., "500g")
 * @property {Array<string>} [tags] - Product tags
 * @property {boolean} [isBestseller] - Whether the product is a bestseller
 * @property {boolean} [isNew] - Whether the product is new
 * @property {boolean} [featured] - Whether the product is featured
 * @property {number} [rating] - Average product rating (1-5)
 * @property {number} [reviews] - Number of product reviews
 * @property {Array<string>} [ingredients] - Product ingredients
 * @property {Array<string>} [allergens] - Product allergens
 * @property {Object} [nutritionalInfo] - Nutritional information
 * @property {string} [shelfLife] - Product shelf life
 * @property {string} [origin] - Product origin
 * @property {string} [preparation] - Preparation instructions
 * @property {string} [servingSuggestion] - Serving suggestions
 * @property {string} [pairing] - Pairing recommendations
 */

/**
 * Category type definition
 * @typedef {Object} Category
 * @property {number|string} id - Unique category ID
 * @property {string} name - Category name
 * @property {string} slug - URL-friendly category name
 * @property {string} [description] - Category description
 * @property {string} [image] - Category image URL
 * @property {boolean} [featured] - Whether the category is featured
 * @property {number} [count] - Number of products in the category
 */

/**
 * Review type definition
 * @typedef {Object} Review
 * @property {number|string} id - Unique review ID
 * @property {number|string} productId - Product ID
 * @property {number|string} userId - User ID
 * @property {string} userName - User name
 * @property {number} rating - Rating (1-5)
 * @property {string} [title] - Review title
 * @property {string} comment - Review comment
 * @property {string} date - Review date
 * @property {boolean} [verified] - Whether the review is from a verified purchase
 */

/**
 * ProductFilter type definition
 * @typedef {Object} ProductFilter
 * @property {string} [category] - Filter by category
 * @property {string} [search] - Search term
 * @property {Array<string>} [tags] - Filter by tags
 * @property {number} [minPrice] - Minimum price
 * @property {number} [maxPrice] - Maximum price
 * @property {string} [sort] - Sort field and direction (e.g., 'price:asc')
 * @property {number} [page] - Page number
 * @property {number} [limit] - Items per page
 */

/**
 * PaginatedResponse type definition
 * @typedef {Object} PaginatedResponse
 * @property {Array} data - Response data
 * @property {number} total - Total number of items
 * @property {number} page - Current page
 * @property {number} limit - Items per page
 * @property {number} pages - Total number of pages
 * @property {boolean} hasNext - Whether there is a next page
 * @property {boolean} hasPrev - Whether there is a previous page
 */

export {}

