import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/ARLO-Ai',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
