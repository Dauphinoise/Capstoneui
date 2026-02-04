/**
 * Converts a number to its ordinal form (1st, 2nd, 3rd, 4th, etc.)
 */
export function getOrdinal(num: number): string {
  const j = num % 10;
  const k = num % 100;
  
  // Special cases for 11th, 12th, 13th
  if (k >= 11 && k <= 13) {
    return num + 'th';
  }
  
  // Regular cases
  if (j === 1) return num + 'st';
  if (j === 2) return num + 'nd';
  if (j === 3) return num + 'rd';
  
  return num + 'th';
}
