import FooterW from "../components/FooterW";
import HeaderW from "../components/HeaderW";
import home from "./../images/home.jpg";
import assosa from "./../images/assosa.jpg";
import { useState } from "react";

const Welcome = () => {
  const [showFullText, setShowFullText] = useState(false); // State to toggle text
  const [email, setEmail] = useState(""); // State for email input
  const [message, setMessage] = useState(""); // State for message input
  const [showToast, setShowToast] = useState(false); // State for toast visibility

  const toggleText = () => {
    setShowFullText((prev) => !prev);
  };

  const fullText = `
    Asosa, nestled in the western reaches of Ethiopia within the Benishangul-Gumuz region, offers a unique blend of cultural richness and natural beauty. It serves as the capital of the region, making it an important administrative and commercial hub. The city is known for its vibrant marketplace, where you can find a variety of local crafts, agricultural products, and traditional goods, reflecting the diverse cultures of the area. The surrounding landscape is characterized by rolling hills, fertile plains, and pockets of indigenous forests, hinting at the ecological significance of the Benishangul-Gumuz region. The climate in Asosa is generally warm, with a rainy season that contributes to the lush vegetation. Historically, the region has been home to various ethnic groups, each with their own distinct traditions, languages, and customs. This cultural mosaic adds a layer of intrigue for visitors interested in exploring Ethiopia's diverse heritage. While perhaps not as widely known as some of the country's major tourist destinations, Asosa offers a glimpse into a less-explored part of Ethiopia, providing an authentic experience of local life and the natural environment.
  `;

  const truncatedText = fullText.slice(0, 300) + "..."; // Show only the first 300 characters

  const handleSubmit = () => {
    if (!email || !message) {
      alert(
        "Please fill out both the email and message fields before submitting."
      );
      return;
    }

    // Show the toast message
    setShowToast(true);

    // Hide the toast after 3 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 3000);

    // Clear the form fields
    setEmail("");
    setMessage("");
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <HeaderW />

      {/* Main Content */}
      <div className="flex-grow w-full h-fit px-5 md:px-10 min-h-screen">
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

        {/* About Section */}
        <div className="h-fit mt-10 px-5 md:px-20" id="about">
          <div>
            <h1 className="text-2xl text-center font-extrabold">About Us</h1>
          </div>
          <div className="w-full flex flex-col md:flex-row shadow-lg p-5 md:p-10 gap-5">
            <div className="w-full md:w-1/2 h-fit">
              <img
                className="w-full rounded-lg"
                src={assosa}
                alt="Assosa City"
              />
            </div>
            <div className="w-full md:w-1/2">
              <div>
                <h1 className="text-center font-bold text-3xl">Assosa City</h1>
                <p className="text-gray-700">
                  {showFullText ? fullText : truncatedText}
                </p>
              </div>
              <div className="mt-5">
                <button
                  className="text-blue-300 hover:text-red-300"
                  onClick={toggleText}
                >
                  {showFullText ? "Read Less" : "Read More"}
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
                <h1 className="text-3xl text-blue-300 font-extrabold">
                  Email Us
                </h1>
              </div>
              <div className="space-y-5">
                <input
                  type="text"
                  className="border px-3 py-1 rounded-lg w-full"
                  placeholder="example@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <textarea
                  placeholder="What do you have in mind..."
                  className="border px-3 py-1 w-full h-40 rounded-lg"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
                <button
                  className="bg-blue-300 px-3 py-1 capitalize rounded hover:bg-white hover:border"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
          Thanks for contacting us!
        </div>
      )}

      {/* Footer */}
      <FooterW />
    </div>
  );
};

export default Welcome;
