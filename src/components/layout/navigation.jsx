"use client"

import { Link, useLocation } from "react-router-dom"
import { cn } from "../../lib/utils"

export default function Navigation() {
  const location = useLocation()

  return (
    <nav className="hidden lg:block">
      <ul className="flex items-center gap-6">
        <li>
          <Link
            to="/"
            className={cn(
              "text-sm font-cinzel font-medium transition-colors hover:text-gold",
              location.pathname === "/" ? "text-gold font-semibold" : "text-black",
            )}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/products"
            className={cn(
              "text-sm font-cinzel font-medium transition-colors hover:text-gold",
              location.pathname === "/products" ? "text-gold font-semibold" : "text-black",
            )}
          >
            Sweets Library
          </Link>
        </li>
        <li>
          <Link
            to="/categories"
            className={cn(
              "text-sm font-cinzel font-medium transition-colors hover:text-gold",
              location.pathname === "/categories" ? "text-gold font-semibold" : "text-black",
            )}
          >
            Categories
          </Link>
        </li>
        <li>
          <Link
            to="/corporate-gifts"
            className={cn(
              "text-sm font-cinzel font-medium transition-colors hover:text-gold",
              location.pathname === "/corporate-gifts" ? "text-gold font-semibold" : "text-black",
            )}
          >
            Corporate Gifts
          </Link>
        </li>
        <li>
          <Link
            to="/wedding-gifts"
            className={cn(
              "text-sm font-cinzel font-medium transition-colors hover:text-gold",
              location.pathname === "/wedding-gifts" ? "text-gold font-semibold" : "text-black",
            )}
          >
            Wedding Gifts
          </Link>
        </li>
        <li>
          <Link
            to="/bulk-order"
            className={cn(
              "text-sm font-cinzel font-medium transition-colors hover:text-gold",
              location.pathname === "/bulk-order" ? "text-gold font-semibold" : "text-black",
            )}
          >
            Bulk Order
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            className={cn(
              "text-sm font-cinzel font-medium transition-colors hover:text-gold",
              location.pathname === "/contact" ? "text-gold font-semibold" : "text-black",
            )}
          >
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  )
}
