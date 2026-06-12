"use client";

import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase/config";
import { getCart, clearCart } from "@/lib/cart/cart";
import { createOrder } from "@/lib/firebase/createOrder";
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

    const cart = getCart(user.uid);

    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    try {
      const orderId = await createOrder(cart);

      clearCart(user.uid);

      router.push(`/orders/${orderId}`);
    } catch (err) {
      console.error(err);
      alert("Failed to create order");
    }
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