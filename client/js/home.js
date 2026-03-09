// Función para cargar restaurantes desde la base de datos
async function cargarRestaurantes() {
    const listContainer = document.getElementById('restaurant-list');
    
    // Consultamos la tabla 'restaurantes' en Supabase
    const { data, error } = await _supabase
        .from('restaurantes')
        .select('*');

    if (error) {
        listContainer.innerHTML = '<p>Error al cargar. Revisa tu conexión.</p>';
        return;
    }

    listContainer.innerHTML = ''; // Limpiamos el cargador
    
    data.forEach(res => {
        listContainer.innerHTML += `
            <div class="card" onclick="verMenu(${res.id})">
                <img src="${res.imagen_url}" alt="${res.nombre}">
                <h3>${res.nombre}</h3>
                <p>📍 ${res.ubicacion}</p>
                <button class="btn-ver">Ver Menú</button>
            </div>
        `;
    });
}

// Persistencia del carrito usando LocalStorage
function actualizarContadorCarrito() {
    const cart = JSON.parse(localStorage.getItem('pinol_cart')) || [];
    document.getElementById('cart-count').innerText = cart.length;
}

function verMenu(id) {
    localStorage.setItem('selected_restaurant_id', id);
    window.location.href = 'restaurant.html';
}

// Iniciar app
actualizarContadorCarrito();
cargarRestaurantes();
