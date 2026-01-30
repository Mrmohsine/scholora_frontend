import { Zap, CreditCard, ShieldCheck, Clock } from "lucide-react";

export default function WhyUpgradeSection() {
  const items = [
    {
      icon: Zap,
      title: "Instant Activation",
      desc: "Your new pack features activate immediately after upgrade",
    },
    {
      icon: CreditCard,
      title: "Pro-rated Billing",
      desc: "Pay only for the difference when upgrading mid-cycle",
    },
    {
      icon: ShieldCheck,
      title: "Secure Payments",
      desc: "All transactions are encrypted and secure",
    },
    {
      icon: Clock,
      title: "Cancel Anytime",
      desc: "No long-term contracts, cancel whenever you want",
    },
  ];

  return (
    <div className="w-full bg-white rounded-2xl border shadow-sm p-10 mt-12">
      <h2 className="text-center text-xl font-semibold text-gray-900 mb-8">
        Why Upgrade?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className="text-center">
              <div className="mx-auto w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 mb-4">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">
                {item.title}
              </h3>
              <p className="text-sm text-gray-500">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
