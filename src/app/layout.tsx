import "./globals.css";

import type { Metadata } from "next";
import localFont from "next/font/local";

import { Providers } from "./providers";

const pretendard = localFont({
  src: "../shared/assets/fonts/Pretendard-Regular.woff",
  variable: "--font-pretendard",
  weight: "400",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  title: "꽈자사전",
  description: "신상 과자를 찾아보고 비교하는 과자 리뷰 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${pretendard.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
