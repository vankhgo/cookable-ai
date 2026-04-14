import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-[#D8C8B7] bg-[#F5EFE7] px-3 py-1 text-xs font-medium text-[#5B3A29]",
        className,
      )}
      {...props}
    />
  );
}
