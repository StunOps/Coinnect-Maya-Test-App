"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransaction } from "@/context/TransactionContext";

export default function SelectTransaction() {
    const router = useRouter();
    const { setTransactionType } = useTransaction();

    const handleCashIn = () => {
        setTransactionType("CASH_IN");
        router.push("/insert-bill");
    };

    const handleCashOut = () => {
        setTransactionType("CASH_OUT");
        router.push("/enter-amount");
    };

    return (
        <div className="flex flex-col h-full animate-fadeIn">
            <header className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6 text-center shadow-md">
                <h1 className="text-xl font-bold">Coinnect Maya Cash In & Cash Out Services</h1>
            </header>

            <div className="flex-1 flex flex-col justify-center p-6 space-y-4">
                {/* Cash In Button */}
                <button
                    onClick={handleCashIn}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-6 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-between group"
                >
                    <div className="flex items-center gap-3">
                        <span className="text-3xl">💰</span>
                        <div className="flex flex-col items-start">
                            <span className="text-lg">Cash In</span>
                            <span className="text-sm font-normal opacity-80">Deposit cash to wallet</span>
                        </div>
                    </div>
                    <span className="text-2xl group-hover:translate-x-2 transition-transform">→</span>
                </button>

                {/* Cash Out Button */}
                <button
                    onClick={handleCashOut}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-6 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-between group"
                >
                    <div className="flex items-center gap-3">
                        <span className="text-3xl">💵</span>
                        <div className="flex flex-col items-start">
                            <span className="text-lg">Cash Out</span>
                            <span className="text-sm font-normal opacity-80">Pay via Maya, get cash</span>
                        </div>
                    </div>
                    <span className="text-2xl group-hover:translate-x-2 transition-transform">→</span>
                </button>

                {/* MacroDroid Cash Out via Maya */}
                <button
                    onClick={() => {
                        setTransactionType("MACRODROID_CASHOUT");
                        router.push("/enter-mobile");
                    }}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-6 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-between group"
                >
                    <div className="flex items-center gap-3">
                        <span className="text-3xl">💸</span>
                        <div className="flex flex-col items-start">
                            <span className="text-lg">Maya Cash Out (Real)</span>
                            <span className="text-sm font-normal opacity-80">Pay via Maya, receive cash</span>
                        </div>
                    </div>
                    <span className="text-2xl group-hover:translate-x-2 transition-transform">→</span>
                </button>
            </div>

            <div className="p-4">
                <Link href="/" className="block w-full text-center text-gray-500 hover:text-gray-800 py-3">
                    Back
                </Link>
            </div>
        </div>
    );
}
