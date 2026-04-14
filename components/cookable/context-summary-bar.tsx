import { RefreshCcw, SquarePen } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Props = {
  ingredients: string[];
  cuisine: string;
  servings: number;
  onEdit: () => void;
  onRegenerate: () => void;
  disabled?: boolean;
};

export function ContextSummaryBar({
  ingredients,
  cuisine,
  servings,
  onEdit,
  onRegenerate,
  disabled,
}: Props) {
  return (
    <div className="rounded-3xl border border-border bg-[#FFFDF9] p-4 shadow-sm">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <Badge>{cuisine}</Badge>
        <Badge>{servings} servings</Badge>
        <Badge>{ingredients.length} ingredients</Badge>
      </div>

      <p className="text-sm leading-6 text-[#6B5B52]">
        Cooking with: <span className="font-medium text-[#2E211B]">{ingredients.slice(0, 8).join(", ")}</span>
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onEdit}
          disabled={disabled}
          className="rounded-xl border-[#D8C8B7] bg-[#FFFDF9] text-[#5B3A29] hover:bg-[#F5EFE7]"
        >
          <SquarePen className="size-4" />
          Edit ingredients
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onRegenerate}
          disabled={disabled}
          className="rounded-xl border-[#D8C8B7] bg-[#FFFDF9] text-[#5B3A29] hover:bg-[#F5EFE7]"
        >
          <RefreshCcw className="size-4" />
          Regenerate
        </Button>
      </div>
    </div>
  );
}
