import React from 'react';
export default function LevelCompleteModal({ open, onContinue, autoAdvanceMs=3000 }) {
  React.useEffect(() => {
    if (!open) return;
    const t = setTimeout(onContinue, autoAdvanceMs);
    return () => clearTimeout(t);
  }, [open, onContinue, autoAdvanceMs]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/40 grid place-items-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md text-center">
        <h3 className="text-2xl font-bold text-green-700 mb-4">¡Correcto!</h3>
        <button onClick={onContinue} className="px-5 py-2 rounded-lg bg-red-500 text-white">Seguir</button>
      </div>
    </div>
  );
}
