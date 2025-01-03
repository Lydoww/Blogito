import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import Provider from "@/components/Provider";

export const metadata: Metadata = {
  title: "Blogito - Go further in your writing",
  description: "Created by Alexis HELM, it's a blog for people to write and share their ideas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-800">
        <Provider>
          <Navbar />
          <main className="pt-16"> {/* Add padding-top to account for the navbar */}
            {children}
          </main>
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}

