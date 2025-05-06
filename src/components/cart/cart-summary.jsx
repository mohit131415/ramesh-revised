"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, ShoppingBag, Gift, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Checkbox } from "../../components/ui/checkbox"
import { Label } from "../../components/ui/label"
import useCartStore from "../../store/cartStore"
import { formatPrice } from "../../lib/utils"
import { HeritageCornerDecoration, HeritageHeaderDecoration } from "../ui/heritage-decorations"

export default function CartSummary({ onCheckout }) {
  const { items, totalAmount } = useCartStore()
  const [promoCode, setPromoCode] = useState("")
  const [isGiftWrap, setIsGiftWrap] = useState(false)
  const [giftMessage, setGiftMessage] = useState("")
  const [showGiftOptions, setShowGiftOptions] = useState(false)
  const [selectedGiftBox, setSelectedGiftBox] = useState(null)

  // Gift box options
  const giftBoxOptions = [
    { id: "standard", name: "Standard Gift Box", price: 50, image: "/images/gift-boxes/standard.jpg" },
    { id: "premium", name: "Premium Gift Box", price: 150, image: "/images/gift-boxes/premium.jpg" },
    { id: "luxury", name: "Luxury Gift Box", price: 250, image: "/images/gift-boxes/luxury.jpg" },
  ]

  // Calculate summary values
  const subtotal = totalAmount
  const shipping = subtotal > 500 ? 0 : 50
  const giftWrapCost = isGiftWrap ? 50 : 0
  const giftBoxCost = selectedGiftBox ? giftBoxOptions.find((box) => box.id === selectedGiftBox)?.price || 0 : 0
  const tax = Math.round(subtotal * 0.05) // 5% tax
  const total = subtotal + shipping + giftWrapCost + giftBoxCost + tax

  const handlePromoCodeChange = (e) => {
    setPromoCode(e.target.value)
  }

  const handleApplyPromoCode = (e) => {
    e.preventDefault()
    // Promo code logic would go here
    alert(`Promo code "${promoCode}" applied!`)
  }

  const handleCheckout = () => {
    onCheckout?.()
  }

  return (
    <div className="bg-cream/30 rounded-lg p-6 relative border border-gold/10 shadow-sm">
      <HeritageCornerDecoration className="absolute inset-0" variant="corners" />

      <h2 className="text-xl font-display font-semibold mb-2 text-gold-dark">Order Summary</h2>
      <HeritageHeaderDecoration className="mb-4" />

      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Shipping</span>
          <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
        </div>

        {(isGiftWrap || selectedGiftBox) && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              {isGiftWrap && selectedGiftBox ? "Gift Wrapping & Box" : isGiftWrap ? "Gift Wrapping" : "Gift Box"}
            </span>
            <span>{formatPrice(giftWrapCost + giftBoxCost)}</span>
          </div>
        )}

        <div className="flex justify-between">
          <span className="text-muted-foreground">Tax (5%)</span>
          <span>{formatPrice(tax)}</span>
        </div>

        <div className="border-t border-gold/10 pt-3 flex justify-between font-semibold">
          <span>Total</span>
          <span className="text-gold-dark">{formatPrice(total)}</span>
        </div>
      </div>

      {/* Promo Code */}
      <form onSubmit={handleApplyPromoCode} className="mb-6">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Promo code"
            value={promoCode}
            onChange={handlePromoCodeChange}
            className="border-gold/20 focus-visible:ring-gold"
          />
          <Button
            type="submit"
            variant="outline"
            className="border-gold text-gold-dark hover:bg-gold/10"
            disabled={!promoCode}
          >
            Apply
          </Button>
        </div>
      </form>

      {/* Gift Options Toggle */}
      <div className="mb-4">
        <button
          type="button"
          onClick={() => setShowGiftOptions(!showGiftOptions)}
          className="flex w-full items-center justify-between rounded-md border border-gold/20 px-4 py-3 text-left text-sm font-medium text-gold-dark hover:bg-gold/5 focus:outline-none focus-visible:ring focus-visible:ring-gold/30"
        >
          <div className="flex items-center">
            <Gift className="h-5 w-5 mr-2 text-gold" />
            <span>Gift Options</span>
            {(isGiftWrap || selectedGiftBox) && (
              <span className="ml-2 rounded-full bg-gold/10 px-2 py-0.5 text-xs">Selected</span>
            )}
          </div>
          {showGiftOptions ? (
            <ChevronUp className="h-5 w-5 text-gold" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gold" />
          )}
        </button>
      </div>

      {/* Gift Options Panel */}
      {showGiftOptions && (
        <div className="mb-6 space-y-4 rounded-md border border-gold/10 bg-cream/50 p-4 relative">
          <HeritageCornerDecoration className="absolute inset-0" variant="inner" />
          {/* Gift Wrap Option */}
          <div className="flex items-start space-x-2">
            <Checkbox id="gift-wrap" checked={isGiftWrap} onCheckedChange={setIsGiftWrap} className="mt-1" />
            <div className="grid gap-1.5 leading-none">
              <Label htmlFor="gift-wrap" className="flex items-center">
                Add Gift Wrapping
              </Label>
              <p className="text-xs text-muted-foreground">Add premium gift wrapping for ₹50</p>
            </div>
          </div>

          {/* Gift Box Options */}
          <div className="space-y-3 pt-2">
            <Label className="text-sm font-medium">Select Gift Box (Optional)</Label>
            <div className="grid grid-cols-1 gap-2">
              {giftBoxOptions.map((box) => (
                <div
                  key={box.id}
                  className={`flex items-center space-x-3 rounded-md border p-3 cursor-pointer transition-colors ${
                    selectedGiftBox === box.id ? "border-gold bg-gold/5" : "border-gold/10 hover:border-gold/30"
                  }`}
                  onClick={() => setSelectedGiftBox(selectedGiftBox === box.id ? null : box.id)}
                >
                  <div className="h-12 w-12 rounded-md overflow-hidden bg-gold/10 flex-shrink-0">
                    <img
                      src={box.image || `/placeholder.svg?height=48&width=48`}
                      alt={box.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <p className="text-sm font-medium">{box.name}</p>
                    <p className="text-xs text-muted-foreground">₹{box.price}</p>
                  </div>
                  <Checkbox checked={selectedGiftBox === box.id} className="pointer-events-none" />
                </div>
              ))}
            </div>
          </div>

          {/* Gift Message */}
          <div className="space-y-2 pt-2">
            <Label htmlFor="gift-message" className="text-sm font-medium">
              Gift Message (Optional)
            </Label>
            <textarea
              id="gift-message"
              value={giftMessage}
              onChange={(e) => setGiftMessage(e.target.value)}
              placeholder="Add a personal message to your gift..."
              className="w-full min-h-[80px] rounded-md border border-gold/20 bg-transparent p-2 text-sm focus:border-gold focus:ring-gold"
            />
          </div>
        </div>
      )}

      {/* Checkout Button */}
      <Button
        variant="default"
        size="lg"
        className="w-full bg-gold hover:bg-gold-dark text-white"
        onClick={handleCheckout}
        disabled={items.length === 0}
      >
        {items.length === 0 ? (
          <Link to="/products" className="flex items-center justify-center w-full">
            <ShoppingBag className="mr-2 h-4 w-4" />
            Shop Now
          </Link>
        ) : (
          <>
            Proceed to Checkout
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center mt-4">Free shipping on orders above ₹500</p>
    </div>
  )
}
