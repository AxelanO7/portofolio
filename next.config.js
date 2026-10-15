/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure compiler options
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Image optimization
  images: {
    domains: ['localhost'],
    unoptimized: false,
  },
  
  // Enable React strict mode
  reactStrictMode: true,
  
  // Disable x-powered-by header
  poweredByHeader: false,
  
  // Enable SWC minification
  swcMinify: true,
  
  // Disable static page generation errors during build
  typescript: {
    ignoreBuildErrors: false,
  },
  
  eslint: {
    ignoreDuringBuilds: true,
  },

  async headers() {
    const swr = "public, max-age=86400, stale-while-revalidate=604800";
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      // Screenshots and logos keep their names, so cache for a day and refresh in the background.
      { source: "/work/:path*", headers: [{ key: "Cache-Control", value: swr }] },
      { source: "/logos/:path*", headers: [{ key: "Cache-Control", value: swr }] },
    ];
  },
};

module.exports = nextConfig;