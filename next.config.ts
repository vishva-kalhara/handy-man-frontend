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
                hostname: "res.cloudinary.com",
            },
            {
                protocol: "https",
                hostname: "thumbs.dreamstime.com",
            },
            {
                protocol: "https",
                hostname: "t3.ftcdn.net",
            },
            {
                protocol: "https",
                hostname: "geediting.com",
            },
            {
                protocol: "https",
                hostname: "media.designcafe.com",
            },
            {
                protocol: "https",
                hostname: "whatsheethinks.wordpress.com",
            },
            {
                protocol: "https",
                hostname: "media.gettyimages.com",
            },
            {
                protocol: "https",
                hostname: "handy-man-storage-prod.s3.amazonaws.com",
            },
        ],
    },
    /* config options here */
};

export default nextConfig;
