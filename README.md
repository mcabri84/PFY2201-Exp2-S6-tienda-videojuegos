# GameZone con React

Actividad sumativa de la semana 8 de Desarrollo Frontend I (PFY2201).
Alumno: Miguel Cabrillana.

Esta versión adapta la tienda GameZone de la semana 6 a componentes funcionales
de React. Conserva sus seis videojuegos, precios de ejemplo, imágenes, diseño
Bootstrap, búsqueda por nombre y filtros por plataforma.

## Ejecutar el proyecto

Requisitos: Node.js 22.12 o posterior y npm.

    npm ci
    npm run dev

Abrir http://127.0.0.1:5173/PFY2201-Exp2-S6-tienda-videojuegos/

Para generar y revisar la versión publicable:

    npm run build
    npm run preview

Abrir http://127.0.0.1:4173/PFY2201-Exp2-S6-tienda-videojuegos/

La carpeta dist contiene la aplicación compilada. El código fuente debe
permanecer en la rama de desarrollo o main; el contenido compilado se publica
en gh-pages. La configuración base de Vite corresponde al nombre del repositorio.

## Estructura y responsabilidades

- src/App.jsx: estados del catálogo, carrito, búsqueda, categoría, carga y error.
  Integra los componentes y realiza la petición de datos con useEffect.
- src/components/Encabezado.jsx: navegación por plataforma y menú móvil con useState.
- src/components/Buscador.jsx: formulario controlado con onChange y onSubmit.
- src/components/Catalogo.jsx: vistas de carga, error, búsqueda vacía y productos.
- src/components/TarjetaProducto.jsx: producto recibido por props y botón condicional.
- src/components/Carrito.jsx: selección, cantidades, total y acciones para retirar o vaciar.
- src/utils/catalogo.js: formato CLP, rutas, normalización y validación del JSON.
- public/productos.json: catálogo cargado mediante fetch.
- public/assets/img/: imágenes originales de GameZone.
- assets/css/: estilos originales y Bootstrap 5.3.3.

## Funcionalidades de la semana 8

useState mantiene el catálogo, el carrito y los controles interactivos.
Los totales se calculan a partir del carrito y las actualizaciones crean arrays
nuevos para no modificar directamente el estado.

useEffect carga productos.json al montar App. Se revisa la respuesta HTTP y la
estructura de los productos. La limpieza del efecto cancela la petición y evita
actualizar un componente desmontado.

El renderizado condicional muestra la carga, los errores, las búsquedas sin
resultados y el carrito vacío. Cuando un juego está seleccionado, su botón
cambia de color y muestra "En el carrito", su cantidad y la opción de agregar otro.
Al quitarlo, el botón vuelve a su estado inicial.

Agregar un mismo juego acumula unidades. Quitar elimina toda su línea y Vaciar
carrito elimina la selección completa. El carrito vive en memoria y se reinicia
al recargar la página.

## Comprobación manual

1. Confirmar seis juegos y la petición correcta a productos.json.
2. Agregar dos Minecraft y un EA Sports FC 26: 3 unidades y total esperado $139.970.
3. Quitar Minecraft: debe quedar FC 26, con 1 unidad y total $69.990.
4. Vaciar el carrito: mensaje de carrito vacío, 0 productos y total $0.
5. Verificar que los botones cambian según los juegos presentes en el carrito.
6. Buscar por nombre, filtrar por plataforma y restablecer con Ver todos.
7. Revisar el menú y la distribución en una pantalla móvil.

## Evidencias de la semana 8

Las siguientes capturas corresponden a las pruebas locales realizadas el
5 de octubre de 2026 con esta version React:

- [Carrito con 3 unidades y total $139.970](capturas/semana8/01_carrito_agregado.png).
- [Eliminacion de Minecraft y total $69.990](capturas/semana8/02_producto_eliminado.png).
- [Carrito vacio, total $0 y botones restablecidos](capturas/semana8/03_carrito_vacio.png).
- [Continuacion del catalogo y sus productos](capturas/semana8/04_catalogo_productos.png).

Las capturas comprueban las cantidades, los totales, la eliminacion, el vaciado
y los cambios de texto y estilo de los botones. La carga dinamica se implementa
en App.jsx con useEffect y fetch sobre public/productos.json.
Las capturas situadas directamente en capturas pertenecen a la semana 6.

## Publicacion

- [Repositorio publico](https://github.com/mcabri84/PFY2201-Exp2-S6-tienda-videojuegos).
- [Aplicacion en GitHub Pages](https://mcabri84.github.io/PFY2201-Exp2-S6-tienda-videojuegos/).
- Codigo fuente y evidencias: rama main.
- Aplicacion compilada: rama gh-pages, carpeta raiz.

La etiqueta respaldo-s6 conserva la version anterior; su nombre completo
incluye la fecha y hora del respaldo. Los cambios del despliegue conservan
el historial de la rama gh-pages.

## Recursos y atribuciones

Los precios y contactos son ejemplos académicos. Las imágenes SVG son
ilustraciones temáticas, no carátulas oficiales.
Bootstrap conserva su licencia MIT en BOOTSTRAP-LICENSE.txt.

- React useState: https://react.dev/reference/react/useState
- React useEffect: https://react.dev/reference/react/useEffect
- Vite y publicación: https://vite.dev/guide/static-deploy
- Bootstrap: https://getbootstrap.com/docs/5.3/
