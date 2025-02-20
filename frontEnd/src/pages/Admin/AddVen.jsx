import Header from "../../components/Admin/Header"
import { Link } from "react-router-dom"

const AddVen = () => {
  return (
    <div className="px-10 pt-10">
      <Header/>
      <div className="flex justify-between items-center px-20 pt-10">
        <div>
            <h1 className="text-3xl font-extrabold">Add New Vendors</h1>
        </div>
        <div>
            <button className="bg-amber-300 px-3 py-1 hover:border hover:bg-white rounded-lg"><Link to="/manageVen">
              Go Back
              </Link></button>
        </div>
      </div>
      <div className="flex mt-15  justify-center items-center ">
        <div className="px-10 py-5 shadow-2xl rounded-lg space-y-2">
            <input className="border border-amber-300 px-5 py-1 text-center rounded-lg w-full" type="text" placeholder="enter Full Name" id="" /><br />
            <input className="border border-amber-300 px-5 py-1 text-center rounded-lg w-full" type="text" placeholder="enter Username" id="" /><br />
            <input className="border border-amber-300 px-5 py-1 text-center rounded-lg w-full" type="text" placeholder="enter Password" id="" /><br />
            <p className="text-center">enter image of vendor</p>
            <input className="hover:bg-black hover:text-white px-3 border" type="file" /><br />
            <div className="flex justify-center">
              <button className="bg-amber-300 px-3 py-1 hover:border hover:bg-white rounded-lg">Add</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default AddVen
