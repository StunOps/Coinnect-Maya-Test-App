"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { useTransaction } from "@/context/TransactionContext";

function SuccessContent() {
    const searchParams = useSearchParams();
    const { transaction } = useTransaction();

    // Amount comes from the MacroDroid notification (passed via URL param), not user input
    const receivedAmount = Number(searchParams.get("amount")) || transaction.amount || 0;
    const fee = 10; // Static ₱10 transaction fee
    const total = receivedAmount + fee;

    const now = new Date();
    const formattedDate = now.toLocaleDateString("en-PH", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    const formattedTime = now.toLocaleTimeString("en-PH", {
        hour: "2-digit",
        minute: "2-digit",
    });

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
                <p className="text-gray-600">Your payment has been confirmed.</p>
                <p className="text-gray-500 text-sm">Please collect your cash from the machine.</p>
            </div>

            {/* Transaction Details */}
            <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-sm space-y-4 border border-gray-100">
                <h3 className="text-xs text-gray-400 uppercase tracking-wide text-center font-bold">Transaction Details</h3>

                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                    <span className="text-gray-500 text-sm">Phone Number</span>
                    <span className="font-mono font-bold text-gray-800">{transaction.phoneNumber || "N/A"}</span>
                </div>

                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                    <span className="text-gray-500 text-sm">Amount Received</span>
                    <span className="font-bold text-green-700 text-lg">₱ {receivedAmount.toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                    <span className="text-gray-500 text-sm">Transaction Fee</span>
                    <span className="font-bold text-red-500">₱ {fee.toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                    <span className="text-gray-500 text-sm">Total</span>
                    <span className="font-bold text-blue-700 text-lg">₱ {total.toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center pt-1">
                    <span className="text-gray-500 text-sm">Date & Time</span>
                    <div className="text-right">
                        <p className="font-bold text-gray-800 text-sm">{formattedDate}</p>
                        <p className="text-gray-500 text-xs">{formattedTime}</p>
                    </div>
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

            {/* Branding */}
            <p className="text-xs text-gray-400 mt-4">
                Powered by Maya × MacroDroid
            </p>
        </div>
    );
}

export default function CashOutSuccess() {
    // Reset payment status on load so we don't loop
    useEffect(() => {
        fetch('/api/payment-status', { method: 'DELETE' }).catch(console.error);
    }, []);

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
