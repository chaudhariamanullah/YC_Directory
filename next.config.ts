import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    //This Give Permission To Website
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },
  devIndicators: {
   position: "bottom-right",
  },
};

export default nextConfig;
