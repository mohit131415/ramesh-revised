import { Suspense, lazy } from "react"
import { Routes, Route } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { RootLayout } from "./components/layout/root-layout"
import LoadingSpinner from "./components/common/loading-spinner"

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

// Lazy load pages for better performance
const HomePage = lazy(() => import("./pages/home-page"))
const ProductsPage = lazy(() => import("./pages/products-page"))
const ProductDetailPage = lazy(() => import("./pages/product-detail-page"))
const CartPage = lazy(() => import("./pages/cart-page"))
const CheckoutPage = lazy(() => import("./pages/checkout-page"))
const AboutPage = lazy(() => import("./pages/about-page"))
const ContactPage = lazy(() => import("./pages/contact-page"))
const CorporateGiftsPage = lazy(() => import("./pages/corporate-gifts-page"))
const WeddingGiftsPage = lazy(() => import("./pages/wedding-gifts-page"))
const BulkOrderPage = lazy(() => import("./pages/bulk-order-page"))
const FestivalSpecialsPage = lazy(() => import("./pages/festival-specials-page"))
const GiftHampersPage = lazy(() => import("./pages/gift-hampers-page"))
const CategoriesPage = lazy(() => import("./pages/categories-page"))
const SubcategoryListPage = lazy(() => import("./pages/subcategory-list-page"))
const PrivacyPolicyPage = lazy(() => import("./pages/privacy-policy-page"))
const TermsOfServicePage = lazy(() => import("./pages/terms-of-service-page"))
const ReturnPolicyPage = lazy(() => import("./pages/return-policy-page"))
const NotFoundPage = lazy(() => import("./pages/not-found-page"))

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense
        fallback={
          <div className="flex justify-center items-center min-h-screen">
            <LoadingSpinner size="lg" />
          </div>
        }
      >
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/product/slug/:slug" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/corporate-gifts" element={<CorporateGiftsPage />} />
            <Route path="/wedding-gifts" element={<WeddingGiftsPage />} />
            <Route path="/bulk-order" element={<BulkOrderPage />} />
            <Route path="/festival-specials" element={<FestivalSpecialsPage />} />
            <Route path="/gift-hampers" element={<GiftHampersPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/categories/:categoryId/subcategories" element={<SubcategoryListPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-of-service" element={<TermsOfServicePage />} />
            <Route path="/return-policy" element={<ReturnPolicyPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
