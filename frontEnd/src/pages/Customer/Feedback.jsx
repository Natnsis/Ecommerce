import CsearchHead from "./../../components/Customer/CsearchHead";

const Feedback = () => {
  return (
    <div className="px-5 pt-5">
      <CsearchHead />
      <div className="flex justify-center items-center mt-10">
        <div className="w-full max-w-4xl bg-sky-50 rounded-2xl p-5 shadow-lg">
          <div>
            <center className="text-gray-400 space-y-5">
              <h1 className="text-4xl font-bold">ECAC Customer Feedback Form</h1>
              <div className="w-full">
                <label className="block text-lg font-semibold mb-2">Mention the Issue</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300"
                  placeholder="Enter the issue"
                />
              </div>
              <div className="w-full mt-5">
                <label className="block text-lg font-semibold mb-2">Describe the Issue in Detail</label>
                <textarea
                  className="w-full h-40 border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300"
                  placeholder="Provide a detailed description"
                ></textarea>
              </div>
              <button className="bg-sky-300 text-black px-5 py-2 rounded-lg hover:bg-sky-700 hover:text-white transition duration-300 mt-5">
                Send
              </button>
            </center>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;