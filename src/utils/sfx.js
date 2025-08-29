let ctx;
function ensureCtx() { if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)(); }
export function playDing() {
  ensureCtx();
  const o = ctx.createOscillator(), g = ctx.createGain();
  o.type = 'sine'; o.frequency.value = 880; g.gain.setValueAtTime(0.0001, ctx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.3, ctx.currentTime + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.25);
  o.connect(g).connect(ctx.destination); o.start(); o.stop(ctx.currentTime + 0.25);
}
export function playWrong() {
  ensureCtx();
  const o = ctx.createOscillator(), g = ctx.createGain();
  o.type = 'square'; o.frequency.setValueAtTime(220, ctx.currentTime);
  o.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.3);
  g.gain.setValueAtTime(0.25, ctx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);
  o.connect(g).connect(ctx.destination); o.start(); o.stop(ctx.currentTime + 0.35);
}
