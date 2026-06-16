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

import { auth } from "@/lib/firebase/config";

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [subtotal, setSubtotal] = useState(0);

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [deliveryInfo, setDeliveryInfo] = useState({
    fullName: "",
    phone: "",
    city: "",
    address: "",
    notes: "",
  });

  const handleDeliveryChange = (
    field: keyof typeof deliveryInfo,
    value: string
  ) => {
    setDeliveryInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleRequestOrder = async () => {
    try {
      setLoading(true);

      const fullName = deliveryInfo.fullName.trim();
      const phone = deliveryInfo.phone.trim();
      const city = deliveryInfo.city.trim();
      const address = deliveryInfo.address.trim();
      const notes = deliveryInfo.notes.trim();

      if (!fullName || !phone || !city || !address) {
        alert("Please fill in your delivery details");
        return;
      }

      const orderId = await createOrderFromCart({
        fullName,
        phone,
        city,
        address,
        ...(notes ? { notes } : {}),
      });

      alert("Order created successfully!");

      router.push(`/orders/${orderId}`);
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Failed to create order");
    } finally {
      setLoading(false);
    }
  };

  const loadCart = () => {
    const user = auth.currentUser;

    if (!user) {
      setItems([]);
      setSubtotal(0);
      return;
    }

    const cart = getCart(user.uid);
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
                        increaseQuantity(
                        item.productId,
                        auth.currentUser?.uid
                      );
                        loadCart();
                      }}
                    >
                      +
                    </button>

                    <button
                      onClick={() => {
                        decreaseQuantity(
                        item.productId,
                        auth.currentUser?.uid
                      );
                        loadCart();
                      }}
                    >
                      -
                    </button>

                    <button
                      onClick={() => {
                        removeFromCart(
                        item.productId,
                        auth.currentUser?.uid
                      );
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

            <div className="checkout-form">
              <h3>Delivery Details</h3>

              <label>
                Full Name
                <input
                  type="text"
                  value={deliveryInfo.fullName}
                  onChange={(e) =>
                    handleDeliveryChange("fullName", e.target.value)
                  }
                  placeholder="Your full name"
                />
              </label>

              <label>
                Phone Number
                <input
                  type="tel"
                  value={deliveryInfo.phone}
                  onChange={(e) =>
                    handleDeliveryChange("phone", e.target.value)
                  }
                  placeholder="+251..."
                />
              </label>

              <label>
                City
                <input
                  type="text"
                  value={deliveryInfo.city}
                  onChange={(e) =>
                    handleDeliveryChange("city", e.target.value)
                  }
                  placeholder="Addis Ababa"
                />
              </label>

              <label>
                Delivery Address
                <textarea
                  value={deliveryInfo.address}
                  onChange={(e) =>
                    handleDeliveryChange("address", e.target.value)
                  }
                  placeholder="Area, building, street, or pickup details"
                  rows={3}
                />
              </label>

              <label>
                Notes
                <textarea
                  value={deliveryInfo.notes}
                  onChange={(e) =>
                    handleDeliveryChange("notes", e.target.value)
                  }
                  placeholder="Optional delivery instructions"
                  rows={3}
                />
              </label>
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