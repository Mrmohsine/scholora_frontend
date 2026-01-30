import { Check, Star } from "lucide-react";

export default function UpgradePackPage({ title, current }: { title: boolean; current: boolean }) {
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

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

        {/* Basic Pack */}
        <div className="bg-white rounded-2xl border shadow-sm p-8 transition-transform duration-300 ease-out hover:shadow-lg hover:scale-[1.02]">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Basic Pack
          </h2>

          <div className="mb-6">
            <span className="text-4xl font-bold text-black">$29</span>
            <span className="text-gray-500">/month</span>
          </div>

          <ul className="space-y-3 mb-8">
            {[
              "Up to 50 students",
              "20 video sessions/month",
              "2GB storage",
              "Email support",
              "Basic analytics",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 text-gray-700">
                <Check className="w-4 h-4 text-blue-600" />
                {item}
              </li>
            ))}
          </ul>

          <button className="w-full py-2 rounded-lg border text-gray-700 hover:bg-blue-50 hover:border-blue-600 hover:text-blue-600 transition-colors">
            Select Plan
          </button>
        </div>

        {/* Pro Pack */}
        <div className="relative bg-white rounded-2xl border-2 border-blue-500 shadow-lg p-8">

          {/* Badges */}
          <div className="absolute -top-3 right-4 flex gap-2">
            <span className="flex items-center gap-1 px-3 py-1 text-xs bg-blue-500 text-white rounded-full">
              <Star className="w-3 h-3" />
              Most Popular
            </span>
            {current && <span className="px-3 py-1 text-xs bg-green-500 text-white rounded-full">
              Current Plan
            </span>}
          </div>

          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Pro Pack
          </h2>

          <div className="mb-6">
            <span className="text-4xl font-bold text-black">$79</span>
            <span className="text-gray-500">/month</span>
          </div>

          <ul className="space-y-3 mb-8">
            {[
              "Up to 200 students",
              "100 video sessions/month",
              "10GB storage",
              "Priority support",
              "Advanced analytics",
              "Custom branding",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 text-gray-700">
                <Check className="w-4 h-4 text-blue-600" />
                {item}
              </li>
            ))}
          </ul>

          <button
            disabled
            className="w-full py-2 rounded-lg bg-blue-400 text-white "
          >
            Current Plan
          </button>
        </div>
      </div>
    </div>
  );
}
