"use client";

import { useState } from "react";
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

export default function Page() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const prices = {
    basic: { monthly: 0, annual: 0 },
    pro: { monthly: 399, annual: 319 },
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

            {/* Pricing Cards */}
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Basic Plan */}
              <div className="group relative bg-white rounded-3xl border-2 border-gray-200 p-8 hover:border-[#0168AF]/30 hover:shadow-xl transition-all duration-300">
                <div className="absolute -top-4 left-8">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gray-100 text-gray-700 text-xs font-bold">
                    <Star className="w-3 h-3" />
                    STARTER
                  </span>
                </div>

                <div className="pt-4 mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Basic Plan</h3>
                  <p className="text-gray-600">Perfect for individual tutors starting their journey.</p>
                </div>

                <div className="mb-8">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-6xl font-bold text-gray-900">{prices.basic[billing]}</span>
                    <span className="text-gray-500 font-medium">MAD</span>
                  </div>
                  <span className="text-gray-500 font-medium">Forever Free</span>
                </div>

                <button className="w-full py-4 rounded-xl bg-gray-100 text-gray-900 font-semibold hover:bg-gray-200 transition-colors mb-8">
                  Get Started Free
                </button>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#0168AF] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">1 class only</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#0168AF] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">2 live sessions per week</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#0168AF] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Up to 10 students</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#0168AF] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Basic payment management</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#0168AF] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Student engagement tools</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#0168AF] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Email support (48h)</span>
                  </div>
                </div>
              </div>

              {/* Professional Plan */}
              <div className="group relative bg-gradient-to-br from-[#0168AF] to-[#0152a3] rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-[1.02]">
                <div className="absolute -top-4 left-8">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-400 text-amber-900 text-xs font-bold shadow-lg">
                    <TrendingUp className="w-3 h-3" />
                    MOST POPULAR
                  </span>
                </div>

                <div className="pt-4 mb-8">
                  <h3 className="text-2xl font-bold text-white mb-3">Professional</h3>
                  <p className="text-white/90">Advanced features for established educators.</p>
                </div>

                <div className="mb-8">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-6xl font-bold text-white">{prices.pro[billing]}</span>
                    <span className="text-white/80 font-medium">MAD</span>
                  </div>
                  <span className="text-white/80 font-medium">
                    /{billing === "monthly" ? "month" : "month (billed annually)"}
                  </span>
                </div>

                <button className="w-full py-4 rounded-xl bg-white text-[#0168AF] font-semibold hover:bg-gray-50 transition-colors shadow-lg mb-8">
                  Start 14-Day Free Trial
                </button>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                    <span className="text-white/95">Unlimited classes</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                    <span className="text-white/95">Unlimited sessions per week</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                    <span className="text-white/95">Up to 50 students included</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                    <span className="text-white/95">Advanced analytics & reporting</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                    <span className="text-white/95">Automated invoicing & payments</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                    <span className="text-white/95">Calendar & scheduling tools</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                    <span className="text-white/95">Parent portal & communication</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                    <span className="text-white/95">Grade & homework management</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                    <span className="text-white/95">Priority support (same-day)</span>
                  </div>
                </div>
              </div>
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