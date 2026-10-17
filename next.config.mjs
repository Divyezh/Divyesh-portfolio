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
      'framer-motion',
      '@heroicons/react',
    ],
  },
  transpilePackages: ['three', 'lenis'],
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
