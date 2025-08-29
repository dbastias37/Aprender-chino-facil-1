import React from 'react';
export default function ExamResultModal({ open, passed, errors, onRetry, onSelectLevel, onContinue }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/40 grid place-items-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-xl w-[90%]">
        <h3 className={`text-2xl font-bold mb-2 ${passed ? 'text-green-700' : 'text-red-700'}`}>
          {passed ? '¡Examen aprobado!' : 'Debes esforzarte más'}
        </h3>
        {passed ? (
          <p className="mb-4 text-gray-700">¡Excelente! Puedes seguir con el curso.</p>
        ) : (
          <p className="mb-4 text-gray-700">Practica estas palabras y vuelve a intentarlo.</p>
        )}
        {errors?.length ? (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4 max-h-56 overflow-auto">
            <ul className="list-disc list-inside text-sm text-red-800">
              {errors.map((e,i)=>(
                <li key={i}>Esperado: <b>{e.correct} ({e.pinyin})</b> – Tu respuesta: <span>{e.user}</span></li>
              ))}
            </ul>
          </div>
        ) : null}
        <div className="flex flex-wrap gap-3">
          <button onClick={onRetry} className="px-4 py-2 rounded-lg border border-gray-300">Hacer examen otra vez</button>
          <button onClick={onSelectLevel} className="px-4 py-2 rounded-lg border border-gray-300">Seleccionar nivel</button>
          {passed ? (
            <button onClick={onContinue} className="px-4 py-2 rounded-lg bg-red-500 text-white">Seguir con el curso</button>
          ) : (
            <>
              <button onClick={onSelectLevel} className="px-4 py-2 rounded-lg bg-gray-100">Ir al menú inicial</button>
              <button onClick={onRetry} className="px-4 py-2 rounded-lg bg-red-500 text-white">Volver a hacer el examen</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
