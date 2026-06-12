import { db, auth } from "@/lib/firebase/config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { CartItem } from "@/types/cart";
import { OrderStatus } from "@/types/order";

export async function createOrder(items: CartItem[]) {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User not logged in");
  }

  const totalAmount = items.reduce((sum, item) => {
    const price =
      item.discount?.type === "percent"
        ? item.price - (item.price * item.discount.value) / 100
        : item.discount?.type === "fixed"
        ? item.price - item.discount.value
        : item.price;

    return sum + price * item.quantity;
  }, 0);

  const order = {
    customerId: user.uid,

    items,

    totalAmount,

    status: "pending_payment" as OrderStatus,

    timeline: [
      {
        status: "pending_payment",
        createdAt: new Date(),
        updatedBy: user.uid,
      },
    ],

    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  const docRef = await addDoc(collection(db, "orders"), order);

  return docRef.id;
}