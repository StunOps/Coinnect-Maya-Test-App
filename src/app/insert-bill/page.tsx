"use client";

import { useRouter } from "next/navigation";
import { useTransaction } from "@/context/TransactionContext";
import { useState } from "react";

export default function InsertBill() {
    const router = useRouter();
    const { transaction } = useTransaction();
    const [inserted, setInserted] = useState(false);

    const handleDone = () => {
        setInserted(true);
        // Simulate delay or animation
        setTimeout(() => {
            router.push("/processing");
        }, 500);
    };

    return (
        <div className="flex flex-col h-full animate-fadeIn bg-gray-900 text-white">
            <header className="p-6 text-center">
                <h1 className="text-2xl font-bold text-blue-400">Insert Cash</h1>
                <p className="opacity-80 mt-2">Please insert exact amount</p>
            </header>

            <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-8">

                <div className="text-center">
                    <p className="text-sm text-gray-400 uppercase tracking-widest mb-2">Total Due</p>
                    <p className="text-5xl font-mono font-bold text-white">₱ {transaction.total?.toLocaleString()}</p>
                </div>

                {/* Bill Slot Animation / Visual */}
                <div className="relative w-64 h-32 bg-gray-800 rounded-lg border-b-4 border-gray-700 flex items-center justify-center overflow-hidden group">
                    <div className="absolute inset-x-8 h-2 bg-black rounded-full shadow-inner animate-pulse"></div>

                    {/* Animated Bill */}
                    <div className={`absolute w-32 h-16 bg-blue-600 rounded shadow-lg flex items-center justify-center text-xs font-bold border border-blue-400 transform transition-all duration-1000 ${inserted ? '-translate-y-20 opacity-0' : 'translate-y-12 animate-bounce'}`}>
                        $$$
                    </div>

                    <p className="mt-16 text-xs text-gray-500">Bill Acceptor</p>
                </div>


                <button
                    onClick={handleDone}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-6 px-4 rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all transform active:scale-95"
                >
                    Done Inserted
                </button>
            </div>
        </div>
    );
}
