import { Link, useNavigate } from "react-router-dom";
import logo from "./../../images/logo.jpg";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

const Cheader = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post("http://localhost:4000/logout", {}, { withCredentials: true });
      if (response.status === 200) {
        navigate("/login");
      } else {
        console.error("Failed to logout");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div id="top" className="mb-5 bg-sky-300 p-5 rounded-lg">
      <div className="flex flex-col md:flex-row justify-between items-center space-y-5 md:space-y-0">
        {/* Logo Section */}
        <div className="flex items-center">
          <a href="#top">
            <img src={logo} className="rounded-full w-15" alt="Logo" />
          </a>
          <a href="#top">
            <h1 className="text-6xl font-extrabold">
              E<span className="text-amber-100">C</span>A
              <span className="text-amber-50">C</span>
            </h1>
          </a>
        </div>

        {/* Buttons Section */}
        <div className="flex flex-wrap justify-center space-x-5">
          <button className="bg-gray-700 px-5 py-1 text-center rounded text-white hover:bg-white hover:text-black hover:border">
            <Link to="/search">Search</Link>
          </button>
          <button className="bg-gray-700 px-5 py-1 text-center rounded text-white hover:bg-white hover:text-black hover:border">
            <Link to="/feedback">Send Feedback</Link>
          </button>
        </div>

        {/* Language Selector */}
        <div className="flex items-center space-x-2">
          <h1 className="font-bold text-2xl">Language</h1>
          <select name="language" className="bg-white px-3 rounded-sm">
            <option value="en">English</option>
            <option value="am">Amharic</option>
          </select>
        </div>

        {/* User Info Section */}
        <div className="relative flex items-center space-x-2" ref={dropdownRef}>
          <button
            className="bg-white rounded-full w-10 h-10 px-2"
            onClick={toggleDropdown}
          >
            img
          </button>
          {dropdownVisible && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
              <Link
                to="/account"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                onClick={toggleDropdown}
              >
                Account
              </Link>
              <button
                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                onClick={() => {
                  toggleDropdown();
                  handleLogout();
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center justify-center space-x-10 mt-5">
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