import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import logo from "./../../images/logo.jpg";
import { LanguageContext } from "../../context/LanguageContext";

const CaccountHead = () => {
  const { translations, toggleLanguage } = useContext(LanguageContext); // Access translations and toggleLanguage
  const [username, setUsername] = useState("Name..."); // State to store the username
  const navigate = useNavigate();

  // Function to check if the user is authorized
  const checkAuthorization = async () => {
    try {
      const response = await axios.get("http://localhost:4000/userInfo", { withCredentials: true });
      if (!response.data.user) {
        throw new Error("Unauthorized");
      }
    } catch (error) {
      alert("You are not authorized. Redirecting to login page.");
      navigate("/login");
    }
  };

  // Function to fetch the customer's username
  const fetchCustomerDetails = async () => {
    try {
      const response = await axios.get("http://localhost:4000/customerProfile", { withCredentials: true });
      if (response.data.username) {
        setUsername(response.data.username);
      }
    } catch (error) {
      console.error("Error fetching customer details:", error);
    }
  };

  useEffect(() => {
    checkAuthorization();
    fetchCustomerDetails();
  }, []);

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
            <Link to="/search">{translations.search}</Link>
          </button>
          <button className="bg-gray-700 px-5 py-1 text-center rounded text-white hover:bg-white hover:text-black hover:border">
            <Link to="/feedback">{translations.sendFeedback}</Link>
          </button>
        </div>

        {/* Language Selector */}
        <div className="flex items-center space-x-2">
          <h1 className="font-bold text-2xl">{translations.language}</h1>
          <select
            name="language"
            className="bg-white px-3 rounded-sm"
            onChange={(e) => toggleLanguage(e.target.value)} // Change language on selection
          >
            <option value="en">English</option>
            <option value="am">Amharic</option>
          </select>
        </div>

        {/* User Info Section */}
        <div className="flex items-center space-x-2">
          <h1 className="text-amber-200 font-bold text-2xl">{username}</h1>
          <button
            onClick={handleLogout}
            className="bg-sky-800 text-white px-3 rounded hover:bg-white hover:text-black hover:border"
          >
            {translations.logout}
          </button>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center justify-center space-x-10 mt-5">
        <Link to="/Cdash" className="font-bold hover:underline">
          {translations.home}
        </Link>
        <Link to="/cart" className="font-bold hover:underline">
          {translations.cart}
        </Link>
      </div>
    </div>
  );
};

export default CaccountHead;