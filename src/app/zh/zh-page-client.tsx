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
    title: "水晶潟湖",
    desc: "3.5公里人工潟湖，配私人海滩",
  },
  {
    icon: Building2,
    title: "9大住宅社区",
    desc: "九大独立社区，各有独特设计",
  },
  {
    icon: Star,
    title: "品牌住宅",
    desc: "Address Hotels与Palace品牌联名",
  },
  {
    icon: Shield,
    title: "伊玛尔品质保证",
    desc: "阿联酋最大开发商的品质承诺",
  },
  {
    icon: CreditCard,
    title: "灵活付款计划",
    desc: "80/20及90/10付款方案",
  },
  {
    icon: Plane,
    title: "黄金签证资格",
    desc: "符合阿联酋黄金签证申请条件",
  },
];

const clusters = [
  { name: "Palmiera", price: "1,050万迪拉姆", beds: "4卧室", slug: "palmiera" },
  { name: "Palmiera 3", price: "918万迪拉姆", beds: "4卧室", slug: "palmiera-3" },
  { name: "Mareva", price: "1,347万迪拉姆", beds: "4-6卧室", slug: "mareva-1" },
  { name: "Mareva 2", price: "1,383万迪拉姆", beds: "4-6卧室", slug: "mareva-2" },
  { name: "Mirage", price: "1,580万迪拉姆", beds: "5-6卧室", slug: "mirage" },
  { name: "Lavita", price: "3,700万迪拉姆", beds: "6卧室", slug: "lavita" },
  { name: "Address Villas Tierra", price: "1,316万迪拉姆", beds: "4-6卧室", slug: "adress-villas-tierra" },
  { name: "Palace Villas Ostra", price: "1,390万迪拉姆", beds: "4-6卧室", slug: "palace-villas-ostra" },
  { name: "Palmeira Collective", price: "1,100万迪拉姆", beds: "4卧室", slug: "palmeira-collective" },
];

const faqs = [
  {
    q: "伊玛尔绿洲是什么？",
    a: "伊玛尔绿洲是迪拜的高端水滨社区，占地940万平方米，拥有超过7000套住宅，包括别墅、豪宅和品牌住宅。社区配有清澈的水晶潟湖、运河和翠绿的公园，距离迪拜市中心仅20分钟车程。",
  },
  {
    q: "伊玛尔绿洲的别墅价格是多少？",
    a: "伊玛尔绿洲的别墅价格从Palmiera 3四卧室别墅的918万迪拉姆起，到Lavita超豪华豪宅的5000万迪拉姆以上。九大社区覆盖不同价位，满足各种投资需求。",
  },
  {
    q: "伊玛尔绿洲的付款计划是什么？",
    a: "大多数社区提供80/20付款计划：预订时支付10%，施工期间支付70%，交房时支付20%。Mirage社区提供90/10计划，交房时仅需支付10%，大大降低了购房门槛。",
  },
  {
    q: "伊玛尔绿洲何时完工？",
    a: "交房时间因社区而异：Palmiera 3预计最早完工（2028年第四季度），其次是Palmiera、Lavita和Palmeira Collective（2029年第一至二季度）。Address Villas Tierra预计2029年6月，Palace Villas Ostra预计2029年9月，Mirage预计2029年第四季度。",
  },
  {
    q: "我是否符合黄金签证条件？",
    a: "是的！伊玛尔绿洲所有200万迪拉姆以上的房产都符合阿联酋黄金签证条件。黄金签证提供10年居留权，可担保家庭成员，无需担保人，是海外投资者的理想选择。",
  },
  {
    q: "如何在伊玛尔绿洲购买房产？",
    a: "购买流程：1）联系授权代理伊玛尔绿洲，电话+971 52 691 9169。2）讨论您的需求和预算。3）从9大社区的可用房源中选择。4）支付预订金（通常为10%）。5）按照建设期付款计划付款。6）完成交房和登记手续。",
  },
  {
    q: "伊玛尔绿洲是好的投资吗？",
    a: "伊玛尔绿洲是一项极具吸引力的投资选择，得益于其迪拜黄金地段、伊玛尔品牌物业升值记录、外国人100%永久产权、阿联酋黄金签证资格、世界级配套设施（包括3.5公里水晶潟湖）以及灵活的付款计划。伊玛尔社区历来有显著的资本增值表现。",
  },
  {
    q: "迪拜买房外国人可以拥有100%产权吗？",
    a: "是的，伊玛尔绿洲是迪拜的自由产权区（Freehold），外国买家可以拥有100%的物业产权。这意味着您可以完全拥有房产，无需本地担保人，且房产可以自由转让和继承。",
  },
];

export default function ZhPageClient() {
  return (
    <>
      <SiteHeader />
      <div lang="zh" className="min-h-screen flex flex-col">
        {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <Image
          src="/images/hero-oasis-real.png"
          alt="伊玛尔绿洲 — 迪拜豪华水滨社区"
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
              伊玛尔授权销售代理
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight tracking-tight"
          >
            伊玛尔绿洲
            <span className="block text-[#C8A45C]">迪拜</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-body text-lg sm:text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-4 sm:mb-6 font-light"
          >
            九大独享社区 · 尊贵水滨生活
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-body text-sm sm:text-base text-white/50 max-w-2xl mx-auto mb-8 sm:mb-12"
          >
            Address Villas Tierra · Lavita · Mareva · Mirage · Palace Villas Ostra · Palmeira Collective · Palmiera
            <br />
            <span className="text-[#C8A45C]/80">您信赖的伊玛尔授权合作伙伴</span>
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
                查询房源
              </Button>
            </Link>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="border-[#C8A45C] text-[#C8A45C] hover:bg-[#C8A45C]/10 px-8 py-6 text-base rounded-md w-full sm:w-auto gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp咨询
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
              { icon: Home, label: "起价", value: "918万迪拉姆" },
              { icon: Building2, label: "住宅单位", value: "7,000+" },
              { icon: MapPin, label: "总面积", value: "940万㎡" },
              { icon: Users, label: "位置", value: "距市中心20分钟" },
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
                为什么选择伊玛尔绿洲？
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A2332] mt-3 mb-4">
                卓越特性
              </h2>
              <p className="font-body text-gray-500 max-w-2xl mx-auto text-lg">
                探索伊玛尔绿洲成为迪拜最令人向往社区的原因
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
                九大独享社区
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A2332] mt-3 mb-4">
                探索绿洲系列社区
              </h2>
              <p className="font-body text-gray-500 max-w-2xl mx-auto text-lg">
                九大风格各异的社区，每一个都呈现独特的水滨奢华生活体验
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
                          起价
                        </p>
                        <p className="font-heading text-xl font-bold text-[#C8A45C]">
                          {cluster.price}
                        </p>
                        <div className="flex items-center gap-1 mt-3 text-[#1A2332] group-hover:text-[#C8A45C] transition-colors">
                          <span className="font-body text-sm font-medium">查看详情</span>
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
                常见问题
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A2332] mt-3 mb-4">
                常见问题解答
              </h2>
              <p className="font-body text-gray-500 max-w-2xl mx-auto text-lg">
                关于伊玛尔绿洲的常见问题与解答
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
              开启您的旅程
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-6">
              准备好寻找您的梦想之家了吗？
            </h2>
            <p className="font-body text-white/60 max-w-2xl mx-auto mb-10 text-lg">
              作为伊玛尔授权销售代理，我们提供独家房源、专业指导和个性化服务，覆盖绿洲全部九大社区。
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <Link href="/availability" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="gold-gradient text-[#1A2332] font-bold px-8 py-6 text-base rounded-md hover:opacity-90 w-full sm:w-auto"
                >
                  查询房源
                </Button>
              </Link>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[#C8A45C] text-[#C8A45C] hover:bg-[#C8A45C]/10 px-8 py-6 text-base rounded-md w-full sm:w-auto gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp咨询
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
                <span className="font-body">迪拜，阿联酋</span>
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
