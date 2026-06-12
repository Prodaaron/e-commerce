"use client";

import { useEffect, useState } from "react";
import { getCart } from "./cart";
import { auth } from "@/lib/firebase/config";

const CART_EVENT = "cart_updated";

export default function useCartCount() {
  const [count, setCount] = useState(0);

  const updateCount = () => {
    const user = auth.currentUser;

    if (!user) {
      setCount(0);
      return;
    }

    const cart = getCart(user.uid);

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
      window.removeEventListener(
        CART_EVENT,
        handleUpdate
      );
    };
  }, []);

  return count;
}