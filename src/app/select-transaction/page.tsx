"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransaction } from "@/context/TransactionContext";

export default function SelectTransaction() {
    const router = useRouter();
    const { setTransactionType } = useTransaction();

    const handleCashOut = () => {
        setTransactionType("CASH_OUT");
        router.push("/enter-details");
    };

    return (
        <div className="flex flex-col h-full animate-fadeIn">
            <header className="bg-blue-600 text-white p-6 text-center shadow-md">
                <h1 className="text-xl font-bold">Maya Cash Out</h1>
                <p className="text-sm opacity-80 mt-1">Withdraw money from your Maya wallet</p>
            </header>

            <div className="flex-1 flex flex-col justify-center p-8 space-y-4">
                <button
                    onClick={handleCashOut}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-8 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-between group"
                >
                    <div className="flex flex-col items-start">
                        <span className="text-xl">💵 Cash Out</span>
                        <span className="text-sm font-normal opacity-80">Pay from Maya, get physical cash</span>
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
