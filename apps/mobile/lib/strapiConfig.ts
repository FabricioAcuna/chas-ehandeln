// Get Strapi URL from environment variable
// Expo uses EXPO_PUBLIC_ prefix for environment variables
// Also set NEXT_PUBLIC_STRAPI_URL for compatibility with shared strapiClient
// Fallback to localhost if not set
const strapiUrl =
  process.env.EXPO_PUBLIC_STRAPI_URL || 
  process.env.NEXT_PUBLIC_STRAPI_URL || 
  'http://localhost:1337';

// Set it for strapiClient compatibility (if not already set)
if (!process.env.NEXT_PUBLIC_STRAPI_URL && process.env.EXPO_PUBLIC_STRAPI_URL) {
  process.env.NEXT_PUBLIC_STRAPI_URL = process.env.EXPO_PUBLIC_STRAPI_URL;
}

export const STRAPI_BASE_URL = strapiUrl;

// Helper function to get full image URL from Strapi
export const getStrapiImageUrl = (imageUrl: string | null | undefined): string | null => {
  if (!imageUrl) return null;
  
  // If imageUrl already includes http, return as is
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  
  // Otherwise, prepend Strapi base URL
  return `${STRAPI_BASE_URL}${imageUrl}`;
};

