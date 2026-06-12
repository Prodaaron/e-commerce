export interface CartItem {
  productId: string;

  title: string;
  slug: string;

  image: string;

  price: number;

  discount?: {
    type: "percent" | "fixed";
    value: number;
  };

  quantity: number;
}