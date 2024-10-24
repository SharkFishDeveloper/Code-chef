import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "../util/provider";
import Appbar from "../components/Appbar";
import { Toaster } from "react-hot-toast";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Leetforce",
  description: "Submit code and participate in contests",
  icons:{
    // icon:"../public/force.svg"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <Providers>
        <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Toaster/>
        <Appbar/>
          <div style={{ overflowX: 'hidden' }}>
            {children}
          </div>
        </body>
      </html>
          </Providers>
  );
}
