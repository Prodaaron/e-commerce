"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import OrderTimeline from "@/components/orders/OrderTimeline";
import "@/styles/orders.css";
import ProtectedRoute from "@/components/common/ProtectedRoute";

import { getOrderById } from "@/lib/firebase/getOrderById";
import { Order } from "@/types/order";

export default function OrderDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getOrderById(id);
        setOrder(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="container section">
          <h1>Loading...</h1>
        </div>
      </ProtectedRoute>
    );
  }

  if (!order) {
    return (
      <ProtectedRoute>
        <div className="container section">
          <h1>Order not found</h1>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="container section">
        <h1>Order #{order.id}</h1>

        <div style={{ marginBottom: "20px" }}>
          {order.items?.map((item) => (
            <div key={item.productId}>
              <p>
                {item.title} × {item.quantity}
              </p>
            </div>
          ))}
        </div>

        <p>
          Estimated Delivery: {order.estimatedDelivery || "TBD"}
        </p>

        <p>
          Total: {order.totalAmount.toLocaleString()} ETB
        </p>

        <OrderTimeline currentStatus={order.status} />
      </div>
    </ProtectedRoute>
  );
}