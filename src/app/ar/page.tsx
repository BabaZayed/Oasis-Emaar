import { Metadata } from "next";
import ArPageClient from "./ar-page-client";

export const metadata: Metadata = {
  title: "واحة إعمار | وكيل معتمد — فلل فاخرة على الواجهة البحرية في دبي",
  description:
    "استكشف واحة إعمار مع وكيل مبيعات معتمد. مجتمع واجهة بحرية فاخر في دبي يضم فلل فاخرة وقصوراً ووحدات سكنية علامة تجارية. تبدأ الأسعار من 9.18 مليون درهم. إرشاد متخصص ووصول حصري للمخزون.",
  keywords: [
    "فلل دبي",
    "واحة إعمار",
    "عقارات دبي",
    "فلل واجهة بحرية دبي",
    "إعمار العقارية",
    "فلل فاخرة دبي",
    "مجمع واحة إعمار",
    "شراء عقار في دبي",
    "تأشيرة ذهبية دبي",
    "فلل إعمار",
    "استثمار عقاري دبي",
    "واجهة بحرية دبي",
    "فلل للبيع دبي",
  ],
  openGraph: {
    title: "واحة إعمار | وكيل معتمد — فلل فاخرة على الواجهة البحرية في دبي",
    description:
      "استكشف واحة إعمار مع وكيل مبيعات معتمد. مجتمع واجهة بحرية فاخر في دبي يضم فلل فاخرة وقصوراً. تبدأ الأسعار من 9.18 مليون درهم.",
    url: "https://oasisemaar.com/ar",
    siteName: "Oasis Emaar — وكيل معتمد",
    type: "website",
    locale: "ar_AE",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "واحة إعمار — مجتمع فاخر على الواجهة البحرية في دبي",
      },
    ],
  },
  alternates: {
    canonical: "https://oasisemaar.com/ar",
    languages: {
      "en": "https://oasisemaar.com",
      "ar": "https://oasisemaar.com/ar",
      "zh": "https://oasisemaar.com/zh",
      "ru": "https://oasisemaar.com/ru",
      "fr": "https://oasisemaar.com/fr",
      "de": "https://oasisemaar.com/de",
    },
  },
};

const realEstateAgentJsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "واحة إعمار — وكيل مبيعات معتمد",
  description:
    "وكيل مبيعات معتمد لواحة إعمار في دبي. نقدم فلل واجهة بحرية فاخرة وقصوراً ووحدات سكنية علامة تجارية تبدأ من 9.18 مليون درهم.",
  url: "https://oasisemaar.com/ar",
  telephone: "+971526919169",
  email: "sales@oasisemaar.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "شارع القوز 21",
    addressLocality: "دبي",
    addressRegion: "دبي",
    addressCountry: "AE",
  },
  priceRange: "9.18 مليون درهم - 50 مليون+ درهم",
  areaServed: {
    "@type": "City",
    name: "دبي",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "ما هي واحة إعمار؟",
      acceptedAnswer: {
        "@type": "Answer",
        text: "واحة إعمار هي مجتمع واجهة بحرية فاخر في دبي يمتد على مساحة 9.4 مليون متر مربع ويضم أكثر من 7000 وحدة سكنية تشمل فللاً وقصوراً ووحدات سكنية علامة تجارية. يتميز ببحيرات بلورية صافية وقنوات مائية وحدائق خضراء واسعة، ويقع على بعد 20 دقيقة فقط من وسط دبي.",
      },
    },
    {
      "@type": "Question",
      name: "كم تكلفت الفلل في واحة إعمار دبي؟",
      acceptedAnswer: {
        "@type": "Answer",
        text: "تبدأ أسعار الفلل في واحة إعمار من 9.18 مليون درهم لفلل بالميرا 3 ذات الأربع غرف نوم، وتصل إلى أكثر من 50 مليون درهم لقصور لافيتا الفائقة الفخامة. يتراوح نطاق الأسعار عبر جميع المجموعات التسع من 9.18 مليون إلى أكثر من 50 مليون درهم.",
      },
    },
    {
      "@type": "Question",
      name: "ما هو خطة الدفع لواحة إعمار؟",
      acceptedAnswer: {
        "@type": "Answer",
        text: "تقدم معظم المجموعات في الواحة خطة دفع 80/20: 10% عند الحجز، 70% خلال فترة البناء، و20% عند التسليم. تقدم مجموعة ميراج خطة 90/10 مع 10% فقط عند التسليم.",
      },
    },
    {
      "@type": "Question",
      name: "متى سيتم الانتهاء من واحة إعمار؟",
      acceptedAnswer: {
        "@type": "Answer",
        text: "تختلف تواريخ التسليم حسب المجموعة: من المتوقع انتهاء بالميرا 3 أولاً (الربع الرابع 2028)، تليها بالميرا ولافيتا ومجموعة بالميرا الجماعية (الربع الأول-الثاني 2029). من المتوقع أن تكون فلل أدرس تييرا في يونيو 2029 وقصر أوسترا في سبتمبر 2029 وميراج في الربع الرابع 2029.",
      },
    },
    {
      "@type": "Question",
      name: "هل أنا مؤهل للتأشيرة الذهبية؟",
      acceptedAnswer: {
        "@type": "Answer",
        text: "نعم! جميع العقارات في واحة إعمار بسعر 2 مليون درهم أو أكثر مؤهلة للتأشيرة الذهبية الإماراتية. تمنحك التأشيرة الذهبية إقامة لمدة 10 سنوات مع رعاية أفراد العائلة وبدون كفيل.",
      },
    },
    {
      "@type": "Question",
      name: "كيف أشتري عقاراً في واحة إعمار دبي؟",
      acceptedAnswer: {
        "@type": "Answer",
        text: "لشراء عقار في الواحة: 1) تواصل مع وكيل معتمد مثل واحة إعمار على الرقم +971 52 691 9169. 2) ناقش متطلباتك وميزانيتك. 3) اختر من المخزون المتاح عبر 9 مجموعات. 4) ادفع مبلغ الحجز (عادة 10%). 5) اتبع خطة الدفع المرتبطة بالبناء. 6) أكمل التسليم والتسجيل.",
      },
    },
    {
      "@type": "Question",
      name: "هل واحة إعمار استثمار جيد؟",
      acceptedAnswer: {
        "@type": "Answer",
        text: "تعتبر واحة إعمار استثماراً قوياً نظراً لموقعها المتميز في دبي وسجل إعمار الحافل بارتفاع قيم العقارات وملكية الأجانب الكاملة (فريهولد) والتأشيرة الذهبية الإماراتية والمرافق العالمية المستوى بما فيها بحيرة بلورية بطول 3.5 كم وخطط دفع مرنة.",
      },
    },
    {
      "@type": "Question",
      name: "من هو الوكيل المعتمد لواحة إعمار؟",
      acceptedAnswer: {
        "@type": "Answer",
        text: "واحة إعمار هي وكيل مبيعات معتمد لواحة إعمار بروبيرتيز. وهي وساطة عقارية مرخصة مستقلة تقدم إرشاداً متخصصاً ووصولاً حصرياً للمخزون وخدمة شخصية. تواصل: +971 52 691 9169 أو sales@oasisemaar.com.",
      },
    },
  ],
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "الرئيسية",
      item: "https://oasisemaar.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "واحة إعمار — العربية",
      item: "https://oasisemaar.com/ar",
    },
  ],
};

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "واحة إعمار | وكيل معتمد — فلل فاخرة على الواجهة البحرية في دبي",
  description:
    "استكشف واحة إعمار مع وكيل مبيعات معتمد. مجتمع واجهة بحرية فاخر في دبي يضم فلل فاخرة وقصوراً ووحدات سكنية علامة تجارية.",
  url: "https://oasisemaar.com/ar",
  inLanguage: "ar",
  author: {
    "@type": "RealEstateAgent",
    name: "واحة إعمار — وكيل مبيعات معتمد",
    telephone: "+971526919169",
    email: "sales@oasisemaar.com",
  },
  publisher: {
    "@type": "Organization",
    name: "Oasis Emaar",
    logo: {
      "@type": "ImageObject",
      url: "https://oasisemaar.com/logo.svg",
    },
  },
};

export default function ArPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(realEstateAgentJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <ArPageClient />
    </>
  );
}
