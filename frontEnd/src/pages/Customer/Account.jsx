import CaccountHead from "../../components/Customer/CaccountHead"
import Cfooter from "./../../components/Customer/Cfooter"
import home from "./../../images/home.jpg"
import {Link} from "react-router-dom"
import {useState, useEffect} from "react"
import axios from "axios"

///TODO:finish the update customer info
const Account = () => {
  const [customerInfo, setCustomerInfo] = useState([]);
  const [newInfo, setNewInfo] = useState([]);

  useEffect(()=>{
    const info =  axios.get("http://localhost:4000/userinfo");
    setCustomerInfo(info);
  }, []);

  

  return (
    <div className="px-5 pt-5">
      <CaccountHead/>

      {/* changes */}
      <div className="bg-sky-100 h-[85vh] my-5 flex justify-center items-center p-10">
        <div className=" w-[80%] h-[60vh] flex justify-between items-center px-20 ">
          <div className="bg-white rounded w-[40%] h-[60vh] py-5">
            <center>
              <label >Current Image:</label>
              <img src={`../src/Uploads/customers/${customerInfo.image}`} alt="" />
              <label >Current UserName</label>
              <h1>{customerInfo.username}</h1>
              <label >Current Password</label>
              <h1>{customerInfo.password}</h1>
            </center>

          </div>
          <div className="bg-white rounded w-[40%] h-[60vh] py-5 px-5">
          <center className="space-y-4"> 
              <label >New Image:</label>
              <input type="file" /><br />
              <label >New UserName</label><br />
              <input type="text" className="border" id="" /><br />
              <label >New Password</label><br />
              <input type="text" className="border" id="" /><br />
              <button className="bg-sky-600 text-white px-3 py-1 rounded">
                Change
              </button><br />
              <button className="bg-sky-600 text-white px-3 py-1 rounded">
                <Link to="/Cdash">
                  Go Back
                </Link>
              </button>
              
            </center>
          </div>
          
        </div>
      </div>

      <Cfooter/>
    </div>
  )
}

export default Account
