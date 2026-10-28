// conversa/Escena.jsx — el set a pantalla completa, encima de la página.
// Ica, Ipo, Sophia y Katia conversan (voz de Azure) y cada producto aparece en la
// pantalla grande detrás de ellos. Se abre desde el carrusel (Carrusel.jsx).
import { useEffect, useRef, useState } from "react";
import AvatarIca from "./asistentes/ica/AvatarIca.jsx";
import AvatarIpo from "./asistentes/ipo/AvatarIpo.jsx";
import AvatarSophia from "./asistentes/sophia/AvatarSophia.jsx";
import AvatarAsistente from "./katia/AvatarAsistente.jsx";
import Pantalla from "./Pantallas.jsx";
import { GUION, enPantalla } from "./guion.js";
import { hablar, callarTodo, precargar } from "./voz.js";
import "./conversa.css";

const AvatarKatia = (p) => <AvatarAsistente aspecto="katia" nombre="Katia" {...p} />;

export const AVATARES = {
  ica:    { nombre: "Ica",    rol: "Recepción ICA",        frase: "Te busco hora con el especialista", Comp: AvatarIca },
  ipo:    { nombre: "Ipo",    rol: "Dolor y exámenes",     frase: "Te ayudo con tu dolor",             Comp: AvatarIpo },
  sophia: { nombre: "Sophia", rol: "Evidencia científica", frase: "Te explico lo que dice la ciencia", Comp: AvatarSophia },
  katia:  { nombre: "Katia",  rol: "MiSalud",              frase: "Tu ficha siempre contigo",          Comp: AvatarKatia },
};
export const ORDEN = ["ica", "ipo", "sophia", "katia"];

// Lugar de cada uno en el set: el que habla al centro; los otros a los lados
function lugares(activo) {
  const resto = ORDEN.filter((k) => k !== activo);
  const pos = { [activo]: "centro" };
  const slots = ORDEN.indexOf(activo) >= 2 ? ["izq1", "der1", "der2"] : ["izq2", "izq1", "der1"];
  resto.forEach((k, i) => { pos[k] = slots[i]; });
  return pos;
}

export default function Escena({ desde = 0, alCerrar }) {
  const [paso, setPaso] = useState(desde);
  const [corriendo, setCorriendo] = useState(true);
  const [conVoz, setConVoz] = useState(true);
  const [hablando, setHablando] = useState(false);
  const [boca, setBoca] = useState(0);
  const [pantalla, setPantalla] = useState(() => GUION.slice(0, desde + 1).reverse().find((g) => g.pantalla)?.pantalla || "marca");
  const cerrarRef = useRef(null);
  const escena = GUION[paso];

  // Bloquea el scroll de la página, Escape cierra, foco en "Cerrar"
  useEffect(() => {
    const antes = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const tecla = (e) => { if (e.key === "Escape") alCerrar(); };
    window.addEventListener("keydown", tecla);
    cerrarRef.current?.focus();
    precargar(GUION.slice(desde, desde + 3), { despertar: true });
    return () => { document.body.style.overflow = antes; window.removeEventListener("keydown", tecla); callarTodo(); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { if (escena.pantalla) setPantalla(escena.pantalla); }, [escena.pantalla]);

  useEffect(() => {
    if (!corriendo) return undefined;
    setHablando(true);
    // Mientras habla, se piden los audios de las dos frases siguientes
    precargar(GUION.slice(paso + 1, paso + 3));
    const cortar = hablar(escena.texto, escena.quien, {
      conVoz,
      alBoca: setBoca,
      alTerminar: () => {
        setHablando(false);
        setTimeout(() => setPaso((p) => {
          if (p + 1 >= GUION.length) { setCorriendo(false); return p; }
          return p + 1;
        }), 380);
      },
    });
    return () => { cortar(); setHablando(false); setBoca(0); };
  }, [corriendo, paso, conVoz]); // eslint-disable-line react-hooks/exhaustive-deps

  function ir(n) { callarTodo(); setPaso(Math.max(0, Math.min(GUION.length - 1, n))); }
  function alternar() {
    if (corriendo) { setCorriendo(false); callarTodo(); return; }
    if (paso === GUION.length - 1) setPaso(0);
    setCorriendo(true);
  }

  const pos = lugares(escena.quien);
  const termino = !corriendo && !hablando && paso === GUION.length - 1;

  return (
    <div className={`conversa-set${hablando ? " conversa-set--hablando" : ""}`} role="dialog" aria-modal="true" aria-label="Los asistentes de HypokratIA conversan">
      <div className="cv-luces" aria-hidden="true"><i /><i /><i /></div>
      <div className="cv-piso" aria-hidden="true" />

      <button ref={cerrarRef} className="cv-cerrar" onClick={alCerrar} aria-label="Cerrar la presentación">✕</button>

      <div className="cv-pantalla" aria-live="polite">
        <div key={pantalla} className="cv-pantalla__contenido"><Pantalla id={pantalla} /></div>
      </div>

      {ORDEN.map((k) => {
        const a = AVATARES[k];
        const activo = escena.quien === k;
        return (
          <div key={k} className={`cv-actor cv-actor--${pos[k]}${activo ? " cv-actor--activo" : ""}`} style={{ "--retardo": `${ORDEN.indexOf(k) * -0.9}s` }}>
            <div className="cv-actor__cuerpo"><a.Comp estado={activo && hablando ? "hablando" : "reposo"} boca={activo ? boca : 0} /></div>
            <p className="cv-actor__nombre"><b>{a.nombre}</b><span>{a.rol}</span></p>
          </div>
        );
      })}

      <p key={paso} className="cv-subtitulo"><b>{AVATARES[escena.quien].nombre}</b>{enPantalla(escena.texto)}</p>

      {termino && (
        <button className="cv-repetir" onClick={() => { setPaso(0); setCorriendo(true); }}>↺ Ver de nuevo</button>
      )}

      <div className="cv-mando">
        <button onClick={alternar} aria-label={corriendo ? "Pausar" : "Seguir"}>{corriendo ? "❚❚" : "▶"}</button>
        <button onClick={() => ir(paso - 1)} disabled={paso === 0} aria-label="Anterior">‹</button>
        <div className="cv-barra" aria-hidden="true"><i style={{ width: `${((paso + (hablando ? 0.5 : 1)) / GUION.length) * 100}%` }} /></div>
        <button onClick={() => ir(paso + 1)} disabled={paso === GUION.length - 1} aria-label="Siguiente">›</button>
        <label className="cv-voz"><input type="checkbox" checked={conVoz} onChange={(e) => { callarTodo(); setConVoz(e.target.checked); }} />Voz</label>
      </div>
    </div>
  );
}
