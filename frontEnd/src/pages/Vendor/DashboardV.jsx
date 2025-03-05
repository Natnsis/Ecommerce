import CountV from "../../components/Vendor/CountV"
import Vcards from "../../components/Vendor/Vcards"
import Vfooter from "../../components/Vendor/Vfooter"
import Vheader from "../../components/Vendor/Vheader"
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DashboardV = () => {
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
    <div className="px-5 pt-5">
      <Vheader name = {user.fullname}/>
      <CountV/>

      {/* products table */}
      <div className="bg-gray-100 p-5 rounded-lg h-[80vh] ">
        <div>
          <h1 className="text-3xl font-extrabold text-center">List of Products on stock</h1>
        </div>
        <div className="overflow-scroll">
          Table
        </div>
      </div>

      <Vcards/>

      <Vfooter/>

    </div>
  )
}

export default DashboardV
