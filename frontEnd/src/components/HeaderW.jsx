import logo from "./../images/logo.jpg"
import { Link } from "react-router-dom"

const HeaderW = () => {
  
  return (
    <div className="bg-white w-screen h-30 flex 
    justify-between items-center px-10 ">
      <div className="flex gap-x-1">
        <img className="w-10" src={logo} alt="" />
        <h1 className="text-4xl font-stretch-100% 
        font-extrabold text-gray-500">
            Assosa University
        </h1>
      </div>
      <div className="flex gap-x-10">
        <a href="#home" className="hover:text-blue-400 hover:underline">Home</a>
        <a href="#products" className="hover:text-blue-400 hover:underline">Products</a>
        <a href="#about" className="hover:text-blue-400 hover:underline">About</a>
        <a href="#contact" className="hover:text-blue-400 hover:underline">Contact</a>
      </div>
      <div>
        <input type="text" className="bg-white-smoke border px-10 w-90 pb-1
        rounded-lg" 
        placeholder="Search Here"/>
        <button className="border 
        bg-gray-500  text-white px-3 pb-1  rounded-lg mx-[-75px] hover:text-blue-300">
          search
        </button>
      </div>
      <div>
        <button className="bg-gray-400 text-black px-3 pb-1 mr-20 rounded-lg hover:bg-white hover:border-2 hover:text-black">
          <Link to="/login">Sign In</Link>
        </button>
      </div>
    </div>
  )
}

export default HeaderW
