"use client";

import { useEffect, useState } from "react";
import { getCart } from "./cart";

const CART_EVENT = "cart_updated";

export default function useCartCount() {
  const [count, setCount] = useState(0);

  const updateCount = () => {
    const cart = getCart();

    const totalItems = cart.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    setCount(totalItems);
  };

  useEffect(() => {
    updateCount();

    const handleUpdate = () => updateCount();

    window.addEventListener(CART_EVENT, handleUpdate);

    return () => {
      window.removeEventListener(CART_EVENT, handleUpdate);
    };
  }, []);

  return count;
}