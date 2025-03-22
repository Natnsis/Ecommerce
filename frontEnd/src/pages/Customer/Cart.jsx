import { useState, useEffect } from "react";
import axios from "axios";

const Cart = () => {
    const [cart, setCart] = useState([]);

    // Fetch cart from the backend when the component loads
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await axios.get("http://localhost:4000/get-cart", { withCredentials: true });
                setCart(response.data.cartItems || []); // Set the cart from the backend response
            } catch (error) {
                console.error("Error fetching cart:", error);
            }
        };

        fetchCart();
    }, []);

    // Remove an item from the cart
    const removeFromCart = async (pid) => {
        const updatedCart = cart.filter((item) => item.pid !== pid); // Remove the item with the given pid
        setCart(updatedCart); // Update the cart state

        try {
            await axios.post(
                "http://localhost:4000/save-cart",
                { cartItems: updatedCart },
                { withCredentials: true }
            );
        } catch (error) {
            console.error("Error saving updated cart:", error);
        }
    };

    // Handle checkout
    const handleCheckout = async () => {
        try {
            const response = await axios.post(
                "http://localhost:4000/create-checkout-session",
                { cartItems: cart },
                { withCredentials: true }
            );
            window.location.href = response.data.url; // Redirect to Stripe Checkout
        } catch (error) {
            console.error("Error during checkout:", error);
            alert("Failed to initiate checkout. Please try again.");
        }
    };

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-5 text-center">Your Cart</h1>
            {cart.length === 0 ? (
                <p className="text-center text-gray-500">Your cart is empty.</p>
            ) : (
                <div className="space-y-4">
                    {cart.map((item) => (
                        <div
                            key={item.pid}
                            className="flex flex-col md:flex-row justify-between items-center border p-4 rounded-lg shadow-md"
                        >
                            <div className="text-center md:text-left">
                                <h2 className="text-lg font-bold">{item.pname}</h2>
                                <p>Price: {item.price} USD</p>
                                <p>Quantity: {item.quantity}</p>
                            </div>
                            <button
                                onClick={() => removeFromCart(item.pid)}
                                className="bg-red-500 text-white px-3 py-1 rounded-lg mt-3 md:mt-0"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <div className="flex justify-center">
                        <button
                            onClick={handleCheckout}
                            className="bg-green-500 text-white px-5 py-2 rounded-lg mt-5 hover:bg-green-600 transition duration-300"
                        >
                            Pay Now
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;