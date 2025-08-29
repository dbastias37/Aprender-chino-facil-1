import React from 'react';
export default function ExamSidebar({ correct, total, threshold = 0.8 }) {
  const pct = total ? Math.round((correct/total)*100) : 0;
  const passAt = Math.round(threshold*100);
  return (
    <div className="sticky top-24 w-16 h-72 rounded-2xl bg-red-50 border border-red-200 flex flex-col items-center justify-between p-2">
      <div className="text-xs font-semibold text-red-700">{pct}%</div>
      <div className="relative h-full w-4 bg-white rounded-full border border-red-200 overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 bg-red-400" style={{height: `${pct}%`}} />
        <div className="absolute bottom-[calc(0%+${passAt}%)] left-0 right-0 h-0.5 bg-green-600 opacity-70" />
      </div>
      <div className="text-[11px] text-green-700 font-bold">太棒了！</div>
    </div>
  );
}
