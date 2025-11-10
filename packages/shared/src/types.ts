export type ImageFormat = {
  url: string;
  width: number;
  height: number;
};

export type ProductImage = {
  id: number;
  name: string;
  alternativeText: string;
  caption: string;
  url: string;
  formats: {
    thumbnail?: ImageFormat;
    small?: ImageFormat;
    medium?: ImageFormat;
    large?: ImageFormat;
  };
};

export type Product = {
  id: number;
  documentId: string;
  name: string;
  price: number;
  description: any;
  inStock: boolean | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  image?: ProductImage[];
};
