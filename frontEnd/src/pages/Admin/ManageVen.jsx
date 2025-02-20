import Footer from "../../components/Admin/Footer"
import Header from "../../components/Admin/Header"
import {Link } from "react-router-dom"


const ManageVen = () => {
  return (
    <div className="px-10 pt-10">
        <Header/>

        {/* vendor header */}
        <div className="flex justify-between items-center mt-5">
            <div>
                <h1 className="text-4xl font-extrabold">Vendors</h1>
            </div>
            <div>
                <input type="text" placeholder="Search..."  className="border-amber-300 border-3 rounded-2xl px-5"/>
                <button className="bg-amber-300 rounded-lg hover:bg-white hover:border px-3 py-1 mx-5">search</button>
            </div>
            <div>
                <button className="bg-amber-300 rounded-lg hover:bg-white hover:border px-3 py-1 mx-5">
                    <Link to="/addVen">Add Vendors</Link>
                </button>
            </div>
        </div>

        {/* vendor List */}
        <div className="rounded-lg mt-10 h-screen p-10 shadow-2xl" >
            <h1 className="text-center text-2xl font-extrabold">All available Vendors</h1>
        </div>

        <div>
            <Footer/>
        </div>
      
    </div>
  )
}

export default ManageVen
