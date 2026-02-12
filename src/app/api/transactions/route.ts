import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// GET /api/transactions - Fetch transaction history
export async function GET() {
    try {
        const { data, error } = await supabase
            .from("transactions")
            .select("*")
            .order("created_at", { ascending: false })
            .limit(50);

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ transactions: data });
    } catch (error) {
        console.error("Transactions Fetch Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// PATCH /api/transactions - Update a transaction status
export async function PATCH(request: Request) {
    try {
        const { id, status } = await request.json();

        if (!id || !status) {
            return NextResponse.json({ error: "Missing id or status" }, { status: 400 });
        }

        const { data, error } = await supabase
            .from("transactions")
            .update({ status, updated_at: new Date().toISOString() })
            .eq("id", id)
            .select()
            .single();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ transaction: data });
    } catch (error) {
        console.error("Transaction Update Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
