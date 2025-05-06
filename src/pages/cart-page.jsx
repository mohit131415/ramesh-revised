"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { ShoppingBag, ArrowRight } from "lucide-react"
import { Button } from "../components/ui/button"
import SectionHeader from "../components/common/section-header"
import CartItem from "../components/cart/cart-item"
import CartSummary from "../components/cart/cart-summary"
import CheckoutForm from "../components/cart/checkout-form"
import useCartStore from "../store/cartStore"
import CartHeader from "../components/cart/cart-header"

export default function CartPage() {
  const { items, totalItems } = useCartStore()
  const [isCheckout, setIsCheckout] = useState(false)
  const [isOrderComplete, setIsOrderComplete] = useState(false)

  const handleCheckout = () => {
    setIsCheckout(true)
    window.scrollTo(0, 0)
  }

  const handleBackToCart = () => {
    setIsCheckout(false)
  }

  const handleOrderComplete = () => {
    setIsOrderComplete(true)
    window.scrollTo(0, 0)
  }

  // Order complete view
  if (isOrderComplete) {
    return (
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>

            <h1 className="text-3xl font-display font-bold mb-4">Order Placed Successfully!</h1>
            <p className="text-muted-foreground mb-8">
              Thank you for your order. We've received your order and will begin processing it right away. You will
              receive an email confirmation shortly.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link to="/" className="flex items-center">
                  Continue Shopping
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/account/orders">View Order</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Checkout view
  if (isCheckout) {
    return (
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <CheckoutForm onBack={handleBackToCart} onComplete={handleOrderComplete} />
        </div>
      </div>
    )
  }

  // Empty cart view
  if (items.length === 0) {
    return (
      <div className="pt-24 pb-16">
        {/* Replace the existing header with our new CartHeader */}
        <CartHeader
          title="Your Shopping Cart"
          description="Browse our delicious sweets and add items to your cart"
          itemCount={0}
        />

        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-6">
              <ShoppingBag className="h-8 w-8 text-muted-foreground" />
            </div>

            <h2 className="text-2xl font-display font-semibold mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">
              Looks like your cart is empty. Browse our delicious sweets and add some items to your cart.
            </p>

            <Button asChild className="bg-gold hover:bg-gold-dark text-white">
              <Link to="/products" className="flex items-center">
                Browse Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Cart view with items
  return (
    <div className="pt-24 pb-16">
      {/* Replace the existing header with our new CartHeader */}
      <CartHeader
        title="Your Shopping Cart"
        description="Review your items and proceed to checkout"
        itemCount={totalItems}
      />

      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <SectionHeader title={`Your Items (${totalItems})`} className="mb-4" />

            <div className="bg-white rounded-lg shadow-sm p-6 border border-gold/5">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          </div>

          <div>
            <SectionHeader title="Summary" className="mb-4" />

            <CartSummary onCheckout={handleCheckout} />
          </div>
        </div>
      </div>
    </div>
  )
}
