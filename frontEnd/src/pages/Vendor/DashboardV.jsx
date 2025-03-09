import CountV from "../../components/Vendor/CountV";
import Vcards from "../../components/Vendor/Vcards";
import Vfooter from "../../components/Vendor/Vfooter";
import Vheader from "../../components/Vendor/Vheader";
import { useState, useEffect } from "react";
import axios from "axios";

const DashboardV = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/listOfProducts", { withCredentials: true });
        setProducts(response.data);
        if (response.data.length === 0) {
          console.error("Error fetching vendor list: No products found");
        }
      } catch (err) {
        console.error("Error fetching vendor list:", err);
        console.error("Error details:", err.response ? err.response.data : err.message);
      }
    };

    fetchProducts();
  }, []); 

  return (
    <div className="px-5 pt-5">
      <Vheader />
      <CountV />

      {/* products table */}
      <div className="bg-gray-100 p-5 rounded-lg h-[80vh]">
        <div>
          <h1 className="text-3xl font-extrabold text-center">List of Products on Stock</h1>
        </div>
        <div className="overflow-auto mt-10 w-full">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="w-full bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Id</th>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Price</th>
                <th className="py-3 px-6 text-left">Category</th>
                <th className="py-3 px-6 text-left">In Stock</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {products.map((product) => (
                <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap">{product.pid}</td>
                  <td className="py-3 px-6 text-left">{product.pname}</td>
                  <td className="py-3 px-6 text-left">{product.price}</td>
                  <td className="py-3 px-6 text-left">{product.category}</td>
                  <td className="py-3 px-6 text-left">{product.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Vcards />
      <Vfooter />
    </div>
  );
};

export default DashboardV;