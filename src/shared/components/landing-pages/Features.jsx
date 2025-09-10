import { useTranslation } from "react-i18next";

const Features = () => {
  const { t } = useTranslation();

  const features = [
    { 
      title: "FEATURES.MULTI_TENANT", 
      description: "FEATURES.MULTI_TENANT_DESC",
      accent: "bg-blue-500 text-blue-800"
    },
    { 
      title: "FEATURES.SCHEDULING", 
      description: "FEATURES.SCHEDULING_DESC",
      accent: "bg-blue-500 text-blue-800"
    },
    { 
      title: "FEATURES.NOTIFICATIONS", 
      description: "FEATURES.NOTIFICATIONS_DESC",
      accent: "bg-blue-500 text-blue-800"
    },
    { 
      title: "FEATURES.RBAC", 
      description: "FEATURES.RBAC_DESC",
      accent: "bg-blue-500 text-blue-800"
    }
  ];

  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {t("FEATURES.HEADER")}
        </h1>
        <p className="text-xl text-gray-600">
          {t("FEATURES.SUBHEADER")}
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <div 
            key={index}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className={`h-2 ${feature.accent}`}></div>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t(feature.title)}
              </h3>
              <p className="text-gray-600">
                {t(feature.description)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
        <div className="bg-gray-50 p-6 rounded-lg text-center">
          <p className="text-3xl font-bold text-primary">100%</p>
          <p className="text-gray-600">{t("FEATURES.METRIC_DATA_ISOLATION")}</p>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg text-center">
          <p className="text-3xl font-bold text-primary">24/7</p>
          <p className="text-gray-600">{t("FEATURES.METRIC_UPTIME")}</p>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg text-center">
          <p className="text-3xl font-bold text-primary">99.9%</p>
          <p className="text-gray-600">{t("FEATURES.METRIC_RELIABILITY")}</p>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg text-center">
          <p className="text-3xl font-bold text-primary">1K+</p>
          <p className="text-gray-600">{t("FEATURES.METRIC_TENANTS")}</p>
        </div>
      </div>
    </div>
  );
};

export default Features;