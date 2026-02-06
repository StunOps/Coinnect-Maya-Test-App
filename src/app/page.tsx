"use client";

import Link from "next/link";
import { useTransaction } from "@/context/TransactionContext";
import { useWallet } from "@/context/WalletContext";
import { useEffect } from "react";

export default function Home() {
  const { resetTransaction } = useTransaction();
  const { balance } = useWallet();

  // Reset state on home load
  useEffect(() => {
    resetTransaction();
  }, []);

  return (
    <div className="flex flex-col h-full">
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 text-center">
        <h1 className="text-2xl font-bold">Coinnect</h1>
        <p className="text-sm opacity-80 mt-1">Cash In & Cash Out Kiosk</p>
      </header>

      {/* Wallet Balance Card */}
      <div className="bg-gradient-to-br from-blue-500 to-purple-600 mx-4 mt-4 p-5 rounded-2xl shadow-lg text-white">
        <div className="text-center">
          <p className="text-sm opacity-80 uppercase tracking-wide">Wallet Balance</p>
          <p className="text-4xl font-bold mt-2">
            ₱{balance.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-4">
        <p className="text-gray-500 text-sm text-center mb-2">
          Tap below to start a transaction
        </p>

        <Link
          href="/select-transaction"
          className="w-full max-w-xs group relative overflow-hidden bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-5 px-6 rounded-xl shadow-lg transition-all transform hover:scale-105 flex items-center justify-center gap-3"
        >
          <span className="text-2xl">🚀</span>
          <span className="text-xl">Start Transaction</span>
        </Link>
      </div>

      <div className="p-4 bg-gray-100 text-center text-xs text-gray-500">
        Maya Sandbox Environment • Demo App
      </div>
    </div>
  );
}
