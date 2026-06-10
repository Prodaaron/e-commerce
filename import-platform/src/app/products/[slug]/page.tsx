import "@/styles/products.css";
import { getProductBySlug } from "@/lib/firebase/products";
import { notFound } from "next/navigation";

export default async function ProductDetailsPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    return notFound();
  }

  return (
    <div className="container section">
      <div className="product-details">
        <div className="product-details-image">
          <img
            src={product.images?.[0] || "https://via.placeholder.com/600"}
            alt={product.title}
          />
        </div>

        <div className="product-details-info">
          <h1 className="product-details-title">
            {product.title}
          </h1>

          <p className="product-details-price">
            {product.price} ETB
          </p>

          <div className="product-delivery">
            <strong>Estimated Delivery:</strong> 10–18 Days
          </div>

          <div className="product-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          <button className="buy-button">
            Order Now
          </button>

          {/* Debug (keep for now) */}
          <p className="product-slug">
            Product ID: {product.slug}
          </p>
        </div>
      </div>
    </div>
  );
}