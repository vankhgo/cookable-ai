import { AlertTriangle, BookMarked } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function NoMatchPanel({ message }: { message: string }) {
  return (
    <Card className="rounded-[28px] border-[#D8C8B7] bg-[#FFFDF9]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg text-[#5B3A29]">
          <AlertTriangle className="size-5" />
          Flexible suggestions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-6 text-[#6B5B52]">{message}</p>
      </CardContent>
    </Card>
  );
}

export function EmptySavedPanel() {
  return (
    <Card className="rounded-[28px] bg-[#FFFDF9] text-center">
      <CardHeader>
        <CardTitle className="flex items-center justify-center gap-2 text-lg text-[#5B3A29]">
          <BookMarked className="size-5" />
          No saved recipes yet
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-6 text-[#6B5B52]">
          You have not saved any recipes yet. Save the ones you would like to cook again.
        </p>
      </CardContent>
    </Card>
  );
}
