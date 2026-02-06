"use client";

import Link from "next/link";
import { useTransaction } from "@/context/TransactionContext";
import { useEffect, useState } from "react";

interface XenditResponse {
    id?: string;
    actions?: {
        desktop_web_checkout_url?: string;
        mobile_web_checkout_url?: string;
    };
    status?: string;
    error?: string;
}

interface MayaResponse {
    checkoutId?: string;
    redirectUrl?: string;
    referenceId?: string;
    error?: string;
}

export default function Processing() {
    const { transaction } = useTransaction();
    const [status, setStatus] = useState<"PROCESSING" | "ACTION_REQUIRED" | "SUCCESS" | "ERROR">("PROCESSING");
    const [errorMsg, setErrorMsg] = useState("");
    const [authUrl, setAuthUrl] = useState("");

    useEffect(() => {
        // Only process if we haven't yet
        if (status !== "PROCESSING") return;

        const processTransaction = async () => {
            try {
                if (transaction.type === "CASH_OUT") {
                    // Call Xendit API
                    const res = await fetch("/api/xendit/cash-out", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            amount: transaction.amount,
                            phoneNumber: transaction.phoneNumber
                        })
                    });
                    const data: XenditResponse = await res.json();

                    if (data.error) {
                        setStatus("ERROR");
                        setErrorMsg(data.error);
                        return;
                    }

                    if (data.actions?.desktop_web_checkout_url) {
                        setAuthUrl(data.actions.desktop_web_checkout_url);
                        setStatus("ACTION_REQUIRED");
                    } else if (data.status === "PENDING") {
                        // Some flows might handle different pending states
                        setStatus("SUCCESS"); // In sandbox sometimes it just goes pending.
                    } else {
                        setStatus("SUCCESS");
                    }

                } else if (transaction.type === "CASH_IN") {
                    // Call Maya API for Cash In
                    const res = await fetch("/api/maya/cash-in", {
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
                        // Redirect to Maya checkout page
                        window.location.href = data.redirectUrl;
                    } else {
                        setStatus("ERROR");
                        setErrorMsg("No redirect URL received from Maya");
                    }
                }
            } catch (err) {
                console.error(err)
                setStatus("ERROR");
                setErrorMsg("Network Error");
            }
        }

        processTransaction();
    }, [transaction.type, transaction.amount, transaction.phoneNumber]);

    const providerName = transaction.type === "CASH_IN" ? "Maya Sandbox" : "XEndit";

    if (status === "PROCESSING") {
        return (
            <div className="flex flex-col items-center justify-center h-full bg-white space-y-6 p-8 animate-fadeIn">
                <div className="relative w-20 h-20">
                    <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
                </div>
                <div className="text-center">
                    <h2 className="text-xl font-bold text-gray-800">Processing Transaction</h2>
                    <p className="text-gray-500 mt-2">Connecting to {providerName} API...</p>
                </div>
            </div>
        );
    }

    if (status === "ACTION_REQUIRED") {
        return (
            <div className="flex flex-col items-center justify-center h-full bg-yellow-50 space-y-6 p-8 animate-fadeIn">
                <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center">
                    <span className="text-3xl">⚠️</span>
                </div>
                <div className="text-center">
                    <h2 className="text-xl font-bold text-gray-800">Action Required</h2>
                    <p className="text-gray-600 mt-2">Please authorize the payment via your mobile number.</p>
                </div>

                <a
                    href={authUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-transform hover:scale-105"
                >
                    Authorize Payment (Simulate)
                </a>

                <p className="text-xs text-gray-400 max-w-xs text-center">
                    Since we are in Sandbox, clicking above will open the Xendit Simulator where you can click "Success" to finalize.
                </p>

                <button
                    onClick={() => setStatus("SUCCESS")}
                    className="text-blue-600 font-bold underline text-sm mt-4"
                >
                    I have finished authorizing
                </button>
            </div>
        )
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
        )
    }

    if (status === "SUCCESS") {
        return (
            <div className="flex flex-col items-center justify-center h-full bg-blue-50 space-y-6 p-8 animate-scaleIn">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center shadow-inner">
                    <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                </div>
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-blue-800">Success!</h2>
                    <p className="text-gray-600 mt-2">
                        Transaction Completed for {transaction.phoneNumber}.
                    </p>
                    <p className="text-xs text-gray-400 mt-4">Ref: {Math.random().toString(36).substring(7).toUpperCase()}</p>
                </div>

                <Link href="/" className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg">
                    New Transaction
                </Link>
            </div>
        );
    }

    return null;
}
