// ═══════════════════════════════════════════════════════════
// i18n Translations for Oasis Emaar Website
// Supports: en, ar, zh, ru, fr, de
// ═══════════════════════════════════════════════════════════

export type LangCode = "en" | "ar" | "zh" | "ru" | "fr" | "de";

export const langNames: Record<LangCode, { label: string; flag: string; href: string }> = {
  en: { label: "English", flag: "🇬🇧", href: "/" },
  ar: { label: "العربية", flag: "🇸🇦", href: "/ar" },
  zh: { label: "中文", flag: "🇨🇳", href: "/zh" },
  ru: { label: "Русский", flag: "🇷🇺", href: "/ru" },
  fr: { label: "Français", flag: "🇫🇷", href: "/fr" },
  de: { label: "Deutsch", flag: "🇩🇪", href: "/de" },
};

export const langCodes: LangCode[] = ["en", "ar", "zh", "ru", "fr", "de"];

export function detectLang(pathname: string): LangCode {
  if (pathname.startsWith("/ar")) return "ar";
  if (pathname.startsWith("/zh")) return "zh";
  if (pathname.startsWith("/ru")) return "ru";
  if (pathname.startsWith("/fr")) return "fr";
  if (pathname.startsWith("/de")) return "de";
  return "en";
}

// ─── Header Translations ───
export const headerT: Record<LangCode, {
  nav: { label: string; href: string }[];
  checkAvailability: string;
  sellProperty: string;
  logoSubtitle: string;
}> = {
  en: {
    nav: [
      { label: "Home", href: "/" },
      { label: "Inventory", href: "/inventory" },
      { label: "Projects", href: "/projects" },
      { label: "Marketplace", href: "/marketplace" },
      { label: "Sell Property", href: "/sell" },
      { label: "Floor Plans", href: "/floor-plans" },
      { label: "Payment Plan", href: "/payment-plan" },
      { label: "Gallery", href: "/gallery" },
      { label: "Blog", href: "/blog" },
      { label: "About", href: "/about" },
      { label: "Reviews", href: "/#feedback" },
      { label: "FAQ", href: "/faq" },
      { label: "Listings", href: "/listings" },
      { label: "Contact", href: "/contact" },
    ],
    checkAvailability: "Check Availability",
    sellProperty: "Sell Property",
    logoSubtitle: "EMAAR | AUTHORIZED AGENT",
  },
  ar: {
    nav: [
      { label: "الرئيسية", href: "/" },
      { label: "المخزون", href: "/inventory" },
      { label: "المشاريع", href: "/projects" },
      { label: "السوق", href: "/marketplace" },
      { label: "بيع عقار", href: "/sell" },
      { label: "مخططات الطوابق", href: "/floor-plans" },
      { label: "خطة الدفع", href: "/payment-plan" },
      { label: "المعرض", href: "/gallery" },
      { label: "المدونة", href: "/blog" },
      { label: "عن الوكالة", href: "/about" },
      { label: "التقييمات", href: "/#feedback" },
      { label: "الأسئلة الشائعة", href: "/faq" },
      { label: "القوائم", href: "/listings" },
      { label: "اتصل بنا", href: "/contact" },
    ],
    checkAvailability: "تحقق من التوفر",
    sellProperty: "بيع عقار",
    logoSubtitle: "إعمار | وكيل معتمد",
  },
  zh: {
    nav: [
      { label: "首页", href: "/" },
      { label: "房源", href: "/inventory" },
      { label: "项目", href: "/projects" },
      { label: "市场", href: "/marketplace" },
      { label: "出售房产", href: "/sell" },
      { label: "户型图", href: "/floor-plans" },
      { label: "付款计划", href: "/payment-plan" },
      { label: "图库", href: "/gallery" },
      { label: "博客", href: "/blog" },
      { label: "关于我们", href: "/about" },
      { label: "评价", href: "/#feedback" },
      { label: "常见问题", href: "/faq" },
      { label: "房源列表", href: "/listings" },
      { label: "联系我们", href: "/contact" },
    ],
    checkAvailability: "查询房源",
    sellProperty: "出售房产",
    logoSubtitle: "伊玛尔 | 授权代理",
  },
  ru: {
    nav: [
      { label: "Главная", href: "/" },
      { label: "Наличие", href: "/inventory" },
      { label: "Проекты", href: "/projects" },
      { label: "Маркетплейс", href: "/marketplace" },
      { label: "Продать", href: "/sell" },
      { label: "Планы этажей", href: "/floor-plans" },
      { label: "План оплаты", href: "/payment-plan" },
      { label: "Галерея", href: "/gallery" },
      { label: "Блог", href: "/blog" },
      { label: "О нас", href: "/about" },
      { label: "Отзывы", href: "/#feedback" },
      { label: "Вопросы", href: "/faq" },
      { label: "Объявления", href: "/listings" },
      { label: "Контакты", href: "/contact" },
    ],
    checkAvailability: "Проверить наличие",
    sellProperty: "Продать",
    logoSubtitle: "EMAAR | АВТОРИЗ. АГЕНТ",
  },
  fr: {
    nav: [
      { label: "Accueil", href: "/" },
      { label: "Inventaire", href: "/inventory" },
      { label: "Projets", href: "/projects" },
      { label: "Marché", href: "/marketplace" },
      { label: "Vendre", href: "/sell" },
      { label: "Plans d'étage", href: "/floor-plans" },
      { label: "Plan de Paiement", href: "/payment-plan" },
      { label: "Galerie", href: "/gallery" },
      { label: "Blog", href: "/blog" },
      { label: "À Propos", href: "/about" },
      { label: "Avis", href: "/#feedback" },
      { label: "FAQ", href: "/faq" },
      { label: "Annonces", href: "/listings" },
      { label: "Contact", href: "/contact" },
    ],
    checkAvailability: "Vérifier la Disponibilité",
    sellProperty: "Vendre",
    logoSubtitle: "EMAAR | AGENT AUTORISÉ",
  },
  de: {
    nav: [
      { label: "Startseite", href: "/" },
      { label: "Bestand", href: "/inventory" },
      { label: "Projekte", href: "/projects" },
      { label: "Marktplatz", href: "/marketplace" },
      { label: "Verkaufen", href: "/sell" },
      { label: "Grundrisse", href: "/floor-plans" },
      { label: "Zahlungsplan", href: "/payment-plan" },
      { label: "Galerie", href: "/gallery" },
      { label: "Blog", href: "/blog" },
      { label: "Über Uns", href: "/about" },
      { label: "Bewertungen", href: "/#feedback" },
      { label: "FAQ", href: "/faq" },
      { label: "Angebote", href: "/listings" },
      { label: "Kontakt", href: "/contact" },
    ],
    checkAvailability: "Verfügbarkeit Prüfen",
    sellProperty: "Verkaufen",
    logoSubtitle: "EMAAR | AUTORIS. AGENT",
  },
};

// ─── Footer Translations ───
export const footerT: Record<LangCode, {
  quickLinks: string;
  contact: string;
  newsletter: string;
  newsletterDesc: string;
  newsletterPlaceholder: string;
  newsletterJoin: string;
  newsletterSuccess: string;
  trustedResources: string;
  exploreMore: string;
  brandDesc: string;
  brandDisclaimer: string;
  copyright: string;
  privacy: string;
  terms: string;
  disclaimer: string;
}> = {
  en: {
    quickLinks: "Quick Links",
    contact: "Contact",
    newsletter: "Newsletter",
    newsletterDesc: "Stay updated with The Oasis project news and exclusive offers.",
    newsletterPlaceholder: "Your email",
    newsletterJoin: "Join",
    newsletterSuccess: "You're subscribed! Check your inbox soon.",
    trustedResources: "Trusted Resources",
    exploreMore: "Explore More Properties",
    brandDesc: "Authorized sales agent for Emaar Properties' The Oasis community in Dubai. We are an independent real estate brokerage — not Emaar Properties directly.",
    brandDisclaimer: "All project information, specifications, and pricing are provided for marketing purposes and are subject to change by the developer. Images and renders are artistic impressions only.",
    copyright: "Oasis Emaar (Authorised Sales Agent). All rights reserved. We are an independent authorised real estate brokerage, NOT Emaar Properties PJSC. Emaar, The Oasis, Address, Palace, and related names are trademarks of Emaar Properties PJSC.",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    disclaimer: "Disclaimer",
  },
  ar: {
    quickLinks: "روابط سريعة",
    contact: "اتصل بنا",
    newsletter: "النشرة الإخبارية",
    newsletterDesc: "ابق على اطلاع بأخبار مشروع الواحة والعروض الحصرية.",
    newsletterPlaceholder: "بريدك الإلكتروني",
    newsletterJoin: "اشترك",
    newsletterSuccess: "تم الاشتراك! تحقق من بريدك الوارد قريباً.",
    trustedResources: "موارد موثوقة",
    exploreMore: "استكشف المزيد من العقارات",
    brandDesc: "وكيل مبيعات معتمد لمجتمع واحة إعمار في دبي. نحن وساطة عقارية مستقلة — لسنا إعمار بروبيرتيز مباشرة.",
    brandDisclaimer: "جميع معلومات المشروع والمواصفات والأسعار مقدمة لأغراض تسويقية وقابلة للتغيير من قبل المطور. الصور والرسوم هي انطباعات فنية فقط.",
    copyright: "واحة إعمار (وكيل مبيعات معتمد). جميع الحقوق محفوظة. نحن وساطة عقارية معتمدة مستقلة، لسنا إعمار بروبيرتيز. إعمار والواحة وأدرس وقصر وأسماء أخرى هي علامات تجارية لإعمار بروبيرتيز.",
    privacy: "سياسة الخصوصية",
    terms: "شروط الخدمة",
    disclaimer: "إخلاء المسؤولية",
  },
  zh: {
    quickLinks: "快速链接",
    contact: "联系我们",
    newsletter: "订阅通讯",
    newsletterDesc: "获取绿洲项目最新资讯和独家优惠。",
    newsletterPlaceholder: "您的邮箱",
    newsletterJoin: "订阅",
    newsletterSuccess: "订阅成功！请查看您的收件箱。",
    trustedResources: "权威资源",
    exploreMore: "探索更多楼盘",
    brandDesc: "伊玛尔绿洲社区在迪拜的授权销售代理。我们是一家独立的房地产经纪公司——并非伊玛尔地产本身。",
    brandDisclaimer: "所有项目信息、规格和定价仅供营销参考，可能由开发商随时变更。图片和渲染图仅为艺术效果图。",
    copyright: "Oasis Emaar（授权销售代理）。保留所有权利。我们是独立的授权房地产经纪公司，非伊玛尔地产。伊玛尔、绿洲、Address、Palace及相关名称为伊玛尔地产的商标。",
    privacy: "隐私政策",
    terms: "服务条款",
    disclaimer: "免责声明",
  },
  ru: {
    quickLinks: "Быстрые Ссылки",
    contact: "Контакты",
    newsletter: "Рассылка",
    newsletterDesc: "Будьте в курсе новостей проекта Оазис и эксклюзивных предложений.",
    newsletterPlaceholder: "Ваш email",
    newsletterJoin: "Подписаться",
    newsletterSuccess: "Вы подписаны! Проверьте почту.",
    trustedResources: "Проверенные Ресурсы",
    exploreMore: "Другие Проекты",
    brandDesc: "Авторизованный агент по продажам комплекса Оазис Эмаар в Дубае. Мы независимое лицензированное агентство недвижимости — не Emaar Properties напрямую.",
    brandDisclaimer: "Вся информация о проекте, спецификации и цены предоставлены в маркетинговых целях и могут быть изменены застройщиком. Изображения являются художественными впечатлениями.",
    copyright: "Оазис Эмаар (Авторизованный агент). Все права защищены. Мы независимое авторизованное агентство недвижимости, НЕ Emaar Properties PJSC. Emaar, The Oasis, Address, Palace и связанные названия являются товарными знаками Emaar Properties PJSC.",
    privacy: "Политика конфиденциальности",
    terms: "Условия использования",
    disclaimer: "Отказ от ответственности",
  },
  fr: {
    quickLinks: "Liens Rapides",
    contact: "Contact",
    newsletter: "Newsletter",
    newsletterDesc: "Restez informé des nouvelles du projet The Oasis et des offres exclusives.",
    newsletterPlaceholder: "Votre email",
    newsletterJoin: "S'inscrire",
    newsletterSuccess: "Vous êtes inscrit ! Vérifiez votre boîte de réception.",
    trustedResources: "Ressources de Confiance",
    exploreMore: "Autres Projets",
    brandDesc: "Agent de vente autorisé pour la communauté The Oasis d'Emaar Properties à Dubaï. Nous sommes une agence immobilière indépendante — pas Emaar Properties directement.",
    brandDisclaimer: "Toutes les informations sur le projet, les spécifications et les prix sont fournies à des fins marketing et peuvent être modifiées par le promoteur. Les images sont des impressions artistiques uniquement.",
    copyright: "Oasis Emaar (Agent de Vente Autorisé). Tous droits réservés. Nous sommes une agence immobilière autorisée indépendante, PAS Emaar Properties PJSC. Emaar, The Oasis, Address, Palace et noms associés sont des marques d'Emaar Properties PJSC.",
    privacy: "Politique de Confidentialité",
    terms: "Conditions d'Utilisation",
    disclaimer: "Avertissement",
  },
  de: {
    quickLinks: "Schnelllinks",
    contact: "Kontakt",
    newsletter: "Newsletter",
    newsletterDesc: "Bleiben Sie über The Oasis Projektneuigkeiten und exklusive Angebote informiert.",
    newsletterPlaceholder: "Ihre E-Mail",
    newsletterJoin: "Anmelden",
    newsletterSuccess: "Sie sind angemeldet! Prüfen Sie Ihren Posteingang.",
    trustedResources: "Vertrauenswürdige Quellen",
    exploreMore: "Weitere Projekte",
    brandDesc: "Autorisierter Verkaufsagent für die The Oasis Gemeinde von Emaar Properties in Dubai. Wir sind ein unabhängiges Immobilienunternehmen — nicht Emaar Properties direkt.",
    brandDisclaimer: "Alle Projektinformationen, Spezifikationen und Preise dienen Marketingzwecken und können vom Bauträger geändert werden. Bilder und Renderings sind künstlerische Impressionen.",
    copyright: "Oasis Emaar (Autorisierter Verkaufsagent). Alle Rechte vorbehalten. Wir sind ein unabhängiges autorisiertes Immobilienunternehmen, NICHT Emaar Properties PJSC. Emaar, The Oasis, Address, Palace und verwandte Namen sind Marken der Emaar Properties PJSC.",
    privacy: "Datenschutz",
    terms: "Nutzungsbedingungen",
    disclaimer: "Haftungsausschluss",
  },
};
