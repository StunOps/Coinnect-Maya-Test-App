import { NextResponse } from "next/server";
import { savePendingTransaction } from "@/lib/payment-store";

// POST /api/pending-transaction — Save transaction details from the frontend
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { phoneNumber, amount, fee, total } = body;

        savePendingTransaction({
            phone_number: phoneNumber,
            amount,
            fee,
            total,
        });

        console.log("Pending transaction saved:", { phoneNumber, amount, fee, total });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error saving pending transaction:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
