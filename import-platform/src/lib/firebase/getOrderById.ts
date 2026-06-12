import { db } from "./config";
import { doc, getDoc } from "firebase/firestore";
import { Order } from "@/types/order";

export async function getOrderById(id: string): Promise<Order | null> {
  const ref = doc(db, "orders", id);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;

  return {
    id: snap.id,
    ...snap.data(),
  } as Order;
}