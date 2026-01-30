import { Package, Calendar, Clock, TrendingUp } from "lucide-react";

export default function PackOverviewCard() {
  return (
    <div className="w-full bg-white rounded-2xl shadow border overflow-hidden">

      {/* Top blue header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm opacity-80">Current Pack</p>
            <p className="text-lg font-semibold">Pro Pack</p>
          </div>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition text-sm">
          <TrendingUp className="w-4 h-4" />
          Upgrade
        </button>
      </div>

      {/* Bottom info */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Expiry */}
        <div className="flex items-center gap-4 bg-gray-50 rounded-xl p-4">
          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Expiry Date</p>
            <p className="font-semibold text-gray-900">March 15, 2026</p>
          </div>
        </div>

        {/* Days remaining */}
        <div className="flex items-center gap-4 bg-gray-50 rounded-xl p-4">
          <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center text-green-600">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Days Remaining</p>
            <p className="font-semibold text-gray-900">45 days</p>
          </div>
        </div>

      </div>
    </div>
  );
}
