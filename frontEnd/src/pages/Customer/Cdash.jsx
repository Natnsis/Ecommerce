import Cfooter from "../../components/Customer/Cfooter";
import Cheader from "../../components/Customer/Cheader";
import home from "./../../images/ecommerce.jpeg";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Cdash = () => {
  const [recentProducts, setRecentProducts] = useState([]);

  useEffect(() => {
    const fetchRecentProducts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/recentProducts");
        setRecentProducts(response.data);
      } catch (err) {
        console.error("Error fetching recent products:", err);
      }
    };

    fetchRecentProducts();
  }, []);

  return (
    <div className="pt-5 px-5">
      <Cheader />

      {/* Home Section */}
      <div id="home" className="mb-10">
        <div className="flex flex-col md:flex-row justify-between items-center p-5 bg-sky-50 border border-gray-200 rounded-lg">
          <div className="w-full md:w-[50%]">
            <h1 className="text-center font-extrabold text-3xl">
              Ecommerce For Assosa City
            </h1>
            <p className="w-[90%] text-gray-500 my-2 mx-auto">
              Welcome to Assosa&apos;s online marketplace! Discover a vibrant
              selection of local goods, handmade crafts, and everyday
              essentials, all from the comfort of your home. Support your
              community businesses and enjoy the convenience of doorstep
              delivery in Assosa city. Browse our curated categories and find
              unique treasures today!
            </p>
            <div className="flex justify-center mt-10">
              <button className="bg-sky-800 px-3 py-1 rounded-lg text-white hover:bg-white hover:text-black hover:border-gray-200">
                Contact The Creators
              </button>
            </div>
          </div>
          <div className="flex justify-center w-full md:w-[50%] p-2">
            <img className="h-50 rounded-lg" src={home} alt="Ecommerce" />
          </div>
        </div>
      </div>

      {/* Recently Added Products */}
      <div
        id="recent"
        className="h-fit bg-gradient-to-r from-sky-100 to-sky-0 border border-gray-100 my-10 p-5"
      >
        <div>
          <h1 className="text-center text-4xl font-bold text-gray-600">
            Recently Added Products
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
                  Price:{" "}
                  <span className="bg-emerald-100 px-1 text-emerald-500 rounded font-bold">
                    {product.price} Birr
                  </span>
                </p>
                <button className="bg-sky-800 px-3 py-1 rounded-lg text-white hover:bg-white hover:text-black hover:border-gray-500 hover:border mt-5">
                  Buy
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
            Most Bought Products
          </h1>
        </div>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Example Product */}
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <center>
              <img src={home} className="w-60 h-40 object-cover rounded-lg" alt="Product" />
              <h1 className="text-lg font-bold capitalize mt-4">Product 1</h1>
              <p className="mt-2">
                Price:{" "}
                <span className="bg-emerald-100 px-1 text-emerald-500 rounded font-bold">
                  1500 Birr
                </span>
              </p>
              <button className="bg-sky-800 px-3 py-1 rounded-lg text-white hover:bg-white hover:text-black hover:border-gray-500 hover:border mt-5">
                Buy
              </button>
            </center>
          </div>
        </div>
        <div className="flex justify-center mt-10">
          <a
            href="#home"
            className="px-[45%] bg-sky-800 text-white hover:bg-white hover:text-black hover:border hover:border-gray-400 rounded-lg py-2"
          >
            Back To Top
          </a>
        </div>
      </div>

      <Cfooter />
    </div>
  );
};

export default Cdash;