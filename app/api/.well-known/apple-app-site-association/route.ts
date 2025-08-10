import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const bundleId =
        process.env.APPLE_BUNDLE_ID || "HGS93H2L2H.com.kpslholdings.ootnox.dev";
    const teamId = process.env.APPLE_TEAM_ID || "HGS93H2L2H";
    const appleAppSiteAssociation = {
        applinks: {
            apps: [],
            details: [
                {
                    appID: `${teamId}.${bundleId}`,
                    paths: ["/post/*", "/s/*"],
                },
            ],
        },
    };

    return NextResponse.json(appleAppSiteAssociation, {
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "public, max-age=3600",
        },
    });
}
