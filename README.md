# GameZone

Actividad sumativa 2 de la semana 6 de Desarrollo Frontend I, PFY2201.
Alumno: Miguel Cabrillana.

Esta versión amplía la tienda de videojuegos de la sumativa 1. Conserva GameZone,
los seis juegos y los precios de ejemplo del proyecto anterior, e incorpora
Bootstrap 5 y JavaScript para mostrar el catálogo, buscar y gestionar un carrito.

## Ejecución local

Desde la carpeta que contiene index.html:

    python3 -m http.server 8765 --bind 127.0.0.1

Abrir http://127.0.0.1:8765 en el navegador. El servidor HTTP permite que Fetch
lea productos.json. Bootstrap y las ilustraciones están incluidos localmente.

## Archivos

- index.html: estructura semántica, navegación adaptable, búsqueda y carrito.
- productos.json: datos de los seis productos.
- assets/css/styles.css: identidad visual y ajustes de presentación.
- assets/css/bootstrap.min.css: Bootstrap 5.3.3.
- assets/js/app.js: carga, validación, filtros, eventos y actualización del DOM.
- assets/js/bootstrap.bundle.min.js: componentes interactivos de Bootstrap.
- assets/img/: ilustraciones SVG de los juegos y distintivo de GameZone.

## Funcionamiento

La navegación ofrece las categorías PlayStation 5, Nintendo Switch y Xbox Series X.
El formulario busca por nombre dentro de la categoría seleccionada. Ver todos
restablece tanto la búsqueda como la categoría.

Agregar al carrito acumula cantidades del mismo producto y actualiza el resumen,
los subtotales y el total en pesos chilenos. Quitar elimina la línea completa;
Vaciar carrito elimina la selección. El carrito se mantiene durante la sesión
de la página y se reinicia al recargar.

Fetch carga el JSON una vez. Se comprueba el estado HTTP y la estructura de los
datos. Ante un error, se muestra un mensaje amigable. Las búsquedas utilizan el
array cargado, y las tarjetas se agregan al DOM mediante un DocumentFragment.

## Comprobación manual

1. Verificar seis juegos con imagen, nombre, plataforma, precio y botón.
2. Buscar Minecraft con el botón Buscar y con Enter.
3. Probar un nombre inexistente y luego Ver todos.
4. Filtrar por cada plataforma y comprobar sus dos juegos.
5. Agregar dos unidades de Minecraft y una de EA Sports FC 26: total $139.970.
6. Probar Quitar y Vaciar carrito.
7. Revisar el menú móvil y la distribución en móvil, tablet y escritorio.
8. Revisar en DevTools la petición a productos.json y su respuesta.
9. Bloquear la URL de productos.json en DevTools y recargar para comprobar el error.
   Desactivar el bloqueo y recargar para recuperar el catálogo.

## Recursos

Las ilustraciones SVG son representaciones temáticas del catálogo, no carátulas
oficiales. Los precios y los datos de contacto son ejemplos académicos.

- Bootstrap 5.3.3: https://getbootstrap.com/docs/5.3/
- Fetch API: https://developer.mozilla.org/es/docs/Web/API/Fetch_API/Using_Fetch
- Bootstrap usa la licencia MIT, incluida en BOOTSTRAP-LICENSE.txt.

## Publicación

- [Repositorio en GitHub](https://github.com/mcabri84/PFY2201-Exp2-S6-tienda-videojuegos)
- [Sitio publicado](https://mcabri84.github.io/PFY2201-Exp2-S6-tienda-videojuegos/)
- Rama de despliegue: `gh-pages`, carpeta `/`.

## Capturas

Evidencias de las pruebas locales y de la publicación en GitHub Pages.

- [01_estructura_y_publicacion.png](capturas/01_estructura_y_publicacion.png)
- [02_carrito_dinamico.png](capturas/02_carrito_dinamico.png)
- [03_busqueda_submit.png](capturas/03_busqueda_submit.png)
- [04_categoria_playstation.png](capturas/04_categoria_playstation.png)
- [05_menu_movil.png](capturas/05_menu_movil.png)
- [06_vista_movil_completa.png](capturas/06_vista_movil_completa.png)
- [07_fetch_json_200.png](capturas/07_fetch_json_200.png)
- [08_error_carga_controlado.png](capturas/08_error_carga_controlado.png)
