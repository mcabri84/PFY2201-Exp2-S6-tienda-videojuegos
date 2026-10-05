import { precioCLP } from '../utils/catalogo.js';

export default function Carrito({ productos, cantidad, total, mensaje, alQuitar, alVaciar }) {
  return (
    <aside id="carrito" className="col-12 col-lg-4 col-xl-3" aria-labelledby="titulo-carrito">
      <div className="resumen-carrito">
        <div className="cabecera-carrito">
          <p className="etiqueta mb-2">TU SELECCIÓN</p>
          <h2 id="titulo-carrito" className="h4 fw-bold mb-0">Mi carrito</h2>
        </div>
        <div className="p-3 p-xl-4">
          {productos.length === 0 ? (
            <p id="carrito-vacio" className="text-secondary small">
              Tu carrito está vacío. Agrega un juego para comenzar.
            </p>
          ) : (
            <ul id="lista-carrito" className="list-unstyled mb-0">
              {productos.map((producto) => (
                <li className="item-carrito" key={producto.id}>
                  <p className="nombre-carrito mb-1">{producto.nombre}</p>
                  <p className="detalle-carrito small text-secondary mb-1">
                    {producto.cantidad} x {precioCLP(producto.precio)}
                  </p>
                  <div className="d-flex justify-content-between align-items-center gap-2">
                    <strong className="subtotal small">{precioCLP(producto.precio * producto.cantidad)}</strong>
                    <button className="quitar-producto" type="button" onClick={() => alQuitar(producto)}
                      aria-label={'Quitar ' + producto.nombre + ' del carrito'}>Quitar</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <div className="total-carrito d-flex justify-content-between gap-2 pt-3 mt-3">
            <strong>Total</strong><strong id="total-carrito">{precioCLP(total)}</strong>
          </div>
          <p id="cantidad-carrito" className="small text-secondary mt-1">
            {cantidad} {cantidad === 1 ? 'producto' : 'productos'}
          </p>
          <button id="vaciar-carrito" className="btn btn-outline-secondary btn-sm w-100"
            type="button" disabled={cantidad === 0} onClick={alVaciar}>Vaciar carrito</button>
          <p id="mensaje-carrito" className="small mensaje-carrito mt-3 mb-0"
            role="status" aria-live="polite">{mensaje}</p>
        </div>
      </div>
    </aside>
  );
}
