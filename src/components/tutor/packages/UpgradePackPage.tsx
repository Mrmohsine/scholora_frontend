import { Check, Star } from "lucide-react";
import { useEffect, useState } from "react";
import RenewPopup from "../Dashboard/RenewPopup";

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
  email,
  register = false
}: {
  title: boolean;
  currentPackSlug?: string;
  email?: string;
  register?: boolean;
}) {
  const [packs, setPacks] = useState<PricingPack[]>([]);
  const [loading, setLoading] = useState(true);
  const [showRenew, setShowRenew] = useState(false);

  const isProfessionalUser = currentPackSlug === "professional";

  useEffect(() => {
    fetchPacks();
  }, []);

  const fetchPacks = async () => {
    try {
      const res = await fetch("/api/admin/pricing-packs");
      const data = await res.json();

      if (Array.isArray(data)) {
        let filtered = data
          .filter((p) => p.is_active)
          .sort((a, b) => a.sort_order - b.sort_order);

        if (isProfessionalUser) {
          filtered = filtered.filter((p) => p.slug === "professional");
        }

        setPacks(filtered);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-10 text-center">Loading plans...</div>;
  console.log(packs);
  return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900">
          {title ? "Upgrade Your Pack" : "Look Our Plans and Features"}
        </h1>
        <p className="text-gray-500 mt-2">
          Choose the perfect plan to grow your tutoring business
        </p>
      </div>

      {/* Layout */}
      <div
        className={
          packs.length === 1
            ? "flex justify-center"
            : "grid grid-cols-1 md:grid-cols-2 gap-8"
        }
      >
        {packs.map((pack) => {
          const isCurrent =
            (!isProfessionalUser && pack.slug === "free") ||
            (isProfessionalUser && pack.slug === "professional");

          let buttonLabel = "";
          let onClick = () => {};
          let disabled = false;

          if (pack.slug === "free") {
            buttonLabel = "Included";
            disabled = true;
          }

          if (pack.slug === "professional") {
            if (isProfessionalUser) {
              buttonLabel = "Renew";
              onClick = () => setShowRenew(true);
            } else {
              buttonLabel = "Upgrade to Professional";
              onClick = () => setShowRenew(true);
            }
          }

          return (
            <div
              key={pack.id}
              className={`relative rounded-2xl p-8 shadow-sm transition hover:shadow-lg hover:scale-[1.02]
                ${packs.length === 1 ? "w-full max-w-md" : ""}
                ${isCurrent ? "border-2 border-blue-600" : "border"}
                bg-white text-black`}
            >
              {/* Badges */}
              <div className="absolute -top-3 right-4 flex gap-2">
                {pack.is_popular && (
                  <span className="flex items-center gap-1 px-3 py-1 text-xs bg-blue-500 text-white rounded-full">
                    <Star className="w-3 h-3" />
                    Most Popular
                  </span>
                )}

                {!isProfessionalUser && pack.slug === "free" && (
                  <span className="px-3 py-1 text-xs bg-yellow-400 text-yellow-900 rounded-full font-medium">
                    Current Plan
                  </span>
                )}
              </div>

              <h2 className="text-xl font-semibold mb-2">{pack.name}</h2>

              <p className="text-gray-500 mb-4">{pack.description}</p>

              <div className="mb-6">
                {pack.slug === "free" ? (
                  <span className="text-2xl font-bold text-green-600">
                    Free trial for 30 days
                  </span>
                ) : (
                  <>
                    <span className="text-4xl font-bold">
                      {pack.currency} {pack.price}
                    </span>
                    <span className="text-gray-500">
                      /{pack.billing_period}
                    </span>
                  </>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {pack.features.map((feature) => (
                  <li key={feature} className="flex gap-2 text-gray-700">
                    <Check className="w-4 h-4 text-blue-600 mt-1" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              {register !== true && (
              <button
                disabled={disabled}
                onClick={onClick}
                className={`w-full py-2 rounded-lg transition
                  ${
                    disabled
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : "border hover:bg-blue-50 hover:border-blue-600 hover:text-blue-600"
                  }`}
              >
                {buttonLabel}
              </button>
              )}
            </div>
          );
        })}
      </div>
      <RenewPopup
        open={showRenew}
        onClose={() => setShowRenew(false)}
        userEmail={email}
        message={`Hello support team,\n\nI would like to renew my subscription pack. Please let me know the next steps.\n\nThank you!`}
      />
    </div>
  );
}
