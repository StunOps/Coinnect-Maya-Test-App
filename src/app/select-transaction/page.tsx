"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransaction } from "@/context/TransactionContext";

export default function SelectTransaction() {
    const router = useRouter();
    const { setTransactionType } = useTransaction();

    const handleSelect = (type: "CASH_IN" | "CASH_OUT") => {
        setTransactionType(type);
        router.push("/enter-details");
    };

    return (
        <div className="flex flex-col h-full animate-fadeIn">
            <header className="bg-blue-600 text-white p-6 text-center shadow-md">
                <h1 className="text-xl font-bold">What would you like to do?</h1>
            </header>

            <div className="flex-1 flex flex-col justify-center p-8 space-y-4">
                <button
                    onClick={() => handleSelect("CASH_IN")}
                    className="w-full bg-white border-2 border-blue-500 hover:bg-blue-50 text-blue-700 font-bold py-8 px-4 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-between group"
                >
                    <div className="flex flex-col items-start">
                        <span className="text-xl">Cash In</span>
                        <span className="text-sm font-normal text-gray-500">Add money to wallet</span>
                    </div>
                    <span className="text-2xl group-hover:translate-x-2 transition-transform">→</span>
                </button>

                <button
                    onClick={() => handleSelect("CASH_OUT")}
                    className="w-full bg-white border-2 border-blue-500 hover:bg-blue-50 text-blue-700 font-bold py-8 px-4 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-between group"
                >
                    <div className="flex flex-col items-start">
                        <span className="text-xl">Cash Out</span>
                        <span className="text-sm font-normal text-gray-500">Withdraw money</span>
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
