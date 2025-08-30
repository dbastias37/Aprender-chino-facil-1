
import React from 'react';

const SMOOTHING = 0.8; // 80% smooth

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

export default function RescueLivesGame({ levels, currentLevel, maxLives = 5, onClose }) {
  const pool = React.useMemo(() => buildRescuePool(levels, currentLevel), [levels, currentLevel]);
  const totalPages = Math.min(6, Math.floor(pool.length / 5));
  const [page, setPage] = React.useState(0);
  const [pagesCompleted, setPagesCompleted] = React.useState(0);

  // Sin pares suficientes → cerrar sin premio
  React.useEffect(() => {
    if (totalPages <= 0) {
      onClose?.({ pagesCompleted: 0, totalPages: 0, hearts: 0 });
    }
  }, [totalPages, onClose]);

  // Construcción de una página (5 pares)
  const [pairs, setPairs] = React.useState([]); // [{key, left:{...}, right:{...}} x5]
  const [rightShuffled, setRightShuffled] = React.useState([]);
  const leftRefs = React.useRef([]);
  const rightRefs = React.useRef([]);

  React.useEffect(() => {
    if (totalPages <= 0) return;
    const startIndex = page * 5;
    const pageItems = pool.slice(startIndex, startIndex + 5);
    const nextPairs = pageItems.map((it) => ({
      key: it.hanzi + '@' + it.es,
      left: { hanzi: it.hanzi, pinyin: it.pinyin },
      right: { es: it.es }
    }));
    setPairs(nextPairs);
    setRightShuffled(sample(nextPairs.map(p => ({ key: p.key, es: p.right.es })), 5));
    leftRefs.current = Array(5).fill(null);
    rightRefs.current = Array(5).fill(null);
    setLines([]);
    setSolved(new Set());
    setActive(null);
  }, [page, totalPages]); // eslint-disable-line

  // Dibujo
  const [active, setActive] = React.useState(null); // { key, start:{x,y}, smoothed:{x,y} }
  const [lines, setLines] = React.useState([]); // [{ fromKey, toKey, pathD }]
  const [solved, setSolved] = React.useState(new Set());

  const getCenter = (el) => {
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { x: r.left + r.width/2 + window.scrollX, y: r.top + r.height/2 + window.scrollY };
  };

  const startFromLeft = (idx) => (ev) => {
    const e = ev.touches ? ev.touches[0] : ev;
    if (solved.has(pairs[idx]?.key)) return;
    const el = leftRefs.current[idx];
    const c = getCenter(el);
    if (!c) return;
    const pt = { x: e.clientX, y: e.clientY };
    const sm = { x: c.x*SMOOTHING + pt.x*(1-SMOOTHING), y: c.y*SMOOTHING + pt.y*(1-SMOOTHING) };
    setActive({ key: pairs[idx].key, start: c, smoothed: sm });
  };

  const onMove = (ev) => {
    const e = ev.touches ? ev.touches[0] : ev;
    if (!active) return;
    const pt = { x: e.clientX, y: e.clientY };
    setActive(prev => ({
      ...prev,
      smoothed: {
        x: prev.smoothed.x * SMOOTHING + pt.x * (1-SMOOTHING),
        y: prev.smoothed.y * SMOOTHING + pt.y * (1-SMOOTHING)
      }
    }));
  };

  const onUp = (ev) => {
    const e = ev.changedTouches ? ev.changedTouches[0] : ev;
    if (!active) return;
    // Buscar card derecha más cercana
    let bestIdx = -1, bestDist = Infinity;
    rightRefs.current.forEach((el, idx) => {
      if (!el) return;
      const c = getCenter(el);
      const dx = (active.smoothed.x - c.x);
      const dy = (active.smoothed.y - c.y);
      const d2 = dx*dx + dy*dy;
      if (d2 < bestDist) { bestDist = d2; bestIdx = idx; }
    });
    const target = rightShuffled[bestIdx];
    const correct = target && (target.key === active.key);

    if (correct) {
      // Línea final entre centros
      const start = active.start;
      const end = getCenter(rightRefs.current[bestIdx]);
      const midX = (start.x + end.x)/2;
      const pathD = `M ${start.x},${start.y} C ${midX},${start.y} ${midX},${end.y} ${end.x},${end.y}`;
      setLines(prev => [...prev, { fromKey: active.key, toKey: target.key, pathD }]);
      setSolved(prev => new Set([...prev, active.key]));
    }
    setActive(null);
  };

  React.useEffect(() => {
    // ¿Resueltos los 5 pares?
    if (pairs.length === 5 && solved.size === 5) {
      setPagesCompleted(p => p + 1);
      if (page < totalPages - 1) {
        setTimeout(() => setPage(page + 1), 500);
      } else {
        // Finalizado
        const finished = (pagesCompleted + 1);
        const hearts = (finished === totalPages) ? 'full'
          : (finished >= 3 ? 2 : (finished === 1 ? 1 : 0));
        onClose?.({ pagesCompleted: finished, totalPages, hearts });
      }
    }
  }, [solved]); // eslint-disable-line react-hooks/exhaustive-deps

  if (totalPages <= 0) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center"
         onMouseMove={onMove} onMouseUp={onUp}
         onTouchMove={onMove} onTouchEnd={onUp}>
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 bg-white w-[min(960px,96vw)] max-h-[90vh] overflow-auto rounded-3xl shadow-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Rescatar vidas — Página {page+1} / {totalPages}</h3>
          <button className="px-3 py-1 rounded-lg border" onClick={()=>onClose?.({ pagesCompleted, totalPages, hearts: 0 })}>Salir</button>
        </div>
        <div className="grid grid-cols-2 gap-6 relative">
          {/* IZQUIERDA */}
          <div className="space-y-3">
            {pairs.map((p, i) => (
              <div key={p.key}
                   ref={el => leftRefs.current[i] = el}
                   onMouseDown={startFromLeft(i)}
                   onTouchStart={startFromLeft(i)}
                   className={'px-4 py-3 rounded-2xl border shadow-sm bg-white ' + (solved.has(p.key) ? 'opacity-60' : 'hover:bg-orange-50')}>
                <div className="text-3xl mb-1">{p.left.hanzi}</div>
                <div className="text-xs text-gray-500">{p.left.pinyin}</div>
              </div>
            ))}
          </div>

          {/* DERECHA */}
          <div className="space-y-3">
            {rightShuffled.map((r, i) => (
              <div key={r.key}
                   ref={el => rightRefs.current[i] = el}
                   className="px-4 py-3 rounded-2xl border shadow-sm bg-white">
                <div className="text-base">{r.es}</div>
              </div>
            ))}
          </div>

          {/* SVG de líneas */}
          <svg className="pointer-events-none absolute inset-0 w-full h-full">
            {lines.map((ln, idx) => (
              <path key={idx} d={ln.pathD} fill="none" stroke="rgba(16,185,129,0.9)" strokeWidth="4" />
            ))}
            {active ? (
              <path d={'M ' + active.start.x + ',' + active.start.y
                        + ' Q ' + ((active.start.x + active.smoothed.x)/2) + ',' + ((active.start.y + active.smoothed.y)/2)
                        + ' ' + active.smoothed.x + ',' + active.smoothed.y}
                    fill="none" stroke="rgba(251,146,60,0.9)" strokeWidth="3" />
            ) : null}
          </svg>
        </div>
      </div>
    </div>
  );
}
