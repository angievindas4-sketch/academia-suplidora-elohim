<script>
// ==========================
// Mostrar/Ocultar formulario
// ==========================
function toggleForm(button) {
    const form = button.nextElementSibling;
    // Ocultar todos los formularios antes de abrir el seleccionado
    document.querySelectorAll('.form-inscripcion').forEach(f => {
        if (f !== form) f.style.display = "none";
    });

    // Mostrar u ocultar el formulario actual
    form.style.display = (form.style.display === "flex") ? "none" : "flex";
    if (form.style.display === "flex") {
        form.style.animation = "fadeIn 0.5s";
    }
}

// ==========================
// Enviar formulario a WhatsApp
// ==========================
function enviarWhatsapp(button) {
    const form = button.closest('.form-inscripcion');
    const curso = form.closest('.curso').querySelector('h3').innerText.trim();
    const nombre = form.querySelector('.nombre').value.trim();
    const direccion = form.querySelector('.direccion').value.trim();
    const telefono = form.querySelector('.telefono').value.trim();
    const pago = form.querySelector('.pago').value;

    // Validar que no haya campos vacíos
    if (!nombre || !direccion || !telefono || !pago) {
        alert("Por favor complete todos los campos antes de enviar.");
        return;
    }

    // Construir el mensaje de WhatsApp
    const mensaje = `Hola! Deseo inscribirme en el *${curso}*.
Nombre: ${nombre}
Dirección: ${direccion}
Teléfono: ${telefono}
Método de pago: ${pago};

    // Número de WhatsApp
    const numeroWhatsApp = "50671256012";
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;

    // Abrir WhatsApp en nueva ventana/pestaña
    window.open(url, '_blank');
}
</script>
