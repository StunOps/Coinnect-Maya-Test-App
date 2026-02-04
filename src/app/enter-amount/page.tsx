"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransaction } from "@/context/TransactionContext";
import { useState } from "react";

export default function EnterAmount() {
    const router = useRouter();
    const { transaction, setAmount } = useTransaction();
    const [input, setInput] = useState(transaction.amount ? transaction.amount.toString() : "");
    const [error, setError] = useState("");

    const handleProceed = (e: React.FormEvent) => {
        e.preventDefault();
        const val = parseInt(input, 10);
        if (!val || val < 10) {
            setError("Min amount is 10");
            return;
        }
        setAmount(val); // Context calculates fees
        router.push("/confirmation");
    };

    return (
        <div className="flex flex-col h-full animate-fadeIn">
            <header className="bg-blue-600 text-white p-6 shadow-md">
                <h1 className="text-xl font-bold">Enter Amount</h1>
                <p className="text-xs opacity-80 mt-1">For: {transaction.phoneNumber}</p>
            </header>

            <form onSubmit={handleProceed} className="flex-1 flex flex-col p-8">
                <div className="flex-1 flex flex-col justify-center space-y-4">
                    <label htmlFor="amount" className="block text-gray-700 font-bold mb-2">
                        Amount (PHP)
                    </label>
                    <div className="relative">
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 text-3xl text-gray-400 font-light">₱</span>
                        <input
                            id="amount"
                            type="tel" // triggers numpad on mobile
                            placeholder="0"
                            className={`w-full text-4xl pl-8 p-4 border-b-2 outline-none transition-colors font-mono tracking-wide ${error ? "border-red-500 text-red-600" : "border-gray-300 focus:border-blue-500"
                                }`}
                            value={input}
                            onChange={(e) => {
                                const val = e.target.value.replace(/\D/g, "");
                                setInput(val);
                                setError("");
                            }}
                            autoFocus
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                </div>

                <div className="mt-auto space-y-3">
                    <button
                        type="submit"
                        disabled={!input || parseInt(input) <= 0}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl shadow-lg transition-all"
                    >
                        Proceed
                    </button>

                    <Link href="/enter-details" className="block w-full text-center text-gray-500 hover:text-gray-800 py-3">
                        Back
                    </Link>
                </div>
            </form>
        </div>
    );
}
