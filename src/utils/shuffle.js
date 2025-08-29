export function shuffleNonTrivial(chars) {
  const original = chars.slice();
  if (original.length <= 1) return original;
  const isTrivial = (arr) =>
    arr.every((c, i) => c === original[i]) ||
    (arr[0] === original[0] && arr[1] === original[1]);
  let shuffled = [];
  let attempts = 0;
  do {
    shuffled = original.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    attempts++;
    if (!isTrivial(shuffled)) return shuffled;
  } while (attempts < 5);
  // Forzar swap si sigue siendo trivial
  const i = Math.floor(Math.random() * shuffled.length);
  let j = Math.floor(Math.random() * shuffled.length);
  while (j === i) j = Math.floor(Math.random() * shuffled.length);
  [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  return shuffled;
}
