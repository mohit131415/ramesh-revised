import { Link } from "react-router-dom"
import { ChevronRight } from "lucide-react"

export default function SubcategoryCard({ subcategory, categoryName }) {
  if (!subcategory) return null

  // Use the image_url if available, otherwise use a placeholder
  const imageUrl = subcategory.image_url || `/placeholder.svg?height=200&width=200&query=${subcategory.name}`

  return (
    <Link
      to={`/products?subcategory=${subcategory.id}`}
      className="group bg-white rounded-lg overflow-hidden shadow-md border border-gold/10 hover:shadow-lg transition-all duration-300 flex flex-col h-full"
    >
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img
          src={imageUrl || "/placeholder.svg"}
          alt={subcategory.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {subcategory.product_count > 0 && (
          <div className="absolute top-3 right-3 bg-gold/90 text-white text-xs font-medium px-2 py-1 rounded-full">
            {subcategory.product_count} Products
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <div className="flex-grow">
          <h3 className="font-cinzel font-semibold text-lg text-gray-900 mb-1 group-hover:text-gold transition-colors">
            {subcategory.name}
          </h3>

          {categoryName && (
            <p className="text-xs text-gray-500 mb-2">
              in <span className="font-medium">{categoryName}</span>
            </p>
          )}

          {subcategory.description && (
            <p className="text-sm text-gray-600 line-clamp-2 mb-3">{subcategory.description}</p>
          )}
        </div>

        <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
          <span className="text-sm font-medium text-gold">View Products</span>
          <ChevronRight className="h-4 w-4 text-gold" />
        </div>
      </div>
    </Link>
  )
}
