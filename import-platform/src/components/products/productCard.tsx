import Link from "next/link";
import "@/styles/products.css";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
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

        <p className="product-price">
          {product.price} ETB
        </p>

        <Link href={`/products/${product.slug}`}>
          <button className="product-button">
            View Product
          </button>
        </Link>
      </div>
    </div>
  );
}