/**
 * Formats a date to a readable string
 * @param {Date|string} date - The date to format
 * @param {Object} options - The formatting options
 * @returns {string} - The formatted date
 */
export function formatDate(date, options = {}) {
  const { locale = "en-IN" } = options

  return new Date(date).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...options,
  })
}

/**
 * Formats a date to a relative time string (e.g., "2 days ago")
 * @param {Date|string} date - The date to format
 * @returns {string} - The relative time string
 */
export function formatRelativeTime(date) {
  const now = new Date()
  const then = new Date(date)
  const diffInSeconds = Math.floor((now - then) / 1000)

  if (diffInSeconds < 60) {
    return "just now"
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`
  }

  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`
  }

  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 30) {
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`
  }

  const diffInMonths = Math.floor(diffInDays / 30)
  if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths > 1 ? "s" : ""} ago`
  }

  const diffInYears = Math.floor(diffInMonths / 12)
  return `${diffInYears} year${diffInYears > 1 ? "s" : ""} ago`
}

/**
 * Formats a weight in grams to a readable string
 * @param {number} weightInGrams - The weight in grams
 * @returns {string} - The formatted weight
 */
export function formatWeight(weightInGrams) {
  if (weightInGrams < 1000) {
    return `${weightInGrams}g`
  }

  return `${(weightInGrams / 1000).toFixed(1)}kg`
}

/**
 * Formats a number with commas for thousands
 * @param {number} number - The number to format
 * @returns {string} - The formatted number
 */
export function formatNumber(number) {
  return new Intl.NumberFormat("en-IN").format(number)
}

/**
 * Formats a phone number to a readable string
 * @param {string} phoneNumber - The phone number to format
 * @returns {string} - The formatted phone number
 */
export function formatPhoneNumber(phoneNumber) {
  // Format for Indian phone numbers (10 digits)
  if (!phoneNumber || phoneNumber.length !== 10) return phoneNumber

  return `+91 ${phoneNumber.slice(0, 5)} ${phoneNumber.slice(5)}`
}

/**
 * Formats an address to a readable string
 * @param {Object} address - The address object
 * @returns {string} - The formatted address
 */
export function formatAddress(address) {
  if (!address) return ""

  const { line1, line2, city, state, pincode } = address
  const parts = [line1, line2, city, state, pincode].filter(Boolean)

  return parts.join(", ")
}

/**
 * Formats a price range to a readable string
 * @param {number} min - The minimum price
 * @param {number} max - The maximum price
 * @returns {string} - The formatted price range
 */
export function formatPriceRange(min, max) {
  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  })

  return `${formatter.format(min)} - ${formatter.format(max)}`
}

/**
 * Formats a price to a readable string with currency
 * @param {number} price - The price to format
 * @returns {string} - The formatted price
 */
export function formatPrice(price) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price)
}
