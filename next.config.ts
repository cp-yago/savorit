import { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.imgur.com",
      },
      {
        protocol: "https",
        hostname: "**.cdninstagram.com",
      },

      {
        protocol: "https",
        hostname: "instagram.**",
      },
    ],
  },
  // experimental: {
  //   dynamicIO: true,
  // },
};

export default nextConfig;
