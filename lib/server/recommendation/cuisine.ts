export type CuisineAlignment = "aligned" | "neutral" | "mismatch";

type CuisineSignals = {
  title?: string;
  shortDescription?: string;
  ingredientNames?: string[];
};

const CUISINE_ALIASES: Record<string, string> = {
  japanese: "asian",
  chinese: "asian",
  korean: "asian",
  thai: "asian",
  malaysian: "asian",
  vietnamese: "asian",
  singaporean: "asian",
  indonesian: "asian",
  filipino: "asian",
  western: "american",
  us: "american",
  usa: "american",
};

const CUISINE_FAMILIES: Record<string, Set<string>> = {
  asian: new Set(["asian"]),
  italian: new Set(["italian", "mediterranean"]),
  mediterranean: new Set(["mediterranean", "italian"]),
  mexican: new Set(["mexican"]),
  indian: new Set(["indian"]),
  american: new Set(["american"]),
};

const CUISINE_KEYWORDS: Record<string, string[]> = {
  asian: [
    "fried rice",
    "stir-fry",
    "stir fry",
    "soy sauce",
    "ginger",
    "sesame",
    "scallion",
    "spring onion",
    "wok",
  ],
  italian: ["pasta", "spaghetti", "penne", "tomato sauce", "olive oil", "basil", "oregano"],
  mediterranean: ["chickpea", "olive oil", "lemon", "cucumber", "herb"],
  mexican: ["tortilla", "bean", "cumin", "salsa", "skillet"],
  indian: ["masala", "turmeric", "cumin", "garam", "curry"],
  american: ["breakfast", "tray", "sheet pan", "roast", "bake"],
};

export function normalizeCuisineLabel(value: string): string {
  const normalized = value.trim().toLowerCase();
  if (!normalized) return "unknown";
  if (normalized === "any") return "any";
  return CUISINE_ALIASES[normalized] ?? normalized;
}

function isSameFamily(requested: string, recipe: string): boolean {
  const family = CUISINE_FAMILIES[requested];
  if (!family) {
    return requested === recipe;
  }
  return family.has(recipe);
}

function hasRequestedSignals(requestedCuisine: string, signals: CuisineSignals): boolean {
  const keywords = CUISINE_KEYWORDS[requestedCuisine] ?? [];
  if (keywords.length === 0) return false;

  const signalText = [
    signals.title ?? "",
    signals.shortDescription ?? "",
    ...(signals.ingredientNames ?? []),
  ]
    .join(" ")
    .toLowerCase();

  return keywords.some((keyword) => signalText.includes(keyword));
}

export function getCuisineAlignment(
  requestedCuisineInput: string,
  recipeCuisineInput: string,
  signals: CuisineSignals = {},
): CuisineAlignment {
  const requestedCuisine = normalizeCuisineLabel(requestedCuisineInput);
  const recipeCuisine = normalizeCuisineLabel(recipeCuisineInput);

  if (requestedCuisine === "any") {
    return "aligned";
  }

  if (recipeCuisine === requestedCuisine || isSameFamily(requestedCuisine, recipeCuisine)) {
    return "aligned";
  }

  if (recipeCuisine === "any" || recipeCuisine === "unknown") {
    return hasRequestedSignals(requestedCuisine, signals) ? "aligned" : "neutral";
  }

  return "mismatch";
}
