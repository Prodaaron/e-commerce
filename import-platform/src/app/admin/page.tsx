"use client";

import { useEffect, useState } from "react";
import "@/styles/admin.css";
import AdminRoute from "@/components/common/AdminRoute";

import { getAllOrders } from "@/lib/firebase/adminOrder";
import { getAllPayments } from "@/lib/firebase/payments";
import { getAdminProducts } from "@/lib/firebase/products";
import { getAllUsers } from "@/lib/firebase/user";

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    pendingPayments: 0,
    customers: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [products, orders, payments, users] =
          await Promise.all([
            getAdminProducts(),
            getAllOrders(),
            getAllPayments(),
            getAllUsers(),
          ]);

        setStats({
          products: products.length,
          orders: orders.length,
          pendingPayments: payments.filter(
            (payment) => payment.status === "pending"
          ).length,
          customers: users.filter(
            (user) => user.role === "customer"
          ).length,
        });
      } catch (err) {
        console.error("Failed to load dashboard stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <AdminRoute>
      <>
        <div className="admin-page-header">
          <h1>Dashboard</h1>
        </div>

        {loading ? (
          <div className="admin-card">
            <p>Loading dashboard...</p>
          </div>
        ) : (
          <div className="admin-stats">
            <div className="admin-stat-card">
              <h3>Products</h3>
              <p>{stats.products}</p>
            </div>

            <div className="admin-stat-card">
              <h3>Orders</h3>
              <p>{stats.orders}</p>
            </div>

            <div className="admin-stat-card">
              <h3>Pending Payments</h3>
              <p>{stats.pendingPayments}</p>
            </div>

            <div className="admin-stat-card">
              <h3>Customers</h3>
              <p>{stats.customers}</p>
            </div>
          </div>
        )}
      </>
    </AdminRoute>
  );
}
