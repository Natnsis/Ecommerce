import CaccountHead from "../../components/Customer/CaccountHead"
import Cfooter from "./../../components/Customer/Cfooter"
import home from "./../../images/home.jpg"
import {Link} from "react-router-dom"


const Account = () => {
  return (
    <div className="px-5 pt-5">
      <CaccountHead/>

      {/* changes */}
      <div className="bg-sky-100 h-[85vh] my-5 flex justify-center items-center p-10">
        <div className=" w-[80%] h-[60vh] flex justify-between items-center px-20 ">
          <div className="bg-white rounded w-[40%] h-[60vh] py-5">
            <center>
              <label >Current Image:</label>
              <img src={home} alt="" />
              <label >Current UserName</label>
              <h1>example username</h1>
              <label >Current Password</label>
              <h1>ExamplePassword</h1>
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
