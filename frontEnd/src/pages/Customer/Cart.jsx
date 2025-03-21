import { useState, useEffect } from "react";
import axios from "axios";

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const removeFromCart = (pid) => {
    const updatedCart = cart.filter((item) => item.pid !== pid);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleCheckout = async () => {
    try {
      const response = await axios.post("http://localhost:4000/create-checkout-session", {
        cartItems: cart,
      });
      window.location.href = response.data.url; // Redirect to Stripe Checkout
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("Failed to initiate checkout. Please try again.");
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item.pid} className="flex justify-between items-center border p-4 rounded-lg">
              <div>
                <h2 className="text-lg font-bold">{item.pname}</h2>
                <p>Price: {item.price} USD</p>
                <p>Quantity: {item.quantity}</p>
              </div>
              <button
                onClick={() => removeFromCart(item.pid)}
                className="bg-red-500 text-white px-3 py-1 rounded-lg"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={handleCheckout}
            className="bg-green-500 text-white px-5 py-2 rounded-lg mt-5"
          >
            Pay Now
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;