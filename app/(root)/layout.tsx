import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/assets/styles/globals.css"




export const metadata: Metadata = {
  title: "Prostore",
  description: "Modern Ecommerce platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen flex-col">
        <main className="flex-1 wrapper">
            {children}
        </main>
    </div>
  );
}
