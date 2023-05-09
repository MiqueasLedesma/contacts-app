import "./globals.css";

import React from "react";

export const metadata = {
  title: "Contacts-App",
  description: "CRUD Contact-App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-300">{children}</body>
    </html>
  );
}
