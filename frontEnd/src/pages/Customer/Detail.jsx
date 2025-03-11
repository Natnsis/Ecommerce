import Cfooter from "../../components/Customer/Cfooter";
import Cheader from "../../components/Customer/Cheader";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Detail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

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