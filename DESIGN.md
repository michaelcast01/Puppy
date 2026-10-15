---
name: Puppy
description: Pequeños cuidados, grandes vínculos; una identidad Material cercana y clara.
colors:
  primary: "#66dde3"
  primary-dark: "#087f8c"
  accent: "#e83b35"
  accent-strong: "#ba2b27"
  ink: "#3c2f33"
  muted: "#72696d"
  canvas: "#f7f9fa"
  surface: "#ffffff"
  primary-soft: "#dff7f8"
  primary-subtle: "#f1fafa"
  accent-soft: "#fcedea"
  outline: "#d8d9db"
typography:
  display:
    fontFamily: '"Roboto", Arial, sans-serif'
    fontSize: "38px"
    fontWeight: 700
    lineHeight: 1.18
    letterSpacing: "-0.025em"
  headline:
    fontFamily: '"Roboto", Arial, sans-serif'
    fontSize: "32px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  title:
    fontFamily: '"Roboto", Arial, sans-serif'
    fontSize: "22px"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.02em"
  body:
    fontFamily: '"Roboto", Arial, sans-serif'
    fontSize: "16px"
    fontWeight: 400
  label:
    fontFamily: '"Roboto", Arial, sans-serif'
    fontSize: "14px"
    fontWeight: 500
rounded:
  field: "8px"
  date: "10px"
  navigation: "12px"
  container: "16px"
  feature: "20px"
  filter: "24px"
  button: "26px"
  filter-group: "30px"
  circle: "50%"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  content: "20px"
  lg: "24px"
  section: "28px"
  xl: "32px"
  shell: "40px"
components:
  button-dark:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.surface}"
    rounded: "{rounded.button}"
    padding: "12px 20px"
  button-dark-hover:
    backgroundColor: "#554349"
  button-accent:
    backgroundColor: "{colors.accent-strong}"
    textColor: "{colors.surface}"
    rounded: "{rounded.button}"
    padding: "12px 20px"
  button-accent-hover:
    backgroundColor: "#98231f"
  button-text:
    backgroundColor: "transparent"
    textColor: "{colors.primary-dark}"
    rounded: "{rounded.button}"
    padding: "12px 20px"
  button-outlined:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.button}"
    padding: "12px 20px"
  field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "11px 12px"
  nav-selected:
    backgroundColor: "{colors.primary-soft}"
    textColor: "{colors.primary-dark}"
    rounded: "{rounded.navigation}"
    padding: "12px 14px"
  filter-active:
    backgroundColor: "{colors.primary-soft}"
    textColor: "{colors.primary-dark}"
    rounded: "{rounded.filter}"
    padding: "12px 20px"
  reminder-card:
    backgroundColor: "{colors.accent-soft}"
    textColor: "{colors.ink}"
    rounded: "{rounded.container}"
    padding: "24px"
---

# Design System: Puppy

## Overview

**Creative North Star: "Pequeños cuidados. Grandes vínculos."**

Puppy convierte el cuidado cotidiano en una experiencia cercana, tranquila y fácil de leer. Su identidad Material parte del logotipo recibido: turquesa luminoso, marrón cálido y coral funcional. Roboto, superficies tonales e iconos de trazo mantienen una voz amable y clara.

La interfaz reserva el color más intenso para la identidad y las acciones. Las rutinas y los recordatorios viven en contenedores espaciosos, con estado expresado mediante texto y forma además del color. La densidad permite recorrer el día sin perder los detalles necesarios.

**Key Characteristics:**

- Identidad original visible y atribuida.
- Superficies Material tonales y elevación contenida.
- Roboto compacta, jerarquía clara y lenguaje cercano.
- Controles amplios, foco visible y adaptación a una columna.

## Colors

El turquesa aporta energía; el marrón da calidez y legibilidad; el coral señala un cuidado por recordar. Los valores normativos están en el frontmatter y se implementan en `app/globals.css`.

### Primary

- **Turquesa Puppy** (`primary`): bienvenida, retrato y muestras de identidad; acompáñalo con tinta marrón.
- **Turquesa profundo** (`primary-dark`): navegación activa, enlaces, iconos, confirmación y foco. Es una variante derivada, no un color literal del original.
- **Turquesa suave** (`primary-soft`): selección de navegación y filtros.
- **Turquesa tenue** (`primary-subtle`): apoyo, hover y recordatorios completados.

### Secondary

- **Coral Puppy** (`accent`): identidad, pequeños detalles e iconos afectivos.
- **Coral de acción** (`accent-strong`): botones con texto blanco, errores y fechas pasadas.
- **Coral suave** (`accent-soft`): fondo de recordatorios pendientes.

### Neutral

- **Marrón Puppy** (`ink`): texto principal, botones oscuros y mensajes de estado.
- **Gris cálido** (`muted`): descripciones, fechas y metadatos.
- **Lienzo claro** (`canvas`): fondo de la aplicación.
- **Blanco** (`surface`): navegación, formularios, listas y fecha de recordatorio.
- **Contorno gris** (`outline`): botones delineados, grupos de filtros y formularios.

**The Readable Coral Rule.** Conservar el coral de marca en la identidad; usar coral de acción cuando el botón lleve texto blanco.

## Typography

**Display Font:** Roboto, con Arial y sans-serif de respaldo.  
**Body Font:** la misma familia; pesos locales cargados de 400, 500, 600 y 700.

**Character:** una sola familia mantiene la lectura uniforme. El peso y el tamaño establecen la jerarquía; el espaciado ligeramente cerrado se reserva para títulos.

### Hierarchy

- **Display:** titular de bienvenida; escala a 32, 30 y 29 px según el ancho, y a 26 px en pantallas de hasta 370 px.
- **Headline:** encabezado de página; pasa a 28 px en móvil.
- **Title:** encabezados de sección; pasan a 20 px en anchos reducidos. Las tarjetas usan títulos de 18 px y peso 600.
- **Body:** texto principal de 16 px; descripciones móviles y texto secundario usan 14 px. La interlínea contextual va de 1.4 a 1.7.
- **Label:** campos y metadatos; botones y selección usan peso 600. Los detalles pequeños usan 12–13 px; la navegación inferior, 11 px.

## Layout

La aplicación usa una barra lateral fija de 236 px y un área principal con relleno de 32 px verticales y 40 px horizontales, limitada a 1600 px. El panel de inicio combina una columna flexible con una agenda de 326 px, separadas por 24 px. Formularios y contenidos relacionados comparten la escala de espaciado del frontmatter.

A 1200 px o menos, la barra lateral baja a 210 px y el relleno principal a 28 px. A 1000 px o menos, el panel, la agenda y el perfil se apilan; la fecha decorativa del encabezado desaparece. A 760 px o menos, la barra lateral cede a navegación inferior fija, el contenido lleva 20 px laterales y 110 px inferiores, y las tarjetas mantienen el orden de lectura. A 370 px o menos, el margen lateral baja a 16 px. Desde 1836 px, el área principal se centra con 70 px de relleno izquierdo.

La cuadrícula de paleta pasa de tres columnas a filas y finalmente a una columna. El formulario conserva fecha y hora en dos columnas de ancho flexible. Los textos editables pueden envolver sin ampliar sus contenedores.

## Elevation & Depth

Las superficies de contenido son planas: el fondo claro, el blanco y los tonos suaves crean profundidad sin sombras en cada tarjeta. La elevación se reserva para elementos transitorios o fijos que se superponen al contenido.

### Shadow Vocabulary

- **Mensaje de estado:** `0 6px 24px #3c2f3320`.
- **Menú móvil:** `0 8px 32px #3c2f3320`.
- **Navegación inferior:** `0 -2px 16px #3c2f3306`.

**The Tonal Surface Rule.** Dar jerarquía a las tarjetas con su tono y espaciado; reservar las sombras para las capas superpuestas.

## Shapes

Las esquinas siguen la escala del frontmatter: campos compactos, contenedores suaves y bloques de marca algo más amplios. Botones y filtros son pastillas; avatar, controles de icono y confirmación son circulares. Los bordes son discretos: 1 px en formularios y controles delineados, 1.5 px en la casilla circular de rutina.

La ilustración conserva el PNG original sin modificar. El bloque de bienvenida y el retrato enmarcan el perro mediante recorte CSS del contenedor; la página Identidad y el README muestran la composición completa, incluida su atribución.

## Components

### Buttons

Acciones claras y amables. La altura mínima es de 48 px, con separación de 9 px entre icono y texto, tipo de 14 px y peso 600. El botón oscuro presenta el perfil; el coral de acción crea y guarda recordatorios. Las variantes de texto y delineada resuelven acciones secundarias.

El hover oscurece los botones rellenos y añade un tono suave a los secundarios. Las transiciones de color y sombra duran 0.18 s. Los controles deshabilitados tienen opacidad 0.55 y cursor de espera.

### Chips

Los filtros de agenda forman un grupo delineado con radio de 30 px. Cada opción es una pastilla, con altura mínima de 44 px y relleno de 12 px por 20 px. La opción activa usa turquesa suave, texto turquesa profundo y peso 600. En móvil las opciones comparten el ancho y reducen su relleno a 10 px por 12 px.

### Cards / Containers

Las listas, formularios y recordatorios usan el radio de contenedor; los bloques de marca usan el radio de feature. Los recordatorios llevan 24 px de relleno, fondo coral suave y una ficha de fecha blanca. El estado completado cambia a turquesa tenue y texto explícito de confirmación.

La lista de rutinas agrupa filas blancas con relleno de 6 px por 20 px. Cada fila tiene una altura mínima de 90 px, icono tonal de 44 px y casilla circular; en móvil la fila baja a 88 px. La confirmación combina el círculo turquesa profundo y una marca visible.

### Inputs / Fields

Campos blancos de al menos 48 px, borde gris de 1 px (`#b2b5b8`), relleno de 11 px por 12 px y texto de 14 px. Las etiquetas permanecen visibles; los placeholders son ayuda secundaria. Los errores se muestran como texto coral de acción próximo al formulario.

Todos los controles enfocables muestran un contorno de 3 px en turquesa profundo, separado 4 px. El formulario de recordatorio coloca el foco en el primer campo y lo devuelve a su botón al cerrar.

### Navigation

En escritorio, iconos de trazo acompañan etiquetas de 14 px dentro de filas de al menos 50 px. La selección combina turquesa suave, texto profundo y peso 600. El hover usa turquesa tenue. En móvil, cuatro destinos mantienen icono y etiqueta; una pastilla tonal detrás del icono identifica la página actual. El menú desplegable ofrece las etiquetas completas.

### Feedback and Identity

El mensaje de estado usa fondo marrón, texto blanco y anuncio accesible; se sitúa sobre la navegación móvil. Los estados vacíos conservan encabezado, explicación y un icono claro.

El recurso original se sirve desde `public/assets/puppy-original.png`. Mantener sus bytes, la composición completa en Identidad y README y el crédito enlazado a Freepik. Los iconos de interfaz proceden de Lucide; no sustituyen la ilustración recibida.

**The Visible State Rule.** Acompañar cada selección y confirmación con forma, texto o marca; el color nunca es la única señal.

El sistema no usa animación decorativa. Las preferencias de movimiento reducido eliminan las transiciones.

## Do's and Don'ts

### Do:

- **Do** conservar los tokens de identidad y la familia Roboto.
- **Do** usar superficies tonales, espacio y peso tipográfico para ordenar el contenido.
- **Do** mantener foco visible, etiquetas claras y controles táctiles amplios.
- **Do** conservar el PNG original y mostrarlo completo con atribución en Identidad y README.
- **Do** mantener texto, forma y color coordinados para comunicar estados.

### Don't:

- **Don't** sustituir el original por una mascota redibujada o alterar sus píxeles.
- **Don't** usar coral de marca como sustituto del coral de acción en botones con texto blanco.
- **Don't** añadir sombra a cada tarjeta o animación decorativa.
- **Don't** convertir texto, controles o navegación en imágenes.

