import type { Metadata } from "next";

import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import Provider from "@/components/Provider";


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        <Provider >
        <main className="h-screen flex flex-col justify-center items-center">
          <Navbar />
          {children}
        </main>
        <Toaster />
        </Provider>
      </body>
    </html>
  );
}
