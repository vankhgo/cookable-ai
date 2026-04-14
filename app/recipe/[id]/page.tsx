import { RecipeDetailScreen } from "@/features/recommendations/recipe-detail-screen";

export default async function RecipePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <RecipeDetailScreen recipeKey={decodeURIComponent(id)} />;
}
