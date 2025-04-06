import Cfooter from "../../components/Customer/Cfooter";
import Cheader from "../../components/Customer/Cheader";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Detail = () => {
  const [product, setProduct] = useState(null);
  const [vendor, setVendor] = useState(null); // State to store vendor details
  const { id } = useParams();

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/productDetail/${id}`);
        setProduct(response.data);

        // Fetch vendor details using Vid from the product
        if (response.data.Vid) {
          const vendorResponse = await axios.get(`http://localhost:4000/vendorDetail/${response.data.Vid}`);
          setVendor(vendorResponse.data);
        }
      } catch (err) {
        console.error("Error fetching product details:", err);
      }
    };

    fetchProductDetail();
  }, [id]);

  const addToCart = async () => {
    try {
      // Send the product ID and quantity to the backend
      const response = await axios.post(
        "http://localhost:4000/save-cart",
        { pid: product.pid, quantity: 1 }, // Increment quantity by 1
        { withCredentials: true }
      );
      alert(response.data.message || "Product added to cart!");
    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert("Failed to add product to cart. Please try again.");
    }
  };

  if (!product) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  const imageUrl = `../src/Uploads/products/${product.image}`;

  return (
    <div className="pt-5 px-5">
      <Cheader />
      <div className="h-auto w-full flex justify-center items-center">
        <div className="bg-white w-full max-w-4xl border border-gray-300 space-y-6 rounded-lg p-10 shadow-lg">
          <div className="flex flex-col md:flex-row w-full space-y-6 md:space-y-0 md:space-x-6">
            {/* Product Image */}
            <div className="w-full md:w-[50%] flex justify-center">
              <img src={imageUrl} alt="Product" className="w-60 h-60 object-cover rounded-lg" />
            </div>

            {/* Product Details */}
            <div className="w-full md:w-[50%] space-y-4">
              <h2 className="text-2xl font-bold text-gray-800">{product.pname}</h2>
              <p className="text-lg text-gray-600 font-semibold">{product.price} Birr</p>
              <div className="bg-blue-100 p-4 rounded-lg">
                <p className="text-gray-700">{product.category}</p>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="bg-blue-100 p-4 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800">Description</h3>
            <p className="text-gray-700">{product.pdescription}</p>
          </div>

          {/* Add to Cart Button */}
          <div className="flex justify-center">
            <button
              onClick={addToCart}
              className="bg-green-500 text-white hover:bg-green-600 rounded-lg shadow-lg px-5 py-2 transition duration-300"
            >
              Add to Cart
            </button>
          </div>

          {/* Seller Information */}
          <div className="w-full text-center">
            <h3 className="text-lg font-semibold text-gray-800">
              Seller&apos;s Identity: {product.sellerName}
            </h3>
            {vendor && (
              <p className="text-gray-600">
                Vendor Username: <span className="font-semibold">{vendor.username}</span>
              </p>
            )}
          </div>
        </div>
      </div>
      <Cfooter />
    </div>
  );
};

export default Detail;