// Manejo de navegación global en PinolApp
function irARestaurante(id) {
    localStorage.setItem('restaurante_seleccionado', id);
    window.location.href = 'restaurant.html';
}

function irAlCarrito() {
    window.location.href = 'cart.html';
}

function verSeguimiento(pedidoId) {
    localStorage.setItem('last_order_id', pedidoId);
    window.location.href = 'tracking.html';
}

// Para que el botón de "Comienza a pedir" del index funcione
const btnComenzar = document.querySelector('.btn-comenzar');
if(btnComenzar) {
    btnComenzar.addEventListener('click', () => {
        window.location.href = 'login.html';
    });
}

