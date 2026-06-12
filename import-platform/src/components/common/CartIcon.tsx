"use client";

import Image from "next/image";
import useCartCount from "@/lib/cart/useCartCount";

export default function CartIcon() {
  const count = useCartCount();

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        gap: "6px",
        cursor: "pointer",
      }}
    >
      <Image
        src="/icons/cart-3-svgrepo-com.svg"
        alt="Cart"
        width={24}
        height={24}
      />

      {count > 0 && (
        <span
          style={{
            position: "absolute",
            top: "-6px",
            right: "-6px",
            background: "red",
            color: "white",
            borderRadius: "50%",
            fontSize: "12px",
            width: "18px",
            height: "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {count}
        </span>
      )}
    </div>
  );
}