import Cfooter from "../../components/Customer/Cfooter";
import CsearchHead from "./../../components/Customer/CsearchHead";
import { useState, useEffect } from "react";
import axios from "axios";
import {Link} from "react-router-dom"

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

      {/* search div */}
      <div>
        <div className="flex items-center justify-center space-x-3">
          <input
            type="text"
            className="border text-center border-gray-200 text-lg rounded px-3 w-[50%] h-[10vh]"
            placeholder="search here..."
          />
        </div>
      </div>

      {/* products */}
      <div className="h-screen p-5 bg-sky-50 mt-10 rounded-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link to={`/detail/${product.pid}`} key={product.pid} className="bg-white p-5 rounded-lg shadow-lg">
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
                  Buy
                </button>
              </center>
            </Link>
          ))}
        </div>
      </div>

      <Cfooter />
    </div>
  );
};

export default Search;