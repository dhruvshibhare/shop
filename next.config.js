/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/shop',
  images: {
    unoptimized: true
  },
  trailingSlash: true,
  distDir: 'out',
  eslint: {
    ignoreDuringBuilds: true
  }
};

module.exports = nextConfig;
