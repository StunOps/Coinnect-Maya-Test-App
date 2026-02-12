"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransaction } from "@/context/TransactionContext";

export default function Confirmation() {
    const router = useRouter();
    const { transaction } = useTransaction();

    const handleProceed = () => {
        if (transaction.type === "CASH_IN") {
            router.push("/insert-bill");
        } else if (transaction.type === "MACRODROID_CASHOUT") {
            router.push("/cash-out/macrodroid/scan-qr");
        } else {
            router.push("/processing");
        }
    };

    if (!transaction.amount) {
        // Fallback if refreshed
        return (
            <div className="flex flex-col items-center justify-center h-full">
                <p>Session expired.</p>
                <Link href="/" className="text-green-500">Go Home</Link>
            </div>
        )
    }

    return (
        <div className="flex flex-col h-full animate-fadeIn">
            <header className="bg-green-600 text-white p-6 shadow-md">
                <h1 className="text-xl font-bold">Confirmation</h1>
                <p className="text-xs opacity-80 mt-1">Please review details</p>
            </header>

            <div className="flex-1 flex flex-col p-8 bg-gray-50">

                <div className="bg-white rounded-xl shadow-sm p-6 space-y-4 border border-gray-100">
                    {/* Mobile Number */}
                    <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                        <span className="text-gray-500 text-sm">Mobile Number</span>
                        <span className="font-mono font-bold text-lg">{transaction.phoneNumber}</span>
                    </div>

                    {/* Amount Transfer */}
                    <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                        <span className="text-gray-500 text-sm">Amount</span>
                        <span className="font-bold text-lg">₱ {transaction.amount.toLocaleString()}</span>
                    </div>

                    {/* Transaction Fee */}
                    <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                        <span className="text-gray-500 text-sm">Transaction Fee</span>
                        <span className="font-bold text-red-500 text-lg">+ ₱ {transaction.fee.toLocaleString()}</span>
                    </div>

                    {/* Total Due */}
                    <div className="flex justify-between items-center pt-2">
                        <span className="text-gray-900 font-bold">Total Due</span>
                        <span className="font-bold text-2xl text-green-700">₱ {transaction.total.toLocaleString()}</span>
                    </div>
                </div>

                <div className="mt-8 text-center text-sm text-gray-400">
                    <p>Transaction Type: <span className="font-bold">{transaction.type?.replace("_", " ")}</span></p>
                </div>

                <div className="mt-auto space-y-3">
                    <button
                        onClick={handleProceed}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
                    >
                        <span>Proceed</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m6-6H6" /></svg>
                    </button>

                    <Link href="/enter-amount" className="block w-full text-center text-gray-500 hover:text-gray-800 py-3">
                        Back
                    </Link>
                </div>
            </div>
        </div>
    );
}
