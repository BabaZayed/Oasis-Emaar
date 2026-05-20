"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Home,
  Waves,
  Building2,
  Shield,
  CreditCard,
  Plane,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Star,
  Users,
  ArrowRight,
  CheckCircle,
  ChevronDown,
} from "lucide-react";
import { WHATSAPP_LINK, PHONE_NUMBER, EMAIL } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

const features = [
  {
    icon: Waves,
    title: "Кристальная лагуна",
    desc: "Искусственная лагуна длиной 3.5 км с приватным пляжем",
  },
  {
    icon: Building2,
    title: "9 жилых кластеров",
    desc: "Девять эксклюзивных кластеров с уникальным дизайном",
  },
  {
    icon: Star,
    title: "Брендовые резиденции",
    desc: "Совместные проекты с Address Hotels и Palace",
  },
  {
    icon: Shield,
    title: "Гарантия качества Emaar",
    desc: "Качество от крупнейшего застройщика ОАЭ",
  },
  {
    icon: CreditCard,
    title: "Гибкие планы оплаты",
    desc: "Планы оплаты 80/20 и 90/10",
  },
  {
    icon: Plane,
    title: "Золотая виза",
    desc: "Право на получение золотой визы ОАЭ",
  },
];

const clusters = [
  { name: "Palmiera", price: "10.5 млн дирхам", beds: "4 спальни", slug: "palmiera" },
  { name: "Palmiera 3", price: "9.18 млн дирхам", beds: "4 спальни", slug: "palmiera-3" },
  { name: "Mareva", price: "13.47 млн дирхам", beds: "4-6 спален", slug: "mareva-1" },
  { name: "Mareva 2", price: "13.83 млн дирхам", beds: "4-6 спален", slug: "mareva-2" },
  { name: "Mirage", price: "15.8 млн дирхам", beds: "5-6 спален", slug: "mirage" },
  { name: "Lavita", price: "37 млн дирхам", beds: "6 спален", slug: "lavita" },
  { name: "Address Villas Tierra", price: "13.16 млн дирхам", beds: "4-6 спален", slug: "adress-villas-tierra" },
  { name: "Palace Villas Ostra", price: "13.9 млн дирхам", beds: "4-6 спален", slug: "palace-villas-ostra" },
  { name: "Palmeira Collective", price: "11 млн дирхам", beds: "4 спальни", slug: "palmeira-collective" },
];

const faqs = [
  {
    q: "Что такое Оазис Эмаар?",
    a: "Оазис Эмаар — это премиальный прибрежный комплекс в Дубае, занимающий 9.4 миллиона квадратных метров и включающий более 7000 жилых единиц: виллы, особняки и брендовые резиденции. Комплекс отличается кристальными лагунами, каналами и пышными зелёными парками, расположен всего в 20 минутах от центра Дубая.",
  },
  {
    q: "Сколько стоят виллы в Оазисе Эмаар?",
    a: "Цены на виллы начинаются от 9.18 млн дирхам за четырёхкомнатные виллы Palmiera 3 и достигают более 50 млн дирхам за ультрароскошные особняки Lavita. Девять кластеров охватывают различные ценовые категории для любых инвестиционных целей.",
  },
  {
    q: "Какой план оплаты в Оазисе Эмаар?",
    a: "Большинство кластеров предлагают план оплаты 80/20: 10% при бронировании, 70% в период строительства и 20% при передаче. Кластер Mirage предлагает план 90/10 с выплатой всего 10% при передаче ключей, что значительно снижает порог входа.",
  },
  {
    q: "Когда будет завершено строительство Оазиса Эмаар?",
    a: "Сроки передачи зависят от кластера: Palmiera 3 ожидается первым (Q4 2028), за ним следуют Palmiera, Lavita и Palmeira Collective (Q1-Q2 2029). Address Villas Tierra — июнь 2029, Palace Villas Ostra — сентябрь 2029, Mirage — Q4 2029.",
  },
  {
    q: "Имею ли я право на золотую визу?",
    a: "Да! Все объекты недвижимости в Оазисе Эмаар стоимостью от 2 млн дирхам дают право на получение золотой визы ОАЭ. Золотая виза предоставляет 10-летнее резидентство, право спонсировать членов семьи и не требует работодателя-спонсора — идеальный вариант для иностранных инвесторов.",
  },
  {
    q: "Как купить недвижимость в Оазисе Эмаар?",
    a: "Процесс покупки: 1) Свяжитесь с авторизованным агентом Оазис Эмаар по телефону +971 52 691 9169. 2) Обсудите ваши требования и бюджет. 3) Выберите из доступных объектов в 9 кластерах. 4) Внесите бронировочный платёж (обычно 10%). 5) Следуйте графику платежей, привязанному к строительству. 6) Завершите передачу и регистрацию.",
  },
  {
    q: "Является ли Оазис Эмаар хорошей инвестицией?",
    a: "Оазис Эмаар считается привлекательной инвестицией благодаря премиальному расположению в Дубае, проверенной истории роста стоимости недвижимости от Emaar, 100% свободной собственности для иностранных покупателей, праву на золотую визу ОАЭ, мировому уровню удобств (включая кристальную лагуну 3.5 км) и гибким планам оплаты. Комплексы Emaar исторически показывают значительный рост капитала.",
  },
  {
    q: "Могут ли иностранцы владеть недвижимостью в Дубае?",
    a: "Да, Оазис Эмаар расположен во фрифолд-зоне Дубая, где иностранные покупатели могут владеть недвижимостью на правах 100% собственности. Это означает полное владение без необходимости местного спонсора, а недвижимость можно свободно передавать и наследовать.",
  },
];

export default function RuPageClient() {
  return (
    <div lang="ru" className="min-h-screen flex flex-col">
      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <Image
          src="/images/hero-oasis-real.png"
          alt="Оазис Эмаар — Роскошный прибрежный комплекс в Дубае"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <div className="absolute inset-0 hero-overlay" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#C8A45C]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase border border-[#C8A45C]/40 text-[#C8A45C] rounded-full">
              Авторизованный агент Emaar
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight tracking-tight"
          >
            Оазис Эмаар
            <span className="block text-[#C8A45C]">Дубай</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-body text-lg sm:text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-4 sm:mb-6 font-light"
          >
            9 Эксклюзивных кластеров · Роскошная жизнь у воды
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-body text-sm sm:text-base text-white/50 max-w-2xl mx-auto mb-8 sm:mb-12"
          >
            Address Villas Tierra · Lavita · Mareva · Mirage · Palace Villas Ostra · Palmeira Collective · Palmiera
            <br />
            <span className="text-[#C8A45C]/80">Ваш надёжный авторизованный партнёр Emaar</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 sm:mb-16"
          >
            <Link href="/availability" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="gold-gradient text-[#1A2332] font-bold px-8 py-6 text-base rounded-md hover:opacity-90 transition-opacity w-full sm:w-auto"
              >
                Проверить наличие
              </Button>
            </Link>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="border-[#C8A45C] text-[#C8A45C] hover:bg-[#C8A45C]/10 px-8 py-6 text-base rounded-md w-full sm:w-auto gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </Button>
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto"
          >
            {[
              { icon: Home, label: "Цены от", value: "9.18 млн AED" },
              { icon: Building2, label: "Резиденций", value: "7,000+" },
              { icon: MapPin, label: "Общая площадь", value: "9.4 млн м²" },
              { icon: Users, label: "Расположение", value: "20 мин от центра" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 sm:p-6"
              >
                <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#C8A45C] mx-auto mb-2" />
                <p className="font-heading text-lg sm:text-xl md:text-2xl font-bold text-white">
                  {stat.value}
                </p>
                <p className="font-body text-xs sm:text-sm text-white/50 uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ChevronDown className="w-8 h-8 text-[#C8A45C]/60" />
          </motion.div>
        </motion.div>
      </section>

      <main className="flex-1">
        {/* ===== KEY FEATURES ===== */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <span className="font-body text-sm font-semibold tracking-[0.2em] uppercase text-[#C8A45C]">
                Почему Оазис Эмаар?
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A2332] mt-3 mb-4">
                Исключительные преимущества
              </h2>
              <p className="font-body text-gray-500 max-w-2xl mx-auto text-lg">
                Откройте для себя причины, по которым Оазис Эмаар стал одним из самых желанных комплексов Дубая
              </p>
              <div className="section-divider max-w-xs mx-auto mt-6" />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {features.map((feature) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group">
                    <CardContent className="p-6 sm:p-8 text-center">
                      <div className="w-14 h-14 rounded-xl bg-[#1A2332] flex items-center justify-center mx-auto mb-4 group-hover:bg-[#C8A45C] transition-colors duration-300">
                        <feature.icon className="w-7 h-7 text-[#C8A45C] group-hover:text-[#1A2332] transition-colors duration-300" />
                      </div>
                      <h3 className="font-heading text-xl font-bold text-[#1A2332] mb-2">
                        {feature.title}
                      </h3>
                      <p className="font-body text-gray-500 leading-relaxed">{feature.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CLUSTERS OVERVIEW ===== */}
        <section className="py-16 sm:py-24 bg-[#F5F0E8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <span className="font-body text-sm font-semibold tracking-[0.2em] uppercase text-[#C8A45C]">
                9 Эксклюзивных кластеров
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A2332] mt-3 mb-4">
                Коллекция кластеров Оазиса
              </h2>
              <p className="font-body text-gray-500 max-w-2xl mx-auto text-lg">
                Девять уникальных кластеров, каждый из которых предлагает свой взгляд на роскошную жизнь у воды
              </p>
              <div className="section-divider max-w-xs mx-auto mt-6" />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {clusters.map((cluster) => (
                <motion.div
                  key={cluster.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <Link href={`/projects/${cluster.slug}`}>
                    <Card className="h-full border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
                      <CardContent className="p-5 sm:p-6">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="font-heading text-lg font-bold text-[#1A2332] group-hover:text-[#C8A45C] transition-colors">
                            {cluster.name}
                          </h3>
                          <Badge className="bg-[#1A2332] text-[#C8A45C] text-[10px] font-semibold border-0">
                            {cluster.beds}
                          </Badge>
                        </div>
                        <p className="font-body text-sm text-gray-400 uppercase tracking-wider mb-1">
                          Цены от
                        </p>
                        <p className="font-heading text-xl font-bold text-[#C8A45C]">
                          {cluster.price}
                        </p>
                        <div className="flex items-center gap-1 mt-3 text-[#1A2332] group-hover:text-[#C8A45C] transition-colors">
                          <span className="font-body text-sm font-medium">Подробнее</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <span className="font-body text-sm font-semibold tracking-[0.2em] uppercase text-[#C8A45C]">
                Часто задаваемые вопросы
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A2332] mt-3 mb-4">
                Вопросы и ответы
              </h2>
              <p className="font-body text-gray-500 max-w-2xl mx-auto text-lg">
                Ответы на самые популярные вопросы об Оазисе Эмаар
              </p>
              <div className="section-divider max-w-xs mx-auto mt-6" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`}>
                    <AccordionTrigger className="font-heading text-base sm:text-lg font-semibold text-[#1A2332] text-left hover:text-[#C8A45C] hover:no-underline">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="font-body text-gray-600 leading-relaxed text-left">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </section>

        {/* ===== CTA ===== */}
        <section className="py-20 sm:py-28 bg-[#1A2332] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="font-body text-sm font-semibold tracking-[0.2em] uppercase text-[#C8A45C]">
              Начните свой путь
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-6">
              Готовы найти дом мечты?
            </h2>
            <p className="font-body text-white/60 max-w-2xl mx-auto mb-10 text-lg">
              Как авторизованный агент Emaar, мы предоставляем эксклюзивный доступ, экспертное руководство и индивидуальный подход во всех 9 кластерах Оазиса.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <Link href="/availability" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="gold-gradient text-[#1A2332] font-bold px-8 py-6 text-base rounded-md hover:opacity-90 w-full sm:w-auto"
                >
                  Проверить наличие
                </Button>
              </Link>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[#C8A45C] text-[#C8A45C] hover:bg-[#C8A45C]/10 px-8 py-6 text-base rounded-md w-full sm:w-auto gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp
                </Button>
              </a>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-white/50">
              <a href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`} className="flex items-center gap-2 hover:text-[#C8A45C] transition-colors">
                <Phone className="w-4 h-4" />
                <span className="font-body">{PHONE_NUMBER}</span>
              </a>
              <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 hover:text-[#C8A45C] transition-colors">
                <Mail className="w-4 h-4" />
                <span className="font-body">{EMAIL}</span>
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span className="font-body">Дубай, ОАЭ</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Simple Footer */}
      <footer className="bg-[#0F1520] py-8 text-center">
        <p className="font-body text-white/40 text-sm">
          © {new Date().getFullYear()} Оазис Эмаар — Авторизованный агент по продажам. Все права защищены.
        </p>
        <div className="flex items-center justify-center gap-4 mt-4">
          <Link href="/" className="font-body text-white/40 text-sm hover:text-[#C8A45C] transition-colors">
            English
          </Link>
          <Link href="/ar" className="font-body text-white/40 text-sm hover:text-[#C8A45C] transition-colors">
            العربية
          </Link>
          <Link href="/zh" className="font-body text-white/40 text-sm hover:text-[#C8A45C] transition-colors">
            中文
          </Link>
        </div>
      </footer>
    </div>
  );
}
