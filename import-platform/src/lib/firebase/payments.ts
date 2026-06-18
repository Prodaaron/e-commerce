import {
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "@/lib/firebase/config";
import {
  Payment,
  PaymentProofStorageRef,
  PaymentStatus,
} from "@/types/payment";

interface CreatePaymentInput {
  orderId: string;
  customerId: string;
  amount: number;
  proof: PaymentProofStorageRef;
}

function buildPaymentProof(proof: PaymentProofStorageRef) {
  return {
    provider: proof.provider,
    uploadedAt: proof.uploadedAt,
    ...(proof.url ? { url: proof.url } : {}),
    ...(proof.fileId ? { fileId: proof.fileId } : {}),
    ...(proof.path ? { path: proof.path } : {}),
    ...(proof.bucket ? { bucket: proof.bucket } : {}),
    ...(proof.originalFileName
      ? { originalFileName: proof.originalFileName }
      : {}),
    ...(proof.mimeType ? { mimeType: proof.mimeType } : {}),
    ...(typeof proof.size === "number" ? { size: proof.size } : {}),
    ...(typeof proof.archived === "boolean"
      ? { archived: proof.archived }
      : {}),
    ...(proof.archivedAt ? { archivedAt: proof.archivedAt } : {}),
  };
}

export async function createPaymentProof({
  orderId,
  customerId,
  amount,
  proof,
}: CreatePaymentInput) {
  const paymentProof = buildPaymentProof(proof);

  const docRef = await addDoc(collection(db, "payments"), {
    orderId,
    customerId,
    amount,
    proof: paymentProof,
    ...(paymentProof.url ? { proofImageUrl: paymentProof.url } : {}),
    status: "pending",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return docRef.id;
}

export async function getPaymentByOrderId(
  orderId: string,
  customerId?: string
): Promise<Payment | null> {
  const filters = [
    where("orderId", "==", orderId),
    ...(customerId ? [where("customerId", "==", customerId)] : []),
  ];

  const q = query(
    collection(db, "payments"),
    ...filters
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) return null;

  const doc = snapshot.docs[0];
  const data = doc.data();

  return {
    id: doc.id,
    ...data,
    proof:
      data.proof ||
      (data.proofImageUrl
        ? {
            provider: "external",
            url: data.proofImageUrl,
            uploadedAt: data.createdAt?.toDate?.() ?? new Date(),
          }
        : undefined),
  } as Payment;
}

export async function getAllPayments(): Promise<Payment[]> {
  const q = query(
    collection(db, "payments"),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => {
    const data = doc.data();

    return {
      id: doc.id,
      ...data,
      proof:
        data.proof ||
        (data.proofImageUrl
          ? {
              provider: "external",
              url: data.proofImageUrl,
              uploadedAt: data.createdAt?.toDate?.() ?? new Date(),
            }
          : undefined),
    } as Payment;
  });
}

export async function updatePaymentStatus(
  paymentId: string,
  status: PaymentStatus,
  verifiedBy?: string
) {
  const ref = doc(db, "payments", paymentId);

  await updateDoc(ref, {
    status,
    ...(verifiedBy ? { verifiedBy } : {}),
    updatedAt: serverTimestamp(),
  });
}

export function getPaymentProofUrl(payment: Payment) {
  return payment.proof?.url || payment.proofImageUrl || "";
}

export function getPaymentProofProviderLabel(payment: Payment) {
  return payment.proof?.provider?.replaceAll("_", " ") || "external";
}