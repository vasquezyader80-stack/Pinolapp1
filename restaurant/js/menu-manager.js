const productForm = document.getElementById('add-product-form');

// Guardar producto en la nube
productForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('prod-name').value;
    const price = document.getElementById('prod-price').value;
    const desc = document.getElementById('prod-desc').value;
    const img = document.getElementById('prod-img').value;

    // Insertar en la tabla 'productos' de Supabase
    const { data, error } = await _supabase
        .from('productos')
        .insert([
            { 
                nombre: name, 
                precio: parseFloat(price), 
                descripcion: desc, 
                imagen_url: img,
                restaurante_id: localStorage.getItem('restaurante_id') // Persistencia de sesión
            }
        ]);

    if (error) {
        alert("Error al subir el producto. Intentá de nuevo.");
    } else {
        alert("¡Producto publicado con éxito!");
        productForm.reset();
        cargarMisProductos(); // Refresca la lista
    }
});

// Función para listar lo que ya tiene el restaurante
async function cargarMisProductos() {
    const resId = localStorage.getItem('restaurante_id');
    const { data, error } = await _supabase
        .from('productos')
        .select('*')
        .eq('restaurante_id', resId);

    const container = document.getElementById('product-list-admin');
    container.innerHTML = data.map(p => `
        <div class="item-admin">
            <span>${p.nombre} - C$ ${p.precio}</span>
            <button onclick="eliminarProducto(${p.id})">Eliminar</button>
        </div>
    `).join('');
}

cargarMisProductos();
