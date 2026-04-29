import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { articulosPublicados } from '../lib/utils.js';

export async function GET(context) {
  const articulos = articulosPublicados(await getCollection('articulos'));
  return rss({
    title: 'GEPAC · Información de salud',
    description: 'Información de salud para pacientes y familiares',
    site: context.site,
    items: articulos.map(a => ({
      title: a.data.titulo,
      pubDate: a.data.fecha,
      description: a.data.resumen,
      link: `/articulo/${a.slug}`,
      categories: [a.data.categoria, ...(a.data.tags ?? [])]
    })),
    customData: '<language>es-ES</language>'
  });
}
