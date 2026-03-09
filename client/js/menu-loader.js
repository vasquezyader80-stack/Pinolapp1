async function cargarMenu() {
    const menuContainer = document.getElementById('menu-container');
    if (!menuContainer) return;

    // Pedimos los productos a la tabla de Supabase
    const { data: productos, error } = await _supabase
        .from('productos')
        .select('*')
        .eq('disponible', true);

    if (error) {
        console.error("Error cargando productos:", error);
        return;
    }

    menuContainer.innerHTML = ''; // Limpiamos el cargando

    productos.forEach(producto => {
        menuContainer.innerHTML += `
            <div class="card-producto">
                <img src="${producto.imagen_url}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <span class="precio">C$ ${producto.precio}</span>
                <button onclick="agregarAlCarrito('${producto.id}')">Agregar</button>
            </div>
        `;
    });
}

document.addEventListener('DOMContentLoaded', cargarMenu);
