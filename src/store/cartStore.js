import { create } from "zustand"
import { persist } from "zustand/middleware"

// Helper function to calculate totals
const calculateTotals = (items) => {
  const totalItems = items.reduce((total, item) => total + item.quantity, 0)
  const totalAmount = items.reduce((total, item) => {
    const price = typeof item.price === "number" ? item.price : Number.parseFloat(item.price.replace(/[^\d.]/g, ""))
    return total + price * item.quantity
  }, 0)
  return { totalItems, totalAmount }
}

// Create a cart store
const useCartStore = create(
  persist(
    (set, get) => ({
      // Cart state
      items: [],
      totalItems: 0,
      totalAmount: 0,
      recentlyAdded: null,

      // Add item to cart
      addItem: (item, quantity = 1) => {
        const { items } = get()
        const existingItemIndex = items.findIndex((i) => i.id === item.id)
        let updatedItems = [...items]
        let newQuantity = quantity

        if (existingItemIndex !== -1) {
          // Item exists, update quantity
          newQuantity = updatedItems[existingItemIndex].quantity + quantity
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantity: newQuantity,
          }
        } else {
          // Add new item
          updatedItems = [...items, { ...item, quantity }]
        }

        const { totalItems, totalAmount } = calculateTotals(updatedItems)

        set({
          items: updatedItems,
          totalItems,
          totalAmount,
          recentlyAdded: { ...item, quantity: newQuantity },
        })
      },

      // Remove item from cart
      removeItem: (id) => {
        const { items } = get()
        const updatedItems = items.filter((item) => item.id !== id)
        const { totalItems, totalAmount } = calculateTotals(updatedItems)

        set({
          items: updatedItems,
          totalItems,
          totalAmount,
          recentlyAdded: null,
        })
      },

      // Update item quantity
      updateQuantity: (id, quantity) => {
        const { items } = get()

        if (quantity <= 0) {
          // If quantity is 0 or negative, remove the item
          return get().removeItem(id)
        }

        const updatedItems = items.map((item) => (item.id === id ? { ...item, quantity } : item))

        const { totalItems, totalAmount } = calculateTotals(updatedItems)

        set({
          items: updatedItems,
          totalItems,
          totalAmount,
          recentlyAdded: null,
        })
      },

      // Clear cart
      clearCart: () => {
        set({
          items: [],
          totalItems: 0,
          totalAmount: 0,
          recentlyAdded: null,
        })
      },

      // Clear recently added notification
      clearRecentlyAdded: () => {
        set({
          recentlyAdded: null,
        })
      },
    }),
    {
      name: "cart-store",
    },
  ),
)

export default useCartStore
