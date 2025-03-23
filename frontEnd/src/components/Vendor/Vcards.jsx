import { useEffect, useState } from "react";
import axios from "axios";

const Vcards = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get("http://localhost:4000/vendor-latest-transactions", { withCredentials: true });
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching latest transactions:", error);
      }
    };

    fetchTransactions();
  }, []);





  return (
    <div className="bg-gray-50 mt-5 p-10 rounded-2xl flex-col justify-between">
      <div className="mb-15">
        <h1 className="text-center font-bold text-3xl">Active Customers</h1>
      </div>

      {/* Cards Container */}
      <div className="flex justify-between items-center">
        {transactions.map((transaction, index) => (
          <div
            key={index}
            className="bg-gray-700 w-[25%] h-[60vh] rounded-md pb-3 px-10 flex-col justify-between hover:bg-gray-950 space-y-5"
          >
            {/* Customer Image */}
            <div className="flex justify-center mt-[-30px]">
              <img
                src="image.png"
                
                className="rounded-full w-30 border-1 border-white"
              />
            </div>

            {/* Customer Name */}
            <div>
              <h1 className="text-center text-white font-bold text-2xl">{transaction.username}</h1>
            </div>

            {/* Description */}
            <div className="border-white border px-3 py-1">
              <p className="text-gray-300">
                Product: {transaction.product_name} <br />
                Date: {new Date(transaction.transaction_date).toLocaleDateString()}
              </p>
            </div>

            {/* Contact Info */}
            <div>
              <h1 className="text-gray-50">Contact</h1>
              <p className="text-gray-400">Email: {transaction.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vcards;