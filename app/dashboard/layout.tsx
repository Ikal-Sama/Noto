import { Metadata } from "next";

import Navbar from "@/components/shared/navbar";

export const metadata: Metadata = {
  title: "Dashboard | Nōto",
  description: "Your personal note app dashboard",
};

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-svh">
      <Navbar />
      <main className="max-w-screen-xl px-12 mx-auto h-full">{children}</main>
    </div>
  );
}
