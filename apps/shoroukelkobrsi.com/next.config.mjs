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
      },
      {
        protocol: "https",
        hostname: "www.teenylilapps.com",
      },
      {
        protocol: "https",
        hostname: "shoroukelkobrsi-media.public.blob.teenylilapps.com",
      },
    ],
    domains: ["**.vercel.app"],
  },
};

export default withPayload(nextConfig);
