const FooterW = () => {
  return (
    <div className="bg-gray-700 px-10 py-10 text-white rounded-lg flex flex-col space-y-5">
      <div className="flex flex-col md:flex-row justify-between gap-5">
        {/* First Section */}
        <div>
          <h1 className="text-3xl font-bold">E-commerce for Assosa City</h1>
          <p className="font-bold text-blue-300">Meant to connect</p>
          <p>Customers, Sellers, Administrative Employees.</p>
        </div>

        {/* Second Section */}
        <div>
          <h1 className="text-2xl font-bold">Quick Links</h1>
          <div className="space-y-2">
            <a href="#home" className="hover:text-blue-400 hover:underline">
              Home
            </a>
            <br />

            <br />
            <a href="#about" className="hover:text-blue-400 hover:underline">
              About
            </a>
            <br />
            <a href="#contact" className="hover:text-blue-400 hover:underline">
              Contact
            </a>
            <br />
          </div>
        </div>

        {/* Third Section */}
        <div>
          <h1 className="text-2xl font-bold capitalize">
            Visit Developer&apos;s Media
          </h1>
          <div className="space-y-2">
            <a href="" className="hover:text-blue-400 hover:underline">
              Github
            </a>
            <br />
            <a href="" className="hover:text-blue-400 hover:underline">
              Facebook
            </a>
            <br />
            <a href="" className="hover:text-blue-400 hover:underline">
              Telegram
            </a>
            <br />
          </div>
        </div>
      </div>

      <div className="w-full">
        <p className="text-center text-blue-300">
          Copyright &copy; 2025 CS-College-Assosa-University
        </p>
      </div>
    </div>
  );
};

export default FooterW;
