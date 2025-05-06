"use client"

import { Link, useLocation } from "react-router-dom"
import { Home, Search, ShoppingBag, Heart, User, X } from "lucide-react"
import { cn } from "../../lib/utils"
import { useState } from "react"
import { Badge } from "../ui/badge"
import useCartStore from "../../store/cartStore"
import useFavoritesStore from "../../store/favoritesStore"

export default function MobileBottomNav() {
  const location = useLocation()
  const { totalItems } = useCartStore()
  const { favorites } = useFavoritesStore()
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gold/20 lg:hidden">
        <div className="flex items-center justify-around h-16">
          <Link to="/" className="flex flex-col items-center justify-center text-xs text-gray-700 hover:text-gold">
            <Home className="h-6 w-6 mb-1" />
            <span>Home</span>
          </Link>

          <button
            className="flex flex-col items-center justify-center text-xs text-gray-700 hover:text-gold"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <Search className="h-6 w-6 mb-1" />
            <span>Search</span>
          </button>

          <Link
            to="/favorites"
            className="flex flex-col items-center justify-center text-xs text-gray-700 hover:text-gold relative"
          >
            <Heart className="h-6 w-6 mb-1" />
            {favorites.length > 0 && (
              <Badge
                variant="destructive"
                className="absolute -right-1 top-0 h-4 w-4 rounded-full p-0 text-[10px] flex items-center justify-center bg-gradient-to-r from-gold to-pink/80 border-gold/30"
              >
                {favorites.length}
              </Badge>
            )}
            <span>Wishlist</span>
          </Link>

          <Link
            to="/cart"
            className="flex flex-col items-center justify-center text-xs text-gray-700 hover:text-gold relative"
          >
            <ShoppingBag className="h-6 w-6 mb-1" />
            {totalItems > 0 && (
              <Badge
                variant="primary"
                className="absolute -right-1 top-0 h-4 w-4 rounded-full p-0 text-[10px] flex items-center justify-center"
              >
                {totalItems}
              </Badge>
            )}
            <span>Cart</span>
          </Link>

          <Link
            to="/account"
            className="flex flex-col items-center justify-center text-xs text-gray-700 hover:text-gold"
          >
            <User className="h-6 w-6 mb-1" />
            <span>Account</span>
          </Link>
        </div>
      </div>

      {/* Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-white p-4 lg:hidden">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-cinzel text-gold">Search</h2>
            <button onClick={() => setSearchOpen(false)} className="p-2">
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search for sweets, gifts, and more..."
              className="w-full border-2 border-gold/30 rounded-md py-2 px-4 focus:outline-none focus:border-gold"
              autoFocus
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-gold to-pink/80 hover:from-gold/90 hover:to-pink/70 text-white rounded-md px-4 py-1">
              Search
            </button>
          </div>
        </div>
      )}
    </>
  )
}

function NavItem({ to, icon, label, isActive }) {
  return (
    <Link
      to={to}
      className={cn("flex flex-col items-center justify-center text-xs", isActive ? "text-gold" : "text-gray-600")}
    >
      <div className="mb-1">{icon}</div>
      <span>{label}</span>
    </Link>
  )
}
