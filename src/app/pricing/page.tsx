// src/app/pricing/page.tsx
"use client";

import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  Users,
  Clock,
  RefreshCw,
  CreditCard,
  Shield,
  HelpCircle,
  Check,
  Zap,
  Star,
  TrendingUp,
} from "lucide-react";

interface PricingPack {
  id: number;
  name: string;
  slug: string;
  price: number;
  currency: string;
  billing_period: string;
  virtual_classrooms: number;
  sessions_per_week: number | null;
  max_students: number;
  basic_payment_collection: boolean;
  automated_invoicing: boolean;
  student_roster: boolean;
  attendance_tracking: boolean;
  full_tool_suite: boolean;
  premium_features: boolean;
  description: string;
  is_active: boolean;
  is_popular: boolean;
  sort_order: number;
}

export default function Page() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [packs, setPacks] = useState<PricingPack[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPacks();
  }, []);

  const fetchPacks = async () => {
    try {
      const res = await fetch('/api/admin/pricing-packs');
      const data = await res.json();
      
      if (Array.isArray(data)) {
        // Filtrer seulement les packs actifs et trier par sort_order
        const activePacks = data.filter(pack => pack.is_active).sort((a, b) => a.sort_order - b.sort_order);
        setPacks(activePacks);
      }
    } catch (error) {
      console.error('Error fetching packs:', error);
    } finally {
      setLoading(false);
    }
  };

  const faqs = [
    {
      icon: Users,
      question: "How does the Professional plan pricing work with additional students?",
      answer: "The Professional plan includes up to 50 students. Additional students are billed separately at a fixed monthly rate per student.",
    },
    {
      icon: Clock,
      question: "Is there a free trial for the Professional plan?",
      answer: "Yes, we offer a 14-day free trial with full access to all Professional features. No credit card required.",
    },
    {
      icon: RefreshCw,
      question: "Can I upgrade or downgrade my plan anytime?",
      answer: "Absolutely. You can change your plan at any time from your dashboard. Changes take effect immediately.",
    },
    {
      icon: CreditCard,
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards including Visa, MasterCard, and American Express.",
    },
    {
      icon: Shield,
      question: "Do you offer refunds?",
      answer: "Yes. We offer a 30-day money-back guarantee if you're not satisfied with the platform.",
    },
    {
      icon: HelpCircle,
      question: "What kind of support do you offer?",
      answer: "Basic users receive email support. Professional users get priority support with faster response times.",
    },
  ];

  if (loading) {
    return (
      <>
        <Header />
        <div className="flex h-screen items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#0168AF] border-t-transparent"></div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <main className="bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="pt-24 pb-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0168AF]/10 text-[#0168AF] text-sm font-semibold mb-6">
                <Zap className="w-4 h-4" />
                Simple, Transparent Pricing
              </div>

              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Plans That Scale
                <br />
                <span className="text-[#0168AF]">With Your Success</span>
              </h1>

              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Choose the perfect plan for your teaching journey. Start free, upgrade as you grow.
              </p>
            </div>

            {/* Billing Toggle */}
            <div className="flex justify-center mb-16">
              <div className="relative inline-flex items-center bg-white rounded-full p-1.5 shadow-lg border border-gray-200">
                <button
                  onClick={() => setBilling("monthly")}
                  className={`relative px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                    billing === "monthly"
                      ? "bg-[#0168AF] text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Monthly
                </button>

                <button
                  onClick={() => setBilling("annual")}
                  className={`relative px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                    billing === "annual"
                      ? "bg-[#0168AF] text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Annual
                  <span className="ml-2 px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-bold">
                    -20%
                  </span>
                </button>
              </div>
            </div>

            {/* Pricing Cards - Dynamique */}
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {packs.map((pack) => (
                <div
                  key={pack.id}
                  className={`group relative rounded-3xl p-8 transition-all duration-300 ${
                    pack.is_popular
                      ? "bg-gradient-to-br from-[#0168AF] to-[#0152a3] shadow-2xl hover:shadow-3xl transform hover:scale-[1.02]"
                      : "bg-white border-2 border-gray-200 hover:border-[#0168AF]/30 hover:shadow-xl"
                  }`}
                >
                  <div className="absolute -top-4 left-8">
                    <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold shadow-lg ${
                      pack.is_popular
                        ? "bg-amber-400 text-amber-900"
                        : "bg-gray-100 text-gray-700"
                    }`}>
                      {pack.is_popular ? (
                        <>
                          <TrendingUp className="w-3 h-3" />
                          MOST POPULAR
                        </>
                      ) : (
                        <>
                          <Star className="w-3 h-3" />
                          STARTER
                        </>
                      )}
                    </span>
                  </div>

                  <div className="pt-4 mb-8">
                    <h3 className={`text-2xl font-bold mb-3 ${pack.is_popular ? "text-white" : "text-gray-900"}`}>
                      {pack.name}
                    </h3>
                    <p className={pack.is_popular ? "text-white/90" : "text-gray-600"}>
                      {pack.description}
                    </p>
                  </div>

                  <div className="mb-8">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className={`text-6xl font-bold ${pack.is_popular ? "text-white" : "text-gray-900"}`}>
                        {billing === "annual" && pack.billing_period === "annual" 
                          ? Math.round(pack.price * 0.8) 
                          : pack.price}
                      </span>
                      <span className={`font-medium ${pack.is_popular ? "text-white/80" : "text-gray-500"}`}>
                        {pack.currency}
                      </span>
                    </div>
                    <span className={`font-medium ${pack.is_popular ? "text-white/80" : "text-gray-500"}`}>
                      {pack.price === 0 
                        ? "Forever Free"
                        : `/${billing === "monthly" ? "month" : "month (billed annually)"}`}
                    </span>
                  </div>

                  <button className={`w-full py-4 rounded-xl font-semibold transition-colors shadow-lg mb-8 ${
                    pack.is_popular
                      ? "bg-white text-[#0168AF] hover:bg-gray-50"
                      : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                  }`}>
                    {pack.price === 0 ? "Get Started Free" : "Start 14-Day Free Trial"}
                  </button>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${pack.is_popular ? "text-white" : "text-[#0168AF]"}`} />
                      <span className={pack.is_popular ? "text-white/95" : "text-gray-700"}>
                        {pack.virtual_classrooms === 1 
                          ? "1 virtual classroom" 
                          : `${pack.virtual_classrooms} virtual classrooms`}
                      </span>
                    </div>

                    <div className="flex items-start gap-3">
                      <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${pack.is_popular ? "text-white" : "text-[#0168AF]"}`} />
                      <span className={pack.is_popular ? "text-white/95" : "text-gray-700"}>
                        {pack.sessions_per_week 
                          ? `${pack.sessions_per_week} sessions per week`
                          : "Unlimited sessions per week"}
                      </span>
                    </div>

                    <div className="flex items-start gap-3">
                      <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${pack.is_popular ? "text-white" : "text-[#0168AF]"}`} />
                      <span className={pack.is_popular ? "text-white/95" : "text-gray-700"}>
                        Up to {pack.max_students} students
                      </span>
                    </div>

                    {pack.automated_invoicing && (
                      <div className="flex items-start gap-3">
                        <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${pack.is_popular ? "text-white" : "text-[#0168AF]"}`} />
                        <span className={pack.is_popular ? "text-white/95" : "text-gray-700"}>
                          Automated invoicing & payments
                        </span>
                      </div>
                    )}

                    {pack.full_tool_suite && (
                      <div className="flex items-start gap-3">
                        <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${pack.is_popular ? "text-white" : "text-[#0168AF]"}`} />
                        <span className={pack.is_popular ? "text-white/95" : "text-gray-700"}>
                          Full tool suite & premium features
                        </span>
                      </div>
                    )}

                    {pack.basic_payment_collection && !pack.automated_invoicing && (
                      <div className="flex items-start gap-3">
                        <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${pack.is_popular ? "text-white" : "text-[#0168AF]"}`} />
                        <span className={pack.is_popular ? "text-white/95" : "text-gray-700"}>
                          Basic payment collection
                        </span>
                      </div>
                    )}

                    {pack.student_roster && (
                      <div className="flex items-start gap-3">
                        <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${pack.is_popular ? "text-white" : "text-[#0168AF]"}`} />
                        <span className={pack.is_popular ? "text-white/95" : "text-gray-700"}>
                          Student roster & attendance
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600">
                Everything you need to know about our pricing
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => {
                const Icon = faq.icon;
                const isOpen = openFAQ === index;

                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-[#0168AF]/30 hover:shadow-lg transition-all duration-300"
                  >
                    <button
                      onClick={() => setOpenFAQ(isOpen ? null : index)}
                      className="w-full flex items-center justify-between gap-4 p-6 text-left"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[#0168AF]/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-[#0168AF]" />
                        </div>
                        <h3 className="font-semibold text-gray-900 text-lg">{faq.question}</h3>
                      </div>

                      <div
                        className={`w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                          isOpen ? "rotate-180 bg-[#0168AF]/10" : ""
                        }`}
                      >
                        <svg
                          className={`w-5 h-5 ${isOpen ? "text-[#0168AF]" : "text-gray-600"}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-6 pb-6">
                        <p className="text-gray-600 leading-relaxed pl-16">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0168AF] via-[#0152a3] to-[#013d7a]" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-10" />

          <div className="relative max-w-4xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-semibold mb-8">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Join 10,000+ educators worldwide
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Ready to Transform Your Teaching?
            </h2>

            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10">
              Start your free trial today and discover why thousands of educators trust our platform
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
              <button className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-[#0168AF] font-semibold hover:bg-gray-50 transition-all shadow-xl hover:shadow-2xl">
                Start Free Trial
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>

              <button className="px-8 py-4 rounded-xl border-2 border-white/40 text-white font-semibold hover:bg-white/10 backdrop-blur-sm transition-all">
                Contact Sales
              </button>
            </div>

            <p className="text-sm text-white/70">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}