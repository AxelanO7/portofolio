/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // This tells Next.js not to bundle framer-motion on the server.
    serverComponentsExternalPackages: ["framer-motion"],
  },
  images: {
    domains: [],
    unoptimized: false,
    formats: ['image/webp', 'image/avif'],
  },
  webpack(config) {
    // Handling SVG files
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