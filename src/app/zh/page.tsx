import { Metadata } from "next";
import ZhPageClient from "./zh-page-client";

export const metadata: Metadata = {
  title: "伊玛尔绿洲 | 授权代理 — 迪拜豪华水滨别墅",
  description:
    "通过授权代理探索伊玛尔绿洲。迪拜高端水滨社区，拥有豪华别墅、豪宅和品牌住宅。起价918万迪拉姆。专业指导，独家房源。",
  keywords: [
    "迪拜别墅",
    "伊玛尔绿洲",
    "迪拜房产",
    "迪拜水滨别墅",
    "迪拜投资",
    "伊玛尔地产",
    "迪拜豪华别墅",
    "绿洲社区",
    "迪拜买房",
    "黄金签证迪拜",
    "迪拜期房",
    "水滨社区迪拜",
    "迪拜房地产投资",
  ],
  openGraph: {
    title: "伊玛尔绿洲 | 授权代理 — 迪拜豪华水滨别墅",
    description:
      "通过授权代理探索伊玛尔绿洲。迪拜高端水滨社区，拥有豪华别墅和豪宅。起价918万迪拉姆。",
    url: "https://oasisemaar.com/zh",
    siteName: "伊玛尔绿洲 — 授权代理",
    type: "website",
    locale: "zh_CN",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "伊玛尔绿洲 — 迪拜豪华水滨社区",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "伊玛尔绿洲 | 授权代理 — 迪拜豪华水滨别墅",
    description: "通过授权代理探索伊玛尔绿洲。迪拜高端水滨社区，起价918万迪拉姆。",
    images: ["/og-image.jpg"],
    creator: "@OasisEmaar",
    site: "@OasisEmaar",
  },
  alternates: {
    canonical: "https://oasisemaar.com/zh",
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
  name: "伊玛尔绿洲 — 授权销售代理",
  description:
    "伊玛尔绿洲在迪拜的授权销售代理。提供起价918万迪拉姆的豪华水滨别墅、豪宅及品牌住宅。",
  url: "https://oasisemaar.com/zh",
  telephone: "+971526919169",
  email: "sales@oasisemaar.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Al Quoz Street 21",
    addressLocality: "迪拜",
    addressRegion: "迪拜",
    addressCountry: "AE",
  },
  priceRange: "918万 - 5000万+ 迪拉姆",
  areaServed: {
    "@type": "City",
    name: "迪拜",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "伊玛尔绿洲是什么？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "伊玛尔绿洲是迪拜的高端水滨社区，占地940万平方米，拥有超过7000套住宅，包括别墅、豪宅和品牌住宅。社区配有清澈的水晶潟湖、运河和翠绿的公园，距离迪拜市中心仅20分钟车程。",
      },
    },
    {
      "@type": "Question",
      name: "伊玛尔绿洲的别墅价格是多少？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "伊玛尔绿洲的别墅价格从Palmiera 3四卧室别墅的918万迪拉姆起，到Lavita超豪华豪宅的5000万迪拉姆以上。九大社区的价格范围从918万到5000万+迪拉姆。",
      },
    },
    {
      "@type": "Question",
      name: "伊玛尔绿洲的付款计划是什么？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "大多数社区提供80/20付款计划：预订时支付10%，施工期间支付70%，交房时支付20%。Mirage社区提供90/10计划，交房时仅需支付10%。",
      },
    },
    {
      "@type": "Question",
      name: "伊玛尔绿洲何时完工？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "交房时间因社区而异：Palmiera 3预计最早完工（2028年第四季度），其次是Palmiera、Lavita和Palmeira Collective（2029年第一至二季度）。Address Villas Tierra预计2029年6月，Palace Villas Ostra预计2029年9月，Mirage预计2029年第四季度。",
      },
    },
    {
      "@type": "Question",
      name: "我是否符合黄金签证条件？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "是的！伊玛尔绿洲所有200万迪拉姆以上的房产都符合阿联酋黄金签证条件。黄金签证提供10年居留权，可担保家庭成员，无需担保人。",
      },
    },
    {
      "@type": "Question",
      name: "如何在伊玛尔绿洲购买房产？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "购买流程：1）联系授权代理，如伊玛尔绿洲，电话+971 52 691 9169。2）讨论您的需求和预算。3）从9大社区的可用房源中选择。4）支付预订金（通常为10%）。5）按照建设期付款计划付款。6）完成交房和登记手续。",
      },
    },
    {
      "@type": "Question",
      name: "伊玛尔绿洲是好的投资吗？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "伊玛尔绿洲是一项强劲的投资选择，得益于其迪拜黄金地段、伊玛尔品牌物业升值记录、外国人100%永久产权、阿联酋黄金签证资格、世界级配套设施（包括3.5公里水晶潟湖）以及灵活的付款计划。",
      },
    },
    {
      "@type": "Question",
      name: "迪拜买房外国人可以拥有100%产权吗？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "是的，伊玛尔绿洲是迪拜的自由产权区，外国买家可以拥有100%的物业产权。这意味着您可以完全拥有房产，无需本地担保人，且房产可以自由转让和继承。",
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
      name: "首页",
      item: "https://oasisemaar.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "伊玛尔绿洲 — 中文",
      item: "https://oasisemaar.com/zh",
    },
  ],
};

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "伊玛尔绿洲 | 授权代理 — 迪拜豪华水滨别墅",
  description:
    "通过授权代理探索伊玛尔绿洲。迪拜高端水滨社区，拥有豪华别墅、豪宅和品牌住宅。",
  url: "https://oasisemaar.com/zh",
  inLanguage: "zh",
  author: {
    "@type": "RealEstateAgent",
    name: "伊玛尔绿洲 — 授权销售代理",
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

export default function ZhPage() {
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
      <ZhPageClient />
    </>
  );
}
