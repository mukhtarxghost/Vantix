import type { Metadata } from "next";
import "./globals.css";
import Cursor from "@/components/ui/Cursor";
import { MotionProvider } from "@/components/system/MotionContext";
import AliveGrid from "@/components/system/AliveGrid";
import ScrollTypographyBridge from "@/components/system/ScrollTypographyBridge";
import SmoothScroll from "@/components/system/SmoothScroll";
import GlobalReveal from "@/components/system/GlobalReveal";
import SiteMotion from "@/components/system/SiteMotion";
import ScrollProgress from "@/components/system/ScrollProgress";

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
