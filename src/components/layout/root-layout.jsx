"use client"

import { Outlet, useLocation } from "react-router-dom"
import { useEffect } from "react"
import Header from "./header"
import Footer from "./footer"
import AnnouncementBar from "./announcement-bar"

export function RootLayout() {
  const { pathname } = useLocation()

  useEffect(() => {
    // Scroll to the top of the page with smooth animation when route changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    })
  }, [pathname])

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <AnnouncementBar />
      <Header />
      <main className="flex-1 pb-16 lg:pb-0">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
