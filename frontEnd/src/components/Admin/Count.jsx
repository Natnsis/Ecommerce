import { useState, useEffect } from "react";
import axios from "axios";

const Count = () => {
  const [counts, setCounts] = useState({
    customers: 0,
    products: 0,
    vendors: 0,
    transactions: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/counts");
        setCounts(response.data); 
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-5">
      <div className="h-32 flex flex-col justify-center items-center text-center rounded-2xl shadow-lg bg-gradient-to-r from-yellow-400 to-yellow-200">
        <h2 className="text-lg font-bold text-gray-800">Available Customers</h2>
        <p className="text-3xl font-extrabold text-gray-900">{counts.customers}</p>
      </div>
      <div className="h-32 flex flex-col justify-center items-center text-center rounded-2xl shadow-lg bg-gradient-to-r from-green-400 to-green-200">
        <h2 className="text-lg font-bold text-gray-800">Available Products</h2>
        <p className="text-3xl font-extrabold text-gray-900">{counts.products}</p>
      </div>
      <div className="h-32 flex flex-col justify-center items-center text-center rounded-2xl shadow-lg bg-gradient-to-r from-blue-400 to-blue-200">
        <h2 className="text-lg font-bold text-gray-800">Number of Vendors</h2>
        <p className="text-3xl font-extrabold text-gray-900">{counts.vendors}</p>
      </div>
      <div className="h-32 flex flex-col justify-center items-center text-center rounded-2xl shadow-lg bg-gradient-to-r from-red-400 to-red-200">
        <h2 className="text-lg font-bold text-gray-800">Number of Transactions</h2>
        <p className="text-3xl font-extrabold text-gray-900">{counts.transactions}</p>
      </div>
    </div>
  );
};

export default Count;