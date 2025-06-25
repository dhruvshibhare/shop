/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/shop',
  assetPrefix: '/shop/',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true, // Required for static export
    formats: ['image/webp', 'image/avif'],
    // domains: ['your-image-domain.com'], // Add if using external images
  },
  experimental: {
    optimizeCss: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  swcMinify: true,
};

module.exports = nextConfig;