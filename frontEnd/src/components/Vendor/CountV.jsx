import { useEffect, useState } from "react";
import axios from "axios";

const CountV = () => {
  const [stats, setStats] = useState({
    productCount: 0,
    soldCount: 0,
    totalProfit: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("http://localhost:4000/vendor-stats", { withCredentials: true });
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching vendor stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="mt-10 flex flex-wrap justify-between items-center gap-5 mb-10">
      <div className="bg-gray-700 text-white font-extrabold flex-col justify-center items-center px-5 py-5 rounded-2xl w-[25%] md:w-[30%] sm:w-[45%] w-full">
        <div>
          <h1 className="text-center">Number of Products</h1>
        </div>
        <div className="w-full">
          <p className="text-center">{stats.productCount}</p>
        </div>
      </div>

      <div className="bg-gray-700 text-white font-extrabold flex-col justify-center items-center px-5 py-5 rounded-2xl w-[25%] md:w-[30%] sm:w-[45%] w-full">
        <div>
          <h1 className="text-center">Sold Products</h1>
        </div>
        <div className="w-full">
          <p className="text-center">{stats.soldCount}</p>
        </div>
      </div>

      <div className="bg-gray-700 text-white font-extrabold flex-col justify-center items-center px-5 py-5 rounded-2xl w-[25%] md:w-[30%] sm:w-[45%] w-full">
        <div>
          <h1 className="text-center">Profit</h1>
        </div>
        <div className="w-full">
          <p className="text-center">{stats.totalProfit} Birr</p>
        </div>
      </div>
    </div>
  );
};

export default CountV;