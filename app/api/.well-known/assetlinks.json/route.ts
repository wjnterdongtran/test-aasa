import { NextResponse } from "next/server";

export async function GET() {
    const packageName =
        process.env.ANDROID_PACKAGE_NAME || "com.kpslholdings.ootnox.dev";
    const sha256Fingerprints = process.env.ANDROID_SHA256_FINGERPRINTS
        ? process.env.ANDROID_SHA256_FINGERPRINTS.split(",")
        : [];

    const assetLinks = [
        {
            relation: ["delegate_permission/common.handle_all_urls"],
            target: {
                namespace: "android_app",
                package_name: packageName,
                sha256_cert_fingerprints: sha256Fingerprints,
            },
        },
    ];

    return NextResponse.json(assetLinks, {
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "public, max-age=3600",
        },
    });
}
