import Link from "next/link";

import { LANDING_LINKS, LANDING_NAV_ITEMS } from "@/lib/constants/landing";

export function SiteHeader() {
  return (
    <header
      data-testid="cookable-navbar"
      className="sticky top-0 z-50 border-b border-[#E7D8C9]/80 bg-[#FAF6F1]/85 backdrop-blur-xl"
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link href="/" className="flex items-center gap-3">
          <span className="inline-flex size-10 items-center justify-center rounded-2xl bg-[#5B3A29] text-sm font-semibold text-[#FFF9F4] shadow-[0_8px_24px_rgba(91,58,41,0.28)]">
            CA
          </span>
          <span className="block">
            <span className="block font-heading text-lg font-semibold text-[#2E211B] md:text-xl">Cookable AI</span>
            <span className="block text-[11px] leading-4 text-[#6B5B52] md:text-xs">
              cook from what you already have
            </span>
          </span>
        </Link>

        <nav className="hidden lg:block">
          <ul className="flex items-center gap-2 rounded-full border border-[#E7D8C9] bg-[#FFFDF9]/90 px-2 py-1 shadow-[0_8px_20px_rgba(91,58,41,0.08)]">
            {LANDING_NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="inline-flex rounded-full px-3 py-1.5 text-sm font-medium text-[#5B3A29] transition hover:bg-[#F5EFE7]"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <a
            href={LANDING_LINKS.github}
            target="_blank"
            rel="noreferrer"
            data-testid="cookable-github-button-nav"
            className="inline-flex h-10 items-center rounded-2xl border border-[#D8C8B7] bg-[#FFFDF9] px-4 text-sm font-medium text-[#5B3A29] transition hover:bg-[#F5EFE7]"
          >
            GitHub
          </a>
          <a
            href={LANDING_LINKS.demo}
            data-testid="cookable-demo-button-nav"
            className="inline-flex h-10 items-center rounded-2xl bg-[#5B3A29] px-4 text-sm font-medium text-[#FFF9F4] shadow-[0_10px_20px_rgba(91,58,41,0.25)] transition hover:bg-[#4D3123]"
          >
            View Demo
          </a>
        </div>

        <details className="relative md:hidden">
          <summary className="list-none cursor-pointer rounded-xl border border-[#D8C8B7] bg-[#FFFDF9] px-3 py-2 text-sm font-medium text-[#5B3A29] [&::-webkit-details-marker]:hidden">
            Menu
          </summary>
          <div className="absolute right-0 mt-2 w-60 rounded-3xl border border-[#E7D8C9] bg-[#FFFDF9] p-3 shadow-[0_18px_30px_rgba(46,33,27,0.14)]">
            <nav>
              <ul className="space-y-1">
                {LANDING_NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="block rounded-xl px-3 py-2 text-sm font-medium text-[#5B3A29] hover:bg-[#F5EFE7]"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-3 space-y-2 border-t border-[#E7D8C9] pt-3">
              <a
                href={LANDING_LINKS.github}
                target="_blank"
                rel="noreferrer"
                className="block rounded-xl border border-[#D8C8B7] bg-[#FFFDF9] px-3 py-2 text-center text-sm font-medium text-[#5B3A29]"
              >
                GitHub
              </a>
              <a
                href={LANDING_LINKS.demo}
                className="block rounded-xl bg-[#5B3A29] px-3 py-2 text-center text-sm font-medium text-[#FFF9F4]"
              >
                View Demo
              </a>
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}
