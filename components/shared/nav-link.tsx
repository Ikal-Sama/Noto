"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
};

export default function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`${
        isActive ? "text-green-500 font-semibold" : "text-slate-700"
      } text-sm hover:text-green-500`}
    >
      {children}
    </Link>
  );
}
