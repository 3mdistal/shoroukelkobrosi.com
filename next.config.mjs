/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        ppr: true,
        reactCompiler: true,
        // typedRoutes: true, // Not yet available in Turbopack.
    },
};

export default nextConfig;
