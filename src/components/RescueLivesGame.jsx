import React from 'react';

function uniqueBy(arr, keyFn) {
  const seen = new Set();
  const out = [];
  for (const it of arr) {
    const k = keyFn(it);
    if (!seen.has(k)) { seen.add(k); out.push(it); }
  }
  return out;
}

function buildRescuePool(levels, currentLevel) {
  const pool = [];
  for (const lvl of (levels || [])) {
    if ((lvl.id ?? 0) > currentLevel) break;
    for (const ex of (lvl.exercises || [])) {
      if (ex?.chinese && ex?.spanish) {
        pool.push({ hanzi: ex.chinese, pinyin: ex.pinyin || "", es: ex.spanish });
      }
    }
  }
  return uniqueBy(pool, x => (x.hanzi + '@' + x.es));
}

function sample(arr, k) {
  const a = Array.isArray(arr) ? [...arr] : [];
  for (let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]];}
  return a.slice(0,k);
}

export default function RescueLivesGame({ levels, currentLevel, onClose }) {
  const pool = React.useMemo(() => buildRescuePool(levels, currentLevel), [levels, currentLevel]);
  const totalPages = Math.min(6, Math.floor(pool.length / 5));

  const [page, setPage] = React.useState(0);
  const [pagesCompleted, setPagesCompleted] = React.useState(0);

  // Datos de la página (5 pares)
  const [pairs, setPairs] = React.useState([]);
  const [rightShuffled, setRightShuffled] = React.useState([]);

  // Selección (máx 1 por lado)
  const [leftSel, setLeftSel] = React.useState(-1);
  const [rightSel, setRightSel] = React.useState(-1);

  // Pares ya resueltos (guardamos por key)
  const [solvedKeys, setSolvedKeys] = React.useState(new Set());

  React.useEffect(() => {
    if (totalPages <= 0) {
      onClose?.({ pagesCompleted: 0, totalPages: 0, hearts: 0 });
      return;
    }
    const startIndex = page * 5;
    const items = pool.slice(startIndex, startIndex + 5);
    const nextPairs = items.map((it) => ({
      key: it.hanzi + '@' + it.es,
      left: { hanzi: it.hanzi, pinyin: it.pinyin },
      right: { es: it.es }
    }));
    setPairs(nextPairs);
    setRightShuffled(sample(nextPairs.map(p => ({ key: p.key, es: p.right.es })), 5));
    setLeftSel(-1);
    setRightSel(-1);
    setSolvedKeys(new Set());
  }, [page, totalPages]); // eslint-disable-line

  // Validación: solo cuando hay uno de cada lado
  React.useEffect(() => {
    if (leftSel < 0 || rightSel < 0) return;
    const leftKey = pairs[leftSel]?.key;
    const rightKey = rightShuffled[rightSel]?.key;

    if (!leftKey || !rightKey) {
      setLeftSel(-1); setRightSel(-1);
      return;
    }

    if (leftKey === rightKey) {
      // Correcto → fijar como resuelto
      setSolvedKeys(prev => new Set([...prev, leftKey]));
    }
    // En ambos casos limpiamos selección para el siguiente intento
    const t = setTimeout(() => { setLeftSel(-1); setRightSel(-1); }, 160);
    return () => clearTimeout(t);
  }, [leftSel, rightSel]); // eslint-disable-line react-hooks/exhaustive-deps

  // ¿Se completaron los 5 pares?
  React.useEffect(() => {
    if (pairs.length === 5 && solvedKeys.size === 5) {
      setPagesCompleted(p => p + 1);
      if (page < totalPages - 1) {
        setTimeout(() => setPage(page + 1), 500);
      } else {
        const finished = (pagesCompleted + 1);
        const hearts = (finished === totalPages) ? 'full'
          : (finished >= 3 ? 2 : (finished === 1 ? 1 : 0));
        onClose?.({ pagesCompleted: finished, totalPages, hearts });
      }
    }
  }, [solvedKeys]); // eslint-disable-line react-hooks/exhaustive-deps

  if (totalPages <= 0) return null;

  // Estilo de card uniforme (mismo contenedor, ancho y alto)
  const cardCls = "h-20 md:h-24 w-full flex flex-col items-center justify-center " +
                  "rounded-2xl border shadow-sm bg-white px-4 text-center";
  const cardSelectable = (selected, solved) =>
    cardCls + " " +
    (solved ? "opacity-60 pointer-events-none " : "hover:bg-orange-50 ") +
    (selected ? "ring-2 ring-emerald-500 border-emerald-500 " : "");

  const isRightSolved = (rk) => solvedKeys.has(rk);
  const isLeftSolved = (lk) => solvedKeys.has(lk);

  const handleLeftClick = (idx) => {
    const key = pairs[idx]?.key;
    if (!key || isLeftSolved(key)) return;
    // Si ya hay una izquierda seleccionada, la reemplazamos (no permitimos 2 del mismo lado)
    setLeftSel(idx);
  };

  const handleRightClick = (idx) => {
    const key = rightShuffled[idx]?.key;
    if (!key || isRightSolved(key)) return;
    setRightSel(idx);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 bg-white w-[min(960px,96vw)] max-h-[90vh] overflow-auto rounded-3xl shadow-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Rescatar vidas — Página {page+1} / {totalPages}</h3>
          <button className="px-3 py-1 rounded-lg border" onClick={()=>onClose?.({ pagesCompleted, totalPages, hearts: 0 })}>Salir</button>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* IZQUIERDA — Hanzi + Pinyin */}
          <div className="space-y-3">
            {pairs.map((p, i) => {
              const selected = (leftSel === i);
              const solved = isLeftSolved(p.key);
              return (
                <button
                  key={p.key}
                  onClick={() => handleLeftClick(i)}
                  className={cardSelectable(selected, solved)}
                >
                  <div className="text-3xl leading-none mb-1">{p.left.hanzi}</div>
                  <div className="text-xs text-gray-500">{p.left.pinyin}</div>
                </button>
              );
            })}
          </div>

          {/* DERECHA — Español */}
          <div className="space-y-3">
            {rightShuffled.map((r, i) => {
              const selected = (rightSel === i);
              const solved = isRightSolved(r.key);
              return (
                <button
                  key={r.key}
                  onClick={() => handleRightClick(i)}
                  className={cardSelectable(selected, solved)}
                >
                  <div className="text-base">{r.es}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

