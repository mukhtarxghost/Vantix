import type { Metadata } from "next";
import "./globals.css";
import Cursor from "@/components/ui/Cursor";

export const metadata: Metadata = {
  title: "Vantix — Automation Solutions",
  description: "Intelligent systems for modern business.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Cursor />
        {children}
      </body>
    </html>
  );
}