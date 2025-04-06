import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const Header = () => {
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

  // Run the authorization check when the component mounts
  useEffect(() => {
    checkAuthorization();
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
    <div className="flex flex-col md:flex-row justify-between items-center border-b pb-5 px-5 shadow-md">
      <div className="mb-3 md:mb-0">
        <h1 className="text-3xl md:text-4xl font-extrabold text-amber-400">Hello, Admin</h1>
      </div>
      <div className="flex flex-wrap justify-center space-x-5 md:space-x-10 text-lg">
        <Link to="/Adash" className="hover:text-amber-400 hover:underline transition duration-300">
          Dashboard
        </Link>
        <Link to="/manageVen" className="hover:text-amber-400 hover:underline transition duration-300">
          Manage Vendors
        </Link>
        <Link to="/feedbackInfo" className="hover:text-amber-400 hover:underline transition duration-300">
          Check Feedbacks
        </Link>
        <Link to="/change" className="hover:text-amber-400 hover:underline transition duration-300">
          Change Password
        </Link>
      </div>
      <div className="mt-3 md:mt-0">
        <button
          className="bg-amber-400 text-white px-4 py-2 rounded-lg hover:bg-white hover:text-amber-400 hover:border hover:border-amber-400 transition duration-300"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;