/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
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
