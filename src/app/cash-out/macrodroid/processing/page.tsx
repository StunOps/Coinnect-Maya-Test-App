"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useTransaction } from "@/context/TransactionContext";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
export default function MacroDroidProcessing() {
    const router = useRouter();
    const { transaction } = useTransaction();
    const [dots, setDots] = useState(".");
    const [elapsed, setElapsed] = useState(0);

    // Custom polling effect instead of SWR
    useEffect(() => {
        const checkStatus = async () => {
            try {
                const res = await fetch("/api/payment-status");
                const data = await res.json();

                if (data && data.status === "received" && data.amount) {
                    router.push(`/cash-out/success?amount=${data.amount}`);
                }
            } catch (err) {
                console.error("Polling error", err);
            }
        };

        // Check immediately
        checkStatus();

        // Then poll every 2 seconds
        const interval = setInterval(() => {
            setDots((prev) => (prev.length >= 3 ? "." : prev + "."));
            setElapsed(prev => prev + 1);
            checkStatus();
        }, 2000);

        return () => clearInterval(interval);
    }, [router]);

    return (
        <div className="flex flex-col h-full animate-fadeIn bg-green-50 items-center justify-center p-8 space-y-8">

            {/* Loading Animation */}
            <div className="relative">
                <div className="w-24 h-24 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl">💸</span>
                </div>
            </div>

            <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-green-900">Verifying Payment{dots}</h2>
                <p className="text-green-600">Please wait while we confirm your transfer.</p>
                <p className="text-sm text-gray-500 font-mono mt-2">Listening for MacroDroid Webhook...</p>
            </div>

            {/* Timeout / Manual Help */}
            {elapsed > 30 && (
                <div className="animate-fadeIn w-full max-w-sm bg-white p-4 rounded-xl border border-orange-200 shadow-sm">
                    <p className="text-orange-600 font-bold text-sm mb-1">Taking longer than expected?</p>
                    <p className="text-xs text-gray-600">
                        Ensure your phone sent the webhook.
                        Check if MacroDroid triggered successfully.
                    </p>
                    <Link href="/cash-out/macrodroid/scan-qr" className="block text-center mt-3 text-green-600 text-sm font-bold hover:underline">
                        Go Back
                    </Link>
                </div>
            )}
        </div>
    );
}
