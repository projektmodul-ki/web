import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "cdn.jsdelivr.net",
      "sv0rle2dok1qvb3d.public.blob.vercel-storage.com",
      "files.catbox.moe",
      "cdn.jsdelivr.net",
    ],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Add polyfills for Node.js APIs not available in Cloudflare Workers
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
      };
    }
    return config;
  },
};

export default nextConfig;
