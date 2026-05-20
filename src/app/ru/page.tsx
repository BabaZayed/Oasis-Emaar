import { Metadata } from "next";
import RuPageClient from "./ru-page-client";

export const metadata: Metadata = {
  title: "Оазис Эмаар | Авторизованный агент — Роскошные виллы у воды в Дубае",
  description:
    "Исследуйте Оазис Эмаар с авторизованным агентом по продажам. Премиальный прибрежный комплекс в Дубае с роскошными виллами, особняками и брендовыми резиденциями. Цены от 9.18 млн дирхам. Экспертное руководство, эксклюзивный доступ к объектам.",
  keywords: [
    "виллы дубай",
    "оазис эмаар",
    "недвижимость дубай",
    "виллы у воды дубай",
    "инвестиции дубай",
    "эмаар пропертиз",
    "роскошные виллы дубай",
    "оазис комплекс дубай",
    "покупка недвижимости дубай",
    "золотая виза дубай",
    "недвижимость офф-план дубай",
    "прибрежный комплекс дубай",
    "инвестиции в недвижимость дубай",
  ],
  openGraph: {
    title: "Оазис Эмаар | Авторизованный агент — Роскошные виллы у воды в Дубае",
    description:
      "Исследуйте Оазис Эмаар с авторизованным агентом. Премиальный прибрежный комплекс в Дубае с роскошными виллами и особняками. Цены от 9.18 млн дирхам.",
    url: "https://oasisemaar.com/ru",
    siteName: "Оазис Эмаар — Авторизованный агент",
    type: "website",
    locale: "ru_AE",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Оазис Эмаар — Роскошный прибрежный комплекс в Дубае",
      },
    ],
  },
  alternates: {
    canonical: "https://oasisemaar.com/ru",
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
  name: "Оазис Эмаар — Авторизованный агент по продажам",
  description:
    "Авторизованный агент по продажам Оазиса Эмаар в Дубае. Предлагаем роскошные прибрежные виллы, особняки и брендовые резиденции от 9.18 млн дирхам.",
  url: "https://oasisemaar.com/ru",
  telephone: "+971526919169",
  email: "sales@oasisemaar.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Al Quoz Street 21",
    addressLocality: "Дубай",
    addressRegion: "Дубай",
    addressCountry: "AE",
  },
  priceRange: "9.18 млн - 50 млн+ дирхам",
  areaServed: {
    "@type": "City",
    name: "Дубай",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Что такое Оазис Эмаар?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Оазис Эмаар — это премиальный прибрежный комплекс в Дубае, занимающий 9.4 миллиона квадратных метров и включающий более 7000 жилых единиц: виллы, особняки и брендовые резиденции. Комплекс отличается кристальными лагунами, каналами и пышными зелёными парками, расположен всего в 20 минутах от центра Дубая.",
      },
    },
    {
      "@type": "Question",
      name: "Сколько стоят виллы в Оазисе Эмаар?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Цены на виллы в Оазисе Эмаар начинаются от 9.18 млн дирхам за четырёхкомнатные виллы Palmiera 3 и достигают более 50 млн дирхам за ультрароскошные особняки Lavita. Диапазон цен по всем девяти кластерам — от 9.18 до 50+ млн дирхам.",
      },
    },
    {
      "@type": "Question",
      name: "Какой план оплаты в Оазисе Эмаар?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Большинство кластеров предлагают план оплаты 80/20: 10% при бронировании, 70% в период строительства и 20% при передаче. Кластер Mirage предлагает план 90/10 с выплатой всего 10% при передаче ключей.",
      },
    },
    {
      "@type": "Question",
      name: "Когда будет завершено строительство Оазиса Эмаар?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Сроки передачи зависят от кластера: Palmiera 3 ожидается первым (Q4 2028), за ним следуют Palmiera, Lavita и Palmeira Collective (Q1-Q2 2029). Address Villas Tierra — июнь 2029, Palace Villas Ostra — сентябрь 2029, Mirage — Q4 2029.",
      },
    },
    {
      "@type": "Question",
      name: "Имею ли я право на золотую визу?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Да! Все объекты недвижимости в Оазисе Эмаар стоимостью от 2 млн дирхам дают право на получение золотой визы ОАЭ. Золотая виза предоставляет 10-летнее резидентство, право спонсировать членов семьи и не требует работодателя-спонсора.",
      },
    },
    {
      "@type": "Question",
      name: "Как купить недвижимость в Оазисе Эмаар?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Процесс покупки: 1) Свяжитесь с авторизованным агентом Оазис Эмаар по телефону +971 52 691 9169. 2) Обсудите ваши требования и бюджет. 3) Выберите из доступных объектов в 9 кластерах. 4) Внесите бронировочный платёж (обычно 10%). 5) Следуйте графику платежей, привязанному к строительству. 6) Завершите передачу и регистрацию.",
      },
    },
    {
      "@type": "Question",
      name: "Является ли Оазис Эмаар хорошей инвестицией?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Оазис Эмаар считается сильной инвестицией благодаря премиальному расположению в Дубае, проверенной истории роста стоимости недвижимости от Emaar, 100% свободной собственности для иностранных покупателей, праву на золотую визу ОАЭ, мировому уровню удобств (включая кристальную лагуну длиной 3.5 км) и гибким планам оплаты.",
      },
    },
    {
      "@type": "Question",
      name: "Могут ли иностранцы владеть недвижимостью в Дубае?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Да, Оазис Эмаар расположен во фрифолд-зоне Дубая, где иностранные покупатели могут владеть недвижимостью на правах 100% собственности. Это означает полное владение без необходимости местного спонсора, а недвижимость можно свободно передавать и наследовать.",
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
      name: "Главная",
      item: "https://oasisemaar.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Оазис Эмаар — Русский",
      item: "https://oasisemaar.com/ru",
    },
  ],
};

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Оазис Эмаар | Авторизованный агент — Роскошные виллы у воды в Дубае",
  description:
    "Исследуйте Оазис Эмаар с авторизованным агентом. Премиальный прибрежный комплекс в Дубае с роскошными виллами, особняками и брендовыми резиденциями.",
  url: "https://oasisemaar.com/ru",
  inLanguage: "ru",
  author: {
    "@type": "RealEstateAgent",
    name: "Оазис Эмаар — Авторизованный агент",
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

export default function RuPage() {
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
      <RuPageClient />
    </>
  );
}
