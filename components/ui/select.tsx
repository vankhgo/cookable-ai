import * as React from "react";

import { cn } from "@/lib/utils";

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { className, children, ...props },
  ref,
) {
  return (
    <select
      ref={ref}
      className={cn(
        "h-11 w-full rounded-2xl border border-input bg-[#FFFDF9] px-3 text-sm text-[#2E211B] shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-[#B08968]/40",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
});
