import Link from "next/link";

export default function PackStatusCard() {
  return (
    <div className="w-full rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 flex items-center justify-between">
      {/* Left */}
      <div>
        <p className="text-sm opacity-80">Your Pack Status</p>
        <h2 className="text-xl font-semibold">Pro Pack Active</h2>
        <p className="text-sm opacity-90">
          45 days remaining • Expires March 15, 2026
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <Link
          href="/tutor-portal/packages"
          className="px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition text-sm"
        >
          View Details
        </Link>

        <Link
          href="/tutor-portal/packages"
          className="px-4 py-2 rounded-lg bg-white text-blue-600 hover:bg-blue-50 transition text-sm font-medium"
        >
          Upgrade Pack
        </Link>
      </div>
    </div>
  );
}
