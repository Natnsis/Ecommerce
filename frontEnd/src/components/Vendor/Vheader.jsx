import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Vheader = () => {
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
    <div className="flex justify-between items-center">
      <div>
        <h1 className="font-extrabold text-4xl capitalize">ECAC</h1>
      </div>
      <div className="flex justify-between space-x-4">
        <Link className="hover:underline bg-gray-200 px-3 py-1 rounded-lg" to="/Vdash">Dashboard</Link>
        <Link className="hover:underline bg-gray-200 px-3 py-1 rounded-lg" to="/addPro">Add Products</Link>
        <Link className="hover:underline bg-gray-200 px-3 py-1 rounded-lg" to="/changeV">Change Password</Link>
      </div>
      <div className="border border-zinc-500 hover:bg-zinc-500 hover:text-white font-bold px-3 py-1">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Vheader;