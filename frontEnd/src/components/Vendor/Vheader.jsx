import { Link } from "react-router-dom"

const Vheader = () => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="font-extrabold text-4xl">Welcome Mr.x</h1>
      </div>
      <div className="felx justify-between space-x-4">
        <Link className="hover:underline bg-gray-200 px-3 py-1 rounded-lg" to="/Vdash">Dashboard</Link>
        <Link className="hover:underline bg-gray-200 px-3 py-1 rounded-lg" to="/addPro">Add Products</Link>
        <Link className="hover:underline bg-gray-200 px-3 py-1 rounded-lg" to="/out">Products out of Stock</Link>
        <Link className="hover:underline bg-gray-200 px-3 py-1 rounded-lg" to="/changeV">Change Password</Link>
      </div>
      <div className=" border border-zinc-500 hover:bg-zinc-500 hover:text-white font-bold px-3 py-1">
        <Link to="/login">Logout</Link>
      </div>
    </div>
  )
}

export default Vheader
