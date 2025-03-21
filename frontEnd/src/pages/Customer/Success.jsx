import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/Cdash"); // Redirect to the home page
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center space-y-6">
        <h1 className="text-3xl font-bold text-green-600">Payment Successful!</h1>
        <p className="text-gray-700">
          Thank you for your purchase. Your order has been placed successfully.
        </p>
        <button
          onClick={handleGoHome}
          className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600"
        >
          Go to Home Page
        </button>
      </div>
    </div>
  );
};

export default Success;