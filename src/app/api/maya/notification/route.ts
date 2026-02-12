import { NextResponse } from "next/server";
import { savePaymentStatus } from "@/lib/payment-store";
import { getPendingTransaction, clearPendingTransaction } from "@/lib/payment-store";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        console.log("Received Webhook:", body);

        const notificationText = body.notification || "";

        // Regex to extract amount - supports:
        // "You received 1.00 in your wallet via InstaPay" (real Maya)
        // "You received PHP 500.00 from..." (other format)
        // "You sent PHP 100.00 to..." (sent format)
        const amountMatch = notificationText.match(/(?:received|sent)\s+(?:PHP|P)?\s*([\d,]+\.?\d*)/i);

        let amount = 0;
        if (amountMatch && amountMatch[1]) {
            amount = parseFloat(amountMatch[1].replace(/,/g, ''));
        } else {
            // Fallback: find any currency amount in the text
            const fallbackMatch = notificationText.match(/(?:PHP|P|₱)\s*([\d,]+\.?\d*)/i);
            if (fallbackMatch && fallbackMatch[1]) {
                amount = parseFloat(fallbackMatch[1].replace(/,/g, ''));
            }
        }

        console.log(`Parsed Amount: ${amount}`);

        if (amount > 0) {
            // Read pending transaction details (phone number, fee, etc.)
            const pending = getPendingTransaction();
            const phoneNumber = pending?.phone_number || "unknown";
            const fee = pending?.fee || 10;
            const total = amount + fee;

            // 1. Save to temp file for real-time polling
            savePaymentStatus({
                status: "received",
                amount: amount,
                raw_text: notificationText,
                timestamp: Date.now()
            });

            // 2. Save to Supabase with full transaction details
            const { data, error } = await supabase
                .from("transactions")
                .insert({
                    phone_number: phoneNumber,
                    amount: amount,
                    fee: fee,
                    total: total,
                    type: "MACRODROID_CASHOUT",
                    status: "received",
                    notification_text: notificationText,
                })
                .select()
                .single();

            // Clear pending transaction after saving
            clearPendingTransaction();

            if (error) {
                console.error("Supabase Insert Error:", error);
                return NextResponse.json({ success: true, amount, db_error: error.message });
            }

            console.log("Transaction saved to DB:", data);
            return NextResponse.json({ success: true, amount, transaction_id: data.id });
        } else {
            console.warn("Could not parse amount from notification");
            return NextResponse.json({ success: false, error: "Could not parse amount" }, { status: 400 });
        }

    } catch (error) {
        console.error("Webhook Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
