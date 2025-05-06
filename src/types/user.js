/**
 * User type definitions
 * @typedef {Object} User
 * @property {number|string} id - Unique user ID
 * @property {string} firstName - User's first name
 * @property {string} lastName - User's last name
 * @property {string} email - User's email address
 * @property {string} [phone] - User's phone number
 * @property {string} [avatar] - User's avatar URL
 * @property {Array<Address>} [addresses] - User's saved addresses
 * @property {string} role - User's role
 * @property {string} createdAt - Account creation date
 * @property {boolean} emailVerified - Whether the email is verified
 * @property {boolean} phoneVerified - Whether the phone is verified
 */

/**
 * Address type definition
 * @typedef {Object} Address
 * @property {number|string} id - Unique address ID
 * @property {string} type - Address type (e.g., 'home', 'work')
 * @property {string} firstName - First name
 * @property {string} lastName - Last name
 * @property {string} addressLine1 - Address line 1
 * @property {string} [addressLine2] - Address line 2
 * @property {string} city - City
 * @property {string} state - State/Province
 * @property {string} postalCode - Postal/ZIP code
 * @property {string} country - Country
 * @property {string} phone - Phone number
 * @property {boolean} isDefault - Whether this is the default address
 */

/**
 * AuthResponse type definition
 * @typedef {Object} AuthResponse
 * @property {string} token - Authentication token
 * @property {User} user - User information
 */

/**
 * LoginCredentials type definition
 * @typedef {Object} LoginCredentials
 * @property {string} email - User's email
 * @property {string} password - User's password
 */

/**
 * RegisterData type definition
 * @typedef {Object} RegisterData
 * @property {string} firstName - User's first name
 * @property {string} lastName - User's last name
 * @property {string} email - User's email
 * @property {string} password - User's password
 * @property {string} [phone] - User's phone number
 */

/**
 * UserRole enum
 * @readonly
 * @enum {string}
 */
export const UserRole = {
    CUSTOMER: "customer",
    ADMIN: "admin",
    STAFF: "staff",
  }
  
  