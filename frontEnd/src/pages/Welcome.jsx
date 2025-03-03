import FooterW from "../components/FooterW"
import HeaderW from "../components/HeaderW"
import home from "./../images/home.jpg"
import assosa from "./../images/assosa.jpg"


const Welcome = () => {
  const products  = [
    {
      title:"iphone",
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut, fuga. Optio dolor nam corporis quibusdam? Non quasi ullam dolorem, voluptatem, saepe voluptas iure fugiat eum, vitae velit illum commodi omnis.",
      image:"./../images/iphone.jpg",
      price:"130k",
    },
    {
      title:"iphone",
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut, fuga. Optio dolor nam corporis quibusdam? Non quasi ullam dolorem, voluptatem, saepe voluptas iure fugiat eum, vitae velit illum commodi omnis.",
      image:"./../images/iphone.jpg",
      price:"130k",
    },
    {
      title:"iphone",
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut, fuga. Optio dolor nam corporis quibusdam? Non quasi ullam dolorem, voluptatem, saepe voluptas iure fugiat eum, vitae velit illum commodi omnis.",
      image:"./../images/iphone.jpg",
      price:"130k",
    },
    {
      title:"iphone",
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut, fuga. Optio dolor nam corporis quibusdam? Non quasi ullam dolorem, voluptatem, saepe voluptas iure fugiat eum, vitae velit illum commodi omnis.",
      image:"./../images/iphone.jpg",
      price:"130k",
    },
  ]

  return (
    <div className="w-full h-fit px-10">
      
        <HeaderW/> 
        
        {/* home part */}
        <div className="w-full  px-20 mt-10 pb-5 shadow-2xl  " id="home">     
          <div className="bg-white w-full py-10 rounded-3xl flex justify-between items-center" >
            <div className="w-1/2 px-3 ">
                <h1 className="text-2xl text-center font-extrabold
                ">Ecommerce for Assosa City</h1>
                <p className="text-center px-5 text-bold my-5 text-lg text-gray-500">A platform made to connect customers with sellers. 
                  A platform where you can easily buy any available product within the assosa reach
                  ,easy to use and simple transaction. all you need is to join.
                </p>
                <div className="flex items-center justify-center">
                  <button className="w-70 mt- bg-blue-300 px-3 py-1 rounded-lg text-white font-bold
                  hover:border-2 hover:bg-white hover:text-black">Start Shopping</button>
                </div>
            </div>

            <div>
              <img className="rounded-4xl" src={home} alt="the img" />
            </div>
          </div>
        </div>
        
          {/* products part */}
          <div className="mt-30 px-20">
              <h1 className="text-2xl text-center font-extrabold">
                Featured Products
              </h1>
          <div className=" w-[100%] flex justify-between h-fit p-10 shadow bg-white space-x-5 " id="products">
            {products.map((product)=>(
                <div key={product.title} className="flex-col  w-[30%] border p-5">
                  <div>
                    <img className="w-50 h-30  rounded-lg " src={product.image}  />
                  </div>
                  <div>
                    <h1 className="text-bolder underline text-center capitalize text-2xl">{product.title}</h1>
                  </div>
                  <div>
                    <p className="text-justify text-gray-400 ">{product.description}</p>
                  </div>
                  <div>
                    <h3 className="text-green-400 text-center">{product.price} birr</h3>
                  </div>
                  <div className="w-full">
                    <button className="hover:border hover:bg-white px-3 py-1 rounded bg-blue-300">
                      Buy
                    </button>
                  </div>        
                </div>
              
            ))}
          </div>
          </div>

          {/* about part */}
          <div className="h-fit mt-30 px-20" id="about">
                <div>
                  <h1 className="text-2xl text-center font-extrabold">About Us</h1>
                </div>
                <div className="w-full flex shadow-lg p-10 space-x-2  ">
                    <div className="w-[50%] h-fit">
                      <img src={assosa} alt="" />
                    </div>
                    <div className="w-[50%]">
                        <div>
                          <h1 className="text-center font-bold text-3xl">Assosa City</h1>
                          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae odit maiores ipsam. Quos molestiae fugit voluptas, reiciendis minima at quisquam laborum quidem, nulla ipsam nam impedit. Officiis ipsam quam nam.</p>
                        </div>
                        <div>
                          <button className="text-blue-300 hover:text-red-300">read more</button>
                        </div>
                    </div>
                </div>   
          </div>

          {/* contact part */}
          <div className="h-screen mt-30 px-20" id="contact">
            <div>
              <h1 className="text-2xl text-center font-extrabold">contact us</h1>
              <div className="w-full flex-col shadow-lg p-10 space-x-2 space-y-3">
                  <div>
                    <h1 className="text-3xl text-blue-300 font-extrabold">Email Us</h1>
                  </div>
                  <div className="space-y-5">
                    <input type="text" className="border px-3 py-1 rounded-lg" placeholder="example@gmail.com " id="" /><br />
                   <textarea placeholder="what do you have in mind..." className="border px-3 py-1 w-full h-40" id=""></textarea><br />
                   <button className="bg-blue-300 px-3 py-1 capitalize rounded hover:bg-white hover:border">submit</button>
                  </div>
              </div>
            </div>
          </div>

            {/* footer */}
            <FooterW/>
    </div>
  )
}

export default Welcome
