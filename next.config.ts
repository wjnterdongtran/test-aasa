import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "dhzrhptszj83u.cloudfront.net",
            },
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
            },
        ],
    },
    async headers() {
        return [
            {
                source: "/.well-known/apple-app-site-association",
                headers: [
                    { key: "Content-Type", value: "application/json" },
                    { key: "Cache-Control", value: "public, max-age=3600" },
                ],
            },
            {
                source: "/.well-known/assetlinks.json",
                headers: [
                    { key: "Content-Type", value: "application/json" },
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
            // Route well-known files to API endpoints
            {
                source: "/.well-known/apple-app-site-association",
                destination: "/api/.well-known/apple-app-site-association",
            },
            {
                source: "/.well-known/assetlinks.json",
                destination: "/api/.well-known/assetlinks.json",
            },
            // Serve the same file at /apple-app-site-association too
            {
                source: "/apple-app-site-association",
                destination: "/api/.well-known/apple-app-site-association",
            },
        ];
    },
};

export default nextConfig;
