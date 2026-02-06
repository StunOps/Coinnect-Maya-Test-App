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

        // Pay with Maya API uses PUBLIC key for authentication
        const publicKey = process.env.MAYA_PUBLIC_KEY;
        if (!publicKey) {
            return NextResponse.json(
                { error: "Server misconfiguration: Missing Maya Public API key" },
                { status: 500 }
            );
        }

        // Create Basic Auth header (public key + ":" encoded in base64)
        const authHeader = `Basic ${Buffer.from(publicKey + ":").toString("base64")}`;

        // Generate unique reference ID (max 36 chars)
        const referenceId = `CASHOUT-${Date.now()}`;

        // Get the base URL for redirect URLs
        const origin = process.env.APP_URL || request.headers.get("origin") || "http://localhost:3000";

        // Pay with Maya API payload
        const payload = {
            totalAmount: {
                value: amount,
                currency: "PHP"
            },
            requestReferenceNumber: referenceId,
            redirectUrl: {
                success: `${origin}/cash-out/success?ref=${referenceId}`,
                failure: `${origin}/cash-out/failed?ref=${referenceId}`,
                cancel: `${origin}/cash-out/cancelled?ref=${referenceId}`
            }
        };

        console.log("Creating Maya Cash Out Payment:", payload);
        console.log("Using APP_URL:", origin);

        // Call Pay with Maya API
        const response = await fetch("https://pg-sandbox.paymaya.com/payby/v2/paymaya/payments", {
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

        console.log("Maya Cash Out Payment Created:", data);

        // Pay with Maya returns paymentId and redirectUrl
        return NextResponse.json({
            paymentId: data.paymentId,
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
