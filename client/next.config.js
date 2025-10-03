// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  allowedDevOrigins: ['https://ticket.local'],
};

module.exports = nextConfig;