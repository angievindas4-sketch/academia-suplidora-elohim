// Acordeón para mostrar/ocultar paneles
const acordeones = document.querySelectorAll(".acordeon");
acordeones.forEach(btn => {
    btn.addEventListener("click", () => {
        btn.classList.toggle("active");
        const panel = btn.nextElementSibling;
        panel.style.display = panel.style.display === "block" ? "none" : "block";
    });
});

// Mostrar formulario de inscripción
const inscribirseBtns = document.querySelectorAll(".inscribirse-btn");
inscribirseBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        // Pregunta nombre y teléfono usando prompt para simplificar
        const nombre = prompt("Ingresa tu nombre completo:");
        const telefono = prompt("Ingresa tu número de WhatsApp:");
        if (!nombre || !telefono) {
            alert("Debes completar ambos campos");
            return;
        }
        const curso = btn.parentElement.textContent.split("-")[0].trim();
        const mensaje = `Hola, quiero inscribirme en el curso: ${curso}\nNombre: ${nombre}\nWhatsApp: ${telefono}`;
        window.open(`https://wa.me/50671256012?text=${encodeURIComponent(mensaje)}`, '_blank');
    });
});
