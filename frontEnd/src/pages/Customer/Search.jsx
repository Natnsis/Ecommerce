import Cfooter from "../../components/Customer/Cfooter"
import CsearchHead from "./../../components/Customer/CsearchHead"
import home from "./../../images/home.jpg"

const Search = () => {
  return (
    <div className="px-5 pt-5">
      <CsearchHead/>

      {/* search div */}
      <div>
            <div className="flex items-center justify-center space-x-3">
                <input type="text" className="border border-gray-200 text-lg  rounded px-3 w-[50%] h-[10vh]" 
                placeholder="search here..." /> 
                <button className="bg-sky-500  font-extrabold px-4 py-1 rounded 
                hover:bg-sky-700 hover:text-white">Search</button>
            </div>
      </div>

      {/* products */}
      <div className="h-screen p-5 bg-sky-50 mt-10 rounded-2xl">
        {/* card1 */}
        <button>
            <div className="bg-white p-5  rounded-lg ">
              <center>
                <img src={home} className="w-60" />
                <h1 className="text-lg font-bold capitalize">product1</h1>
                <p className="">Price:
                    <span className="bg-emerald-100 px-1 text-emerald-500 rounded font-bold">1500Birr</span></p>
                <button className="bg-sky-800 px-3 py-1 rounded-lg text-white hover:bg-white hover:text-black 
                    hover:border-gray-500 hover:border mt-5">
                    Buy
                 </button>
              </center>
            </div>
        </button>
      </div>

      <Cfooter/>

    </div>
  )
}

export default Search
