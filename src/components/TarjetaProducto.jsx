import { precioCLP, rutaPublica } from '../utils/catalogo.js';

export default function TarjetaProducto({ producto, cantidad, alAgregar }) {
  const enCarrito = cantidad > 0;

  return (
    <article className="col-12 col-sm-6 col-xl-4">
      <div className="card producto h-100">
        <img className="card-img-top" src={rutaPublica(producto.imagen)}
          alt={'Ilustración de ' + producto.nombre} width="640" height="400" loading="lazy" />
        <div className="card-body d-flex flex-column">
          <p className="plataforma mb-2">{producto.categoria}</p>
          <h3 className="card-title mb-2">{producto.nombre}</h3>
          <p className="precio mb-3">{precioCLP(producto.precio)}</p>
          {/* El estado del carrito determina el texto y el estilo del boton. */}
          <button className={'btn w-100 mt-auto ' + (enCarrito ? 'btn-success' : 'btn-primary')}
            type="button" onClick={() => alAgregar(producto)}
            aria-label={(enCarrito ? 'Agregar otra unidad de ' : 'Agregar ') + producto.nombre + ' al carrito'}>
            {enCarrito ? 'En el carrito (' + cantidad + ') · Agregar otro' : 'Agregar al carrito'}
          </button>
        </div>
      </div>
    </article>
  );
}
