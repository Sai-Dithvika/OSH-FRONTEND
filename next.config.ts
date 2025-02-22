import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  //upload the images domains
  images: {
    domains: ["utfs.io"],
  },
  devIndicators: {
    appIsrStatus: false,
  },
};

export default nextConfig;
