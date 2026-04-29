# Especificación para el agente IA · Blog GEPAC

Este documento describe **cómo crear, nombrar y estructurar artículos** para que el blog los publique correctamente sin intervención manual.

> Si sigues este documento al pie de la letra, basta con dejar el `.md` en la carpeta correcta y al hacer build el artículo aparece publicado, en archivo, buscador y métricas, automáticamente.

---

## 1. Dónde van los archivos

| Tipo | Carpeta | Formato | Nombre |
|---|---|---|---|
| Artículo | `src/content/articulos/` | Markdown `.md` | `YYYY-MM-DD-slug.md` |
| Relato | `src/content/relatos/` | Markdown `.md` | `YYYY-MM-DD-slug.md` |

**Reglas para el `slug`:**
- Solo `a-z`, `0-9` y guiones medios `-`
- Sin tildes, sin ñ, sin espacios
- 3–8 palabras significativas del título
- Ejemplo: título *"Nuevo tratamiento aprobado para el linfoma folicular"* → slug `nuevo-tratamiento-linfoma-folicular`
- Nombre de archivo final: `2026-04-29-nuevo-tratamiento-linfoma-folicular.md`

---

## 2. Front-matter obligatorio (YAML)

Todo artículo empieza con un bloque `---` con metadatos. Este es el contrato:

```yaml
---
titulo: "Nuevo tratamiento aprobado para el linfoma folicular"
subtitulo: "La EMA aprueba el uso ampliado de mosunetuzumab en pacientes recidivantes"
fecha: 2026-04-29
categoria: tratamientos
tags: [linfoma, ema, inmunoterapia]
resumen: "La Agencia Europea del Medicamento ha aprobado el uso ampliado de mosunetuzumab para pacientes con linfoma folicular en recaída. Resumen de qué cambia y a quién afecta."
autor: "Redacción GEPAC"
fuente:
  nombre: "European Medicines Agency"
  url: "https://www.ema.europa.eu/..."
  fecha_original: 2026-04-22
imagen:
  url: "https://upload.wikimedia.org/.../laboratorio.jpg"
  alt: "Pipetas de laboratorio sobre superficie metálica"
  credito: "EMA / dominio público"
destacado: false
estado: publicado
---
```

### Campos uno por uno

| Campo | Obligatorio | Tipo | Notas |
|---|---|---|---|
| `titulo` | ✅ | string 8–140 | El titular real |
| `subtitulo` | ⚪ | string ≤220 | Bajada/dek opcional |
| `fecha` | ✅ | YYYY-MM-DD | Fecha de publicación |
| `fecha_actualizacion` | ⚪ | YYYY-MM-DD | Si se actualiza después |
| `categoria` | ✅ | enum | Solo uno de los valores listados abajo |
| `tags` | ⚪ | array string | Minúsculas, sin tildes |
| `resumen` | ✅ | string 40–400 | Aparece en cards y meta-description |
| `destacado` | ⚪ | bool | `true` = aparece grande en portada |
| `autor` | ⚪ | string | Default: "Redacción GEPAC" |
| `fuente` | ⚪ | objeto | Recomendado siempre que haya |
| `imagen` | ⚪ | objeto | Ver sección 3 |
| `tiempo_lectura` | ⚪ | int | Minutos. Si se omite, se calcula |
| `estado` | ⚪ | enum | `borrador` \| `publicado` \| `archivado` |
| `meta_titulo` | ⚪ | string ≤70 | SEO. Si se omite, usa `titulo` |
| `meta_descripcion` | ⚪ | string ≤170 | SEO. Si se omite, usa `resumen` |

### Categorías permitidas

Solo estos valores en `categoria`:

- `investigacion` — Investigación clínica, ensayos, estudios
- `tratamientos` — Aprobaciones, fármacos, terapias
- `derechos-paciente` — Legal, asistencial, derechos
- `asociacion` — Comunicaciones internas, vida asociativa
- `eventos` — Jornadas, congresos, encuentros
- `guia-practica` — Información práctica para pacientes/familiares
- `testimonio` — Vivencias en formato editorial (no relato)
- `general` — Cuando no encaja en lo anterior

> **No inventar categorías nuevas.** Si una pieza no encaja, usa `general`.

---

## 3. Imágenes

Dos modos, elige uno:

**Modo A · Imagen externa (recomendado para empezar)**
```yaml
imagen:
  url: "https://ejemplo.com/imagen.jpg"
  alt: "Descripción objetiva en una frase"
  caption: "Texto opcional bajo la imagen"
  credito: "Autor / fuente"
```

**Modo B · Imagen local**
1. Guardar en `src/content/articulos/_imagenes/` (o subcarpeta del artículo)
2. Referenciar:
```yaml
imagen:
  src: "./imagenes/2026-04-29-laboratorio.jpg"
  alt: "Descripción objetiva"
```

**Reglas siempre:**
- `alt` es **obligatorio** y descriptivo (accesibilidad)
- Sin imágenes con texto encima
- Sin caras de pacientes reconocibles sin permiso explícito
- Resolución mínima 1200px de ancho

---

## 4. Cuerpo del artículo (Markdown)

Después del front-matter `---` cerrado, va el cuerpo en Markdown estándar.

**Convenciones editoriales para GEPAC:**

```markdown
---
[front-matter aquí]
---

Primera frase = entradilla. No repetir el título. Plantea claramente
de qué va el artículo en una sola frase larga si hace falta.

## Subtítulos en H2

Nunca usar H1 en el cuerpo (el H1 es el título de la página).
Usar H2 para secciones principales, H3 si hace falta subdividir.

### Solo si hace falta

Párrafos cortos. Lenguaje claro. Estamos hablando con pacientes
y familiares, no con clínicos.

> Las citas textuales van con `>` al inicio. Útiles para destacar
> declaraciones de fuentes oficiales.

**Negritas** solo para conceptos clave, nunca para frases enteras.
*Cursivas* para nombres científicos (*Helicobacter pylori*) y nombres
de fármacos en su denominación común.

- Listas con guiones
- Cuando hay enumeración real
- No para fragmentar prosa

[Enlaces así](https://ejemplo.com) — siempre con texto descriptivo,
nunca "haz clic aquí".

## Fuentes y referencias

Si el artículo se basa en una fuente concreta, mencionarla
al final del cuerpo o usar el campo `fuente` del front-matter.
Ambos pueden coexistir.
```

---

## 5. Ejemplo completo de artículo

```markdown
---
titulo: "La EMA aprueba el uso ampliado de mosunetuzumab"
subtitulo: "Pacientes con linfoma folicular recidivante podrán acceder al tratamiento en segunda línea"
fecha: 2026-04-29
categoria: tratamientos
tags: [linfoma, ema, inmunoterapia, aprobaciones]
resumen: "La Agencia Europea del Medicamento ha ampliado la indicación de mosunetuzumab para pacientes con linfoma folicular en recaída tras la primera línea de tratamiento. Explicamos qué cambia, a quién afecta y los próximos pasos."
autor: "Redacción GEPAC"
fuente:
  nombre: "European Medicines Agency"
  url: "https://www.ema.europa.eu/en/medicines/human/EPAR/lunsumio"
  fecha_original: 2026-04-22
imagen:
  url: "https://example.org/lab.jpg"
  alt: "Vial de medicamento sobre bandeja médica"
  credito: "EMA"
destacado: true
estado: publicado
---

La Agencia Europea del Medicamento ha confirmado la ampliación de uso
de mosunetuzumab para pacientes con linfoma folicular que han recaído
tras un primer tratamiento, abriendo el acceso a esta terapia en una
fase más temprana de la enfermedad.

## Qué cambia

Hasta ahora, el fármaco estaba aprobado para pacientes que ya habían
recibido al menos dos líneas previas de tratamiento. La nueva
indicación lo adelanta a la segunda línea.

## A quién afecta

Pacientes adultos con linfoma folicular CD20-positivo en recaída
o refractarios al tratamiento inicial.

## Próximos pasos

La aprobación europea abre el proceso de evaluación por parte de
las autoridades sanitarias nacionales. En España, este paso lo
realiza la Comisión Interministerial de Precios de los Medicamentos.
```

---

## 6. Checklist antes de guardar

Antes de dar por bueno un artículo, el agente debe verificar:

- [ ] Nombre de archivo cumple `YYYY-MM-DD-slug.md`
- [ ] Front-matter abre y cierra con `---`
- [ ] Todos los campos obligatorios presentes
- [ ] `categoria` está en la lista permitida
- [ ] `resumen` entre 40 y 400 caracteres
- [ ] `imagen.alt` presente si hay imagen
- [ ] Cuerpo no empieza con H1 (solo H2/H3)
- [ ] Sin texto comercial, sin recomendaciones médicas directas
- [ ] Si hay datos clínicos, hay `fuente` rellenada

---

## 7. Qué hace el agente, qué NO hace

**Hace:**
- Generar el `.md` con front-matter válido
- Calcular `slug` desde el título
- Componer el `resumen` desde el cuerpo si no se le da
- Sugerir `categoria` y `tags` desde el contenido
- Verificar el checklist antes de cerrar el archivo

**No hace:**
- Decidir qué se publica y qué no — eso es decisión editorial humana
- Inventar fuentes o cifras
- Modificar artículos ya publicados sin marca de actualización
- Borrar archivos
