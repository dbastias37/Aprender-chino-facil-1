// Fisher–Yates + anti lineal
export function shuffleNonTrivial(arr) {
  let out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  // rebaraje si quedó igual o empieza lineal (primeros 2 elementos iguales al original)
  const same = out.every((v, i) => v === arr[i]);
  const linearStart = arr.length >= 2 && out[0] === arr[0] && out[1] === arr[1];
  if (same || linearStart) {
    [out[0], out[1]] = [out[1], out[0]];
  }
  return out;
}
