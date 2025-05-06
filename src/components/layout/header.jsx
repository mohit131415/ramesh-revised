"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { ShoppingBag, Heart, Search, Menu } from "lucide-react"
import useCartStore from "../../store/cartStore"
import useFavoritesStore from "../../store/favoritesStore"
import { cn } from "../../lib/utils"
import { Badge } from "../ui/badge"
import MobileBottomNav from "./mobile-bottom-nav"
import MobileMenu from "./mobile-menu"
import Navigation from "./navigation"
import UserMenu from "./user-menu"

export default function Header({ className }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { totalItems } = useCartStore()
  const { favorites } = useFavoritesStore()

  // Simple scroll detection for shadow effect only
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Main Header */}
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300 backdrop-blur-md",
          isScrolled ? "shadow-md" : "",
          className,
        )}
      >
        {/* Background with blur effect and pink shade */}
        <div className="absolute inset-0 bg-[#fff9fb]/90">
          {/* Pink overlay - more subtle */}
          <div className="absolute inset-0 bg-pink-lighter/20"></div>

          {/* Subtle heritage pattern overlay */}
          <div className="absolute inset-0 heritage-pattern opacity-3"></div>

          {/* Enhanced gold-pink gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-gold/3 via-pink-light/10 to-gold/3"></div>
        </div>

        {/* Top decorative border */}
        <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-pink-light/50 via-gold to-pink-light/50"></div>

        {/* Bottom decorative border */}
        <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-pink-lighter/30 via-gold/70 to-pink-lighter/30"></div>

        <div className="container mx-auto relative z-10">
          <div className="flex items-center justify-between h-16">
            {/* Logo with decorative elements */}
            <Link to="/" className="flex items-center relative group">
              {/* Logo glow effect on hover */}
              <div className="absolute inset-0 rounded-full bg-gold/0 group-hover:bg-gradient-to-r group-hover:from-gold/10 group-hover:to-pink-lighter/20 blur-md transition-all duration-500"></div>

              {/* Logo */}
              <img src="/images/ramesh-logo.svg" alt="Ramesh Sweets Logo" className="h-12 w-auto relative z-10" />

              {/* Decorative corner accents */}
              <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-gold/40 group-hover:border-gold transition-colors duration-300"></div>
              <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-gold/40 group-hover:border-gold transition-colors duration-300"></div>
              <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-gold/40 group-hover:border-gold transition-colors duration-300"></div>
              <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-gold/40 group-hover:border-gold transition-colors duration-300"></div>
            </Link>

            {/* Desktop Navigation */}
            <Navigation />

            {/* Right Side Actions - ONLY VISIBLE ON DESKTOP */}
            <div className="hidden lg:flex items-center space-x-5">
              {/* Search Button - Icon Only */}
              <button
                className="p-1 text-black-rich hover:text-gold transition-colors relative group"
                onClick={() => setSearchOpen(!searchOpen)}
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gold via-pink to-gold group-hover:w-full transition-all duration-300"></span>
              </button>

              {/* User Account */}
              <div className="relative group">
                <UserMenu />
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gold via-pink to-gold group-hover:w-full transition-all duration-300"></span>
              </div>

              {/* Favorites */}
              <Link
                to="/favorites"
                className="p-1 text-black-rich hover:text-gold transition-colors relative group"
                aria-label="Favorites"
              >
                <Heart className="h-5 w-5" />
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gold via-pink to-gold group-hover:w-full transition-all duration-300"></span>
                {favorites.length > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -right-1 -top-1 h-4 w-4 rounded-full p-0 text-[10px] flex items-center justify-center bg-gradient-to-r from-gold via-pink to-gold-dark text-white border border-pink-light/30"
                  >
                    {favorites.length}
                  </Badge>
                )}
              </Link>

              {/* Cart */}
              <Link
                to="/cart"
                className="p-1 text-black-rich hover:text-gold transition-colors relative group"
                aria-label="Cart"
              >
                <ShoppingBag className="h-5 w-5" />
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gold via-pink to-gold group-hover:w-full transition-all duration-300"></span>
                {totalItems > 0 && (
                  <Badge
                    variant="primary"
                    className="absolute -right-1 -top-1 h-4 w-4 rounded-full p-0 text-[10px] flex items-center justify-center bg-gradient-to-r from-gold via-pink to-gold-dark text-white border border-pink-light/30"
                  >
                    {totalItems}
                  </Badge>
                )}
              </Link>
            </div>

            {/* Mobile Menu Toggle - Only visible on mobile */}
            <button
              className="p-2 text-black-rich hover:text-gold transition-colors lg:hidden"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Search Overlay */}
        {searchOpen && (
          <div className="absolute top-full left-0 right-0 bg-cream/80 backdrop-blur-md border-b border-gold/20 shadow-lg z-20 py-6">
            <div className="absolute inset-0 bg-pink-lighter/30"></div>
            <div className="container mx-auto px-4">
              <div className="relative max-w-2xl mx-auto">
                {/* Decorative corner accents */}
                <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-gold/60"></div>
                <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-gold/60"></div>
                <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-gold/60"></div>
                <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-gold/60"></div>

                <input
                  type="text"
                  placeholder="Search for sweets, gifts, and more..."
                  className="w-full border-2 border-gold/30 focus:border-gold/70 rounded-md py-3 px-4 focus:outline-none transition-colors duration-300 bg-cream-dark/20"
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-2">
                  <button className="bg-gradient-to-r from-gold to-gold-dark hover:from-gold-dark hover:to-gold text-white rounded-md px-4 py-2 text-sm transition-colors duration-300 flex items-center">
                    <Search className="h-4 w-4 mr-1" />
                    Search
                  </button>
                </div>
              </div>

              {/* Quick links */}
              <div className="mt-4 flex justify-center space-x-6 text-sm">
                <span className="text-black-rich/70">Popular:</span>
                <Link to="/products/ladoo" className="text-gold hover:text-gold-dark transition-colors">
                  Ladoo
                </Link>
                <Link to="/products/barfi" className="text-gold hover:text-gold-dark transition-colors">
                  Barfi
                </Link>
                <Link to="/products/gift-boxes" className="text-gold hover:text-gold-dark transition-colors">
                  Gift Boxes
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </>
  )
}
