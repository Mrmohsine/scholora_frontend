/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",

  eslint: {
    ignoreDuringBuilds: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },
  
  // FIXED (not experimental anymore)
  serverExternalPackages: [],

  images: {
    domains: [
      "localhost",
      "api.scholora.com",
      "storage.googleapis.com",
      "scholora-bucket.s3.amazonaws.com",
    ],
    unoptimized: process.env.NODE_ENV === "development",
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;