import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ["images.microcms-assets.io"]
  },
};

export default nextConfig;
