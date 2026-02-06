"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function CancelledContent() {
    const searchParams = useSearchParams();
    const refId = searchParams.get("ref") || "N/A";

    return (
        <div className="flex flex-col items-center justify-center h-full bg-gradient-to-b from-yellow-50 to-white space-y-6 p-8 animate-fadeIn">
            {/* Cancelled Icon */}
            <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-5xl">⚠️</span>
            </div>

            {/* Cancelled Message */}
            <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-yellow-800">Cash Out Cancelled</h2>
                <p className="text-gray-600">You cancelled the Maya payment.</p>
                <p className="text-gray-500 text-sm">No funds were deducted from your wallet.</p>
            </div>

            {/* Reference ID */}
            <div className="bg-white rounded-xl shadow-md p-4 w-full max-w-sm">
                <div className="text-center">
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Reference ID</p>
                    <p className="text-sm font-mono text-gray-700 mt-1 break-all">{refId}</p>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 w-full max-w-sm mt-4">
                <Link
                    href="/select-transaction"
                    className="block w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-4 rounded-xl shadow-lg transition-all text-center"
                >
                    Start Again
                </Link>
                <Link
                    href="/"
                    className="block w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 rounded-xl transition-all text-center"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
}

export default function CashOutCancelled() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600"></div>
            </div>
        }>
            <CancelledContent />
        </Suspense>
    );
}
