import React from "react";
import NavLink from "./nav-link";
import Link from "next/link";
import { Button } from "../ui/button";
import { Notebook } from "lucide-react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
export const dynamic = "force-dynamic";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Logout } from "../logout";
import Logo from "../logo";

const Navbar = async () => {
  const sessionResponse = await auth.api.getSession({
    headers: await headers(),
  });
  const session = sessionResponse?.session ?? null;
  const user = sessionResponse?.user ?? null;

  return (
    <header className="flex justify-between max-w-screen-xl py-4 px-12 mx-auto bg-slate-50 shadow rounded-lg">
      <Link href="/">
        <div className=" py-1 px-2 rounded-md group flex gap-1">
          <Logo />
        </div>
      </Link>
      <nav className="flex items-center gap-4">
        <NavLink href="/dashboard">Dashboard</NavLink>
        <NavLink href="/dashboard/notes">Notes</NavLink>
        {session ? (
          user && (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Image
                  src={user?.image || "/avatar.png"}
                  alt="User Image"
                  width={25}
                  height={25}
                  className="rounded-full"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>
                  <Logout />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        ) : (
          <>
            <Link href="/login">
              <Button className="cursor-pointer ">Sign in</Button>
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
