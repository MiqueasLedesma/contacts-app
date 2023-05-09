"use client";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {};

export const Navbar = (props: Props) => {
  const pathname = usePathname();
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    return window.history.back();
  };

  return (
    <nav className="flex flex-row justify-center fixed top-0 bg-slate-700 w-screen px-8 py-2 text-slate-200 items-center">
      <h2 className="font-semibold text-2xl">App-Contacts</h2>
      {pathname == "/register" && (
        <button onClick={handleClick} className="absolute left-10">
          Go Back
        </button>
      )}
    </nav>
  );
};
