import FooterW from "../components/FooterW";
import HeaderW from "../components/HeaderW";
import home from "./../images/home.jpg";
import assosa from "./../images/assosa.jpg";

const Welcome = () => {
  const products = [
    {
      title: "iphone",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut, fuga. Optio dolor nam corporis quibusdam? Non quasi ullam dolorem, voluptatem, saepe voluptas iure fugiat eum, vitae velit illum commodi omnis.",
      image: "./../images/iphone.jpg",
      price: "130k",
    },
    {
      title: "iphone",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut, fuga. Optio dolor nam corporis quibusdam? Non quasi ullam dolorem, voluptatem, saepe voluptas iure fugiat eum, vitae velit illum commodi omnis.",
      image: "./../images/iphone.jpg",
      price: "130k",
    },
    {
      title: "iphone",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut, fuga. Optio dolor nam corporis quibusdam? Non quasi ullam dolorem, voluptatem, saepe voluptas iure fugiat eum, vitae velit illum commodi omnis.",
      image: "./../images/iphone.jpg",
      price: "130k",
    },
    {
      title: "iphone",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut, fuga. Optio dolor nam corporis quibusdam? Non quasi ullam dolorem, voluptatem, saepe voluptas iure fugiat eum, vitae velit illum commodi omnis.",
      image: "./../images/iphone.jpg",
      price: "130k",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <HeaderW />

      {/* Main Content */}
      <div className="flex-grow w-full h-fit px-5 md:px-10">
        {/* Home Section */}
        <div className="w-full px-5 md:px-20 mt-10 pb-5 shadow-2xl" id="home">
          <div className="bg-white w-full py-10 rounded-3xl flex flex-col md:flex-row justify-between items-center">
            <div className="w-full md:w-1/2 px-3">
              <h1 className="text-2xl text-center font-extrabold">
                Ecommerce for Assosa City
              </h1>
              <p className="text-center px-5 text-bold my-5 text-lg text-gray-500">
                A platform made to connect customers with sellers. A platform
                where you can easily buy any available product within the Assosa
                reach, easy to use and simple transaction. All you need is to
                join.
              </p>
              <div className="flex items-center justify-center">
                <button className="w-70 bg-blue-300 px-3 py-1 rounded-lg text-white font-bold hover:border-2 hover:bg-white hover:text-black">
                  Start Shopping
                </button>
              </div>
            </div>

            <div className="w-full md:w-1/2">
              <img className="rounded-4xl w-full" src={home} alt="the img" />
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="mt-10 px-5 md:px-20">
          <h1 className="text-2xl text-center font-extrabold">Featured Products</h1>
          <div className="w-full flex flex-wrap justify-center md:justify-between h-fit p-5 md:p-10 shadow bg-white gap-5">
            {products.map((product) => (
              <div
                key={product.title}
                className="flex flex-col w-full md:w-[30%] border p-5 rounded-lg"
              >
                <div>
                  <img
                    className="w-full h-40 object-cover rounded-lg"
                    src={product.image}
                    alt={product.title}
                  />
                </div>
                <div>
                  <h1 className="text-bold underline text-center capitalize text-2xl">
                    {product.title}
                  </h1>
                </div>
                <div>
                  <p className="text-justify text-gray-400">{product.description}</p>
                </div>
                <div>
                  <h3 className="text-green-400 text-center">{product.price} birr</h3>
                </div>
                <div className="w-full flex justify-center">
                  <button className="hover:border hover:bg-white px-3 py-1 rounded bg-blue-300">
                    Buy
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* About Section */}
        <div className="h-fit mt-10 px-5 md:px-20" id="about">
          <div>
            <h1 className="text-2xl text-center font-extrabold">About Us</h1>
          </div>
          <div className="w-full flex flex-col md:flex-row shadow-lg p-5 md:p-10 gap-5">
            <div className="w-full md:w-1/2 h-fit">
              <img className="w-full rounded-lg" src={assosa} alt="Assosa City" />
            </div>
            <div className="w-full md:w-1/2">
              <div>
                <h1 className="text-center font-bold text-3xl">Assosa City</h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
                  odit maiores ipsam. Quos molestiae fugit voluptas, reiciendis
                  minima at quisquam laborum quidem, nulla ipsam nam impedit.
                  Officiis ipsam quam nam.
                </p>
              </div>
              <div className="mt-5">
                <button className="text-blue-300 hover:text-red-300">
                  Read More
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="h-fit mt-10 px-5 md:px-20" id="contact">
          <div>
            <h1 className="text-2xl text-center font-extrabold">Contact Us</h1>
            <div className="w-full flex flex-col shadow-lg p-5 md:p-10 gap-5">
              <div>
                <h1 className="text-3xl text-blue-300 font-extrabold">Email Us</h1>
              </div>
              <div className="space-y-5">
                <input
                  type="text"
                  className="border px-3 py-1 rounded-lg w-full"
                  placeholder="example@gmail.com"
                />
                <textarea
                  placeholder="What do you have in mind..."
                  className="border px-3 py-1 w-full h-40 rounded-lg"
                ></textarea>
                <button className="bg-blue-300 px-3 py-1 capitalize rounded hover:bg-white hover:border">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <FooterW />
    </div>
  );
};

export default Welcome;