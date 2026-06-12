"use client";

import "@/styles/orders.css";
import Link from "next/link";
import ProtectedRoute from "@/components/common/ProtectedRoute";

import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";

import { getUserOrders } from "@/lib/firebase/getUserOrders";
import { Order } from "@/types/order";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) return;

        const data = await getUserOrders(user.uid);

        setOrders(data);
      } catch (err) {
        console.error("Failed to load orders", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="container section">
          <h1 className="page-title">My Orders</h1>
          <p>Loading orders...</p>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="container section">
        <h1 className="page-title">My Orders</h1>

        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-card-header">
                <h3>Order #{order.id}</h3>

                <span className="order-status">
                  {order.status.replaceAll("_", " ")}
                </span>
              </div>

              {/* show first item */}
              <p className="order-product">
                {order.items?.[0]?.title}
                {order.items && order.items.length > 1 && " + more"}
              </p>

              <p className="order-delivery">
                Expected Delivery:{" "}
                {order.estimatedDelivery || "TBD"}
              </p>

              <Link
                href={`/orders/${order.id}`}
                className="order-link"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}