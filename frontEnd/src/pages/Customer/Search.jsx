import Cfooter from "../../components/Customer/Cfooter";
import CsearchHead from "./../../components/Customer/CsearchHead";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Search = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/listofpoducts");
        setProducts(response.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="px-5 pt-5">
      <CsearchHead />

      <div className="flex flex-col md:flex-row justify-between p-5 space-y-10 md:space-y-0 md:space-x-10">
        {/* Left Side */}
        <div className="flex-col justify-between space-y-4">
          {/* Search Input */}
          <div>
            <div className="flex justify-center items-center border-gray-100">
              <input
                type="text"
                className="border text-center border-gray-200 text-lg rounded px-3 py-2 w-full md:w-auto"
                placeholder="Search here..."
              />
            </div>
          </div>

          {/* Categories and Price Filters */}
          <div className="w-full md:w-fit bg-sky-50 border border-gray-100 p-5 flex-col h-fit rounded-lg">
            <div>
              <h1 className="text-center font-extrabold text-2xl mb-5">Customization</h1>
            </div>
            <div className="flex space-x-2 mb-3">
              <h1 className="text-md font-bold">Category</h1>
              <select className="border rounded-md bg-white px-3 py-1">
                <option value="">All</option>
                <option value="Cloths">Cloths</option>
                <option value="Luxury">Luxury</option>
                <option value="Accessories">Accessories</option>
                <option value="Electronics">Electronics</option>
                <option value="Tools">Tools</option>
                <option value="Food">Food</option>
                <option value="Detergents">Detergents</option>
                <option value="Others">Others</option>
              </select>
            </div>
            <div className="flex space-x-2 mb-3">
              <h1 className="text-md font-bold">Price</h1>
              <select className="border rounded-md bg-white px-3 py-1">
                <option value="">All</option>
                <option value="1-500">1-500 Birr</option>
                <option value="500-1000">500-1000 Birr</option>
                <option value="1000+">1000+ Birr</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="w-full h-auto p-5 bg-sky-50 rounded-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link
                to={`/detail/${product.pid}`}
                key={product.pid}
                className="bg-white p-5 rounded-lg shadow-lg"
              >
                <center>
                  <img
                    src={`../src/Uploads/products/${product.image}`}
                    className="w-60 h-40 object-cover rounded-lg"
                    alt={product.pname}
                  />
                  <h1 className="text-lg font-bold capitalize mt-4">{product.pname}</h1>
                  <p className="mt-2">
                    Price:{" "}
                    <span className="bg-emerald-100 px-1 text-emerald-500 rounded font-bold">
                      {product.price} Birr
                    </span>
                  </p>
                  <button className="bg-sky-800 px-3 py-1 rounded-lg text-white hover:bg-white hover:text-black hover:border-gray-500 hover:border mt-5">
                    Check
                  </button>
                </center>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Cfooter />
    </div>
  );
};

export default Search;