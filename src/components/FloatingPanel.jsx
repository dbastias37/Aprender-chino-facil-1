import React from 'react';

export default function FloatingPanel({ open, title, children, onClose, actions = [] }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative z-10 w-[min(520px,92vw)] bg-white rounded-2xl shadow-xl p-6">
        {title ? <h3 className="text-xl font-semibold mb-3">{title}</h3> : null}
        <div className="mb-5">{children}</div>
        <div className="flex flex-wrap gap-3 justify-end">
          {actions.map((a, i) => (
            <button
              key={i}
              onClick={a.onClick}
              className={a.className || 'px-4 py-2 rounded-xl border'}
            >
              {a.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

