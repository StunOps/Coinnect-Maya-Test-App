"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function MacroDroidCashOut() {
    const router = useRouter();
    const [dots, setDots] = useState(".");

    // Poll the payment status endpoint every 2 seconds
    const { data, error } = useSWR("/api/payment-status", fetcher, {
        refreshInterval: 2000,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prev) => (prev.length >= 3 ? "." : prev + "."));
        }, 500);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (data && data.status === "received" && data.amount) {
            // Redirect to success page with amount query param
            router.push(`/cash-out/success?amount=${data.amount}`);
        }
    }, [data, router]);

    return (
        <div className="flex flex-col h-full animate-fadeIn bg-gray-50">
            <header className="bg-indigo-600 text-white p-6 shadow-md">
                <h1 className="text-xl font-bold">Scan to Pay</h1>
                <p className="text-xs opacity-80 mt-1">MacroDroid Integration</p>
            </header>

            <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-8">

                {/* QR Code Container */}
                <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 flex flex-col items-center space-y-4 w-full max-w-sm">
                    <div className="w-64 h-64 bg-gray-200 rounded-lg flex items-center justify-center relative overflow-hidden">
                        {/* Placeholder for QR Code */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                            <span className="text-5xl mb-2">📱</span>
                            <p className="text-sm font-mono">YOUR QR CODE HERE</p>
                            <p className="text-xs mt-2 px-8 text-center text-gray-400">Place `my-qr.png` in `/public` to update</p>
                        </div>
                        {/* If user adds image later: <img src="/my-qr.png" alt="Maya QR" className="w-full h-full object-contain" /> */}
                    </div>

                    <div className="text-center">
                        <p className="font-bold text-gray-800 text-lg">Send Money to Wallet</p>
                        <p className="text-sm text-gray-500">Scan this QR code with your Maya App</p>
                    </div>
                </div>

                {/* Status Indicator */}
                <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 w-full max-w-sm flex items-center justify-center gap-3">
                    <div className="w-3 h-3 bg-indigo-500 rounded-full animate-pulse"></div>
                    <p className="text-indigo-800 font-medium">
                        Waiting for payment{dots}
                    </p>
                </div>

                <div className="text-xs text-gray-400 text-center max-w-xs">
                    <p>Make sure your phone (MacroDroid) is connected to the same network and configured correctly.</p>
                </div>
            </div>

            <div className="p-4 bg-white border-t border-gray-200">
                <Link href="/select-transaction" className="block w-full text-center text-gray-500 hover:text-gray-800 py-3">
                    Cancel Transaction
                </Link>
            </div>
        </div>
    );
}
