/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: false,
  compress: true,                // Enable gzip/brotli compression
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    formats: ['image/avif', 'image/webp'],  // Modern image formats
    minimumCacheTTL: 86400,                 // 24h image cache
  },
  webpack: (config) => {
    config.ignoreWarnings = [
      ...(config.ignoreWarnings || []),
      /Failed to parse source map/,
      /LayoutGroupContext/,
      /\.mjs\.map$/,
    ];
    return config;
  },
};

export default nextConfig;
