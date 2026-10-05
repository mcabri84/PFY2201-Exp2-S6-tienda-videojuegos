import TarjetaProducto from './TarjetaProducto.jsx';

export default function Catalogo({ productos, carrito, cargando, error, alAgregar }) {
  // Solo se presenta la vista que corresponde al estado de la carga.
  if (cargando) {
    return <p id="cargando-productos" className="alert alert-light border" role="status">Cargando productos...</p>;
  }
  if (error) {
    return <p id="error-carga" className="alert alert-danger" role="alert">{error}</p>;
  }
  if (productos.length === 0) {
    return <p id="sin-resultados" className="alert alert-light border" role="status">
      No encontramos juegos con esa búsqueda. Prueba otro nombre o pulsa Ver todos.
    </p>;
  }

  return (
    <div id="lista-productos" className="row g-3">
      {productos.map((producto) => (
        <TarjetaProducto key={producto.id} producto={producto} alAgregar={alAgregar}
          cantidad={carrito.find((item) => item.id === producto.id)?.cantidad ?? 0} />
      ))}
    </div>
  );
}
