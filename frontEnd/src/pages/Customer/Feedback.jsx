import CsearchHead from "./../../components/Customer/CsearchHead"

const Feedback = () => {
  return (
    <div className="px-5 pt-5 ">
      <CsearchHead/>
      <div className="flex justify-center items-center h-[60vh] mt-10 ">
        <div className="w-[80%] border-gray-300 bg-sky-50 h-[60vh] rounded-2xl p-5">
          <div>
            <center className="text-gray-400 space-y-3">
              <h1 className="text-4xl font-bold ">ECAC Customer Feedback Form</h1>
              <label >Mention the Issue</label>
              <input type="text" className="bg-white px-5 ml-2 border border-gray-300 rounded" id="" /><br />
              <label htmlFor="">Desctibe the Issue in detail</label><br />
              <textarea className="w-[60%] h-[20vh] border border-gray-300 p-5" id=""></textarea><br />
              <button className="bg-sky-300 text-black px-3 py-1 rounded-lg hover:bg-sky-700 hover:text-white ">
                Send
              </button>
            </center>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Feedback
