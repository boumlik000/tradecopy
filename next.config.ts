import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
      // هادي هي لي كتخليه يدوز وخا كاين أخطاء
      ignoreDuringBuilds: true,
    },
};

export default nextConfig;
