/**
 * src/asistente/AvatarAsistente.jsx — dibujo del asistente de MiSalud
 *
 * El paciente elige su aspecto (y su nombre, tono y velocidad de voz) en la
 * configuracion del asistente. Aspectos:
 *  - "katia": mujer de pelo largo oscuro, uniforme azul HypokratIA (por defecto)
 *  - "clara": mujer de pelo corto claro, blusa verde azulado
 *  - "tomas": hombre de pelo corto, polera azul
 * Lo comun (halo segun estado, ojos que parpadean, boca que se mueve al hablar)
 * es el mismo dibujo de los asistentes de ICA (AvatarBase de ASISTENCIA-ICA).
 */
import "../asistentes/comun/asistentes.css";

export const ASPECTOS = {
  katia: { genero: "femenina", etiqueta: "Mujer, pelo largo" },
  clara: { genero: "femenina", etiqueta: "Mujer, pelo corto" },
  tomas: { genero: "masculina", etiqueta: "Hombre" },
};

const COMUN = {
  navy: "#0B2F6E",
  piel: "#F2CBAA",
  pielSombra: "#E2AF8B",
  bocaInterior: "#6E2533",
  halo1: "#1B3B8C",
  halo2: "#0f766e",
  fondo1: "#EEF2FB",
  fondo2: "#E6F4F2",
  ondas: "#0f766e",
  aro: "#0f766e",
};

const COLORES = {
  katia: { ...COMUN, pelo: "#2B2024", peloBrillo: "#4A3A40", ropa: "#1B3B8C", ropaSombra: "#152F72", detalle: "#0f766e", labio: "#C8616E", mejilla: 0.32 },
  clara: { ...COMUN, pelo: "#B98A4E", peloBrillo: "#D4A866", ropa: "#0f766e", ropaSombra: "#0B5F58", detalle: "#FFFFFF", labio: "#C8616E", mejilla: 0.32 },
  tomas: { ...COMUN, pelo: "#3A2A22", peloBrillo: "#5A4033", ropa: "#1B3B8C", ropaSombra: "#152F72", detalle: "#0f766e", labio: "#B06A5E", mejilla: 0.16 },
};

export default function AvatarAsistente({ aspecto = "katia", nombre = "Katia", estado = "reposo", boca = 0 }) {
  const a = COLORES[aspecto] ? aspecto : "katia";
  const C = COLORES[a];
  const Cuerpo = a === "clara" ? CuerpoClara : a === "tomas" ? CuerpoTomas : CuerpoKatia;
  const Cabeza = a === "clara" ? CabezaClara : a === "tomas" ? CabezaTomas : CabezaKatia;
  return (
    <AvatarBase id={`misalud-${a}`} nombre={`${nombre}, tu asistente de MiSalud`} C={C}
      Cuerpo={Cuerpo} Cabeza={Cabeza} aros={a !== "tomas"} pestanas={a !== "tomas"} estado={estado} boca={boca} />
  );
}

function AvatarBase({ id: clave, nombre, C, Cuerpo, Cabeza, aros = false, pestanas = false, estado = "reposo", boca = 0 }) {
  const apertura = Math.max(0, Math.min(1, boca));
  const bocaRy = 1.2 + apertura * 11;
  const bocaRx = 13 + apertura * 3;
  // ids propios por asistente (dos avatares en la misma página no se pisan)
  const id = (n) => `${n}-${clave}`;

  return (
    <svg
      className={`avatar avatar--${estado}`}
      viewBox="0 0 400 460"
      role="img"
      aria-label={`${nombre}, ${estado}`}
    >
      <defs>
        <linearGradient id={id("gradHalo")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={C.halo1} />
          <stop offset="100%" stopColor={C.halo2} />
        </linearGradient>
        <linearGradient id={id("gradFondo")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={C.fondo1} />
          <stop offset="100%" stopColor={C.fondo2} />
        </linearGradient>
        <clipPath id={id("recorte")}>
          <circle cx="200" cy="215" r="178" />
        </clipPath>
      </defs>

      {/* Halo de estado */}
      <circle className="avatar__halo" cx="200" cy="215" r="188" fill="none" stroke={`url(#${id("gradHalo")})`} strokeWidth="6" />
      <circle cx="200" cy="215" r="178" fill={`url(#${id("gradFondo")})`} />

      <g clipPath={`url(#${id("recorte")})`}>
      <g transform="translate(40 14) scale(0.8)">
        <Cuerpo C={C} />

        {/* Orejas */}
        <ellipse cx="129" cy="210" rx="11" ry="17" fill={C.pielSombra} />
        <ellipse cx="271" cy="210" rx="11" ry="17" fill={C.pielSombra} />
        {aros && (
          <>
            <circle cx="129" cy="229" r="4" fill={C.aro} />
            <circle cx="271" cy="229" r="4" fill={C.aro} />
          </>
        )}

        <Cabeza C={C} />

        {/* Ojos (parpadean con CSS) */}
        <g className="avatar__ojos">
          <ellipse cx="172" cy="197" rx="10" ry="8" fill="#FFFFFF" />
          <ellipse cx="228" cy="197" rx="10" ry="8" fill="#FFFFFF" />
          <circle className="avatar__pupila" cx="172" cy="198" r="5.5" fill={C.navy} />
          <circle className="avatar__pupila" cx="228" cy="198" r="5.5" fill={C.navy} />
          <circle cx="174" cy="196" r="1.6" fill="#FFFFFF" />
          <circle cx="230" cy="196" r="1.6" fill="#FFFFFF" />
        </g>
        {/* Párpados (con pestañas, más marcados) */}
        <path d="M162 191 C168 187 178 187 183 190" fill="none" stroke={C.pelo} strokeWidth={pestanas ? 2.8 : 1.5} strokeLinecap="round" />
        <path d="M217 190 C222 187 232 187 238 191" fill="none" stroke={C.pelo} strokeWidth={pestanas ? 2.8 : 1.5} strokeLinecap="round" />

        {/* Nariz */}
        <path d="M200 208 C197 220 194 226 199 229 C202 230 205 229 207 227" fill="none" stroke={C.pielSombra} strokeWidth="3" strokeLinecap="round" />

        {/* Mejillas */}
        <ellipse cx="160" cy="229" rx="12" ry="7" fill="#F09A9A" opacity={C.mejilla} />
        <ellipse cx="240" cy="229" rx="12" ry="7" fill="#F09A9A" opacity={C.mejilla} />

        {/* Boca */}
        <g className="avatar__boca">
          {apertura > 0.04 ? (
            <>
              <ellipse cx="200" cy={250 + bocaRy * 0.35} rx={bocaRx} ry={bocaRy} fill={C.bocaInterior} />
              <rect x={200 - bocaRx * 0.6} y="247" width={bocaRx * 1.2} height={Math.min(4, bocaRy * 0.5)} rx="1.5" fill="#FFFFFF" />
              <path
                d={`M${200 - bocaRx - 2} 249 C${200 - bocaRx / 2} ${245} ${200 + bocaRx / 2} ${245} ${200 + bocaRx + 2} 249`}
                fill="none"
                stroke={C.labio}
                strokeWidth="3"
                strokeLinecap="round"
              />
            </>
          ) : (
            <path d="M184 248 C192 256 208 256 216 248" fill="none" stroke={C.labio} strokeWidth="3.5" strokeLinecap="round" />
          )}
        </g>
      </g>
      </g>

      {/* Indicador: pensando */}
      {estado === "pensando" && (
        <g className="avatar__pensando">
          <circle cx="300" cy="88" r="7" fill={C.halo1} />
          <circle cx="322" cy="88" r="7" fill={C.halo1} />
          <circle cx="344" cy="88" r="7" fill={C.halo1} />
        </g>
      )}

      {/* Indicador: hablando */}
      {estado === "hablando" && (
        <g className="avatar__ondas" fill="none" stroke={C.ondas} strokeWidth="4" strokeLinecap="round">
          <path d="M318 196 C326 206 326 222 318 232" />
          <path d="M334 184 C348 202 348 226 334 244" />
          <path d="M82 196 C74 206 74 222 82 232" />
          <path d="M66 184 C52 202 52 226 66 244" />
        </g>
      )}
    </svg>
  );
}

// ---------------- uniforme / ropa ----------------
function Uniforme({ C, cuello = true }) {
  return (
    <>
      <path d="M64 470 C70 396 116 344 200 336 C284 344 330 396 336 470 Z" fill={C.ropa} />
      <path d="M182 334 L200 368 L218 334 Z" fill={C.pielSombra} />
      {cuello && (
        <>
          <path d="M172 330 L200 368 L190 376 L164 340 Z" fill={C.detalle} />
          <path d="M228 330 L200 368 L210 376 L236 340 Z" fill={C.detalle} />
        </>
      )}
      {/* Credencial HypokratIA */}
      <rect x="252" y="388" width="44" height="28" rx="5" fill="#FFFFFF" stroke={C.detalle} strokeWidth="2" />
      <text x="274" y="408" textAnchor="middle" fontSize="16" fontWeight="700" fontFamily="Georgia, serif" fill={C.ropa}>H</text>
    </>
  );
}

// ---------------- Katia: pelo largo oscuro, uniforme azul ----------------
function CuerpoKatia({ C }) {
  return (
    <>
      <path
        d="M116 205 C108 118 160 90 200 90 C244 90 294 116 286 205 C292 262 298 330 288 372 C266 386 134 386 112 372 C102 330 108 262 116 205 Z"
        fill={C.pelo}
      />
      <path d="M178 270 L222 270 L226 334 L174 334 Z" fill={C.pielSombra} />
      <Uniforme C={C} />
    </>
  );
}

function CabezaKatia({ C }) {
  return (
    <>
      <ellipse cx="200" cy="200" rx="70" ry="84" fill={C.piel} />
      <path
        d="M128 196 C122 132 164 106 204 108 C242 110 278 134 272 196 C262 158 236 132 200 130 C170 132 146 150 136 176 C132 184 130 190 128 196 Z"
        fill={C.pelo}
      />
      <path d="M160 124 C180 114 214 114 236 124" fill="none" stroke={C.peloBrillo} strokeWidth="4" strokeLinecap="round" />
      <path className="avatar__ceja" d="M156 178 C166 171 180 171 188 175" fill="none" stroke={C.pelo} strokeWidth="3.5" strokeLinecap="round" />
      <path className="avatar__ceja" d="M212 175 C220 171 234 171 244 178" fill="none" stroke={C.pelo} strokeWidth="3.5" strokeLinecap="round" />
    </>
  );
}

// ---------------- Clara: pelo corto claro (melena), blusa verde azulado ----------------
function CuerpoClara({ C }) {
  return (
    <>
      <path
        d="M118 205 C110 120 160 94 200 94 C242 94 292 120 284 205 C288 236 286 262 276 280 C252 290 148 290 124 280 C114 262 112 236 118 205 Z"
        fill={C.pelo}
      />
      <path d="M178 270 L222 270 L226 334 L174 334 Z" fill={C.pielSombra} />
      <Uniforme C={C} />
    </>
  );
}

function CabezaClara({ C }) {
  return (
    <>
      <ellipse cx="200" cy="200" rx="70" ry="84" fill={C.piel} />
      <path
        d="M126 200 C118 128 162 104 202 106 C244 108 282 132 274 200 C270 170 262 152 248 142 C222 156 186 160 150 150 C138 162 130 180 126 200 Z"
        fill={C.pelo}
      />
      <path d="M168 118 C192 110 222 112 244 126" fill="none" stroke={C.peloBrillo} strokeWidth="4" strokeLinecap="round" />
      <path className="avatar__ceja" d="M156 178 C166 171 180 171 188 175" fill="none" stroke={C.peloBrillo} strokeWidth="3.5" strokeLinecap="round" />
      <path className="avatar__ceja" d="M212 175 C220 171 234 171 244 178" fill="none" stroke={C.peloBrillo} strokeWidth="3.5" strokeLinecap="round" />
    </>
  );
}

// ---------------- Tomás: hombre de pelo corto, polera azul ----------------
function CuerpoTomas({ C }) {
  return (
    <>
      <path d="M172 266 L228 266 L232 334 L168 334 Z" fill={C.pielSombra} />
      <Uniforme C={C} cuello={false} />
      {/* Cuello de polera */}
      <path d="M170 334 C186 348 214 348 230 334" fill="none" stroke={C.detalle} strokeWidth="6" strokeLinecap="round" />
    </>
  );
}

function CabezaTomas({ C }) {
  return (
    <>
      <path
        d="M130 190 C130 140 160 116 200 116 C240 116 270 140 270 190 C270 234 260 260 238 276 C224 286 212 289 200 289 C188 289 176 286 162 276 C140 260 130 234 130 190 Z"
        fill={C.piel}
      />
      <path
        d="M126 198 C118 130 160 100 202 100 C246 100 286 128 274 198 C271 178 267 164 259 153 C238 140 216 134 196 136 C172 138 152 146 141 159 C134 170 130 182 126 198 Z"
        fill={C.pelo}
      />
      <path d="M176 112 C204 104 238 110 258 128" fill="none" stroke={C.peloBrillo} strokeWidth="4" strokeLinecap="round" />
      <path d="M127 186 L137 184 L137 214 L131 214 Z" fill={C.pelo} />
      <path d="M273 186 L263 184 L263 214 L269 214 Z" fill={C.pelo} />
      <path className="avatar__ceja" d="M154 177 C165 171 179 171 190 174" fill="none" stroke={C.pelo} strokeWidth="5.5" strokeLinecap="round" />
      <path className="avatar__ceja" d="M210 174 C221 171 235 171 246 177" fill="none" stroke={C.pelo} strokeWidth="5.5" strokeLinecap="round" />
    </>
  );
}
