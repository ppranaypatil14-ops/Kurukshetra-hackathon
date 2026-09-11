/**
 * Centralized Application Configuration
 *
 * Switch between development (http://localhost:8000) and production
 * via the VITE_API_BASE_URL environment variable.
 */
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'
