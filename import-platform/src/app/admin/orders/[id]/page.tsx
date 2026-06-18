"use client";

import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import OrderTimeline from "@/components/orders/OrderTimeline";
import "@/styles/orders.css";
import ProtectedRoute from "@/components/common/ProtectedRoute";

import { auth } from "@/lib/firebase/config";
import { getOrderById } from "@/lib/firebase/getOrderById";
import {
  createPaymentProof,
  getPaymentByOrderId,
  getPaymentProofProviderLabel,
  getPaymentProofUrl,
} from "@/lib/firebase/payments";
import { uploadFileToImageKit } from "@/lib/imagekit/upload";
import { Order } from "@/types/order";
import { Payment } from "@/types/payment";

export default function OrderDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const [order, setOrder] = useState<Order | null>(null);
  const [payment, setPayment] = useState<Payment | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploadingPayment, setUploadingPayment] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getOrderById(id);
        setOrder(data);

        const paymentData = data
          ? await getPaymentByOrderId(id, data.customerId)
          : null;
        setPayment(paymentData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const handlePaymentUpload = async (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    const user = auth.currentUser;

    if (!file || !order || !user) return;

    setUploadingPayment(true);

    try {
      const proof = await uploadFileToImageKit(
        file,
        "/payments"
      );

      const paymentId = await createPaymentProof({
        orderId: order.id,
        customerId: user.uid,
        amount: order.totalAmount,
        proof,
      });

      setPayment({
        id: paymentId,
        orderId: order.id,
        customerId: user.uid,
        amount: order.totalAmount,
        proof,
        proofImageUrl: proof.url,
        status: "pending",
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      alert("Payment proof uploaded successfully");
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Failed to upload payment proof");
    } finally {
      setUploadingPayment(false);
      e.target.value = "";
    }
  };

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

        {order.deliveryInfo && (
          <div className="order-details-card">
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

        <p>
          Total: {order.totalAmount.toLocaleString()} ETB
        </p>

        <div className="order-details-card">
          <h3>Payment Proof</h3>

          {payment ? (
            <>
              <p>Status: {payment.status}</p>
              <p>
                Stored With: {getPaymentProofProviderLabel(payment)}
              </p>

              {getPaymentProofUrl(payment) ? (
                <a
                  href={getPaymentProofUrl(payment)}
                  target="_blank"
                  rel="noreferrer"
                  className="order-link"
                >
                  View uploaded proof
                </a>
              ) : (
                <p>
                  Proof is recorded, but no public viewing link is
                  available.
                </p>
              )}
            </>
          ) : order.status === "pending_payment" ? (
            <>
              <p>
                Upload your payment screenshot so the admin can verify
                your order.
              </p>

              <label className="payment-upload-field">
                Upload Payment Proof
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePaymentUpload}
                  disabled={uploadingPayment}
                />
              </label>

              {uploadingPayment && <p>Uploading payment proof...</p>}
            </>
          ) : (
            <p>No payment proof has been uploaded for this order.</p>
          )}
        </div>

        <OrderTimeline currentStatus={order.status} />
      </div>
    </ProtectedRoute>
  );
}