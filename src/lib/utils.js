// Etiquetas legibles de las categorías
export const CATEGORIAS = {
  'investigacion':       { label: 'Investigación',     color: 'var(--cat-investigacion)' },
  'tratamientos':        { label: 'Tratamientos',      color: 'var(--cat-tratamientos)' },
  'derechos-paciente':   { label: 'Derechos',          color: 'var(--cat-derechos)' },
  'asociacion':          { label: 'Asociación',        color: 'var(--cat-asociacion)' },
  'eventos':             { label: 'Eventos',           color: 'var(--cat-eventos)' },
  'guia-practica':       { label: 'Guía práctica',     color: 'var(--cat-guia)' },
  'testimonio':          { label: 'Testimonio',        color: 'var(--cat-testimonio)' },
  'general':             { label: 'General',           color: 'var(--cat-general)' }
};

export function categoriaLabel(slug) {
  return CATEGORIAS[slug]?.label ?? 'General';
}

export function categoriaColor(slug) {
  return CATEGORIAS[slug]?.color ?? 'var(--cat-general)';
}

// Fechas en español, formato editorial: "29 de abril de 2026"
const MESES = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
];

export function formatFecha(date) {
  const d = new Date(date);
  return `${d.getDate()} de ${MESES[d.getMonth()]} de ${d.getFullYear()}`;
}

export function formatFechaCorta(date) {
  const d = new Date(date);
  const m = MESES[d.getMonth()].slice(0, 3);
  return `${d.getDate()} ${m} ${d.getFullYear()}`;
}

// Slug desde texto libre
export function slugify(text) {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

// Tiempo de lectura aproximado (200 palabras/min)
export function tiempoLectura(texto) {
  const palabras = texto.trim().split(/\s+/).length;
  return Math.max(1, Math.round(palabras / 200));
}

// Ordena artículos por fecha desc, descarta borradores
export function articulosPublicados(articulos) {
  return articulos
    .filter(a => a.data.estado !== 'borrador' && a.data.estado !== 'archivado')
    .sort((a, b) => new Date(b.data.fecha) - new Date(a.data.fecha));
}
