# Plantilla de visor cartográfico municipal

Plantilla reutilizable basada en HTML, CSS, JavaScript, Leaflet y GeoJSON. La personalización habitual se realiza en `config/config.js`; los datos se mantienen en `data/` y los recursos gráficos en `images/`.

## Crear un visor nuevo

### Búsqueda de direcciones del PRC

Se configura en `appConfig.herramientas.geocodificacion`, dentro de `config/config.js`.
`enabled` activa el buscador en el espacio de búsqueda habitual. Tiene prioridad si
la búsqueda de capas también está activada; al deshabilitarlo se respeta el estado
de `herramientas.busqueda.enabled`. Los clics y popups de las capas se conservan.

Complete `apiKey` con una clave de Geoapify habilitada para uso desde navegador.
Esta clave será visible en el código y las solicitudes: restrinja los sitios
permitidos desde el proyecto de Geoapify, incluyendo el origen local de prueba y
el dominio de publicación. No utilice una clave secreta de servidor. Si necesita
ocultar la credencial, será necesario un servicio intermediario.

La consulta se ejecuta con Enter o la lupa, nunca al escribir. `contexto` agrega
Nueva Imperial, Chile, y `pais` filtra Chile. `capaLimite` y `margenMetros` delimitan
un rectángulo alrededor del límite urbano con 500 metros de margen; no es un
recorte por el polígono exacto. Si la capa no carga, no se consulta sin restricción.
Se conservan ceros iniciales como `0145`. La cruz limpia texto, resultados y marcador.

Las coincidencias aproximadas se identifican según la respuesta del proveedor;
no se certifica precisión predial ni se asigna automáticamente una zona normativa.
Se muestran los créditos de Geoapify y OpenStreetMap incluso con fondo satelital.
Sin clave aparece un aviso al buscar. También hay avisos para falta de resultados,
credencial rechazada, cuota agotada, conexión y tiempo de espera.

Pruebas: `node --test tests/*.test.cjs`. La verificación inicial de interfaz usó
respuestas simuladas; la consulta real requiere configurar la clave de la cuenta.

### Preparación de archivos

1. Duplique la carpeta completa de la plantilla.
2. Copie las nuevas capas GeoJSON dentro de `data/`.
3. Copie el logo y otros recursos gráficos dentro de `images/`.
4. Modifique la identidad, la vista inicial, las herramientas y las capas en `config/config.js`.
5. Abra el visor mediante un servidor local y compruebe cada capa antes de agregar la siguiente.

> No es necesario modificar `layers.js`, `ui.js` ni los demás archivos JavaScript para configurar un visor normal.

## Dónde personalizar

- `config/config.js`: es el centro de configuración. Cada valor editable incluye un comentario breve a su derecha.
- `css/styles.css`: cambie principalmente las variables del inicio y las clases de etiquetas señaladas como personalizables.
- `index.html`: modifique solamente textos de respaldo o íconos si quiere reemplazar los símbolos visibles.
- `js/`: contiene la lógica interna. Sus encabezados indican desde qué sección de `config.js` se controla cada función.

Los comentarios están pensados como ayuda de aprendizaje. No es necesario modificar todos los valores: duplique la plantilla y cambie solo los que correspondan al nuevo visor.

## Organización principal de `config.js`

- `aplicacion`: títulos, institución y logo.
- `mapa`: vista inicial y límites generales de zoom.
- `mapasBase`: fondos cartográficos disponibles.
- `herramientas`: búsqueda, geolocalización, coordenadas, medición, Google Maps y descargas.
- `gruposCapas`: orden de las secciones del panel de capas.
- `capas`: archivo, comportamiento, información y simbología de cada capa.

Todas las herramientas generales quedan habilitadas en la plantilla base. Para ocultar una herramienta en un visor particular, cambie su propiedad `enabled` a `false`.

El botón **Capas** está a la izquierda, debajo del buscador. Las demás herramientas permanecen abajo a la derecha. Sus botones muestran una ayuda al mantener el cursor encima, también cuando el diseño responsivo oculta el texto.

### Leyenda plegable

La pestaña con flecha permite esconder la leyenda hacia la izquierda y recuperarla sin perder espacio útil del mapa. Se controla desde `herramientas.leyenda`:

```js
leyenda: {
    plegable: true,          // Muestra la pestaña lateral.
    colapsadaInicial: false  // true inicia con la leyenda escondida.
}
```

## Guía rápida de apariencia en `styles.css`

`config/config.js` controla qué muestra y cómo se comporta el visor. `css/styles.css` controla colores, tamaños, espacios, bordes y adaptación a pantallas pequeñas. Los bloques más habituales son:

- `:root`: colores generales, altura del encabezado, bordes y sombras.
- `.feature-info-panel`: fondo, fuentes y dimensiones del panel lateral.
- `.map-legend`: ancho, altura, fondo y separación de la leyenda.
- `.leaflet-tooltip.etiqueta-...`: apariencia propia de las etiquetas de cada capa.
- `@media (...)`: ajustes responsivos para teléfonos y pantallas pequeñas.

Para transparencia use `rgba(rojo, verde, azul, opacidad)`, donde la opacidad va de `0` a `1`. Para personalizar una etiqueta sin afectar otras capas, copie una clase `.leaflet-tooltip.etiqueta-...` y vincule su nombre mediante `etiquetado.claseCss`.

## Agregar una capa

Al final de `config.js` existe un objeto comentado llamado **PLANTILLA PARA AGREGAR UNA CAPA NUEVA**. Cópielo dentro de `appConfig.capas` y complete sus valores.

Revise especialmente:

- `id`: identificador único, sin espacios.
- `archivo`: ruta exacta al GeoJSON dentro de `data/`.
- `grupo`: debe coincidir con un grupo definido en `gruposCapas`.
- `enabled`: incluye o excluye completamente la capa.
- `visibleInicial`: define el estado inicial de una capa temática.
- `interactive`: permite o impide la interacción con sus entidades.
- `opacityControl`: muestra el control de transparencia.
- `cluster`: agrupa entidades; úselo solamente con capas de puntos.
- `minZoom` y `maxZoom`: rango visible de la capa; `null` significa sin límite adicional.

Los nombres de campos son sensibles a mayúsculas, minúsculas y tildes. Deben escribirse exactamente como aparecen en las propiedades del GeoJSON.

## Información de capa y de entidades

Cada bloque cumple una función distinta:

- `metadata`: información general del dataset, como fuente, institución, actualización, escala y descripción. Se abre con el ícono `i`.
- `infoCategorias`: información común de cada grupo de una simbología por valores únicos.
- `infoPanel`: información extensa de una entidad en un panel lateral.
- `popup`: información breve de una entidad sobre el mapa.

Para una misma capa normalmente se utiliza `popup` o `infoPanel`, según la cantidad de información que se quiera mostrar.

## Capas estructurales

Una capa como el límite comunal puede configurarse con:

```js
enabled: true,
estructural: true,
interactive: false
```

Estas capas permanecen visibles, se dibujan por encima de las demás, no bloquean la selección y aparecen en la leyenda. Para retirarlas completamente de un visor, cambie `enabled` a `false` o elimine su objeto desde `config.js`.

El bloque `simbologia.halo` permite generar el doble trazo que mantiene visible el límite sobre fondos claros u oscuros.

## Selección, búsqueda y etiquetado

- `seleccion.enabled`: permite seleccionar la entidad.
- `resaltado.enabled`: aplica el estilo de selección configurado.
- `busqueda.enabled`: incorpora la capa al buscador.
- `busqueda.modoResultado`: admite `resaltar`, `aislar` o `contrasteInverso`.
- `etiquetado.enabled`: activa las etiquetas.
- `etiquetado.zoomMin` y `zoomMax`: controlan cuándo aparecen.
- `etiquetado.claseCss`: permite aplicar un estilo particular definido en `styles.css`.
- `etiquetado.orientacion`: admite `horizontal` o `linea`; esta última usa un tramo recto local.

Las capas apagadas no se incluyen en la búsqueda cuando `soloCapasVisibles` está activado.

## Simbología

La propiedad `simbologia.tipo` admite:

- `simple`: un solo estilo para toda la capa.
- `valoresUnicos`: un estilo para cada categoría de un campo.
- `graduados`: clases de color construidas a partir de un campo numérico.

Los tres tipos funcionan con puntos, líneas y polígonos. En líneas use `color`, `weight` y `opacity`; en polígonos use además `fillColor` y `fillOpacity`. Para puntos, `simboloPunto` admite `marcador`, `circulo`, `cuadrado`, `triangulo` y `cruz`; `radius` ajusta el tamaño de las cuatro figuras vectoriales.

El resaltado usa un solo estilo adaptable: `fillColor` pasa a ser el color principal de una línea y genera un halo cuando se conserva el marcador tradicional.

En `estiloContrasteInverso.resto`, use conjuntamente `opacity` y `fillOpacity`: la primera atenúa líneas y bordes, y la segunda atenúa rellenos.

En valores únicos, `mostrarNoConfigurados: false` excluye del mapa las entidades cuyo valor no figura en `categorias`; también quedan fuera de la búsqueda y la selección. El valor predeterminado es mostrarlas con `estiloDefault`.

### Filtrar categorías de valores únicos

Agregue `filtroCategorias` dentro de `simbologia` para mostrar cajas de verificación en el panel **Capas**:

```js
filtroCategorias: {
    enabled: true,          // Activa el filtro.
    mostrarTodas: true,    // Muestra Todas y Ninguna.
    abiertoInicial: true   // Abre el listado al iniciar.
}
```

Cada elemento de `categorias` admite `visibleInicial: true` o `false`. Si se muestran valores no clasificados, `visibleDefaultInicial` controla su estado inicial. El checkbox principal sigue apagando la capa completa; los controles interiores afectan solamente sus categorías.

Las categorías apagadas se retiran del mapa, la búsqueda, las etiquetas y la leyenda. La selección se conserva durante la sesión y vuelve a sus valores iniciales al recargar la página.

### Información común por categoría

`infoCategorias` agrega un ícono `i` junto a cada valor único y reutiliza el panel lateral sin seleccionar ni acercar el mapa:

```js
infoCategorias: {
    enabled: true,                     // Habilita el ícono en cada categoría.
    mostrarCantidad: true,             // Cuenta las entidades automáticamente.
    etiquetaCantidad: "Cantidad de tramos",
    campos: [
        { campo: "empresa", etiqueta: "Empresa", formato: "texto" },
        { campo: "carpeta", etiqueta: "Tipo de carpeta", formato: "texto" }
    ]
}
```

Un valor común se muestra una sola vez. Si existen varios, el panel indica **Valores múltiples** y lista cada valor con su cantidad; si no hay datos, muestra **Sin información**. La lectura considera el GeoJSON completo, aunque la categoría esté apagada.

Cada categoría puede complementar esos datos con `informacion: { descripcion: "...", enlace: "...", textoEnlace: "..." }`. Esta información editorial no reemplaza la metadata de la capa ni el popup individual.

### Campos manuales y sumas automáticas

`metadata` e `infoCategorias` admiten dos complementos:

- `camposAdicionales`: pares de `etiqueta` y `valor` escritos manualmente.
- `estadisticas`: cálculos obtenidos desde un campo numérico del GeoJSON.

```js
camposAdicionales: [
    { etiqueta: "Estado de la información", valor: "Preliminar" }
],
estadisticas: [
    {
        operacion: "suma",          // Por ahora se admite suma.
        campo: "long_km",           // Campo numérico utilizado.
        etiqueta: "Longitud total",
        factor: 1,                  // 1 conserva la unidad; 0.001 convierte m a km.
        decimales: 2,               // Redondea el resultado después de sumar.
        sufijo: " km"
    }
]
```

En `metadata`, la suma considera toda la capa; en `infoCategorias`, solamente las entidades de la categoría abierta. Para un dato manual exclusivo de una categoría use `informacion.camposAdicionales` dentro de esa categoría.

Los campos de un popup también admiten `formato: "decimal"`, `factor`, `decimales`, `prefijo` y `sufijo`. Si se omite `factor`, se utiliza `1`.

`gruposCapas.ordenVisual` controla el orden: un número mayor se dibuja encima. Los límites con `estructural: true` conservan su nivel superior y no bloquean la interacción.

Al final de `config.js` existen ejemplos comentados de las tres estructuras. En valores únicos agregue tantas categorías como valores necesite representar. En graduados, cada clase excluye `min` e incluye `max`; use `max: null` en la última clase.

La leyenda detecta automáticamente puntos, líneas y polígonos. Los puntos con ícono muestran el mismo marcador del mapa; las líneas muestran su trazo y los polígonos su borde y relleno. No requiere una propiedad adicional en `config.js`. Los marcadores predeterminados de Leaflet no cambian de color mediante `fillColor`.

La prueba de regresión de la leyenda se ejecuta con Node.js: `node tests/legend.test.cjs`.

## Cómo llegar con Google Maps

`herramientas.googleMaps.enabled` muestra u oculta el botón **Cómo llegar**. `modoViaje` acepta `driving` (automóvil), `walking` (a pie), `bicycling` (bicicleta) o `transit` (transporte público).

Pulse **Cómo llegar**, acerque el mapa si es necesario y marque un destino. Revise el punto y pulse **Abrir Google Maps**. Puede cambiarlo con **Cambiar destino**, o cerrar y limpiar con **Cancelar**, la cruz o Escape. Al activar otra herramienta se cancela esta selección.

El destino solo se envía a Google al abrir el enlace. El visor no solicita la ubicación de origen ni calcula rutas; Google Maps permite indicar el origen y revisar las alternativas. No requiere una clave de API. Seleccione accesos reales, no el centro de predios o polígonos. La disponibilidad de rutas depende de Google Maps.

Prueba local sin abrir Google: `node tests/google-maps.test.cjs`.

## Publicar mapas PDF y capas KML

La herramienta **Descargas** está habilitada por defecto y se encuentra al final de la barra inferior derecha. Para ocultarla use `herramientas.descargas.enabled: false`.

1. Copie los PDF preparados en `descargas/mapas/` y los KML en `descargas/capas/`.
2. En `herramientas.descargas.archivos`, copie una entrada existente o active un ejemplo solamente después de alojar el archivo.
3. Complete `titulo`, `descripcion`, `fechaActualizacion` y `archivo` con la ruta exacta.
4. Separe los objetos con comas y pruebe la descarga desde el visor servido por HTTP/HTTPS.

El formato se reconoce por la extensión `.pdf` o `.kml`. Cada entrada permite `enabled: false` para ocultarla sin borrarla. Los archivos se registran explícitamente: no se listan automáticamente las carpetas ni se convierten los GeoJSON de `data/`.

Si no hay entradas, el panel muestra “No hay archivos publicados para descargar”. Si falta un archivo, se informa el problema y se permite reintentar. No se incluye cartografía ficticia en el catálogo de la plantilla.

Ocultar una entrada o la herramienta no protege el archivo publicado: puede seguir siendo accesible mediante su URL directa. Publique únicamente información destinada a distribución y revise los atributos de los KML. El PDF es un documento preparado previamente, no una exportación de la vista actual.

Pruebas: `node tests/downloads.test.cjs`. La página `tests/downloads.html` contiene un ensayo separado con un KML ficticio y un archivo deliberadamente ausente; no forma parte del catálogo público y la carpeta `tests/` no es necesaria para desplegar el visor.

## Comprobación antes de publicar

Revise el visor con este orden:

1. Carga del mapa base, logo y vista inicial.
2. Visibilidad, leyenda y transparencia de cada capa.
3. Selección y resaltado.
4. Popup o panel de información.
5. Búsqueda y comportamiento del resultado.
6. Etiquetas y rangos de zoom.
7. Clustering en capas de puntos.
8. Geolocalización, coordenadas y medición.
9. Selección, cambio y cancelación del destino de Cómo llegar.
10. Descarga efectiva de los PDF y KML publicados.
11. Apariencia en escritorio y teléfono.

Mantenga `desarrollo.validarConfiguracion: true` mientras prepara el visor. Las advertencias visibles ayudan a detectar rutas, identificadores o configuraciones incorrectas.

## Problemas frecuentes

- **La capa no aparece:** compruebe `enabled`, `visibleInicial`, la ruta de `archivo` y el rango `minZoom`/`maxZoom`.
- **La búsqueda no encuentra registros:** revise que la capa esté visible y que `campoPrincipal` coincida exactamente con el GeoJSON.
- **No aparece el título del popup:** `popup.titulo` debe contener el nombre de un campo válido; `prefijo` y `sufijo` solo complementan ese valor.
- **El clustering no funciona:** la capa debe contener geometrías de tipo punto y tener `cluster: true`.
- **La transparencia parece tener poco efecto:** configure una opacidad inicial suficientemente alta en la simbología y luego ajústela desde el control.
- **El visor falla al abrir `index.html` directamente:** ejecútelo mediante un servidor local, porque las capas se cargan como archivos externos.
