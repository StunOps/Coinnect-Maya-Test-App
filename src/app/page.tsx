"use client";

import Link from "next/link";
import { useTransaction } from "@/context/TransactionContext";
import { useEffect } from "react";

export default function Home() {
  const { resetTransaction } = useTransaction();

  // Reset state on home load
  useEffect(() => {
    resetTransaction();
  }, []);

  return (
    <div className="flex flex-col h-full">
      <header className="bg-gray-900 text-white p-6 text-center">
        <h1 className="text-xl font-bold">Select Provider</h1>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-6">
        <p className="text-gray-600 mb-4 text-center">
          Choose your E-Wallet provider to start testing.
        </p>

        <Link
          href="/select-transaction"
          className="w-full max-w-xs group relative overflow-hidden bg-blue-500 hover:bg-blue-600 text-white font-bold py-6 px-4 rounded-xl shadow-lg transition-transform transform hover:scale-105 flex items-center justify-center space-x-3"
        >
          {/* Simple Icon */}
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-2xl">Maya</span>
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none"></div>
        </Link>

        {/* Placeholder for other providers if needed */}
        <div className="w-full max-w-xs border-2 border-dashed border-gray-300 rounded-xl py-4 flex items-center justify-center text-gray-400 select-none">
          More coming soon
        </div>
      </div>

      <div className="p-4 bg-gray-100 text-center text-xs text-gray-500">
        Demo/Sandbox Environment
      </div>
    </div>
  );
}
