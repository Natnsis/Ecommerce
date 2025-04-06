import { useState, useContext } from "react";
import CsearchHead from "./../../components/Customer/CsearchHead";
import axios from "axios";
import { LanguageContext } from "../../context/LanguageContext";

const Feedback = () => {
  const { translations } = useContext(LanguageContext); // Access translations
  const [issue, setIssue] = useState("");
  const [info, setInfo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/submit-feedback",
        { issue, info },
        { withCredentials: true }
      );
      alert(response.data.message || translations.feedbackSuccess); // Use translation for success message
      setIssue("");
      setInfo("");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert(translations.feedbackError); // Use translation for error message
    }
  };

  return (
    <div className="px-5 pt-5">
      <CsearchHead />
      <div className="flex justify-center items-center mt-10">
        <div className="w-full max-w-4xl bg-sky-50 rounded-2xl p-5 shadow-lg">
          <form onSubmit={handleSubmit}>
            <center className="text-gray-400 space-y-5">
              <h1 className="text-4xl font-bold">{translations.feedbackFormTitle}</h1>
              <div className="w-full">
                <label className="block text-lg font-semibold mb-2">{translations.mentionIssue}</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300"
                  placeholder={translations.enterIssue}
                  value={issue}
                  onChange={(e) => setIssue(e.target.value)}
                  required
                />
              </div>
              <div className="w-full mt-5">
                <label className="block text-lg font-semibold mb-2">{translations.describeIssue}</label>
                <textarea
                  className="w-full h-40 border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300"
                  placeholder={translations.enterDescription}
                  value={info}
                  onChange={(e) => setInfo(e.target.value)}
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-sky-300 text-black px-5 py-2 rounded-lg hover:bg-sky-700 hover:text-white transition duration-300 mt-5"
              >
                {translations.send}
              </button>
            </center>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Feedback;