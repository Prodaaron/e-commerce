"use client";

import { useEffect, useState } from "react";
import AdminRoute from "@/components/common/AdminRoute";
import "@/styles/admin.css";

import { getAllUsers } from "@/lib/firebase/user";
import { User } from "@/types/user";

function formatDate(date: Date) {
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const users = await getAllUsers();
        setCustomers(
          users.filter((user) => user.role === "customer")
        );
      } catch (err) {
        console.error("Failed to load customers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  if (loading) {
    return (
      <AdminRoute>
        <div className="container section">
          <h1>Loading customers...</h1>
        </div>
      </AdminRoute>
    );
  }

  return (
    <AdminRoute>
      <>
        <div className="admin-page-header">
          <h1>Customers</h1>
        </div>

        {customers.length === 0 ? (
          <div className="admin-card">
            <p>No customers found yet.</p>
          </div>
        ) : (
          <div className="admin-table">
            <div className="admin-table-head admin-customers-grid">
              <span>Name</span>
              <span>Email</span>
              <span>Phone</span>
              <span>Joined</span>
              <span>Role</span>
            </div>

            {customers.map((customer) => (
              <div
                key={customer.id}
                className="admin-table-row admin-customers-grid"
              >
                <span>{customer.fullName || "Unnamed customer"}</span>
                <span>{customer.email}</span>
                <span>{customer.phone || "Not set"}</span>
                <span>{formatDate(customer.createdAt)}</span>
                <span>
                  <span className="status-badge">
                    {customer.role}
                  </span>
                </span>
              </div>
            ))}
          </div>
        )}
      </>
    </AdminRoute>
  );
}