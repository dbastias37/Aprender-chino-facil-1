import React from 'react';
import FloatingPanel from './FloatingPanel.jsx';

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

  // Racha de aciertos consecutivos (para disparar el bonus)
  const [streak, setStreak] = React.useState(0);

  // Bonus (comodín)
  const [bonusOpen, setBonusOpen] = React.useState(false);        // muestra el panel del bonus
  const [bonusAwarded, setBonusAwarded] = React.useState(false);  // ya ganado en esta sesión
  const [bonusLives, setBonusLives] = React.useState(0);          // 0 o 1

  // Fuente para el bonus: palabras resueltas en la sesión (multi-caracter)
  const sessionSolvedWordsRef = React.useRef(new Set());

  // Utilidades para bonus
  const toCharTokens = (hanzi, pinyin) => {
    const chars = Array.from((hanzi || '').replace(/\s+/g, ''));
    const pys = (pinyin || '').trim().split(/\s+/);
    return chars.map((c, i) => ({ char: c, pinyin: pys[i] || pys[pys.length-1] || '' }));
  };

  // Construir los 10 tokens del bonus (random) desde lo ya jugado
  const buildBonusTokens = React.useCallback(() => {
    // Preferimos palabras MULTICARÁCTER resueltas
    const solved = Array.from(sessionSolvedWordsRef.current);
    // fallback: agregar del pool de la página actual
    const extras = pairs.map(p => p.left.hanzi);

    const sourceWords = Array.from(new Set([...solved, ...extras])).filter(w => w && w.length >= 1);
    let tokens = [];
    for (const w of sourceWords) {
      const py = pairs.find(p => p.left.hanzi === w)?.left?.pinyin || '';
      tokens.push(...toCharTokens(w, py));
    }
    // barajar y limitar a 10
    for (let i=tokens.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [tokens[i],tokens[j]]=[tokens[j],tokens[i]]; }
    return tokens.slice(0, 10);
  }, [pairs]);

  // Objetivos válidos (3) que el alumno puede formar
  const buildBonusTargets = React.useCallback(() => {
    // Candidatos: palabras multi-caracter ya resueltas (o de la página actual)
    const solved = Array.from(sessionSolvedWordsRef.current).filter(w => w.length >= 2);
    let candidates = [...solved];
    if (candidates.length < 3) {
      candidates.push(...pairs.map(p => p.left.hanzi).filter(w => (w || '').replace(/\s+/g,'').length >= 2));
    }
    candidates = Array.from(new Set(candidates)).slice(0, 3);
    // Si aún hay menos de 3, rellena con las que haya (aunque sean 1 char)
    while (candidates.length < 3 && pairs[candidates.length]) {
      candidates.push(pairs[candidates.length].left.hanzi);
    }
    return candidates.slice(0, 3);
  }, [pairs]);

  // Estado del UI del bonus
  const [bonusTokens, setBonusTokens] = React.useState([]);
  const [bonusTargets, setBonusTargets] = React.useState([]); // array de hanzi válidos
  const [bonusBuild, setBonusBuild] = React.useState([]);     // indices elegidos del array bonusTokens

  React.useEffect(() => {
    if (bonusOpen) {
      setBonusTokens(buildBonusTokens());
      setBonusTargets(buildBonusTargets());
      setBonusBuild([]);
    }
  }, [bonusOpen, buildBonusTokens, buildBonusTargets]);

  const addBonusToken = (idx) => {
    setBonusBuild(prev => (prev.includes(idx) ? prev : [...prev, idx]));
  };
  const removeBonusToken = (idx) => {
    setBonusBuild(prev => prev.filter(i => i !== idx));
  };
  const currentBonusString = () => bonusTokens.filter((_,i)=>bonusBuild.includes(i)).map(t=>t.char).join('');
  const tryBonus = () => {
    const str = currentBonusString();
    const ok = bonusTargets.some(t => t.replace(/\s+/g,'') === str);
    if (ok) {
      setBonusLives(1);
      setBonusAwarded(true);
    }
    setBonusOpen(false); // cerrar bonus tras intentar (ganado o no)
  };

  // construir página
  React.useEffect(() => {
    if (totalPages <= 0) {
      onClose?.({ pagesCompleted: 0, totalPages: 0, hearts: 0, bonusLives: 0 });
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
      // ✅ acierto
      setSolvedKeys(prev => new Set([...prev, leftKey]));
      setStreak(prev => {
        const s = prev + 1;

        // Guarda la palabra/hanzi resuelta en la sesión (para alimentar el bonus)
        const solvedHanzi = pairs[leftSel]?.left?.hanzi || '';
        if (solvedHanzi) sessionSolvedWordsRef.current.add(solvedHanzi);

        // Disparo de bonus: exactamente al llegar a 5 seguidos y aún no otorgado
        if (s === 5 && !bonusAwarded) {
          setBonusOpen(true);
        }
        return s;
      });
    } else {
      // ❌ error → pierde 1 vida local y resetea racha
      setMiniLives(v => Math.max(0, (v || 0) - 1));
      setStreak(0);
    }
    // limpiar selección
    const t = setTimeout(() => { setLeftSel(-1); setRightSel(-1); }, 150);
    return () => clearTimeout(t);
  }, [leftSel, rightSel]); // eslint-disable-line react-hooks/exhaustive-deps

  // si se quedan sin corazones locales → cerrar sin premio
  React.useEffect(() => {
    if (miniLives === 0) {
      onClose?.({ pagesCompleted, totalPages, hearts: 0, bonusLives });
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
        onClose?.({ pagesCompleted: finished, totalPages, hearts, bonusLives });
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
          <button className="px-3 py-1 rounded-lg border" onClick={()=>onClose?.({ pagesCompleted, totalPages, hearts: 0, bonusLives })}>Salir</button>
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

        {/* BONUS: ordenar hanzi para formar una palabra/frase válida */}
        {bonusOpen && (
          <FloatingPanel
            open={true}
            title="Comodín por racha — Ordena los caracteres"
            onClose={() => setBonusOpen(false)}
            actions={[
              { label:'Probar', className:'px-4 py-2 rounded-xl bg-emerald-600 text-white', onClick: tryBonus }
            ]}
          >
            <div className="text-sm text-gray-700 mb-3">
              Elige caracteres en orden para formar <b>una</b> de estas palabras/frases (no hay pistas).
            </div>

            {/* Zona de construcción */}
            <div className="min-h-12 p-3 mb-3 rounded-xl bg-gray-50 border">
              <div className="flex flex-wrap gap-2">
                {bonusBuild.map((i) => (
                  <button key={'sel-'+i} onClick={() => removeBonusToken(i)}
                    className="px-3 py-1 rounded-lg bg-emerald-100">
                    {bonusTokens[i]?.char} <span className="text-[10px] text-gray-500">{bonusTokens[i]?.pinyin}</span>
                  </button>
                ))}
                {bonusBuild.length === 0 && (
                  <span className="text-xs text-gray-500">Toca caracteres para agregarlos aquí…</span>
                )}
              </div>
            </div>

            {/* Tokens disponibles (10) */}
            <div className="grid grid-cols-5 gap-2">
              {bonusTokens.map((t, i) => (
                <button key={'tok-'+i}
                  onClick={() => addBonusToken(i)}
                  className={'px-3 py-2 rounded-xl border bg-white text-center ' +
                             (bonusBuild.includes(i) ? 'opacity-50 pointer-events-none' : 'hover:bg-orange-50')}>
                  <div className="text-xl leading-none">{t.char}</div>
                  <div className="text-[10px] text-gray-500">{t.pinyin}</div>
                </button>
              ))}
            </div>
          </FloatingPanel>
        )}
      </div>
    </div>
  );
}
