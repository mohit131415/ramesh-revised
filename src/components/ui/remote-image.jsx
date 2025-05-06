"use client"

import { useState } from "react"
import apiClient from "../../services/api-client"

export default function RemoteImage({ src, alt, className, fallbackSrc = "/placeholder.svg", ...props }) {
  const [error, setError] = useState(false)

  // Use the API client to get the correct image URL
  const getActualSrc = () => {
    if (error) return fallbackSrc
    return apiClient.getImageUrl(src)
  }

  return (
    <img
      src={getActualSrc() || "/placeholder.svg"}
      alt={alt}
      className={className}
      onError={() => setError(true)}
      {...props}
    />
  )
}
