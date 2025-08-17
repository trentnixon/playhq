/** @type {import('next').NextConfig} */
const path = require('path');
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/expressionofinterest',
        destination: '/',
        permanent: true,
      },
      {
        source: '/SignUp',
        destination: '/sign-up',
        permanent: false,
      },
      {
        source: '/SignUp/',
        destination: '/sign-up',
        permanent: false,
      },
      {
        source: '/SignIn/',
        destination: '/login',
        permanent: false,
      },
    ];
  },
  reactStrictMode: false,
  swcMinify: true,
  trailingSlash: true,
  distDir: 'build',
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  optimizeFonts: false,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'aceternity.com',
        port: '',
        pathname: '/images/products/thumbnails/new/**',
      },
    ],
  },
  transpilePackages: ['gsap'],
};

module.exports = nextConfig;
