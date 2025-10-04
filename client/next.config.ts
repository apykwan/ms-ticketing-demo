import type { NextConfig } from 'next';

export const nextConfig: NextConfig = {
  experimental: { appDir: true } as any,
  allowedDevOrigins: ['https://ticket.local'],
};