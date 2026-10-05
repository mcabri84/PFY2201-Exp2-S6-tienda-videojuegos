const moneda = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  maximumFractionDigits: 0,
});

export const precioCLP = (valor) => moneda.format(valor);
export const rutaPublica = (ruta) => import.meta.env.BASE_URL + ruta;
export const normalizar = (texto) =>
  texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();

// Se conserva la validacion del JSON utilizada en la tienda anterior.
export function validarProductos(datos) {
  if (!Array.isArray(datos) || datos.length === 0) {
    throw new Error('El catalogo debe contener productos.');
  }
  const ids = new Set();
  for (const producto of datos) {
    if (!producto || !Number.isInteger(producto.id) || producto.id < 1 ||
        ids.has(producto.id) || typeof producto.nombre !== 'string' ||
        !producto.nombre.trim() || typeof producto.categoria !== 'string' ||
        !producto.categoria.trim() || !Number.isFinite(producto.precio) ||
        producto.precio <= 0 || typeof producto.imagen !== 'string' ||
        !producto.imagen.startsWith('assets/img/')) {
      throw new Error('Hay productos con datos incompletos o incorrectos.');
    }
    ids.add(producto.id);
  }
}
