"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const items = [
  { href: "/", label: "Home" },
  { href: "/saved", label: "Saved" },
];

export function AppNav() {
  const pathname = usePathname();

  return (
    <nav className="rounded-2xl border border-border bg-[#FFFDF9] p-1 shadow-sm">
      <ul className="flex items-center gap-1">
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "inline-flex min-w-20 items-center justify-center rounded-xl px-3 py-2 text-sm font-medium transition",
                  active
                    ? "bg-[#5B3A29] text-[#FFF9F4]"
                    : "text-[#6B5B52] hover:bg-[#F5EFE7] hover:text-[#2E211B]",
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
