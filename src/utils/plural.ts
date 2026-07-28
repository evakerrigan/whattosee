// Русское склонение существительного по числу.
// forms: [1 фильм, 2 фильма, 5 фильмов]
export const plural = (n: number, forms: [string, string, string]): string => {
  const abs = Math.abs(n) % 100;
  const n1 = abs % 10;
  if (abs > 10 && abs < 20) return forms[2];
  if (n1 > 1 && n1 < 5) return forms[1];
  if (n1 === 1) return forms[0];
  return forms[2];
};
