"use client";

import { addToCart } from "@/lib/cart/cart";
import { Product } from "@/types/product";
import { auth } from "@/lib/firebase/config";
import { useRouter } from "next/navigation";

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({
  product,
}: AddToCartButtonProps) {
  const router = useRouter();

  const handleAddToCart = () => {
    const user = auth.currentUser;

    if (!user) {
      alert("Please log in to add items to cart");
      router.push("/auth/login");
      return;
    }

    addToCart({
      productId: product.id,
      title: product.title,
      slug: product.slug,
      image: product.images[0] || "",
      price: product.price,
      discount: product.discount,
      quantity: 1,

      // ✅ THIS is the correct field now
      userId: user.uid,
    });

    alert("Added to cart");
  };

  return (
    <button onClick={handleAddToCart} className="btn-primary">
      Add To Cart
    </button>
  );
}