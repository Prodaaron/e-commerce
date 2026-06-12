import { db } from "./config";
import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

import { Order } from "@/types/order";

export async function createOrder(
  order: Omit<Order, "id" | "createdAt" | "updatedAt">
) {
  const docRef = await addDoc(collection(db, "orders"), {
    ...order,

    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return docRef.id;
}