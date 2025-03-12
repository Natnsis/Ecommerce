import CountV from "../../components/Vendor/CountV";
import Vcards from "../../components/Vendor/Vcards";
import Vfooter from "../../components/Vendor/Vfooter";
import Vheader from "../../components/Vendor/Vheader";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const DashboardV = () => {
  const [products, setProducts] = useState([]);
  const [stockChanges, setStockChanges] = useState({});

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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/deleteProduct/${id}`);
      setProducts(products.filter((product) => product.id !== id));
      window.location.reload(); //reloading after the delete did its job!!!!!
    } catch (err) {
      console.error("Error deleting vendor:", err);
    }
  };

  const handleStockChange = (e, id) => {
    const { value } = e.target;
    setStockChanges((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleStockUpdate = async (id) => {
    const change = parseInt(stockChanges[id]);
    if (isNaN(change)) {
      alert("Please enter a valid number");
      return;
    }

    try {
      await axios.put(`http://localhost:4000/changeStock/${id}`, { stockChange: change }, { withCredentials: true });
      setProducts(products.map((product) => (product.pid === id ? { ...product, stock: parseInt(product.stock) + change } : product)));
      setStockChanges((prev) => ({
        ...prev,
        [id]: "",
      }));
    } catch (err) {
      console.error("Error updating stock:", err);
    }
  };

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
                <th className="py-3 px-6 text-left">Action</th>
                <th className="py-3 px-6 text-left">Update Stock</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {products.map((product) => (
                <tr key={product.pid} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap">{product.pid}</td>
                  <td className="py-3 px-6 text-left">{product.pname}</td>
                  <td className="py-3 px-6 text-left">{product.price}</td>
                  <td className="py-3 px-6 text-left">{product.category}</td>
                  <td className="py-3 px-6 text-left">{product.stock}</td>
                  <td className="py-3 px-6 text-left">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-700 mx-1">
                      <Link to={`/updateProduct/${product.pid}`}>Update</Link>
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-700 mx-1"
                      onClick={() => handleDelete(product.pid)}
                    >
                      Delete
                    </button>
                  </td>
                  <td className="py-3 px-6 text-left">
                    <input
                      type="number"
                      className="bg-gray-50 border border-gray-300 w-20"
                      value={stockChanges[product.pid] || ""}
                      onChange={(e) => handleStockChange(e, product.pid)}
                    />
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-700 mx-1"
                      onClick={() => handleStockUpdate(product.pid)}
                    >
                      Add
                    </button>
                  </td>
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