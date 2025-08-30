import React from 'react';

// =================== utils ===================
function uniqueBy(arr, keyFn) {
  const seen = new Set(); const out = [];
  for (const it of arr) { const k = keyFn(it); if (!seen.has(k)) { seen.add(k); out.push(it); } }
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

// =================== UI helpers ===================
const HeartsBar = ({ lives, max }) => (
  <div className="flex gap-1 justify-center items-center mb-3">
    {Array.from({ length: max }).map((_, i) => (
      <span key={i} className="text-xl select-none">{i < lives ? '❤️' : '🤍'}</span>
    ))}
  </div>
);

// =================== componente ===================
const PANEL_MAX_LIVES = 6; // corazones locales del minijuego

export default function RescueLivesGame({ levels, currentLevel, onClose }) {
  // pool según progreso (solo niveles <= actual)
  const pool = React.useMemo(() => buildRescuePool(levels, currentLevel), [levels, currentLevel]);
  const totalPages = Math.min(6, Math.floor(pool.length / 5));

  // estado general
  const [page, setPage] = React.useState(0);
  const [pagesCompleted, setPagesCompleted] = React.useState(0);

  // estado por página
  const [pairs, setPairs] = React.useState([]);           // [{key,left:{hanzi,pinyin}, right:{es}}]
  const [rightShuffled, setRightShuffled] = React.useState([]);
  const [leftSel, setLeftSel] = React.useState(-1);
  const [rightSel, setRightSel] = React.useState(-1);
  const [solvedKeys, setSolvedKeys] = React.useState(new Set());

  // corazones locales (independientes de los globales)
  const [miniLives, setMiniLives] = React.useState(PANEL_MAX_LIVES);

  // intro antes de empezar
  const [showIntro, setShowIntro] = React.useState(true);

  // construir página
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
    // reset selección y resueltos
    setLeftSel(-1); setRightSel(-1); setSolvedKeys(new Set());
  }, [page, totalPages]); // eslint-disable-line

  // validar cuando hay 1 selección por lado
  React.useEffect(() => {
    if (leftSel < 0 || rightSel < 0) return;
    const leftKey = pairs[leftSel]?.key;
    const rightKey = rightShuffled[rightSel]?.key;
    if (!leftKey || !rightKey) {
      setLeftSel(-1); setRightSel(-1);
      return;
    }

    if (leftKey === rightKey) {
      // acierto
      setSolvedKeys(prev => new Set([...prev, leftKey]));
    } else {
      // error: se comporta como las vidas globales → -1 corazón local
      setMiniLives(v => {
        const next = Math.max(0, (v || 0) - 1);
        return next;
      });
    }
    // limpiar selección
    const t = setTimeout(() => { setLeftSel(-1); setRightSel(-1); }, 150);
    return () => clearTimeout(t);
  }, [leftSel, rightSel]); // eslint-disable-line react-hooks/exhaustive-deps

  // si se quedan sin corazones locales → cerrar sin premio
  React.useEffect(() => {
    if (miniLives === 0) {
      onClose?.({ pagesCompleted, totalPages, hearts: 0 });
    }
  }, [miniLives]); // eslint-disable-line react-hooks/exhaustive-deps

  // página completa (5 pares)
  React.useEffect(() => {
    if (pairs.length === 5 && solvedKeys.size === 5) {
      setPagesCompleted(p => p + 1);
      if (page < totalPages - 1) {
        setTimeout(() => setPage(page + 1), 450);
      } else {
        const finished = (pagesCompleted + 1);
        // premio final (esto afecta a las vidas GLOBALES afuera del minijuego)
        const hearts = (finished === totalPages) ? 'full'
          : (finished >= 3 ? 2 : (finished === 1 ? 1 : 0));
        onClose?.({ pagesCompleted: finished, totalPages, hearts });
      }
    }
  }, [solvedKeys]); // eslint-disable-line react-hooks/exhaustive-deps

  if (totalPages <= 0) return null;

  // estilos comunes para que TODAS las cards tengan el mismo contenedor
  const cardBase = "h-20 md:h-24 w-full flex flex-col items-center justify-center " +
                   "rounded-2xl border shadow-sm bg-white px-4 text-center";
  const cardState = (selected, disabled) =>
    cardBase + " " + (disabled ? "opacity-60 pointer-events-none " : "hover:bg-orange-50 ") +
    (selected ? "ring-2 ring-emerald-500 border-emerald-500 " : "");

  const isRightSolved = (rk) => solvedKeys.has(rk);
  const isLeftSolved = (lk) => solvedKeys.has(lk);

  const handleLeftClick = (idx) => {
    const key = pairs[idx]?.key;
    if (!key || isLeftSolved(key)) return;
    setLeftSel(idx);                 // no se permite 2 del mismo lado
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
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Rescatar vidas — Página {page+1} / {totalPages}</h3>
          <button className="px-3 py-1 rounded-lg border" onClick={()=>onClose?.({ pagesCompleted, totalPages, hearts: 0 })}>Salir</button>
        </div>

        {/* corazones locales (6) arriba del panel */}
        <HeartsBar lives={miniLives} max={PANEL_MAX_LIVES} />

        {/* Intro antes de empezar */}
        {showIntro ? (
          <div className="mt-2 p-5 rounded-2xl border bg-emerald-50 text-center">
            <p className="text-sm text-gray-700">
              puedes recuperar vidas haciendo pares y ganar corazones o puedes solamente
              apretar <b>F5</b> y comenzar desde cero.
            </p>
            <button
              onClick={() => setShowIntro(false)}
              className="mt-4 px-5 py-2 rounded-xl bg-emerald-600 text-white"
            >
              Adelante
            </button>
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-2 gap-6">
            {/* IZQUIERDA — Hanzi + Pinyin */}
            <div className="space-y-3">
              {pairs.map((p, i) => {
                const selected = (leftSel === i);
                const disabled = isLeftSolved(p.key);
                return (
                  <button
                    key={p.key}
                    onClick={() => handleLeftClick(i)}
                    className={cardState(selected, disabled)}
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
                const disabled = isRightSolved(r.key);
                return (
                  <button
                    key={r.key}
                    onClick={() => handleRightClick(i)}
                    className={cardState(selected, disabled)}
                  >
                    <div className="text-base">{r.es}</div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
