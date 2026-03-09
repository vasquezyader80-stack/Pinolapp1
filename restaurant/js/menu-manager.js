// restaurant/js/menu-manager.js

// 1. Función para cargar el menú actual del restaurante
async function cargarMenu() {
    const restaurantId = localStorage.getItem('restaurant_id');
    
    const { data: productos, error } = await _supabase
        .from('productos')
        .select('*')
        .eq('restaurante_id', restaurantId);

    if (error) {
        console.error("Error al obtener el menú:", error);
        return;
    }

    const listaMenu = document.getElementById('menu-items');
    listaMenu.innerHTML = ''; 

    productos.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.nombre}</td>
            <td>C$ ${item.precio}</td>
            <td>${item.disponible ? '✅' : '❌'}</td>
            <td>
                <button onclick="eliminarProducto('${item.id}')">Eliminar</button>
            </td>
        `;
        listaMenu.appendChild(tr);
    });
}

// 2. Función para agregar un nuevo platillo (Baho, Vigorón, etc.)
async function agregarProducto(event) {
    event.preventDefault();
    
    const nombre = document.getElementById('prod-nombre').value;
    const precio = document.getElementById('prod-precio').value;
    const restaurantId = localStorage.getItem('restaurant_id');

    const { error } = await _supabase
        .from('productos')
        .insert([{ 
            nombre: nombre, 
            precio: parseFloat(precio), 
            restaurante_id: restaurantId,
            disponible: true 
        }]);

    if (error) {
        alert("Error al guardar el producto");
    } else {
        alert("¡Producto añadido con éxito!");
        document.getElementById('form-producto').reset();
        cargarMenu();
    }
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    cargarMenu();
    const form = document.getElementById('form-producto');
    if(form) form.addEventListener('submit', agregarProducto);
});
