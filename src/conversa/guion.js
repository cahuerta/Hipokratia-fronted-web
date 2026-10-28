// conversa/guion.js — quién habla, qué dice y qué sale en la pantalla del set.
// Las direcciones web se dicen "punto" para la voz; en el subtítulo van escritas normal.

export const GUION = [
  { quien: "ica", pantalla: "marca", texto: "¡Hola! Soy Ica, la recepcionista del Instituto de Cirugía Articular, en Curicó. Les presento a mis compañeros: Ipo, Sophia y Katia. Somos los asistentes de HypokratIA." },
  { quien: "ipo", pantalla: "dolor", texto: "Yo soy Ipo. Si te duele una rodilla, la cadera o el hombro, te pregunto dónde te duele, desde cuándo y cómo es el dolor, y marcamos juntos los puntos en el cuerpo." },
  { quien: "ipo", pantalla: "orden", texto: "Con eso te propongo un diagnóstico probable y los exámenes que corresponden. Si quieres, sale tu orden firmada por un médico de ICA." },
  { quien: "ica", pantalla: "reservas", texto: "Y yo te busco hora con el especialista indicado: presencial, a domicilio o por telemedicina." },
  { quien: "ipo", pantalla: null, texto: "Sophia, ¿y si el paciente quiere saber más sobre lo que tiene?" },
  { quien: "sophia", pantalla: "aprende", texto: "Para eso estoy yo. Busco en la literatura científica, en PubMed y SciELO, y te explico en simple lo que dicen los mejores estudios. Eso es HypokratIA Aprende." },
  { quien: "sophia", pantalla: "dossier", texto: "Y para médicos está HypokratIA Dossier: analiza artículos científicos y resume la evidencia, para decidir con datos reales." },
  { quien: "katia", pantalla: "portal", texto: "Yo soy Katia, de HypokratIA Portal, la app MiSalud. Ahí tienes tu ficha clínica siempre contigo, explicada en palabras simples." },
  { quien: "katia", pantalla: "recordatorios", texto: "Te recuerdo tus medicamentos y tus horas, cotizas tu receta entre farmacias, sumas a un familiar como cuidador y autorizas a tu médico a ver tu ficha." },
  { quien: "ica", pantalla: "gestion", texto: "¿Y de dónde sale toda esa información? De HypokratIA Gestión, la ficha clínica del centro: agenda, atención con dictado, recetas, caja y equipo." },
  { quien: "ica", pantalla: "domicilio", texto: "También atención a domicilio con seguimiento en el mapa, y cada centro con su propia página de reservas." },
  { quien: "sophia", pantalla: "catedra", texto: "Y para formar a los futuros médicos, Cátedra Interactiva: clases en vivo donde los alumnos votan y un avatar responde sus preguntas." },
  { quien: "katia", pantalla: "conectado", texto: "Todo conectado: lo que tu médico registra en la consulta llega a tu Portal, protegido y con tu permiso." },
  { quien: "ica", pantalla: "final", texto: "Si eres paciente, agenda en reservas punto icarticular punto cl. Y si tienes un centro de salud, conoce HypokratIA en hipokratia punto health. ¡Te esperamos!" },
];

export const enPantalla = (t) =>
  t.replace("reservas punto icarticular punto cl", "reservas.icarticular.cl").replace("hipokratia punto health", "hipokratia.health");

/** Al tocar un avatar en el carrusel, la escena parte en su primera frase */
export const inicioDe = (quien) => Math.max(0, GUION.findIndex((g) => g.quien === quien));
