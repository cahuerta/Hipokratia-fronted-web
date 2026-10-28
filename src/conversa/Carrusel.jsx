// conversa/Carrusel.jsx — franja de la página principal con los 4 asistentes.
// Pasan solos (cada uno se destaca unos segundos con su frase); en celular se
// deslizan con el dedo. Al tocar uno se abre la escena completa desde su parte.
import { useEffect, useRef, useState } from "react";
import Escena, { AVATARES, ORDEN } from "./Escena.jsx";
import { inicioDe } from "./guion.js";

export default function Carrusel() {
  const [destacado, setDestacado] = useState(0);
  const [abierta, setAbierta] = useState(null);   // índice del guion donde parte, o null
  const [pausa, setPausa] = useState(false);
  const pista = useRef(null);

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
    <section className="border-t border-hipokratia-100 bg-white" aria-labelledby="t-asistentes">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="flex flex-col items-start gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 id="t-asistentes" className="font-display text-3xl font-semibold text-hipokratia-900">
              Conoce a nuestros asistentes
            </h2>
            <p className="mt-2 max-w-xl text-hipokratia-800/80">
              Ica, Ipo, Sophia y Katia acompañan a pacientes y equipos. Toca a uno y te cuentan cómo trabajan.
            </p>
          </div>
          <button
            onClick={() => setAbierta(0)}
            className="rounded-full bg-salud-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-salud-700"
          >
            ▶ Verlos conversar
          </button>
        </div>

        <div
          ref={pista}
          className="cv-pista"
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
