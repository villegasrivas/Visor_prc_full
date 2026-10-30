/* Configuración central: personalice este archivo para crear un visor nuevo. */
const appConfig = {
    version: 2, // Versión de la estructura de configuración.

    desarrollo: {
        validarConfiguracion: true          // Muestra advertencias útiles durante la edición.
    },

    /* Identidad y textos visibles de la aplicación. */
    aplicacion: {
        titulo: "PLAN REGULADOR COMUNAL NUEVA IMPERIAL", // Texto visible o campo usado como título.
        tituloNavegador: "P.R.C. | Municipalidad de Nueva Imperial", // Texto de la pestaña del navegador.
        institucion: "Municipalidad de Nueva Imperial", // Nombre de la institución responsable.
        subtitulo: "Departamento SIG-SECPLAN", // Texto secundario del encabezado.
        
        logo: {
            enabled: true,                 // Oculta o muestra el logo completo.
            archivo: "images/muni3.png", // Ruta del archivo utilizado.
            textoAlternativo: "Logo de la Municipalidad de Nueva Imperial", // Descripción accesible de la imagen.
            textoRespaldo: "MNI"           // Se muestra si la imagen no carga.
        }
    },

    /* Vista de inicio y límites de navegación. */
    mapa: {
        vistaInicial: {
            tipo: "capa",                 // "capa" o "centro".
            capaId: "limite_urbano",      // Se usa cuando tipo es "capa".
            centro: [-38.74, -72.95],      // Respaldo o vista de tipo "centro".
            zoom: 11, // Nivel de acercamiento utilizado.
            padding: [20, 20] // Separación [horizontal, vertical] entre la capa y los bordes del mapa.
        },
        zoomMin: 8, // Zoom mínimo; null significa sin límite.
        zoomMax: 19 // Zoom máximo; null significa sin límite.
    },

    /* Fuentes cartográficas de fondo; solo una queda activa. */
    mapasBase: [
        {
            id: "osm", // Identificador único, sin espacios.
            nombre: "OpenStreetMap", // Nombre presentado al usuario.
            enabled: true, // Activa o desactiva este elemento.
            visibleInicial: true, // Define si aparece activa al comenzar.
            url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png", // Dirección del servicio cartográfico.
            opciones: {
                maxZoom: 19, // Máximo acercamiento disponible.
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' // Créditos obligatorios de la fuente.
            }
        },
        {
            id: "satelite", // Identificador único, sin espacios.
            nombre: "Satélite", // Nombre presentado al usuario.
            enabled: true, // Activa o desactiva este elemento.
            visibleInicial: false, // Define si aparece activa al comenzar.
            url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", // Dirección del servicio cartográfico.
            opciones: {
                maxZoom: 19, // Máximo acercamiento disponible.
                attribution: "Tiles &copy; Esri" // Créditos obligatorios de la fuente.
            }
        }
    ],

    /* Opciones generales de las herramientas del visor. */
herramientas: {
    menuHerramientasMovil: {
        enabled: true, // Agrupa las herramientas en pantallas pequeñas.
        breakpoint: 700 // Ancho máximo, en píxeles, para usar el menú móvil.
    },
    leyenda: {
        plegable: true, // Permite esconderla hacia la izquierda.
        colapsadaInicial: false // true inicia mostrando solo la pestaña.
    },
    busqueda: {
            enabled: false,                 // Muestra u oculta el buscador.
            minimoCaracteres: 2, // Caracteres necesarios para buscar.
            maxResultados: 10, // Cantidad máxima de resultados.
            soloCapasVisibles: true,       // Ignora capas apagadas al buscar.
            centrarResultado: true, // Centra el mapa en el resultado.
            resaltarResultado: true, // Destaca la entidad encontrada.
            abrirPopup: true // Abre la información tras seleccionar.
        },
        geocodificacion: {
            enabled: true, // Tiene prioridad sobre la búsqueda de capas si ambas están activas.
            proveedor: "geoapify",
            apiKey: "1553aeb2ba6047ce95d9c8ae8eaa5366", // Clave de navegador: restringir dominios permitidos en Geoapify.
            contexto: "Nueva Imperial, Chile",
            pais: "cl",
            capaLimite: "limite_urbano", // Usa su rectángulo envolvente, no el polígono exacto.
            margenMetros: 500,
            minimoCaracteres: 3,
            maxResultados: 5,
            zoom: 18,
            mostrarMarcador: true,
            timeoutMs: 12000
        },
        geolocalizacion: {
            enabled: true, // Activa o desactiva este elemento.
            zoom: 17 // Nivel de acercamiento utilizado.
        },

        coordenadasCursor: {
            enabled: false, // Activa o desactiva este elemento.
            geograficas: { // Permite coordenadas geográficas WGS84.
                enabled: true, // Activa o desactiva este elemento.
                decimales: 6 // Cantidad de decimales mostrados.
            },
            utm: { // Permite coordenadas UTM WGS84.
                enabled: true, // Activa o desactiva este elemento.
                zona: 18, // Zona UTM empleada.
                hemisferio: "S", // Hemisferio UTM: N o S.
                decimales: 0 // Cantidad de decimales mostrados.
            }
        },

        buscarCoordenadas: {
            enabled: false, // Activa o desactiva este elemento.
            geograficas: true, // Permite coordenadas geográficas WGS84.
            utm: true, // Permite coordenadas UTM WGS84.
            zonaUtm: 18, // Zona UTM usada por la búsqueda.
            hemisferioUtm: "S", // Hemisferio UTM: N o S.
            zoom: 17, // Nivel de acercamiento utilizado.
            mostrarMarcador: true, // Muestra un punto en la coordenada.
            estiloMarcador: {
                radius: 7, // Radio del punto en píxeles.
                color: "#ffffff", // Color del borde o del trazo.
                weight: 2, // Grosor del borde o trazo en píxeles.
                fillColor: "#e47b25", // Color del relleno; en líneas será el trazo.
                fillOpacity: 1 // Opacidad del relleno entre 0 y 1.
            }
        },
        
        googleMaps: {
            enabled: false,                 // Muestra u oculta la herramienta Cómo llegar.
            modoViaje: "driving"           // driving: auto; walking: a pie; bicycling: bicicleta; transit: transporte público.
        },

        descargas: {
            enabled: true,                 // Muestra u oculta el panel de descargas.
            archivos: [                   // Agregue entradas o active solo archivos que realmente existan.
                {
                     enabled: true,     // Active cuando copie el PDF indicado en la ruta.
                     titulo: "Mapa general", // Texto visible o campo usado como título.
                     descripcion: "PRC Nueva Imperial - PDF", // Descripción breve para el usuario.
                     fechaActualizacion: "", // Completar cuando se confirme la fecha del documento.
                     archivo: "descargas/mapas/PRC_Nueva_Imperial_v4_1223.pdf" // Ruta del archivo utilizado.
                },
                {
                     enabled: false, // Activa o desactiva este elemento.
                     titulo: "Capa para Google Earth", // Texto visible o campo usado como título.
                     descripcion: "Información espacial para descarga.", // Descripción breve para el usuario.
                     fechaActualizacion: "AAAA-MM-DD", // Fecha o período de actualización.
                     archivo: "descargas/capas/comunidades.kml" // Ruta del archivo utilizado.
                 }
            ]
        },

        medicion: {
            enabled: true,                 // Muestra u oculta toda la herramienta.
            distancia: true, // Habilita la medición de distancias.
            superficie: true, // Habilita la medición de superficies.
            estilo: {
                color: "#e47b25", // Color del borde o del trazo.
                weight: 3, // Grosor del borde o trazo en píxeles.
                fillColor: "#e47b25", // Color del relleno; en líneas será el trazo.
                fillOpacity: 0.18 // Opacidad del relleno entre 0 y 1.
            }
        }
    },

    /* Organiza visualmente las capas en el panel lateral. */
    gruposCapas: [
        {
            id: "referencia", // Identificador único, sin espacios.
            nombre: "Capas de referencia", // Nombre presentado al usuario.
            enabled: true, // Activa o desactiva este elemento.
            ordenVisual: 410 // Un número mayor se dibuja encima.
        },
        {
            id: "tematicas", // Identificador único, sin espacios.
            nombre: "Capas temáticas", // Nombre presentado al usuario.
            enabled: true, // Activa o desactiva este elemento.
            ordenVisual: 430 // Un número mayor se dibuja encima.
        }
    ],

    /* Capas GeoJSON y comportamiento particular de cada una. */
    capas: [
        {
            id: "limite_urbano", // Identificador único, sin espacios.
            nombre: "Límite urbano", // Nombre presentado al usuario.
            enabled: true, // Incluye o excluye completamente la capa.
            grupo: "referencia", // ID definido en gruposCapas.
            archivo: "data/limite_urbano.geojson", // Ruta exacta del archivo GeoJSON.

            estructural: true, // Reserva el orden superior para límites.
            minZoom: null, // Zoom mínimo visible; null sin límite.
            maxZoom: null, // Zoom máximo visible; null sin límite.
            opacityControl: false, // Muestra el control de transparencia.
            cluster: false, // Agrupa puntos cercanos.
            interactive: false, // Permite interacción con las entidades.

            metadata: {
                enabled: false,                   // Muestra el ícono de información de la capa.
                fuente: "", // Origen de la información.
                institucion: "", // Nombre de la institución responsable.
                fechaActualizacion: "", // Fecha o período de actualización.
                escala: "", // Escala o precisión de los datos.
                descripcion: "Límite urbano utilizado como referencia estructural del visor.", // Descripción breve para el usuario.
                camposAdicionales: [], // Información manual: { etiqueta: "...", valor: "..." }.
                estadisticas: [], // Sumas automáticas configuradas para toda la capa.
                enlace: "" // Vínculo opcional a información externa.
            },
            infoCategorias: {
                enabled: false, // Solo se utiliza con simbología por valores únicos.
                mostrarCantidad: true, // Cuenta las entidades de cada categoría.
                etiquetaCantidad: "Cantidad de entidades", // Nombre del total calculado.
                camposAdicionales: [], // Información manual común a todas las categorías.
                campos: [], // Campos comunes que se resumirán por categoría.
                estadisticas: [] // Sumas automáticas calculadas por categoría.
            },
            infoPanel: {
                enabled: false,                  // Información extensa en panel lateral.
                titulo: null, // Texto visible o campo usado como título.
                campos: [] // Campos adicionales; [] si no se utilizan.
            },
            popup: {
                enabled: false,                  // Información breve sobre el mapa.
                titulo: null, // Texto visible o campo usado como título.
                campos: [] // Campos adicionales; [] si no se utilizan.
            },

            seleccion: {
                enabled: false, // Activa o desactiva este elemento.
                centrarAlSeleccionar: false // Centra la vista al hacer clic.
            },
            resaltado: {
                enabled: false, // Activa o desactiva este elemento.
                estilo: {
                    color: "#e47b25", // Color del borde o del trazo.
                    weight: 5, // Grosor del borde o trazo en píxeles.
                    fillOpacity: 0.12 // Opacidad del relleno entre 0 y 1.
                }
            },
            busqueda: {
                enabled: false,                  // Incluye la capa en el buscador.
                campoPrincipal: null, // Campo principal usado en la búsqueda.
                campos: [], // Campos adicionales; [] si no se utilizan.
                modoResultado: "resaltar" // resaltar, aislar o contrasteInverso.
            },

            simbologia: {
                tipo: "simple", // Modo de funcionamiento de este bloque.
                halo: {
                    enabled: true,                // Trazo inferior para fondos claros u oscuros.
                    color: "#ffffff", // Color del borde o del trazo.
                    weight: 7, // Grosor del borde o trazo en píxeles.
                    opacity: 0.9 // Opacidad del borde o trazo entre 0 y 1.
                },
                estilo: {
                    color: "#17365d", // Color del borde o del trazo.
                    weight: 3, // Grosor del borde o trazo en píxeles.
                    opacity: 1, // Opacidad del borde o trazo entre 0 y 1.
                    fill: false // Activa o desactiva el relleno.
                }
            },
            leyenda: {
                enabled: true, // Activa o desactiva este elemento.
                titulo: "Límite PRC" // Texto visible o campo usado como título.
            },
            etiquetado: {
                enabled: false, // Activa o desactiva este elemento.
                campo: null, // Nombre exacto del atributo GeoJSON.
                zoomMin: 14, // Zoom mínimo; null significa sin límite.
                zoomMax: null, // Zoom máximo; null significa sin límite.
                permanente: true, // Mantiene la etiqueta siempre visible.
                claseCss: "", // Clase visual definida en styles.css.
                orientacion: "horizontal" // horizontal o linea para geometrías lineales.
            }
        },
        {
            id: "zonas_prc", // Identificador único, sin espacios.
            nombre: "Zonificación PRC", // Nombre presentado al usuario.
            enabled: true, // Incluye o excluye completamente la capa.
            grupo: "referencia", // ID definido en gruposCapas.
            archivo: "data/zonas.geojson", // Ruta exacta del archivo GeoJSON.

            visibleInicial: true, // Define si aparece activa al comenzar.
            estructural: false, // Reserva el orden superior para límites.
            minZoom: null, // Zoom mínimo visible; null sin límite.
            maxZoom: null, // Zoom máximo visible; null sin límite.
            opacityControl: false, // Muestra el control de transparencia.
            cluster: false, // Agrupa puntos cercanos.
            interactive: true, // Permite interacción con las entidades.

            metadata: {
                enabled: false,                   // Muestra el ícono de información de la capa.
                fuente: "", // Origen de la información.
                institucion: "", // Nombre de la institución responsable.
                fechaActualizacion: "", // Fecha o período de actualización.
                escala: "", // Escala o precisión de los datos.
                descripcion: "Zonificación del Plan Regulador Comunal de Nueva Imperial.", // Descripción breve para el usuario.
                camposAdicionales: [], // Información manual: { etiqueta: "...", valor: "..." }.
                estadisticas: [], // Sumas automáticas configuradas para toda la capa.
                enlace: "" // Vínculo opcional a información externa.
            },
            infoCategorias: {
                enabled: false, // Solo se utiliza con simbología por valores únicos.
                mostrarCantidad: true, // Cuenta las entidades de cada categoría.
                etiquetaCantidad: "Cantidad de entidades", // Nombre del total calculado.
                camposAdicionales: [], // Información manual común a todas las categorías.
                campos: [], // Campos comunes que se resumirán por categoría.
                estadisticas: [] // Sumas automáticas calculadas por categoría.
            },
            infoPanel: {
                enabled: false,                  // Información extensa en panel lateral.
                titulo: "ZONA", // Texto visible o campo usado como título.
                campos: [] // Campos adicionales; [] si no se utilizan.
            },
            popup: {
                enabled: true,                   // Información breve sobre el mapa.
                titulo: "ZONA", // Texto visible o campo usado como título.
                campos: [ // Campos adicionales; [] si no se utilizan.
                    {
                        campo: "NOMBRE_ZON", // Nombre exacto del atributo GeoJSON.
                        etiqueta: "Zona", // Texto descriptivo mostrado al usuario.
                        formato: "texto", // Tipo de presentación del valor.
                    }
                ]
            },

            seleccion: {
                enabled: true, // Activa o desactiva este elemento.
                centrarAlSeleccionar: false // Centra la vista al hacer clic.
            },
            resaltado: {
                enabled: true, // Activa o desactiva este elemento.
                estilo: {
                    color: "#555555", // Color del borde o del trazo.
                    weight: 3, // Grosor del borde o trazo en píxeles.
                    fillOpacity: 0.25 // Opacidad del relleno entre 0 y 1.
                }
            },
            busqueda: {
                enabled: true,                   // Incluye la capa en el buscador.
                campoPrincipal: "ZONA", // Campo principal usado en la búsqueda.
                campos: ["NOMBRE_ZON"], // Permite buscar también por nombre de zona.
                modoResultado: "contrasteInverso", // resaltar, aislar o contrasteInverso.
                estiloContrasteInverso: {
                    seleccionado: { // Estilo aplicado a la entidad elegida.
                        color: "#ffffff", // Color del borde o del trazo.
                        weight: 4, // Grosor del borde o trazo en píxeles.
                        fillOpacity: 0 // Opacidad del relleno entre 0 y 1.
                    },
                    resto: { // Estilo aplicado a las demás entidades.
                        fillOpacity: 0.65 // Opacidad del relleno entre 0 y 1.
                    }
                }
            },

            simbologia: {
                tipo: "valoresUnicos", // Modo de funcionamiento de este bloque.
                campo: "ZONA",
                filtroCategorias: {
                enabled: true,                          // Permite activar o desactivar categorías.
                mostrarTodas: true,                    // Muestra los botones Todas y Ninguna.
                abiertoInicial: true                   // Abre el listado al iniciar.
                },
                estiloBase: {
                color: "#666666",
                weight: 1,
                fillOpacity: 0.5,
                opacity: 1,
                lineCap: "round"
                },
    
                categorias: [
                                {
                    valor: "AV",
                    etiqueta: "Área Verde",
                    visibleInicial: true,               // Estado inicial de esta categoría.
                    estilo: { fillColor: "#0fdd1d" }
                },
                {
                    valor: "ZCE",
                    etiqueta: "Zona Cementerio",
                    visibleInicial: true,               // Estado inicial de esta categoría.
                    estilo: { fillColor: "#eb08cd" }
                },
                {
                    valor: "ZE1",
                    etiqueta: "Zona Equipamiento Deportivo",
                    visibleInicial: true,               // Estado inicial de esta categoría.
                    estilo: { fillColor: "#6c8fb0" }
                },
                {
                    valor: "ZE2",
                    etiqueta: "Zona Equipamiento Institucional",
                    visibleInicial: true,
                    estilo: { fillColor: "#420ab3" }
                },
                {
                    valor: "ZE3",
                    etiqueta: "Zona Equipamiento Intercultural",
                    visibleInicial: true,               // Estado inicial de esta categoría.
                    estilo: { fillColor: "#080119" }
                },
                {
                    valor: "ZH1",
                    etiqueta: "Zona Habitacional Alta Densidad",
                    visibleInicial: true,               // Estado inicial de esta categoría.
                    estilo: { fillColor: "#f6f5b1" }
                },
                {
                    valor: "ZH2",
                    etiqueta: "Zona Habitacional Media Densidad",
                    visibleInicial: true,               // Estado inicial de esta categoría.
                    estilo: { fillColor: "#f7f323" }
                },
                {
                    valor: "ZH3",
                    etiqueta: "Zona Habitacional Baja Densidad",
                    visibleInicial: true,               // Estado inicial de esta categoría.
                    estilo: { fillColor: "#eac009" }
                },
                {
                    valor: "ZM1",
                    etiqueta: "Zona Mixta Central",
                    visibleInicial: true,               // Estado inicial de esta categoría.
                    estilo: { fillColor: "#f1bf48" }
                },
                {
                    valor: "ZM2",
                    etiqueta: "Zona Mixta Borde Centro",
                    visibleInicial: true,               // Estado inicial de esta categoría.
                    estilo: { fillColor: "#c66114" }
                },
                {
                    valor: "ZM3",
                    etiqueta: "Zona Mixta de Barrio",
                    visibleInicial: true,               // Estado inicial de esta categoría.
                    estilo: { fillColor: "#9d4011" }
                },
                {
                    valor: "ZM4",
                    etiqueta: "Zona Mixta de Baja Intensidad",
                    visibleInicial: true,               // Estado inicial de esta categoría.
                    estilo: { fillColor: "#5c4309" }
                },
        ],
        mostrarNoConfigurados: true,               // Permite detectar nuevas zonas sin categorizar.
        estiloDefault: { fillColor: "#9e9e9e" },
        etiquetaDefault: "Sin información u otros",
        mostrarDefaultEnLeyenda: true
    },
            leyenda: {
                enabled: true, // Activa o desactiva este elemento.
                titulo: "Zonas PRC N. Imperial" // Texto visible o campo usado como título.
            },
            etiquetado: {
                enabled: true, // Activa o desactiva este elemento.
                campo: "ZONA", // Nombre exacto del atributo GeoJSON.
                zoomMin: 17, // Zoom mínimo; null significa sin límite.
                zoomMax: null, // Zoom máximo; null significa sin límite.
                permanente: true, // Mantiene la etiqueta siempre visible.
                claseCss: "etiqueta-zona", // Clase visual definida en styles.css.
                orientacion: "horizontal" // horizontal o linea para geometrías lineales.
            }
        },
        {
    id: "bnup.geojson", // Identificador único, sin espacios.
    nombre: "Área Verde BNUP", // Nombre presentado al usuario.
    enabled: true,                          // Incluye o excluye completamente la capa.
    grupo: "tematicas",                    // Debe existir en gruposCapas.
    archivo: "data/bnup.geojson", // Ruta del archivo utilizado.

    visibleInicial: false,                  // Estado del checkbox al iniciar.
    estructural: false,                     // Use true para límites siempre visibles.
    minZoom: null,                         // Zoom mínimo visible; null sin límite.
    maxZoom: null,                         // Zoom máximo visible; null sin límite.
    opacityControl: false,                  // Muestra el control de transparencia.
    cluster: false,                        // Use true solamente en capas de puntos.
    interactive: true,                     // Permite interacción con las entidades.

    

    infoPanel: {
        enabled: false, // Información extensa de una entidad seleccionada.
        titulo: "CAMPO_TITULO", // Campo usado como título del panel.
        campos: [ // Campos adicionales; [] si no se utilizan.
            {
                campo: "CAMPO", // Nombre exacto del atributo GeoJSON.
                etiqueta: "Etiqueta", // Texto descriptivo mostrado al usuario.
                formato: "texto" // Tipo de presentación del valor.
            }
        ]
    },

    seleccion: {
        enabled: true, // Permite seleccionar la entidad.
        centrarAlSeleccionar: false // Centra la vista al hacer clic.
    },

    resaltado: {
        enabled: true, // Destaca temporalmente la entidad.
        estilo: {
            color: "#ffffff", // Color del borde o del trazo.
            fillColor: "#f28c28", // Color del relleno; en líneas será el trazo.
            weight: 3, // Grosor del borde o trazo en píxeles.
            opacity: 1, // Opacidad del borde o trazo entre 0 y 1.
            fillOpacity: 0.45, // Opacidad del relleno entre 0 y 1.
            radius: 10 // Radio del punto en píxeles.
        }
    },

    busqueda: {
        enabled: false,                     // Incluye la capa en el buscador.
        campoPrincipal: "CAMPO_PRINCIPAL", // Campo principal usado en la búsqueda.
        campos: ["CAMPO_SECUNDARIO"], // Campos adicionales; [] si no se utilizan.
        modoResultado: "resaltar",         // "resaltar", "aislar" o "contrasteInverso".
        estiloContrasteInverso: {
            seleccionado: { color: "#ffffff", fillColor: "#f28c28", weight: 4, opacity: 1, fillOpacity: 0 }, // Estilo aplicado a la entidad elegida.
            resto: { opacity: 0.25, fillOpacity: 0.65 } // Estilo aplicado a las demás entidades.
        }
    },

    simbologia: {
        tipo: "simple", // Modo de funcionamiento de este bloque.
        estilo: {
            color: "#0f1010", // Color del borde o del trazo.
            weight: 2, // Grosor del borde o trazo en píxeles.
            fillColor: "#0f6122", // Color del relleno; en líneas será el trazo.
            fillOpacity: 0.20 // Opacidad del relleno entre 0 y 1.
        }
    },

    leyenda: {
        enabled: true, // Incluye la capa en la leyenda.
        titulo: "Área Verde BNUP" // Texto mostrado en la leyenda.
    }
},

{
    id: "ich", // Identificador único, sin espacios.
    nombre: "ICH - Inmueble Conservación Histórica", // Nombre presentado al usuario.
    enabled: true,                          // Incluye o excluye completamente la capa.
    grupo: "tematicas",                    // Debe existir en gruposCapas.
    archivo: "data/ich.geojson", // Ruta del archivo utilizado.

    visibleInicial: false,                  // Estado del checkbox al iniciar.
    estructural: false,                     // Use true para límites siempre visibles.
    minZoom: null,                         // Zoom mínimo visible; null sin límite.
    maxZoom: null,                         // Zoom máximo visible; null sin límite.
    opacityControl: false,                  // Muestra el control de transparencia.
    cluster: false,                        // Use true solamente en capas de puntos.
    interactive: true,                     // Permite interacción con las entidades.

    metadata: {
        enabled: false,                     // Muestra el ícono de información de la capa.
        fuente: "Nombre de la fuente", // Origen de la información.
        institucion: "Institución responsable", // Nombre de la institución responsable.
        fechaActualizacion: "AAAA-MM-DD", // Fecha o período de actualización.
        escala: "Escala o precisión de origen", // Escala o precisión de los datos.
        descripcion: "Descripción breve del dataset.", // Descripción breve para el usuario.
        camposAdicionales: [ // Información escrita manualmente.
            { etiqueta: "Subtítulo libre", valor: "Información manual" }
        ],
        estadisticas: [ // Cálculos automáticos sobre toda la capa.
            {
                operacion: "suma", // Por ahora se admite suma.
                campo: "CAMPO_NUMERICO", // Campo que contiene los valores.
                etiqueta: "Total calculado", // Subtítulo mostrado en el panel.
                factor: 1, // 1 mantiene la unidad; 0.001 convierte m a km.
                decimales: 2, // Redondeo aplicado al resultado final.
                sufijo: " km" // Unidad mostrada después del valor.
            }
        ],
        enlace: "" // Vínculo opcional a información externa.
    },

    
    popup: {
        enabled: true,                     // Información breve sobre el mapa.
        titulo: "NOMBRE_ICH", // Texto visible o campo usado como título.
        prefijo: "",                          // Texto opcional antes del título.
        sufijo: "",                           // Texto opcional después del título.
        campos: [ // Campos adicionales; [] si no se utilizan.
            {
                campo: "ID_ICH", // Nombre exacto del atributo GeoJSON.
                etiqueta: "Inmueble Conservación Histórica", // Texto descriptivo mostrado al usuario.
                formato: "texto" // Tipo de presentación del valor.
            }
        ]
    },

    seleccion: {
        enabled: true, // Permite seleccionar la entidad.
        centrarAlSeleccionar: false // Centra la vista al hacer clic.
    },

    resaltado: {
        enabled: true, // Destaca temporalmente la entidad.
        estilo: {
            color: "#ffffff", // Color del borde o del trazo.
            fillColor: "#f28c28", // Color del relleno; en líneas será el trazo.
            weight: 3, // Grosor del borde o trazo en píxeles.
            opacity: 1, // Opacidad del borde o trazo entre 0 y 1.
            fillOpacity: 0.45, // Opacidad del relleno entre 0 y 1.
            radius: 10 // Radio del punto en píxeles.
        }
    },

    busqueda: {
        enabled: false,                     // Incluye la capa en el buscador.
        campoPrincipal: "ID_ICH", // Campo principal usado en la búsqueda.
        campos: ["CAMPO_SECUNDARIO"], // Campos adicionales; [] si no se utilizan.
        modoResultado: "resaltar",         // "resaltar", "aislar" o "contrasteInverso".
        estiloContrasteInverso: {
            seleccionado: { color: "#ffffff", fillColor: "#f28c28", weight: 4, opacity: 1, fillOpacity: 0 }, // Estilo aplicado a la entidad elegida.
            resto: { opacity: 0.25, fillOpacity: 0.65 } // Estilo aplicado a las demás entidades.
        }
    },

    simbologia: {
        tipo: "simple", // Modo de funcionamiento de este bloque.
        estilo: {
            color: "#111112", // Color del borde o del trazo.
            weight: 4, // Grosor del borde o trazo en píxeles.
            fillColor: "#93969b", // Color del relleno; en líneas será el trazo.
            fillOpacity: 0.30 // Opacidad del relleno entre 0 y 1.
        }
    },

    leyenda: {
        enabled: true, // Incluye la capa en la leyenda.
        titulo: "ICH - Inmuebles Conservación Histórica" // Texto mostrado en la leyenda.
    },

    etiquetado: {
        enabled: true, // Activa las etiquetas de esta capa.
        campo: "ID_ICH", // Nombre exacto del atributo GeoJSON.
        zoomMin: 16, // Zoom mínimo; null significa sin límite.
        zoomMax: null, // Zoom máximo; null significa sin límite.
        permanente: true, // Mantiene la etiqueta siempre visible.
        claseCss: "etiqueta-personalizada", // Clase opcional definida en styles.css.
        orientacion: "horizontal" // horizontal o linea para geometrías lineales.
    }
},

{
    id: "red_hidrica", // Identificador único, sin espacios.
    nombre: "Cursos de Agua", // Nombre presentado al usuario.
    enabled: true,                          // Incluye o excluye completamente la capa.
    grupo: "tematicas",                    // Debe existir en gruposCapas.
    archivo: "data/red_hidrica.geojson", // Ruta del archivo utilizado.

    visibleInicial: false,                  // Estado del checkbox al iniciar.
    estructural: false,                     // Use true para límites siempre visibles.
    minZoom: null,                         // Zoom mínimo visible; null sin límite.
    maxZoom: null,                         // Zoom máximo visible; null sin límite.
    opacityControl: false,                  // Muestra el control de transparencia.
    cluster: false,                        // Use true solamente en capas de puntos.
    interactive: true,                     // Permite interacción con las entidades.

    metadata: {
        enabled: false,                     // Muestra el ícono de información de la capa.
        fuente: "Nombre de la fuente", // Origen de la información.
        institucion: "Institución responsable", // Nombre de la institución responsable.
        fechaActualizacion: "AAAA-MM-DD", // Fecha o período de actualización.
        escala: "Escala o precisión de origen", // Escala o precisión de los datos.
        descripcion: "Descripción breve del dataset.", // Descripción breve para el usuario.
        camposAdicionales: [ // Información escrita manualmente.
            { etiqueta: "Subtítulo libre", valor: "Información manual" }
        ],
        estadisticas: [ // Cálculos automáticos sobre toda la capa.
            {
                operacion: "suma", // Por ahora se admite suma.
                campo: "CAMPO_NUMERICO", // Campo que contiene los valores.
                etiqueta: "Total calculado", // Subtítulo mostrado en el panel.
                factor: 1, // 1 mantiene la unidad; 0.001 convierte m a km.
                decimales: 2, // Redondeo aplicado al resultado final.
                sufijo: " km" // Unidad mostrada después del valor.
            }
        ],
        enlace: "" // Vínculo opcional a información externa.
    },


    seleccion: {
        enabled: true, // Permite seleccionar la entidad.
        centrarAlSeleccionar: false // Centra la vista al hacer clic.
    },

    resaltado: {
        enabled: true, // Destaca temporalmente la entidad.
        estilo: {
            color: "#ffffff", // Color del borde o del trazo.
            fillColor: "#f28c28", // Color del relleno; en líneas será el trazo.
            weight: 3, // Grosor del borde o trazo en píxeles.
            opacity: 1, // Opacidad del borde o trazo entre 0 y 1.
            fillOpacity: 0.45, // Opacidad del relleno entre 0 y 1.
            radius: 10 // Radio del punto en píxeles.
        }
    },


    simbologia: {
        tipo: "simple", // Modo de funcionamiento de este bloque.
        estilo: {
            color: "#2962b0", // Color del borde o del trazo.
            weight: 2, // Grosor del borde o trazo en píxeles.
            fillColor: "#0f4493", // Color del relleno; en líneas será el trazo.
            fillOpacity: 0.20 // Opacidad del relleno entre 0 y 1.
        }
    },

    leyenda: {
        enabled: true, // Incluye la capa en la leyenda.
        titulo: "Cursos de Agua" // Texto mostrado en la leyenda.
    }
},

{
    id: "cursos_de_agua", // Identificador único, sin espacios.
    nombre: "Cuerpos de Agua", // Nombre presentado al usuario.
    enabled: true,                          // Incluye o excluye completamente la capa.
    grupo: "tematicas",                    // Debe existir en gruposCapas.
    archivo: "data/cuerpos_agua.geojson", // Ruta del archivo utilizado.

    visibleInicial: false,                  // Estado del checkbox al iniciar.
    estructural: false,                     // Use true para límites siempre visibles.
    minZoom: null,                         // Zoom mínimo visible; null sin límite.
    maxZoom: null,                         // Zoom máximo visible; null sin límite.
    opacityControl: false,                  // Muestra el control de transparencia.
    cluster: false,                        // Use true solamente en capas de puntos.
    interactive: true,                     // Permite interacción con las entidades.

    metadata: {
        enabled: false,                     // Muestra el ícono de información de la capa.
        fuente: "Nombre de la fuente", // Origen de la información.
        institucion: "Institución responsable", // Nombre de la institución responsable.
        fechaActualizacion: "AAAA-MM-DD", // Fecha o período de actualización.
        escala: "Escala o precisión de origen", // Escala o precisión de los datos.
        descripcion: "Descripción breve del dataset.", // Descripción breve para el usuario.
        camposAdicionales: [ // Información escrita manualmente.
            { etiqueta: "Subtítulo libre", valor: "Información manual" }
        ],
        estadisticas: [ // Cálculos automáticos sobre toda la capa.
            {
                operacion: "suma", // Por ahora se admite suma.
                campo: "CAMPO_NUMERICO", // Campo que contiene los valores.
                etiqueta: "Total calculado", // Subtítulo mostrado en el panel.
                factor: 1, // 1 mantiene la unidad; 0.001 convierte m a km.
                decimales: 2, // Redondeo aplicado al resultado final.
                sufijo: " km" // Unidad mostrada después del valor.
            }
        ],
        enlace: "" // Vínculo opcional a información externa.
    },


    seleccion: {
        enabled: false, // Permite seleccionar la entidad.
        centrarAlSeleccionar: false // Centra la vista al hacer clic.
    },

    resaltado: {
        enabled: false, // Destaca temporalmente la entidad.
        estilo: {
            color: "#ffffff", // Color del borde o del trazo.
            fillColor: "#f28c28", // Color del relleno; en líneas será el trazo.
            weight: 3, // Grosor del borde o trazo en píxeles.
            opacity: 1, // Opacidad del borde o trazo entre 0 y 1.
            fillOpacity: 0.45, // Opacidad del relleno entre 0 y 1.
            radius: 10 // Radio del punto en píxeles.
        }
    },


    simbologia: {
        tipo: "simple", // Modo de funcionamiento de este bloque.
        estilo: {
            color: "#2962b0", // Color del borde o del trazo.
            weight: 2, // Grosor del borde o trazo en píxeles.
            fillColor: "#0f4493", // Color del relleno; en líneas será el trazo.
            fillOpacity: 0.20 // Opacidad del relleno entre 0 y 1.
        }
    },

    leyenda: {
        enabled: true, // Incluye la capa en la leyenda.
        titulo: "Cuerpos de Agua" // Texto mostrado en la leyenda.
    }
},

{
    id: "riesgo_inundac_cuerposagua", // Identificador único, sin espacios.
    nombre: "AR-1 Zona Potencial de Inundación Cursos Agua", // Nombre presentado al usuario.
    enabled: true,                          // Incluye o excluye completamente la capa.
    grupo: "tematicas",                    // Debe existir en gruposCapas.
    archivo: "data/riesgo_inundac_cuerposagua.geojson", // Ruta del archivo utilizado.

    visibleInicial: false,                  // Estado del checkbox al iniciar.
    estructural: false,                     // Use true para límites siempre visibles.
    minZoom: null,                         // Zoom mínimo visible; null sin límite.
    maxZoom: null,                         // Zoom máximo visible; null sin límite.
    opacityControl: false,                  // Muestra el control de transparencia.
    cluster: false,                        // Use true solamente en capas de puntos.
    interactive: true,                     // Permite interacción con las entidades.

    metadata: {
        enabled: false,                     // Muestra el ícono de información de la capa.
        fuente: "Nombre de la fuente", // Origen de la información.
        institucion: "Institución responsable", // Nombre de la institución responsable.
        fechaActualizacion: "AAAA-MM-DD", // Fecha o período de actualización.
        escala: "Escala o precisión de origen", // Escala o precisión de los datos.
        descripcion: "Descripción breve del dataset.", // Descripción breve para el usuario.
        camposAdicionales: [ // Información escrita manualmente.
            { etiqueta: "Subtítulo libre", valor: "Información manual" }
        ],
        estadisticas: [ // Cálculos automáticos sobre toda la capa.
            {
                operacion: "suma", // Por ahora se admite suma.
                campo: "CAMPO_NUMERICO", // Campo que contiene los valores.
                etiqueta: "Total calculado", // Subtítulo mostrado en el panel.
                factor: 1, // 1 mantiene la unidad; 0.001 convierte m a km.
                decimales: 2, // Redondeo aplicado al resultado final.
                sufijo: " km" // Unidad mostrada después del valor.
            }
        ],
        enlace: "" // Vínculo opcional a información externa.
    },

    seleccion: {
        enabled: true, // Permite seleccionar la entidad.
        centrarAlSeleccionar: false // Centra la vista al hacer clic.
    },

    resaltado: {
        enabled: true, // Destaca temporalmente la entidad.
        estilo: {
            color: "#ffffff", // Color del borde o del trazo.
            fillColor: "#f28c28", // Color del relleno; en líneas será el trazo.
            weight: 3, // Grosor del borde o trazo en píxeles.
            opacity: 1, // Opacidad del borde o trazo entre 0 y 1.
            fillOpacity: 0.45, // Opacidad del relleno entre 0 y 1.
            radius: 10 // Radio del punto en píxeles.
        }
    },

    simbologia: {
        tipo: "simple", // Modo de funcionamiento de este bloque.
        estilo: {
            color: "#011837", // Color del borde o del trazo.
            weight: 2, // Grosor del borde o trazo en píxeles.
            fillColor: "#041c3c", // Color del relleno; en líneas será el trazo.
            fillOpacity: 0.60 // Opacidad del relleno entre 0 y 1.
        }
    },

    leyenda: {
        enabled: true, // Incluye la capa en la leyenda.
        titulo: "AR-1 Área Riesgo Potencialmente Inundable por Cursos de Agua" // Texto mostrado en la leyenda.
    }

},
{
    id: "riesgo_inundac_anegamiento", // Identificador único, sin espacios.
    nombre: "AR-1 Zona Potencial de Inundación Anegamiento", // Nombre presentado al usuario.
    enabled: true,                          // Incluye o excluye completamente la capa.
    grupo: "tematicas",                    // Debe existir en gruposCapas.
    archivo: "data/riesgo_inundac_anegamiento.geojson", // Ruta del archivo utilizado.

    visibleInicial: false,                  // Estado del checkbox al iniciar.
    estructural: false,                     // Use true para límites siempre visibles.
    minZoom: null,                         // Zoom mínimo visible; null sin límite.
    maxZoom: null,                         // Zoom máximo visible; null sin límite.
    opacityControl: false,                  // Muestra el control de transparencia.
    cluster: false,                        // Use true solamente en capas de puntos.
    interactive: true,                     // Permite interacción con las entidades.

    metadata: {
        enabled: false,                     // Muestra el ícono de información de la capa.
        fuente: "Nombre de la fuente", // Origen de la información.
        institucion: "Institución responsable", // Nombre de la institución responsable.
        fechaActualizacion: "AAAA-MM-DD", // Fecha o período de actualización.
        escala: "Escala o precisión de origen", // Escala o precisión de los datos.
        descripcion: "Descripción breve del dataset.", // Descripción breve para el usuario.
        camposAdicionales: [ // Información escrita manualmente.
            { etiqueta: "Subtítulo libre", valor: "Información manual" }
        ],
        estadisticas: [ // Cálculos automáticos sobre toda la capa.
            {
                operacion: "suma", // Por ahora se admite suma.
                campo: "CAMPO_NUMERICO", // Campo que contiene los valores.
                etiqueta: "Total calculado", // Subtítulo mostrado en el panel.
                factor: 1, // 1 mantiene la unidad; 0.001 convierte m a km.
                decimales: 2, // Redondeo aplicado al resultado final.
                sufijo: " km" // Unidad mostrada después del valor.
            }
        ],
        enlace: "" // Vínculo opcional a información externa.
    },

    seleccion: {
        enabled: true, // Permite seleccionar la entidad.
        centrarAlSeleccionar: false // Centra la vista al hacer clic.
    },

    resaltado: {
        enabled: true, // Destaca temporalmente la entidad.
        estilo: {
            color: "#ffffff", // Color del borde o del trazo.
            fillColor: "#f28c28", // Color del relleno; en líneas será el trazo.
            weight: 3, // Grosor del borde o trazo en píxeles.
            opacity: 1, // Opacidad del borde o trazo entre 0 y 1.
            fillOpacity: 0.45, // Opacidad del relleno entre 0 y 1.
            radius: 10 // Radio del punto en píxeles.
        }
    },

    simbologia: {
        tipo: "simple", // Modo de funcionamiento de este bloque.
        estilo: {
            color: "#11dee1", // Color del borde o del trazo.
            weight: 2, // Grosor del borde o trazo en píxeles.
            fillColor: "#1ae7fa", // Color del relleno; en líneas será el trazo.
            fillOpacity: 0.40 // Opacidad del relleno entre 0 y 1.
        }
    },

    leyenda: {
        enabled: true, // Incluye la capa en la leyenda.
        titulo: "AR-2 Área Riesgo Potencialmente Inundable por Anegamiento" // Texto mostrado en la leyenda.
    }

},
{
    id: "faja_vial", // Identificador único, sin espacios.
    nombre: "Vías Estructurantes", // Nombre presentado al usuario.
    enabled: true,                          // Incluye o excluye completamente la capa.
    grupo: "tematicas",                    // Debe existir en gruposCapas.
    archivo: "data/faja_vial.geojson", // Ruta del archivo utilizado.

    visibleInicial: false,                  // Estado del checkbox al iniciar.
    estructural: false,                     // Use true para límites siempre visibles.
    minZoom: null,                         // Zoom mínimo visible; null sin límite.
    maxZoom: null,                         // Zoom máximo visible; null sin límite.
    opacityControl: false,                  // Muestra el control de transparencia.
    cluster: false,                        // Use true solamente en capas de puntos.
    interactive: true,                     // Permite interacción con las entidades.


    popup: {
        enabled: false,                     // Información breve sobre el mapa.
        titulo: "CAMPO_TITULO", // Texto visible o campo usado como título.
        prefijo: "",                          // Texto opcional antes del título.
        sufijo: "",                           // Texto opcional después del título.
        campos: [ // Campos adicionales; [] si no se utilizan.
            {
                campo: "CAMPO", // Nombre exacto del atributo GeoJSON.
                etiqueta: "Etiqueta", // Texto descriptivo mostrado al usuario.
                formato: "texto" // Tipo de presentación del valor.
            },
            {
                campo: "Shape_Area", // Nombre exacto del atributo GeoJSON.
                etiqueta: "Sup (m2)", // Texto descriptivo mostrado al usuario.
                formato: "decimal", // Tipo de presentación del valor.
                factor: 1, // 1 mantiene la unidad; 0.0001 convertiría m2 a ha.
                decimales: 0, // Cantidad de decimales mostrados.
                sufijo: " m2" // Texto opcional después del valor.
            }
        ]
    },

    seleccion: {
        enabled: true, // Permite seleccionar la entidad.
        centrarAlSeleccionar: true // Centra la vista al hacer clic.
    },

    resaltado: {
        enabled: true, // Destaca temporalmente la entidad.
        estilo: {
            color: "#ffffff", // Color del borde o del trazo.
            fillColor: "#f28c28", // Color del relleno; en líneas será el trazo.
            weight: 3, // Grosor del borde o trazo en píxeles.
            opacity: 1, // Opacidad del borde o trazo entre 0 y 1.
            fillOpacity: 0.45, // Opacidad del relleno entre 0 y 1.
            radius: 10 // Radio del punto en píxeles.
        }
    },

    busqueda: {
        enabled: false,                     // Incluye la capa en el buscador.
        campoPrincipal: "CAMPO_PRINCIPAL", // Campo principal usado en la búsqueda.
        campos: ["CAMPO_SECUNDARIO"], // Campos adicionales; [] si no se utilizan.
        modoResultado: "resaltar",         // "resaltar", "aislar" o "contrasteInverso".
        estiloContrasteInverso: {
            seleccionado: { color: "#ffffff", fillColor: "#f28c28", weight: 4, opacity: 1, fillOpacity: 0 }, // Estilo aplicado a la entidad elegida.
            resto: { opacity: 0.25, fillOpacity: 0.65 } // Estilo aplicado a las demás entidades.
        }
    },

    simbologia: {
    tipo: "valoresUnicos", // Modo de funcionamiento de este bloque.
    campo: "TIPO", // Nombre exacto del atributo GeoJSON.
        filtroCategorias: {
        enabled: true, // Permite activar o desactivar categorías.
        mostrarTodas: true, // Muestra los botones Todas y Ninguna.
        abiertoInicial: true // Abre el listado al iniciar.
    },
    estiloBase: {
        color: "#ffffff", // Color del borde o del trazo.
        weight: 1, // Grosor del borde o trazo en píxeles.
        fillOpacity: 0.60 // Opacidad del relleno entre 0 y 1.
    },
    categorias: [
        {
            valor: "Existente", // Valor exacto existente en el GeoJSON.
            etiqueta: "Existente", // Texto descriptivo mostrado al usuario.
            visibleInicial: true, // Estado inicial de esta categoría.
            estilo: { fillColor: "#2f7d32" } // Color de esta categoría; use color para líneas.
        },
        {
            valor: "Ensanche", // Valor exacto existente en el GeoJSON.
            etiqueta: "Ensanche", // Texto descriptivo mostrado al usuario.
            visibleInicial: true, // Estado inicial de esta categoría.
            estilo: { fillColor: "#710eea" } // Color de esta categoría; use color para líneas.
        },
        {
            valor: "Proyectada", // Valor exacto existente en el GeoJSON.
            etiqueta: "Proyectada", // Texto descriptivo mostrado al usuario.
            visibleInicial: true, // Estado inicial de esta categoría.
            estilo: { fillColor: "#e02d0e" } // Color de esta categoría; use color para líneas.
        }
    ],
    mostrarNoConfigurados: false, // Muestra u oculta valores sin categoría.
    visibleDefaultInicial: false, // Estado inicial de valores no clasificados.
    estiloDefault: { fillColor: "#9e9e9e" }, // Estilo para valores no clasificados.
    etiquetaDefault: "Sin información u otros", // Nombre del grupo no clasificado.
    mostrarDefaultEnLeyenda: false // Incluye el estilo predeterminado.

},
    leyenda: {
        enabled: true, // Incluye la capa en la leyenda.
        titulo: "Vías estructurantes" // Texto mostrado en la leyenda.
    },

    etiquetado: {
        enabled: false, // Activa las etiquetas de esta capa.
        campo: "CAMPO_ETIQUETA", // Nombre exacto del atributo GeoJSON.
        zoomMin: 14, // Zoom mínimo; null significa sin límite.
        zoomMax: null, // Zoom máximo; null significa sin límite.
        permanente: true, // Mantiene la etiqueta siempre visible.
        claseCss: "etiqueta-personalizada", // Clase opcional definida en styles.css.
        orientacion: "horizontal" // horizontal o linea para geometrías lineales.
    }
}

    ]
};

/*
PLANTILLA PARA AGREGAR UNA CAPA NUEVA
Copie este objeto dentro de appConfig.capas y complete sus valores.

{
    id: "idCapa", // Identificador único, sin espacios.
    nombre: "Nombre visible", // Nombre presentado al usuario.
    enabled: true,                          // Incluye o excluye completamente la capa.
    grupo: "tematicas",                    // Debe existir en gruposCapas.
    archivo: "data/archivo.geojson", // Ruta del archivo utilizado.

    visibleInicial: false,                  // Estado del checkbox al iniciar.
    estructural: false,                     // Use true para límites siempre visibles.
    minZoom: null,                         // Zoom mínimo visible; null sin límite.
    maxZoom: null,                         // Zoom máximo visible; null sin límite.
    opacityControl: true,                  // Muestra el control de transparencia.
    cluster: false,                        // Use true solamente en capas de puntos.
    interactive: true,                     // Permite interacción con las entidades.

    metadata: {
        enabled: true,                     // Muestra el ícono de información de la capa.
        fuente: "Nombre de la fuente", // Origen de la información.
        institucion: "Institución responsable", // Nombre de la institución responsable.
        fechaActualizacion: "AAAA-MM-DD", // Fecha o período de actualización.
        escala: "Escala o precisión de origen", // Escala o precisión de los datos.
        descripcion: "Descripción breve del dataset.", // Descripción breve para el usuario.
        camposAdicionales: [ // Información escrita manualmente.
            { etiqueta: "Subtítulo libre", valor: "Información manual" }
        ],
        estadisticas: [ // Cálculos automáticos sobre toda la capa.
            {
                operacion: "suma", // Por ahora se admite suma.
                campo: "CAMPO_NUMERICO", // Campo que contiene los valores.
                etiqueta: "Total calculado", // Subtítulo mostrado en el panel.
                factor: 1, // 1 mantiene la unidad; 0.001 convierte m a km.
                decimales: 2, // Redondeo aplicado al resultado final.
                sufijo: " km" // Unidad mostrada después del valor.
            }
        ],
        enlace: "" // Vínculo opcional a información externa.
    },

    infoCategorias: {
        enabled: false, // Active solo con simbología por valores únicos.
        mostrarCantidad: true, // Cuenta automáticamente las entidades del grupo.
        etiquetaCantidad: "Cantidad de entidades", // Nombre del total calculado.
        camposAdicionales: [ // Información manual común a todas las categorías.
            { etiqueta: "Subtítulo libre", valor: "Información manual" }
        ],
        campos: [ // Campos que se resumirán dentro de cada categoría.
            { campo: "CAMPO_COMUN", etiqueta: "Dato común", formato: "texto" }
        ],
        estadisticas: [ // Cálculos sobre las entidades de cada categoría.
            {
                operacion: "suma", // Por ahora se admite suma.
                campo: "CAMPO_NUMERICO", // Campo que contiene los valores.
                etiqueta: "Total de la categoría", // Subtítulo mostrado en el panel.
                factor: 1, // 1 mantiene la unidad; 0.001 convierte m a km.
                decimales: 2, // Redondeo aplicado después de sumar.
                sufijo: " km" // Unidad mostrada después del valor.
            }
        ]
    },

    infoPanel: {
        enabled: false, // Información extensa de una entidad seleccionada.
        titulo: "CAMPO_TITULO", // Campo usado como título del panel.
        campos: [ // Campos adicionales; [] si no se utilizan.
            {
                campo: "CAMPO", // Nombre exacto del atributo GeoJSON.
                etiqueta: "Etiqueta", // Texto descriptivo mostrado al usuario.
                formato: "texto" // Tipo de presentación del valor.
            }
        ]
    },

    popup: {
        enabled: true,                     // Información breve sobre el mapa.
        titulo: "CAMPO_TITULO", // Texto visible o campo usado como título.
        prefijo: "",                          // Texto opcional antes del título.
        sufijo: "",                           // Texto opcional después del título.
        campos: [ // Campos adicionales; [] si no se utilizan.
            {
                campo: "CAMPO", // Nombre exacto del atributo GeoJSON.
                etiqueta: "Etiqueta", // Texto descriptivo mostrado al usuario.
                formato: "texto" // Tipo de presentación del valor.
            },
            {
                campo: "Shape_Area", // Nombre exacto del atributo GeoJSON.
                etiqueta: "Sup (m2)", // Texto descriptivo mostrado al usuario.
                formato: "decimal", // Tipo de presentación del valor.
                factor: 1, // 1 mantiene la unidad; 0.0001 convertiría m2 a ha.
                decimales: 0, // Cantidad de decimales mostrados.
                sufijo: " m2" // Texto opcional después del valor.
            }
        ]
    },

    seleccion: {
        enabled: true, // Permite seleccionar la entidad.
        centrarAlSeleccionar: false // Centra la vista al hacer clic.
    },

    resaltado: {
        enabled: true, // Destaca temporalmente la entidad.
        estilo: {
            color: "#ffffff", // Color del borde o del trazo.
            fillColor: "#f28c28", // Color del relleno; en líneas será el trazo.
            weight: 3, // Grosor del borde o trazo en píxeles.
            opacity: 1, // Opacidad del borde o trazo entre 0 y 1.
            fillOpacity: 0.45, // Opacidad del relleno entre 0 y 1.
            radius: 10 // Radio del punto en píxeles.
        }
    },

    busqueda: {
        enabled: true,                     // Incluye la capa en el buscador.
        campoPrincipal: "CAMPO_PRINCIPAL", // Campo principal usado en la búsqueda.
        campos: ["CAMPO_SECUNDARIO"], // Campos adicionales; [] si no se utilizan.
        modoResultado: "resaltar",         // "resaltar", "aislar" o "contrasteInverso".
        estiloContrasteInverso: {
            seleccionado: { color: "#ffffff", fillColor: "#f28c28", weight: 4, opacity: 1, fillOpacity: 0 }, // Estilo aplicado a la entidad elegida.
            resto: { opacity: 0.25, fillOpacity: 0.65 } // Estilo aplicado a las demás entidades.
        }
    },

    simbologia: {
        tipo: "simple", // Modo de funcionamiento de este bloque.
        estilo: {
            color: "#3388ff", // Color del borde o del trazo.
            weight: 2, // Grosor del borde o trazo en píxeles.
            fillColor: "#3388ff", // Color del relleno; en líneas será el trazo.
            fillOpacity: 0.20 // Opacidad del relleno entre 0 y 1.
        }
    },

    leyenda: {
        enabled: true, // Incluye la capa en la leyenda.
        titulo: "Nombre en leyenda" // Texto mostrado en la leyenda.
    },

    etiquetado: {
        enabled: false, // Activa las etiquetas de esta capa.
        campo: "CAMPO_ETIQUETA", // Nombre exacto del atributo GeoJSON.
        zoomMin: 14, // Zoom mínimo; null significa sin límite.
        zoomMax: null, // Zoom máximo; null significa sin límite.
        permanente: true, // Mantiene la etiqueta siempre visible.
        claseCss: "etiqueta-personalizada", // Clase opcional definida en styles.css.
        orientacion: "horizontal" // horizontal o linea para geometrías lineales.
    }
}

EJEMPLO DE SIMBOLOGÍA POR VALORES ÚNICOS
Reemplace el bloque simbologia de la capa por una estructura como esta:
Use fillColor en polígonos y puntos circulares; use color en líneas.

simbologia: {
    tipo: "valoresUnicos", // Modo de funcionamiento de este bloque.
    campo: "CAMPO_CATEGORIA", // Nombre exacto del atributo GeoJSON.
    simboloPunto: "circulo", // marcador, circulo, cuadrado, triangulo o cruz.
    filtroCategorias: {
        enabled: true, // Permite activar o desactivar categorías.
        mostrarTodas: true, // Muestra los botones Todas y Ninguna.
        abiertoInicial: true // Abre el listado al iniciar.
    },
    estiloBase: {
        color: "#ffffff", // Color del borde o del trazo.
        weight: 1, // Grosor del borde o trazo en píxeles.
        fillOpacity: 0.60 // Opacidad del relleno entre 0 y 1.
    },
    categorias: [
        {
            valor: "VALOR_A", // Valor exacto existente en el GeoJSON.
            etiqueta: "Categoría A", // Texto descriptivo mostrado al usuario.
            visibleInicial: true, // Estado inicial de esta categoría.
            informacion: { // Información editorial opcional de la categoría.
                descripcion: "Descripción opcional.", // Texto complementario del grupo.
                camposAdicionales: [ // Información manual exclusiva de esta categoría.
                    { etiqueta: "Subtítulo libre", valor: "Información manual" }
                ],
                enlace: "", // Vínculo externo opcional.
                textoEnlace: "Más información" // Texto visible del vínculo.
            },
            estilo: { fillColor: "#2f7d32" } // Color de esta categoría; use color para líneas.
        },
        {
            valor: "VALOR_B", // Valor exacto existente en el GeoJSON.
            etiqueta: "Categoría B", // Texto descriptivo mostrado al usuario.
            visibleInicial: true, // Estado inicial de esta categoría.
            estilo: { fillColor: "#7b4ab5" } // Color de esta categoría; use color para líneas.
        }
    ],
    mostrarNoConfigurados: true, // Muestra u oculta valores sin categoría.
    visibleDefaultInicial: true, // Estado inicial de valores no clasificados.
    estiloDefault: { fillColor: "#9e9e9e" }, // Estilo para valores no clasificados.
    etiquetaDefault: "Sin información u otros", // Nombre del grupo no clasificado.
    mostrarDefaultEnLeyenda: true // Incluye el estilo predeterminado.
}

EJEMPLO DE SIMBOLOGÍA POR COLORES GRADUADOS
Cada clase excluye min e incluye max; use max: null en la última clase.
Use fillColor en polígonos y puntos circulares; use color en líneas.

simbologia: {
    tipo: "graduados", // Modo de funcionamiento de este bloque.
    campo: "CAMPO_NUMERICO", // Nombre exacto del atributo GeoJSON.
    simboloPunto: "circulo", // marcador, circulo, cuadrado, triangulo o cruz.
    valoresSinDatos: [0, null, ""], // Valores tratados como información ausente.
    estiloBase: {
        color: "#ffffff", // Color del borde o del trazo.
        weight: 1, // Grosor del borde o trazo en píxeles.
        fillOpacity: 0.65 // Opacidad del relleno entre 0 y 1.
    },
    clases: [
        {
            min: 0, // Límite inferior excluido de la clase.
            max: 50, // Límite superior incluido; null sin límite.
            etiqueta: "1–50", // Texto descriptivo mostrado al usuario.
            estilo: { fillColor: "#eff3ff" } // Color de esta clase; use color para líneas.
        },
        {
            min: 50, // Límite inferior excluido de la clase.
            max: 100, // Límite superior incluido; null sin límite.
            etiqueta: "51–100", // Texto descriptivo mostrado al usuario.
            estilo: { fillColor: "#6baed6" } // Color de esta clase; use color para líneas.
        },
        {
            min: 100, // Límite inferior excluido de la clase.
            max: null, // Límite superior incluido; null sin límite.
            etiqueta: "Más de 100", // Texto descriptivo mostrado al usuario.
            estilo: { fillColor: "#08519c" } // Color de esta clase; use color para líneas.
        }
    ],
    estiloDefault: { fillColor: "#bdbdbd" }, // Estilo para valores no clasificados.
    etiquetaDefault: "Sin información", // Nombre del grupo no clasificado.
    mostrarDefaultEnLeyenda: true // Incluye el estilo predeterminado.
}
*/
