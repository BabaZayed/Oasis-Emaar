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
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

const features = [
  {
    icon: Waves,
    title: "بحيرة بلورية",
    desc: "بحيرة صناعية بطول 3.5 كم مع شاطئ خاص",
  },
  {
    icon: Building2,
    title: "9 مجموعات سكنية",
    desc: "تسع مجموعات حصرية بتصاميم فريدة",
  },
  {
    icon: Star,
    title: "وحدات علامة تجارية",
    desc: "فلل أدرس هوتلز وقصر",
  },
  {
    icon: Shield,
    title: "ضمان جودة إعمار",
    desc: "أكبر مطور عقاري في الإمارات",
  },
  {
    icon: CreditCard,
    title: "خطط دفع مرنة",
    desc: "خطط دفع 80/20 و90/10",
  },
  {
    icon: Plane,
    title: "تأشيرة ذهبية",
    desc: "أهلية التأشيرة الذهبية الإماراتية",
  },
];

const clusters = [
  { name: "بالميرا", price: "10.5 مليون درهم", beds: "4 غرف نوم", slug: "palmiera" },
  { name: "بالميرا 3", price: "9.18 مليون درهم", beds: "4 غرف نوم", slug: "palmiera-3" },
  { name: "ماريفا", price: "13.47 مليون درهم", beds: "4-6 غرف نوم", slug: "mareva-1" },
  { name: "ماريفا 2", price: "13.83 مليون درهم", beds: "4-6 غرف نوم", slug: "mareva-2" },
  { name: "ميراج", price: "15.8 مليون درهم", beds: "5-6 غرف نوم", slug: "mirage" },
  { name: "لافيتا", price: "37 مليون درهم", beds: "6 غرف نوم", slug: "lavita" },
  { name: "فلل أدرس تييرا", price: "13.16 مليون درهم", beds: "4-6 غرف نوم", slug: "adress-villas-tierra" },
  { name: "فلل قصر أوسترا", price: "13.9 مليون درهم", beds: "4-6 غرف نوم", slug: "palace-villas-ostra" },
  { name: "بالميرا الجماعية", price: "11 مليون درهم", beds: "4 غرف نوم", slug: "palmeira-collective" },
];

const faqs = [
  {
    q: "ما هي واحة إعمار؟",
    a: "واحة إعمار هي مجتمع واجهة بحرية فاخر في دبي يمتد على مساحة 9.4 مليون متر مربع ويضم أكثر من 7000 وحدة سكنية تشمل فللاً وقصوراً ووحدات سكنية علامة تجارية. يتميز ببحيرات بلورية صافية وقنوات مائية وحدائق خضراء واسعة، ويقع على بعد 20 دقيقة فقط من وسط دبي.",
  },
  {
    q: "كم تكلفت الفلل في واحة إعمار دبي؟",
    a: "تبدأ أسعار الفلل في واحة إعمار من 9.18 مليون درهم لفلل بالميرا 3 ذات الأربع غرف نوم، وتصل إلى أكثر من 50 مليون درهم لقصور لافيتا الفائقة الفخامة.",
  },
  {
    q: "ما هو خطة الدفع لواحة إعمار؟",
    a: "تقدم معظم المجموعات في الواحة خطة دفع 80/20: 10% عند الحجز، 70% خلال فترة البناء، و20% عند التسليم. تقدم مجموعة ميراج خطة 90/10 مع 10% فقط عند التسليم.",
  },
  {
    q: "متى سيتم الانتهاء من واحة إعمار؟",
    a: "تختلف تواريخ التسليم حسب المجموعة: من المتوقع انتهاء بالميرا 3 أولاً (الربع الرابع 2028)، تليها بالميرا ولافيتا ومجموعة بالميرا الجماعية (الربع الأول-الثاني 2029). من المتوقع أن تكون فلل أدرس تييرا في يونيو 2029 وقصر أوسترا في سبتمبر 2029 وميراج في الربع الرابع 2029.",
  },
  {
    q: "هل أنا مؤهل للتأشيرة الذهبية؟",
    a: "نعم! جميع العقارات في واحة إعمار بسعر 2 مليون درهم أو أكثر مؤهلة للتأشيرة الذهبية الإماراتية. تمنحك التأشيرة الذهبية إقامة لمدة 10 سنوات مع رعاية أفراد العائلة وبدون كفيل.",
  },
  {
    q: "كيف أشتري عقاراً في واحة إعمار دبي؟",
    a: "لشراء عقار في الواحة: 1) تواصل مع وكيل معتمد مثل واحة إعمار على الرقم +971 52 691 9169. 2) ناقش متطلباتك وميزانيتك. 3) اختر من المخزون المتاح عبر 9 مجموعات. 4) ادفع مبلغ الحجز (عادة 10%). 5) اتبع خطة الدفع المرتبطة بالبناء. 6) أكمل التسليم والتسجيل.",
  },
  {
    q: "هل واحة إعمار استثمار جيد؟",
    a: "تعتبر واحة إعمار استثماراً قوياً نظراً لموقعها المتميز في دبي وسجل إعمار الحافل بارتفاع قيم العقارات وملكية الأجانب الكاملة (فريهولد) والتأشيرة الذهبية الإماراتية والمرافق العالمية المستوى بما فيها بحيرة بلورية بطول 3.5 كم وخطط دفع مرنة.",
  },
  {
    q: "من هو الوكيل المعتمد لواحة إعمار؟",
    a: "واحة إعمار هي وكيل مبيعات معتمد لواحة إعمار بروبيرتيز. وهي وساطة عقارية مرخصة مستقلة تقدم إرشاداً متخصصاً ووصولاً حصرياً للمخزون وخدمة شخصية. تواصل: +971 52 691 9169 أو sales@oasisemaar.com.",
  },
];

export default function ArPageClient() {
  return (
    <>
      <SiteHeader />
      <div dir="rtl" lang="ar" className="min-h-screen flex flex-col">
        {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <Image
          src="/images/hero-oasis-real.png"
          alt="واحة إعمار — مجتمع فاخر على الواجهة البحرية في دبي"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <div className="absolute inset-0 hero-overlay" />
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#C8A45C]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase border border-[#C8A45C]/40 text-[#C8A45C] rounded-full">
              وكيل مبيعات إعمار معتمد
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight tracking-tight"
          >
            واحة إعمار
            <span className="block text-[#C8A45C]">دبي</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-body text-lg sm:text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-4 sm:mb-6 font-light"
          >
            9 مجموعات حصرية · معيشة فاخرة على الواجهة البحرية
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-body text-sm sm:text-base text-white/50 max-w-2xl mx-auto mb-8 sm:mb-12"
          >
            فلل أدرس تييرا · لافيتا · ماريفا · ميراج · فلل قصر أوسترا · بالميرا الجماعية · بالميرا
            <br />
            <span className="text-[#C8A45C]/80">شريكك الموثوق والمعتمد من إعمار</span>
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
                تحقق من التوفر
              </Button>
            </Link>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="border-[#C8A45C] text-[#C8A45C] hover:bg-[#C8A45C]/10 px-8 py-6 text-base rounded-md w-full sm:w-auto gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                تواصل واتساب
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
              { icon: Home, label: "تبدأ الأسعار من", value: "9.18 مليون درهم" },
              { icon: Building2, label: "وحدات سكنية", value: "7,000+" },
              { icon: MapPin, label: "المساحة الإجمالية", value: "9.4 مليون م²" },
              { icon: Users, label: "الموقع", value: "20 دقيقة من وسط المدينة" },
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
                لماذا واحة إعمار؟
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A2332] mt-3 mb-4">
                مميزات استثنائية
              </h2>
              <p className="font-body text-gray-500 max-w-2xl mx-auto text-lg">
                اكتشف ما يجعل واحة إعمار واحدة من أكثر المجتمعات تميزاً في دبي
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
                9 مجموعات حصرية
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A2332] mt-3 mb-4">
                اكتشف مجموعات الواحة
              </h2>
              <p className="font-body text-gray-500 max-w-2xl mx-auto text-lg">
                تسع مجموعات مميزة تقدم كل منها تجربة فريدة في المعيشة الفاخرة على الواجهة البحرية
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
                          تبدأ الأسعار من
                        </p>
                        <p className="font-heading text-xl font-bold text-[#C8A45C]">
                          {cluster.price}
                        </p>
                        <div className="flex items-center gap-1 mt-3 text-[#1A2332] group-hover:text-[#C8A45C] transition-colors">
                          <span className="font-body text-sm font-medium">عرض التفاصيل</span>
                          <ArrowRight className="w-4 h-4 rotate-180" />
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
                أسئلة شائعة
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A2332] mt-3 mb-4">
                الأسئلة المتكررة
              </h2>
              <p className="font-body text-gray-500 max-w-2xl mx-auto text-lg">
                إجابات على أكثر الأسئلة شيوعاً حول واحة إعمار
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
                    <AccordionTrigger className="font-heading text-base sm:text-lg font-semibold text-[#1A2332] text-right hover:text-[#C8A45C] hover:no-underline">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="font-body text-gray-600 leading-relaxed text-right">
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
              ابدأ رحلتك
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-6">
              هل أنت مستعد للعثور على منزل أحلامك؟
            </h2>
            <p className="font-body text-white/60 max-w-2xl mx-auto mb-10 text-lg">
              كوكيل مبيعات إعمار معتمد، نقدم وصولاً حصرياً وإرشاداً متخصصاً وخدمة شخصية عبر جميع المجموعات التسع في الواحة.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <Link href="/availability" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="gold-gradient text-[#1A2332] font-bold px-8 py-6 text-base rounded-md hover:opacity-90 w-full sm:w-auto"
                >
                  تحقق من التوفر
                </Button>
              </Link>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[#C8A45C] text-[#C8A45C] hover:bg-[#C8A45C]/10 px-8 py-6 text-base rounded-md w-full sm:w-auto gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  تواصل واتساب
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
                <span className="font-body">دبي، الإمارات العربية المتحدة</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      </div>
      <SiteFooter />
    </>
  );
}
