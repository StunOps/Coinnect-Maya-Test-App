"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface WalletContextType {
    balance: number;
    addBalance: (amount: number) => void;
    deductBalance: (amount: number) => boolean;
    resetBalance: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

const STORAGE_KEY = "wallet_balance";
const INITIAL_BALANCE = 0;

export const WalletProvider = ({ children }: { children: ReactNode }) => {
    const [balance, setBalance] = useState<number>(INITIAL_BALANCE);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load balance from localStorage on mount
    useEffect(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                setBalance(parseFloat(saved));
            }
            setIsLoaded(true);
        }
    }, []);

    // Save balance to localStorage whenever it changes
    useEffect(() => {
        if (isLoaded && typeof window !== "undefined") {
            localStorage.setItem(STORAGE_KEY, balance.toString());
        }
    }, [balance, isLoaded]);

    const addBalance = (amount: number) => {
        setBalance((prev) => prev + amount);
    };

    const deductBalance = (amount: number): boolean => {
        if (balance >= amount) {
            setBalance((prev) => prev - amount);
            return true;
        }
        return false;
    };

    const resetBalance = () => {
        setBalance(INITIAL_BALANCE);
        if (typeof window !== "undefined") {
            localStorage.removeItem(STORAGE_KEY);
        }
    };

    return (
        <WalletContext.Provider
            value={{
                balance,
                addBalance,
                deductBalance,
                resetBalance,
            }}
        >
            {children}
        </WalletContext.Provider>
    );
};

export const useWallet = () => {
    const context = useContext(WalletContext);
    if (!context) {
        throw new Error("useWallet must be used within a WalletProvider");
    }
    return context;
};
