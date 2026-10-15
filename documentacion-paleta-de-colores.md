# Proyecto integrador: generador de paleta de colores

Documentación de las preguntas y respuestas del proyecto, en orden cronológico.

Nota sobre cómo está armado este archivo:
- Las preguntas son las tuyas, tal como las escribiste. Cuando traían código largo, aparece "(código pegado)" y se resume lo que preguntabas.
- Las respuestas están condensadas: dejan la explicación principal y el código final de cada tema. No son una copia palabra por palabra.
- Varias preguntas seguidas sobre un mismo problema se agruparon bajo un solo número.
- No incluye lo de instalar el asistente en VS Code, sus errores ni capturas, ni el mensaje donde pediste este archivo.
- La primera pregunta de la conversación original no se pudo recuperar y está marcada.

---

## Pregunta 1
(pregunta no recuperada) Sobre si hace falta JavaScript para deshabilitar la opción guía de un select.

Is this well written?
`<option value=""selected hidden>Colores</option>`

## Respuesta 1
No hace falta JavaScript. Al `<option>` guía se le agregan `selected`, `hidden` y, si se quiere, `disabled`: así se ve al cargar la página pero no aparece en la lista desplegada.
El error de tu línea es que falta un espacio entre atributos: `value=""selected` debe ser `value="" selected`. El navegador lo tolera, pero no es HTML válido.

```html
<option value="" selected hidden disabled>Colores</option>
```

Fuente: MDN Web Docs, elemento `<option>`.

---

## Pregunta 2
`width: 100vh; }?`

## Respuesta 2
`vh` es el 1% del alto de la ventana, así que `width: 100vh` iguala el ancho al alto de la pantalla, casi nunca lo que se busca. Para ocupar el ancho de la pantalla se usa `100vw`, que incluye la barra de scroll y puede generar scroll horizontal. Para ocupar el ancho de su contenedor, `100%`. El alto de pantalla va en `height` o `min-height` con `100vh`.

---

## Pregunta 3
Ahora quiero saber cómo hacer el header fixed, se llama?
Está raro porque quiero que el hero ocupe toda la pantalla, cuando cambia a fixed se pone detrás del header, hay alguna manera de que ocupe y tenga en cuenta el tamaño del header?

## Respuesta 3
Se llama `position: fixed`. El header sale del flujo, queda pegado a la ventana y necesita `top: 0`, un ancho (`width: 100%` o `left: 0` y `right: 0`), `z-index` y un fondo propio.
El contenido de abajo sube y queda tapado, así que el hero necesita un `padding-top` igual a la altura del header, con `box-sizing: border-box` para que no sume de más. Definir la altura como variable evita repetir el número.

```css
:root { --altura-header: 3.5rem; }

.hero {
    display: flex;
    min-height: 100vh;
    padding-top: var(--altura-header);
    box-sizing: border-box;
}
```

Alternativa: `position: sticky`, que no sale del flujo y no necesita compensar el espacio.

---

## Pregunta 4
(captura de una tarjeta) Quiero que el hex quede abajo del color y la ul abajo a la derecha.
Pensé que era más fácil hacerlo con grid.
Así tengo una parte del hero (código pegado). Cómo se ve en código.

## Respuesta 4
Con Grid es más simple: no hace falta tocar el HTML porque cada `.color` ya tiene tres hijos directos (`h2`, `.hex`, `ul`). Se dibuja la cuadrícula con `grid-template-areas` y cada hijo se asigna a su zona con `grid-area`.

```css
.color {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-rows: 1fr auto;
    grid-template-areas:
        "titulo titulo"
        "hex    lista";
    padding: 16px;
    box-sizing: border-box;
}
.color h2 { grid-area: titulo; margin: 0; }
.color .hex { grid-area: hex; margin: 0; align-self: end; }
.color ul { grid-area: lista; list-style: none; margin: 0; padding: 0; align-self: end; text-align: right; }
```

La tarjeta necesita altura definida (viene de `.hero`), o la fila de `1fr` no tiene espacio sobrante que repartir.

---

## Pregunta 5
Tamaño normal de una font que parece botón.
Se puede hacer que el tamaño se ajuste también al tamaño del contenedor y de la ventana?
Pero funciones ya es JS.

## Respuesta 5
Para texto de botón el rango habitual es 14px a 16px (`0.875rem` a `1rem`). Conviene usar `rem` para respetar el tamaño de letra del navegador, y `font-family: inherit` porque los botones no heredan la fuente.
Para que siga la ventana se usa `clamp(mínimo, ideal, máximo)` con `vw`. Para que siga el contenedor, las container queries con la unidad `cqw` (el contenedor lleva `container-type: inline-size`).
`clamp()` es una función de CSS, no de JavaScript: el navegador la resuelve solo, igual que `var()` o `calc()`.

```css
.hex { font-size: clamp(0.875rem, 1vw + 0.5rem, 1.25rem); }
```

---

## Pregunta 6
Me recuerdas los códigos de git.

## Respuesta 6
```bash
git status
git add .
git commit -m "Describe qué hiciste"
git push
```
En una línea: `git add . && git commit -m "Nota" && git push`. Primera vez en una rama: `git push -u origin main`. Historial: `git log --oneline`. Traer cambios: `git pull`. Git no rastrea carpetas vacías: se usa un `.gitkeep`.

Más adelante hubo un error al escribir `git commit m- "..."` y `git commit-m "..."`: la forma correcta es `git commit -m "..."`, con el guion antes de la m y un espacio entre `commit` y `-m`. Tras el commit hace falta `git push` para subirlo a GitHub.

---

## Pregunta 7
Por qué no funciona el gap (código de la `ul` pegado).

## Respuesta 7
`gap` solo funciona dentro de un contenedor flex, grid o multi-columna. La `ul` solo tenía `grid-area`, que la coloca dentro de la cuadrícula de `.color` pero no la convierte en contenedor. Hay que darle `display: flex` (con `flex-direction: column` si van uno encima del otro). Además `100rem` es enorme: entre `0.5rem` y `1rem` basta.

---

## Pregunta 8
Cómo funciona hover.
(código) `.color:hover{ flex: 1.1; }`
Cómo funciona transition.
Pero sirve solo en el hover pero no cuando uno quita el mouse no?
(código) `.color h2:hover{ text-align: center; }`
`transition-duration: 0.3s` no funciona en texto?

## Respuesta 8
`:hover` aplica estilos mientras el puntero está encima, sin JavaScript. `transition` anima el cambio entre dos valores y necesita una duración: sin ella el cambio es instantáneo.
La `transition` va en el estado normal, no en el `:hover`. Si va solo en el hover, anima al entrar y vuelve de golpe al salir.

```css
.color {
    flex: 1;
    transition: flex 0.3s ease;
}
.color:hover { flex: 1.5; }
```

`flex: 1.1` es un cambio muy sutil con 6 a 9 tarjetas. `text-align` no se anima porque entre `left` y `center` no hay valores intermedios: para mover texto con suavidad se usa `transform: translateX()`. Para que el hover funcione desde cualquier parte de la tarjeta, el selector es `.color:hover h2`.

---

## Pregunta 9
Pero si el display es grid cómo se haría para que hiciera un efecto parecido.
El problema con flex es que ahora quedan 6 columnas en lugar de una cuadrícula.

## Respuesta 9
`flex` solo aplica a hijos de un contenedor flex. Si `.hero` es grid, el ancho de cada columna lo decide `grid-template-columns`. Para un efecto parecido hay tres caminos: `:has()` con una regla por tarjeta, JavaScript que reescriba las columnas, o `transform: scale()`.
Para una cuadrícula real, Grid en `.hero` con `repeat(3, 1fr)` (o `repeat(auto-fit, minmax(200px, 1fr))`) y `grid-auto-rows: 1fr`. Con flex se puede usar `flex-wrap: wrap` y un `flex-basis` cercano a un tercio, pero con 8 tarjetas la última fila se estira.
Una tarjeta puede ser a la vez flex item de `.hero` y grid container de su contenido: el `display` del padre decide cómo se comporta hacia afuera y el propio, cómo acomoda a sus hijos.

---

## Pregunta 10
Efecto brillante?
Más que brillante quiero es que como que brille.
(código con `filter: brightness(1.1)` y `box-shadow`)
Se ve el borde y no la figura (captura del candado).
Shadow solo al lado del palette y no todo el dropdown.
(código `.dropdown-main:hover{ text-shadow }`) y el HTML del dropdown.

## Respuesta 10
Hay tres efectos: resplandor (`box-shadow` o `text-shadow` con desplazamiento 0 y blur), aclarar (`filter: brightness()`) y destello que cruza (un `::after` con `linear-gradient` que se desplaza con `transform` al hacer hover, con `overflow: hidden` y `pointer-events: none`).
`box-shadow` siempre dibuja una caja rectangular. Para seguir la silueta de un ícono se usa `text-shadow` (fuente) o `filter: drop-shadow()` (SVG o imagen). `text-shadow` es una propiedad heredada, por eso en el contenedor sombreaba todo el texto.
Para el dropdown, el hover se queda en el contenedor y la sombra va en el ícono:

```css
#icono-paleta { transition: filter 0.3s ease; }
.dropdown-main:hover #icono-paleta { filter: drop-shadow(0 0 6px var(--color-2)); }
```

Un `box-shadow: 1 1 10px ...` es inválido: los desplazamientos necesitan unidad (`1px 1px 10px ...`), salvo el `0`.

---

## Pregunta 11
(captura de pestañas con fondo claro redondeado) Este efecto cómo se hace?

## Respuesta 11
Es un contenedor flex con ícono y texto, `padding`, `border-radius` alto y un fondo translúcido (`rgba(255, 255, 255, 0.1)`) que aparece en `:hover` o en una clase `.activo` que JS mueve con cada clic.

---

## Pregunta 12
(código)
```javascript
const headerBtn = document.getElementById("test");
headerBtn.addEventListener('click', function(){
    console.log("Generate")
});
```
(captura del error) `Cannot read properties of null (reading 'addEventListener')`.

## Respuesta 12
`getElementById` devolvió `null`: el script corrió antes de que existiera el botón, o el `id` no coincide. Se arregla con el atributo `defer` en el `<script>` (o moviéndolo antes de `</body>`) y revisando que el `id` sea idéntico en HTML y JS.

---

## Pregunta 13
for each sintaxis.
Se puede escribir así? `color.h2.text;`
`color.style.backgroundColor` dentro de un for each.
RGB fórmula para el background color.
Es más porque quiero que cuando inicie siempre inicie con los mismos colores, ya lo random puede ser después del botón.

## Respuesta 13
`forEach` ejecuta una función por cada elemento: `lista.forEach((elemento, indice) => { ... })`. El primer parámetro es el elemento y el segundo, el índice.
`color.h2.text` no existe: el `h2` se busca con `color.querySelector("h2")` y su texto se cambia con `textContent` y un `=`.
`color.style.backgroundColor = ...` es válido y es un estilo en línea, que gana sobre el CSS. Un color RGB aleatorio:

```javascript
Math.floor(Math.random() * 256)   // entero de 0 a 255 por canal
`rgb(${r}, ${g}, ${b})`
```

Para que al inicio siempre salgan los mismos colores, se definen en el `:root` y se asignan con reglas `.color:nth-child(n)`. El estilo en línea que escribe JS tapa esas reglas al hacer clic.

---

## Pregunta 14
(captura) El background del botón y la tarjeta cambian al tiempo pero a veces se ve el cuadro del botón.
Ya cambié el fondo a transparent, ayudó mucho.

## Respuesta 14
El `<button>` trae su propio fondo gris del navegador. Con `background: transparent` deja ver el color de la tarjeta, sin depender de ninguna `transition`.

---

## Pregunta 15
Todos los colores cambian al tiempo (código con `randomArray`).
Entonces si son 10 tarjetas, o el cliente quiere agregar más colores, ¿siempre es mejor tener un array por tarjeta?
No sé cómo se hace eso.

## Respuesta 15
Todas salían iguales porque los números se generaban una sola vez, fuera del `forEach`. La generación debe ocurrir dentro de la vuelta de cada tarjeta.
Lo escalable es un único array donde cada posición representa una tarjeta (`palette`), y cada posición guarda los datos de ese color. Un objeto agrupa datos con `nombre: valor`, y se llena con `push`:

```javascript
const palette = [];
palette.push([12, 200, 90]);
```

Se guardan copias de los valores, no la misma referencia: si se hace `push(firstArray)` todas las posiciones apuntan al mismo array y muestran el último color.

---

## Pregunta 16
Cómo se traduce rgb a hex.
Cómo funciona HSL entonces?
(código de `randomArray` con `number=` y luego con `(i)`) y "cómo sería el código".

## Respuesta 16
Cada canal (0 a 255) se pasa a base 16 con `toString(16)`, se rellena a dos dígitos con `padStart(2, '0')` y se une con `#`.

```javascript
function rgbToHex(r, g, b) {
    const toHex = c => c.toString(16).toUpperCase().padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
```

HSL describe un color con tono (0 a 360 grados), saturación (0 a 100%) y luminosidad (0 a 100%). Es más intuitivo para generar paletas armoniosas.
En `randomArray`, dentro de `forEach((number, i) => ...)` el primer parámetro es una copia del valor, así que asignarle algo no cambia el array. El índice es el segundo parámetro:

```javascript
function randomArray(array) {
    array.forEach((_, i) => {
        array[i] = Math.floor(Math.random() * 256);
    });
}
```

---

## Pregunta 17
Cómo es para poner border nuevamente.
Por qué no me ocupa toda la pantalla (CSS de `.hero` y `.color` pegado).
Pero se le puede poner propiedad flex a un grid?

## Respuesta 17
`border: 1px solid black;` (grosor, estilo, color). Sin el estilo el borde no aparece.
No ocupaba toda la pantalla porque `.color` no tenía `flex`, así que cada tarjeta medía lo que medía su contenido. Faltaba `flex: 1` en las tarjetas, `box-sizing: border-box` y cambiar `width: 100vw` por `100%`.
Sí se le puede poner `flex` a un elemento que es grid por dentro: `flex` depende del `display` del padre.

---

## Pregunta 18
Tengo una clase y quiero agregarle a cada miembro de esa clase un background color diferente, el background color está en el root.
Si quiero que JS cambie los valores de la variable y no el background color, para que con eso cambie también el shadowing, se puede?
Cómo se puede reemplazar `padding-bottom: 3rem; padding-top: 3rem;`

## Respuesta 18
Con `:nth-child(n)` se asigna `background-color: var(--color-n)` a cada tarjeta. Si el fondo y las sombras leen la misma variable con `var()`, JS solo cambia la variable con `setProperty` y todo se actualiza. Las variables se heredan: una tarjeta que no define la suya usa la del `:root`.
Las dos líneas de padding se reemplazan por `padding-block: 3rem;` (o `padding: 3rem 0;`, que también pisa los lados).

---

## Pregunta 19
Cómo creo un array de variables de color de root css.
Pero con document.documentElement agarro todo el root no?
getPropertyValue se usa junto a getComputedStyle?
Cómo es el código. Qué hace trim. Map es como el for each? Entonces map es como el for normal. Qué hace rootStyles.

## Respuesta 19
CSS no tiene arrays: se crea uno en JS con los nombres de las variables y se leen sus valores.

```javascript
const colorVars = ["--color-1", "--color-2", "--color-3"];
const rootStyles = getComputedStyle(document.documentElement);
const colorValues = colorVars.map((name) => rootStyles.getPropertyValue(name).trim());
```

- `document.documentElement` es el elemento `<html>`, donde vive `:root`.
- `getComputedStyle(...)` devuelve todos los estilos calculados, y `getPropertyValue("--nombre")` lee solo la variable que pides. Con variables CSS es obligatorio.
- `trim()` quita los espacios del inicio y del final (el navegador suele devolver el valor con un espacio delante).
- `rootStyles` es solo un nombre de variable que guarda ese objeto.
- `forEach` hace algo con cada elemento y no devuelve nada. `map` transforma cada elemento y devuelve un array nuevo, y necesita `return`. Un `for` clásico permite `break` y `continue`.
- El array es una copia en texto: cambiarlo no cambia el CSS. Para escribir en la variable se usa `setProperty`, y para volver al valor del CSS, `removeProperty`.

---

## Pregunta 20
`getComputedStyle(color.backgroundColor);`
Si saco el background color de esta función me queda el primer color, why. (código con `background1`)
Hay algo que lea en tiempo real el background y que cambie dinámicamente sin que esté en la función?
O sea, en lugar de leer el background guardar en un array el conjunto de variables random que genere.

## Respuesta 20
`getComputedStyle` recibe el elemento, no la propiedad: `getComputedStyle(color).backgroundColor`.
`background1` se calcula antes de `randomPalette()`, así que guarda una foto del color anterior. Si se lee después, la `transition` apenas empieza y todavía devuelve el valor de partida. Leer `style.backgroundColor` devuelve de inmediato lo que JS acaba de escribir.
Hay opciones en tiempo real (`MutationObserver`, `transitionend`, `requestAnimationFrame`), pero la mejor es guardar los datos que uno mismo genera y leer de ahí. Los datos son la fuente de verdad y el DOM solo los muestra.

---

## Pregunta 21
Cómo funciona array prototype push.
Cómo lo agregaríamos a esta función (`randomArray`).
Así va el código (`randomPalette` con `palette.push`).
Esto está bien? (`rgbToHex` con `let toHex`) y `console.log(rgbToHex(palette[0]))`.
Los tres puntos siempre pasan los elementos como número y todos los elementos?

## Respuesta 21
`push(valor)` agrega al final y modifica el array original. Con `const` se puede usar `push` (no se puede reasignar, pero sí modificar el contenido).
`push` no va dentro de `randomArray`: va en `randomPalette`, después de llamar a `randomArray`, con un objeto o array nuevo con los tres valores copiados. `palette` se declara fuera de las funciones y se vacía con `palette.length = 0` (con `const` no se puede reasignar). Un error de tipeo (`pallete` en vez de `palette`) dio `ReferenceError`.
`rgbToHex(palette[0])` falla porque `rgbToHex` espera tres números y recibe un array. El spread abre el array: `rgbToHex(...palette[0])`. Pasa todos los elementos, en orden, tal como son (no los convierte a número), y solo funciona en llamadas a función, arrays y objetos, no dentro de `${}`.

---

## Pregunta 22
Cómo agregaríamos el `newColor`. Se puede poner en un foreach? Cómo saber exactamente que quiero 1 o 3 colores? (código con `cloneNode`).
Clone node existe en JS básico? Clone element?
Tendría que cambiarle el nombre a color 7, y cómo se agregaría al hero?
No sé cómo se agarra el header dentro de la clase.

## Respuesta 22
Para sumar una tarjeta se clona una existente y se inserta:

```javascript
const newColor = befColor.cloneNode(true);
newColor.querySelector('h2').textContent = "Color 7";
hero.append(newColor);
```

- `cloneNode` es parte del DOM del navegador (no existe `cloneElement`, que es de React). `true` copia también los hijos. No copia los eventos.
- `append` va sobre `.hero`. Un mismo nodo solo puede estar en un lugar: para agregar varias tarjetas hay que clonar dentro del ciclo en cada vuelta.
- `elemento.querySelector("h2")` busca solo dentro de ese elemento. `textContent` va pegado al `h2`, no a la tarjeta.
- Para repetir un número de veces se usa un `for` clásico: la cantidad es la diferencia entre lo elegido y `colors.length`.
- `befColor` es la tarjeta original (Color 1) y `newColor` es la copia en memoria hasta que se inserta.
- El `;` va al final de cada instrucción, no después de la llave de una función declarada con `function`.

---

## Pregunta 23
(código de `rgbToHsl`) Cómo se vería arreglado.
Porque dices que es contraria al proyecto. Estoy usando todo en rgb para cambiar de fondo pero para mostrar se mostrará en HSL y HEX que son más fáciles de guardar.
Qué significa el `?` después de la constante `s`.
`console.log(rgbToHsl(palette[0]))` y `hsl.textContent = "HSL" , rgbToHsl(...palette[i]);`

## Respuesta 23
La versión corregida calcula la luminosidad `l = (max + min) / 2`, devuelve de inmediato `[0, 0, luminosidad]` si es un gris (`d === 0`), calcula la saturación según `l <= 0.5` y el tono con tres casos según el canal máximo, y devuelve un array `[h, s, l]`.

```javascript
function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const d = max - min;
    const l = (max + min) / 2;
    if (d === 0) return [0, 0, Math.round(l * 100)];
    const s = l <= 0.5 ? d / (max + min) : d / (2 - max - min);
    let h;
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h = (Math.round(h * 60) + 360) % 360;
    return [h, Math.round(s * 100), Math.round(l * 100)];
}
```

Errores de la versión anterior: usaba `h` para la luminosidad, comparaba con `0,5` (coma) en vez de `0.5`, usaba `=` en vez de `===`, faltaban fórmulas y `return (h, s, l)` devuelve solo el último valor por el operador coma.
Generar en RGB y convertir para mostrar es válido; la función que falta si se genera en HSL es `hslToRgb`.
El `?` es el operador condicional: `condición ? siSí : siNo`, un `if/else` que devuelve un valor.
`rgbToHsl(palette[0])` necesita el spread. Y `"HSL" , rgbToHsl(...)` solo asigna "HSL": para unir texto y valores se usa un template literal:

```javascript
const [h, s, l] = rgbToHsl(...palette[i]);
hsl.textContent = `hsl(${h}, ${s}%, ${l}%)`;
```

---

## Pregunta 24
Contraste de las letras en un color oscuro cómo se calcula?
(función `contrast` con `lum`) Pero me estás diciendo contraste como si fuera más de un color pero solo estoy calculándolo de 1 color no?
Solo quiero que si el color es muy negro yo sepa que tengo que cambiar la letra a blanco y ya.
Sigo sin entender por qué solo esta función no puede funcionar. `return >= ?=?`
(código de `randomPalette` con `lumus`) Cómo es el código? Un forEach dentro de otro forEach?

## Respuesta 24
El contraste WCAG compara las luminosidades de dos colores. Aquí basta saber si el fondo es oscuro: se calcula su luminosidad y se compara con un umbral (0.5 en la versión simple). La función necesita un `return`: sin él calcula `lum` y nadie recibe el resultado.

```javascript
function lumus(r, g, b) {
    r = r / 255; g = g / 255; b = b / 255;
    const lum = (0.2126 * r) + (0.7152 * g) + (0.0722 * b);
    return lum < 0.5 ? "white" : "black";
}
```

La comparación va dentro del `return` (`return lum < 0.5;`), con un valor a cada lado del operador. `color` solo existe dentro del primer `forEach`, así que el color del texto va en la misma vuelta que el fondo, sin anidar un segundo `forEach` (que recorre de más):

```javascript
colors.forEach((color) => {
    randomArray(firstArray);
    const arrayRgb = [firstArray[0], firstArray[1], firstArray[2]];
    palette.push(arrayRgb);
    color.style.backgroundColor = `rgb(${arrayRgb[0]}, ${arrayRgb[1]}, ${arrayRgb[2]})`;
    color.style.color = lumus(...arrayRgb);
});
```

Los colores medios pueden quedar justo en el límite. La versión exacta de WCAG corrige cada canal y cruza en `0.179`.

---

## Pregunta 25
Color no afecta botones verdad? Es un button.
Cómo se hace para que el cursor cambie a la manita en el hover y también resaltar bordes de botón.
Por qué aunque le agrego padding el border line sigue pegado al botón (CSS pegado).

## Respuesta 25
`color` se hereda, pero un `<button>` trae su propio color del navegador, así que hay que poner `color: inherit` en `.color button`.
La manita es `cursor: pointer`. Para resaltar el borde en hover se cambia `border-color`, o se usa `box-shadow`/`outline` para no mover el diseño. Nunca el grosor del borde, porque el botón crece.
El borde pegado era el `outline: auto` de `button:hover`, que se dibuja pegado a la caja del botón, y el padding no lo aleja. `outline-offset` lo separa sin cambiar el tamaño:

```css
button:hover {
    outline: 2px solid currentColor;
    outline-offset: 4px;
    border-radius: 8px;
    cursor: pointer;
}
```

También sobraban un `background-color` duplicado y variables repetidas (`--color-7`, `--color-8` y `--color-9` con el mismo valor).

---

## Pregunta 26
Cómo hacer que cuando uno le dé click al ícono que es un header cargue la página nuevamente.
Cómo funciona el `<a>` nuevamente? Quitarle el link style.

## Respuesta 26
Lo más simple es un enlace sin JavaScript: el ícono dentro de `<a href="index.html" aria-label="...">`. Con `href="#"` no recarga. La alternativa es `location.reload()` en un listener de clic.
Un `<a>` trae manita, teclado y lectores de pantalla. Para quitarle el aspecto de enlace:

```css
a { color: inherit; text-decoration: none; }
```

Un enlace no debe envolver un `<button>` (dos elementos interactivos anidados).

---

## Pregunta 27
(captura) Cómo se crea esto? (tooltip oscuro "New AI tools")
Cómo le pongo title a un botón. Qué calcula el tiempo del tooltip?

## Respuesta 27
Con el atributo `title="Texto"` basta para un tooltip nativo (el navegador decide estilo y tiempo, y no aparece con teclado ni en celular).
Con CSS: el elemento lleva `position: relative`, el texto va en `data-tooltip`, y un `::after` con `content: attr(data-tooltip)` dibuja la caja (fondo oscuro, texto blanco, `border-radius`, `position: absolute`) con una flechita en `::before`. Se oculta con `opacity: 0` y `visibility: hidden` y se muestra en `:hover` y `:focus-visible`.
El tiempo se controla con `transition-delay` (espera antes de aparecer) y `transition-duration`. Si se usa `data-tooltip`, no se debe dejar también `title`, porque aparecen los dos.
Para un botón que solo tiene ícono, se agrega además `aria-label`.

---

## Pregunta 28
(captura de un botón) Cómo hago para que agarre el color del fondo y solo lo cambie un poco.
Vi un efecto que se aplicaba a las letras: cada letra cambiaba a un color diferente si el mouse pasaba por encima. (Se dejó para el final.)

## Respuesta 28
Una capa translúcida sobre el fondo de la tarjeta: `background-color: rgba(255, 255, 255, 0.25)` aclara y `rgba(0, 0, 0, 0.15)` oscurece cualquier color. Otra opción es `color-mix(in srgb, currentColor 15%, transparent)`, que se adapta al texto blanco o negro. Un color fijo como `var(--color-1)` no sigue el de la tarjeta cuando JS lo cambia.
El efecto de letras requiere separar el texto en un `<span>` por letra con `split("")` y `createElement`, y asignar un color aleatorio en `mouseenter`. Quedó pendiente.

---

## Pregunta 29
Ahora quiero agregar dinámicamente el resto de colores de 6 a 9.
Number? Estoy tratando de traer el contenido pero me trae todo, no solo lo que está selected. Value era el que necesitaba.
(código del handler) Solo agrega una. Cómo se nombra la variable para que aumente `i++`.
(código con `Math.abs`) Ahora el problema es que el length de colors no cambia dinámicamente.
Corrige este código.

## Respuesta 29
El dropdown decide cuántas tarjetas hay: se compara lo elegido con `colors.length`; si faltan se clonan y si sobran se quitan.
- `Number()` convierte el texto a número: `dropdown.value` siempre llega como texto (`"6"`).
- `dropdown.textContent` devuelve el texto de todas las opciones juntas. `dropdown.value` devuelve el valor de la elegida.
- Solo agregaba una porque `newColor` era un único nodo y `append` lo movía: hay que clonar dentro del ciclo.
- `for (let i = 0; i < cantidad; i++)`: `i++` suma 1 en cada vuelta y debe declararse con `let`.
- `Math.abs` borra el signo, así que no distingue agregar de quitar. Se guarda la resta sin `abs` y se decide con ella.
- `querySelectorAll` devuelve una lista fija: hay que volver a leerla después de agregar o quitar, y `colors` debe ser `let`. Dentro de la función no se escribe `let colors`, porque crea otra variable y tapa a la de afuera.

```javascript
const addNumber = Number(dropDown.value);
const dif = addNumber - colors.length;

if (dif > 0) {
    for (let index = 0; index < dif; index++) { /* clonar y agregar */ }
} else if (dif < 0) {
    for (let index = 0; index < Math.abs(dif); index++) {
        colors[colors.length - 1 - index].remove();
    }
}
```

---

## Pregunta 30
Cómo hacer que cada nuevo color cuando se agregue se vea smooth y no solo aparezca.
No sé nada de keyframes o transition, me puedes dar el código y explicarlo.
Ahora para remover colores una animación?

## Respuesta 30
Una `transition` solo anima cuando una propiedad cambia, y la tarjeta nueva nace con su valor final. Un `@keyframes` define el recorrido completo y arranca solo al aparecer.

```css
@keyframes entrar {
    from { flex-grow: 0; opacity: 0; }
    to   { flex-grow: 1; opacity: 1; }
}
.entrando { animation: entrar 0.4s ease; }

@keyframes salir {
    from { flex-grow: 1; opacity: 1; }
    to   { flex-grow: 0; opacity: 0; }
}
.saliendo { animation: salir 0.4s ease forwards; }

.color { overflow: hidden; }
```

En JS, al agregar: `newColor.classList.add("entrando")` antes del `append`. Al quitar: se agrega `saliendo` a las tarjetas que sobran y un `setTimeout` de 400 ms (la misma duración) las borra con `remove()`. `forwards` mantiene el estado final para que no parpadee. Un error típico fue usar `newColor` antes de declararlo con `const`.

---

## Pregunta 31
Cuando los saco del for each y le doy random no actualiza los HSL o hex.
Los hsls son los títulos en realidad.
No quiero que se vuelva a generar luego de que uno selecciona los colores.
Arregla este código entonces, creo que muchas cosas que sugieres ya las tengo.

## Respuesta 31
`hexs` y `hsls` eran listas fijas tomadas al cargar la página, y quedaban desactualizadas al agregar o quitar tarjetas. Además, si el `forEach` de `randomPalette` recorría la lista vieja, las tarjetas nuevas no recibían HEX ni HSL, y al bajar de cantidad `palette[8]` daba `undefined`.
La solución final separa el trabajo de pintar una sola tarjeta, y relee la lista de tarjetas:

```javascript
function refreshLists() {
    colors = document.querySelectorAll('.color');
}

function paintCard(card, i) {
    randomArray(firstArray);
    const arrayRgb = [firstArray[0], firstArray[1], firstArray[2]];
    palette[i] = arrayRgb;
    card.style.backgroundColor = `rgb(${arrayRgb[0]}, ${arrayRgb[1]}, ${arrayRgb[2]})`;
    card.style.color = lumus(...arrayRgb);
    card.querySelector('.hex').textContent = rgbToHex(...arrayRgb);
    const [h, s, l] = rgbToHsl(...arrayRgb);
    card.querySelector('h2').textContent = `hsl(${h}, ${s}%, ${l}%)`;
}

function randomPalette() {
    refreshLists();
    palette.length = 0;
    colors.forEach((card, i) => paintCard(card, i));
}
```

Al agregar tarjetas solo se pintan las nuevas (desde `oldLength`), y al quitar se recorta `palette.length = colors.length` tras borrarlas. El botón del header llama a `randomPalette()`. Como el `h2` muestra el HSL, ya no se numeran los títulos.

---

## Pregunta 32
(captura de la consigna) Nos falta algo de la consigna?
Ya tenemos de botones, le agregué title a todos.

## Respuesta 32
Cumplido: botón "Generar paleta", colores aleatorios, render dinámico por tamaño.
Faltaba o quedaba a medias: microfeedback visible (el `title` es un tooltip nativo, pero solo con mouse y describe antes de la acción, no responde), `<label>` asociado al `select`, foco visible con `:focus-visible`, contraste exacto (el umbral 0.5 es una aproximación) y semántica (el `h2` ahora muestra un dato, no un título). Se recomendó un toast con `role="status"`, `aria-label` en botones con solo ícono y un label oculto para el dropdown.

---

## Pregunta 33
Ahora el lock color y el favorites, estaba pensando en agarrar el color del fondo de donde se haga click en el lock.
Cómo se escribe el closest? Qué hace event nuevamente?
No se puede poner nuevamente el event listener en el botón porque se agrega dinámicamente con cada nuevo color, no?
Por qué debería agregar el closest a color? Pero el closest agarra todo el color y el lock ya está trayendo la clase, no?
(código del listener) pero qué me faltó entonces. El background del botón no se queda estático cuando lo oprimo, es normal? Pensé que eso ya lo hacía `setAttribute('aria-pressed', ...)`. El código de JS es con un if then. Cómo es con CSS.

## Respuesta 33
El Lock marca la tarjeta, no guarda el color: lo que se lee en `randomPalette` es el estado de la tarjeta.
- `elemento.closest('.color')` sube por el DOM desde el elemento hasta el primer ancestro que coincide con el selector (o `null`).
- `event` es el objeto que el navegador entrega al listener: `event.target` es el elemento exacto pulsado (puede ser el ícono) y `event.currentTarget` es donde está el listener.
- `cloneNode` no copia los eventos: se usa delegación, un solo listener en `.hero` que revisa con `closest` qué botón se pulsó.
- `lock` (clase del botón) identifica el botón. `locked` es el estado y se pone en la tarjeta con `toggle`, que es donde `randomPalette` lo busca.

```javascript
hero.addEventListener('click', function (event) {
    const lockBtn = event.target.closest('.lock');
    if (!lockBtn) return;
    const card = lockBtn.closest('.color');
    card.classList.toggle('locked');
    lockBtn.setAttribute('aria-pressed', card.classList.contains('locked'));
});

function randomPalette() {
    refreshLists();
    colors.forEach((card, i) => {
        if (card.classList.contains('locked')) return;
        paintCard(card, i);
    });
}
```

`palette.length = 0` se quita para no borrar el color de las tarjetas bloqueadas. Los clones deben empezar sin `locked` (`classList.remove('locked')`).
`aria-pressed` solo informa a los lectores de pantalla: no cambia el aspecto. Para que el botón se vea marcado se usa un selector de atributo en CSS, que no deja estilos en línea:

```css
.lock[aria-pressed="true"] { background-color: rgba(0, 0, 0, 0.3); }
```

Con JS sería un `if/else` que pone y quita `style.backgroundColor` (JavaScript no tiene "then").

---

## Pregunta 34
Para agregar a favoritos se puede usar la misma fórmula de closest, no?
Estoy pensando en un array que guarde hasta 6 colores como favorites en hex y hsl... Y si hacemos mejor que con el botón de favorites se guarde en el local storage y que luego el botón del header de corazón los copie casi todos en el portapapeles.
Retomemos lo de local storage. Cómo funciona some? Necesito crear una variable array con 0 elementos? Cómo funciona localStorage? Si le doy getItem dónde muestra el item? Cómo funciona el portapapeles? Se les puede poner el mismo ID a cada item de local storage? Solo quiero guardar el HEX. Por qué agregar filter ahora? No quiero quitarlo, solo que si ya está no se agregue. Esto debería funcionar o tengo que ponerle igual a true? Splice reemplaza el último valor, cómo hago para que reemplace el primero y luego el segundo.

## Respuesta 34
Sí, es el mismo patrón: un listener en `.hero` con `closest('.heart')` y `closest('.color')`. Si hay dos botones (Lock y Save) no conviene un `return` al inicio que corte el listener entero: se usan `if` independientes o dos listeners.
- `localStorage` guarda pares clave/valor, siempre como texto, por sitio y por navegador (unos 5 MB). `setItem` guarda, `getItem` devuelve el texto (o `null` si no existe, y no muestra nada por sí solo), `removeItem` borra y `clear` limpia todo.
- Un array se guarda con `JSON.stringify` y se lee con `JSON.parse` (dentro de un `try/catch`). `JSON.stringify(favorites);` suelto no hace nada: va como segundo argumento de `setItem`.
- La clave no puede repetirse: la misma clave reemplaza el valor anterior. Se usa una sola clave (`"favorites"`) con todo el array.
- `some()` responde si algún elemento cumple una condición. Con textos sueltos (solo HEX) alcanza `includes()`. Una condición como `if (favorites.includes(hex)) { ... }` ya funciona sin `=== true`, pero necesita un `return` dentro para no seguir agregando.
- `favorites` empieza como array vacío (`let favorites = []`) y al cargar la página debe nacer de lo guardado.
- Para reemplazar siempre el más antiguo, es más simple `shift()` (quita el primero) y luego `push(hex)`, que un contador con `%` o `splice` con posición fija.
- `filter` solo hace falta si se quiere quitar un favorito; como no se quiere, queda fuera.
- Portapapeles: `navigator.clipboard.writeText(texto)` devuelve una promesa y solo funciona en HTTPS o `localhost`, dentro de un clic y con la página enfocada.

Estructura acordada para el listener:

```javascript
const hex = card.querySelector('.hex').textContent;
if (favorites.includes(hex)) { setToastMessage("Already added"); return; }
if (favorites.length >= 6) favorites.shift();
favorites.push(hex);
localStorage.setItem("favorites", JSON.stringify(favorites));
```

Un error de orden frecuente fue usar `cardH` antes de declararlo con `const`.

---

## Pregunta 35
Traté de publicar la página pero creo que el script no funciona desde github.
(captura) Failed to load resource... 404. Script está dentro de otro folder llamado script.
(captura) GET https://jricorojas.github.io/script/script.js 404.
Por qué aunque cambie el código sigue mostrando el anterior en la página.
(captura de Network) 

## Respuesta 35
Un 404 en `script.js` es un problema de ruta o de archivo no subido. La URL del error mostraba `jricorojas.github.io/script/script.js`, sin el nombre del repositorio, porque el `src` empezaba con `/`: una ruta con barra inicial se resuelve desde la raíz del dominio y falla en una página de proyecto (`usuario.github.io/NombreDelRepo/`).
Se arregla con una ruta relativa que incluya la carpeta y sin barra inicial: `src="script/script.js"`. GitHub Pages distingue mayúsculas de minúsculas.
Si sigue el código viejo: revisar `git status`, `git add .`, `git commit`, `git push`; que el archivo en github.com tenga el cambio; que el despliegue de la pestaña Actions termine en verde; recargar con `Ctrl+Shift+R` o probar en incógnito; y confirmar en Settings, Pages, la rama y carpeta publicadas. En la pestaña Network, la pestaña Response de `script.js` muestra qué versión se está sirviendo. El 404 de `favicon.ico` no afecta.

---

## Pregunta 36
Hay alguna clase de bloqueo en el copy paste del navegador? Aunque se haya publicado en github.
Cómo pongo el .catch y dónde? El .then.
Una clase, aunque sea solo una, no se puede copiar en el clipboard?

## Respuesta 36
`navigator.clipboard.writeText` exige contexto seguro (HTTPS: GitHub Pages lo cumple), un gesto directo de la persona (dentro del clic), foco en la página (con F12 abierto y el cursor en la consola puede fallar) y puede estar bloqueado en un `iframe`.

```javascript
navigator.clipboard.writeText(texto)
    .then(() => { /* toast de "copiado" */ })
    .catch((error) => { console.log(error); /* toast de error */ });
```

`.then` se ejecuta si la copia salió bien y `.catch` si falló, y el `;` va solo al final de la cadena. El toast de éxito va dentro del `.then`, no debajo: si no, aparecería aunque la copia fallara.
Lo que se copia es el texto de un elemento, no la clase: se busca con `querySelector` y se lee su `textContent` (con `trim()`). `user-select: none` en el CSS es otro tipo de bloqueo.

---

## Pregunta 37
Quitar recomendaciones de VS again.
(captura del settings.json) No quiero que quite todas las recomendaciones, solo el código que me generaba de más.

## Respuesta 37
Para quitar solo el código gris que se escribe por ti (sugerencias en línea) basta una línea en `settings.json`:

```json
"editor.inlineSuggest.enabled": false
```

No toca el IntelliSense normal (el menú desplegable), ni Emmet ni el panel de chat. JSON exige una coma entre cada par: hay que agregar una coma después de la última línea que ya existía.

---

## Pregunta 38
Pasa algo con el toast: si oprimo muy rápido el botón a veces se borra más rápido, es normal?
Clase de un texto pequeño en html span? Cambiar visibility con js. Change text content again.
`favoritesList.textContent = "Favorites ", favorites;`
Los toast suelen ir así (HTML con varios `div`). Qué hace role? No sabía que la función showToast() existía, cómo funciona?
(código de `setToastMessage`) No creo que necesite una constante o variable ahí, o sí?

## Respuesta 38
Es normal: cada clic crea un `setTimeout` nuevo y el anterior sigue vivo, así que el del primer clic oculta el toast aunque el segundo lo acabe de mostrar. Se arregla guardando el temporizador en una variable fuera de la función y cancelándolo con `clearTimeout`.
- Un texto pequeño se puede hacer con `<small>` o con un `<span>` y una clase propia (`font-size: 0.75rem`, sin bajar de unos 12px).
- `visibility` se cambia mejor con una clase (`classList.add/remove`) y el CSS con `transition`, que con `style.visibility`.
- `textContent` cambia el texto de un elemento: `elemento.textContent = "Nuevo"`. La coma no une textos: se usa un template literal, por ejemplo `` `Favoritos: ${favorites.join(", ")}` ``.
- Con varios `div` de toast hay `id` repetidos (`toast-copy` dos veces) y cada uno necesita su temporizador. Es más simple un solo toast reutilizado.
- `role="status"` le dice a los lectores de pantalla que el elemento es un mensaje de estado y que anuncien sus cambios de texto. El contenedor debe estar siempre en la página.
- `showToast` no existe en JavaScript: es una función propia, con el nombre que se elija (aquí `setToastMessage`). En `const toast = document.getElementById("toast").textContent = message;` la constante guardaba el texto y no el elemento, por la asignación encadenada. El elemento se busca una vez, fuera de la función.

```html
<div id="toast" class="toast" role="status"></div>
```

```css
.toast {
    position: fixed;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    background-color: #222;
    color: white;
    padding: 0.75rem 1.25rem;
    border-radius: 8px;
    font-size: 0.875rem;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transition: opacity 0.3s ease, visibility 0.3s ease;
}
.toast.show { opacity: 1; visibility: visible; }
```

```javascript
const toast = document.getElementById("toast");
let toastTimer;

function setToastMessage(message) {
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);
}
```

Se llama con `setToastMessage("New palette")` o `setToastMessage("Already added")`.

---

## Pendientes
- El efecto de letras de colores al pasar el mouse (Pregunta 28).
- Favoritos con localStorage y el botón de corazón del header que copia la lista (Pregunta 34).
- Revisar el contraste con la fórmula exacta de WCAG (Pregunta 24).
- Agregar `<label>` al dropdown y estilos de `:focus-visible` (Pregunta 32).
