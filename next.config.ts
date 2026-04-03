import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "api.dicebear.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      {
        protocol: "https",
        hostname: "i.ibb.co.com",        // ← This is the exact hostname causing the error
      },
      {
        protocol: "https",
        hostname: "i.ibb.co",            // ← Also add the common one (without .com) for safety
      },
      {
        protocol: "https",
        hostname: "github.com",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "*.githubusercontent.com",
      },
    ],
    
  },
};

export default nextConfig;
