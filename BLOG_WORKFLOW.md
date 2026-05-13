# Flujo de trabajo obligatorio · Blog Gepac V2

## Regla base
El blog activo es **Blog Gepac V2**.

Ruta activa de trabajo:
- `/Volumes/LexarIA/OpenClawWorkspace/projects/Blog Gepac V2`

Ruta que NO es fuente de verdad:
- `/Users/krokland/.openclaw/workspace/projects/Blog Gepac V2`
- cualquier `scratch/blog-gepac-*`
- cualquier flujo legacy anterior

## Antes de tocar nada
1. Confirmar que se está trabajando en la ruta activa de LexarIA.
2. Leer `AGENT_SPEC.md` del proyecto si hay dudas de formato.
3. No asumir dominio final ni URL pública por inercia.
4. No usar Gmail por defecto para buscar piezas. Usar la fuente real indicada para ese momento.

## Flujo operativo correcto para una nueva publicación

### 1. Fuente
- Localizar el contenido real del artículo en la fuente correcta.
- Si llega por correo, usar el canal/cuenta correcta, no improvisar otra.
- Extraer:
  - título
  - subtítulo si existe
  - fecha
  - resumen portada
  - cuerpo
  - SEO
  - adjuntos de imagen

### 2. Proyecto correcto
Trabajar solo en:
- `/Volumes/LexarIA/OpenClawWorkspace/projects/Blog Gepac V2`

### 3. Crear artículo
Guardar en:
- `src/content/articulos/`

Nombre:
- `YYYY-MM-DD-slug.md`

Seguir siempre:
- `AGENT_SPEC.md`
- `src/content/config.ts`

Regla editorial fija actual:
- cada artículo nuevo que llega para publicar debe ir arriba en portada
- por defecto, al publicar una pieza nueva de GEPAC, marcar `destacado: true`
- no dejar una pieza nueva como no destacada salvo indicación explícita de Fer

### 4. Imágenes
Guardar imágenes nuevas en:
- `public/assets/uploads/`

Convención recomendada:
- `YYYY-MM-DD_gepac_slug_01.ext`
- `YYYY-MM-DD_gepac_slug_02.ext`

### 5. Build obligatorio
Ejecutar siempre:
- `npm run build`

Si falla:
- corregir antes de seguir
- no publicar con build roto

### 6. Publicación
Publicar desde el repo activo de LexarIA.

Secuencia:
- revisar `git status`
- añadir solo los archivos de la pieza nueva
- commit claro
- push a `main`

Nunca hacer commit masivo por inercia si hay cambios colaterales.

### 7. Verificación final
Comprobar:
- que el artículo entra en build
- que la URL correcta corresponde a `BlogGepacV2`
- que no se ha usado por error un dominio o ruta antigua

URL base correcta a usar por defecto:
- `https://gepacblog.github.io/BlogGepacV2/`

Patrón de artículo:
- `https://gepacblog.github.io/BlogGepacV2/articulo/<slug>/`

## Consulta correcta del correo para piezas GEPAC
No usar Gmail por inercia para esto.

Canal operativo que sí funcionó:
- IMAP directo a Porkbun
- cuenta: `info@krokland.com`
- servidor IMAP: `imap.porkbun.com`
- puerto: `993`

Referencia operativa actual:
- `scratch/porkbun_imap_check.py`

Forma correcta de leer mensajes cuando haya que sacar una pieza:
1. entrar por IMAP a `info@krokland.com`
2. localizar el correo de `proyectos@gepac.es`
3. leer el mensaje completo por `RFC822`, no solo cabeceras parciales
4. extraer cuerpo e imágenes adjuntas
5. preparar la pieza en LexarIA

Regla fuerte:
- para artículos GEPAC recibidos por correo, la vía recordada y validada es `info@krokland.com` por IMAP directo a Porkbun, no Gmail

## Prohibiciones explícitas
- No trabajar en la copia interna por defecto.
- No usar `scratch/blog-gepac-*` como flujo principal.
- No asumir `blog.gepac.es` por costumbre.
- No asumir Gmail para piezas GEPAC recibidas en `info@krokland.com`.
- No publicar sin build OK.
- No hacer push de cambios ajenos al artículo por descuido.
- No dejar una pieza nueva sin destacar por inercia o suposición.

## Checklist corto antes de decir “publicado”
- [ ] Estoy en LexarIA
- [ ] El archivo está en `src/content/articulos/`
- [ ] Las imágenes están en `public/assets/uploads/`
- [ ] `npm run build` pasa
- [ ] Solo he comiteado la pieza nueva
- [ ] La pieza nueva queda arriba en portada (`destacado: true` salvo orden contraria)
- [ ] He dado la URL de `BlogGepacV2`, no otra
