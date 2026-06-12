import { db } from "./config";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  serverTimestamp,
  orderBy,
  query,
} from "firebase/firestore";

import { Order, OrderStatus } from "@/types/order";

// GET ALL ORDERS (ADMIN)
export async function getAllOrders(): Promise<Order[]> {
  const q = query(
    collection(db, "orders"),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Order[];
}

// UPDATE ORDER STATUS
export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus,
  userId: string
) {
  const ref = doc(db, "orders", orderId);

  await updateDoc(ref, {
    status,
    updatedAt: serverTimestamp(),

    timeline: [
      {
        status,
        createdAt: new Date(),
        updatedBy: userId,
      },
    ],
  });
}