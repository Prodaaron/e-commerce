"use client";

import { addToCart } from "@/lib/cart/cart";
import { Product } from "@/types/product";

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({
  product,
}: AddToCartButtonProps) {
  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      title: product.title,
      slug: product.slug,
      image: product.images[0] || "",
      price: product.price,
      discount: product.discount,
      quantity: 1,
    });

    alert("Added to cart");
  };

  return (
    <button
      onClick={handleAddToCart}
      className="btn-primary"
    >
      Add To Cart
    </button>
  );
}