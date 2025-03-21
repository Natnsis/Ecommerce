import logo from "./../images/logo.jpg";
import { Link } from "react-router-dom";

const HeaderW = () => {
  return (
    <div className="bg-white w-full h-20 flex flex-col md:flex-row justify-between items-center px-5 md:px-10 shadow-md">
      {/* Logo Section */}
      <div className="flex items-center gap-x-2">
        <img className="w-10" src={logo} alt="Logo" />
        <h1 className="text-2xl md:text-4xl font-extrabold text-gray-500">
          Assosa University
        </h1>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-wrap justify-center gap-x-5 md:gap-x-10 mt-3 md:mt-0">
        <a href="#home" className="hover:text-blue-400 hover:underline">
          Home
        </a>
        <a href="#products" className="hover:text-blue-400 hover:underline">
          Products
        </a>
        <a href="#about" className="hover:text-blue-400 hover:underline">
          About
        </a>
        <a href="#contact" className="hover:text-blue-400 hover:underline">
          Contact
        </a>
      </div>

      {/* Search Section */}
      <div className="flex items-center mt-3 md:mt-0">
        <input
          type="text"
          className="border px-3 py-1 rounded-lg w-40 md:w-60 focus:outline-none focus:ring-2 focus:ring-blue-300"
          placeholder="Search Here"
        />
        <button className="border bg-gray-500 text-white px-3 py-1 rounded-lg ml-2 hover:text-blue-300 hover:bg-gray-600">
          Search
        </button>
      </div>

      {/* Sign In Button */}
      <div className="mt-3 md:mt-0">
        <button className="bg-gray-400 text-black px-3 py-1 rounded-lg hover:bg-white hover:border-2 hover:text-black">
          <Link to="/login">Sign In</Link>
        </button>
      </div>
    </div>
  );
};

export default HeaderW;