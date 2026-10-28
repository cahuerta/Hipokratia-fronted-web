// conversa/Carrusel.jsx — franja de la página principal con los 4 asistentes.
// Pasan solos (cada uno se destaca unos segundos con su frase); en celular se
// deslizan con el dedo. Al tocar uno se abre la escena completa desde su parte.
import { useEffect, useRef, useState } from "react";
import Escena, { AVATARES, ORDEN } from "./Escena.jsx";
import { GUION, inicioDe } from "./guion.js";
import { precargar } from "./voz.js";

let yaPrecargado = false;

// compacto: versión del celular, arriba de todo (sin la descripción larga)
export default function Carrusel({ compacto = false }) {
  const [destacado, setDestacado] = useState(0);
  const [abierta, setAbierta] = useState(null);   // índice del guion donde parte, o null
  const [pausa, setPausa] = useState(false);
  const pista = useRef(null);

  // Apenas se ve la página: despierta al servidor de voz y pide el primer audio
  // de cada asistente (lo más probable es que toquen uno). El servidor guarda lo
  // ya generado, así que no se vuelve a cobrar a Azure por cada visita.
  useEffect(() => {
    // Solo el carrusel visible (el del celular o el del PC) y una vez por página
    if (yaPrecargado || window.matchMedia("(max-width: 767px)").matches !== compacto) return;
    yaPrecargado = true;
    precargar([0, ...ORDEN.map(inicioDe)].filter((v, i, a) => a.indexOf(v) === i).map((i) => GUION[i]), { despertar: true });
  }, [compacto]);

  // Cambia de destacado cada 3,2 s (se detiene si la persona está tocando)
  useEffect(() => {
    if (pausa || abierta !== null) return undefined;
    const t = setInterval(() => setDestacado((d) => (d + 1) % ORDEN.length), 3200);
    return () => clearInterval(t);
  }, [pausa, abierta]);

  // En celular, la pista se desliza hasta el destacado (sin mover la página)
  useEffect(() => {
    const el = pista.current?.children[destacado];
    if (!el || !pista.current || pista.current.scrollWidth <= pista.current.clientWidth + 4) return;
    pista.current.scrollTo({ left: el.offsetLeft - (pista.current.clientWidth - el.clientWidth) / 2, behavior: "smooth" });
  }, [destacado]);

  return (
    <section className={compacto ? "bg-white" : "border-t border-hipokratia-100 bg-white"} aria-labelledby={compacto ? "t-asistentes-cel" : "t-asistentes"}>
      <div className={compacto ? "mx-auto max-w-6xl px-6 pb-2 pt-5" : "mx-auto max-w-6xl px-6 py-16 md:py-20"}>
        <div className={compacto ? "flex items-center justify-between gap-3" : "flex flex-col items-start gap-3 md:flex-row md:items-end md:justify-between"}>
          <div>
            <h2 id={compacto ? "t-asistentes-cel" : "t-asistentes"} className={`font-display font-semibold text-hipokratia-900 ${compacto ? "text-xl" : "text-3xl"}`}>
              Conoce a nuestros asistentes
            </h2>
            {!compacto && (
              <p className="mt-2 max-w-xl text-hipokratia-800/80">
                Ica, Ipo, Sophia y Katia acompañan a pacientes y equipos. Toca a uno y te cuentan cómo trabajan.
              </p>
            )}
          </div>
          <button
            onClick={() => setAbierta(0)}
            className={`shrink-0 rounded-full bg-salud-600 text-sm font-semibold text-white transition-colors hover:bg-salud-700 ${compacto ? "px-4 py-2" : "px-6 py-3"}`}
          >
            {compacto ? "▶ Ver" : "▶ Verlos conversar"}
          </button>
        </div>

        <div
          ref={pista}
          className={`cv-pista${compacto ? " cv-pista--compacta" : ""}`}
          onPointerEnter={() => setPausa(true)}
          onPointerLeave={() => setPausa(false)}
          onTouchStart={() => setPausa(true)}
        >
          {ORDEN.map((k, i) => {
            const a = AVATARES[k];
            const on = i === destacado;
            return (
              <button
                key={k}
                className={`cv-tarjeta${on ? " cv-tarjeta--on" : ""}`}
                onClick={() => setAbierta(inicioDe(k))}
                onFocus={() => setDestacado(i)}
                aria-label={`${a.nombre}, ${a.rol}. Ver la presentación`}
              >
                <span className="cv-tarjeta__globo" aria-hidden="true">{a.frase}</span>
                <span className="cv-tarjeta__cara"><a.Comp estado={on ? "hablando" : "reposo"} boca={0} /></span>
                <span className="cv-tarjeta__nombre">{a.nombre}</span>
                <span className="cv-tarjeta__rol">{a.rol}</span>
              </button>
            );
          })}
        </div>
      </div>

      {abierta !== null && <Escena desde={abierta} alCerrar={() => setAbierta(null)} />}
    </section>
  );
}
