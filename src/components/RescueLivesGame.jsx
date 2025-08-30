import React from 'react';
import FloatingPanel from './FloatingPanel.jsx';

// ============ utils básicas ============
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
const toCharTokens = (hanzi, pinyin) => {
  const chars = Array.from((hanzi || '').replace(/\s+/g, ''));
  const pys = (pinyin || '').trim().split(/\s+/);
  return chars.map((c, i) => ({ char: c, pinyin: pys[i] || pys[pys.length-1] || '' }));
};

const normalize = (s) => (s || '').replace(/\s+/g, '').trim();
const eqHanzi = (a, b) => normalize(a) === normalize(b);

// ============ barras de corazones ============
const PANEL_MAX_LIVES = 6; // corazones locales del minijuego (panel)
const HeartsBar = ({ lives, max }) => (
  <div className="flex gap-1 justify-center items-center mb-2">
    {Array.from({ length: max }).map((_, i) => (
      <span key={i} className="text-xl select-none">{i < lives ? '❤️' : '🤍'}</span>
    ))}
  </div>
);
const BonusHeartsBar = ({ count }) => (
  <div className="flex gap-1 justify-center items-center mb-2">
    <span className="text-xs text-emerald-700 mr-1">Bonus:</span>
    {Array.from({ length: Math.min(count, 6) }).map((_, i) => (
      <span key={i} className="text-xl">💚</span>
    ))}
    {count > 6 && <span className="text-xs text-emerald-700">+{count - 6}</span>}
  </div>
);

// ============ componente principal ============
export default function RescueLivesGame({ levels, currentLevel, onClose }) {
  // pool según progreso (solo ≤ nivel actual)
  const pool = React.useMemo(() => buildRescuePool(levels, currentLevel), [levels, currentLevel]);
  const totalPages = Math.min(6, Math.floor(pool.length / 5));
  const [showIntro, setShowIntro] = React.useState(true);

  // estado minijuego (pares)
  const [page, setPage] = React.useState(0);
  const [pagesCompleted, setPagesCompleted] = React.useState(0);
  const [pairs, setPairs] = React.useState([]);
  const [rightShuffled, setRightShuffled] = React.useState([]);
  const [leftSel, setLeftSel] = React.useState(-1);
  const [rightSel, setRightSel] = React.useState(-1);
  const [solvedKeys, setSolvedKeys] = React.useState(new Set());
  const [miniLives, setMiniLives] = React.useState(PANEL_MAX_LIVES);
  const [streak, setStreak] = React.useState(0);

  // palabras resueltas para nutrir el bonus
  const sessionSolvedWordsRef = React.useRef(new Set());

  // ===== BONUS (comodín acumulable) =====
  const [bonusOpen, setBonusOpen] = React.useState(false);          // editor del bonus
  const [bonusTokens, setBonusTokens] = React.useState([]);         // 10 tokens (char+pinyin)
  const [bonusTargets, setBonusTargets] = React.useState([]);       // hasta 3 soluciones válidas (hanzi)
  const [bonusSolvedSet, setBonusSolvedSet] = React.useState(new Set()); // objetivos ya logrados
  const [bonusBuild, setBonusBuild] = React.useState([]);           // índices elegidos del array tokens
  const [bonusCongratsOpen, setBonusCongratsOpen] = React.useState(false); // panel de cierre del bonus
  const [bonusLivesCount, setBonusLivesCount] = React.useState(0);  // 💚 acumulados durante EL JUEGO
  const [bonusMsg, setBonusMsg] = React.useState(null);     // texto de feedback ✅/❌
  const [bonusTrying, setBonusTrying] = React.useState(false); // evita doble click

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
    setLeftSel(-1); setRightSel(-1); setSolvedKeys(new Set());
  }, [page, totalPages]); // eslint-disable-line

  // validar selección (1 por lado)
  React.useEffect(() => {
    if (leftSel < 0 || rightSel < 0) return;
    const leftKey = pairs[leftSel]?.key;
    const rightKey = rightShuffled[rightSel]?.key;
    if (!leftKey || !rightKey) { setLeftSel(-1); setRightSel(-1); return; }

    if (leftKey === rightKey) {
      // acierto
      setSolvedKeys(prev => new Set([...prev, leftKey]));
      const solvedHanzi = pairs[leftSel]?.left?.hanzi || '';
      if (solvedHanzi) sessionSolvedWordsRef.current.add(solvedHanzi);
      setStreak(s => {
        const next = s + 1;
        // racha 5 ⇒ abrir bonus si no está abierto
        if (next >= 5 && !bonusOpen) {
          openBonus();
        }
        return next;
      });
    } else {
      // error: vida local -1 y racha a 0
      setMiniLives(v => Math.max(0, (v || 0) - 1));
      setStreak(0);
    }
    const t = setTimeout(() => { setLeftSel(-1); setRightSel(-1); }, 150);
    return () => clearTimeout(t);
  }, [leftSel, rightSel]); // eslint-disable-line react-hooks/exhaustive-deps

  // sin corazones locales → cerrar sin premio
  React.useEffect(() => {
    if (miniLives === 0) {
      onClose?.({ pagesCompleted, totalPages, hearts: 0, bonusLives: bonusLivesCount });
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
        const hearts = (finished === totalPages) ? 'full'
          : (finished >= 3 ? 2 : (finished === 1 ? 1 : 0));
        onClose?.({ pagesCompleted: finished, totalPages, hearts, bonusLives: bonusLivesCount });
      }
    }
  }, [solvedKeys]); // eslint-disable-line react-hooks/exhaustive-deps

  // ====== BONUS helpers ======
  const buildBonusTokens = React.useCallback(() => {
    const solved = Array.from(sessionSolvedWordsRef.current);
    const extras = pairs.map(p => p.left.hanzi);
    const sourceWords = Array.from(new Set([...solved, ...extras])).filter(w => w);
    let tokens = [];
    for (const w of sourceWords) {
      const py = pairs.find(p => p.left.hanzi === w)?.left?.pinyin || '';
      tokens.push(...toCharTokens(w, py));
    }
    for (let i=tokens.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [tokens[i],tokens[j]]=[tokens[j],tokens[i]]; }
    return tokens.slice(0, 10);
  }, [pairs]);

  const buildBonusTargets = React.useCallback(() => {
    const solved = Array.from(sessionSolvedWordsRef.current).filter(w => (w||'').replace(/\s+/g,'').length >= 2);
    let candidates = [...solved];
    if (candidates.length < 3) {
      candidates.push(...pairs.map(p => p.left.hanzi).filter(w => (w||'').replace(/\s+/g,'').length >= 2));
    }
    candidates = Array.from(new Set(candidates)).slice(0, 3);
    while (candidates.length < 3 && pairs[candidates.length]) {
      candidates.push(pairs[candidates.length].left.hanzi);
    }
    return candidates.slice(0, 3);
  }, [pairs]);

  const openBonus = () => {
    setBonusTokens(buildBonusTokens());
    setBonusTargets(buildBonusTargets());
    setBonusSolvedSet(new Set());
    setBonusBuild([]);
     setBonusMsg(null);
     setBonusTrying(false);
    setBonusOpen(true);
  };

  const addBonusToken = (idx) => {
    setBonusBuild(prev => (prev.includes(idx) ? prev : [...prev, idx]));
  };
  const removeBonusToken = (idx) => {
    setBonusBuild(prev => prev.filter(i => i !== idx));
  };
  const currentBonusString = () => bonusTokens.filter((_,i)=>bonusBuild.includes(i)).map(t=>t.char).join('');

  const tryBonus = () => {
    if (bonusTrying) return;
    const str = normalize(currentBonusString());
    if (!str || bonusBuild.length < 2) {
      setBonusMsg('Selecciona al menos 2 caracteres.');
      return;
    }
    setBonusTrying(true);

    // Palabras aún no resueltas
    const remaining = bonusTargets.filter(t => !bonusSolvedSet.has(t));
    // ¿Coincide con alguna?
    const solved = remaining.find(t => eqHanzi(t, str));

    if (solved) {
      // ✅ Acierto: +1 💚 y marcar esta palabra como resuelta
      setBonusSolvedSet(prev => new Set([...prev, solved]));
      setBonusLivesCount(n => n + 1);
      setBonusMsg('✅ ¡Correcto! +1 💚');
      setBonusBuild([]); // limpia el armado para permitir otra palabra

      // Si resolvió todas las posibles, cerramos el editor y mostramos “bonus completado”
      setTimeout(() => {
        if (bonusSolvedSet.size + 1 >= bonusTargets.length) {
          setBonusOpen(false);
          setBonusCongratsOpen(true);
        }
        setBonusTrying(false);
      }, 300);
    } else {
      // ❌ Error: no se resta ❤️ local (según requisito), solo feedback y limpiar selección
      setBonusMsg('❌ No coincide. Prueba otra combinación.');
      setBonusBuild([]);
      setTimeout(() => setBonusTrying(false), 250);
    }
  };

  const endBonusNow = () => {
    setBonusOpen(false);
    setBonusCongratsOpen(true);
  };

  if (totalPages <= 0) return null;

  // estilo card uniforme
  const cardBase = "h-20 md:h-24 w-full flex flex-col items-center justify-center rounded-2xl border shadow-sm bg-white px-4 text-center";
  const cardState = (selected, disabled) =>
    cardBase + " " + (disabled ? "opacity-60 pointer-events-none " : "hover:bg-orange-50 ") +
    (selected ? "ring-2 ring-emerald-500 border-emerald-500 " : "");

  const isRightSolved = (rk) => solvedKeys.has(rk);
  const isLeftSolved = (lk) => solvedKeys.has(lk);

  const handleLeftClick = (idx) => {
    const key = pairs[idx]?.key;
    if (!key || isLeftSolved(key)) return;
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
      <div className="relative z-10 bg-white w:[min(960px,96vw)] w-[min(960px,96vw)] max-h-[90vh] overflow-auto rounded-3xl shadow-2xl p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Rescatar vidas — Página {page+1} / {totalPages}</h3>
          <button className="px-3 py-1 rounded-lg border" onClick={()=>onClose?.({ pagesCompleted, totalPages, hearts: 0, bonusLives: bonusLivesCount })}>Salir</button>
        </div>

        {/* barras de corazones */}
        <HeartsBar lives={miniLives} max={PANEL_MAX_LIVES} />
        <BonusHeartsBar count={bonusLivesCount} />

        {/* Intro antes de empezar */}
        {showIntro ? (
          <div className="mt-2 p-5 rounded-2xl border bg-emerald-50 text-center">
            <p className="text-sm text-gray-700">
              Puedes recuperar vidas haciendo pares y ganar corazones, o puedes solamente
              apretar <b>F5</b> y comenzar desde cero.
            </p>
            <button onClick={() => setShowIntro(false)} className="mt-4 px-5 py-2 rounded-xl bg-emerald-600 text-white">
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
                  <button key={p.key} onClick={() => handleLeftClick(i)} className={cardState(selected, disabled)}>
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
                  <button key={r.key} onClick={() => handleRightClick(i)} className={cardState(selected, disabled)}>
                    <div className="text-base">{r.es}</div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* BONUS editor (acumulable) */}
        {bonusOpen && (
          <FloatingPanel
            open={true}
            title="Comodín por racha — Ordena caracteres (puedes ganar varios 💚)"
            onClose={endBonusNow}
            actions={[
              {
                label: bonusTrying ? 'Probando...' : 'Probar',
                className: 'px-4 py-2 rounded-xl bg-emerald-600 text-white disabled:opacity-60',
                onClick: tryBonus,
                disabled: bonusTrying || bonusBuild.length < 2
              },
              { label: 'Terminar', className: 'px-4 py-2 rounded-xl border', onClick: endBonusNow }
            ]}
          >
            <div className="text-sm text-gray-700 mb-3">
              Forma cualquiera de las <b>{bonusTargets.length}</b> palabras/frases válidas. Cada acierto te da <b>+1 💚 verde</b>.
            </div>

            {/* Construcción */}
            <div className="min-h-12 p-3 mb-3 rounded-xl bg-gray-50 border">
              <div className="flex flex-wrap gap-2">
                {bonusBuild.map((i) => (
                  <button key={'sel-'+i} onClick={() => removeBonusToken(i)} className="px-3 py-1 rounded-lg bg-emerald-100">
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

            {/* progreso de objetivos resueltos */}
            <div className="mt-3 text-xs">
              <span className="text-gray-600">Resueltas: {bonusSolvedSet.size} / {bonusTargets.length} · 💚 ganados: {bonusLivesCount}</span>
              {bonusMsg && <div className="mt-1">{bonusMsg}</div>}
            </div>
          </FloatingPanel>
        )}

        {/* Panel de cierre del bonus */}
        <FloatingPanel
          open={bonusCongratsOpen}
          title="¡Bonus completado!"
          onClose={() => setBonusCongratsOpen(false)}
          actions={[{ label:'Seguir', className:'px-4 py-2 rounded-xl bg-emerald-600 text-white', onClick: () => setBonusCongratsOpen(false) }]}
        >
          <div className="text-sm text-gray-700">
            ¡Ganaste <b>{bonusLivesCount}</b> {bonusLivesCount===1?'corazón':'corazones'} <b>bonus</b> (💚)!
            Rescata las vidas que puedas y sigue jugando.
          </div>
        </FloatingPanel>
      </div>
    </div>
  );
}
