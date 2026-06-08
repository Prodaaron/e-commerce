import Link from "next/link";
import "@/styles/products.css";

interface ProductCardProps {
  title: string;
  priceETB: number;
  image: string;
  slug: string;
}

export default function ProductCard({
  title,
  priceETB,
  image,
  slug,
}: ProductCardProps) {
  return (
    <div className="product-card">
      <img
        src={image}
        alt={title}
        className="product-image"
      />

      <div className="product-content">
        <h3 className="product-title">
          {title}
        </h3>

        <p className="product-price">
          {priceETB} ETB
        </p>

        <Link href={`/products/${slug}`}>
          <button className="product-button">
            View Product
          </button>
        </Link>
      </div>
    </div>
  );
}