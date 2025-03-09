import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:4000/logout', {}, { withCredentials: true });
      if (response.status === 200) {
        navigate('/login');
      } else {
        console.error('Failed to logout');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div className="flex justify-between items-center border-b-1 pb-10">
      <div>
        <h1 className="text-4xl font-extrabold text-amber-300">Hello, Admin</h1>
      </div>
      <div className="space-x-15">
        <Link to="/Adash" className="hover:text-amber-300 hover:underline">Dashboard</Link>
        <Link to="/manageVen" className="hover:text-amber-300 hover:underline">Manage Vendors</Link>
        <Link className="hover:text-amber-300 hover:underline">Check FeedBacks</Link>
        <Link to="/change" className="hover:text-amber-300 hover:underline">Change Password</Link>
      </div>
      <div>
        <button 
          className="bg-amber-300 px-3 py-1 rounded-lg hover:bg-white hover:border"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;