// client/js/menu-loader.js

async function cargarPlatillos() {
    const listaMenu = document.getElementById('lista-menu');
    
    try {
        const { data: productos, error } = await _supabase
            .from('productos')
            .select('*')
            .eq('disponible', true);

        if (error) throw error;

        // Limpiar el mensaje de "Cargando"
        listaMenu.innerHTML = '';

        if (productos.length === 0) {
            listaMenu.innerHTML = '<p style="text-align:center;">No hay platillos disponibles hoy.</p>';
            return;
        }

        productos.forEach(producto => {
            const card = `
                <div class="card-producto">
                    <img src="${producto.imagen_url}" alt="${producto.nombre}">
                    <div class="info">
                        <h3>${producto.nombre}</h3>
                        <p>${producto.descripcion}</p>
                        <span class="precio">C$ ${producto.precio}</span>
                        <button onclick="agregarAlCarrito(${producto.id}, '${producto.nombre}', ${producto.precio})">
                            Agregar
                        </button>
                    </div>
                </div>
            `;
            listaMenu.innerHTML += card;
        });

    } catch (err) {
        console.error("Error cargando menú:", err);
        listaMenu.innerHTML = '<p>Error al conectar con la cocina. Intenta de nuevo.</p>';
    }
}

// Ejecutar al cargar la página
document.addEventListener('DOMContentLoaded', cargarPlatillos);
