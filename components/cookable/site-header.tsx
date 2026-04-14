import Link from "next/link";

import { AppNav } from "@/components/cookable/app-nav";
import { AuthControls } from "@/components/cookable/auth-controls";

export function SiteHeader() {
  return (
    <header className="border-b border-[#E7D8C9] bg-[#FAF6F1]/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 md:px-6">
        <Link href="/" className="space-y-0.5">
          <p className="font-heading text-xl font-semibold text-[#2E211B] md:text-2xl">Cookable AI</p>
          <p className="text-xs text-[#6B5B52] md:text-sm">Cook from what you already have.</p>
        </Link>
        <div className="flex items-center gap-3">
          <AppNav />
          <AuthControls />
        </div>
      </div>
    </header>
  );
}
