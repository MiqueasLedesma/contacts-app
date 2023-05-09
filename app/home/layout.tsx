"use client";
import React from "react";
import { HomeNavbar } from "./components/HomeNavbar";
import { HomeFooter } from "./components/HomeFooter";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-screen flex flex-col">
      <HomeNavbar />
      <main className="bg-slate-300">{children}</main>
      <HomeFooter />
    </div>
  );
}
