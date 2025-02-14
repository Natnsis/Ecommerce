
const FooterW = () => {
  return (
    <div className="bg-gray-700 h-39 mt-[-150px] px-10 py-10 text-white rounded-lg flex justify-between" >
        {/* first */}
      <div className="">
        <h1 className="text-3xl font-bold ">E-commerce for assosa city</h1>
        <p className="font-bold text-blue-300">meant to connect </p>
        <p>customers, sellers, Adminstrative Eployees,</p>
      </div>


        {/* seocnd */}
      <div>
        <div className=" gap-x-10">
            <a href="#home" className="hover:text-blue-400 hover:underline">Home</a><br />
            <a href="#products" className="hover:text-blue-400 hover:underline">Products</a><br />
            <a href="#about" className="hover:text-blue-400 hover:underline">About</a><br />
            <a href="#contact" className="hover:text-blue-400 hover:underline">Contact</a><br />
        </div>
      </div>

        {/* third */}
      <div>
        <h1 className="text-2xl font-bold capitalize">visit developers medias</h1>
        <a href="">Github</a><br />
        <a href="">facebook</a><br />
        <a href="">telegram</a><br />
      </div>
    </div>
  )
}

export default FooterW
