import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const Vheader = () => {
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
    <div className="flex justify-between items-center">
      <div>
        <h1 className="font-extrabold text-4xl capitalize">ECAC</h1>
      </div>
      <div className="flex justify-between space-x-4">
        <Link className="hover:underline bg-gray-200 px-3 py-1 rounded-lg" to="/Vdash">
          Dashboard
        </Link>
        <Link className="hover:underline bg-gray-200 px-3 py-1 rounded-lg" to="/addPro">
          Add Products
        </Link>
        <Link className="hover:underline bg-gray-200 px-3 py-1 rounded-lg" to="/changeV">
          Change Password
        </Link>
      </div>
      <div className="border border-zinc-500 hover:bg-zinc-500 hover:text-white font-bold px-3 py-1">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Vheader;