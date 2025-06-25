/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/shop',
  images: {
    unoptimized: true,
    loader: 'custom',
    loaderFile: './image-loader.js'
  },
  trailingSlash: true,
  distDir: 'dist',
  eslint: {
    ignoreDuringBuilds: true,
  },
  assetPrefix: '/shop/',
  experimental: {
    optimizeCss: true,
    appDir: true
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  swcMinify: true,
};

module.exports = nextConfig;