import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: { appDir: true } as any,
  allowedDevOrigins: ['https://ticket.local'],
};

export default nextConfig;