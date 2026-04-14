export const CUISINES = [
  "Any",
  "Italian",
  "Mexican",
  "Indian",
  "Asian",
  "Mediterranean",
  "American",
] as const;

export type Cuisine = (typeof CUISINES)[number];

export const CUISINE_SET = new Set<string>(CUISINES);
