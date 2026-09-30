import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Cursor from "@/components/ui/Cursor";
import { MotionProvider } from "@/components/system/MotionContext";
import AliveGrid from "@/components/system/AliveGrid";
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
  variable: "--font-jetbrains",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Vantix — Customer Growth Platform",
  description:
    "Vantix helps businesses acquire new customers, convert incoming demand, and manage the relationships that drive repeat growth.",
  openGraph: {
    title: "Vantix — Customer Growth Platform",
    description:
      "Acquire, convert, manage, and grow customers with AI-powered growth systems.",
    url: "https://vantix.work",
    siteName: "Vantix",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vantix — Customer Growth Platform",
    description:
      "Acquire, convert, manage, and grow customers with AI-powered growth systems.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable}`}
    >
      <body className="font-sans antialiased bg-[#050505] text-[#f5f5f5] selection:bg-white selection:text-black">
        <MotionProvider>
          <AliveGrid />
          <SmoothScroll />
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
