// types/product.ts

export interface Product {
  id: string;
  sellerId: string;

  title: string;
  slug: string;

  description: string;

  price: number;

  images: string[];

  status: "active" | "draft" | "archived";

  createdAt: Date;
  updatedAt: Date;
}