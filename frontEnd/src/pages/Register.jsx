import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [customer, setCustomer] = useState({
    username: "",
    password: "",
    fullName: "",
    image: null,
    email: "",
  });

  const [error, setError] = useState({
    username: "",
    password: "",
    fullName: "",
    image: "",
    email: "",
    form: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setCustomer((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
    setError((prevError) => ({
      ...prevError,
      [name]: "",
    }));
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    let hasError = false;
    const newError = {
      username: "",
      password: "",
      fullName: "",
      image: "",
      email: "",
      form: "",
    };

    if (!customer.username) {
      newError.username = "Enter the username";
      hasError = true;
    }
    if (!customer.password) {
      newError.password = "Enter the password";
      hasError = true;
    }
    if (!customer.fullName) {
      newError.fullName = "Enter the full name";
      hasError = true;
    }
    if (!customer.image) {
      newError.image = "Select an image";
      hasError = true;
    }
    if (!customer.email) {
      newError.email = "Enter the email";
      hasError = true;
    }

    if (hasError) {
      setError(newError);
      return;
    }

    const data = new FormData();
    data.append("username", customer.username);
    data.append("password", customer.password);
    data.append("fullName", customer.fullName);
    data.append("image", customer.image);
    data.append("email", customer.email);

    try {
      const response = await axios.post("http://localhost:4000/register", data);
      console.log(response.data);
      if (response.data.Error) {
        setError((prevError) => ({
          ...prevError,
          form: response.data.Error,
        }));
      } else {
        navigate("/login");
      }
    } catch (err) {
      setError((prevError) => ({
        ...prevError,
        form: "An error occurred during registration.",
      }));
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-r from-blue-300 to-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl px-8 py-10 shadow-lg">
        <div className="mb-8">
          <h1 className="font-extrabold text-3xl text-center text-gray-800">Registration</h1>
        </div>
        <form onSubmit={handleRegistration} className="space-y-4">
          <input
            type="text"
            name="username"
            className="w-full border border-gray-300 px-5 py-2 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Enter username"
            value={customer.username}
            onChange={handleChange}
          />
          <p className="text-red-500 text-center">{error.username}</p>

          <input
            type="password"
            name="password"
            className="w-full border border-gray-300 px-5 py-2 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Enter Password"
            value={customer.password}
            onChange={handleChange}
          />
          <p className="text-red-500 text-center">{error.password}</p>

          <input
            type="text"
            name="fullName"
            className="w-full border border-gray-300 px-5 py-2 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Enter Full Name"
            value={customer.fullName}
            onChange={handleChange}
          />
          <p className="text-red-500 text-center">{error.fullName}</p>

          <label className="text-center w-full block text-gray-600">Select your profile image</label>
          <input
            type="file"
            name="image"
            className="cursor-pointer border border-gray-300 px-3 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
            onChange={handleChange}
          />
          <p className="text-red-500 text-center">{error.image}</p>

          <input
            type="email"
            name="email"
            className="w-full border border-gray-300 px-5 py-2 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Enter Email"
            value={customer.email}
            onChange={handleChange}
          />
          <p className="text-red-500 text-center">{error.email}</p>

          <div className="w-full flex justify-center mt-6">
            <button
              type="submit"
              className="bg-blue-300 text-white px-5 py-2 rounded-lg hover:bg-white hover:text-blue-300 hover:border hover:border-blue-300 transition duration-300"
            >
              Register
            </button>
          </div>
          <p className="text-red-500 text-center mt-3">{error.form}</p>
        </form>
        <div className="mt-6">
          <p className="text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login">
              <span className="text-blue-500 hover:text-red-500 transition duration-300">Login Here</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;