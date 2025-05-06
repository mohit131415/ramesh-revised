/**
 * Order type definitions
 * @typedef {Object} Order
 * @property {number|string} id - Unique order ID
 * @property {number|string} userId - User ID
 * @property {Array<OrderItem>} items - Order items
 * @property {number} subtotal - Order subtotal
 * @property {number} tax - Order tax
 * @property {number} shipping - Shipping cost
 * @property {number} discount - Discount amount
 * @property {number} total - Order total
 * @property {string} status - Order status
 * @property {string} paymentStatus - Payment status
 * @property {string} paymentMethod - Payment method
 * @property {Object} shippingAddress - Shipping address
 * @property {Object} [billingAddress] - Billing address
 * @property {string} createdAt - Order creation date
 * @property {string} [updatedAt] - Order update date
 * @property {Object} [coupon] - Applied coupon
 * @property {Object} [tracking] - Tracking information
 */

/**
 * OrderItem type definition
 * @typedef {Object} OrderItem
 * @property {number|string} productId - Product ID
 * @property {string} name - Product name
 * @property {string} [image] - Product image URL
 * @property {number|string} price - Product price
 * @property {number} quantity - Quantity ordered
 * @property {string} [weight] - Product weight
 * @property {string} [variant] - Product variant
 * @property {number} subtotal - Item subtotal (price * quantity)
 */

/**
 * Address type definition
 * @typedef {Object} Address
 * @property {string} firstName - First name
 * @property {string} lastName - Last name
 * @property {string} addressLine1 - Address line 1
 * @property {string} [addressLine2] - Address line 2
 * @property {string} city - City
 * @property {string} state - State/Province
 * @property {string} postalCode - Postal/ZIP code
 * @property {string} country - Country
 * @property {string} phone - Phone number
 * @property {string} [email] - Email address
 */

/**
 * PaymentInfo type definition
 * @typedef {Object} PaymentInfo
 * @property {string} method - Payment method
 * @property {string} status - Payment status
 * @property {string} [transactionId] - Transaction ID
 * @property {string} [paymentDate] - Payment date
 * @property {Object} [details] - Additional payment details
 */

/**
 * OrderStatus enum
 * @readonly
 * @enum {string}
 */
export const OrderStatus = {
    PENDING: "pending",
    PROCESSING: "processing",
    SHIPPED: "shipped",
    DELIVERED: "delivered",
    CANCELLED: "cancelled",
    REFUNDED: "refunded",
  }
  
  /**
   * PaymentStatus enum
   * @readonly
   * @enum {string}
   */
  export const PaymentStatus = {
    PENDING: "pending",
    PAID: "paid",
    FAILED: "failed",
    REFUNDED: "refunded",
  }
  
  /**
   * PaymentMethod enum
   * @readonly
   * @enum {string}
   */
  export const PaymentMethod = {
    CARD: "card",
    UPI: "upi",
    COD: "cod",
    WALLET: "wallet",
  }
  
  