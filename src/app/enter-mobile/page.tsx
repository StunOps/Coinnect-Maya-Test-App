"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransaction } from "@/context/TransactionContext";
import { useState } from "react";

export default function EnterMobile() {
    const router = useRouter();
    const { transaction, setPhoneNumber } = useTransaction();
    const [input, setInput] = useState(transaction.phoneNumber || "");
    const [error, setError] = useState("");

    const handleProceed = (e: React.FormEvent) => {
        e.preventDefault();
        // Allow any 11 digit starting with 09
        if (!input.startsWith("09") || input.length !== 11) {
            setError("Please enter a valid 11-digit mobile number (09xxxxxxxxx)");
            return;
        }
        setPhoneNumber(input);
        router.push("/enter-amount");
    };

    return (
        <div className="flex flex-col h-full animate-fadeIn">
            <header className="bg-green-600 text-white p-6 shadow-md">
                <h1 className="text-xl font-bold">Enter Mobile Number</h1>
                <p className="text-xs opacity-80 mt-1">Recipient Account</p>
            </header>

            <form onSubmit={handleProceed} className="flex-1 flex flex-col p-8">
                <div className="flex-1 flex flex-col justify-center space-y-4">
                    <label htmlFor="mobile" className="block text-gray-700 font-bold mb-2">
                        Mobile Number
                    </label>
                    <input
                        id="mobile"
                        type="tel"
                        placeholder="09123456789"
                        className={`w-full text-3xl p-4 border-b-2 outline-none transition-colors placeholder:text-gray-300 font-mono tracking-wider ${error ? "border-red-500 text-red-600" : "border-gray-300 focus:border-green-500"
                            }`}
                        value={input}
                        onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, "").slice(0, 11);
                            setInput(val);
                            setError("");
                        }}
                        autoFocus
                    />
                    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                </div>

                <div className="mt-auto space-y-3">
                    <button
                        type="submit"
                        disabled={input.length !== 11}
                        className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl shadow-lg transition-all"
                    >
                        Proceed
                    </button>

                    <Link href="/select-transaction" className="block w-full text-center text-gray-500 hover:text-gray-800 py-3">
                        Back
                    </Link>
                </div>
            </form>
        </div>
    );
}
