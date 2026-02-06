"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function CancelledContent() {
    const searchParams = useSearchParams();
    const refId = searchParams.get("ref") || "N/A";

    return (
        <div className="flex flex-col items-center justify-center h-full bg-gradient-to-b from-gray-50 to-white space-y-6 p-8 animate-fadeIn">
            {/* Cancel Icon */}
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-14 h-14 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>

            {/* Cancel Message */}
            <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-gray-800">Payment Cancelled</h2>
                <p className="text-gray-600">You cancelled the Maya payment.</p>
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
                    className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all text-center"
                >
                    Start Again
                </Link>
                <Link
                    href="/"
                    className="block w-full text-center text-gray-500 hover:text-gray-800 py-3"
                >
                    Back to Home
                </Link>
            </div>

            {/* Info */}
            <p className="text-xs text-gray-400 mt-4">
                No amount was charged to your account.
            </p>
        </div>
    );
}

export default function CashInCancelled() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400"></div>
            </div>
        }>
            <CancelledContent />
        </Suspense>
    );
}
