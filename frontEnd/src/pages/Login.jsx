import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState({
    username: "",
    password: "",
    form: "",
  });

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setError((prevError) => ({
      ...prevError,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasError = false;
    const newError = {
      username: "",
      password: "",
      form: "",
    };

    if (!credentials.username) {
      newError.username = "Enter the username";
      hasError = true;
    }
    if (!credentials.password) {
      newError.password = "Enter the password";
      hasError = true;
    }

    if (hasError) {
      setError(newError);
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/login", credentials, { withCredentials: true });
      console.log(response.data);
      if (response.data.Error) {
        setError((prevError) => ({
          ...prevError,
          form: response.data.Error,
        }));
      } else {
        if (response.data.role === "admin") {
          navigate("/Adash");
        } else if (response.data.role === "vendor") {
          navigate("/Vdash");
        } else if (response.data.role === "customer") {
          navigate("/Cdash");
        }
      }
    } catch (err) {
      setError((prevError) => ({
        ...prevError,
        form: "An error occurred during login.",
      }));
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-bl from-blue-300 to-gray-100">
      <div className="w-80 bg-white h-92 rounded-2xl px-5 py-5">
        <div className="my-5">
          <h1 className="font-extrabold text-3xl text-center">Login</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="username"
              className="w-70 border px-5 py-1 rounded text-center"
              placeholder="Enter username"
              value={credentials.username}
              onChange={handleChange}
            />
            <p className="text-red-500 text-center">{error.username}</p>
            <input
              type="password"
              name="password"
              className="w-70 border px-5 py-1 rounded text-center mt-3"
              placeholder="Enter Password"
              value={credentials.password}
              onChange={handleChange}
            />
            <p className="text-red-500 text-center">{error.password}</p>
          </div>
          <div className="w-full flex justify-center my-3">
            <button type="submit" className="bg-blue-300 rounded px-3 py-1 hover:bg-white hover:border">
              Submit
            </button>
          </div>
          <p className="text-red-500 text-center">{error.form}</p>
        </form>
        <div>
          <p className="text-center">
            You don't have an account?{" "}
            <Link to="/register">
              <span className="text-blue-300 hover:text-red-300">Register Here</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;