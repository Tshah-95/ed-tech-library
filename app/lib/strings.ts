import { distance } from "fastest-levenshtein";

// This checks to see if two strings are similar by comparing their Levenshtein distance.
// If the strings are less than 3 characters long, they must be identical.
// If the strings are 3 characters or longer, they must have a distance of less than 2.
export const areSimilar = (aCased: string, bCased: string) => {
  const a = aCased.toLowerCase();
  const b = bCased.toLowerCase();
  const bLen = b.length;

  for (let i = 0; i < a.length - (bLen - 1); i++) {
    const dist = distance(a.slice(i, i + bLen), b);
    if ((bLen < 3 && dist === 0) || (bLen >= 3 && dist < 2)) return true;
  }
  return false;
};
