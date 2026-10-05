import { useEffect, useState } from 'react';
import Encabezado from './components/Encabezado.jsx';
import Buscador from './components/Buscador.jsx';
import Catalogo from './components/Catalogo.jsx';
import Carrito from './components/Carrito.jsx';
import { normalizar, rutaPublica, validarProductos } from './utils/catalogo.js';

export default function App() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [textoBusqueda, setTextoBusqueda] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [categoria, setCategoria] = useState('Todas');
  const [mensaje, setMensaje] = useState('');

  // Carga el JSON al montar el componente y limpia la peticion al desmontarlo.
  useEffect(() => {
    const controlador = new AbortController();
    let activo = true;

    async function cargarProductos() {
      try {
        const respuesta = await fetch(rutaPublica('productos.json'), { signal: controlador.signal });
        if (!respuesta.ok) throw new Error('HTTP ' + respuesta.status);
        const datos = await respuesta.json();
        validarProductos(datos);
        if (activo) setProductos(datos);
      } catch (fallo) {
        if (activo && fallo.name !== 'AbortError') {
          setError('No pudimos cargar los productos. Actualiza la página para intentarlo de nuevo.');
        }
      } finally {
        if (activo) setCargando(false);
      }
    }

    cargarProductos();
    return () => {
      activo = false;
      controlador.abort();
    };
  }, []);

  // Las actualizaciones crean un array nuevo, sin modificar el estado anterior.
  function agregarProducto(producto) {
    setCarrito((actual) => actual.some((item) => item.id === producto.id)
      ? actual.map((item) => item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item)
      : [...actual, { ...producto, cantidad: 1 }]);
    setMensaje(producto.nombre + ' agregado al carrito.');
  }

  function quitarProducto(producto) {
    setCarrito((actual) => actual.filter((item) => item.id !== producto.id));
    setMensaje(producto.nombre + ' retirado del carrito.');
  }

  function vaciarCarrito() {
    setCarrito([]);
    setMensaje('Carrito vaciado.');
  }

  function limpiarBusqueda() {
    setTextoBusqueda('');
    setBusqueda('');
    setCategoria('Todas');
  }

  // Totales y filtros se derivan del estado para evitar datos desincronizados.
  const cantidad = carrito.reduce((suma, item) => suma + item.cantidad, 0);
  const total = carrito.reduce((suma, item) => suma + item.precio * item.cantidad, 0);
  const filtrados = productos.filter((producto) =>
    (categoria === 'Todas' || producto.categoria === categoria) &&
    normalizar(producto.nombre).includes(normalizar(busqueda)));
  const deshabilitado = cargando || Boolean(error);

  return (
    <>
      <a className="visually-hidden-focusable salto-contenido" href="#productos">Ir al catálogo</a>
      <Encabezado categoria={categoria} alCambiarCategoria={setCategoria}
        cantidad={cantidad} deshabilitado={deshabilitado} />
      <main className="container py-4 py-lg-5">
        <div className="row g-4 align-items-start">
          <section id="productos" className="col-12 col-lg-8 col-xl-9"
            aria-labelledby="titulo-productos" aria-busy={cargando}>
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
              <h2 id="titulo-productos" className="h3 fw-bold mb-0">Explora el catálogo</h2>
              <p id="resultado-busqueda" className="text-secondary small mb-0" role="status">
                {cargando ? 'Cargando productos...' : error ? 'Catálogo no disponible' :
                  filtrados.length + (filtrados.length === 1 ? ' juego disponible' : ' juegos disponibles')}
              </p>
            </div>
            <Buscador texto={textoBusqueda} alCambiar={setTextoBusqueda} deshabilitado={deshabilitado}
              alBuscar={() => setBusqueda(textoBusqueda.trim())} alLimpiar={limpiarBusqueda} />
            <Catalogo productos={filtrados} carrito={carrito} cargando={cargando}
              error={error} alAgregar={agregarProducto} />
          </section>
          <Carrito productos={carrito} cantidad={cantidad} total={total} mensaje={mensaje}
            alQuitar={quitarProducto} alVaciar={vaciarCarrito} />
        </div>
        <section id="nosotros" className="sobre-nosotros mt-5 pt-4" aria-labelledby="titulo-nosotros">
          <h2 id="titulo-nosotros" className="h5 fw-bold">Sobre GameZone</h2>
          <p className="text-secondary mb-0">Somos una tienda dedicada a ofrecer videojuegos para las principales plataformas del mercado.</p>
        </section>
      </main>
      <footer id="contacto" className="py-4">
        <div className="container d-flex flex-column flex-md-row justify-content-between gap-3">
          <div><p className="fw-bold mb-1">GameZone</p><p className="small mb-0">2026 · Tienda demostrativa</p></div>
          <div><p className="fw-semibold mb-1">Contacto</p>
            <p className="small mb-1">contacto@gamezone.cl · +56 2 2345 6789</p>
            <p className="small mb-0 text-white-50">Datos de contacto y precios de ejemplo.</p></div>
        </div>
      </footer>
    </>
  );
}
