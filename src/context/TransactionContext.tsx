"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type TransactionType = "CASH_IN" | "CASH_OUT" | null;

interface TransactionState {
  provider: "Maya";
  type: TransactionType;
  phoneNumber: string;
  amount: number;
  fee: number;
  total: number;
}

interface TransactionContextType {
  transaction: TransactionState;
  setTransactionType: (type: TransactionType) => void;
  setPhoneNumber: (number: string) => void;
  setAmount: (amount: number) => void;
  resetTransaction: () => void;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const [transaction, setTransaction] = useState<TransactionState>({
    provider: "Maya",
    type: null,
    phoneNumber: "",
    amount: 0,
    fee: 0,
    total: 0,
  });

  const setTransactionType = (type: TransactionType) => {
    setTransaction((prev) => ({ ...prev, type }));
  };

  const setPhoneNumber = (phoneNumber: string) => {
    setTransaction((prev) => ({ ...prev, phoneNumber }));
  };

  const setAmount = (amount: number) => {
    // Calculate fee (example: 2% or fixed 15 pesos? User didn't specify, I'll use 2% for testing logic)
    // Actually user showed: Amount Transfer | Transaction Fee | Total Due
    const fee = Math.round(amount * 0.02); 
    const total = amount + fee;
    setTransaction((prev) => ({ ...prev, amount, fee, total }));
  };

  const resetTransaction = () => {
    setTransaction({
      provider: "Maya",
      type: null,
      phoneNumber: "",
      amount: 0,
      fee: 0,
      total: 0,
    });
  };

  return (
    <TransactionContext.Provider
      value={{
        transaction,
        setTransactionType,
        setPhoneNumber,
        setAmount,
        resetTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransaction = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error("useTransaction must be used within a TransactionProvider");
  }
  return context;
};
