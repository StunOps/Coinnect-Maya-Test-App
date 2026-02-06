"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useWallet } from "@/context/WalletContext";

// Simulated bill denominations in PHP
const BILL_DENOMINATIONS = [20, 50, 100, 200, 500, 1000];

export default function InsertBill() {
    const router = useRouter();
    const { addBalance, balance } = useWallet();
    const [insertedAmount, setInsertedAmount] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleInsertBill = (denomination: number) => {
        setInsertedAmount((prev) => prev + denomination);
    };

    const handleConfirm = () => {
        if (insertedAmount <= 0) return;

        setIsProcessing(true);

        // Simulate processing delay
        setTimeout(() => {
            addBalance(insertedAmount);
            router.push(`/cash-in/success?amount=${insertedAmount}`);
        }, 1500);
    };

    const handleCancel = () => {
        setInsertedAmount(0);
        router.push("/select-transaction");
    };

    return (
        <div className="flex flex-col h-full animate-fadeIn">
            <header className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6 text-center shadow-md">
                <h1 className="text-xl font-bold">💰 Cash In</h1>
                <p className="text-sm opacity-80 mt-1">Insert bills to add to your wallet</p>
            </header>

            {/* Current Balance */}
            <div className="bg-gray-50 p-3 mx-4 mt-4 rounded-lg text-center">
                <p className="text-xs text-gray-500">Current Balance</p>
                <p className="text-lg font-semibold text-gray-700">₱{balance.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</p>
            </div>

            {/* Amount Being Inserted */}
            <div className="bg-green-50 p-4 mx-4 mt-3 rounded-xl border-2 border-green-200">
                <div className="text-center">
                    <p className="text-xs text-green-600 uppercase tracking-wide">Inserting</p>
                    <p className="text-4xl font-bold text-green-700 mt-1">
                        ₱{insertedAmount.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                    </p>
                </div>
            </div>

            {/* Simulated Bill Buttons */}
            <div className="flex-1 p-4">
                <p className="text-sm text-gray-500 text-center mb-3">
                    🎮 Simulate inserting bills (tap to add):
                </p>
                <div className="grid grid-cols-3 gap-2">
                    {BILL_DENOMINATIONS.map((denom) => (
                        <button
                            key={denom}
                            onClick={() => handleInsertBill(denom)}
                            disabled={isProcessing}
                            className="bg-white border-2 border-green-300 hover:bg-green-50 hover:border-green-500 text-green-700 font-bold py-3 px-2 rounded-lg shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            ₱{denom}
                        </button>
                    ))}
                </div>

                <p className="text-xs text-gray-400 text-center mt-3">
                    In a real kiosk, bills would be detected by the bill acceptor
                </p>
            </div>

            {/* Action Buttons */}
            <div className="p-4 space-y-3">
                <button
                    onClick={handleConfirm}
                    disabled={insertedAmount <= 0 || isProcessing}
                    className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                >
                    {isProcessing ? (
                        <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            Processing...
                        </>
                    ) : (
                        <>Confirm Cash In</>
                    )}
                </button>

                <button
                    onClick={handleCancel}
                    disabled={isProcessing}
                    className="w-full text-gray-500 hover:text-gray-800 py-3 disabled:opacity-50"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}
