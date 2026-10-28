// conversa/Pantallas.jsx — lo que muestra la pantalla grande del set en cada momento:
// maquetas animadas de cada producto (sin datos reales de pacientes).
export default function Pantalla({ id }) {
  switch (id) {
    case "marca":
      return (<div className="pt pt--marca"><p className="pt__logo">Hypokrat<span>IA</span></p><p className="pt__lema">Tu salud, conectada</p><p className="pt__lugar">Instituto de Cirugía Articular · Curicó</p></div>);
    case "dolor":
      return (<div className="pt pt--dolor"><p className="pt__titulo">Asistentes ICA · ¿Dónde te duele?</p>
        <svg viewBox="0 0 120 220" className="cuerpo" aria-hidden>
          <circle cx="60" cy="22" r="15" /><rect x="40" y="40" width="40" height="70" rx="16" />
          <rect x="22" y="44" width="14" height="62" rx="7" /><rect x="84" y="44" width="14" height="62" rx="7" />
          <rect x="42" y="106" width="16" height="96" rx="8" /><rect x="62" y="106" width="16" height="96" rx="8" />
          <circle className="dolor-p p1" cx="70" cy="160" r="7" /><circle className="dolor-p p2" cx="50" cy="114" r="6" /><circle className="dolor-p p3" cx="88" cy="50" r="6" />
        </svg>
        <ul className="pt__chips"><li>Rodilla derecha</li><li>Hace 3 semanas</li><li>Al subir escaleras</li></ul></div>);
    case "orden":
      return (<div className="pt pt--orden"><p className="pt__titulo">Diagnóstico probable</p><p className="pt__grande">Lesión meniscal</p>
        <div className="orden"><p>Orden de exámenes</p><p className="orden__item">✓ Resonancia magnética de rodilla derecha</p><p className="orden__firma">Firma: médico ICA</p></div></div>);
    case "reservas":
      return (<div className="pt pt--reservas"><p className="pt__titulo">reservas.icarticular.cl</p>
        <div className="modos"><span className="on">🏥 Presencial</span><span>🏠 Domicilio</span><span>📱 Telemedicina</span></div>
        <div className="horas">{["09:00", "09:20", "10:40", "11:00", "15:00", "15:20"].map((h, i) => <span key={h} style={{ animationDelay: `${0.15 * i}s` }} className={i === 2 ? "elegida" : ""}>{h}</span>)}</div></div>);
    case "aprende":
      return (<div className="pt pt--aprende"><p className="pt__titulo">HypokratIA Aprende</p><p className="pt__pregunta">“¿Necesito operarme del menisco?”</p>
        <p className="pt__resp">Según 12 estudios, muchas lesiones meniscales mejoran con kinesiología. La cirugía se indica si la rodilla se bloquea.</p>
        <p className="pt__fuentes">PubMed · SciELO</p></div>);
    case "dossier":
      return (<div className="pt pt--dossier"><p className="pt__titulo">HypokratIA Dossier</p>
        {["Meta-análisis · 2025 · 4.120 pacientes", "Ensayo clínico · 2024 · 320 pacientes", "Revisión sistemática · 2023"].map((t, i) => <div key={t} className="paper" style={{ animationDelay: `${0.2 * i}s` }}><span className="paper__nivel">Nivel {i + 1}</span>{t}</div>)}
        <p className="pt__fuentes">Resumen de la evidencia listo</p></div>);
    case "portal":
      return (<div className="pt pt--portal"><div className="tel"><p className="tel__barra">MiSalud</p><p className="tel__h">Mi ficha clínica</p>
        <p className="tel__ev">19 oct · Lumbago mecánico</p><p className="tel__exp">✨ “Tienes una contractura en la zona lumbar. Calor local y reposo relativo.”</p></div></div>);
    case "recordatorios":
      return (<div className="pt pt--portal"><div className="tel"><p className="tel__barra">MiSalud · Recordatorios</p>
        <p className="aviso">⏰ 08:00 · Ibuprofeno 400 mg</p><p className="aviso">🗓 Jue 10:40 · Dr. Huerta</p><p className="aviso">💊 Cotizar receta: desde $3.490</p><p className="aviso">👥 Cuidador: tu hija Ana</p></div></div>);
    case "gestion":
      return (<div className="pt pt--gestion"><p className="pt__titulo">HypokratIA Gestión · Agenda de hoy</p>
        <div className="agenda">{[["09:00", "Control post operatorio"], ["09:20", "Dolor de cadera"], ["09:40", "Lesión de hombro"], ["10:00", "🏠 Kine a domicilio"]].map(([h, t], i) => <p key={h} style={{ animationDelay: `${0.18 * i}s` }}><b>{h}</b>{t}</p>)}</div>
        <p className="pt__dictado">🎙 Dictando la atención…</p></div>);
    case "domicilio":
      return (<div className="pt pt--mapa"><p className="pt__titulo">Domicilio · en camino</p>
        <svg viewBox="0 0 300 160" className="mapa" aria-hidden><path d="M10 120 C80 120 90 40 160 50 S260 110 290 30" className="ruta" /><circle cx="290" cy="30" r="8" className="casa" /><circle r="7" className="auto"><animateMotion dur="5s" repeatCount="indefinite" path="M10 120 C80 120 90 40 160 50 S260 110 290 30" /></circle></svg>
        <p className="pt__grande">Llega en 12 min · código 4821</p></div>);
    case "catedra":
      return (<div className="pt pt--catedra"><p className="pt__titulo">Cátedra Interactiva · Caso clínico</p><p className="pt__pregunta">¿Qué examen pides primero?</p>
        <div className="votos">{[["Radiografía", 72], ["Resonancia", 18], ["Ecografía", 10]].map(([t, v]) => <div key={t} className="voto"><span>{t}</span><i style={{ "--v": `${v}%` }} /><b>{v}%</b></div>)}</div></div>);
    case "conectado":
      return (<div className="pt pt--red">{["Gestión", "Portal", "Aprende", "Dossier", "Asistentes"].map((n, i) => <span key={n} className={`nodo n${i}`}>{n}</span>)}<span className="nodo nodo--centro">Tu ficha</span></div>);
    case "final":
      return (<div className="pt pt--final"><p className="pt__logo">Hypokrat<span>IA</span></p><p className="cta">Pacientes: <b>reservas.icarticular.cl</b></p><p className="cta">Centros de salud: <b>hipokratia.health</b></p></div>);
    default:
      return null;
  }
}
