import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async rewrites() {
        return [
            {
                source: "/api/v1/:path*",
                destination: `${process.env.NEXT_PUBLIC_BASE_URL}/:path*`,
            },
        ];
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "handy-man-storage-prod.s3.amazonaws.com",
            },
        ],
    },
};

export default nextConfig;
