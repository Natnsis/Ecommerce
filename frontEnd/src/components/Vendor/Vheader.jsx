import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Vheader = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('http://localhost:4000/userInfo', { withCredentials: true });
        if (response.status === 200 && response.data.user) {
          setUser(response.data.user);
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        navigate('/login');
      }
    };
    fetchUserInfo();
  }, [navigate]);

  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="font-extrabold text-4xl capitalize">Welcome {user.fullname}</h1>
      </div>
      <div className="flex justify-between space-x-4">
        <Link className="hover:underline bg-gray-200 px-3 py-1 rounded-lg" to="/Vdash">Dashboard</Link>
        <Link className="hover:underline bg-gray-200 px-3 py-1 rounded-lg" to="/addPro">Add Products</Link>
        <Link className="hover:underline bg-gray-200 px-3 py-1 rounded-lg" to="/out">Products out of Stock</Link>
        <Link className="hover:underline bg-gray-200 px-3 py-1 rounded-lg" to="/changeV">Change Password</Link>
      </div>
      <div className="border border-zinc-500 hover:bg-zinc-500 hover:text-white font-bold px-3 py-1">
        <Link to="/login">Logout</Link>
      </div>
    </div>
  );
};

export default Vheader;