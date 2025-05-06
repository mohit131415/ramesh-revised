import { create } from "zustand"
import { persist } from "zustand/middleware"

// Create a theme store
const useThemeStore = create(
  persist(
    (set) => ({
      // Theme state - always light for this project
      theme: "light",

      // Toggle theme function (does nothing in this case)
      toggleTheme: () => {
        console.log("Theme toggling is disabled")
      },
    }),
    {
      name: "theme-store",
    },
  ),
)

export default useThemeStore
