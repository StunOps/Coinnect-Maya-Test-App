import { NextResponse } from "next/server";
import { getPaymentStatus, savePaymentStatus } from "@/lib/payment-store";
import { supabase } from "@/lib/supabase";

export async function GET() {
    const status = getPaymentStatus();
    return NextResponse.json(status);
}

// Reset status after successful cash out
export async function DELETE() {
    savePaymentStatus({ status: "waiting" });
    return NextResponse.json({ success: true });
}
