import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import Header from "../../components/Admin/Header";
import axios from "axios";

const FeedbackInfo = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get("http://localhost:4000/feedback-list");
        setFeedbacks(response.data);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };

    fetchFeedbacks();
  }, []);

  const handleRemove = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/remove-feedback/${id}`);
      setFeedbacks(feedbacks.filter((feedback) => feedback.id !== id));
    } catch (error) {
      console.error("Error removing feedback:", error);
    }
  };

  const handleStatusToggle = async (id, currentStatus) => {
    const newStatus = currentStatus === "pending" ? "done" : "pending";
    try {
      await axios.put(`http://localhost:4000/update-feedback-status/${id}`, { status: newStatus });
      setFeedbacks(
        feedbacks.map((feedback) =>
          feedback.id === id ? { ...feedback, status: newStatus } : feedback
        )
      );
    } catch (error) {
      console.error("Error updating feedback status:", error);
    }
  };

  return (
    <div className="px-5 pt-5">
      <Header />
      <div className="mt-10">
        <h1 className="text-3xl font-bold text-center mb-5">Feedback List</h1>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">No</th>
                <th className="border border-gray-300 px-4 py-2">Username</th>
                <th className="border border-gray-300 px-4 py-2">Issue</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map((feedback, index) => (
                <tr key={feedback.id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{feedback.username}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{feedback.issue}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button
                      onClick={() => handleStatusToggle(feedback.id, feedback.status)}
                      className={`px-3 py-1 rounded ${
                        feedback.status === "pending"
                          ? "bg-yellow-500 text-white hover:bg-yellow-700"
                          : "bg-green-500 text-white hover:bg-green-700"
                      }`}
                    >
                      {feedback.status}
                    </button>
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center space-x-2">
                    <Link
                      to={`/details/${feedback.id}`} // Navigate to the detail page
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      Detail
                    </Link>
                    <button
                      onClick={() => handleRemove(feedback.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FeedbackInfo;