import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";

const Details = () => {
  const { id } = useParams(); // Get the feedback ID from the URL
  const navigate = useNavigate(); // For navigation after marking as dealt
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    const fetchFeedbackDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/feedback-detail/${id}`);
        setFeedback(response.data);
      } catch (error) {
        console.error("Error fetching feedback detail:", error);
      }
    };

    fetchFeedbackDetail();
  }, [id]);

  const handleDealt = async () => {
    try {
      const response = await axios.put(`http://localhost:4000/update-feedback-status/${id}`, { status: "fixed" });
      alert(response.data.message || "Feedback marked as dealt!");
      navigate("/feedbackInfo"); // Redirect to the feedback list page
    } catch (error) {
      console.error("Error marking feedback as dealt:", error);
      alert(error.response?.data?.error || "Failed to mark feedback as dealt. Please try again.");
    }
  };

  const handleGoBack = () => {
    navigate("/feedbackInfo"); // Navigate back to the feedback list page
  };

  if (!feedback) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl font-bold text-gray-500">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="px-5 pt-5">
      <Header />
      <div className="flex justify-center items-center mt-10">
        <div className="w-full max-w-4xl bg-sky-50 rounded-2xl p-5 shadow-lg">
          <center className="text-gray-400 space-y-5">
            <h1 className="text-4xl font-bold">Feedback Detail</h1>
            <div className="w-full">
              <label className="block text-lg font-semibold mb-2">Username</label>
              <p className="w-3/4 mx-auto border border-gray-300 px-4 py-2 rounded-lg bg-gray-100">
                {feedback.username}
              </p>
            </div>
            <div className="w-full mt-5">
              <label className="block text-lg font-semibold mb-2">Issue</label>
              <p className="w-3/4 mx-auto border border-gray-300 px-4 py-2 rounded-lg bg-gray-100">
                {feedback.issue}
              </p>
            </div>
            <div className="w-full mt-5">
              <label className="block text-lg font-semibold mb-2">Details</label>
              <p className="w-full h-40 border border-gray-300 px-4 py-2 rounded-lg bg-gray-100 overflow-y-auto">
                {feedback.info}
              </p>
            </div>
            <div className="w-full mt-5">
              <label className="block text-lg font-semibold mb-2">Status</label>
              <p
                className={`w-3/4 mx-auto border border-gray-300 px-4 py-2 rounded-lg ${
                  feedback.status === "pending" ? "bg-yellow-100" : "bg-green-100"
                }`}
              >
                {feedback.status}
              </p>
            </div>
            <div className="flex space-x-4 mt-5">
              {feedback.status === "pending" && (
                <button
                  onClick={handleDealt}
                  className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition duration-300"
                >
                  Mark as Dealt
                </button>
              )}
              <button
                onClick={handleGoBack}
                className="bg-gray-500 text-white px-5 py-2 rounded-lg hover:bg-gray-700 transition duration-300"
              >
                Go Back
              </button>
            </div>
          </center>
        </div>
      </div>
    </div>
  );
};

export default Details;