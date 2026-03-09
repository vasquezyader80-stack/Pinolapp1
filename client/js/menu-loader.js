// client/js/menu-logic.js

async function cargarMenu() {
    const restoId = localStorage.getItem('restaurante_actual_id');
    
    // Consultamos los productos filtrados por el ID del restaurante
    const { data: productos, error } = await _supabase
        .from('productos')
        .select('*')
        .eq('restaurante_id', restoId);

    if (error) {
        console.error("Error al cargar menú:", error);
        return;
    }

    const listaMenu = document.getElementById('menu-items');
    listaMenu.innerHTML = productos.map(item => `
        <div class="menu-card" onclick="agregarAlCarrito('${item.id}', '${item.nombre}', ${item.precio})">
            <img src="${item.imagen_url || 'images/default-food.png'}" class="food-thumb">
            <div class="food-info">
                <h4>${item.nombre}</h4>
                <p class="food-desc">${item.descripcion}</p>
                <span class="food-price">C$ ${item.precio}</span>
            </div>
            <button class="btn-add">+</button>
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', cargarMenu);
// client/js/menu-loader.js

// --- Al final del archivo ---
// Esto hace que los productos aparezcan en pantalla de una vez
document.addEventListener('DOMContentLoaded', cargarPlatillos);
