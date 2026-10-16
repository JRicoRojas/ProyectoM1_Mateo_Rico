# Generador de paletas de colores

Proyecto integrador del Módulo 1 de Henry. Una aplicación web estática que genera paletas de colores aleatorios y los muestra en formatos HSL y HEX.

Demo: https://jricorojas.github.io/ProyectoM1_Mateo_Rico/
Drive https://drive.google.com/drive/folders/1DggSBOiF0CAkfynvB1SISTsH5Z8Ou9hB?usp=drive_link

## Qué hace

- Botón para generar una nueva paleta de colores aleatorios.
- Selector de tamaño de paleta (6, 8 o 9 colores). Al cambiarlo se agregan o se quitan tarjetas con una animación, sin regenerar los colores que ya estaban.
- Cada tarjeta muestra su color en HSL y en HEX.
- El texto de cada tarjeta cambia automáticamente entre blanco y negro según qué tan oscuro es el fondo, para mantener la lectura.
- Botón Lock por tarjeta: un color bloqueado se conserva cuando se genera una paleta nueva.
- Avisos breves (toast) y tooltips para dar respuesta a las acciones.
- Favoritos guardados en `localStorage` y copia de los favoritos al portapapeles. Esta parte está en desarrollo.

## Tecnologías

- HTML5 semántico
- CSS externo (Flexbox, variables CSS, animaciones con `@keyframes`)
- JavaScript sin librerías
- Git y GitHub Pages para el despliegue

## Estructura del proyecto

```
ProyectoM1_Mateo_Rico/
├── index.html
├── css/
│   └── styles.css
├── script/
│   └── script.js
└── README.md
```

## Cómo ejecutarlo en local

1. Clona el repositorio.
2. Abre `index.html` en el navegador, o usa una extensión como Live Server.

No necesita instalación ni dependencias.

## Cómo se usa

1. Elige la cantidad de colores en el selector.
2. Pulsa el botón de generar para obtener una paleta nueva.
3. Pulsa Lock en una tarjeta para conservar su color en las siguientes paletas.
4. Los códigos HEX y HSL de cada color aparecen dentro de su tarjeta.

## Cómo está hecho

- Los colores se generan como tres valores RGB aleatorios y se guardan en un array (`palette`), una posición por tarjeta.
- El HEX y el HSL se calculan a partir de esos valores con las funciones `rgbToHex` y `rgbToHsl`.
- El color del texto se decide con una función de luminosidad (`lumus`).
- Los botones de las tarjetas usan un solo listener en el contenedor (delegación de eventos), así funcionan también con las tarjetas que se agregan después.
- Al cargar la página, los colores iniciales vienen de variables CSS definidas en `:root`.

## Accesibilidad

- Botones reales (`<button>`) con `title` y texto descriptivo.
- Botón Lock con `aria-pressed` para indicar su estado.
- Toast con `role="status"` para que los lectores de pantalla anuncien los avisos.
- Texto blanco o negro según el fondo, para mejorar el contraste.

Mejoras pendientes de accesibilidad: un `<label>` asociado al selector de cantidad, estilos de foco visible con `:focus-visible` y un cálculo de contraste exacto según WCAG.

## Uso de inteligencia artificial

Durante el desarrollo se usó un asistente de IA para resolver dudas, revisar código y explicar conceptos. El registro de las preguntas y respuestas está en el archivo `documentacion-paleta-de-colores.md`.

## Autor

Mateo Rico
