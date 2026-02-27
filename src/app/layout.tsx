import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aidan Younathan Portfolio",
  description: "Aidan Younathan's personal portfolio website",
  // Use the same avatar image as the site favicon. Add a cache-busting query so browsers pick up updates.
  icons: {
    icon: [
      { url: '/images/Aidan.png?v=2', sizes: '32x32', type: 'image/png' },
      { url: '/images/Aidan.png?v=2', sizes: '192x192', type: 'image/png' }
    ],
    shortcut: '/images/Aidan.png?v=2',
    apple: '/images/Aidan.png?v=2',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
