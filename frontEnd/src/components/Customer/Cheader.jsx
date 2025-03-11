import { Link } from "react-router-dom";
import logo from "./../../images/logo.jpg";
import { useState } from "react";

const Cheader = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div id="top" className="mb-5 bg-sky-300 p-5 rounded-lg ">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <a href="#top">
            <img src={logo} className="rounded-full w-15" />
          </a>
          <a href="#top">
            <h1 className="text-6xl font-extrabold">
              E<span className="text-amber-100">C</span>A
              <span className="text-amber-50">C</span>
            </h1>
          </a>
        </div>

        <div className="space-x-10">
          <button className="bg-gray-700 px-5 py-1 w-70 text-center rounded text-white hover:bg-white hover:text-black hover:border">
            <Link to="/search">Search</Link>
          </button>
          <button className="bg-gray-700 px-5 py-1 w-70 text-center rounded text-white hover:bg-white hover:text-black hover:border">
            <Link to="/feedback">Send FeedBack</Link>
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <h1 className="font-bold text-2xl">Language</h1>
          <select name="" className="bg-white px-3 rounded-sm">
            <option value="">English</option>
            <option value="">Amharic</option>
          </select>
        </div>

        <div className="relative flex space-x-2">
          <button
            className="bg-white rounded-full w-10 h-10 px-2"
            onClick={toggleDropdown}
          >
            img
          </button>
          {dropdownVisible && (
            <div
              className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg"
            >
              <Link
                to="/account"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                onClick={toggleDropdown}
              >
                Account
              </Link>
              <Link
                to="/login"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                onClick={toggleDropdown}
              >
                Logout
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-center space-x-10">
        <Link to="/Cdash" className="font-bold hover:underline">
          Home
        </Link>
        <a href="#recent" className="font-bold hover:underline">
          Recently Added
        </a>
        <a href="#most" className="font-bold hover:underline">
          Most Bought
        </a>
        <Link to="/cart" className="font-bold hover:underline">
          Cart
        </Link>
      </div>
    </div>
  );
};

export default Cheader;