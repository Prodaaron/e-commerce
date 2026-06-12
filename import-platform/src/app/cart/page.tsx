"use client";

import { useEffect, useState } from "react";

import "@/styles/cart.css";
import ProtectedRoute from "@/components/common/ProtectedRoute";

import {
  getCart,
  getCartTotal,
} from "@/lib/cart/cart";

import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "@/lib/cart/cart";

import { CartItem } from "@/types/cart";
import { getFinalPrice } from "@/lib/cart/cart";

import { createOrderFromCart } from "@/lib/orders/createOrderFromCart";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [subtotal, setSubtotal] = useState(0);

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleRequestOrder = async () => {
    try {
      setLoading(true);

      const orderId = await createOrderFromCart();

      alert("Order created successfully!");

      router.push("/orders");
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Failed to create order");
    } finally {
      setLoading(false);
    }
  };

  const loadCart = () => {
    const cart = getCart();
    setItems(cart);

    const total = cart.reduce((sum, item) => {
      const finalPrice = getFinalPrice(item.price, item.discount);
      return sum + finalPrice * item.quantity;
    }, 0);

    setSubtotal(total);
  };

  useEffect(() => {
    loadCart();
  }, []);

  if (items.length === 0) {
    return (
      <ProtectedRoute>
        <div className="container section">
          <h1 className="page-title">
            Shopping Cart
          </h1>

          <p>Your cart is empty.</p>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="container section">
        <h1 className="page-title">
          Shopping Cart
        </h1>

        <div className="cart-layout">
          {/* CART ITEMS */}
          <div className="cart-items">
            {items.map((item) => (
              <div
                key={item.productId}
                className="cart-item"
              >
                <div>
                  <h3>{item.title}</h3>

                  <p>
                    Quantity: {item.quantity}
                  </p>

                  <div style={{ display: "flex", gap: "8px" }}>
                    <button
                      onClick={() => {
                        increaseQuantity(item.productId);
                        loadCart();
                      }}
                    >
                      +
                    </button>

                    <button
                      onClick={() => {
                        decreaseQuantity(item.productId);
                        loadCart();
                      }}
                    >
                      -
                    </button>

                    <button
                      onClick={() => {
                        removeFromCart(item.productId);
                        loadCart();
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div className="cart-price">
                  {item.discount ? (
                    <>
                      <p style={{ textDecoration: "line-through", opacity: 0.6 }}>
                        {item.price.toLocaleString()} ETB
                      </p>

                      <p style={{ fontWeight: "bold" }}>
                        {getFinalPrice(item.price, item.discount).toLocaleString()} ETB
                      </p>
                    </>
                  ) : (
                    <p>{item.price.toLocaleString()} ETB</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* SUMMARY */}
          <div className="cart-summary">
            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>
                {subtotal.toLocaleString()} ETB
              </span>
            </div>

            <button
              className="buy-button"
              onClick={handleRequestOrder}
              disabled={loading}
            >
              {loading ? "Processing..." : "Request Order"}
            </button>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}