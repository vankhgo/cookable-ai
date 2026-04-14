import * as React from "react";

import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { className, ...props },
  ref,
) {
  return (
    <textarea
      ref={ref}
      className={cn(
        "min-h-40 w-full rounded-[24px] border border-input bg-[#FFFDF9] px-5 py-4 text-base leading-7 text-[#2E211B] shadow-sm outline-none transition placeholder:text-[#8A7668] focus-visible:ring-2 focus-visible:ring-[#B08968]/40",
        className,
      )}
      {...props}
    />
  );
});
