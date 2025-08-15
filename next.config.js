/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Remove turbo for now to avoid conflicts
  },
  images: {
    domains: [],
    unoptimized: false,
    formats: ['image/webp', 'image/avif'],
  },
  webpack(config, { isServer }) {
    // Handle SVG files
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    // Fix for framer-motion in client components
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    
    return config;
  },
  // Remove styledComponents compiler
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