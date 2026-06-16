"use client";

import { useEffect, useState } from "react";
import "@/styles/admin.css";

import AdminRoute from "@/components/common/AdminRoute";
import { getOrderById } from "@/lib/firebase/getOrderById";
import { updateOrderStatus } from "@/lib/firebase/adminOrder";

import { Order, OrderStatus } from "@/types/order";
import { useParams } from "next/navigation";

export default function AdminOrderDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const [order, setOrder] = useState<Order | null>(null);
  const [status, setStatus] = useState<OrderStatus | "">("");
  const [loading, setLoading] = useState(true);

  // =========================
  // FETCH ORDER
  // =========================
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getOrderById(id);

        if (!data) return;

        setOrder(data);
        setStatus(data.status);
      } catch (err) {
        console.error("Failed to load order:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  // =========================
  // SAVE STATUS
  // =========================
  const handleSave = async () => {
    if (!order || !status) return;

    try {
      await updateOrderStatus(order.id, status as OrderStatus, "admin");

      setOrder({
        ...order,
        status: status as OrderStatus,
      });

      alert("Status updated successfully");
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <AdminRoute>
        <div className="container section">
          <h1>Loading order...</h1>
        </div>
      </AdminRoute>
    );
  }

  if (!order) {
    return (
      <AdminRoute>
        <div className="container section">
          <h1>Order not found</h1>
        </div>
      </AdminRoute>
    );
  }

  // =========================
  // UI
  // =========================
  return (
    <AdminRoute>
      <>
        <div className="admin-page-header">
          <h1>Order #{order.id}</h1>
        </div>

        {/* CUSTOMER INFO */}
        <div className="admin-card">
          <h3>Customer Information</h3>
          <p>Customer ID: {order.customerId}</p>
        </div>

        {order.deliveryInfo && (
          <div className="admin-card">
            <h3>Delivery Details</h3>
            <p>Name: {order.deliveryInfo.fullName}</p>
            <p>Phone: {order.deliveryInfo.phone}</p>
            <p>City: {order.deliveryInfo.city}</p>
            <p>Address: {order.deliveryInfo.address}</p>

            {order.deliveryInfo.notes && (
              <p>Notes: {order.deliveryInfo.notes}</p>
            )}
          </div>
        )}

        {/* PRODUCTS */}
        <div className="admin-card">
          <h3>Products</h3>

          {order.items?.map((item) => (
            <p key={item.productId}>
              {item.title} × {item.quantity}
            </p>
          ))}
        </div>

        {/* STATUS UPDATE */}
        <div className="admin-card">
          <h3>Update Status</h3>

          <select
            className="admin-select"
            value={status}
            onChange={(e) =>
              setStatus(e.target.value as OrderStatus)
            }
          >
            <option value="pending_payment">Pending Payment</option>
            <option value="payment_verified">Payment Verified</option>
            <option value="sourcing">Sourcing</option>
            <option value="order_filled">Order Filled</option>
            <option value="in_transit">In Transit</option>
            <option value="arrived_ethiopia">Arrived Ethiopia</option>
            <option value="ready_for_pickup">Ready for Pickup</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
            <option value="refunded">Refunded</option>
          </select>

          <button
            className="admin-primary-button"
            onClick={handleSave}
          >
            Save Status
          </button>
        </div>
      </>
    </AdminRoute>
  );
}