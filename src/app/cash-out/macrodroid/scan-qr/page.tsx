"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransaction } from "@/context/TransactionContext";

export default function ScanQR() {
    const router = useRouter();
    const { transaction } = useTransaction();

    const handleProceed = async () => {
        // Save transaction details to server so the webhook can access them
        await fetch("/api/pending-transaction", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                phoneNumber: transaction.phoneNumber,
                amount: transaction.amount,
                fee: 10,
                total: transaction.amount + 10,
            }),
        });
        router.push("/cash-out/macrodroid/processing");
    };

    return (
        <div className="flex flex-col h-full animate-fadeIn bg-gray-50">
            <header className="bg-green-600 text-white p-6 shadow-md">
                <h1 className="text-xl font-bold">Scan to Pay</h1>
                <p className="text-xs opacity-80 mt-1">Send Payment to Wallet</p>
            </header>

            <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-6">

                {/* QR Code Container */}
                <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 flex flex-col items-center space-y-4 w-full max-w-sm">
                    <div className="w-64 h-64 bg-gray-200 rounded-lg flex items-center justify-center relative overflow-hidden">
                        {/* Use the public image if available, fallback to placeholder */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/mystaticQR.jpg"
                            alt="Maya QR Code"
                            className="w-full h-full object-contain"
                            onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                                (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                            }}
                        />
                        <div className="absolute inset-0 flex-col items-center justify-center text-gray-400 hidden bg-gray-100 w-full h-full">
                            <span className="text-5xl mb-2">📱</span>
                            <p className="text-sm font-mono">Image Not Found</p>
                            <p className="text-xs mt-2 px-8 text-center text-gray-400">Please verify `public/QR.jpg` exists</p>
                        </div>
                    </div>

                    <div className="text-center">
                        <p className="font-bold text-gray-800 text-lg">Pay ₱{transaction.total?.toLocaleString()}</p>
                        <p className="text-sm text-gray-500">Scan this QR with your Maya App</p>
                    </div>
                </div>

                <div className="w-full max-w-sm">
                    <button
                        onClick={handleProceed}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
                    >
                        <span>I Have Sent the Payment</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </button>
                    <p className="text-xs text-center text-gray-400 mt-2">Click after successful transfer</p>
                </div>
            </div>

            <div className="p-4 bg-white border-t border-gray-200">
                <Link href="/confirmation" className="block w-full text-center text-gray-500 hover:text-gray-800 py-3">
                    Back
                </Link>
            </div>
        </div>
    );
}
