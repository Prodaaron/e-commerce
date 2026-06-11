export interface Product {
  id: string;

  sellerId: string;

  title: string;
  slug: string;

  description: string;

  price: number;

  images: string[];

  category: string;

  status: "active" | "draft" | "archived";

  featured: boolean;

  createdAt: Date;
  updatedAt: Date;

  discount?: {
    type: "percent" | "fixed";
    value: number;
  };
}