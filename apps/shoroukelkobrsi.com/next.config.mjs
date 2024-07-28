import { withPayload } from "@payloadcms/next/withPayload";
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    ppr: true,
    reactCompiler: true,
    // typedRoutes: true, // Not yet available in Turbopack.
  },
  productionBrowserSourceMaps: true,
};

export default withPayload(nextConfig);
