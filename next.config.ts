import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  // Configuration pour Railway
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
};

export default nextConfig;
