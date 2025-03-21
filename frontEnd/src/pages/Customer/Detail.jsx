import Cfooter from "../../components/Customer/Cfooter";
import Cheader from "../../components/Customer/Cheader";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Detail = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/productDetail/${id}`);
        setProduct(response.data);
      } catch (err) {
        console.error("Error fetching product details:", err);
      }
    };

    fetchProductDetail();
  }, [id]);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find((item) => item.pid === product.pid);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 }); 
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart!");
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const imageUrl = `../src/Uploads/products/${product.image}`;

  return (
    <div className="pt-5 px-5">
      <Cheader />
      <div className="h-[80vh] w-full flex justify-center items-center">
        <div className="bg-white w-[75%] h-auto border border-gray-300 space-y-6 rounded-lg p-10 shadow-lg">
          <div className="flex w-full space-x-6">
            <div className="w-[50%]">
              <img src={imageUrl} alt="Product" className="w-40 rounded-lg" />
            </div>
            <div className="w-[50%] space-y-4">
              <h2 className="text-2xl font-bold text-gray-800">{product.pname}</h2>
              <p className="text-lg text-gray-600">{product.price} Birr</p>
              <div className="bg-blue-100 p-4 rounded-lg">
                <p className="text-gray-700">{product.pdescription}</p>
              </div>
            </div>
          </div>
          <div className="bg-blue-100 p-4 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800">Description</h3>
            <p className="text-gray-700">{product.pdescription}</p>
          </div>
          <div className="flex justify-center">
            <button
              onClick={addToCart}
              className="bg-green-200 hover:bg-green-500 rounded-lg shadow-2xl px-5 py-1"
            >
              Add to Cart
            </button>
          </div>
          <div className="w-full text-center">
            <h3 className="text-lg font-semibold text-gray-800">Seller&apos;s Identity: {product.sellerName}</h3>
          </div>
        </div>
      </div>
      <Cfooter />
    </div>
  );
};

export default Detail;