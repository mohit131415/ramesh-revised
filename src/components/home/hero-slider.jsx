"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "../../lib/utils"
import { UniversalButton } from "../ui/universal-button"

// Updated slider data using hero images with buttonText property
const sliderData = [
  {
    id: 1,
    title: "Authentic Sindhi Sweets",
    subtitle: "HERITAGE & TRADITION",
    description: "Experience the rich flavors of traditional Sindhi delicacies crafted with age-old family recipes",
    image: "/images/hero/kaju-katli-box.png",
    link: "/products?category=sindhi-special",
    buttonText: "Explore Heritage",
  },
  {
    id: 2,
    title: "Celebration Collection",
    subtitle: "FESTIVE DELIGHTS",
    description: "Elevate your special occasions with our handcrafted festive sweets made with premium ingredients",
    image: "/images/hero/assorted-sweets-red-rose.png",
    link: "/products?category=festive",
    buttonText: "View Collection",
  },
  {
    id: 3,
    title: "Premium Gift Boxes",
    subtitle: "SIGNATURE CREATIONS",
    description: "Exquisite gift boxes featuring our finest selection of traditional and contemporary sweets",
    image: "/images/hero/yellow-sweets-pink-roses.png",
    link: "/products?category=gift-boxes",
    buttonText: "Shop Gift Boxes",
  },
  {
    id: 4,
    title: "Gulab Jamun Special",
    subtitle: "CLASSIC FAVORITES",
    description: "Our signature Gulab Jamun, made with khoya and soaked in aromatic sugar syrup with cardamom",
    image: "/images/hero/gulab-jamun-almonds.png",
    link: "/products?category=classic",
    buttonText: "Discover Classics",
  },
  {
    id: 5,
    title: "Seasonal Delights",
    subtitle: "LIMITED EDITION",
    description: "Seasonal specialties crafted with the freshest ingredients for a truly memorable experience",
    image: "/images/hero/gulab-jamun-yellow-roses.png",
    link: "/products?category=seasonal",
    buttonText: "Limited Editions",
  },
  {
    id: 6,
    title: "Assorted Sweet Boxes",
    subtitle: "CURATED COLLECTIONS",
    description: "Handpicked assortments of our most popular sweets, perfect for gifting or special occasions",
    image: "/images/hero/assorted-sweets-dates.png",
    link: "/products?category=assorted",
    buttonText: "Browse Assortments",
  },
  {
    id: 7,
    title: "Artisanal Sweet Boxes",
    subtitle: "LUXURY COLLECTION",
    description: "Our signature collection of premium sweets arranged in elegant gift boxes perfect for any occasion",
    image: "/images/hero/premium-sweets-box-sunflower.png",
    link: "/products?category=premium",
    buttonText: "Luxury Selection",
  },
]

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const [direction, setDirection] = useState(0)
  const slideTimerRef = useRef(null)

  // Preload images
  useEffect(() => {
    const preloadImages = async () => {
      setIsTransitioning(true)
      const imagePromises = sliderData.map((slide) => {
        return new Promise((resolve) => {
          const img = new Image()
          img.src = slide.image
          img.onload = () => resolve()
        })
      })

      await Promise.all(imagePromises)
      setImagesLoaded(true)
      setIsTransitioning(false)
    }

    preloadImages()
  }, [])

  // Auto-advance the slider
  useEffect(() => {
    if (slideTimerRef.current) {
      clearTimeout(slideTimerRef.current)
    }

    slideTimerRef.current = setTimeout(() => {
      if (!isTransitioning) {
        goToNextSlide()
      }
    }, 6000)

    return () => {
      if (slideTimerRef.current) {
        clearTimeout(slideTimerRef.current)
      }
    }
  }, [currentSlide, isTransitioning])

  // Navigation functions
  const goToNextSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setDirection(1)
    setCurrentSlide((prev) => (prev === sliderData.length - 1 ? 0 : prev + 1))
    setTimeout(() => setIsTransitioning(false), 800)
  }

  const goToPrevSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setDirection(-1)
    setCurrentSlide((prev) => (prev === 0 ? sliderData.length - 1 : prev - 1))
    setTimeout(() => setIsTransitioning(false), 800)
  }

  const goToSlide = (index) => {
    if (index === currentSlide || isTransitioning) return
    setIsTransitioning(true)
    setDirection(index > currentSlide ? 1 : -1)
    setCurrentSlide(index)
    setTimeout(() => setIsTransitioning(false), 800)
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        goToPrevSlide()
      } else if (e.key === "ArrowRight") {
        goToNextSlide()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentSlide, isTransitioning])

  // Animation variants
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? "5%" : "-5%",
      opacity: 0,
      scale: 1.05,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "tween", duration: 0.8, ease: [0.16, 1, 0.3, 1] },
        opacity: { duration: 0.7 },
        scale: { duration: 0.7 },
      },
    },
    exit: (direction) => ({
      x: direction > 0 ? "-5%" : "5%",
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: "tween", duration: 0.8, ease: [0.16, 1, 0.3, 1] },
        opacity: { duration: 0.7 },
        scale: { duration: 0.7 },
      },
    }),
  }

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2 + custom * 0.1,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  return (
    <section
      className="relative h-screen w-full overflow-hidden bg-black"
      aria-roledescription="carousel"
      aria-label="Product showcase"
    >
      {/* Loading screen */}
      {!imagesLoaded && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black">
          <div className="flex flex-col items-center">
            <img src="/images/ramesh-logo.svg" alt="Ramesh Sweets Logo" className="w-32 h-32 object-contain mb-6" />
            <div className="relative w-48 h-0.5 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 h-full bg-gold"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </div>
            <p className="mt-4 text-gold/80 font-cinzel text-sm tracking-widest">LOADING EXPERIENCE</p>
          </div>
        </div>
      )}

      {/* Background Images */}
      <div className="absolute inset-0" aria-live="polite" aria-atomic="true">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={`slide-${currentSlide}`}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0"
          >
            {/* Image with very subtle overlay */}
            <div className="relative w-full h-full">
              <img
                src={sliderData[currentSlide].image || "/placeholder.svg"}
                alt=""
                className="w-full h-full object-cover object-center"
              />

              {/* Very light gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/15 to-transparent"></div>

              {/* Subtle vignette */}
              <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/15 mix-blend-overlay"></div>

              {/* Gold accent overlay */}
              <div className="absolute inset-0 bg-gold/5 mix-blend-overlay"></div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="absolute inset-0 z-10 flex items-center">
        <div className="container mx-auto px-8">
          <div className="max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div key={`content-${currentSlide}`} initial="hidden" animate="visible" exit="exit">
                {/* Subtitle */}
                <motion.div variants={textVariants} custom={0} className="mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="h-px w-12 bg-gold"></div>
                    <p className="font-cinzel text-gold tracking-[0.25em] text-sm">
                      {sliderData[currentSlide].subtitle}
                    </p>
                  </div>
                </motion.div>

                {/* Title with subtle backdrop for readability */}
                <motion.div variants={textVariants} custom={1} className="mb-6 relative inline-block">
                  <h1 className="font-cinzel text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight [text-shadow:0_2px_4px_rgba(0,0,0,0.4)]">
                    {sliderData[currentSlide].title}
                  </h1>
                </motion.div>

                {/* Divider */}
                <motion.div variants={textVariants} custom={2} className="w-24 h-0.5 bg-gold mb-6"></motion.div>

                {/* Description with subtle backdrop for readability */}
                <motion.div variants={textVariants} custom={3} className="mb-10 relative">
                  <p className="font-eb-garamond text-xl text-white/90 leading-relaxed max-w-xl [text-shadow:0_1px_3px_rgba(0,0,0,0.4)]">
                    {sliderData[currentSlide].description}
                  </p>
                </motion.div>

                {/* Button - Using UniversalButton */}
                <motion.div variants={textVariants} custom={4}>
                  <UniversalButton as="a" href={sliderData[currentSlide].link} size="lg">
                    {sliderData[currentSlide].buttonText}
                  </UniversalButton>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-12 left-8 z-20 flex space-x-6">
        <button
          className="w-12 h-12 flex items-center justify-center border border-gold/50 text-gold hover:bg-gold/10 transition-colors duration-300"
          onClick={goToPrevSlide}
          aria-label="Previous slide"
          disabled={isTransitioning}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          className="w-12 h-12 flex items-center justify-center border border-gold/50 text-gold hover:bg-gold/10 transition-colors duration-300"
          onClick={goToNextSlide}
          aria-label="Next slide"
          disabled={isTransitioning}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-12 right-8 z-20 flex items-center space-x-2">
        {sliderData.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "w-12 h-0.5 transition-all duration-300",
              currentSlide === index ? "bg-gold" : "bg-white/30 hover:bg-white/50",
            )}
            aria-label={`Go to slide ${index + 1}`}
            disabled={isTransitioning}
          />
        ))}
      </div>

      {/* Slide Number */}
      <div className="absolute top-12 right-8 z-20">
        <p className="font-cinzel text-gold">
          <span className="text-2xl">{currentSlide + 1}</span>
          <span className="mx-1 text-gold/50">/</span>
          <span className="text-sm text-gold/70">{sliderData.length}</span>
        </p>
      </div>
    </section>
  )
}
