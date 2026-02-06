"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function FailedContent() {
    const searchParams = useSearchParams();
    const refId = searchParams.get("ref") || "N/A";

    return (
        <div className="flex flex-col items-center justify-center h-full bg-gradient-to-b from-red-50 to-white space-y-6 p-8 animate-fadeIn">
            {/* Error Icon */}
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-14 h-14 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>

            {/* Error Message */}
            <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-red-800">Cash Out Failed</h2>
                <p className="text-gray-600">Your Maya payment could not be completed.</p>
            </div>

            {/* Reference ID */}
            <div className="bg-white rounded-xl shadow-md p-4 w-full max-w-sm">
                <div className="text-center">
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Reference ID</p>
                    <p className="text-sm font-mono text-gray-700 mt-1 break-all">{refId}</p>
                </div>
            </div>

            {/* Possible Reasons */}
            <div className="bg-red-50 rounded-xl p-4 w-full max-w-sm text-sm text-red-700">
                <p className="font-semibold mb-2">Possible reasons:</p>
                <ul className="list-disc list-inside space-y-1 text-red-600">
                    <li>Insufficient Maya wallet balance</li>
                    <li>Transaction limit exceeded</li>
                    <li>Payment authorization failed</li>
                </ul>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 w-full max-w-sm mt-4">
                <Link
                    href="/select-transaction"
                    className="block w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all text-center"
                >
                    Try Again
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

export default function CashOutFailed() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
            </div>
        }>
            <FailedContent />
        </Suspense>
    );
}
