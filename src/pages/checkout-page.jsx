"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { CheckCircle, ArrowLeft } from "lucide-react"
import { Button } from "../components/ui/button"
import CheckoutForm from "../components/cart/checkout-form"
import OrderSummary from "../components/checkout/order-summary"
import PaymentOptions from "../components/checkout/payment-options"
import { useCart } from "../context/cart-context"
import { useToast } from "../components/ui/use-toast"
import CartHeader from "../components/cart/cart-header"

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { items, totalAmount, clearCart } = useCart()
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState("shipping")
  const [orderComplete, setOrderComplete] = useState(false)
  const [shippingDetails, setShippingDetails] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState(null)

  // Redirect to cart if cart is empty
  if (items.length === 0 && !orderComplete) {
    navigate("/cart")
    return null
  }

  const handleShippingSubmit = (data) => {
    setShippingDetails(data)
    setCurrentStep("payment")
    window.scrollTo(0, 0)
  }

  const handlePaymentSubmit = (method) => {
    setPaymentMethod(method)

    // Simulate payment processing
    toast({
      title: "Processing payment...",
      description: "Please wait while we process your payment.",
    })

    setTimeout(() => {
      setOrderComplete(true)
      clearCart()
      window.scrollTo(0, 0)

      toast({
        title: "Order placed successfully!",
        description: "Thank you for your order. You will receive a confirmation email shortly.",
      })
    }, 2000)
  }

  const handleBackToShipping = () => {
    setCurrentStep("shipping")
    window.scrollTo(0, 0)
  }

  // Order complete view
  if (orderComplete) {
    return (
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>

            <h1 className="text-3xl font-display font-bold mb-4">Order Placed Successfully!</h1>
            <p className="text-muted-foreground mb-8">
              Thank you for your order. We've received your order and will begin processing it right away. You will
              receive an email confirmation shortly.
            </p>

            <div className="bg-cream/30 rounded-lg p-6 mb-8 text-left">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Order Number:</span>
                  <span className="font-medium">RS-{Math.floor(Math.random() * 10000)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Order Date:</span>
                  <span className="font-medium">{new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Method:</span>
                  <span className="font-medium">{paymentMethod}</span>
                </div>
                <div className="flex justify-between border-t border-gold/10 pt-2 mt-2">
                  <span>Total Amount:</span>
                  <span className="font-semibold text-gold-dark">₹{totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => navigate("/")} className="bg-gold hover:bg-gold-dark text-white">
                Continue Shopping
              </Button>
              <Button variant="outline" onClick={() => navigate("/account/orders")}>
                View Order
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-16">
      {/* Replace the existing header with our new CartHeader */}
      <CartHeader title="Checkout" itemCount={items.length} />

      <div className="container mx-auto px-4">
        {/* Checkout Steps */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex justify-between">
            <div className={`flex-1 text-center ${currentStep === "shipping" ? "font-semibold text-gold-dark" : ""}`}>
              <div
                className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center mb-2 ${
                  currentStep === "shipping" ? "bg-gold text-white" : "bg-muted text-muted-foreground"
                }`}
              >
                1
              </div>
              Shipping
            </div>
            <div className={`flex-1 text-center ${currentStep === "payment" ? "font-semibold text-gold-dark" : ""}`}>
              <div
                className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center mb-2 ${
                  currentStep === "payment" ? "bg-gold text-white" : "bg-muted text-muted-foreground"
                }`}
              >
                2
              </div>
              Payment
            </div>
          </div>
          <div className="relative h-1 bg-muted mt-4">
            <div
              className="absolute top-0 left-0 h-full bg-gold transition-all duration-300"
              style={{ width: currentStep === "shipping" ? "50%" : "100%" }}
            ></div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Main Content */}
          <div className="md:col-span-2">
            {currentStep === "shipping" ? (
              <>
                <CheckoutForm onSubmit={handleShippingSubmit} />
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" className="mb-4" onClick={handleBackToShipping}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Shipping
                </Button>
                <PaymentOptions onSubmit={handlePaymentSubmit} />
              </>
            )}
          </div>

          {/* Order Summary */}
          <div>
            <OrderSummary items={items} />
          </div>
        </div>
      </div>
    </div>
  )
}

