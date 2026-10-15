# Puppy — manifiesto de recursos

Auditoría de recursos para la demostración de cuidado de mascotas en Next.js y Tailwind CSS. Se conserva el logotipo recibido como recurso de producción. No hacen falta fotografías, ilustraciones nuevas ni imágenes generadas para explicar la agenda y las rutinas.

## produce

Ninguno. No se requiere generación, reconstrucción ni edición del archivo de imagen. La implementación enmarca el perro mediante CSS, sin alterar el PNG original.

## direct

| Campo | Valor |
| --- | --- |
| id | `puppy-original` |
| source_crop | Imagen original proporcionada por el usuario; `codex-clipboard-ccf7200d-490b-45a7-bc69-74424d33f871.png` según `PRODUCT.md` |
| output_path | `public/assets/puppy-original.png` |
| strategy | Usar el PNG suministrado completo y sin editar; incluye identidad, fondo y atribución como parte del original. |
| prompt_used | No aplica. |
| dimensions | 507 × 507 píxeles. |
| format | PNG, RGBA. |
| transparency | No se necesita transparencia; el fondo turquesa y la franja inferior forman parte de la composición recibida. Conservar sus píxeles. |
| deviations | El bloque de bienvenida y el retrato usan un encuadre CSS del perro, aprobado en la opción A. El archivo original permanece intacto y se muestra completo en Identidad y README. No redibujar ni limpiar marcas. |
| qa_status | `accepted`: inspección visual del archivo completada; composición completa y atribución inferior visible. |

SHA-256 del original: `2DEC1F418ED9E441B596DB93F5952E86645C459E2B3145E324369B9137D32609`.

### Uso y atribución

Mostrar el original completo en la página Identidad y en el README, con relación de aspecto 1:1 y ancho adaptable. En Identidad, la figura conserva la imagen completa y su pie enlazado a Freepik; su ancho máximo móvil es de 300 px. El bloque de bienvenida y el retrato enmarcan solo el perro mediante un contenedor CSS con `overflow: hidden`; esta decisión de composición no modifica los píxeles del PNG. El encuadre no sustituye la referencia completa ni su atribución. Reservar espacio con dimensiones explícitas y dar nombre accesible a la ilustración.

La imagen recibida contiene «designed by freepik.com». Conservar esa atribución visible dentro de la imagen y añadir un crédito textual legible, «Ilustración original: Freepik», con enlace a [Freepik](https://www.freepik.com/) en la página y el README. No se recibió una licencia o página de autor concreta; este manifiesto registra la atribución visible, sin afirmar derechos adicionales.

## semantic

Estas filas son el contrato de implementación; la aceptación visual final corresponde a la revisión del sitio y del archivo Pen.

| id | implementation | notes | qa_status |
| --- | --- | --- | --- |
| `brand-surfaces` | Variables CSS y tokens Tailwind para Primary `#66DDE3`, Dark Primary derivado `#087F8C`, tinta `#3C2F33` y Accent `#E83B35`; la variante coral de acción `#BA2B27` soporta texto blanco. Superficies, tipografía, bordes, elevación y radios se componen con CSS. Texto HTML «Puppy» en la navegación, sin reconstruir el dibujo del logotipo. | Material Design es la referencia fijada. El perro original se enmarca junto al contenido del bloque de bienvenida; el PNG completo sigue disponible en Identidad y README. | `accepted`: revisión independiente con disposición `ship` en `docs/review.md`. |
| `dashboard-shell` | Usar `header`, `nav`, `main` y secciones con encabezados reales. Construir tarjetas y contenedores mediante grid/flex y CSS; pasar de columnas en escritorio a una columna en móvil. | El orden del DOM debe mantener lectura y navegación coherentes. No rasterizar la interfaz. | `needs_parent_review` |
| `agenda-routines` | Renderizar agenda y rutinas con listas semánticas, elementos `time`, botones y casillas nativas o accesibles. Separar texto de estado y acciones mediante componentes; mantener zonas táctiles amplias. | Los datos son ejemplos de cuidado, sin recomendaciones veterinarias. La persistencia local pertenece a código, no a los recursos gráficos. | `needs_parent_review` |
| `icons-status` | Usar una biblioteca de iconos existente o SVG sencillos para calendario, añadir, reloj y confirmación; aplicar color y tamaño mediante CSS. Ocultar iconos decorativos a tecnologías de asistencia y dar nombre accesible a botones sin texto. | No dibujar mascotas nuevas ni duplicar el logo con SVG inventado. Los estados deben incluir texto o forma además de color. | `needs_parent_review` |
| `progress` | Construir recuentos y progreso con texto HTML, un elemento `progress` o una barra CSS accesible vinculada a los datos de rutinas. | No generar gráficas como imágenes. La visualización debe adaptarse al ancho y conservar su etiqueta textual. | `needs_parent_review` |
| `design-export` | Exportar la composición completa desde el archivo Pen a `docs/design/` y enlazarla en el README mediante una imagen Markdown con texto alternativo. | La captura es un entregable solicitado, no una imagen utilizada para implementar la web. El panel aprobado enmarca el perro; el README acompaña el diseño con el original completo y su atribución. | `needs_parent_review` |

## execution_order

1. Conservar el archivo original intacto; enmarcar el perro en bienvenida y retrato, y mostrar el original completo con crédito en Identidad y README.
2. Implementar superficies, iconos, agenda y estados en código con los tokens fijados.
3. Revisar la página y el diseño Pen en escritorio y móvil; confirmar el encuadre aprobado y la atribución legible en la referencia completa.
4. Exportar el diseño Pen e incorporarlo al README; comprobar nuevamente el crédito del original.

## blockers

Ninguno para implementar los recursos descritos. No es necesaria producción adicional de imágenes.

## assumptions

- La única ilustración autorizada y necesaria es la imagen suministrada.
- El propósito es una actividad académica y una demostración local de agenda y rutinas.
- Las dimensiones y detalles del diseño Pen los decide la implementación principal; este pase no cambia el mock ni los archivos de aplicación.
