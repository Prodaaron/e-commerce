import { db } from "./config";
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
} from "firebase/firestore";

import { Order } from "@/types/order";

export async function getUserOrders(userId: string): Promise<Order[]> {
  const q = query(
    collection(db, "orders"),
    where("customerId", "==", userId),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => {
    const data = doc.data();

    return {
      id: doc.id,
      ...data,
    } as Order;
  });
}