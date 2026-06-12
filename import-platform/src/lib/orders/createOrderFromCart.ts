import { getAuth } from "firebase/auth";
import { createOrder } from "@/lib/firebase/order";
import { getCart, clearCart } from "@/lib/cart/cart";
import { OrderItem } from "@/types/order";

export async function createOrderFromCart() {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User not authenticated");
  }

  const cart = getCart(user.uid);

  if (cart.length === 0) {
    throw new Error("Cart is empty");
  }

  const items: OrderItem[] = cart.map((item) => ({
    productId: item.productId,
    title: item.title,
    price: item.price,
    quantity: item.quantity,
    discount: item.discount,
  }));

  const totalAmount = items.reduce((sum, item) => {
    const finalPrice = item.discount
      ? item.discount.type === "percent"
        ? item.price - (item.price * item.discount.value) / 100
        : item.price - item.discount.value
      : item.price;

    return sum + finalPrice * item.quantity;
  }, 0);

  const orderId = await createOrder({
    customerId: user.uid,
    items,
    totalAmount,
    status: "pending_payment",
    timeline: [
      {
        status: "pending_payment",
        createdAt: new Date(),
        updatedBy: user.uid,
      },
    ],
  });

  clearCart(user.uid);

  return orderId;
}