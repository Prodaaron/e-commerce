"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import "@/styles/admin.css";

import AdminRoute from "@/components/common/AdminRoute";
import {
  getAllOrders,
  updateOrderStatus,
} from "@/lib/firebase/adminOrder";

import { Order, OrderStatus } from "@/types/order";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // =========================
  // FETCH ORDERS
  // =========================
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getAllOrders();
        setOrders(data);
      } catch (err) {
        console.error("Failed to load orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // =========================
  // UPDATE STATUS
  // =========================
  const handleStatusChange = async (
    orderId: string,
    status: OrderStatus
  ) => {
    try {
      await updateOrderStatus(orderId, status, "admin");

      // update UI instantly (no refetch needed)
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId
            ? { ...order, status }
            : order
        )
      );
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  // =========================
  // LOADING STATE
  // =========================
  if (loading) {
    return (
      <AdminRoute>
        <div className="container section">
          <h1>Loading orders...</h1>
        </div>
      </AdminRoute>
    );
  }

  // =========================
  // MAIN UI
  // =========================
  return (
    <AdminRoute>
      <>
        <div className="admin-page-header">
          <h1>Orders</h1>
        </div>

        <div className="admin-table">
          {/* HEADER */}
          <div className="admin-table-head admin-orders-grid">
            <span>Order ID</span>
            <span>Customer</span>
            <span>Product</span>
            <span>Status</span>
            <span>Actions</span>
          </div>

          {/* ROWS */}
          {orders.map((order) => (
            <div
              key={order.id}
              className="admin-table-row admin-orders-grid"
            >
              {/* ORDER ID */}
              <span>#{order.id}</span>

              {/* CUSTOMER */}
              <span>{order.customerId}</span>

              {/* PRODUCT (first item preview) */}
              <span>
                {order.items?.[0]?.title ||
                  "Multiple items"}
              </span>

              {/* STATUS */}
              <span>
                <span className="status-badge">
                  {order.status.replaceAll("_", " ")}
                </span>
              </span>

              {/* ACTIONS */}
              <div className="status-actions">
                <select
                  className="admin-select"
                  defaultValue={order.status}
                  onChange={(e) => {
                    const newStatus = e.target.value as OrderStatus;

                    if (newStatus !== order.status) {
                      handleStatusChange(order.id, newStatus);
                    }
                  }}
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

                {/* 👇 ADD THIS */}
                <Link
                  href={`/admin/orders/${order.id}`}
                  className="admin-secondary-button"
                  style={{ marginLeft: "8px" }}
                >
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      </>
    </AdminRoute>
  );
}