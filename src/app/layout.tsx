import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import SmoothScroll from "@/components/global/SmoothScroll";
import CustomCursor from "@/components/global/CustomCursor";
import LoadingScreen from "@/components/global/LoadingScreen";
import ScrollProgress from "@/components/global/ScrollProgress";
import { RobotProvider } from "@/components/global/RobotContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Arlo AI - Your Second Brain",
  description: "iOS & macOS AI Assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased bg-black text-white">
        <RobotProvider>
          <LoadingScreen />
          <CustomCursor />
          <ScrollProgress />
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </RobotProvider>
      </body>
    </html>
  );
}
