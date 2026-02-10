"use client";

import { Package, Calendar, Clock, TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";

interface DashboardHeaderProps {
  user?: {
    first_name: string;
    last_name: string;
    avatar?: string;
    email?: string;
    tutor?: {
      pack_subscribed_at: string;
      pack_expires_at: string;
      pricing_pack: {
        name: string;
        slug: string;
        price: string;
      };
    };
  };
}

export default function PackOverviewCard({ user }: DashboardHeaderProps) {
  const router = useRouter();
  const pack = user?.tutor;

  const formatDate = (date?: string) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getDaysRemaining = () => {
    if (!pack?.pack_expires_at) return null;

    const now = new Date();
    const end = new Date(pack.pack_expires_at);

    const diff = end.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

    return days > 0 ? days : 0;
  };

  const days = getDaysRemaining();

  const isExpired =
    pack?.pack_expires_at &&
    new Date(pack.pack_expires_at).getTime() < Date.now();

  const slug = pack?.pricing_pack?.slug;

  let actionLabel = "Upgrade";

  if (slug === "professional") {
    actionLabel = isExpired ? "Reactivate" : "Manage";
  }

  const handleAction = () => {

    if (actionLabel === "Manage") {
      router.push("/tutor-portal/billing");
    }
  };


  return (
    <div className="w-full bg-white rounded-2xl shadow border overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
            <Package className="w-5 h-5" />
          </div>

          <div>
            <p className="text-sm opacity-80">Current Pack</p>
            <p className="text-lg font-semibold">
              {pack?.pricing_pack?.name || "Free Pack"}
            </p>
          </div>
        </div>

        <button
          onClick={handleAction}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition text-sm"
        >
          <TrendingUp className="w-4 h-4" />
          {actionLabel}
        </button>
      </div>

      {/* Info */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Expiry */}
        <div className="flex items-center gap-4 bg-gray-50 rounded-xl p-4">
          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
            <Calendar className="w-5 h-5" />
          </div>

          <div>
            <p className="text-sm text-gray-500">Expiry Date</p>
            <p className="font-semibold text-gray-900">
              {formatDate(pack?.pack_expires_at)}
            </p>
          </div>
        </div>

        {/* Days remaining */}
        <div className="flex items-center gap-4 bg-gray-50 rounded-xl p-4">
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              days !== null && days <= 5
                ? "bg-red-100 text-red-600"
                : "bg-green-100 text-green-600"
            }`}
          >
            <Clock className="w-5 h-5" />
          </div>

          <div>
            <p className="text-sm text-gray-500">Days Remaining</p>
            <p className="font-semibold text-gray-900">
              {days !== null
                ? days === 0
                  ? "Expired"
                  : `${days} days`
                : "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
