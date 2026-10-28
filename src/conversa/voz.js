/**
 * conversa/voz.js — voz de Ica, Ipo, Sophia y Katia en la presentación.
 *
 * Voz natural de Azure por el backend de los asistentes de ICA (POST /voz, el
 * mismo que usan Ica/Ipo/Sophia en icarticular.cl y Katia en MiSalud). Acepta
 * llamadas solo desde icarticular.cl e hipokratia.health.
 *   Ica: Catalina · Ipo: Lorenzo · Sophia: Dalia · Katia: Catalina con tono más agudo
 * - precargar(textos): pide los audios de antemano (y despierta al backend, que en
 *   Render se duerme) para que suenen al tiro.
 * - hablar(texto, quien, { alBoca, alTerminar }): devuelve una función para cortar.
 *   La boca sigue el volumen real del audio.
 * - RESPALDO: si el backend no responde, se habla con la voz del navegador.
 */
const BACKEND = import.meta.env.VITE_ASISTENTES_BACKEND || "https://asistencia-ica-backend.onrender.com";

export const VOCES = {
  ica:    { voz: "ica",      tono: "normal", velocidad: "normal", genero: "f", pitch: 1.05 },
  ipo:    { voz: "ipo",      tono: "normal", velocidad: "normal", genero: "m", pitch: 0.85 },
  sophia: { voz: "sophia",   tono: "normal", velocidad: "normal", genero: "f", pitch: 0.96 },
  katia:  { voz: "femenina", tono: "aguda",  velocidad: "normal", genero: "f", pitch: 1.18 },
};

// Lo que se escribe distinto de como se dice
const paraVoz = (t) => t.replace(/\bSophia\b/g, "Sofía");

const audios = new Map();      // clave -> Promise<{ url, env } | null>
let sinAzureHasta = 0;         // tras una falla, un rato solo con la voz del navegador
let despierto = false;         // /health una sola vez por página

async function medirVolumen(blob) {
  const Offline = window.OfflineAudioContext || window.webkitOfflineAudioContext;
  if (!Offline) return null;
  const ctx = new Offline(1, 1, 16000);
  const buffer = await new Promise((ok, mal) => {
    blob.arrayBuffer().then((datos) => {
      const p = ctx.decodeAudioData(datos, ok, mal);
      if (p && typeof p.then === "function") p.then(ok, mal);
    }, mal);
  });
  const m = buffer.getChannelData(0);
  const paso = Math.max(1, Math.floor(buffer.sampleRate * 0.04));
  const env = new Float32Array(Math.ceil(m.length / paso));
  let max = 0;
  for (let i = 0; i < env.length; i += 1) {
    let s = 0;
    const fin = Math.min(m.length, (i + 1) * paso);
    for (let j = i * paso; j < fin; j += 1) s += m[j] * m[j];
    env[i] = Math.sqrt(s / Math.max(1, fin - i * paso));
    if (env[i] > max) max = env[i];
  }
  if (max > 0) for (let i = 0; i < env.length; i += 1) env[i] = Math.min(1, (env[i] / max) * 1.3);
  return env;
}

// espera: al hablar, máximo 4 s; si no llega, habla el navegador (precarga: 30 s)
function pedirAudio(texto, quien, espera = 4000) {
  const v = VOCES[quien];
  const clave = `${quien}|${texto}`;
  if (audios.has(clave)) return audios.get(clave);
  const promesa = (async () => {
    const ctrl = new AbortController();
    const reloj = setTimeout(() => ctrl.abort(), espera);
    try {
      const r = await fetch(`${BACKEND}/voz`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ texto: paraVoz(texto), voz: v.voz, tono: v.tono, velocidad: v.velocidad }),
        signal: ctrl.signal,
      });
      if (!r.ok) return null;
      const blob = await r.blob();
      if (!blob.size) return null;
      const entrada = { url: URL.createObjectURL(blob), env: null };
      medirVolumen(blob).then((env) => { entrada.env = env; }).catch(() => {});
      return entrada;
    } catch {
      return null;
    } finally {
      clearTimeout(reloj);
    }
  })();
  audios.set(clave, promesa);
  // Si falló, que se pueda volver a pedir más adelante
  promesa.then((e) => { if (!e) audios.delete(clave); });
  return promesa;
}

/** Despierta al backend y pide los primeros audios mientras la persona mira */
export function precargar(lineas, { despertar = false } = {}) {
  if (despertar && !despierto) { despierto = true; fetch(`${BACKEND}/health`, { cache: "no-store" }).catch(() => {}); }
  lineas.forEach((l, i) => setTimeout(() => pedirAudio(l.texto, l.quien, 30000), i * 400));
}

// ── Voz del navegador (respaldo) ──
function elegirVozNavegador(genero) {
  const vs = (window.speechSynthesis?.getVoices() || []).filter((v) => /^es/i.test(v.lang));
  if (!vs.length) return null;
  const orden = (v) => (/es-CL/i.test(v.lang) ? 0 : /es-(MX|US|419|AR|CO)/i.test(v.lang) ? 1 : 2);
  const re = genero === "m"
    ? /(jorge|diego|pablo|juan|raul|raúl|enrique|carlos|alvaro|álvaro|gonzalo|tomas|tomás|lorenzo|male)/i
    : /(paulina|monica|mónica|helena|laura|elvira|dalia|catalina|sabina|lucia|lucía|camila|female|google español)/i;
  const pref = vs.filter((v) => re.test(v.name));
  return [...(pref.length ? pref : vs)].sort((a, b) => orden(a) - orden(b))[0];
}

function hablarNavegador(texto, quien, alBoca, alTerminar) {
  const ss = window.speechSynthesis;
  const v = VOCES[quien];
  let osc = null;
  const mover = () => { clearInterval(osc); osc = setInterval(() => alBoca(0.15 + Math.random() * 0.8), 105); };
  const quieta = () => { clearInterval(osc); alBoca(0); };
  if (!ss || typeof SpeechSynthesisUtterance === "undefined") {
    mover();
    const t = setTimeout(() => { quieta(); alTerminar(); }, Math.max(2400, texto.split(/\s+/).length * 340));
    return () => { clearTimeout(t); quieta(); };
  }
  const frases = paraVoz(texto).match(/[^.!?¿¡]+[.!?]+|[^.!?]+$/g) || [texto];
  const voz = elegirVozNavegador(v.genero);
  let pendientes = frases.length;
  let cortado = false;
  // Si el navegador "termina" de inmediato (sin voces en español), igual se da
  // el tiempo de leer el subtítulo antes de pasar al siguiente
  const inicio = Date.now();
  const minimo = texto.split(/\s+/).length * 300;
  const terminarConCalma = () => {
    const falta = minimo - (Date.now() - inicio);
    if (falta <= 0) { alTerminar(); return; }
    mover();
    setTimeout(() => { if (!cortado) { quieta(); alTerminar(); } }, falta);
  };
  frases.forEach((f) => {
    const u = new SpeechSynthesisUtterance(f.trim());
    u.lang = voz?.lang || "es-CL";
    if (voz) u.voice = voz;
    u.pitch = v.pitch;
    u.onstart = mover;
    u.onend = () => { quieta(); pendientes -= 1; if (pendientes === 0 && !cortado) terminarConCalma(); };
    u.onerror = u.onend;
    ss.speak(u);
  });
  return () => { cortado = true; quieta(); try { ss.cancel(); } catch { /* sin voz */ } };
}

/**
 * Dice el texto con la voz de ese asistente. Devuelve una función para cortarlo.
 * conVoz=false: solo mueve la boca el tiempo estimado (para leer los subtítulos).
 */
export function hablar(texto, quien, { conVoz = true, alBoca, alTerminar }) {
  let cortar = () => {};
  let vivo = true;
  if (!conVoz) {
    const osc = setInterval(() => alBoca(0.15 + Math.random() * 0.8), 105);
    const t = setTimeout(() => { clearInterval(osc); alBoca(0); alTerminar(); }, Math.max(2400, texto.split(/\s+/).length * 340));
    return () => { clearTimeout(t); clearInterval(osc); alBoca(0); };
  }
  const usarNavegador = () => { if (vivo) cortar = hablarNavegador(texto, quien, alBoca, alTerminar); };

  if (Date.now() < sinAzureHasta) { usarNavegador(); return () => { vivo = false; cortar(); }; }

  pedirAudio(texto, quien).then((e) => {
    if (!vivo) return;
    if (!e) { sinAzureHasta = Date.now() + 20000; usarNavegador(); return; }
    const audio = new Audio(e.url);
    let raf = 0;
    let terminado = false;
    const terminar = () => {
      if (terminado) return;
      terminado = true;
      cancelAnimationFrame(raf); alBoca(0); alTerminar();
    };
    const tic = () => {
      const env = e.env;
      if (env && audio.duration) alBoca(env[Math.min(env.length - 1, Math.floor(audio.currentTime / 0.04))] || 0);
      else alBoca(0.2 + Math.random() * 0.7);
      // Algunos teléfonos avisan tarde el fin: se da por terminado al cumplir la duración
      if (audio.duration && audio.currentTime >= audio.duration - 0.05) { terminar(); return; }
      raf = requestAnimationFrame(tic);
    };
    audio.onended = terminar;
    audio.onerror = () => { if (!terminado) { terminado = true; cancelAnimationFrame(raf); usarNavegador(); } };
    audio.play().then(() => { raf = requestAnimationFrame(tic); }).catch(() => {
      if (!terminado) { terminado = true; usarNavegador(); }
    });
    cortar = () => { terminado = true; cancelAnimationFrame(raf); audio.pause(); alBoca(0); };
  });
  return () => { vivo = false; cortar(); };
}

/** Para cerrar la escena: corta cualquier voz del navegador */
export function callarTodo() {
  try { window.speechSynthesis?.cancel(); } catch { /* sin voz */ }
}
