import { withPayload } from "@payloadcms/next/withPayload";
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    ppr: true,
    reactCompiler: true,
    // typedRoutes: true, // Not yet available in Turbopack.
  },
  productionBrowserSourceMaps: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/api/media/**",
      },
      {
        protocol: "https",
        hostname: "**.vercel.app",
        pathname: "/api/media/**",
      },
      {
        protocol: "https",
        hostname: "teenylilapps.com",
        pathname: "/api/media/**",
      },
    ],
  },
};

export default withPayload(nextConfig);
