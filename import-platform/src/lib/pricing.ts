import { Product } from "@/types/product";

export function getPricing(product: Product) {
  const basePrice = product.price;

  if (!product.discount) {
    return {
      basePrice,
      finalPrice: basePrice,
      hasDiscount: false,
      discountText: null,
    };
  }

  let finalPrice = basePrice;
  let discountText = "";

  if (product.discount.type === "percent") {
    finalPrice = Math.round(basePrice * (1 - product.discount.value / 100));
    discountText = `-${product.discount.value}%`;
  }

  if (product.discount.type === "fixed") {
    finalPrice = Math.max(0, basePrice - product.discount.value);
    discountText = `- ${product.discount.value} ETB`;
  }

  return {
    basePrice,
    finalPrice,
    hasDiscount: finalPrice < basePrice,
    discountText,
  };
}