import { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";

const Cfooter = () => {
  const { translations } = useContext(LanguageContext); // Access translations

  return (
    <div className="bg-sky-700 py-5 text-white rounded-lg flex-col space-y-1">
      <p className="text-center">
        {translations.copyright} &copy; 2025 {translations.university}
      </p>
    </div>
  );
};

export default Cfooter;