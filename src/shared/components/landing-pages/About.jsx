import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-6 py-12 max-w-5xl">
      <h1 className="text-5xl font-extrabold text-primary mb-6">
        {t("ABOUT.HEADER")}
      </h1>

      <p className="text-lg text-gray-700 mb-12 leading-relaxed">
        {t("ABOUT.DESCRIPTION")}
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
          <h2 className="text-xl font-semibold text-primary mb-2">
            {t("ABOUT.MISSION_TITLE")}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {t("ABOUT.MISSION_TEXT")}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
          <h2 className="text-xl font-semibold text-primary mb-2">
            {t("ABOUT.VISION_TITLE")}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {t("ABOUT.VISION_TEXT")}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
          <h2 className="text-xl font-semibold text-primary mb-2">
            {t("ABOUT.WHO_FOR_TITLE")}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {t("ABOUT.WHO_FOR_TEXT")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;