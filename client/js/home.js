// client/js/home-logic.js
async function cargarRestaurantes() {
    const { data: locales, error } = await _supabase
        .from('restaurantes')
        .select('*');

    if (error) return;

    const grid = document.getElementById('restaurantes-lista');
    grid.innerHTML = locales.map(res => `
        <div class="res-card" onclick="window.location.href='restaurant.html?id=${res.id}'">
            <img src="${res.imagen_url || 'images/default-resto.jpg'}" alt="${res.nombre}">
            <div class="res-info">
                <h4>${res.nombre}</h4>
                <div class="res-meta">
                    <span>⭐ ${res.calificacion || '5.0'}</span>
                    <span>🕒 ${res.tiempo_entrega || '20 min'}</span>
                </div>
                <p class="envio-costo">Envío: C$ ${res.costo_envio || '40'}</p>
            </div>
        </div>
    `).join('');
}

// Lógica de búsqueda
document.getElementById('search-input').addEventListener('input', (e) => {
    const busqueda = e.target.value.toLowerCase();
    // Aquí filtrarías la lista de restaurantes en pantalla
});

document.addEventListener('DOMContentLoaded', cargarRestaurantes);
