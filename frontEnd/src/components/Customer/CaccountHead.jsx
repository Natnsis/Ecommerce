import { Link } from "react-router-dom";
import logo from "./../../images/logo.jpg";

const CaccountHead = () => {
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
        <div className="flex items-center space-x-2">
          <h1 className="text-amber-200 font-bold text-2xl">Name...</h1>
          <Link
            to="/login"
            className="bg-sky-800 text-white px-3 rounded hover:bg-white hover:text-black hover:border"
          >
            Logout
          </Link>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center justify-center space-x-10 mt-5">
        <Link to="/Cdash" className="font-bold hover:underline">
          Home
        </Link>
        <Link to="/cart" className="font-bold hover:underline">
          Cart
        </Link>
      </div>
    </div>
  );
};

export default CaccountHead;