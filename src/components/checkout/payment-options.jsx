"use client"

import { useState } from "react"
import { CreditCard, Landmark, Wallet } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Card, CardContent } from "../../components/ui/card"
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group"
import { Label } from "../../components/ui/label"
import { Input } from "../../components/ui/input"

export default function PaymentOptions({ onSubmit }) {
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate payment processing
    setTimeout(() => {
      onSubmit(paymentMethod === "card" ? "Credit Card" : paymentMethod === "upi" ? "UPI" : "Cash on Delivery")
      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <div>
      <h2 className="text-2xl font-display font-semibold mb-6">Payment Method</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
          <Card className={`border-2 ${paymentMethod === "card" ? "border-gold" : "border-transparent"}`}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card" className="flex items-center cursor-pointer">
                  <CreditCard className="h-5 w-5 mr-2 text-gold" />
                  Credit / Debit Card
                </Label>
              </div>

              {paymentMethod === "card" && (
                <div className="mt-4 space-y-4 pl-6">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" required={paymentMethod === "card"} />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input id="expiryDate" placeholder="MM/YY" required={paymentMethod === "card"} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" required={paymentMethod === "card"} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nameOnCard">Name on Card</Label>
                    <Input id="nameOnCard" placeholder="John Doe" required={paymentMethod === "card"} />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className={`border-2 ${paymentMethod === "upi" ? "border-gold" : "border-transparent"}`}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="upi" id="upi" />
                <Label htmlFor="upi" className="flex items-center cursor-pointer">
                  <Wallet className="h-5 w-5 mr-2 text-gold" />
                  UPI Payment
                </Label>
              </div>

              {paymentMethod === "upi" && (
                <div className="mt-4 space-y-4 pl-6">
                  <div className="space-y-2">
                    <Label htmlFor="upiId">UPI ID</Label>
                    <Input id="upiId" placeholder="name@upi" required={paymentMethod === "upi"} />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className={`border-2 ${paymentMethod === "cod" ? "border-gold" : "border-transparent"}`}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="cod" id="cod" />
                <Label htmlFor="cod" className="flex items-center cursor-pointer">
                  <Landmark className="h-5 w-5 mr-2 text-gold" />
                  Cash on Delivery
                </Label>
              </div>

              {paymentMethod === "cod" && (
                <div className="mt-4 pl-6">
                  <p className="text-sm text-muted-foreground">
                    Pay with cash upon delivery. Available for orders under ₹2000.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </RadioGroup>

        <Button type="submit" className="w-full bg-gold hover:bg-gold-dark text-white" disabled={isSubmitting}>
          {isSubmitting ? "Processing..." : "Place Order"}
        </Button>
      </form>
    </div>
  )
}

