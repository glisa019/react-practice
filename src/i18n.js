import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
const resources = {
  en: {
    translation: {
      "GLOBAL": {
        "HOME": "Home",
        "ABOUT": "About",
        "FEATURES": "Features",
        "PRICING": "Pricing",
        "CONTACT": "Contact",
        "ENGLISH": "English",
        "SERBIAN": "Serbian",
        "SIGN_IN": "Sign in",
        "HEADER": "Multi-tenant scheduling platform",
        "DESCRIPTION": "Effortless scheduling for teams and businesses—our multi-tenant platform lets you manage appointments, events, and resources seamlessly in one powerful, scalable solution.",
        "CREATE_TENANT": "Create Tenant",
        "BECOME_A_TENANT": "Become a Tenant",
        "TENANT_FORM": "Tenant form",
        "SUBMIT": "Submit"
      },
      "CONTACT": {
        "HEADER": "Contact us"
      },
      "FEATURES": {
        "HEADER": "Powerful Multi-Tenant Features",
        "SUBHEADER": "Designed to scale securely across thousands of tenants.",
        "CORE": "Core Features",
        "COMMUNICATION": "Communication",
        "SECURITY": "Security",
        "MULTI_TENANT": "Multi-Tenant Isolation",
        "MULTI_TENANT_DESC": "Each tenant gets a fully isolated environment with shared infrastructure efficiency.",
        "SCHEDULING": "Advanced Scheduling",
        "SCHEDULING_DESC": "Tenant-specific scheduling with custom rules and priorities.",
        "NOTIFICATIONS": "Real-Time Notifications",
        "NOTIFICATIONS_DESC": "Configurable alerts per tenant via email, SMS, or in-app.",
        "RBAC": "Role-Based Access",
        "RBAC_DESC": "Granular permissions for tenant admins and users.",
        "LEARN_MORE": "Learn More →",
        "METRIC_DATA_ISOLATION": "Data Isolation",
        "METRIC_UPTIME": "Uptime",
        "METRIC_RELIABILITY": "Reliability",
        "METRIC_TENANTS": "Tenants"
      },
      "PRICING": {
        "HEADER": "Simple, Transparent Pricing",
        "SUBHEADER": "Choose the plan that fits your tenant needs",
        "PER_MONTH": "month",
        "CUSTOM": "Custom",
        "MOST_POPULAR": "Most Popular",
        "CTA": "Get Started",
        "FAQ_HEADER": "Frequently Asked Questions",
        "FAQ_1_Q": "Can I switch plans later?",
        "FAQ_1_A": "Yes, you can upgrade/downgrade anytime.",
        "FAQ_2_Q": "Is there a free trial available?",
        "FAQ_2_A": "We offer a 14-day free trial for all paid plans.",
        "FAQ_3_Q": "How does billing work?",
        "FAQ_3_A": "All plans are billed monthly. Annual billing options are available for Pro and Enterprise plans.",
        "FEATURE_1": "Multi-tenant isolation",
        "FEATURE_2": "Basic analytics",
        "FEATURE_3": "Customization",
        "FEATURE_4": "TenantConfiguration",
        "FEATURE_5": "Migration",
        "BASIC": "BASIC",
        "PRO": "PRO",
        "ENTERPRISE": "ENTERPRISE"
      },
      "ABOUT": {
        "HEADER": "About Us",
        "DESCRIPTION": "We’re building the future of scheduling for organizations of all sizes — multi-tenant by design, secure, and fully customizable.",
        "MISSION_TITLE": "Our Mission",
        "MISSION_TEXT": "To simplify scheduling for modern teams by creating an intelligent, scalable platform that adapts to each organization’s workflow.",
        "VISION_TITLE": "Our Vision",
        "VISION_TEXT": "To become the most trusted infrastructure for scheduling across industries and countries.",
        "WHO_FOR_TITLE": "Who We Serve",
        "WHO_FOR_TEXT": "Whether you're managing a small business, a global enterprise, or a network of independent professionals, our platform helps you stay organized and efficient."
      }
    }
  },
  rs: {
    translation: {
      "GLOBAL": {
        "HOME": "Pocetna",
        "ABOUT": "O nama",
        "CONTACT": "Kontakt",
        "FEATURES": "Karakteristike",
        "PRICING": "Cenovnik",
        "ENGLISH": "Engleski",
        "SERBIAN": "Srpski",
        "SIGN_IN": "Prijavi se",
        "HEADER": "Multi-tenant platforma za zakazivanje",
        "DESCRIPTION": "Zakazivanje bez napora za timove i preduzeca - nasa platforma za vise sakupaca omogucava vam da neprimetno upravljate sastancima, dogadjajima i resursima u jednom mocnom, skalabilnom resenju.",
        "CREATE_TENANT": "Kreiraj Tenant",
        "BECOME_A_TENANT": "Postani Tenant",
        "TENANT_FORM": "Tenant forma",
        "SUBMIT": "Pošalji"
      },
      "CONTACT": {
        "HEADER": "Kontaktirajte nas"
      },
      "FEATURES": {
        "HEADER": "Snažne multi-tenant funkcionalnosti",
        "SUBHEADER": "Dizajniran da se bezbedno skalira preko hiljada zakupaca.",
        "CORE": "Osnovne funkcionalnosti",
        "COMMUNICATION": "Komunikacija",
        "SECURITY": "Bezbednost",
        "MULTI_TENANT": "Izolacija između zakupaca",
        "MULTI_TENANT_DESC": "Svaki zakupac dobija potpuno izolovano okruženje uz efikasnost deljene infrastrukture.",
        "SCHEDULING": "Napredno zakazivanje",
        "SCHEDULING_DESC": "Zakazivanje specifično za zakupca sa prilagođenim pravilima i prioritetima.",
        "NOTIFICATIONS": "Obaveštenja u realnom vremenu",
        "NOTIFICATIONS_DESC": "Podesiva obaveštenja po zakupcu putem e-pošte, SMS-a ili u aplikaciji.",
        "RBAC": "Pristup zasnovan na ulogama",
        "RBAC_DESC": "Granularna ovlašćenja za administratore i korisnike zakupaca.",
        "LEARN_MORE": "Saznaj više →",
        "METRIC_DATA_ISOLATION": "Izolacija podataka",
        "METRIC_UPTIME": "Dostupnost",
        "METRIC_RELIABILITY": "Pouzdanost",
        "METRIC_TENANTS": "Zakupaca"
      },
      "PRICING": {
        "HEADER": "Jednostavne, transparentne cene",
        "SUBHEADER": "Izaberite plan koji odgovara potrebama vašeg zakupca",
        "PER_MONTH": "mesec",
        "CUSTOM": "Prilagođeno",
        "MOST_POPULAR": "Najpopularniji",
        "CTA": "Započni",
        "FAQ_HEADER": "Često postavljana pitanja",
        "FAQ_1_Q": "Mogu li kasnije promeniti plan?",
        "FAQ_1_A": "Da, možete uvek preći na viši ili niži plan.",
        "FAQ_2_Q": "Da li je dostupno besplatno probno razdoblje?",
        "FAQ_2_A": "Nudimo besplatno probno razdoblje od 14 dana za sve plaćene planove.",
        "FAQ_3_Q": "Kako funkcioniše naplata?",
        "FAQ_3_A": "Svi planovi se naplaćuju mesečno. Opcije godišnjeg obračuna dostupne su za Pro i Enterprise planove.",
        "FEATURE_1": "Izolacija više zakupaca",
        "FEATURE_2": "Osnovna analitika",
        "FEATURE_3": "Prilagođavanje",
        "FEATURE_4": "Konfiguracija zakupca",
        "FEATURE_5": "Migracija",
        "BASIC": "OSNOVNI",
        "PRO": "PRO",
        "ENTERPRISE": "ENTERPRISE"
      },
      "ABOUT": {
        "HEADER": "O nama",
        "DESCRIPTION": "Gradimo budućnost zakazivanja za organizacije svih veličina — dizajniranu za više zakupaca, bezbednu i potpuno prilagodljivu.",
        "MISSION_TITLE": "Naša misija",
        "MISSION_TEXT": "Da pojednostavimo zakazivanje za moderne timove stvaranjem inteligentne, skalabilne platforme koja se prilagođava toku rada svake organizacije.",
        "VISION_TITLE": "Naša vizija",
        "VISION_TEXT": "Da postanemo najpouzdanija infrastruktura za zakazivanje u svim industrijama i zemljama.",
        "WHO_FOR_TITLE": "Kome služimo",
        "WHO_FOR_TEXT": "Bilo da vodite mali biznis, globalno preduzeće ili mrežu nezavisnih profesionalaca, naša platforma vam pomaže da ostanete organizovani i efikasni."
      }
    }
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'rs',
    interpolation: {
      escapeValue: false, 
    },
  });

export default i18n;