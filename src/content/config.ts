import { defineCollection, z } from 'astro:content';

/**
 * COLECCIÓN: ARTÍCULOS
 * Cada artículo es un .md en src/content/articulos/
 * Nombre de archivo: YYYY-MM-DD-slug.md
 * Ej: 2026-04-29-nuevo-tratamiento-linfoma.md
 */
const articulos = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      // ── Identidad ──────────────────────────────────────────────
      titulo: z.string().min(8).max(140),
      subtitulo: z.string().max(220).optional(),

      // ── Fechas ─────────────────────────────────────────────────
      fecha: z.coerce.date(),                    // publicación
      fecha_actualizacion: z.coerce.date().optional(),

      // ── Categorización ─────────────────────────────────────────
      categoria: z.enum([
        'investigacion',
        'tratamientos',
        'derechos-paciente',
        'asociacion',
        'eventos',
        'guia-practica',
        'testimonio',
        'general'
      ]),
      tags: z.array(z.string()).default([]),

      // ── Resumen / preview ──────────────────────────────────────
      resumen: z.string().min(40).max(400),       // se usa en cards y meta description
      destacado: z.boolean().default(false),      // aparece en home grande

      // ── Imagen de portada ──────────────────────────────────────
      imagen: z.object({
        src: image().optional(),
        url: z.string().url().optional(),         // alternativa: URL externa
        alt: z.string(),
        caption: z.string().optional(),
        credito: z.string().optional()
      }).optional(),
      layout_imagen: z.enum(['cover', 'contain']).optional(),

      // ── Autoría ────────────────────────────────────────────────
      autor: z.string().default('Redacción GEPAC'),

      // ── Fuente original (importante en salud) ──────────────────
      fuente: z.object({
        nombre: z.string(),                       // p.ej. "European Society for Medical Oncology"
        url: z.string().url().optional(),
        fecha_original: z.coerce.date().optional()
      }).optional(),

      // ── Tiempo de lectura (auto-calculado si no se da) ─────────
      tiempo_lectura: z.number().int().positive().optional(),

      // ── Estado editorial ───────────────────────────────────────
      estado: z.enum(['borrador', 'publicado', 'archivado']).default('publicado'),

      // ── SEO opcional ───────────────────────────────────────────
      meta_titulo: z.string().max(70).optional(),
      meta_descripcion: z.string().max(170).optional()
    })
});

/**
 * COLECCIÓN: RELATOS
 * Sección separada — primera persona, vivencias.
 * Misma forma pero con campos específicos del género.
 */
const relatos = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      titulo: z.string().min(4).max(120),
      fecha: z.coerce.date(),

      autor: z.string(),                          // persona real, anónima permitida
      autor_nota: z.string().optional(),          // "Paciente desde 2019" / "Familiar"

      resumen: z.string().min(20).max(300),
      tags: z.array(z.string()).default([]),

      imagen: z.object({
        src: image().optional(),
        url: z.string().url().optional(),
        alt: z.string()
      }).optional(),

      estado: z.enum(['borrador', 'publicado', 'archivado']).default('publicado'),

      // Aviso de contenido sensible si lo hubiera
      aviso_lectura: z.string().optional()
    })
});

export const collections = { articulos, relatos };
