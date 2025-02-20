import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // productionBrowserSourceMaps: false, // ✅ Disable source maps in production

  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/", // ✅ Match all API routes dynamically
  //       destination: "http://localhost:8000/", // ✅ Forward to backend
  //     },
  //   ];
  // },
};

export default nextConfig;
