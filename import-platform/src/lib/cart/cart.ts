import { CartItem } from "@/types/cart";

const CART_EVENT = "cart_updated";

/**
 * Emit event so UI (cart icon, pages) updates instantly
 */
export function emitCartUpdate() {
  window.dispatchEvent(new Event(CART_EVENT));
}

/**
 * USER-SAFE CART KEY
 * - Each user has their own cart
 * - Falls back to guest cart if no user
 */
function getCartKey(userId?: string) {
  return userId ? `arosa-cart_${userId}` : "arosa-cart";
}

/**
 * GET CART
 */
export function getCart(userId?: string): CartItem[] {
  if (typeof window === "undefined") return [];

  const cart = localStorage.getItem(getCartKey(userId));

  if (!cart) return [];

  return JSON.parse(cart);
}

/**
 * SAVE CART
 */
export function saveCart(cart: CartItem[], userId?: string) {
  localStorage.setItem(getCartKey(userId), JSON.stringify(cart));
}

/**
 * ADD TO CART
 */
export function addToCart(
  item: CartItem & { userId?: string }
) {
  const cart = getCart(item.userId);

  const existingItem = cart.find(
    (cartItem) => cartItem.productId === item.productId
  );

  if (existingItem) {
    existingItem.quantity += item.quantity;
  } else {
    cart.push(item);
  }

  saveCart(cart, item.userId);
  emitCartUpdate();
}

/**
 * REMOVE ITEM
 */
export function removeFromCart(productId: string, userId?: string) {
  const updatedCart = getCart(userId).filter(
    (item) => item.productId !== productId
  );

  saveCart(updatedCart, userId);
  emitCartUpdate();
}

/**
 * INCREASE QUANTITY
 */
export function increaseQuantity(productId: string, userId?: string) {
  const cart = getCart(userId);

  const item = cart.find((item) => item.productId === productId);

  if (!item) return;

  item.quantity += 1;

  saveCart(cart, userId);
  emitCartUpdate();
}

/**
 * DECREASE QUANTITY
 */
export function decreaseQuantity(productId: string, userId?: string) {
  const cart = getCart(userId);

  const item = cart.find((item) => item.productId === productId);

  if (!item) return;

  item.quantity -= 1;

  if (item.quantity <= 0) {
    const updated = cart.filter((i) => i.productId !== productId);
    saveCart(updated, userId);
    emitCartUpdate();
    return;
  }

  saveCart(cart, userId);
  emitCartUpdate();
}

/**
 * CLEAR CART
 */
export function clearCart(userId?: string) {
  saveCart([], userId);
  emitCartUpdate();
}

/**
 * DISCOUNT CALCULATION
 */
export function getDiscountedPrice(
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

/**
 * CART TOTAL
 */
export function getCartTotal(userId?: string) {
  const cart = getCart(userId);

  return cart.reduce((total, item) => {
    const discountedPrice = getDiscountedPrice(
      item.price,
      item.discount
    );

    return total + discountedPrice * item.quantity;
  }, 0);
}

/**
 * FINAL PRICE (single product)
 */
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