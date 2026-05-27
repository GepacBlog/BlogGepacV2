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

Vigilancia de entrada:
- comprobar `INBOX` cada 10 minutos mediante IMAP directo a Porkbun, en las franjas 10:00-14:00 y 15:00-19:00 (incluyendo los extremos)
- la comprobación de buzón debe ser de solo lectura: detectar si ha llegado correo, sin mover, marcar ni alterar mensajes
- Gmail y `agentekrok@gmail.com` no forman parte de esta vigilancia
- el destino editorial se decide por el asunto, no por el remitente: `Editorial GEPAC` y `Serie GEPAC` corresponden a este blog
- al detectar una pieza editorial válida con asunto reconocido para GEPAC, queda autorizado procesarla y publicarla directamente tras pasar todas las validaciones del flujo; no pedir confirmación adicional
- un correo ajeno, incompleto, dudoso o que no pase validación no se publica: informar a Fer

Referencia operativa actual:
- monitor: `/Users/krokland/.openclaw/workspace/scripts/editorial_heartbeat.py`
- programacion: `~/Library/LaunchAgents/com.krokland.editorial-heartbeat.plist` (cada 10 minutos de 10:00 a 14:00 y de 15:00 a 19:00)
- estado local: `/Users/krokland/.openclaw/workspace/state/editorial_heartbeat.json`
- al detectar UID nuevo, el monitor activa el flujo en OpenClaw para validar el mensaje y, si es una pieza GEPAC válida, procesarla y publicarla; el monitor por sí mismo no escribe en el buzón ni en el blog

Forma correcta de leer mensajes cuando haya que sacar una pieza:
1. entrar por IMAP a `info@krokland.com`
2. localizar el correo cuyo asunto corresponda a GEPAC (`Editorial GEPAC` o `Serie GEPAC`)
3. leer el mensaje completo por `RFC822`, no solo cabeceras parciales
4. extraer cuerpo e imágenes adjuntas
5. preparar la pieza en LexarIA

Regla fuerte:
- para artículos GEPAC recibidos por correo, la vía recordada y validada es `info@krokland.com` por IMAP directo a Porkbun, no Gmail
- el sondeo periódico cada 10 minutos es lectura de buzón; cuando detecta una pieza válida inicia el flujo editorial autorizado de preparación, validación y publicación directa

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
