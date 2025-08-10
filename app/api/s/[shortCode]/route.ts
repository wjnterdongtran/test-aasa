import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ shortCode: string }> }
) {
    try {
        const { shortCode } = await params;

        if (!shortCode) {
            return NextResponse.json(
                { error: "Short code is required" },
                { status: 400 }
            );
        }

        // Replace with your actual external service URL
        const externalServiceUrl = process.env.EXTERNAL_SERVICE_URL;

        const response = await fetch(
            `${externalServiceUrl}/links/${shortCode}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.ok) {
            if (response.status === 404) {
                return NextResponse.json(
                    { error: "Short code not found" },
                    { status: 404 }
                );
            }

            return NextResponse.json(
                { error: "Failed to fetch data from external service" },
                { status: response.status }
            );
        }

        const data = await response.json();

        return NextResponse.json(data);
    } catch (error) {
        console.error("Error fetching short code data:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
