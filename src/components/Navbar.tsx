import React from "react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
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
        {/* Actions */}
        <div className="flex items-center space-x-4">
          {session?.user ? (
            <>
              {/* User Navigation */}
              <UserAccountnav />

              {/* Admin Button */}
              <Link
                className={`${buttonVariants()} hover:bg-gray-600`}
                href="/admin"
              >
                Go to your admin page
              </Link>
            </>
          ) : (
            /* Sign-in Button */
            <Link
              className={`${buttonVariants()} hover:bg-black-600`}
              href="/sign-in"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
