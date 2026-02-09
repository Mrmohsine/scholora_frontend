import { Check, Star } from "lucide-react";
import { useEffect, useState } from "react";

interface PricingPack {
  id: number;
  name: string;
  slug: string;
  price: string;
  currency: string;
  billing_period: string;
  description: string;
  features: string[];
  is_active: boolean;
  is_popular: boolean;
  sort_order: number;
}

export default function UpgradePackPage({
  title,
  currentPackSlug,
}: {
  title: boolean;
  currentPackSlug?: string;
}) {
  const [packs, setPacks] = useState<PricingPack[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPacks();
  }, []);

  const fetchPacks = async () => {
    try {
      const res = await fetch("/api/admin/pricing-packs");
      const data = await res.json();

      if (Array.isArray(data)) {
        setPacks(
          data
            .filter((p) => p.is_active)
            .sort((a, b) => a.sort_order - b.sort_order)
        );
      }
    } catch (err) {
      console.error("Pack fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-10 text-center">Loading plans...</div>;

  return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900">
          {title ? "Upgrade Your Pack" : "Choose Your Plan"}
        </h1>
        <p className="text-gray-500 mt-2">
          Choose the perfect plan to grow your tutoring business
        </p>
      </div>

      {/* Dynamic cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {packs.map((pack) => {
          const isCurrent = pack.slug === currentPackSlug;

          return (
            <div
              key={pack.id}
              className={`relative rounded-2xl p-8 shadow-sm transition hover:shadow-lg hover:scale-[1.02]
                ${
                  pack.is_popular
                    ? "border-2 border-blue-500 bg-white"
                    : "border bg-white"
                } text-black`}
            >
              {/* Badges */}
              <div className="absolute -top-3 right-4 flex gap-2">
                {pack.is_popular && (
                  <span className="flex items-center gap-1 px-3 py-1 text-xs bg-blue-500 text-white rounded-full">
                    <Star className="w-3 h-3" />
                    Most Popular
                  </span>
                )}

                {isCurrent && (
                  <span className="px-3 py-1 text-xs bg-green-500 text-white rounded-full">
                    Current Plan
                  </span>
                )}
              </div>

              <h2 className="text-xl font-semibold mb-2">{pack.name}</h2>
              <p className="text-gray-500 mb-4">{pack.description}</p>

              {/* Price */}
              <div className="mb-6">
                <span className="text-4xl font-bold">
                  {pack.currency} {pack.price}
                </span>
                <span className="text-gray-500">
                  /{pack.billing_period}
                </span>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {pack.features.map((feature) => (
                  <li key={feature} className="flex gap-2 text-gray-700">
                    <Check className="w-4 h-4 text-blue-600 mt-1" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA logic */}
              {isCurrent ? (
                <button
                  disabled
                  className="w-full py-2 rounded-lg bg-gray-400 text-white"
                >
                  Current Plan
                </button>
              ) : pack.slug === "professional" ? (
                <button className="w-full py-2 rounded-lg border hover:bg-blue-50 hover:border-blue-600 hover:text-blue-600">
                  Contact Sales
                </button>
              ) : (
                <button className="w-full py-2 rounded-lg border hover:bg-blue-50 hover:border-blue-600 hover:text-blue-600">
                  Upgrade Plan
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}