import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import LayoutContainer from "./LayoutContainer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <LayoutContainer>
        <body className={`${inter.className}`}>
          <div className="flex">
            <Navbar />
            <div className="flex-grow">{children}</div>
          </div>
        </body>
      </LayoutContainer>
    </html>
  );
}
