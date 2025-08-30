import React from 'react';

const Ticker = () => {
  const items = [
    { es: "\uD83D\uDCD6 Recuerda consultar el diccionario, ¡es gratis!", zh: "\uD83D\uDCD6 \u8BB0\u5F97\u67E5\u770B\u8BCD\u5178\uFF0C\u514D\u8D39\uFF01" },
    { es: "\uD83E\uDDE0 Recuerda estudiar a diario y memorizar los caracteres", zh: "\uD83E\uDDE0 \u8BB0\u5F97\u6BCF\u5929\u5B66\u4E60\u5E76\u8BB0\u5FC6\u6C49\u5B57" },
    { es: "\uD83D\uDCAA ¡Vamos! ¡Tú puedes!", zh: "\uD83D\uDCAA \u52A0\u6CB9\uFF01\u4F60\u53EF\u4EE5\u7684\uFF01" },
    { es: "\uD83E\uDD1D ¡Juntos aprenderemos chino!", zh: "\uD83E\uDD1D \u6211\u4EEC\u4E00\u8D77\u5B66\u4E2D\u6587" },
    { es: "\uD83D\uDCE3 ¡Comparte esta página con tus amigos!", zh: "\uD83D\uDCE3 \u8BB0\u5F97\u628A\u8FD9\u4E2A\u9875\u9762\u5206\u4EAB\u7ED9\u670B\u53CB" },
    { es: "\uD83C\uDDE8\uD83C\uDDF1\uD83C\uDDE8\uD83C\uDDF3 ¡Una herramienta de Chile para China!", zh: "\uD83C\uDDE8\uD83C\uDDF1\uD83C\uDDE8\uD83C\uDDF3 \u6765\u81EA\u667A\u5229\u7684\u4E2D\u6587\u5B66\u4E60\u5DE5\u5177\uFF01" },
  ];

  const line = items.map((m, i) => (
    <span key={i} className="mx-8 inline-block">
      {m.es} · {m.zh}
    </span>
  ));

  return (
    <div className="relative overflow-hidden w-full py-2">
      <div className="whitespace-nowrap inline-block animate-[marquee_22s_linear_infinite] will-change-transform">
        {line}{line /* duplicado para bucle continuo */}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default Ticker;
