"use client";

import Link from "next/link";
import { useTransaction } from "@/context/TransactionContext";
import { useEffect, useState } from "react";

interface MayaResponse {
    paymentId?: string;
    redirectUrl?: string;
    referenceId?: string;
    error?: string;
}

export default function Processing() {
    const { transaction } = useTransaction();
    const [status, setStatus] = useState<"PROCESSING" | "SUCCESS" | "ERROR">("PROCESSING");
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        if (status !== "PROCESSING") return;

        const processTransaction = async () => {
            try {
                if (transaction.type === "CASH_OUT") {
                    // Call Maya API for Cash Out (Pay from Maya wallet)
                    const res = await fetch("/api/maya/cash-out", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            amount: transaction.amount
                        })
                    });
                    const data: MayaResponse = await res.json();

                    if (data.error) {
                        setStatus("ERROR");
                        setErrorMsg(data.error);
                        return;
                    }

                    if (data.redirectUrl) {
                        // Redirect to Maya payment page
                        window.location.href = data.redirectUrl;
                    } else {
                        setStatus("ERROR");
                        setErrorMsg("No redirect URL received from Maya");
                    }
                } else {
                    setStatus("ERROR");
                    setErrorMsg("Invalid transaction type");
                }
            } catch (err) {
                console.error(err);
                setStatus("ERROR");
                setErrorMsg("Network Error");
            }
        };

        processTransaction();
    }, [transaction.type, transaction.amount, status]);

    if (status === "PROCESSING") {
        return (
            <div className="flex flex-col items-center justify-center h-full bg-white space-y-6 p-8 animate-fadeIn">
                <div className="relative w-20 h-20">
                    <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-green-500 rounded-full border-t-transparent animate-spin"></div>
                </div>
                <div className="text-center">
                    <h2 className="text-xl font-bold text-gray-800">Processing Cash Out</h2>
                    <p className="text-gray-500 mt-2">Connecting to Maya...</p>
                </div>
            </div>
        );
    }

    if (status === "ERROR") {
        return (
            <div className="flex flex-col items-center justify-center h-full bg-red-50 space-y-6 p-8 animate-fadeIn">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center text-red-600 text-3xl font-bold">
                    ✕
                </div>
                <div className="text-center">
                    <h2 className="text-xl font-bold text-red-800">Transaction Failed</h2>
                    <p className="text-gray-600 mt-2">{errorMsg || "Unknown error occurred"}</p>
                </div>
                <Link href="/" className="mt-8 bg-gray-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-700 transition-colors shadow">
                    Try Again
                </Link>
            </div>
        );
    }

    if (status === "SUCCESS") {
        return (
            <div className="flex flex-col items-center justify-center h-full bg-green-50 space-y-6 p-8 animate-scaleIn">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center shadow-inner">
                    <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-green-800">Cash Out Successful!</h2>
                    <p className="text-gray-600 mt-2">Amount: ₱{transaction.amount}</p>
                </div>
                <Link href="/" className="mt-8 bg-green-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-700 transition-colors shadow-lg">
                    New Transaction
                </Link>
            </div>
        );
    }

    return null;
}
