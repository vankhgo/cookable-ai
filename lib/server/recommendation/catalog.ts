import { overlapsIngredient, tokenize } from "@/lib/server/recommendation/ingredients";
import { getCuisineAlignment } from "@/lib/server/recommendation/cuisine";
import type { RecipeRecommendation } from "@/lib/types/recipe";

type CatalogIngredient = {
  name: string;
  amount: number;
  unit: string;
  optional?: boolean;
};

type CatalogRecipe = {
  recipeKey: string;
  title: string;
  shortDescription: string;
  summary: string;
  cuisine: string;
  cookTimeMinutes: number;
  baseServings: number;
  ingredients: CatalogIngredient[];
  steps: string[];
  substitutions: Record<string, string[]>;
  imageUrl?: string;
};

export const RECIPE_CATALOG: CatalogRecipe[] = [
  {
    recipeKey: "italian-garlic-tomato-pasta",
    title: "Garlic Tomato Pantry Pasta",
    shortDescription: "Quick Italian pasta with garlic, tomato, and pantry staples.",
    summary: "A weeknight pasta that turns simple pantry ingredients into a rich, comforting bowl.",
    cuisine: "Italian",
    cookTimeMinutes: 28,
    baseServings: 2,
    ingredients: [
      { name: "spaghetti", amount: 180, unit: "g" },
      { name: "tomatoes", amount: 2, unit: "pcs" },
      { name: "garlic", amount: 3, unit: "cloves" },
      { name: "olive oil", amount: 2, unit: "tbsp" },
      { name: "onion", amount: 0.5, unit: "pc", optional: true },
      { name: "chili flakes", amount: 0.5, unit: "tsp", optional: true },
      { name: "salt", amount: 0.5, unit: "tsp" },
    ],
    steps: [
      "Boil the pasta in salted water until al dente.",
      "Saute garlic and onion in olive oil until fragrant.",
      "Add chopped tomatoes and simmer until saucy.",
      "Toss pasta with sauce and a splash of pasta water.",
      "Finish with chili flakes and serve warm.",
    ],
    substitutions: {
      spaghetti: ["Use penne or any short pasta."],
      tomatoes: ["Use canned diced tomatoes if fresh are unavailable."],
    },
  },
  {
    recipeKey: "mexican-bean-rice-skillet",
    title: "Smoky Bean and Rice Skillet",
    shortDescription: "One-pan Mexican-inspired rice with beans and peppers.",
    summary: "A balanced skillet meal using rice, beans, and aromatics with bold but familiar flavor.",
    cuisine: "Mexican",
    cookTimeMinutes: 32,
    baseServings: 2,
    ingredients: [
      { name: "cooked rice", amount: 2, unit: "cups" },
      { name: "black beans", amount: 1, unit: "cup" },
      { name: "onion", amount: 0.5, unit: "pc" },
      { name: "bell pepper", amount: 1, unit: "pc" },
      { name: "garlic", amount: 2, unit: "cloves" },
      { name: "tomato paste", amount: 1, unit: "tbsp", optional: true },
      { name: "cumin", amount: 0.75, unit: "tsp" },
      { name: "salt", amount: 0.5, unit: "tsp" },
    ],
    steps: [
      "Saute onion, pepper, and garlic until softened.",
      "Stir in cumin and tomato paste for 1 minute.",
      "Add beans and cooked rice, then fold together.",
      "Splash in a little water and heat through.",
      "Taste, adjust salt, and serve hot.",
    ],
    substitutions: {
      "black beans": ["Use kidney beans or chickpeas."],
      "bell pepper": ["Use carrot or zucchini for crunch."],
    },
  },
  {
    recipeKey: "indian-egg-masala-scramble",
    title: "Masala Egg Scramble",
    shortDescription: "Fast Indian-style egg scramble with onion, tomato, and spices.",
    summary: "A practical protein-rich meal that works with basic produce and pantry spices.",
    cuisine: "Indian",
    cookTimeMinutes: 18,
    baseServings: 2,
    ingredients: [
      { name: "eggs", amount: 4, unit: "pcs" },
      { name: "onion", amount: 0.5, unit: "pc" },
      { name: "tomato", amount: 1, unit: "pc" },
      { name: "garlic", amount: 2, unit: "cloves", optional: true },
      { name: "turmeric", amount: 0.25, unit: "tsp" },
      { name: "cumin", amount: 0.5, unit: "tsp" },
      { name: "oil", amount: 1.5, unit: "tbsp" },
      { name: "salt", amount: 0.5, unit: "tsp" },
    ],
    steps: [
      "Saute onion and garlic in oil until lightly golden.",
      "Add tomato, turmeric, and cumin; cook until soft.",
      "Beat eggs with salt, then pour into pan.",
      "Stir gently until eggs are just set.",
      "Serve immediately with toast or rice.",
    ],
    substitutions: {
      eggs: ["Use crumbled tofu for an egg-free version."],
    },
  },
  {
    recipeKey: "asian-ginger-chicken-stirfry",
    title: "Ginger Chicken Stir-Fry",
    shortDescription: "Quick Asian-style stir-fry with chicken and vegetables.",
    summary: "A fast stir-fry that uses high heat and simple sauce for a practical dinner.",
    cuisine: "Asian",
    cookTimeMinutes: 24,
    baseServings: 2,
    ingredients: [
      { name: "chicken", amount: 300, unit: "g" },
      { name: "soy sauce", amount: 2, unit: "tbsp" },
      { name: "garlic", amount: 2, unit: "cloves" },
      { name: "ginger", amount: 1, unit: "tsp" },
      { name: "carrot", amount: 1, unit: "pc", optional: true },
      { name: "broccoli", amount: 1.5, unit: "cups", optional: true },
      { name: "oil", amount: 1.5, unit: "tbsp" },
    ],
    steps: [
      "Slice chicken thinly and toss with 1 tbsp soy sauce.",
      "Heat oil in a hot pan and sear chicken until mostly cooked.",
      "Add garlic, ginger, and vegetables; stir-fry quickly.",
      "Add remaining soy sauce and toss until glossy.",
      "Serve over warm rice.",
    ],
    substitutions: {
      chicken: ["Use tofu or mushrooms for a vegetarian option."],
      broccoli: ["Use cabbage or spinach if needed."],
    },
  },
  {
    recipeKey: "mediterranean-chickpea-salad-bowl",
    title: "Mediterranean Chickpea Bowl",
    shortDescription: "No-fuss bowl with chickpeas, cucumber, tomato, and herbs.",
    summary: "A fresh, filling bowl built from pantry legumes and crisp vegetables.",
    cuisine: "Mediterranean",
    cookTimeMinutes: 15,
    baseServings: 2,
    ingredients: [
      { name: "chickpeas", amount: 1.5, unit: "cups" },
      { name: "cucumber", amount: 1, unit: "pc" },
      { name: "tomato", amount: 1, unit: "pc" },
      { name: "olive oil", amount: 1.5, unit: "tbsp" },
      { name: "lemon", amount: 0.5, unit: "pc" },
      { name: "salt", amount: 0.5, unit: "tsp" },
      { name: "pepper", amount: 0.25, unit: "tsp", optional: true },
    ],
    steps: [
      "Rinse chickpeas and place in a large bowl.",
      "Dice cucumber and tomato, then add to bowl.",
      "Whisk olive oil, lemon juice, salt, and pepper.",
      "Pour dressing over bowl and toss well.",
      "Let sit for 5 minutes and serve.",
    ],
    substitutions: {
      chickpeas: ["Use white beans or lentils."],
      lemon: ["Use a splash of vinegar."],
    },
  },
  {
    recipeKey: "american-sheet-pan-potato-egg",
    title: "Potato and Egg Breakfast Tray",
    shortDescription: "Oven-baked potato and egg tray meal for any time of day.",
    summary: "A comforting tray bake that uses inexpensive staples and minimal cleanup.",
    cuisine: "American",
    cookTimeMinutes: 35,
    baseServings: 2,
    ingredients: [
      { name: "potatoes", amount: 3, unit: "pcs" },
      { name: "eggs", amount: 3, unit: "pcs" },
      { name: "onion", amount: 0.5, unit: "pc", optional: true },
      { name: "oil", amount: 1.5, unit: "tbsp" },
      { name: "salt", amount: 0.75, unit: "tsp" },
      { name: "paprika", amount: 0.5, unit: "tsp", optional: true },
    ],
    steps: [
      "Cut potatoes into small cubes and toss with oil and salt.",
      "Roast at 220C for 20 minutes.",
      "Stir in onion and roast for 5 more minutes.",
      "Make wells and crack eggs into the tray.",
      "Bake until eggs are set to your preference.",
    ],
    substitutions: {
      potatoes: ["Use sweet potatoes if available."],
    },
  },
  {
    recipeKey: "any-vegetable-fried-rice",
    title: "Flexible Vegetable Fried Rice",
    shortDescription: "Use leftover rice and mixed vegetables for a fast one-pan meal.",
    summary: "A dependable way to use leftovers while keeping flavors balanced and savory.",
    cuisine: "Any",
    cookTimeMinutes: 20,
    baseServings: 2,
    ingredients: [
      { name: "cooked rice", amount: 2.5, unit: "cups" },
      { name: "egg", amount: 2, unit: "pcs", optional: true },
      { name: "onion", amount: 0.5, unit: "pc", optional: true },
      { name: "mixed vegetables", amount: 1.5, unit: "cups" },
      { name: "soy sauce", amount: 1.5, unit: "tbsp" },
      { name: "oil", amount: 1.5, unit: "tbsp" },
      { name: "garlic", amount: 1, unit: "clove", optional: true },
    ],
    steps: [
      "Scramble eggs in oil and set aside.",
      "Cook onion, garlic, and vegetables until hot.",
      "Add rice and break up clumps over high heat.",
      "Season with soy sauce and fold eggs back in.",
      "Taste and serve immediately.",
    ],
    substitutions: {
      "mixed vegetables": ["Use any two vegetables you have on hand."],
      "soy sauce": ["Use salt plus a splash of vinegar for depth."],
    },
  },
];

export type CandidateRecipe = {
  recipeKey: string;
  title: string;
  shortDescription: string;
  summary: string;
  cuisine: string;
  cookTimeMinutes: number;
  baseServings: number;
  ingredients: CatalogIngredient[];
  steps: string[];
  substitutions: Record<string, string[]>;
  sourceProvider: string;
  imageUrl: string | null;
  fitScore: number;
  matchedIngredients: string[];
};

function formatScaledAmount(value: number): string {
  if (Number.isInteger(value)) return String(value);
  return String(Math.round(value * 10) / 10);
}

export function toIngredientLines(recipe: CandidateRecipe, servings: number): string[] {
  const multiplier = servings / recipe.baseServings;

  return recipe.ingredients.map((item) => {
    const scaled = formatScaledAmount(item.amount * multiplier);
    const optional = item.optional ? " (optional)" : "";
    return `${scaled} ${item.unit} ${item.name}${optional}`.trim();
  });
}

function pickSubstitutions(recipe: CandidateRecipe, inputTerms: string[]): string[] {
  const suggestions: string[] = [];

  for (const [ingredient, replacements] of Object.entries(recipe.substitutions)) {
    const missing = !overlapsIngredient(inputTerms, ingredient);
    if (missing) {
      suggestions.push(...replacements.slice(0, 1));
    }
  }

  return suggestions.slice(0, 3);
}

export function toRecommendation(
  recipe: CandidateRecipe,
  servings: number,
  whyThisWorks: string,
  substitutions: string[],
): RecipeRecommendation {
  return {
    recipeKey: recipe.recipeKey,
    title: recipe.title,
    shortDescription: recipe.shortDescription,
    summary: recipe.summary,
    cuisine: recipe.cuisine,
    cookTimeMinutes: recipe.cookTimeMinutes,
    servings,
    ingredients: toIngredientLines(recipe, servings),
    steps: recipe.steps,
    whyThisWorks,
    substitutions,
    imageUrl: recipe.imageUrl,
    sourceProvider: recipe.sourceProvider,
    fitScore: recipe.fitScore,
  };
}

function computeFitScore(inputTerms: string[], cuisine: string, recipe: CatalogRecipe): {
  fitScore: number;
  matchedIngredients: string[];
} {
  const ingredientNames = recipe.ingredients.map((ingredient) => ingredient.name);
  const matchedIngredients = ingredientNames.filter((name) => overlapsIngredient(inputTerms, name));

  const overlapScore = matchedIngredients.length / Math.max(ingredientNames.length, 1);
  const cuisineAlignment = getCuisineAlignment(cuisine, recipe.cuisine, {
    title: recipe.title,
    shortDescription: recipe.shortDescription,
    ingredientNames: recipe.ingredients.map((ingredient) => ingredient.name),
  });
  const cuisineAdjustment =
    cuisine === "Any"
      ? 0.08
      : cuisineAlignment === "aligned"
        ? 0.3
        : cuisineAlignment === "neutral"
          ? 0.06
          : -0.42;

  const inputTokenCount = inputTerms.flatMap((term) => tokenize(term)).length;
  const complexityAdjustment = inputTokenCount > 6 ? 0.05 : 0;

  const rawScore = overlapScore + cuisineAdjustment + complexityAdjustment;
  const fitScore = Math.max(0, Math.min(1, rawScore));

  return { fitScore, matchedIngredients };
}

export function getCatalogCandidates(inputTerms: string[], cuisine: string): CandidateRecipe[] {
  return RECIPE_CATALOG.map((recipe) => {
    const { fitScore, matchedIngredients } = computeFitScore(inputTerms, cuisine, recipe);

    return {
      recipeKey: recipe.recipeKey,
      title: recipe.title,
      shortDescription: recipe.shortDescription,
      summary: recipe.summary,
      cuisine: recipe.cuisine,
      cookTimeMinutes: recipe.cookTimeMinutes,
      baseServings: recipe.baseServings,
      ingredients: recipe.ingredients,
      steps: recipe.steps,
      substitutions: recipe.substitutions,
      sourceProvider: "catalog",
      imageUrl: recipe.imageUrl ?? null,
      fitScore,
      matchedIngredients,
    } satisfies CandidateRecipe;
  })
    .sort((a, b) => b.fitScore - a.fitScore)
    .slice(0, 8);
}

export function getCatalogRecipeByKey(recipeKey: string): CandidateRecipe | null {
  const recipe = RECIPE_CATALOG.find((item) => item.recipeKey === recipeKey);
  if (!recipe) return null;

  return {
    recipeKey: recipe.recipeKey,
    title: recipe.title,
    shortDescription: recipe.shortDescription,
    summary: recipe.summary,
    cuisine: recipe.cuisine,
    cookTimeMinutes: recipe.cookTimeMinutes,
    baseServings: recipe.baseServings,
    ingredients: recipe.ingredients,
    steps: recipe.steps,
    substitutions: recipe.substitutions,
    sourceProvider: "catalog",
    imageUrl: recipe.imageUrl ?? null,
    fitScore: 0.4,
    matchedIngredients: [],
  } satisfies CandidateRecipe;
}

export function getFallbackSubstitutions(recipe: CandidateRecipe, inputTerms: string[]): string[] {
  return pickSubstitutions(recipe, inputTerms);
}
