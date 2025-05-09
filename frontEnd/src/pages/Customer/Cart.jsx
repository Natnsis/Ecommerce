import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LanguageContext } from "../../context/LanguageContext";

const Cart = () => {
  const { translations } = useContext(LanguageContext); // Access translations
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get("http://localhost:4000/get-cart", {
          withCredentials: true,
        });
        console.log(
          "Cart items fetched from backend:",
          response.data.cartItems
        ); // Debugging log
        setCart(response.data.cartItems || []);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, []);

  const removeFromCart = async (pid) => {
    const updatedCart = cart.filter((item) => item.pid !== pid);
    setCart(updatedCart);

    try {
      await axios.post(
        "http://localhost:4000/save-cart",
        { cartItems: updatedCart },
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Error saving updated cart:", error);
      alert(translations.updateCartError); // Use translation for error message
    }
  };

  const handleCheckout = async () => {
    try {
      console.log("Cart items being sent to backend:", cart); // Debugging log
      const response = await axios.post(
        "http://localhost:4000/create-checkout-session",
        { cartItems: cart },
        { withCredentials: true }
      );

      if (response.data.message === "All items are already paid.") {
        alert(translations.allItemsPaid); // Use translation for this message
      } else if (response.data.url) {
        window.location.href = response.data.url; // Redirect to Stripe Checkout
      } else {
        alert(translations.unexpectedServerResponse); // Use translation for unexpected response
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      alert(translations.checkoutError); // Use translation for error message
    }
  };

  const handleGoBack = () => {
    navigate("/Cdash");
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5 text-center">
        {translations.yourCart}
      </h1>
      {cart.length === 0 ? (
        <p className="text-center text-gray-500">{translations.emptyCart}</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.pid}
              className="flex flex-col md:flex-row justify-between items-center border p-4 rounded-lg shadow-md"
            >
              <div className="text-center md:text-left">
                <h2 className="text-lg font-bold">{item.pname}</h2>
                <p>
                  {translations.price}: {item.price} USD
                </p>
                <p>
                  {translations.quantity}: {item.quantity}
                </p>
                <p
                  className={`font-semibold ${
                    item.payed ? "text-green-500" : "text-yellow-500"
                  }`}
                >
                  {translations.status}:{" "}
                  {item.payed ? translations.paid : translations.pending}
                </p>
              </div>
              <button
                onClick={() => removeFromCart(item.pid)}
                className="bg-red-500 text-white px-3 py-1 rounded-lg mt-3 md:mt-0"
              >
                {translations.remove}
              </button>
            </div>
          ))}
          <div className="flex justify-center">
            <button
              onClick={handleCheckout}
              className="bg-green-500 text-white px-5 py-2 rounded-lg mt-5 hover:bg-green-600 transition duration-300"
            >
              {translations.payNow}
            </button>
          </div>
        </div>
      )}
      <div className="flex justify-center mt-5">
        <button
          onClick={handleGoBack}
          className="bg-gray-500 text-white px-5 py-2 rounded-lg hover:bg-gray-700 transition duration-300"
        >
          {translations.goBack}
        </button>
      </div>
    </div>
  );
};

export default Cart;
