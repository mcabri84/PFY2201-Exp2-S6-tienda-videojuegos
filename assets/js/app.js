"use strict";

// Estado compartido: el catalogo se carga una vez y el carrito vive en memoria.
let productos = [];
let carrito = [];
let categoriaActual = "Todas";
let busquedaActual = "";

const listaProductos = document.getElementById("lista-productos");
const listaCarrito = document.getElementById("lista-carrito");
const formulario = document.getElementById("formulario-busqueda");
const campoBusqueda = document.getElementById("busqueda");
const resultadoBusqueda = document.getElementById("resultado-busqueda");
const errorCarga = document.getElementById("error-carga");
const mensajeCarrito = document.getElementById("mensaje-carrito");
const botonesCategoria = document.querySelectorAll("[data-categoria]");
const formatoPrecio = new Intl.NumberFormat("es-CL", {
    style: "currency", currency: "CLP", maximumFractionDigits: 0
});

function normalizar(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

// Comprobamos el formato del JSON antes de construir el catalogo.
function validarProductos(datos) {
    if (!Array.isArray(datos) || datos.length === 0) {
        throw new Error("El catalogo debe contener una lista de productos.");
    }
    const ids = [];
    datos.forEach(function (producto) {
        if (!producto || !Number.isInteger(producto.id) || producto.id < 1 ||
            ids.includes(producto.id) || typeof producto.nombre !== "string" ||
            !producto.nombre.trim() || typeof producto.categoria !== "string" ||
            !producto.categoria.trim() || !Number.isFinite(producto.precio) ||
            producto.precio <= 0 || typeof producto.imagen !== "string" ||
            !producto.imagen.startsWith("assets/img/")) {
            throw new Error("Hay productos con datos incompletos o incorrectos.");
        }
        ids.push(producto.id);
    });
}

// Fetch obtiene el JSON local. Los errores HTTP y de formato llegan al catch.
async function cargarProductos() {
    try {
        const respuesta = await fetch("productos.json");
        if (!respuesta.ok) {
            throw new Error("Error HTTP " + respuesta.status);
        }
        const datos = await respuesta.json();
        validarProductos(datos);
        productos = datos;
        formulario.querySelectorAll("input, button").forEach(function (control) {
            control.disabled = false;
        });
        botonesCategoria.forEach(function (boton) { boton.disabled = false; });
        aplicarFiltros();
    } catch (error) {
        errorCarga.textContent = "No pudimos cargar los productos. Actualiza la p\u00e1gina para intentarlo de nuevo.";
        errorCarga.hidden = false;
        resultadoBusqueda.textContent = "Cat\u00e1logo no disponible";
        console.error("No se pudo cargar el catalogo:", error.message);
    } finally {
        listaProductos.setAttribute("aria-busy", "false");
    }
}

// Se crean las tarjetas en un fragmento y se insertan juntas en el DOM.
function mostrarProductos(lista) {
    const fragmento = document.createDocumentFragment();
    lista.forEach(function (producto) {
        const columna = document.createElement("article");
        columna.className = "col-12 col-sm-6 col-xl-4";
        columna.innerHTML = '<div class="card producto h-100">' +
            '<img class="card-img-top" width="640" height="400" loading="lazy">' +
            '<div class="card-body d-flex flex-column">' +
            '<p class="plataforma mb-2"></p><h3 class="card-title mb-2"></h3>' +
            '<p class="precio mb-3"></p>' +
            '<button class="btn btn-primary w-100 mt-auto" type="button">Agregar al carrito</button>' +
            '</div></div>';

        const imagen = columna.querySelector("img");
        imagen.src = producto.imagen;
        imagen.alt = "Ilustracion de " + producto.nombre;
        columna.querySelector(".plataforma").textContent = producto.categoria;
        columna.querySelector("h3").textContent = producto.nombre;
        columna.querySelector(".precio").textContent = formatoPrecio.format(producto.precio);
        const boton = columna.querySelector("button");
        boton.dataset.id = producto.id;
        boton.setAttribute("aria-label", "Agregar " + producto.nombre + " al carrito");
        fragmento.appendChild(columna);
    });
    listaProductos.replaceChildren(fragmento);
    document.getElementById("sin-resultados").hidden = lista.length > 0;
    resultadoBusqueda.textContent = lista.length + (lista.length === 1 ? " juego disponible" : " juegos disponibles");
}

// La busqueda y la categoria se aplican al array, sin volver a pedir el JSON.
function aplicarFiltros() {
    const filtrados = productos.filter(function (producto) {
        const coincideCategoria = categoriaActual === "Todas" || producto.categoria === categoriaActual;
        const coincideNombre = normalizar(producto.nombre).includes(normalizar(busquedaActual));
        return coincideCategoria && coincideNombre;
    });
    mostrarProductos(filtrados);
    botonesCategoria.forEach(function (boton) {
        const activo = boton.dataset.categoria === categoriaActual;
        boton.classList.toggle("active", activo);
        boton.setAttribute("aria-pressed", String(activo));
    });
}

function agregarAlCarrito(id) {
    const producto = productos.find(function (item) { return item.id === id; });
    if (!producto) return;
    const existente = carrito.find(function (item) { return item.id === id; });
    if (existente) {
        existente.cantidad += 1;
    } else {
        carrito.push({ id: producto.id, nombre: producto.nombre, precio: producto.precio, cantidad: 1 });
    }
    actualizarCarrito();
    mensajeCarrito.textContent = producto.nombre + " agregado al carrito.";
}

// El resumen se calcula a partir del array: cantidades, subtotales y total.
function actualizarCarrito() {
    const fragmento = document.createDocumentFragment();
    carrito.forEach(function (item) {
        const fila = document.createElement("li");
        fila.className = "item-carrito";
        fila.innerHTML = '<p class="nombre-carrito mb-1"></p>' +
            '<p class="detalle-carrito small text-secondary mb-1"></p>' +
            '<div class="d-flex justify-content-between align-items-center gap-2">' +
            '<strong class="subtotal small"></strong>' +
            '<button class="quitar-producto" type="button">Quitar</button></div>';
        fila.querySelector(".nombre-carrito").textContent = item.nombre;
        fila.querySelector(".detalle-carrito").textContent = item.cantidad + " x " + formatoPrecio.format(item.precio);
        fila.querySelector(".subtotal").textContent = formatoPrecio.format(item.precio * item.cantidad);
        const boton = fila.querySelector("button");
        boton.dataset.id = item.id;
        boton.setAttribute("aria-label", "Quitar " + item.nombre + " del carrito");
        fragmento.appendChild(fila);
    });
    listaCarrito.replaceChildren(fragmento);
    const cantidad = carrito.reduce(function (suma, item) { return suma + item.cantidad; }, 0);
    const total = carrito.reduce(function (suma, item) { return suma + item.precio * item.cantidad; }, 0);
    document.getElementById("contador-carrito").textContent = cantidad;
    document.getElementById("cantidad-carrito").textContent = cantidad + (cantidad === 1 ? " producto" : " productos");
    document.getElementById("total-carrito").textContent = formatoPrecio.format(total);
    document.getElementById("carrito-vacio").hidden = cantidad > 0;
    document.getElementById("vaciar-carrito").disabled = cantidad === 0;
}

// Delegacion del evento click: un manejador sirve para todas las tarjetas.
listaProductos.addEventListener("click", function (evento) {
    const boton = evento.target.closest("button[data-id]");
    if (boton) agregarAlCarrito(Number(boton.dataset.id));
});

// El evento submit permite buscar con el boton o con la tecla Enter.
formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();
    busquedaActual = campoBusqueda.value.trim();
    aplicarFiltros();
});

botonesCategoria.forEach(function (boton) {
    boton.addEventListener("click", function () {
        categoriaActual = boton.dataset.categoria;
        aplicarFiltros();
        const menu = document.getElementById("menuPrincipal");
        if (menu.classList.contains("show")) {
            bootstrap.Collapse.getOrCreateInstance(menu, { toggle: false }).hide();
        }
    });
});

document.getElementById("limpiar-busqueda").addEventListener("click", function () {
    campoBusqueda.value = "";
    busquedaActual = "";
    categoriaActual = "Todas";
    aplicarFiltros();
});

listaCarrito.addEventListener("click", function (evento) {
    const boton = evento.target.closest("button[data-id]");
    if (!boton) return;
    carrito = carrito.filter(function (item) { return item.id !== Number(boton.dataset.id); });
    actualizarCarrito();
    mensajeCarrito.textContent = "Producto retirado del carrito.";
});

document.getElementById("vaciar-carrito").addEventListener("click", function () {
    carrito = [];
    actualizarCarrito();
    mensajeCarrito.textContent = "Carrito vaciado.";
});

cargarProductos();
