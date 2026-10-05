import { useState } from 'react';
import { rutaPublica } from '../utils/catalogo.js';

const categorias = ['Todas', 'PlayStation 5', 'Nintendo Switch', 'Xbox Series X'];

export default function Encabezado({ categoria, alCambiarCategoria, cantidad, deshabilitado }) {
  // React controla el menu movil sin manipular el DOM directamente.
  const [menuAbierto, setMenuAbierto] = useState(false);

  function seleccionarCategoria(nuevaCategoria) {
    alCambiarCategoria(nuevaCategoria);
    setMenuAbierto(false);
  }

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark" aria-label="Navegación principal">
        <div className="container py-2">
          <a className="navbar-brand d-flex align-items-center gap-2" href="#inicio">
            <img src={rutaPublica('assets/img/gamezone.svg')} alt="" width="38" height="38" />
            GameZone
          </a>
          <button className="navbar-toggler" type="button" aria-controls="menuPrincipal"
            aria-expanded={menuAbierto} aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setMenuAbierto((abierto) => !abierto)}>
            <span className="navbar-toggler-icon" />
          </button>
          <div className={'collapse navbar-collapse' + (menuAbierto ? ' show' : '')} id="menuPrincipal">
            <ul className="navbar-nav mx-auto gap-lg-1 py-3 py-lg-0">
              {categorias.map((opcion) => (
                <li className="nav-item" key={opcion}>
                  <button className={'nav-link' + (categoria === opcion ? ' active' : '')}
                    type="button" aria-pressed={categoria === opcion} disabled={deshabilitado}
                    onClick={() => seleccionarCategoria(opcion)}>
                    {opcion === 'Todas' ? 'Todos' : opcion}
                  </button>
                </li>
              ))}
            </ul>
            <a className="btn btn-carrito" href="#carrito" onClick={() => setMenuAbierto(false)}>
              Mi carrito <span id="contador-carrito" className="badge ms-1">{cantidad}</span>
            </a>
          </div>
        </div>
      </nav>
      <section id="inicio" className="bienvenida">
        <div className="container py-4 py-lg-5">
          <p className="etiqueta mb-2">TU TIENDA DE VIDEOJUEGOS</p>
          <h1 className="fw-bold mb-3">Bienvenido a <span>GameZone</span></h1>
          <p className="mb-0">Encuentra videojuegos para diferentes plataformas,
            <br className="d-none d-md-block" /> novedades y grandes clásicos en un solo lugar.</p>
        </div>
      </section>
    </header>
  );
}
