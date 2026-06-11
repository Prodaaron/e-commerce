import Link from "next/link";
import "@/styles/products.css";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const discount = product.discount;

  const hasDiscount =
  discount !== undefined &&
  discount !== null &&
  discount.value > 0;

  let finalPrice = product.price;

  if (hasDiscount) {
    if (discount?.type === "percent") {
      finalPrice =
        product.price -
        (product.price * discount.value) / 100;
    }

    if (discount?.type === "fixed") {
      finalPrice = product.price - discount.value;
    }
  }

  const productLink = product.slug
    ? `/products/${product.slug}`
    : "#";

  console.log("PRODUCT IN CARD:", product);
  console.log("SLUG VALUE:", product.slug);

  return (
    <div className="product-card">
      <img
        src={product.images?.[0] || "https://via.placeholder.com/250"}
        alt={product.title}
        className="product-image"
      />

      <div className="product-content">
        <h3 className="product-title">
          {product.title}
        </h3>

        {/* PRICE SECTION (NEW) */}
        <div className="product-price">
          {hasDiscount ? (
            <>
              <span className="old-price">
                {product.price.toLocaleString()} ETB
              </span>

              <span className="new-price">
                {finalPrice.toLocaleString()} ETB
              </span>
            </>
          ) : (
            <span>
              {product.price.toLocaleString()} ETB
            </span>
          )}
        </div>

        <Link href={productLink}>
          <button className="product-button">
            View Product
          </button>
        </Link>
      </div>
    </div>
  );
}