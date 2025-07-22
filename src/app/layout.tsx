import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rick & Morty Explorer",
  description:
    "Discover characters and explore their adventures from the Rick and Morty universe",
  keywords: ["Rick and Morty", "characters", "episodes", "API", "Next.js"],
  authors: [{ name: "Rick & Morty Explorer" }],
  openGraph: {
    title: "Rick & Morty Explorer",
    description: "Discover characters and explore their adventures",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>{children}</main>
      </body>
    </html>
  );
}
