// client/js/menu-loader.js
async function cargarPlatillos() {
    const { data: productos, error } = await _supabase
        .from('productos')
        .select('*')
        .eq('disponible', true);

    if (error) return;

    const contenedor = document.getElementById('lista-menu');
    contenedor.innerHTML = productos.map(item => `
        <div class="item-comida">
            <div class="info">
                <h3>${item.nombre}</h3>
                <p>${item.descripcion || 'Sabor pinolero auténtico'}</p>
                <span class="precio">C$ ${item.precio}</span>
            </div>
            <button onclick="agregarAlCarrito('${item.id}', '${item.nombre}', ${item.precio})">+</button>
        </div>
    `).join('');
}

// Usamos LocalStorage para guardar el carrito y que no se borre
function agregarAlCarrito(id, nombre, precio) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.push({ id, nombre, precio });
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarBotonCarrito();
}

function actualizarBotonCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const total = carrito.reduce((sum, item) => sum + item.precio, 0);
    document.getElementById('total-carrito').innerText = `C$ ${total.toFixed(2)}`;
}

document.addEventListener('DOMContentLoaded', cargarPlatillos);
