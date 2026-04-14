import * as React from "react";

import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      className={cn(
        "h-11 w-full rounded-2xl border border-input bg-[#FFFDF9] px-4 text-sm text-[#2E211B] shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-[#B08968]/40",
        className,
      )}
      {...props}
    />
  );
});
