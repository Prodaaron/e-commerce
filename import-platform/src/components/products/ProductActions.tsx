"use client";

import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase/config";
import { addToCart } from "@/lib/cart/cart";
import AddToCartButton from "@/components/cart/AddToCartButton";
import { Product } from "@/types/product";

interface Props {
  product: Product;
}

export default function ProductActions({ product }: Props) {
  const router = useRouter();

  const handleOrderNow = async () => {
    const user = auth.currentUser;

    if (!user) {
      alert("Please log in first");
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
      userId: user.uid,
    });

    router.push("/cart");
  };

  return (
    <div>
      <button onClick={handleOrderNow} className="buy-button">
        Order Now
      </button>

      <AddToCartButton product={product} />
    </div>
  );
}