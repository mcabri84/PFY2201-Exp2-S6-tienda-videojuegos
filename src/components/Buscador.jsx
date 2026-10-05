export default function Buscador({ texto, alCambiar, alBuscar, alLimpiar, deshabilitado }) {
  function enviar(evento) {
    evento.preventDefault();
    alBuscar();
  }

  return (
    <form id="formulario-busqueda" className="buscador mb-4" role="search" onSubmit={enviar}>
      <label htmlFor="busqueda" className="form-label small fw-semibold">Buscar por nombre del juego</label>
      <div className="d-flex flex-wrap gap-2">
        <input id="busqueda" className="form-control" type="search" placeholder="Ejemplo: Minecraft"
          maxLength="100" value={texto} disabled={deshabilitado}
          onChange={(evento) => alCambiar(evento.target.value)} />
        <button id="boton-buscar" className="btn btn-primary" type="submit" disabled={deshabilitado}>Buscar</button>
        <button id="limpiar-busqueda" className="btn btn-outline-secondary" type="button"
          disabled={deshabilitado} onClick={alLimpiar}>Ver todos</button>
      </div>
    </form>
  );
}
