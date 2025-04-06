import Cfooter from "../../components/Customer/Cfooter";
import CsearchHead from "./../../components/Customer/CsearchHead";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { LanguageContext } from "../../context/LanguageContext";

const Search = () => {
  const { translations } = useContext(LanguageContext); // Access translations
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/listofpoducts");
        setProducts(response.data);
        setFilteredProducts(response.data); // Initialize filtered products
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  const handleFilter = () => {
    let filtered = products;

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    // Filter by price range
    if (selectedPriceRange) {
      filtered = filtered.filter((product) => {
        const price = parseFloat(product.price);
        if (selectedPriceRange === "1-500") return price >= 1 && price <= 500;
        if (selectedPriceRange === "500-1000") return price > 500 && price <= 1000;
        if (selectedPriceRange === "1000+") return price > 1000;
        return true;
      });
    }

    // Filter by search term
    if (search) {
      filtered = filtered.filter((product) =>
        product.pname.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

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
                placeholder={translations.searchPlaceholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Categories and Price Filters */}
          <div className="w-full md:w-fit bg-sky-50 border border-gray-100 p-5 flex-col h-fit rounded-lg">
            <div>
              <h1 className="text-center font-extrabold text-2xl mb-5">{translations.customization}</h1>
            </div>
            <div className="flex space-x-2 mb-3">
              <h1 className="text-md font-bold">{translations.category}</h1>
              <select
                className="border rounded-md bg-white px-3 py-1"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">{translations.all}</option>
                <option value="Cloths">{translations.cloths}</option>
                <option value="Luxury">{translations.luxury}</option>
                <option value="Accessories">{translations.accessories}</option>
                <option value="Electronics">{translations.electronics}</option>
                <option value="Tools">{translations.tools}</option>
                <option value="Food">{translations.food}</option>
                <option value="Detergents">{translations.detergents}</option>
                <option value="Others">{translations.others}</option>
              </select>
            </div>
            <div className="flex space-x-2 mb-3">
              <h1 className="text-md font-bold">{translations.price}</h1>
              <select
                className="border rounded-md bg-white px-3 py-1"
                value={selectedPriceRange}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
              >
                <option value="">{translations.all}</option>
                <option value="1-500">1-500 {translations.currency}</option>
                <option value="500-1000">500-1000 {translations.currency}</option>
                <option value="1000+">1000+ {translations.currency}</option>
              </select>
            </div>
            <div className="flex justify-center">
              <button
                onClick={handleFilter}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                {translations.search}
              </button>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="w-full h-auto p-5 bg-sky-50 rounded-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
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
                    {translations.price}:{" "}
                    <span className="bg-emerald-100 px-1 text-emerald-500 rounded font-bold">
                      {product.price} {translations.currency}
                    </span>
                  </p>
                  <button className="bg-sky-800 px-3 py-1 rounded-lg text-white hover:bg-white hover:text-black hover:border-gray-500 hover:border mt-5">
                    {translations.check}
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