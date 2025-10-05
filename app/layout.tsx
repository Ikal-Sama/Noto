"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import ClientProvider from "@/lib/utils/query-client-provider";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { ShapeDivider } from "@/components/shared/shape-divider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = "Nōto";
const description = "Your personal note app";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const pathname = usePathname();
  const showShapeDivider = ["/", "/login", "/signup"].includes(pathname || "");
  return (
    <html lang="en">
      <head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <Navbar /> */}
        <main
          className={`max-w-screen px-8 lg:px-12 mx-auto h-full ${
            showShapeDivider
              ? "bg-gradient-to-br from-green-50 to-green-100"
              : ""
          } relative`}
        >
          <ClientProvider>{children}</ClientProvider>
          {showShapeDivider && <ShapeDivider />}
        </main>
        <Toaster richColors />
      </body>
    </html>
  );
}
