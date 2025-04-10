import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
        ],
    },
    /* config options here */
};

export default nextConfig;
