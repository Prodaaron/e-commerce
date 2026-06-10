import "@/styles/cart.css";
import ProtectedRoute from "@/components/common/ProtectedRoute";

export default function CartPage() {
  const items = [
    {
      id: 1,
      title: "Dior Sauvage 100ml",
      price: 8500,
      quantity: 1,
    },
    {
      id: 2,
      title: "Nike Air Force 1",
      price: 7000,
      quantity: 1,
    },
  ];

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <ProtectedRoute>
      <div className="container section">
        <h1 className="page-title">
          Shopping Cart
        </h1>

        <div className="cart-layout">
          <div className="cart-items">
            {items.map((item) => (
              <div
                key={item.id}
                className="cart-item"
              >
                <div>
                  <h3>{item.title}</h3>

                  <p>
                    Quantity: {item.quantity}
                  </p>
                </div>

                <p className="cart-price">
                  {item.price.toLocaleString()} ETB
                </p>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>
                {subtotal.toLocaleString()} ETB
              </span>
            </div>

            <button className="buy-button">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}