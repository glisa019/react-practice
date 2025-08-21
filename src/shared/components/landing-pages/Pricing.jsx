import { useTranslation } from "react-i18next";

const Pricing = () => {
  const { t } = useTranslation();

  const plans = [
    { 
      title: "PRICING.BASIC", 
      price: "$9.99", 
      period: "PRICING.PER_MONTH",
      features: ["PRICING.FEATURE_1", "PRICING.FEATURE_2", "PRICING.FEATURE_3"],
      accent: "border-blue-500",
      popular: false
    },
    { 
      title: "PRICING.PRO", 
      price: "$19.99", 
      period: "PRICING.PER_MONTH",
      features: ["PRICING.FEATURE_1", "PRICING.FEATURE_2", "PRICING.FEATURE_3", "PRICING.FEATURE_4"],
      accent: "border-blue-500",
      popular: true
    },
    { 
      title: "PRICING.ENTERPRISE", 
      price: "PRICING.CUSTOM", 
      period: "",
      features: ["PRICING.FEATURE_1", "PRICING.FEATURE_2", "PRICING.FEATURE_3", "PRICING.FEATURE_4", "PRICING.FEATURE_5"],
      accent: "border-blue-500",
      popular: false
    }
  ];

  // FAQ items with fallback content
  const faqs = [
    {
      question: "PRICING.FAQ_1_Q",
      answer: "PRICING.FAQ_1_A",
      fallbackQ: "Can I switch plans later?",
      fallbackA: "Yes, you can upgrade or downgrade your plan at any time."
    },
    {
      question: "PRICING.FAQ_2_Q",
      answer: "PRICING.FAQ_2_A",
      fallbackQ: "Is there a free trial available?",
      fallbackA: "We offer a 14-day free trial for all paid plans."
    },
    {
      question: "PRICING.FAQ_3_Q",
      answer: "PRICING.FAQ_3_A",
      fallbackQ: "How does billing work?",
      fallbackA: "All plans are billed monthly. Annual billing options are available for Pro and Enterprise plans."
    }
  ];

  // Helper function to handle missing translations
  const translateWithFallback = (key, fallback) => {
    const translation = t(key);
    return translation !== key ? translation : fallback;
  };

  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {t("PRICING.HEADER")}
        </h1>
        <p className="text-xl text-gray-600">
          {t("PRICING.SUBHEADER")}
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-3">
        {plans.map((plan, index) => (
          <div 
            key={index}
            className={`relative bg-white rounded-xl shadow-md overflow-hidden border-t-4 ${plan.accent} ${
              plan.popular ? "ring-2 ring-blue-500 transform md:-translate-y-2" : "opacity-50"
            }`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-1 text-sm font-bold">
                {t("PRICING.MOST_POPULAR")}
              </div>
            )}
            
            <div className="p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                {t(plan.title)}
              </h3>
              <div className="my-6">
                <span className="text-4xl font-bold">{t(plan.price)}</span>
                {plan.period && (
                  <span className="text-gray-600">/{t(plan.period)}</span>
                )}
              </div>
              
              <ul className="space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {t(feature)}
                  </li>
                ))}
              </ul>
              
              <button className={`mt-8 w-full py-3 px-6 rounded-lg font-medium ${
                plan.popular 
                  ? "bg-blue-600 text-white hover:bg-blue-700" 
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}>
                {t("PRICING.CTA")}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ Section with fallback content */}
      <div className="max-w-3xl mx-auto mt-16">
        <h3 className="text-2xl font-semibold text-center mb-8">
          {translateWithFallback("PRICING.FAQ_HEADER", "Frequently Asked Questions")}
        </h3>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 pb-4">
              <h4 className="font-medium text-lg">
                {translateWithFallback(faq.question, faq.fallbackQ)}
              </h4>
              <p className="text-gray-600 mt-1">
                {translateWithFallback(faq.answer, faq.fallbackA)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;