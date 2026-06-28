// ===============================
// LINDAs FASHION BOUTIQUE
// Desarrollo de Aplicaciones Web
// ===============================

// Obtener elementos del HTML
const formulario = document.getElementById("formularioRegistro");
const nombre = document.getElementById("nombre");
const descripcion = document.getElementById("descripcion");
const categoria = document.getElementById("categoria");
const listaPrendas = document.getElementById("listaPrendas");
const mensaje = document.getElementById("mensaje");
const total = document.getElementById("total");

// Contador
let contador = 0;

// Evento del formulario
formulario.addEventListener("submit", function (e) {

    // Evita que la página se recargue
    e.preventDefault();

    // Validación
    if (
        nombre.value.trim() === "" ||
        descripcion.value.trim() === "" ||
        categoria.value === ""
    ) {

        mensaje.innerHTML = "⚠ Complete todos los campos.";

        mensaje.className = "text-danger fw-bold text-center mt-3";

        return;
    }

    // Mensaje correcto
    mensaje.innerHTML = "✅ Prenda registrada correctamente.";

    mensaje.className = "text-success fw-bold text-center mt-3";

    // Crear columna Bootstrap
    const columna = document.createElement("div");

    columna.className = "col-md-4 mt-4";

    // Crear tarjeta
    const tarjeta = document.createElement("div");

    tarjeta.className = "card shadow h-100";

    // Cuerpo de la tarjeta
    const cuerpo = document.createElement("div");

    cuerpo.className = "card-body";

    // Nombre
    const titulo = document.createElement("h5");

    titulo.className = "card-title text-center";

    titulo.textContent = nombre.value;

    // Descripción
    const texto = document.createElement("p");

    texto.innerHTML =
        "<strong>Descripción:</strong> " + descripcion.value;

    // Categoría
    const tipo = document.createElement("p");

    tipo.innerHTML =
        "<strong>Categoría:</strong> " + categoria.value;

    // Botón eliminar
    const boton = document.createElement("button");

    boton.textContent = "Eliminar";

    boton.className = "btn btn-danger w-100";

    // Evento eliminar
    boton.addEventListener("click", function () {

        columna.remove();

        contador--;

        total.textContent = contador;

    });

    // Agregar elementos
    cuerpo.appendChild(titulo);

    cuerpo.appendChild(texto);

    cuerpo.appendChild(tipo);

    cuerpo.appendChild(boton);

    tarjeta.appendChild(cuerpo);

    columna.appendChild(tarjeta);

    listaPrendas.appendChild(columna);

    // Actualizar contador
    contador++;

    total.textContent = contador;

    // Limpiar formulario
    formulario.reset();

});