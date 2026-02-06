import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TransactionProvider } from "@/context/TransactionContext";
import { WalletProvider } from "@/context/WalletContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Coinnect - Maya Cash In/Out",
  description: "Cash In and Cash Out with Maya",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-900`}
      >
        <WalletProvider>
          <TransactionProvider>
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
              <main className="w-full max-w-md bg-white shadow-xl rounded-2xl overflow-hidden min-h-[600px] flex flex-col">
                {children}
              </main>
            </div>
          </TransactionProvider>
        </WalletProvider>
      </body>
    </html>
  );
}
