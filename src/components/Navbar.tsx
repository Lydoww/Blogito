import React from "react";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { signOut } from "next-auth/react";
import UserAccountnav from "./UserAccountnav";

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className="bg-zinc-800 py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0">
      <div className="px-8 flex items-center justify-between">
        <Link href={"/"} className="hover:scale-105 transition ease-in-out">
          <Image
            src="/logo.png"
            alt="Logo"
            width={50}
            height={50}
            className="h-auto bg-white rounded-full"
          />
        </Link>
        {session?.user ? (
          <UserAccountnav />
        ) : (
          <Link className={`${buttonVariants()} hover:bg-black-600`} href={"/sign-in"}>
            Sign in
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
