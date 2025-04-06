import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cheader from "../../components/Customer/Cheader";
import Cfooter from "../../components/Customer/Cfooter";
import { LanguageContext } from "../../context/LanguageContext";

const Cdash = () => {
  const { translations } = useContext(LanguageContext); // Access translations
  const [recentProducts, setRecentProducts] = useState([]);
  const [mostBoughtProducts, setMostBoughtProducts] = useState([]);

  useEffect(() => {
    const fetchRecentProducts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/recentProducts");
        setRecentProducts(response.data);
      } catch (err) {
        console.error("Error fetching recent products:", err);
      }
    };

    const fetchMostBoughtProducts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/most-bought-products");
        setMostBoughtProducts(response.data);
      } catch (err) {
        console.error("Error fetching most bought products:", err);
      }
    };

    fetchRecentProducts();
    fetchMostBoughtProducts();
  }, []);

  return (
    <div className="pt-5 px-5">
      <Cheader />

      {/* Recently Added Products */}
      <div
        id="recent"
        className="h-fit bg-gradient-to-r from-sky-100 to-sky-0 border border-gray-100 my-10 p-5"
      >
        <div>
          <h1 className="text-center text-4xl font-bold text-gray-600">
            {translations.recentlyAddedProducts}
          </h1>
        </div>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recentProducts.map((product) => (
            <Link to={`/detail/${product.pid}`} key={product.pid}>
              <div className="bg-white p-5 rounded-lg shadow-lg">
                <img
                  src={`../src/Uploads/products/${product.image}`}
                  className="w-full h-40 object-cover rounded-lg"
                  alt={product.pname}
                />
                <h1 className="text-lg font-bold capitalize mt-4">
                  {product.pname}
                </h1>
                <p className="mt-2">
                  {translations.price}:{" "}
                  <span className="bg-emerald-100 px-1 text-emerald-500 rounded font-bold">
                    {product.price} {translations.currency}
                  </span>
                </p>
                <button className="bg-sky-800 px-3 py-1 rounded-lg text-white hover:bg-white hover:text-black hover:border-gray-500 hover:border mt-5">
                  {translations.showDetail}
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Most Bought Products */}
      <div
        id="most"
        className="h-fit bg-gradient-to-r from-sky-0 to-sky-100 border border-gray-100 my-10 p-5"
      >
        <div>
          <h1 className="text-center text-4xl font-bold text-gray-600">
            {translations.mostBoughtProducts}
          </h1>
        </div>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mostBoughtProducts.map((product) => (
            <Link to={`/detail/${product.pid}`} key={product.pid}>
              <div className="bg-white p-5 rounded-lg shadow-lg">
                <img
                  src={`../src/Uploads/products/${product.image}`}
                  className="w-full h-40 object-cover rounded-lg"
                  alt={product.pname}
                />
                <h1 className="text-lg font-bold capitalize mt-4">
                  {product.pname}
                </h1>
                <p className="mt-2">
                  {translations.price}:{" "}
                  <span className="bg-emerald-100 px-1 text-emerald-500 rounded font-bold">
                    {product.price} {translations.currency}
                  </span>
                </p>
                <button className="bg-sky-800 px-3 py-1 rounded-lg text-white hover:bg-white hover:text-black hover:border-gray-500 hover:border mt-5">
                  {translations.showDetail}
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Cfooter />
    </div>
  );
};

export default Cdash;