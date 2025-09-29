// ==========================
// Acordeón categorías
// ==========================
const acordeones = document.querySelectorAll(".acordeon");

acordeones.forEach(btn => {
    btn.addEventListener("click", function() {
        const panel = this.nextElementSibling;
        const openPanel = document.querySelector(".panel:not([style*='display: none'])");

        if (openPanel && openPanel !== panel) {
            openPanel.style.display = "none";
        }

        panel.style.display = (panel.style.display === "block") ? "none" : "block";
    });
});

// ==========================
// Modal toggle con zoom
// ==========================
const modal = document.getElementById('modalImagen');
const modalImg = modal.querySelector('img'); // Imagen dentro del modal
let ultimaSrc = "";

function abrirModal(src) {
    if(modal.classList.contains('show') && ultimaSrc === src){
        modal.classList.remove('show');
        ultimaSrc = "";
    } else {
        modalImg.src = src;
        modal.classList.add('show');
        ultimaSrc = src;
    }
}

modalImg.addEventListener('click', () => {
    modal.classList.remove('show');
    ultimaSrc = "";
});

// ==========================
// Carrito global usando localStorage
// ==========================
let carrito = [];

// Cargar carrito guardado al iniciar
if(localStorage.getItem('carrito')) {
    carrito = JSON.parse(localStorage.getItem('carrito'));
    actualizarCarrito();
}

function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    guardarCarrito();
    actualizarCarrito();
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    guardarCarrito();
    actualizarCarrito();
}

function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function actualizarCarrito() {
    const lista = document.getElementById("listaCarrito");
    lista.innerHTML = "";
    let total = 0;

    carrito.forEach((item, index) => {
        total += item.precio;

        const li = document.createElement("li");

        const nombreDiv = document.createElement("div");
        nombreDiv.classList.add("nombre-producto");

        const spanNombre = document.createElement("span");
        spanNombre.textContent = item.nombre;

        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "X";
        btnEliminar.classList.add("eliminar-btn");
        btnEliminar.onclick = () => eliminarDelCarrito(index);

        nombreDiv.appendChild(spanNombre);
        nombreDiv.appendChild(btnEliminar);
        li.appendChild(nombreDiv);

        const precioP = document.createElement("p");
        precioP.textContent = `₡${item.precio.toLocaleString()}`;
        li.appendChild(precioP);

        lista.appendChild(li);
    });

    document.getElementById("totalCarrito").textContent = `Total: ₡${total.toLocaleString()}`;
}

// ==========================
// Enviar carrito a WhatsApp
// ==========================
function enviarWhatsApp() {
    if (carrito.length === 0) {
        alert("Tu lista está vacía.");
        return;
    }

    let mensaje = "Hola, deseo comprar:\n";
    carrito.forEach(item => {
        mensaje += `- ${item.nombre} ₡${item.precio.toLocaleString()}\n`;
    });

    const numero = "71256012"; 
    const url = `https://wa.me/506${numero}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
}

// ==========================
// Toggle carrito flotante
// ==========================
document.addEventListener("DOMContentLoaded", () => {
    const carritoBtn = document.querySelector(".btn-carrito");
    const contenido = document.querySelector(".contenido-carrito");

    carritoBtn.addEventListener("click", () => {
        contenido.classList.toggle("abierto");
    });
});
