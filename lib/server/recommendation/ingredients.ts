export function normalizeIngredient(value: string): string {
  return value.trim().toLowerCase();
}

export function tokenize(value: string): string[] {
  return normalizeIngredient(value)
    .split(/\s+/)
    .map((part) => part.replace(/[^a-z]/g, ""))
    .filter(Boolean);
}

export function overlapsIngredient(inputTerms: string[], candidate: string): boolean {
  const normalizedCandidate = normalizeIngredient(candidate);
  const candidateTokens = tokenize(candidate);

  return inputTerms.some((term) => {
    if (normalizedCandidate.includes(term) || term.includes(normalizedCandidate)) {
      return true;
    }

    return candidateTokens.some(
      (token) => token.length > 2 && (term.includes(token) || token.includes(term)),
    );
  });
}
