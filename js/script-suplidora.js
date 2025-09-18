// Acordeón: solo una categoría abierta a la vez
const acordeones = document.querySelectorAll(".acordeon");

acordeones.forEach((btn) => {
    btn.addEventListener("click", function() {
        const panel = this.nextElementSibling;
        const openPanel = document.querySelector(".panel:not([style*='display: none'])");

        if(openPanel && openPanel !== panel){
            openPanel.style.display = "none";
        }

        panel.style.display = (panel.style.display === "block") ? "none" : "block";
    });
});

// Funciones para carrito
let carrito = [];

function agregarAlCarrito(nombre, precio){
    carrito.push({nombre, precio});
    actualizarCarrito();
}

function actualizarCarrito(){
    const lista = document.getElementById("listaCarrito");
    lista.innerHTML = "";
    let total = 0;

    carrito.forEach((item, index) => {
        total += item.precio;

        // Crear contenedor del nombre con botón "X"
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

// Eliminar producto del carrito
function eliminarDelCarrito(index){
    carrito.splice(index, 1);
    actualizarCarrito();
}

// Enviar carrito a WhatsApp
function enviarWhatsApp(){
    if(carrito.length === 0) {
        alert("Tu lista está vacía.");
        return;
    }

    let mensaje = "Hola, deseo comprar:\n";
    carrito.forEach(item => {
        mensaje += `- ${item.nombre} ₡${item.precio.toLocaleString()}\n`;
    });

    // Número de WhatsApp actualizado
    const numero = "71256012"; 
    const url = `https://wa.me/506${numero}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
}
