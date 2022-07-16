import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useAuthToken, useLogout } from "./auth-context";

const Header = () => {
  const router = useRouter();
  const authToken = useAuthToken();
  const logoutHandler = useLogout();
  return (
    <div className="flex p-1 flex-nowrap bg-orange-400">
      <div className="flex gap-2 text-black w-full items-start flex-1 relative">
        <Link href="/" className="no-underline text-black">
          <div className="cursor-pointer">Hacker News</div>
        </Link>
        <Link href="/" className="no-underline text-black cursor-pointer">
          new
        </Link>
        <div>|</div>
        <Link href="/search" className="no-underline text-black cursor-pointer">
          search
        </Link>
        {authToken ? (
          <>
            <div>|</div>
            <Link
              href="/create"
              className="no-underline text-black cursor-pointer"
            >
              submit
            </Link>
            <div
              className="ml-1 cursor-pointer text-black right-4 absolute"
              onClick={() => {
                logoutHandler();
                router.push(`/`);
              }}
            >
              logout
            </div>
          </>
        ) : (
          <Link href="/login">
            <a className="no-underline text-black cursor-pointer right-4 absolute">
              login
            </a>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
