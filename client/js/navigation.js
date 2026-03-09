// client/js/navigation.js

// Función para ir al restaurante seleccionado
function verDetalleRestaurante(id) {
    // Guardamos el ID en LocalStorage para persistencia
    localStorage.setItem('restaurante_actual_id', id);
    window.location.href = 'restaurant.html';
}
