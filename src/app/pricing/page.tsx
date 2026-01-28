"use client";
import { useState } from "react";
import { Zap, Crown, CheckCircle2 } from "lucide-react";
import { PricingCard } from "@/components/PricingCard";
import { PricingToggle } from "@/components/PricingToggle";
import { FeatureTable } from "@/components/FeatureTable";
import { FAQSection } from "@/components/FAQSection";
import { CTASection } from "@/components/CTASection";
import { SectionHeader } from "@/components/SectionHeader";

const Index = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const starterFeatures = [
    { text: "1 class only", included: true },
    { text: "2 live sessions per week", included: true },
    { text: "Up to 10 students", included: true },
    { text: "Basic payment management", included: true },
    { text: "Student engagement tools", included: true },
    { text: "Email support (48h)", included: true },
    { text: "Advanced analytics", included: false },
    { text: "Parent portal access", included: false },
    { text: "Automated invoicing", included: false },
  ];

  const professionalFeatures = [
    { text: "Unlimited classes", included: true },
    { text: "Unlimited sessions per week", included: true },
    { text: "Up to 50 students included", included: true },
    { text: "Advanced analytics & reporting", included: true },
    { text: "Automated invoicing & payments", included: true },
    { text: "Calendar & scheduling tools", included: true },
    { text: "Parent portal & communication", included: true },
    { text: "Grade & homework management", included: true },
    { text: "Priority support (same-day)", included: true },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-20 pb-28 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-primary/5 via-primary/3 to-transparent rounded-full blur-3xl pointer-events-none" />
        
        <div className="container max-w-5xl relative">
          <div className="text-center mb-16">
            <SectionHeader
              badge="Simple & Transparent Pricing"
              title="Choose Your Plan"
              subtitle="Start free, upgrade when you're ready. No hidden fees, cancel anytime."
            />

            <div className="flex justify-center mb-6">
              <PricingToggle isAnnual={isAnnual} onToggle={setIsAnnual} />
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground mt-8">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                No setup fees
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                Cancel anytime
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                14-day free trial
              </span>
            </div>
          </div>

          {/* Pricing Cards - 2 columns */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <PricingCard
              icon={
                <div className="feature-icon feature-icon-blue">
                  <Zap className="w-6 h-6" />
                </div>
              }
              title="Starter"
              description="Perfect for individual tutors just getting started with a small group of students."
              priceLabel="MAD"
              price="0"
              priceSuffix="Forever Free"
              features={starterFeatures}
              buttonText="Get Started Free"
            />

            <PricingCard
              icon={
                <div className="feature-icon feature-icon-white">
                  <Crown className="w-6 h-6" />
                </div>
              }
              title="Professional"
              description="For established educators who need advanced features and more flexibility."
              priceLabel="MAD"
              price={isAnnual ? "319" : "399"}
              priceSuffix={isAnnual ? "/mo billed yearly" : "/month"}
              features={professionalFeatures}
              buttonText="Start 14-Day Free Trial"
              featured
              badge="Most Popular"
            />
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-24 bg-muted/40">
        <div className="container max-w-4xl">
          <SectionHeader
            title="Compare Plans"
            subtitle="See exactly what's included in each plan"
          />

          <FeatureTable />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="container max-w-5xl">
          <SectionHeader
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about our pricing and plans"
          />

          <FAQSection />
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </div>
  );
};

export default Index;
