/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pour Docker et déploiement
  output: 'standalone',
  
  // Accepter les connexions depuis tous les hosts (important pour Docker)
  experimental: {
    serverComponentsExternalPackages: []
  },

  // Configuration des images (si vous utilisez next/image)
  images: {
    domains: [
      'localhost',
      'api.scholora.com', // Votre API Laravel
      'storage.googleapis.com', // Si vous utilisez Google Cloud Storage
      'scholora-bucket.s3.amazonaws.com' // Ou AWS S3
    ],
    unoptimized: process.env.NODE_ENV === 'development'
  },

  // Variables d'environnement publiques
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },

  // Redirect et rewrites pour l'API
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`
      }
    ];
  },

  // Headers de sécurité
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          }
        ]
      }
    ];
  }
}

module.exports = nextConfig