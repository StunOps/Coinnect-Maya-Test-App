import { NextResponse } from "next/server";

// This webhook endpoint would receive payment status updates from Maya
// For local development, you need to use ngrok to expose localhost
// and register the ngrok URL in Maya's dashboard

export async function POST(request: Request) {
    try {
        const payload = await request.json();

        console.log("=== MAYA WEBHOOK RECEIVED ===");
        console.log("Timestamp:", new Date().toISOString());
        console.log("Payload:", JSON.stringify(payload, null, 2));
        console.log("=============================");

        // In production, you would:
        // 1. Verify the webhook signature
        // 2. Update your database with payment status
        // 3. Trigger any business logic (e.g., credit user wallet)

        // For now, just log and acknowledge
        return NextResponse.json({
            received: true,
            message: "Webhook processed successfully"
        });

    } catch (error) {
        console.error("Webhook Error:", error);
        return NextResponse.json(
            { error: "Failed to process webhook" },
            { status: 500 }
        );
    }
}

// Allow GET for webhook verification if Maya requires it
export async function GET() {
    return NextResponse.json({
        status: "Webhook endpoint is active",
        timestamp: new Date().toISOString()
    });
}
