import React from 'react';
const STATIONS = [
  { name:'China Instrumental 1', url:'https://stream-149.zeno.fm/0r8m2w2w3a0uv' },
  { name:'China Instrumental 2', url:'https://stream-149.zeno.fm/v3a5k7g6rbwtv' },
  { name:'Guqin Mix',           url:'https://stream-151.zeno.fm/3u9qbt0u5f8uv' },
  { name:'Erhu Classics',       url:'https://stream-152.zeno.fm/2wq1p4t3gchvv' },
  { name:'Chinese Lounge',      url:'https://stream-150.zeno.fm/7b6q0t9xq98uv' },
  { name:'Asian Chill',         url:'https://stream-153.zeno.fm/0k2m9r4z9rhvv' },
];
// Nota: <audio> no requiere CORS para reproducir streams https; si alguna URL falla, reemplazar por otra.

export default function RadioPlayer() {
  const [idx, setIdx] = React.useState(0);
  const [muted, setMuted] = React.useState(false);
  const [vol, setVol] = React.useState(0.7);
  const ref = React.useRef(null);
  React.useEffect(()=>{ if(ref.current){ ref.current.volume = vol; ref.current.muted = muted; }},[vol, muted]);
  return (
    <div className="fixed bottom-4 right-4 z-40 bg-white/90 backdrop-blur rounded-2xl shadow-lg p-3 flex items-center gap-2">
      <audio ref={ref} src={STATIONS[idx].url} controls className="hidden" autoPlay />
      <div className="text-sm">
        <div className="font-semibold">{STATIONS[idx].name}</div>
        <div className="text-xs text-gray-600">Radio instrumental</div>
      </div>
      <button onClick={()=>ref.current?.play()} className="px-2 py-1 rounded-lg bg-green-500 text-white text-xs">Play</button>
      <button onClick={()=>ref.current?.pause()} className="px-2 py-1 rounded-lg bg-gray-200 text-xs">Pausa</button>
      <button onClick={()=>setMuted(m=>!m)} className="px-2 py-1 rounded-lg bg-gray-200 text-xs">{muted?'Unmute':'Mute'}</button>
      <input type="range" min="0" max="1" step="0.01" value={vol} onChange={e=>setVol(parseFloat(e.target.value))}/>
      <select className="text-xs border rounded-lg px-2 py-1" value={idx} onChange={e=>setIdx(+e.target.value)}>
        {STATIONS.map((s,i)=><option key={i} value={i}>{s.name}</option>)}
      </select>
    </div>
  );
}
