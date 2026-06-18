"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import "@/styles/admin.css";

import AdminRoute from "@/components/common/AdminRoute";
import {
  getAllPayments,
  getPaymentProofProviderLabel,
  getPaymentProofUrl,
} from "@/lib/firebase/payments";
import { Payment } from "@/types/payment";

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const data = await getAllPayments();
        setPayments(data);
      } catch (err) {
        console.error("Failed to load payments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  if (loading) {
    return (
      <AdminRoute>
        <div className="container section">
          <h1>Loading payments...</h1>
        </div>
      </AdminRoute>
    );
  }

  return (
    <AdminRoute>
      <>
        <div className="admin-page-header">
          <h1>Payments</h1>
        </div>

        {payments.length === 0 ? (
          <div className="admin-card">
            <p>No payment proofs have been uploaded yet.</p>
          </div>
        ) : (
          <div className="admin-table">
            <div className="admin-table-head admin-payments-grid">
              <span>Order</span>
              <span>Customer</span>
              <span>Amount</span>
              <span>Status</span>
              <span>Storage</span>
              <span>Actions</span>
            </div>

            {payments.map((payment) => {
              const proofUrl = getPaymentProofUrl(payment);

              return (
                <div
                  key={payment.id}
                  className="admin-table-row admin-payments-grid"
                >
                  <span>#{payment.orderId}</span>
                  <span>{payment.customerId}</span>
                  <span>
                    {payment.amount.toLocaleString()} ETB
                  </span>
                  <span>
                    <span className="status-badge">
                      {payment.status}
                    </span>
                  </span>
                  <span>
                    {getPaymentProofProviderLabel(payment)}
                  </span>
                  <div className="status-actions">
                    {proofUrl && (
                      <a
                        href={proofUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="admin-secondary-button"
                      >
                        Proof
                      </a>
                    )}

                    <Link
                      href={`/admin/orders/${payment.orderId}`}
                      className="admin-secondary-button"
                    >
                      Order
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </>
    </AdminRoute>
  );
}