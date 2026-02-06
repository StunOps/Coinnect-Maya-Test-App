"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SuccessContent() {
    const searchParams = useSearchParams();
    const refId = searchParams.get("ref") || "N/A";

    return (
        <div className="flex flex-col items-center justify-center h-full bg-gradient-to-b from-green-50 to-white space-y-6 p-8 animate-scaleIn">
            {/* Success Icon */}
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-14 h-14 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
            </div>

            {/* Success Message */}
            <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-green-800">💵 Cash Out Successful!</h2>
                <p className="text-gray-600">Your Maya payment has been completed.</p>
                <p className="text-gray-500 text-sm">Please collect your cash from the machine.</p>
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
                    href="/"
                    className="block w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all text-center"
                >
                    New Transaction
                </Link>
            </div>

            {/* Maya Logo/Branding */}
            <p className="text-xs text-gray-400 mt-4">
                Powered by Maya
            </p>
        </div>
    );
}

export default function CashOutSuccess() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            </div>
        }>
            <SuccessContent />
        </Suspense>
    );
}
