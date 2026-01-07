import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const manropeBold = localFont({
  src: "./fonts/Manrope-Bold.woff2",
  variable: "--font-manrope-bold",
});

const manropeRegular = localFont({
  src: "./fonts/Manrope-Regular.woff2",
  variable: "--font-manrope-regular",
});

const manropeMedium = localFont({
  src: "./fonts/Manrope-Medium.woff2",
  variable: "--font-manrope-medium",
});

const manropeSemiBold = localFont({
  src: "./fonts/Manrope-SemiBold.woff2",
  variable: "--font-manrope-semi-bold",
});

export const metadata: Metadata = {
  title: "Muhammed Vengalath",
  description: "Computer Science Engineer - Full Stack Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${manropeBold.variable} ${manropeSemiBold.variable} ${manropeMedium.variable} ${manropeRegular.variable} antialiased m-0 p-0 `}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
