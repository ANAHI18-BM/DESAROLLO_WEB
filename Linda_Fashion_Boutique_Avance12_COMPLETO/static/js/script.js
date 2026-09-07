/*
   LINDA FASHION BOUTIQUE
   La validación visual del formulario se mantiene en JavaScript.
   El almacenamiento real se realiza en Flask + Flask-WTF + SQLite.
*/

const formulario = document.getElementById('formularioRegistro');

if (formulario) {
    const nombre = document.getElementById('nombre');
    const categoria = document.getElementById('categoria');
    const descripcion = document.getElementById('descripcion');
    const talla = document.getElementById('talla');
    const precio = document.getElementById('precio');
    const estado = document.getElementById('estado');

    const errorNombre = document.getElementById('errorNombre');
    const errorCategoria = document.getElementById('errorCategoria');
    const errorDescripcion = document.getElementById('errorDescripcion');
    const errorTalla = document.getElementById('errorTalla');
    const errorPrecio = document.getElementById('errorPrecio');
    const errorEstado = document.getElementById('errorEstado');
    const mensajeGeneral = document.getElementById('mensajeGeneral');

    function mostrarError(campo, contenedor, mensaje) {
        campo.classList.remove('is-valid');
        campo.classList.add('is-invalid');
        contenedor.textContent = mensaje;
        contenedor.className = 'mensaje-validacion error';
    }

    function mostrarExito(campo, contenedor, mensaje = 'Campo válido.') {
        campo.classList.remove('is-invalid');
        campo.classList.add('is-valid');
        contenedor.textContent = mensaje;
        contenedor.className = 'mensaje-validacion ok';
    }

    function validarNombre() {
        const valor = nombre.value.trim();
        if (valor.length < 4) {
            mostrarError(nombre, errorNombre, 'El nombre debe tener al menos 4 caracteres.');
            return false;
        }
        mostrarExito(nombre, errorNombre);
        return true;
    }

    function validarCategoria() {
        if (!categoria.value) {
            mostrarError(categoria, errorCategoria, 'Debe seleccionar una categoría.');
            return false;
        }
        mostrarExito(categoria, errorCategoria);
        return true;
    }

    function validarDescripcion() {
        if (descripcion.value.trim().length < 10) {
            mostrarError(descripcion, errorDescripcion, 'La descripción debe tener al menos 10 caracteres.');
            return false;
        }
        mostrarExito(descripcion, errorDescripcion);
        return true;
    }

    function validarTalla() {
        if (!talla.value) {
            mostrarError(talla, errorTalla, 'Debe seleccionar una talla.');
            return false;
        }
        mostrarExito(talla, errorTalla);
        return true;
    }

    function validarPrecio() {
        const valor = Number(precio.value);
        if (!valor || valor <= 0) {
            mostrarError(precio, errorPrecio, 'El precio debe ser mayor a 0.');
            return false;
        }
        mostrarExito(precio, errorPrecio);
        return true;
    }

    function validarEstado() {
        if (!estado.value) {
            mostrarError(estado, errorEstado, 'Debe seleccionar el estado de la prenda.');
            return false;
        }
        mostrarExito(estado, errorEstado);
        return true;
    }

    function validarFormularioCompleto() {
        return validarNombre() && validarCategoria() && validarDescripcion() &&
               validarTalla() && validarPrecio() && validarEstado();
    }

    function mostrarMensajeError(texto) {
        mensajeGeneral.innerHTML = `<div class="alert alert-danger text-center fw-bold">${texto}</div>`;
    }

    formulario.addEventListener('submit', function (event) {
        // Si falla la validación del navegador/JS no se envía el formulario.
        // Si es válida, el POST continúa hacia Flask-WTF para la validación
        // del servidor y el INSERT parametrizado en SQLite.
        if (!validarFormularioCompleto()) {
            event.preventDefault();
            mostrarMensajeError('Por favor, corrige los errores del formulario antes de registrar la prenda.');
        }
    });

    nombre.addEventListener('input', validarNombre);
    nombre.addEventListener('blur', validarNombre);
    categoria.addEventListener('change', validarCategoria);
    categoria.addEventListener('blur', validarCategoria);
    descripcion.addEventListener('input', validarDescripcion);
    descripcion.addEventListener('blur', validarDescripcion);
    talla.addEventListener('change', validarTalla);
    talla.addEventListener('blur', validarTalla);
    precio.addEventListener('input', validarPrecio);
    precio.addEventListener('blur', validarPrecio);
    estado.addEventListener('change', validarEstado);
    estado.addEventListener('blur', validarEstado);
}
