export const categories = [
    {
      id: "all",
      name: "All Products",
      description: "Browse our complete collection of authentic Indian sweets",
      image: "/images/categories/all.jpg",
      count: 0, // This will be calculated dynamically
    },
    {
      id: "dry-fruits",
      name: "Dry Fruit Sweets",
      description: "Premium sweets made with the finest nuts and dry fruits",
      image: "/images/categories/dry_fruits.jpg",
      featured: true,
      count: 0,
    },
    {
      id: "milk",
      name: "Milk Sweets",
      description: "Delicious sweets made from fresh milk and milk solids",
      image: "/images/categories/milk.jpg",
      featured: true,
      count: 0,
    },
    {
      id: "ghee",
      name: "Ghee Sweets",
      description: "Traditional sweets prepared with pure clarified butter",
      image: "/images/categories/ghee.jpg",
      featured: true,
      count: 0,
    },
    {
      id: "bengali",
      name: "Bengali Sweets",
      description: "Authentic sweets from the rich culinary tradition of Bengal",
      image: "/images/categories/bengali.jpg",
      featured: false,
      count: 0,
    },
    {
      id: "festive",
      name: "Festive Specials",
      description: "Special sweets for celebrations and festivals",
      image: "/images/categories/festive.jpg",
      featured: false,
      count: 0,
    },
    {
      id: "gifting",
      name: "Gift Packs",
      description: "Beautifully packaged assortments perfect for gifting",
      image: "/images/categories/gifting.jpg",
      featured: true,
      count: 0,
    },
  ]
  
  // Import products to calculate category counts
  import { products } from "./products"
  
  // Calculate product count for each category
  export const categoriesWithCount = categories.map((category) => {
    if (category.id === "all") {
      return { ...category, count: products.length }
    }
  
    const count = products.filter((product) => product.category === category.id).length
    return { ...category, count }
  })
  
  // Helper functions
  export function getCategoryById(id) {
    return categoriesWithCount.find((category) => category.id === id) || null
  }
  
  export function getFeaturedCategories(limit = 3) {
    return categoriesWithCount.filter((category) => category.featured && category.id !== "all").slice(0, limit)
  }
  
  export function getAllCategories() {
    return categoriesWithCount
  }
  
  