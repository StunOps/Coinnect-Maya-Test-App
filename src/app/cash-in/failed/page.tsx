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
                <h2 className="text-2xl font-bold text-red-800">Payment Failed</h2>
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
            <div className="bg-red-50 rounded-xl p-4 w-full max-w-sm">
                <p className="text-xs text-red-600 font-medium">Possible reasons:</p>
                <ul className="text-xs text-red-500 mt-2 list-disc list-inside space-y-1">
                    <li>Insufficient balance</li>
                    <li>Authentication failed</li>
                    <li>Transaction timeout</li>
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
                    className="block w-full text-center text-gray-500 hover:text-gray-800 py-3"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
}

export default function CashInFailed() {
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
