import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Cursor from "@/components/ui/Cursor";
import { MotionProvider } from "@/components/system/MotionContext";
import AliveGrid from "@/components/system/AliveGrid";
import ScrollTypographyBridge from "@/components/system/ScrollTypographyBridge";
import SmoothScroll from "@/components/system/SmoothScroll";
import GlobalReveal from "@/components/system/GlobalReveal";
import SiteMotion from "@/components/system/SiteMotion";
import ScrollProgress from "@/components/system/ScrollProgress";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vantix — Intelligent Automation Infrastructure",
  description: "Vantix designs and deploys intelligent automation systems that eliminate repetitive work and keep businesses moving.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased bg-[#050505] text-[#f5f5f5] selection:bg-white selection:text-black">
        <MotionProvider>
          <AliveGrid />
          <SmoothScroll />
          <ScrollTypographyBridge />
          <GlobalReveal />
          <SiteMotion />
          <ScrollProgress />
          <Cursor />
          <div className="relative z-[1]">{children}</div>
        </MotionProvider>
      </body>
    </html>
  );
}

