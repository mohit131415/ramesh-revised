import { formatPrice } from "../../lib/utils"
import useCartStore from "../../store/cartStore"

export default function OrderSummary() {
  const { items } = useCartStore()

  // Calculate summary values
  const subtotal = items.reduce((total, item) => {
    const price = typeof item.price === "number" ? item.price : Number.parseFloat(item.price.replace(/[^\d.]/g, ""))
    return total + price * item.quantity
  }, 0)

  const shipping = subtotal > 500 ? 0 : 50
  const tax = Math.round(subtotal * 0.05) // 5% tax
  const total = subtotal + shipping + tax

  return (
    <div className="bg-cream/30 rounded-lg p-6 sticky top-24">
      <h2 className="text-xl font-display font-semibold mb-4">Order Summary</h2>

      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-md overflow-hidden mr-3">
                <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
              </div>
            </div>
            <p className="font-medium">
              {typeof item.price === "number"
                ? formatPrice(item.price * item.quantity)
                : `${item.price} × ${item.quantity}`}
            </p>
          </div>
        ))}
      </div>

      <div className="space-y-2 border-t border-gold/10 pt-4">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Shipping</span>
          <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Tax (5%)</span>
          <span>{formatPrice(tax)}</span>
        </div>

        <div className="border-t border-gold/10 pt-2 flex justify-between font-semibold">
          <span>Total</span>
          <span className="text-gold-dark">{formatPrice(total)}</span>
        </div>
      </div>

      <p className="text-xs text-muted-foreground text-center mt-4">Free shipping on orders above ₹500</p>
    </div>
  )
}
