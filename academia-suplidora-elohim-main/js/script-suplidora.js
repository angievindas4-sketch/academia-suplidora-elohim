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
const modalImg = modal.querySelector('img'); 
let ultimaSrc = "";

function abrirModal(src) {
    if (modal.classList.contains('show') && ultimaSrc === src) {
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
// script-suplidora.js
// Acordeón + Modal + Carrito centralizado
// ==========================
document.addEventListener("DOMContentLoaded", () => {

  /* -----------------------
     A C O R D E Ó N
  ----------------------- */
  const acordeones = document.querySelectorAll(".acordeon");
  acordeones.forEach(btn => {
    btn.addEventListener("click", function() {
      const panel = this.nextElementSibling;
      const openPanel = document.querySelector(".panel:not([style*='display: none'])");
      if (openPanel && openPanel !== panel) openPanel.style.display = "none";
      panel.style.display = (panel.style.display === "block") ? "none" : "block";
    });
  });

  /* -----------------------
     M O D A L  I M A G E N
  ----------------------- */
  const modalContainer = document.getElementById('modalImagen');
  const modalImg = modalContainer ? modalContainer.querySelector('img') : null;
  let ultimaSrc = "";

  window.abrirModal = function(src) {
    if (!modalContainer || !modalImg) return;
    if (modalContainer.classList.contains('show') && ultimaSrc === src) {
      modalContainer.classList.remove('show');
      ultimaSrc = "";
    } else {
      modalImg.src = src;
      modalContainer.classList.add('show');
      ultimaSrc = src;
    }
  };
  if (modalImg) {
    modalImg.addEventListener('click', () => {
      modalContainer.classList.remove('show');
      ultimaSrc = "";
    });
  }

  /* -----------------------
     F O O T E R  A N I O
  ----------------------- */
  const anioEl = document.getElementById("anio");
  if (anioEl) anioEl.textContent = new Date().getFullYear();

  /* -----------------------
     C A R R I T O
  ----------------------- */
  const WA_NUMBER = "+50671256012"; // número final
  // Elementos del DOM del carrito (puede no existir en algunas páginas)
  const panelCarrito = document.getElementById('panelCarrito');
  const btnCarrito = document.getElementById('btnCarrito');
  const cerrarCarrito = document.getElementById('cerrarCarrito');
  const listaCarritoEl = document.getElementById('listaCarrito');
  const totalCarritoEl = document.getElementById('totalCarrito');
  const vaciarCarritoBtn = document.getElementById('vaciarCarrito');
  const enviarWhatsAppBtn = document.getElementById('enviarWhatsApp');
  const clienteNombreInput = document.getElementById('clienteNombre');
  const toast = document.getElementById('toastCarrito');

  // Seguridad: si no hay panelCarrito, no inicializamos carrito visual (pero funciones siguen disponibles)
  if (!panelCarrito || !btnCarrito) {
    // init carrito logic without UI not needed; but functions will still work if invoked programmatically
    initCartLogic(null);
    return;
  }

  // Mostrar/ocultar panel
  let panelOpen = false;
  function setPanelOpen(open) {
    panelOpen = !!open;
    panelCarrito.setAttribute('aria-hidden', String(!open));
    if (open) panelCarrito.setAttribute('aria-hidden','false');
    else panelCarrito.setAttribute('aria-hidden','true');
  }

  btnCarrito.addEventListener('click', () => {
    setPanelOpen(!panelOpen);
    panelCarrito.style.display = panelOpen ? 'block' : '';
  });
  cerrarCarrito && cerrarCarrito.addEventListener('click', () => setPanelOpen(false));
  // click fuera del panel cierra (opcional)
  document.addEventListener('click', (e) => {
    if (!panelOpen) return;
    const inside = panelCarrito.contains(e.target) || btnCarrito.contains(e.target);
    if (!inside) setPanelOpen(false);
  });

  // Sonido pop con WebAudio
  function playPop() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'sine';
      o.frequency.value = 880;
      g.gain.value = 0.0001;
      o.connect(g); g.connect(ctx.destination);
      o.start();
      g.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.18);
      o.stop(ctx.currentTime + 0.2);
    } catch (e) { /* no audio */ }
  }

  // Toast notificaciones
  function showToast(msg, ms = 1400) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), ms);
  }

  // Inicia la lógica del carrito (backup compartible)
  initCartLogic(panelCarrito);

  function initCartLogic(uiPanel) {
    // carrito estructura: [{name, price, qty}]
    let carrito = [];

    // cargar
    try {
      const saved = localStorage.getItem('carrito_suplidora');
      carrito = saved ? JSON.parse(saved) : [];
    } catch (e) { carrito = []; }

    // Guardar
    function guardar() {
      try { localStorage.setItem('carrito_suplidora', JSON.stringify(carrito)); } catch(e){}
    }

    // Añadir producto (exponer globalmente)
    window.agregarAlCarrito = function(nombre, precio, qty = 1, abrir = true) {
      if (!nombre || isNaN(Number(precio))) {
        console.warn('agregarAlCarrito: nombre o precio inválido', nombre, precio);
        return;
      }
      precio = Number(precio);
      const exist = carrito.find(it => it.name === nombre);
      if (exist) exist.qty += qty;
      else carrito.push({ name: nombre, price: precio, qty: qty });
      guardar();
      if (uiPanel) render();
      playPop();
      showToast('Agregado: ' + nombre);
      if (abrir && uiPanel) { setPanelOpen(true); panelCarrito.style.display = 'block'; }
    };

    window.eliminarDelCarrito = function(index) {
      if (index >= 0 && index < carrito.length) {
        carrito.splice(index, 1);
        guardar();
        if (uiPanel) render();
      }
    };

    window.cambiarCantidad = function(index, qty) {
      qty = Number(qty) || 0;
      if (index >= 0 && index < carrito.length) {
        if (qty <= 0) carrito.splice(index,1);
        else carrito[index].qty = qty;
        guardar();
        if (uiPanel) render();
      }
    };

    window.vaciarCarrito = function() {
      carrito = [];
      guardar();
      if (uiPanel) render();
    };

    window.obtenerCarrito = function() {
      return carrito.slice(); // copia
    };

    // Render al DOM
    function render() {
      if (!listaCarritoEl) return;
      listaCarritoEl.innerHTML = '';
      let total = 0;
      carrito.forEach((item, idx) => {
        total += item.price * item.qty;
        const li = document.createElement('li');
        li.className = 'item-carrito';

        const nombre = document.createElement('div');
        nombre.className = 'nombre';
        nombre.textContent = item.name;

        const precio = document.createElement('div');
        precio.className = 'precio';
        precio.textContent = `₡${(item.price * item.qty).toLocaleString()}`;

        const qtyWrapper = document.createElement('div');
        qtyWrapper.className = 'qty-control';

        const btnMinus = document.createElement('button');
        btnMinus.className = 'qty-btn';
        btnMinus.textContent = '-';
        btnMinus.addEventListener('click', () => {
          cambiarCantidad(idx, item.qty - 1);
        });

        const inputQty = document.createElement('input');
        inputQty.className = 'qty-input';
        inputQty.type = 'number';
        inputQty.min = '1';
        inputQty.value = item.qty;
        inputQty.addEventListener('change', (e) => {
          const v = parseInt(e.target.value) || 1;
          cambiarCantidad(idx, v);
        });

        const btnPlus = document.createElement('button');
        btnPlus.className = 'qty-btn';
        btnPlus.textContent = '+';
        btnPlus.addEventListener('click', () => {
          cambiarCantidad(idx, item.qty + 1);
        });

        const btnRemove = document.createElement('button');
        btnRemove.className = 'qty-btn';
        btnRemove.textContent = 'X';
        btnRemove.title = 'Eliminar';
        btnRemove.addEventListener('click', () => eliminarDelCarrito(idx));

        qtyWrapper.appendChild(btnMinus);
        qtyWrapper.appendChild(inputQty);
        qtyWrapper.appendChild(btnPlus);
        qtyWrapper.appendChild(btnRemove);

        li.appendChild(nombre);
        li.appendChild(qtyWrapper);
        li.appendChild(precio);

        listaCarritoEl.appendChild(li);
      });

      if (totalCarritoEl) totalCarritoEl.textContent = `Total: ₡${total.toLocaleString()}`;
    }

    // Botones UI
    vaciarCarritoBtn && vaciarCarritoBtn.addEventListener('click', () => {
      if (!confirm('¿Vaciar la lista?')) return;
      vaciarCarrito();
      showToast('Lista vaciada');
    });
    enviarWhatsAppBtn && enviarWhatsAppBtn.addEventListener('click', () => {
      if (!carrito.length) { alert('La lista está vacía.'); return; }
      // construir mensaje
      const nombreCliente = clienteNombreInput ? (clienteNombreInput.value.trim() || 'No indicado') : 'No indicado';
      let mensaje = `Hola, soy ${nombreCliente}.\nDeseo comprar:\n\n`;
      let total = 0;
      carrito.forEach(it => {
        mensaje += `• ${it.name} x${it.qty} - ₡${(it.price * it.qty).toLocaleString()}\n`;
        total += it.price * it.qty;
      });
      mensaje += `\nTotal: ₡${total.toLocaleString()}\n\nGracias.`;
      const url = `https://wa.me/${WA_NUMBER.replace(/^\+/, '')}?text=${encodeURIComponent(mensaje)}`;
      window.open(url, '_blank');
    });

    // Render inicial
    render();
  } // fin initCartLogic

}); // fin DOMContentLoaded
