import "@/styles/products.css";

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Temporary dummy data
  const product = {
    title: "Dior Sauvage 100ml",
    priceETB: 8500,
    description:
      "Authentic imported fragrance sourced from China. Long-lasting scent suitable for daily and formal use.",
    image: "https://via.placeholder.com/600x600",
    estimatedDelivery: "10-18 Days",
  };

  return (
    <div className="container section">
      <div className="product-details">
        <div className="product-details-image">
          <img
            src={product.image}
            alt={product.title}
          />
        </div>

        <div className="product-details-info">
          <h1 className="product-details-title">
            {product.title}
          </h1>

          <p className="product-details-price">
            {product.priceETB.toLocaleString()} ETB
          </p>

          <div className="product-delivery">
            <strong>Estimated Delivery:</strong>{" "}
            {product.estimatedDelivery}
          </div>

          <div className="product-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          <button className="buy-button">
            Order Now
          </button>

          {/* Temporary for testing */}
          <p className="product-slug">
            Product ID: {slug}
          </p>
        </div>
      </div>
    </div>
  );
}