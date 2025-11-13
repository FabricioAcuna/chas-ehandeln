const strapiUrl =
  process.env.EXPO_PUBLIC_STRAPI_URL || 
  process.env.NEXT_PUBLIC_STRAPI_URL || 
  'http://localhost:1337';

if (!process.env.NEXT_PUBLIC_STRAPI_URL && process.env.EXPO_PUBLIC_STRAPI_URL) {
  process.env.NEXT_PUBLIC_STRAPI_URL = process.env.EXPO_PUBLIC_STRAPI_URL;
}

export const STRAPI_BASE_URL = strapiUrl;

export const getStrapiImageUrl = (imageUrl: string | null | undefined): string | null => {
  if (!imageUrl) return null;
  
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    const url = new URL(imageUrl);
    if (url.hostname === 'localhost' || url.hostname === '127.0.0.1') {
      const strapiUrlObj = new URL(STRAPI_BASE_URL);
      url.hostname = strapiUrlObj.hostname;
      url.port = strapiUrlObj.port;
      return url.toString();
    }
    return imageUrl;
  }
  
  return `${STRAPI_BASE_URL}${imageUrl}`;
};

