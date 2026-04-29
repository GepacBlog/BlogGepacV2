# Blog GEPAC

Blog editorial para GEPAC. Sistema basado en Astro + Markdown, con la estética de Krokland adaptada al tono editorial sereno apropiado para contenido de salud.

## Qué incluye

- **6 secciones funcionales**: Portada, Archivo, Buscar, Relatos, Métricas, Página de artículo, Página de relato, Página de categoría.
- **Modo claro / modo oscuro** con persistencia en `localStorage` y respeto a `prefers-color-scheme`.
- **Búsqueda local** sin servicios externos, instantánea, soporta `?q=` por URL.
- **Filtros de archivo** por categoría / año / mes.
- **Métricas automáticas** generadas en build a partir del contenido (totales, por mes, por categoría, por año).
- **RSS** generado automáticamente en `/rss.xml`.
- **SEO** con OG tags, theme-color, alt en imágenes.
- **Accesibilidad**: skip-link, contraste suficiente en ambos temas, aria-labels en navegación e iconos.

## Estructura

```
blog-gepac/
├── astro.config.mjs
├── package.json
├── AGENT_SPEC.md          ← Especificación para el agente IA
├── public/
└── src/
    ├── components/
    │   ├── ArticleRow.astro     ← Fila de artículo en listas
    │   ├── FeaturedArticle.astro ← Artículo destacado en portada
    │   ├── Header.astro
    │   └── Footer.astro
    ├── content/
    │   ├── config.ts            ← SCHEMA de contenido (contrato del agente IA)
    │   ├── articulos/           ← Aquí van los .md de noticias
    │   └── relatos/             ← Aquí van los .md de relatos
    ├── layouts/
    │   └── Base.astro           ← Layout principal con tema oscuro
    ├── lib/
    │   └── utils.js             ← Categorías, fechas, slugify, etc.
    ├── pages/
    │   ├── index.astro          ← Portada
    │   ├── archivo.astro        ← Archivo histórico con filtros
    │   ├── buscar.astro         ← Buscador local
    │   ├── relatos.astro        ← Listado de relatos
    │   ├── metricas.astro       ← Dashboard editorial
    │   ├── articulo/[slug].astro
    │   ├── relato/[slug].astro
    │   ├── categoria/[categoria].astro
    │   └── rss.xml.js
    └── styles/
        └── global.css           ← Sistema visual completo
```

## Cómo se ejecuta

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # genera /dist
npm run preview  # sirve el build local
```

## Cómo se publican artículos

1. El agente IA (o tú) crea un fichero en `src/content/articulos/` con el formato `YYYY-MM-DD-slug.md`
2. El fichero debe seguir la especificación en `AGENT_SPEC.md` (front-matter + Markdown)
3. Al hacer `npm run build`, el artículo aparece automáticamente en:
   - Portada
   - Archivo
   - Buscador
   - Métricas
   - Categoría correspondiente
   - URL propia: `/articulo/{slug}`
   - RSS

No hay paneles de administración ni bases de datos. La fuente de verdad es la carpeta `content/`.

## Despliegue

Cualquier hosting estático sirve. Recomendado: **Cloudflare Pages** o **Netlify**.

- Build command: `npm run build`
- Output directory: `dist`
- Sin variables de entorno necesarias

## Personalización rápida

**Cambiar acento de color**: `src/styles/global.css`, variable `--accent` (línea ~22 y ~57 para modo oscuro).

**Cambiar tipografías**: en `src/layouts/Base.astro` (URL de Google Fonts) y `src/styles/global.css` (variables `--font-*`).

**Cambiar nombre/branding**: `src/components/Header.astro` y `src/components/Footer.astro`. Toda la marca está aislada en estos dos ficheros — perfecto para clonar a un blog hermano (AEAL).

**Añadir/cambiar categorías**:
1. `src/content/config.ts` — actualiza el `enum` del campo `categoria`
2. `src/lib/utils.js` — actualiza el objeto `CATEGORIAS`
3. Añade el color CSS en `--cat-{slug}` en `global.css`

## Réplica para AEAL

El sistema está pensado para clonarse:

1. Duplicar el repo
2. Cambiar tokens de marca en `Header.astro` / `Footer.astro`
3. Cambiar `--accent` y nombre del proyecto
4. Listo. Mismo agente IA puede alimentar ambos blogs siguiendo el mismo `AGENT_SPEC.md`.
