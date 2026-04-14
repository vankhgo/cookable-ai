import { Skeleton } from "@/components/ui/skeleton";

export function LoadingRecipes() {
  return (
    <div className="space-y-4 rounded-3xl border border-border bg-[#FFFDF9] p-5">
      <p className="text-sm font-medium text-[#6B5B52]">Reviewing your ingredients...</p>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((key) => (
          <div key={key} className="space-y-3 rounded-3xl border border-[#E7D8C9] p-4">
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-24 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
