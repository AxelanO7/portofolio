/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Memberi tahu Next.js untuk tidak membundel framer-motion di server
    serverComponentsExternalPackages: ["framer-motion"],
  },
  images: {
    domains: [],
    unoptimized: false,
    formats: ['image/webp', 'image/avif'],
  },
  webpack(config) {
    // Menangani file SVG
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  swcMinify: true,
  poweredByHeader: false,
  compress: true,

  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};

module.exports = nextConfig;