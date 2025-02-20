import { Link } from "react-router-dom"

const Header = () => {
  return (
    <div className="flex justify-between items-center  border-b-1 pb-10">
      <div>
        <h1 className="text-4xl font-extrabold text-amber-300">Hello, Admin</h1>
      </div>
      <div className="space-x-15  ">
        <Link to="/Adash" className="hover:text-amber-300 hover:underline">Dashboard</Link>
        <Link to="/manageVen" className="hover:text-amber-300 hover:underline">Manage Vendors</Link>
        <Link className="hover:text-amber-300 hover:underline">Check FeedBacks</Link>
        <Link to="/change" className="hover:text-amber-300 hover:underline">Change Password</Link>
      </div>
      <div>
        <button className="bg-amber-300 px-3 py-1 rounded-lg hover:bg-white hover:border"><Link to="/login">Logout</Link> </button>
      </div>
    </div>
  )
}

export default Header
