import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";

import { AuthProvider } from "@/components/cookable/auth-provider";
import { SiteHeader } from "@/components/cookable/site-header";

import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-cookable-body",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-cookable-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cookable AI",
  description: "AI-powered ingredient-first recipe recommendations.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${fraunces.variable} h-full`}>
      <body className="min-h-full bg-background text-foreground font-sans">
        <AuthProvider>
          <div className="min-h-screen bg-gradient-to-b from-[#FAF6F1] via-[#FAF6F1] to-[#F5EFE7]">
            <SiteHeader />
            <main>{children}</main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
