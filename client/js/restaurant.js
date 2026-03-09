let carrito = [];

function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    actualizarBotonCarrito();
}

function actualizarBotonCarrito() {
    const total = carrito.reduce((sum, item) => sum + item.precio, 0);
    const btn = document.getElementById('btn-ver-carrito');
    
    // Cambiamos el texto dinámicamente como en la imagen
    btn.innerHTML = `Ver carrito (C$ ${total})`;
    btn.style.display = 'block';
}
