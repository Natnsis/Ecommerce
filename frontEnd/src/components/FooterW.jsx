
const FooterW = () => {
  return (
    
    <div className="bg-gray-700 h-45 mt-[-150px] px-10 py-10 text-white rounded-lg felx-col space-y-1">
        <div className=" flex justify-between" >
            {/* first */}
          <div className="">
            <h1 className="text-3xl font-bold ">E-commerce for assosa city</h1>
            <p className="font-bold text-blue-300">meant to connect </p>
            <p>customers, sellers, Adminstrative Employees.</p>
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
        <div className="w-full">
          <p className="text-center text-blue-300">copyright &copy; 2025 cs-collage-assosa-university</p>
        </div>
    </div>
  )
}

export default FooterW
