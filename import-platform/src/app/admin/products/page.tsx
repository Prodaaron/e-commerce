import "@/styles/admin.css";

export default function AdminProductsPage() {
  const products = [
    {
      id: 1,
      title: "Dior Sauvage 100ml",
      price: 8500,
      status: "Active",
    },
    {
      id: 2,
      title: "Nike Air Force 1",
      price: 7000,
      status: "Active",
    },
  ];

  return (
    <>
      <div className="admin-page-header">
        <h1>Products</h1>

        <button className="admin-primary-button">
          Add Product
        </button>
      </div>

      <div className="admin-table">
        <div className="admin-table-head">
          <span>Product</span>
          <span>Price</span>
          <span>Status</span>
          <span>Actions</span>
        </div>

        {products.map((product) => (
          <div
            key={product.id}
            className="admin-table-row"
          >
            <span>{product.title}</span>

            <span>
              {product.price.toLocaleString()} ETB
            </span>

            <span>{product.status}</span>

            <div className="admin-actions">
              <button>Edit</button>
              <button>Change Status</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}