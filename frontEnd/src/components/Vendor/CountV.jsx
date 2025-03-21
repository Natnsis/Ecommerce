const CountV = () => {
  return (
    <div className="mt-10 flex flex-wrap justify-between items-center gap-5">
      <div className="bg-gray-700 text-white font-extrabold flex-col justify-center items-center px-5 py-5 rounded-2xl w-[25%] md:w-[30%] sm:w-[45%] w-full">
        <div>
          <h1 className="text-center">Number of products</h1>
        </div>
        <div className="w-full">
          <p className="text-center">0</p>
        </div>
      </div>

      <div className="bg-gray-700 text-white font-extrabold flex-col justify-center items-center px-5 py-5 rounded-2xl w-[25%] md:w-[30%] sm:w-[45%] w-full">
        <div>
          <h1 className="text-center">Sold products</h1>
        </div>
        <div className="w-full">
          <p className="text-center">0</p>
        </div>
      </div>

      <div className="bg-gray-700 text-white font-extrabold flex-col justify-center items-center px-5 py-5 rounded-2xl w-[25%] md:w-[30%] sm:w-[45%] w-full">
        <div>
          <h1 className="text-center">Profit</h1>
        </div>
        <div className="w-full">
          <p className="text-center">0</p>
        </div>
      </div>
    </div>
  );
};

export default CountV;