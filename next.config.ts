import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "dhzrhptszj83u.cloudfront.net",
            },
        ],
    },
    async headers() {
        return [
            {
                source: "/.well-known/apple-app-site-association",
                headers: [
                    { key: "Content-Type", value: "application/json" },
                    // Optional caching (tweak as you like)
                    { key: "Cache-Control", value: "public, max-age=3600" },
                ],
            },
            // (Optional) also support the root path Apple sometimes hits:
            {
                source: "/apple-app-site-association",
                headers: [{ key: "Content-Type", value: "application/json" }],
            },
        ];
    },
    async rewrites() {
        return [
            // Serve the same file at /apple-app-site-association too
            {
                source: "/apple-app-site-association",
                destination: "/.well-known/apple-app-site-association",
            },
        ];
    },
};

export default nextConfig;
