import { create } from "zustand"

export const useToastStore = create((set) => ({
  toasts: [],

  toast: ({ title, description, duration = 5000, variant = "default" }) => {
    const id = Math.random().toString(36).substring(2, 9)

    set((state) => ({
      toasts: [...state.toasts, { id, title, description, variant, duration }],
    }))

    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((toast) => toast.id !== id),
      }))
    }, duration)

    return id
  },

  dismissToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }))
  },
}))
