import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { amount, phoneNumber } = await request.json();

        if (!amount || !phoneNumber) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Format phone number: Ensure it starts with 09 and is 11 digits (from UI)
        // Xendit might expect international format or local. 
        // Docs for EWallet Charge usually accept local if channel code implies PH.
        // However, best practice is often +63. Let's try sending as entered first (09...)
        // If Xendit fails, we will adjust.

        const apiKey = process.env.XENDIT_SECRET_KEY;
        if (!apiKey) {
            return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
        }

        const authHeader = `Basic ${Buffer.from(apiKey + ":").toString("base64")}`;

        const payload = {
            reference_id: `REF-${Date.now()}`,
            currency: "PHP",
            amount: amount,
            checkout_method: "ONE_TIME_PAYMENT",
            channel_code: "PH_PAYMAYA",
            channel_properties: {
                mobile_number: phoneNumber,
            },
            metadata: {
                description: "Test Cash Out Transaction",
            },
        };

        const response = await fetch("https://api.xendit.co/ewallets/charges", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: authHeader,
            },
            body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("Xendit Error:", data);
            return NextResponse.json({ error: data.message || "Xendit API Failed" }, { status: response.status });
        }

        return NextResponse.json(data);

    } catch (error) {
        console.error("Internal Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
