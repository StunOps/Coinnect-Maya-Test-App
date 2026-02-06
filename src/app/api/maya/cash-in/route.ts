import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { amount } = await request.json();

        if (!amount || amount < 10) {
            return NextResponse.json(
                { error: "Amount must be at least 10 PHP" },
                { status: 400 }
            );
        }

        const secretKey = process.env.MAYA_SECRET_KEY;
        if (!secretKey) {
            return NextResponse.json(
                { error: "Server misconfiguration: Missing Maya API key" },
                { status: 500 }
            );
        }

        // Create Basic Auth header (secret key + ":" encoded in base64)
        const authHeader = `Basic ${Buffer.from(secretKey + ":").toString("base64")}`;

        // Generate unique reference ID
        const referenceId = `CASHIN-${Date.now()}-${Math.random().toString(36).substring(7).toUpperCase()}`;

        // Get the base URL for redirect URLs
        // Use APP_URL from env for ngrok/production, fallback to origin header
        const origin = process.env.APP_URL || request.headers.get("origin") || "http://localhost:3000";

        // Maya Checkout API payload
        const payload = {
            totalAmount: {
                value: amount,
                currency: "PHP"
            },
            requestReferenceNumber: referenceId,
            redirectUrl: {
                success: `${origin}/cash-in/success?ref=${referenceId}`,
                failure: `${origin}/cash-in/failed?ref=${referenceId}`,
                cancel: `${origin}/cash-in/cancelled?ref=${referenceId}`
            },
            metadata: {
                description: "Test Cash In Transaction"
            }
        };

        console.log("Creating Maya Checkout:", payload);

        // Call Maya Checkout API
        const response = await fetch("https://pg-sandbox.paymaya.com/checkout/v1/checkouts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": authHeader
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("Maya API Error:", data);
            return NextResponse.json(
                { error: data.message || data.error || "Maya API failed" },
                { status: response.status }
            );
        }

        console.log("Maya Checkout Created:", data);

        // Return the checkout ID and redirect URL
        return NextResponse.json({
            checkoutId: data.checkoutId,
            redirectUrl: data.redirectUrl,
            referenceId: referenceId
        });

    } catch (error) {
        console.error("Internal Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
