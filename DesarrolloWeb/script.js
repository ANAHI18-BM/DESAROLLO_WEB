// ===============================
// LINDA FASHION BOUTIQUE
// Desarrollo de Aplicaciones Web - Semana 6
// Validaciones dinámicas + registro de prendas
// ===============================

// ---------- ELEMENTOS DEL FORMULARIO ----------
const formulario = document.getElementById("formularioRegistro");

const nombre = document.getElementById("nombre");
const categoria = document.getElementById("categoria");
const descripcion = document.getElementById("descripcion");
const talla = document.getElementById("talla");
const precio = document.getElementById("precio");
const estado = document.getElementById("estado");

const errorNombre = document.getElementById("errorNombre");
const errorCategoria = document.getElementById("errorCategoria");
const errorDescripcion = document.getElementById("errorDescripcion");
const errorTalla = document.getElementById("errorTalla");
const errorPrecio = document.getElementById("errorPrecio");
const errorEstado = document.getElementById("errorEstado");

const mensajeGeneral = document.getElementById("mensajeGeneral");
const listaPrendas = document.getElementById("listaPrendas");
const total = document.getElementById("total");

// ---------- CONTADOR ----------
let contador = 0;

// ======================================================
// FUNCIONES DE APOYO PARA MENSAJES Y ESTILOS
// ======================================================

// Mostrar error en un campo
function mostrarError(campo, contenedor, mensaje) {
    campo.classList.remove("is-valid");
    campo.classList.add("is-invalid");

    contenedor.textContent = mensaje;
    contenedor.className = "mensaje-validacion error";
}

// Mostrar éxito en un campo
function mostrarExito(campo, contenedor, mensaje = "Campo válido.") {
    campo.classList.remove("is-invalid");
    campo.classList.add("is-valid");

    contenedor.textContent = mensaje;
    contenedor.className = "mensaje-validacion ok";
}

// Limpiar estilos de un campo
function limpiarEstadoCampo(campo, contenedor) {
    campo.classList.remove("is-valid", "is-invalid");
    contenedor.textContent = "";
    contenedor.className = "mensaje-validacion";
}

// Limpiar formulario completo
function limpiarFormulario() {
    formulario.reset();

    limpiarEstadoCampo(nombre, errorNombre);
    limpiarEstadoCampo(categoria, errorCategoria);
    limpiarEstadoCampo(descripcion, errorDescripcion);
    limpiarEstadoCampo(talla, errorTalla);
    limpiarEstadoCampo(precio, errorPrecio);
    limpiarEstadoCampo(estado, errorEstado);
}

// Mensaje general de éxito
function mostrarMensajeExito(texto) {
    mensajeGeneral.innerHTML = `
        <div class="alert alert-success text-center fw-bold">
            ${texto}
        </div>
    `;
}

// Mensaje general de error
function mostrarMensajeError(texto) {
    mensajeGeneral.innerHTML = `
        <div class="alert alert-danger text-center fw-bold">
            ${texto}
        </div>
    `;
}

// ======================================================
// VALIDACIONES INDIVIDUALES
// ======================================================

// Validar nombre
function validarNombre() {
    const valor = nombre.value.trim();

    if (valor === "") {
        mostrarError(nombre, errorNombre, "El nombre de la prenda es obligatorio.");
        return false;
    }

    if (valor.length < 4) {
        mostrarError(nombre, errorNombre, "El nombre debe tener al menos 4 caracteres.");
        return false;
    }

    mostrarExito(nombre, errorNombre, "Nombre válido.");
    return true;
}

// Validar categoría
function validarCategoria() {
    if (categoria.value === "") {
        mostrarError(categoria, errorCategoria, "Debe seleccionar una categoría.");
        return false;
    }

    mostrarExito(categoria, errorCategoria, "Categoría seleccionada correctamente.");
    return true;
}

// Validar descripción
function validarDescripcion() {
    const valor = descripcion.value.trim();

    if (valor === "") {
        mostrarError(descripcion, errorDescripcion, "La descripción es obligatoria.");
        return false;
    }

    if (valor.length < 10) {
        mostrarError(
            descripcion,
            errorDescripcion,
            "La descripción debe tener al menos 10 caracteres."
        );
        return false;
    }

    mostrarExito(descripcion, errorDescripcion, "Descripción válida.");
    return true;
}

// Validar talla
function validarTalla() {
    if (talla.value === "") {
        mostrarError(talla, errorTalla, "Debe seleccionar una talla.");
        return false;
    }

    mostrarExito(talla, errorTalla, "Talla seleccionada correctamente.");
    return true;
}

// Validar precio
function validarPrecio() {
    const valor = precio.value.trim();

    if (valor === "") {
        mostrarError(precio, errorPrecio, "El precio es obligatorio.");
        return false;
    }

    const precioNumero = parseFloat(valor);

    if (isNaN(precioNumero)) {
        mostrarError(precio, errorPrecio, "Ingrese un precio válido.");
        return false;
    }

    if (precioNumero <= 0) {
        mostrarError(precio, errorPrecio, "El precio debe ser mayor a 0.");
        return false;
    }

    mostrarExito(precio, errorPrecio, "Precio válido.");
    return true;
}

// Validar estado
function validarEstado() {
    if (estado.value === "") {
        mostrarError(estado, errorEstado, "Debe seleccionar el estado de la prenda.");
        return false;
    }

    mostrarExito(estado, errorEstado, "Estado seleccionado correctamente.");
    return true;
}

// ======================================================
// VALIDAR TODO EL FORMULARIO
// ======================================================
function validarFormularioCompleto() {
    const nombreValido = validarNombre();
    const categoriaValida = validarCategoria();
    const descripcionValida = validarDescripcion();
    const tallaValida = validarTalla();
    const precioValido = validarPrecio();
    const estadoValido = validarEstado();

    return (
        nombreValido &&
        categoriaValida &&
        descripcionValida &&
        tallaValida &&
        precioValido &&
        estadoValido
    );
}

// ======================================================
// CREAR TARJETA DE PRENDA
// ======================================================
function crearTarjetaPrenda() {
    // Crear columna responsive
    const columna = document.createElement("div");
    columna.className = "col-md-6 col-lg-4 mt-4";

    // Crear tarjeta
    const tarjeta = document.createElement("div");
    tarjeta.className = "prenda-card p-3 h-100";

    // Cuerpo
    const cuerpo = document.createElement("div");

    // Nombre
    const titulo = document.createElement("h5");
    titulo.className = "text-center";
    titulo.textContent = nombre.value.trim();

    // Categoría
    const categoriaTexto = document.createElement("p");
    categoriaTexto.innerHTML = `<strong>Categoría:</strong> ${categoria.value}`;

    // Descripción
    const descripcionTexto = document.createElement("p");
    descripcionTexto.innerHTML = `<strong>Descripción:</strong> ${descripcion.value.trim()}`;

    // Talla
    const tallaTexto = document.createElement("p");
    tallaTexto.innerHTML = `<strong>Talla:</strong> ${talla.value}`;

    // Estado
    const estadoTexto = document.createElement("p");
    estadoTexto.innerHTML = `<strong>Estado:</strong> ${estado.value}`;

    // Precio
    const precioTexto = document.createElement("p");
    precioTexto.className = "precio-prenda";
    precioTexto.innerHTML = `<strong>Precio:</strong> $${parseFloat(precio.value).toFixed(2)}`;

    // Badge de estado
    const badge = document.createElement("span");
    badge.className = "badge d-inline-block mb-3";

    if (estado.value === "Disponible") {
        badge.classList.add("bg-success");
    } else if (estado.value === "Agotado") {
        badge.classList.add("bg-danger");
    } else {
        badge.classList.add("bg-warning", "text-dark");
    }

    badge.textContent = estado.value;

    // Botón eliminar
    const botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar prenda";
    botonEliminar.className = "btn btn-danger w-100 mt-3";

    botonEliminar.addEventListener("click", function () {
        columna.remove();
        contador--;
        total.textContent = contador;

        mostrarMensajeError("Se eliminó una prenda del registro.");
    });

    // Agregar elementos
    cuerpo.appendChild(titulo);
    cuerpo.appendChild(badge);
    cuerpo.appendChild(categoriaTexto);
    cuerpo.appendChild(descripcionTexto);
    cuerpo.appendChild(tallaTexto);
    cuerpo.appendChild(precioTexto);
    cuerpo.appendChild(estadoTexto);
    cuerpo.appendChild(botonEliminar);

    tarjeta.appendChild(cuerpo);
    columna.appendChild(tarjeta);
    listaPrendas.appendChild(columna);

    // Actualizar contador
    contador++;
    total.textContent = contador;
}

// ======================================================
// EVENTO SUBMIT DEL FORMULARIO
// ======================================================
formulario.addEventListener("submit", function (e) {
    e.preventDefault(); // evita recargar la página

    const formularioValido = validarFormularioCompleto();

    if (!formularioValido) {
        mostrarMensajeError("Por favor, corrige los errores del formulario antes de registrar la prenda.");
        return;
    }

    // Crear tarjeta si todo está correcto
    crearTarjetaPrenda();

    // Mostrar mensaje general de éxito
    mostrarMensajeExito("Prenda registrada correctamente en Linda Fashion Boutique.");

    // Limpiar formulario
    limpiarFormulario();
});

// ======================================================
// VALIDACIONES DINÁMICAS EN TIEMPO REAL
// ======================================================

// input -> mientras escribe
nombre.addEventListener("input", validarNombre);
descripcion.addEventListener("input", validarDescripcion);
precio.addEventListener("input", validarPrecio);

// blur -> al salir del campo
nombre.addEventListener("blur", validarNombre);
descripcion.addEventListener("blur", validarDescripcion);
precio.addEventListener("blur", validarPrecio);

// change -> para select
categoria.addEventListener("change", validarCategoria);
talla.addEventListener("change", validarTalla);
estado.addEventListener("change", validarEstado);

// blur también para select por si el docente revisa eso
categoria.addEventListener("blur", validarCategoria);
talla.addEventListener("blur", validarTalla);
estado.addEventListener("blur", validarEstado);