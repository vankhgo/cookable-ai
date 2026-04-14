const LEADING_FILLER_PATTERN =
  /^(?:and|with|i\s+still\s+have|i\s+have|i(?:'|)ve\s+got|i\s+got|only|leftover|some)\s+/i;
const TRAILING_FILLER_PATTERN = /\s+(?:left|remaining)\s*$/i;
const SEPARATOR_PATTERN = /[\n\r;|/]+/g;
const CONJUNCTION_PATTERN = /\s+(?:and|with)\s+/g;
const NON_TEXT_PATTERN = /[^a-z0-9\s,-]/gi;

const WORD_STOPWORDS = new Set([
  "i",
  "have",
  "still",
  "only",
  "leftover",
  "some",
  "left",
  "and",
  "with",
  "got",
  "just",
  "my",
  "the",
  "a",
  "an",
]);

const COMPOUND_THREE_WORDS = new Set(["red bell pepper"]);
const COMPOUND_TWO_WORDS = new Set([
  "soy sauce",
  "fish sauce",
  "olive oil",
  "sesame oil",
  "green onion",
  "spring onion",
  "bell pepper",
  "coconut milk",
  "rice vinegar",
]);

function dedupePreserveOrder(values: string[]): string[] {
  const seen = new Set<string>();
  const ordered: string[] = [];

  values.forEach((value) => {
    if (!value || seen.has(value)) return;
    seen.add(value);
    ordered.push(value);
  });

  return ordered;
}

function cleanSegment(segment: string): string {
  return segment
    .replace(NON_TEXT_PATTERN, " ")
    .replace(LEADING_FILLER_PATTERN, "")
    .replace(TRAILING_FILLER_PATTERN, "")
    .replace(/\s+/g, " ")
    .replace(/^\d+\s+/, "")
    .trim();
}

function mergeCompoundIngredients(words: string[]): string[] {
  const merged: string[] = [];

  for (let index = 0; index < words.length; ) {
    const threeWord = words.slice(index, index + 3).join(" ");
    if (COMPOUND_THREE_WORDS.has(threeWord)) {
      merged.push(threeWord);
      index += 3;
      continue;
    }

    const twoWord = words.slice(index, index + 2).join(" ");
    if (COMPOUND_TWO_WORDS.has(twoWord)) {
      merged.push(twoWord);
      index += 2;
      continue;
    }

    merged.push(words[index]);
    index += 1;
  }

  return merged;
}

function parseFromWhitespace(raw: string): string[] {
  const words = raw
    .toLowerCase()
    .replace(/[’]/g, "'")
    .replace(NON_TEXT_PATTERN, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .map((value) => value.trim())
    .filter(Boolean)
    .filter((value) => !WORD_STOPWORDS.has(value))
    .filter((value) => /[a-z]/.test(value));

  return mergeCompoundIngredients(words);
}

export function parseIngredientCandidates(raw: string): string[] {
  const normalized = raw
    .toLowerCase()
    .replace(/[’]/g, "'")
    .replace(SEPARATOR_PATTERN, ",")
    .replace(CONJUNCTION_PATTERN, ",")
    .replace(/\s*,\s*/g, ",")
    .replace(/,+/g, ",")
    .trim();

  const splitCandidates = normalized
    .split(",")
    .map((segment) => cleanSegment(segment))
    .filter((segment) => Boolean(segment))
    .filter((segment) => /[a-z]/.test(segment));

  const base = dedupePreserveOrder(splitCandidates);
  if (base.length >= 2) {
    return base;
  }

  const fallback = dedupePreserveOrder(parseFromWhitespace(normalized));
  return fallback;
}
