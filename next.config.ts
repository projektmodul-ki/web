import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["cdn.jsdelivr.net"], // Add the allowed domain here
  },
};

export default nextConfig;
