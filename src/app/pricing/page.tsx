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
  ChevronDown,
  ArrowRight,
} from "lucide-react";

/* -------------------- PAGE -------------------- */
export default function Page() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

  const prices = {
    basic: {
      monthly: 0,
      annual: 0,
    },
    pro: {
      monthly: 399,
      annual: 319, // -20%
    },
  };
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  const faqs = [
    {
      icon: Users,
      question:
        "How does the Professional plan pricing work with additional students?",
      answer:
        "The Professional plan includes up to 50 students. Additional students are billed separately at a fixed monthly rate per student.",
    },
    {
      icon: Clock,
      question: "Is there a free trial for the Professional plan?",
      answer:
        "Yes, we offer a 14-day free trial with full access to all Professional features. No credit card required.",
    },
    {
      icon: RefreshCw,
      question: "Can I upgrade or downgrade my plan anytime?",
      answer:
        "Absolutely. You can change your plan at any time from your dashboard. Changes take effect immediately.",
    },
    {
      icon: CreditCard,
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards including Visa, MasterCard, and American Express.",
    },
    {
      icon: Shield,
      question: "Do you offer refunds?",
      answer:
        "Yes. We offer a 30-day money-back guarantee if you’re not satisfied with the platform.",
    },
    {
      icon: HelpCircle,
      question: "What kind of support do you offer?",
      answer:
        "Basic users receive email support. Professional users get priority support with faster response times.",
    },
  ];

  return (
    <>
      <Header />

      <main className="bg-white">
        <section className="pt-32 pb-28 ">
          <div className="max-w-3xl mx-auto text-center px-4">
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-blue-100 text-blue-600 text-sm font-semibold">
              Pricing Plan
            </span>

            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
              Choose Your Plan
            </h1>

            <p className="text-lg text-gray-500 ">
              Start free, upgrade when you&apos;re ready. No hidden fees, cancel{" "}
              <br /> anytime.
            </p>
          </div>
        </section>
        <div className="flex justify-center mb-16 ">
          <div className="flex items-center bg-gray-100 rounded-full p-1">
            <button
              onClick={() => setBilling("monthly")}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition ${
                billing === "monthly"
                  ? "bg-blue-600 text-white shadow"
                  : "text-gray-500"
              }`}
            >
              Monthly
            </button>

            <button
              onClick={() => setBilling("annual")}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition ${
                billing === "annual"
                  ? "bg-blue-600 text-white shadow"
                  : "text-gray-500"
              }`}
            >
              Annual
            </button>
          </div>
        </div>
        <section className="pb-32 ">
          <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto px-4">
            {/* BASIC PLAN */}
            <div className="rounded-3xl border border-gray-200 p-8 bg-white">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Basic Plan
                </h3>
                <p className="text-gray-500">
                  Perfect for individual tutors just getting started.
                </p>
              </div>

              <div className="mb-8">
                <span className="text-sm text-gray-400">MAD</span>
                <div className="text-5xl font-extrabold text-gray-900">
                  {prices.basic[billing]}
                </div>
                <span className="text-gray-500 text-sm">Forever Free</span>
              </div>

              <ul className="space-y-3 text-gray-600 mb-10">
                <li>✓ 1 class only</li>
                <li>✓ 2 live sessions per week</li>
                <li>✓ Up to 10 students</li>
                <li>✓ Basic payment management</li>
                <li>✓ Student engagement tools</li>
                <li>✓ Email support (48h)</li>
                <li className="line-through text-gray-300">
                  Advanced analytics
                </li>
                <li className="line-through text-gray-300">
                  Automated invoicing
                </li>
              </ul>

              <button className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold">
                Get Started Free
              </button>
            </div>

            {/* PROFESSIONAL PLAN */}
            <div className="relative rounded-3xl p-8 bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-xl">
              <span className="absolute top-5 right-6 bg-white text-blue-600 text-xs font-bold px-3 py-1 rounded-full">
                MOST POPULAR
              </span>

              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2">Professional</h3>
                <p className="text-white/80">
                  For established educators who need advanced features.
                </p>
              </div>

              <div className="mb-8">
                <span className="text-sm text-white/70">MAD</span>
                <div className="text-5xl font-extrabold">
                  {prices.pro[billing]}
                </div>
                <span className="text-white/70 text-sm">
                  /{billing === "monthly" ? "month" : "month (billed annually)"}
                </span>
              </div>

              <ul className="space-y-3 text-white/90 mb-10">
                <li>✓ Unlimited classes</li>
                <li>✓ Unlimited sessions per week</li>
                <li>✓ Up to 50 students included</li>
                <li>✓ Advanced analytics & reporting</li>
                <li>✓ Automated invoicing & payments</li>
                <li>✓ Calendar & scheduling tools</li>
                <li>✓ Parent portal & communication</li>
                <li>✓ Grade & homework management</li>
                <li>✓ Priority support (same-day)</li>
              </ul>

              <button className="w-full py-3 rounded-xl bg-white text-blue-600 font-semibold">
                Start 14-Day Free Trial
              </button>
            </div>
          </div>
        </section>
        <section className="py-28 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-500 text-lg">
                Everything you need to know about our pricing and plans
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {faqs.map((faq, index) => {
                const Icon = faq.icon;
                const isOpen = openFAQ === index;

                return (
                  <div
                    key={index}
                    onClick={() => setOpenFAQ(isOpen ? null : index)}
                    className="cursor-pointer rounded-2xl border border-gray-200 p-6 hover:shadow-sm transition"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-blue-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900">
                          {faq.question}
                        </h3>
                      </div>

                      <ChevronDown
                        className={`w-5 h-5 text-gray-400 transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </div>

                    {isOpen && (
                      <p className="mt-4 text-gray-500 leading-relaxed">
                        {faq.answer}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        <section className="relative py-32 overflow-hidden">

          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700" />

          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.12),transparent_60%)]" />

          <div className="relative max-w-4xl mx-auto px-4 text-center text-white">

            <div className="flex justify-center mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-white" />
                Join 10,000+ educators worldwide
              </span>
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
              Ready to Transform <br className="hidden sm:block" />
              Your Teaching?
            </h2>

            {/* Subtitle */}
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-10">
              Start your free trial today and discover why thousands of
              educators trust our platform
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
              <button className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-white text-blue-600 font-semibold hover:bg-white/90 transition">
                Start Free Trial
                <ArrowRight className="w-4 h-4" />
              </button>

              <button className="px-8 py-3 rounded-xl border border-white/40 text-white font-semibold hover:bg-white/10 transition">
                Contact Sales
              </button>
            </div>

            {/* Footnote */}
            <p className="text-sm text-white/60">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
