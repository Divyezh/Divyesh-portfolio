import path from 'path';

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
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'react-icons',
      'react-icons/fa',
      'react-icons/fa6',
      'framer-motion',
      '@heroicons/react',
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/assets/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/projects/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/robots.txt',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /framer-motion.*\.mjs$/,
      enforce: 'pre',
      use: [
        {
          loader: path.resolve('./loaders/strip-sourcemap-loader.cjs'),
        },
      ],
    });

    config.ignoreWarnings = [
      ...(config.ignoreWarnings || []),
      /Failed to parse source map/,
      /LayoutGroupContext/,
      /\.mjs\.map$/,
      /PackFileCacheStrategy/,
      { module: /next[\\/]dist[\\/]server/ },
      { message: /PackFileCacheStrategy/ },
      { message: /Resolving.*for build dependencies/ },
    ];
    return config;
  },
};

export default nextConfig;
