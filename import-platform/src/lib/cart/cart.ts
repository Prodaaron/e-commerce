import { CartItem } from "@/types/cart";
const CART_EVENT = "cart_updated";

export function emitCartUpdate() {
  window.dispatchEvent(new Event(CART_EVENT));
}

const CART_KEY = "arosa-cart";

export function getCart(): CartItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  const cart = localStorage.getItem(CART_KEY);

  if (!cart) {
    return [];
  }

  return JSON.parse(cart);
}

export function saveCart(cart: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function addToCart(item: CartItem) {
  const cart = getCart();

  const existingItem = cart.find(
    (cartItem) => cartItem.productId === item.productId
  );

  if (existingItem) {
    existingItem.quantity += item.quantity;
  } else {
    cart.push(item);
  }

  saveCart(cart);
  emitCartUpdate();
}

export function removeFromCart(productId: string) {
  const updatedCart = getCart().filter(
    (item) => item.productId !== productId
  );

  saveCart(updatedCart);
  emitCartUpdate();
}

export function increaseQuantity(productId: string) {
  const cart = getCart();

  const item = cart.find(
    (item) => item.productId === productId
  );

  if (!item) return;

  item.quantity += 1;

  saveCart(cart);
  emitCartUpdate();
}

export function decreaseQuantity(productId: string) {
  const cart = getCart();

  const item = cart.find(
    (item) => item.productId === productId
  );

  if (!item) return;

  item.quantity -= 1;

  if (item.quantity <= 0) {
    const updated = cart.filter(
      (i) => i.productId !== productId
    );

    saveCart(updated);
    emitCartUpdate();
    return;
  }

  saveCart(cart);
  emitCartUpdate();
}

export function clearCart() {
  saveCart([]);
  emitCartUpdate();
}

export function getDiscountedPrice(
  price: number,
  discount?: {
    type: "percent" | "fixed";
    value: number;
  }
) {
  if (!discount) {
    return price;
  }

  if (discount.type === "percent") {
    return price - (price * discount.value) / 100;
  }

  return Math.max(0, price - discount.value);
}

export function getCartTotal() {
  const cart = getCart();

  return cart.reduce((total, item) => {
    const discountedPrice = getDiscountedPrice(
      item.price,
      item.discount
    );

    return total + discountedPrice * item.quantity;
  }, 0);
}

export function getFinalPrice(
  price: number,
  discount?: {
    type: "percent" | "fixed";
    value: number;
  }
) {
  if (!discount) return price;

  if (discount.type === "percent") {
    return price - (price * discount.value) / 100;
  }

  return Math.max(0, price - discount.value);
}