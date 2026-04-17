import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow requests from local network IP (e.g. phone on same Wi-Fi)
  allowedDevOrigins: ['192.168.1.161'],

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'orjizgjkknluzuinyzri.supabase.co',
      },
      {
        // Google OAuth avatar images (Supabase Google login)
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
};

export default nextConfig;
