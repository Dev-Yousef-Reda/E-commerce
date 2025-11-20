import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import '../../node_modules/@fortawesome/fontawesome-free/css/all.min.css'
import RootLayoutClientRender from "_/components/RootLayoutClientRender/RootLayoutClientRender";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "e-commerce",
  description: "e-commerce where you can best quality for best prices",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-neutral-200  overflow-auto mb-27 sm:mb-0 `}
      >
        <RootLayoutClientRender >
          {children}
        </RootLayoutClientRender>
      </body>
    </html>
  );
}
