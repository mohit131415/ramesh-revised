"use client"

import React from "react"

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service
    console.error("Error caught by ErrorBoundary:", error, errorInfo)
    this.setState({ errorInfo })
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="p-4 rounded-md bg-red-50 border border-red-200">
          <h2 className="text-lg font-medium text-red-800 mb-2">Something went wrong</h2>
          <p className="text-sm text-red-600 mb-4">We're sorry, but there was an error loading this component.</p>
          {this.props.fallback || null}
          <button
            onClick={() => this.setState({ hasError: false, error: null, errorInfo: null })}
            className="px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-800 text-sm rounded-md transition-colors"
          >
            Try again
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
